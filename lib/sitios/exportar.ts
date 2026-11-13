import { readFile } from "node:fs/promises"
import { strToU8, zipSync } from "fflate"
import { rutaEnDisco } from "@/lib/uploads"
import type { Archivo, Pagina, Sitio } from "./repo"

// Exportar el sitio: arma el ZIP listo para subir a cualquier hosting (HTML, styles.css, imágenes por carpeta,
// sitemap.xml y robots.txt) y revisa antes lo que normalmente se olvida (SEO básico, enlaces, imágenes).

export class ErrorExportar extends Error {}

export type Aviso = { nivel: "error" | "aviso"; pagina?: string; texto: string }

const archivoDe = (p: Pagina) => (p.slug === "index" ? "index.html" : `${p.slug}.html`)
const RUTA_IMAGEN = /(https?:\/\/[^\s"'()<>]*?)?\/archivos\/sitios\/([0-9a-f-]{36})\.webp/gi

const slugificar = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40)

export const dominioDe = (s: Sitio) => (s.seo.dominio ?? "").trim().toLowerCase()

// ---- Revisión previa --------------------------------------------------------------------------------

export function revisar(s: Sitio, paginas: Pagina[], archivos: Archivo[]): Aviso[] {
    const avisos: Aviso[] = []
    if (!dominioDe(s)) avisos.push({ nivel: "error", texto: "Falta el dominio del sitio (paso 2, SEO). Se necesita para el sitemap.xml y las direcciones canónicas." })
    if (!s.css.trim()) avisos.push({ nivel: "error", texto: "La hoja de estilos (styles.css) está vacía." })

    const slugs = new Set(paginas.map((p) => p.slug))
    const usadas = new Set<string>()

    for (const p of paginas) {
        const h = p.html
        const donde = archivoDe(p)
        if (h.trim().length < 80) {
            avisos.push({ nivel: "error", pagina: donde, texto: "La página está vacía." })
            continue
        }
        const titulo = h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? ""
        const desc = h.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0].match(/content=["']([^"']*)["']/i)?.[1]?.trim() ?? ""
        const h1 = (h.match(/<h1[\s>]/gi) ?? []).length

        if (!titulo) avisos.push({ nivel: "error", pagina: donde, texto: "No tiene <title>." })
        else if (titulo.length > 65) avisos.push({ nivel: "aviso", pagina: donde, texto: `El título mide ${titulo.length} caracteres (Google suele cortar después de 60).` })
        if (!desc) avisos.push({ nivel: "error", pagina: donde, texto: "No tiene meta descripción." })
        else if (desc.length < 70 || desc.length > 160) avisos.push({ nivel: "aviso", pagina: donde, texto: `La meta descripción mide ${desc.length} caracteres (lo ideal es de 120 a 155).` })
        if (h1 !== 1) avisos.push({ nivel: "aviso", pagina: donde, texto: h1 === 0 ? "No tiene <h1>." : `Tiene ${h1} <h1> (debe haber uno solo).` })
        if (!/rel=["']canonical["']/i.test(h)) avisos.push({ nivel: "aviso", pagina: donde, texto: "No tiene dirección canónica (<link rel=\"canonical\">)." })
        if (!/<html[^>]+lang=/i.test(h)) avisos.push({ nivel: "aviso", pagina: donde, texto: "Falta el idioma en <html lang=\"es\">." })
        if (!/href=["']styles\.css["']/i.test(h)) avisos.push({ nivel: "error", pagina: donde, texto: "No enlaza la hoja de estilos (styles.css)." })

        const sinAlt = (h.match(/<img\b[^>]*>/gi) ?? []).filter((i) => !/\balt=["'][^"']+["']/i.test(i)).length
        if (sinAlt) avisos.push({ nivel: "aviso", pagina: donde, texto: `${sinAlt} imagen(es) sin texto alternativo (alt).` })

        const rotos = new Set<string>()
        for (const m of h.matchAll(/\bhref=["']([^"'#:?]+\.html)(?:#[^"']*)?["']/gi)) {
            const slug = m[1].replace(/^\.?\//, "").replace(/\.html$/, "")
            if (!slugs.has(slug) && !/^(https?:)?\/\//.test(m[1])) rotos.add(m[1])
        }
        if (rotos.size) avisos.push({ nivel: "error", pagina: donde, texto: `Enlaces a páginas que no existen: ${[...rotos].join(", ")}.` })

        for (const m of h.matchAll(RUTA_IMAGEN)) usadas.add(`/archivos/sitios/${m[2]}.webp`)
    }
    for (const m of s.css.matchAll(RUTA_IMAGEN)) usadas.add(`/archivos/sitios/${m[2]}.webp`)

    const delProyecto = new Set(archivos.filter((a) => a.tipo === "galeria" || a.tipo === "logo").map((a) => a.archivo))
    for (const u of usadas) if (!delProyecto.has(u)) avisos.push({ nivel: "error", texto: `El código usa una imagen que no está en la galería del proyecto: ${u}` })
    const sinUsar = archivos.filter((a) => a.tipo === "galeria" && !usadas.has(a.archivo)).length
    if (sinUsar) avisos.push({ nivel: "aviso", texto: `${sinUsar} imagen(es) de la galería no se usan en ninguna página: no se incluirán en el ZIP.` })

    return avisos
}

// ---- ZIP ----------------------------------------------------------------------------------------------

export async function armarZip(s: Sitio, paginas: Pagina[], archivos: Archivo[]): Promise<Uint8Array> {
    const dominio = dominioDe(s)
    if (!dominio) throw new ErrorExportar("Define el dominio del sitio en el paso 2 (SEO) para generar el sitemap.")
    if (!paginas.length) throw new ErrorExportar("El sitio no tiene páginas.")

    // Qué imágenes van y en qué carpeta: solo las que el código usa realmente.
    const textoTotal = paginas.map((p) => p.html).join("\n") + "\n" + s.css
    const usadas = new Set([...textoTotal.matchAll(RUTA_IMAGEN)].map((m) => `/archivos/sitios/${m[2]}.webp`))
    const destino = new Map<string, string>() // ruta en la app -> ruta en el ZIP
    const nombres = new Set<string>()
    for (const a of archivos.filter((x) => (x.tipo === "galeria" || x.tipo === "logo") && usadas.has(x.archivo))) {
        const carpeta = a.tipo === "logo" ? "img/logo" : "img/galeria"
        const base = slugificar(a.nombre ?? "") || (a.tipo === "logo" ? "logo" : "imagen")
        let nombre = `${carpeta}/${base}.webp`
        for (let i = 2; nombres.has(nombre); i++) nombre = `${carpeta}/${base}-${i}.webp`
        nombres.add(nombre)
        destino.set(a.archivo, nombre)
    }

    // /archivos/sitios/<id>.webp -> img/galeria/nombre.webp (relativo). Si venía con dominio, se conserva: https://dominio/img/...
    const reescribir = (texto: string) =>
        texto.replace(RUTA_IMAGEN, (todo, prefijo: string | undefined, id: string) => {
            const nuevo = destino.get(`/archivos/sitios/${id}.webp`)
            if (!nuevo) return todo
            return prefijo ? `${prefijo}/${nuevo}` : nuevo
        })

    const zip: Record<string, Uint8Array> = {}
    for (const p of paginas) zip[archivoDe(p)] = strToU8(reescribir(p.html))
    zip["styles.css"] = strToU8(reescribir(s.css))

    for (const [ruta, nuevo] of destino) {
        const abs = rutaEnDisco(ruta)
        if (!abs) continue
        try {
            zip[nuevo] = new Uint8Array(await readFile(/*turbopackIgnore: true*/ abs))
        } catch {
            throw new ErrorExportar(`No se encontró el archivo de una imagen (${ruta}). Vuelve a subirla a la galería.`)
        }
    }

    const hoy = new Date().toISOString().slice(0, 10)
    const urls = [...paginas]
        .sort((a, b) => (a.slug === "index" ? -1 : b.slug === "index" ? 1 : a.orden - b.orden))
        .map((p) => {
            const loc = p.slug === "index" ? `https://${dominio}/` : `https://${dominio}/${p.slug}.html`
            const prioridad = p.tipo === "home" ? "1.0" : p.tipo === "servicio" ? "0.8" : "0.6"
            return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${hoy}</lastmod>\n    <priority>${prioridad}</priority>\n  </url>`
        })
    zip["sitemap.xml"] = strToU8(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`)
    zip["robots.txt"] = strToU8(`User-agent: *\nAllow: /\n\nSitemap: https://${dominio}/sitemap.xml\n`)

    return zipSync(zip, { level: 6 })
}

export const nombreZip = (s: Sitio) => `${slugificar(s.nombre) || "sitio"}.zip`
