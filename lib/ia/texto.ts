// Capa común del creador de sitios: el mismo código genera con Claude (Anthropic) o con Gemini (Google).
// El proveedor se elige en la pantalla, en cada generación; este módulo traduce la petición a cada API.

import { ErrorAnthropic, anthropicConfigurada, generarTexto as claude, modeloSitios as modeloClaude, type Bloque, type Herramienta, type Uso } from "./anthropic"
import { ErrorIA, generarConPartes, iaConfigurada as geminiConfigurado, modeloSitios as modeloGemini, type ParteGemini } from "./gemini"

export type Proveedor = "anthropic" | "gemini"
export type OpcionProveedor = { id: Proveedor; nombre: string; disponible: boolean }

export const esProveedor = (v: unknown): v is Proveedor => v === "anthropic" || v === "gemini"

export const proveedoresDisponibles = (): Record<Proveedor, boolean> => ({ anthropic: anthropicConfigurada(), gemini: geminiConfigurado() })

// Lo que muestra el selector. El nombre incluye el modelo real configurado.
export function opcionesProveedor(): OpcionProveedor[] {
    const d = proveedoresDisponibles()
    return [
        { id: "anthropic", nombre: `Claude (${modeloClaude()})`, disponible: d.anthropic },
        { id: "gemini", nombre: `Gemini (${modeloGemini()})`, disponible: d.gemini },
    ]
}

// Por defecto: SITIOS_IA_PROVEEDOR si está disponible; si no, Claude; si no hay Claude, Gemini.
export function proveedorPorDefecto(): Proveedor {
    const d = proveedoresDisponibles()
    const env = process.env.SITIOS_IA_PROVEEDOR?.trim()
    if (esProveedor(env) && d[env]) return env
    if (d.anthropic) return "anthropic"
    if (d.gemini) return "gemini"
    return "anthropic"
}

// Valida lo que llega del navegador. Si no manda proveedor, se usa el de por defecto.
export function resolverProveedor(entrada: unknown): { proveedor: Proveedor } | { error: string } {
    const p = entrada === undefined || entrada === null ? proveedorPorDefecto() : entrada
    if (!esProveedor(p)) return { error: "Proveedor de IA no válido." }
    if (!proveedoresDisponibles()[p]) {
        return { error: p === "gemini" ? "Gemini no está configurado: falta GEMINI_API_KEY en el servidor." : "Claude no está configurado: falta ANTHROPIC_API_KEY en el servidor." }
    }
    return { proveedor: p }
}

type Peticion = {
    proveedor: Proveedor
    sistema: string
    contenido: Bloque[]
    maxTokens: number
    effort?: "low" | "medium" | "high" // solo Claude
    conWeb?: boolean // dejar que el modelo lea las direcciones (URLs) que aparecen en el mensaje
    uso: Uso
}

// Los bloques de contenido (texto, imágenes y PDFs en base64) se arman una vez y aquí se adaptan a cada API.
function aPartes(bloques: Bloque[]): ParteGemini[] {
    const partes: ParteGemini[] = []
    for (const b of bloques) {
        if (b.type === "text") partes.push({ text: b.text })
        else if (b.type === "image" && b.source.type === "base64") partes.push({ inlineData: { mimeType: b.source.media_type, data: b.source.data } })
        else if (b.type === "document" && b.source.type === "base64") {
            if (b.title) partes.push({ text: `Documento PDF del cliente: ${b.title}` })
            partes.push({ inlineData: { mimeType: "application/pdf", data: b.source.data } })
        }
    }
    return partes
}

export async function generar(p: Peticion): Promise<string> {
    if (p.proveedor === "anthropic") {
        const herramientas: Herramienta[] = p.conWeb ? [{ type: "web_fetch_20260209", name: "web_fetch", max_uses: 4, max_content_tokens: 6000 }] : []
        return claude({ modelo: modeloClaude(), sistema: p.sistema, contenido: p.contenido, maxTokens: p.maxTokens, effort: p.effort, herramientas, uso: p.uso })
    }

    // Gemini. Los errores de su cliente (ErrorIA) ya traen un mensaje claro: se re-lanzan como los de Claude.
    const partes = aPartes(p.contenido)
    const llamar = (urlContext: boolean) => generarConPartes({ sistema: p.sistema, partes, maxTokens: p.maxTokens, urlContext })
    try {
        let r
        try {
            r = await llamar(!!p.conWeb)
        } catch (e) {
            // Si el modelo no admite leer direcciones, se sigue sin esa herramienta (las capturas siguen sirviendo).
            if (p.conWeb && e instanceof ErrorIA && e.estado === 400) r = await llamar(false)
            else throw e
        }
        p.uso.entrada += r.entrada
        p.uso.salida += r.salida
        p.uso.conocido = false // sin estimación de costo para Gemini
        return r.texto
    } catch (e) {
        if (e instanceof ErrorIA) throw new ErrorAnthropic(e.message)
        console.error("[gemini]", e)
        throw new ErrorAnthropic("Ocurrió un error inesperado al generar con Gemini.")
    }
}
