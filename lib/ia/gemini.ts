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
