import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import type { Bloque } from "@/lib/ia/anthropic"
import { rutaEnDisco } from "@/lib/uploads"
import { BRIEFING } from "./campos"
import { listarArchivos, type Archivo, type Sitio } from "./repo"

const MAX_GALERIA = 8
const MAX_REFERENCIAS = 6
const MAX_BYTES_PDF = 20 * 1024 * 1024

async function leer(ruta: string): Promise<Buffer | null> {
    const abs = rutaEnDisco(ruta)
    if (!abs) return null
    try {
        return await readFile(/*turbopackIgnore: true*/ abs)
    } catch {
        return null
    }
}

// Todas las imágenes del creador se guardan como WebP.
const bloqueImagen = (datos: Buffer): Bloque => ({ type: "image", source: { type: "base64", media_type: "image/webp", data: datos.toString("base64") } })

export type Contexto = {
    bloques: Bloque[]
    galeria: Archivo[]
    logo: Archivo | null
    referencias: Archivo[]
}

// Texto con todo lo que sabemos del negocio. Va entre etiquetas para que el modelo lo trate como datos.
function textoDelSitio(s: Sitio, docs: Archivo[], analisis: string | null): string {
    const lineas = BRIEFING.flatMap((c) => (s.briefing[c.name] ? [`${c.label}: ${s.briefing[c.name]}`] : []))
    const seo = [
        s.seo.palabra_clave && `Palabra clave principal: ${s.seo.palabra_clave}`,
        s.seo.palabras_secundarias && `Palabras clave secundarias: ${s.seo.palabras_secundarias}`,
        s.seo.dominio && `Dominio: ${s.seo.dominio}`,
    ].filter(Boolean)
    const b = s.branding
    const marca = `Colores: principal ${b.color_primario}, secundario ${b.color_secundario}, acento ${b.color_acento}, fondo ${b.color_fondo}, texto ${b.color_texto}. Tipografías: títulos ${b.fuente_titulos}, texto ${b.fuente_texto}.`
    const documentos = docs.flatMap((d) => (d.texto ? [`[${d.nombre ?? "documento"}]\n${d.texto}`] : []))

    return [
        "<datos_del_cliente>",
        `<briefing>\nNombre del proyecto: ${s.nombre}\n${lineas.join("\n")}\n</briefing>`,
        `<seo>\n${seo.join("\n") || "Sin palabra clave definida: propón una apropiada."}\n</seo>`,
        `<marca>\n${marca}\n</marca>`,
        documentos.length ? `<documentos>\n${documentos.join("\n\n")}\n</documentos>` : "",
        analisis ? `<analisis_de_referencias>\n${analisis}\n</analisis_de_referencias>` : "",
        "</datos_del_cliente>",
    ]
        .filter(Boolean)
        .join("\n")
}

// Arma lo que recibe el modelo: texto + PDFs + imágenes (logo, galería y referencias).
// Con `conImagenes: false` va solo el texto (para las páginas internas, que reciben la lista de imágenes ya descrita).
export async function construirContexto(s: Sitio, opciones: { conImagenes: boolean; analisis?: string | null }): Promise<Contexto> {
    const [docs, galeriaTodas, logos, referencias] = await Promise.all([
        listarArchivos(s.id, "documento"),
        listarArchivos(s.id, "galeria"),
        listarArchivos(s.id, "logo"),
        listarArchivos(s.id, "referencia"),
    ])
    const galeria = galeriaTodas.slice(0, MAX_GALERIA)
    const logo = logos[0] ?? null
    const bloques: Bloque[] = [{ type: "text", text: textoDelSitio(s, docs, opciones.analisis ?? null) }]
    if (!opciones.conImagenes) return { bloques, galeria, logo, referencias: [] }

    // PDFs que sube el cliente: Claude los lee directamente.
    let bytesPdf = 0
    for (const d of docs.filter((x) => !x.texto && x.archivo.endsWith(".pdf"))) {
        const datos = await leer(d.archivo)
        if (!datos || bytesPdf + datos.length > MAX_BYTES_PDF) continue
        bytesPdf += datos.length
        bloques.push({ type: "document", title: d.nombre ?? "documento.pdf", source: { type: "base64", media_type: "application/pdf", data: datos.toString("base64") } })
    }

    if (logo) {
        const datos = await leer(logo.archivo)
        if (datos) bloques.push({ type: "text", text: `Logo del cliente (ruta: ${logo.archivo}, ${logo.ancho}x${logo.alto}):` }, bloqueImagen(datos))
    }
    for (const g of galeria) {
        const datos = await leer(g.archivo)
        if (datos) bloques.push({ type: "text", text: `Imagen de la galería (ruta: ${g.archivo}, ${g.ancho}x${g.alto}):` }, bloqueImagen(datos))
    }
    if (galeriaTodas.length > MAX_GALERIA) {
        bloques.push({ type: "text", text: `(La galería tiene ${galeriaTodas.length - MAX_GALERIA} imágenes más que no se muestran; no las uses.)` })
    }
    const refs = referencias.slice(0, MAX_REFERENCIAS)
    bloques.push(...(await bloquesReferencias(refs)))
    return { bloques, galeria, logo, referencias: refs }
}

// Capturas de sitios de referencia (solo inspiración, no son del cliente).
export async function bloquesReferencias(refs: Archivo[]): Promise<Bloque[]> {
    const bloques: Bloque[] = []
    for (const r of refs.slice(0, MAX_REFERENCIAS)) {
        const datos = await leer(r.archivo)
        if (datos) bloques.push({ type: "text", text: "Captura de un sitio de referencia (solo inspiración, no es del cliente):" }, bloqueImagen(datos))
    }
    return bloques
}

// Cambia si cambian las URLs o las capturas: así el análisis guardado se reutiliza mientras no haya cambios.
export async function huellaReferencias(s: Sitio): Promise<string> {
    const refs = await listarArchivos(s.id, "referencia")
    return createHash("sha1").update(JSON.stringify([s.referencias_urls, refs.map((r) => r.id)])).digest("hex")
}
