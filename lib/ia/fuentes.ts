import type { FuenteIA } from "./tipos"
import type { FuenteCruda } from "./gemini"

// Las fuentes que cita Gemini (a veces como enlaces de redirección de Google) se visitan una por una:
// se sigue la redirección hasta la página real, se confirma que responde y se lee su título.
// Solo las que existen entran a la nota. Así nunca se publica un enlace inventado o roto.

const UA = "Mozilla/5.0 (compatible; MarmoCreativoBot/1.0; +https://marmo-creativo.com)"
const MAX_FUENTES = 12
const MAX_SALTOS = 5

// Evita que una URL apunte a la red interna del servidor.
function esUrlPublica(texto: string): boolean {
    let u: URL
    try {
        u = new URL(texto)
    } catch {
        return false
    }
    if (u.protocol !== "http:" && u.protocol !== "https:") return false
    const h = u.hostname.toLowerCase()
    if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".localhost")) return false
    if (h.includes(":")) return false // IPv6 literal
    const ip = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
    if (ip) {
        const [a, b] = [Number(ip[1]), Number(ip[2])]
        if (a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return false
    }
    return true
}

const entidades = (t: string) =>
    t
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")

async function tituloDe(res: Response): Promise<string> {
    const lector = res.body?.getReader()
    if (!lector) return ""
    const decoder = new TextDecoder()
    let buffer = ""
    try {
        while (buffer.length < 65_536) {
            const { done, value } = await lector.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            if (/<\/title>/i.test(buffer)) break
        }
    } catch {
        // lectura interrumpida: se usa lo que haya
    } finally {
        lector.cancel().catch(() => {})
    }
    const m = buffer.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    return m ? entidades(m[1]).replace(/\s+/g, " ").trim().slice(0, 160) : ""
}

async function comprobar(inicial: string): Promise<FuenteIA | null> {
    let url = inicial
    for (let salto = 0; salto <= MAX_SALTOS; salto++) {
        if (!esUrlPublica(url)) return null
        let res: Response
        try {
            res = await fetch(url, {
                redirect: "manual",
                signal: AbortSignal.timeout(9_000),
                headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8" },
            })
        } catch {
            return null
        }
        if (res.status >= 300 && res.status < 400) {
            const destino = res.headers.get("location")
            await res.body?.cancel().catch(() => {})
            if (!destino) return null
            try {
                url = new URL(destino, url).toString()
            } catch {
                return null
            }
            continue
        }
        // Algunos sitios reales bloquean a los robots (401/403/405/429): existen, solo que no nos dejan leerlos.
        const existe = res.status < 400 || [401, 403, 405, 429].includes(res.status)
        if (!existe) {
            await res.body?.cancel().catch(() => {})
            return null
        }
        const esHtml = /html/i.test(res.headers.get("content-type") ?? "")
        const titulo = res.status < 400 && esHtml ? await tituloDe(res) : ""
        if (!(res.status < 400 && esHtml)) await res.body?.cancel().catch(() => {})
        const host = new URL(url).hostname.replace(/^www\./, "")
        return { url, titulo: titulo || host }
    }
    return null
}

export async function verificarFuentes(crudas: FuenteCruda[]): Promise<FuenteIA[]> {
    const unicas = [...new Set(crudas.map((f) => f.url))].slice(0, MAX_FUENTES)
    const resultados = await Promise.all(unicas.map((u) => comprobar(u)))
    const vistas = new Set<string>()
    const finales: FuenteIA[] = []
    for (const r of resultados) {
        if (!r) continue
        const clave = r.url.replace(/#.*$/, "").replace(/\/$/, "")
        if (vistas.has(clave)) continue
        vistas.add(clave)
        finales.push(r)
    }
    return finales
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

// Sección final de la nota con las fuentes verificadas.
export function htmlFuentes(fuentes: FuenteIA[]): string {
    if (fuentes.length === 0) return ""
    const items = fuentes
        .map((f) => {
            const host = new URL(f.url).hostname.replace(/^www\./, "")
            return `<li><a href="${esc(f.url)}">${esc(f.titulo)}</a> (${esc(host)})</li>`
        })
        .join("")
    return `<h2>Fuentes consultadas</h2><ol>${items}</ol>`
}
