// Cliente mínimo de la API de Gemini (sin dependencias). Todo lo que habla con Google vive aquí.
//
// Gemini cambia seguido de modelos y de forma de llamada, así que:
//  · los modelos se configuran por variable de entorno (GEMINI_MODELO_TEXTO / GEMINI_MODELO_IMAGEN),
//  · se usa primero la API "Interactions" (la documentada hoy) y, si el servidor la rechaza (400/404), la clásica generateContent,
//  · las respuestas se leen de forma tolerante.

// GEMINI_API_BASE solo sirve para pruebas locales con un servidor simulado.
const BASE = process.env.GEMINI_API_BASE?.trim() || "https://generativelanguage.googleapis.com/v1beta"

export class ErrorIA extends Error {
    constructor(
        mensaje: string,
        public estado?: number,
    ) {
        super(mensaje)
    }
}

export const iaConfigurada = () => !!process.env.GEMINI_API_KEY?.trim()
export const modeloTexto = () => process.env.GEMINI_MODELO_TEXTO?.trim() || "gemini-3.6-flash"
export const modeloImagen = () => process.env.GEMINI_MODELO_IMAGEN?.trim() || "gemini-3.1-flash-image"

type J = Record<string, unknown>
const obj = (v: unknown): J => (v && typeof v === "object" && !Array.isArray(v) ? (v as J) : {})
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])
const str = (v: unknown): string => (typeof v === "string" ? v : "")

function mensajeHttp(estado: number, detalle: string): string {
    if (estado === 401 || estado === 403) return "Gemini rechazó la API key (inválida, sin permiso o sin facturación habilitada). Revisa GEMINI_API_KEY."
    if (estado === 404) return `Gemini no encontró el modelo o el servicio solicitado. Revisa GEMINI_MODELO_TEXTO / GEMINI_MODELO_IMAGEN. (${detalle})`
    if (estado === 429) return "Se alcanzó el límite de uso de Gemini. Espera un momento e inténtalo de nuevo."
    if (estado >= 500) return "Gemini no está respondiendo ahora mismo. Inténtalo en unos minutos."
    return `Gemini rechazó la solicitud: ${detalle}`
}

async function llamar(ruta: string, cuerpo: unknown, opciones: { interacciones?: boolean; timeoutMs?: number } = {}): Promise<unknown> {
    const clave = process.env.GEMINI_API_KEY?.trim()
    if (!clave) throw new ErrorIA("Falta configurar GEMINI_API_KEY en el servidor (.env.local en local, variables de entorno en Dokploy).")

    let res: Response
    try {
        res = await fetch(`${BASE}${ruta}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": clave,
                ...(opciones.interacciones ? { "Api-Revision": process.env.GEMINI_API_REVISION?.trim() || "2026-05-20" } : {}),
            },
            body: JSON.stringify(cuerpo),
            signal: AbortSignal.timeout(opciones.timeoutMs ?? 150_000),
        })
    } catch (e) {
        const tiempo = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError")
        throw new ErrorIA(tiempo ? "Gemini tardó demasiado en responder. Inténtalo de nuevo." : "No se pudo conectar con Gemini.")
    }

    const texto = await res.text()
    let json: unknown = null
    try {
        json = JSON.parse(texto)
    } catch {
        // respuesta que no es JSON
    }
    if (!res.ok) {
        const detalle = str(obj(obj(json).error).message) || texto.slice(0, 200)
        throw new ErrorIA(mensajeHttp(res.status, detalle), res.status)
    }
    return json
}

// ───────────── Texto (con o sin búsqueda en Google) ─────────────

export type FuenteCruda = { url: string; titulo: string }
export type RespuestaTexto = { texto: string; fuentes: FuenteCruda[]; consultas: string[] }

// API "Interactions": steps[] -> model_output -> content[] (text + annotations url_citation); google_search_call -> queries.
function leerInteraccion(data: unknown): RespuestaTexto {
    const textos: string[] = []
    const fuentes: FuenteCruda[] = []
    const consultas: string[] = []
    for (const paso of arr(obj(data).steps)) {
        const p = obj(paso)
        if (p.type === "google_search_call") consultas.push(...arr(obj(p.arguments).queries).map(String))
        if (p.type !== "model_output") continue
        for (const bloque of arr(p.content)) {
            const b = obj(bloque)
            if (b.type !== "text" || typeof b.text !== "string") continue
            textos.push(b.text)
            for (const a of arr(b.annotations)) {
                const an = obj(a)
                if (an.type === "url_citation" && str(an.url)) fuentes.push({ url: str(an.url), titulo: str(an.title) })
            }
        }
    }
    return { texto: textos.join("\n").trim(), fuentes, consultas }
}

// API clásica generateContent: candidates[0].content.parts[].text + groundingMetadata.groundingChunks[].web.
function leerGenerateContent(data: unknown): RespuestaTexto {
    const candidato = obj(arr(obj(data).candidates)[0])
    const textos = arr(obj(candidato.content).parts)
        .map(obj)
        .filter((p) => p.thought !== true && typeof p.text === "string")
        .map((p) => p.text as string)
    const meta = obj(candidato.groundingMetadata)
    const fuentes = arr(meta.groundingChunks)
        .map((c) => obj(obj(c).web))
        .filter((w) => str(w.uri))
        .map((w) => ({ url: str(w.uri), titulo: str(w.title) }))
    return { texto: textos.join("\n").trim(), fuentes, consultas: arr(meta.webSearchQueries).map(String) }
}

type Modo = "interactions" | "generate"
let modoRecordado: Modo | null = null

async function conFallback<T>(intento: (modo: Modo) => Promise<T>): Promise<T> {
    const orden: Modo[] = modoRecordado ? [modoRecordado] : ["interactions", "generate"]
    let ultimo: unknown
    for (const modo of orden) {
        try {
            const r = await intento(modo)
            modoRecordado = modo
            return r
        } catch (e) {
            ultimo = e
            // Solo se prueba la otra API si esta no existe o no entiende la solicitud.
            if (!(e instanceof ErrorIA) || ![400, 404].includes(e.estado ?? 0)) throw e
        }
    }
    throw ultimo
}

export function generarTexto(prompt: string, opciones: { buscar: boolean }): Promise<RespuestaTexto> {
    return conFallback(async (modo) => {
        const modelo = modeloTexto()
        const r =
            modo === "interactions"
                ? leerInteraccion(
                      await llamar("/interactions", { model: modelo, input: prompt, ...(opciones.buscar ? { tools: [{ type: "google_search" }] } : {}) }, { interacciones: true }),
                  )
                : leerGenerateContent(
                      await llamar(`/models/${encodeURIComponent(modelo)}:generateContent`, {
                          contents: [{ role: "user", parts: [{ text: prompt }] }],
                          ...(opciones.buscar ? { tools: [{ google_search: {} }] } : {}),
                      }),
                  )
        if (!r.texto) throw new ErrorIA("Gemini no devolvió texto. Inténtalo de nuevo.")
        return r
    })
}

// ───────────── Imágenes ─────────────

function leerImagen(modo: Modo, data: unknown): Buffer | null {
    let base64 = ""
    if (modo === "interactions") {
        base64 = str(obj(obj(data).output_image).data)
        for (const paso of arr(obj(data).steps)) {
            const p = obj(paso)
            if (p.type !== "model_output") continue
            for (const bloque of arr(p.content)) {
                const b = obj(bloque)
                if (b.type === "image" && str(b.data)) base64 = str(b.data)
            }
        }
    } else {
        const partes = arr(obj(obj(arr(obj(data).candidates)[0]).content).parts).map(obj)
        for (const p of partes) {
            const datos = obj(p.inlineData ?? p.inline_data)
            if (str(datos.data)) base64 = str(datos.data)
        }
    }
    return base64 ? Buffer.from(base64, "base64") : null
}

export type Aspecto = "16:9" | "4:3" | "1:1"

export function generarImagen(prompt: string, aspecto: Aspecto): Promise<Buffer> {
    return conFallback(async (modo) => {
        const modelo = modeloImagen()
        const data =
            modo === "interactions"
                ? await llamar(
                      "/interactions",
                      { model: modelo, input: [{ type: "text", text: prompt }], response_format: { type: "image", aspect_ratio: aspecto } },
                      { interacciones: true },
                  )
                : await llamar(`/models/${encodeURIComponent(modelo)}:generateContent`, {
                      contents: [{ role: "user", parts: [{ text: prompt }] }],
                      generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: aspecto } },
                  })
        const imagen = leerImagen(modo, data)
        if (!imagen) throw new ErrorIA("Gemini no devolvió una imagen (puede que su filtro de seguridad la bloqueara). Prueba con otra descripción.")
        return imagen
    })
}

// ───────────── Generación larga con instrucciones, imágenes y PDFs (creador de sitios) ─────────────

export type ParteGemini = { text: string } | { inlineData: { mimeType: string; data: string } }
export type RespuestaPartes = { texto: string; entrada: number; salida: number }

// Modelo para el creador de sitios; por defecto el mismo de texto. GEMINI_MODELO_SITIOS permite usar uno más potente.
export const modeloSitios = () => process.env.GEMINI_MODELO_SITIOS?.trim() || modeloTexto()

// generateContent en streaming (SSE): las respuestas con HTML tardan minutos y así la conexión no se queda esperando muda.
export async function generarConPartes(o: { sistema: string; partes: ParteGemini[]; maxTokens: number; urlContext?: boolean }): Promise<RespuestaPartes> {
    const clave = process.env.GEMINI_API_KEY?.trim()
    if (!clave) throw new ErrorIA("Falta configurar GEMINI_API_KEY en el servidor (.env.local en local, variables de entorno en Dokploy).")

    const cuerpo = {
        systemInstruction: { parts: [{ text: o.sistema }] },
        contents: [{ role: "user", parts: o.partes }],
        generationConfig: { maxOutputTokens: o.maxTokens },
        ...(o.urlContext ? { tools: [{ url_context: {} }] } : {}),
    }
    const url = `${BASE}/models/${encodeURIComponent(modeloSitios())}:streamGenerateContent?alt=sse`

    let res: Response | null = null
    for (let intento = 0; intento < 2; intento++) {
        try {
            res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-goog-api-key": clave },
                body: JSON.stringify(cuerpo),
                signal: AbortSignal.timeout(10 * 60_000),
            })
        } catch (e) {
            const tiempo = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError")
            throw new ErrorIA(tiempo ? "Gemini tardó demasiado en responder. Inténtalo de nuevo." : "No se pudo conectar con Gemini.")
        }
        // Saturación momentánea: un reintento tras unos segundos.
        if ((res.status === 429 || res.status === 503) && intento === 0) {
            await new Promise((r) => setTimeout(r, 6000))
            continue
        }
        break
    }
    if (!res) throw new ErrorIA("No se pudo conectar con Gemini.")
    if (!res.ok || !res.body) {
        const texto = await res.text().catch(() => "")
        let detalle = texto.slice(0, 200)
        try {
            detalle = str(obj(obj(JSON.parse(texto)).error).message) || detalle
        } catch {
            // no era JSON
        }
        throw new ErrorIA(mensajeHttp(res.status, detalle), res.status)
    }

    const textos: string[] = []
    let finalizacion = ""
    let bloqueo = ""
    let entrada = 0
    let salida = 0
    const lector = res.body.getReader()
    const decodificador = new TextDecoder()
    let pendiente = ""

    const procesar = (linea: string) => {
        if (!linea.startsWith("data:")) return
        const cargaUtil = linea.slice(5).trim()
        if (!cargaUtil || cargaUtil === "[DONE]") return
        let j: unknown
        try {
            j = JSON.parse(cargaUtil)
        } catch {
            return
        }
        const raiz = obj(j)
        if (raiz.error) throw new ErrorIA(`Gemini devolvió un error: ${str(obj(raiz.error).message) || "desconocido"}`)
        bloqueo = str(obj(raiz.promptFeedback).blockReason) || bloqueo
        const candidato = obj(arr(raiz.candidates)[0])
        for (const parte of arr(obj(candidato.content).parts).map(obj)) {
            if (parte.thought !== true && typeof parte.text === "string") textos.push(parte.text)
        }
        finalizacion = str(candidato.finishReason) || finalizacion
        const uso = obj(raiz.usageMetadata)
        if (typeof uso.promptTokenCount === "number") entrada = uso.promptTokenCount
        // Los tokens de "pensamiento" también se cobran como salida.
        const salidaTotal = (Number(uso.candidatesTokenCount) || 0) + (Number(uso.thoughtsTokenCount) || 0)
        if (salidaTotal) salida = salidaTotal
    }

    for (;;) {
        const { done, value } = await lector.read()
        if (done) break
        pendiente += decodificador.decode(value, { stream: true })
        const lineas = pendiente.split(/\r?\n/)
        pendiente = lineas.pop() ?? ""
        lineas.forEach(procesar)
    }
    procesar(pendiente)

    if (bloqueo) throw new ErrorIA("Gemini bloqueó la solicitud por sus filtros de seguridad. Revisa que el briefing no contenga contenido sensible.")
    if (finalizacion === "MAX_TOKENS") throw new ErrorIA("La respuesta de Gemini quedó incompleta (demasiado larga). Simplifica el briefing o inténtalo de nuevo.")
    if (["SAFETY", "PROHIBITED_CONTENT", "BLOCKLIST", "SPII", "RECITATION"].includes(finalizacion)) {
        throw new ErrorIA("Gemini no pudo atender esta solicitud por sus filtros de seguridad.")
    }
    const texto = textos.join("")
    if (!texto.trim()) throw new ErrorIA("Gemini devolvió una respuesta vacía. Inténtalo de nuevo.")
    return { texto, entrada, salida }
}
