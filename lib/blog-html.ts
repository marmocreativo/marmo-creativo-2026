import sanitizeHtml from "sanitize-html"

// El contenido del blog lo produce el editor visual (HTML). Aun siendo de un administrador, se limpia al guardar y otra vez al
// publicar: solo etiquetas de texto, listas, tablas, enlaces e imágenes; sin scripts, estilos ni atributos de eventos.
const PERMITIDAS = [
    "h2", "h3", "h4", "p", "br", "hr", "ul", "ol", "li", "strong", "b", "em", "i", "u", "s", "blockquote",
    "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "code", "pre",
]

export function sanitizarHtml(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: PERMITIDAS,
        allowedAttributes: {
            a: ["href", "title", "target", "rel"],
            img: ["src", "alt", "title", "width", "height"],
            th: ["colspan", "rowspan"],
            td: ["colspan", "rowspan"],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"], // sin data: ni javascript:
        allowProtocolRelative: false,
        transformTags: {
            h1: "h2", // el título del artículo ya es el H1
            a: (_tag, attribs) => {
                const externo = /^https?:\/\//i.test(attribs.href ?? "")
                return { tagName: "a", attribs: externo ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs }
            },
        },
    }).trim()
}

// "¿Cuánto cuesta?" -> "cuanto-cuesta": ancla para los subtítulos.
export const ancla = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

const textoPlano = (html: string) =>
    html
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .trim()

// HTML limpio con id en los subtítulos (h2/h3) + el índice de los h2.
export function prepararHtml(html: string): { html: string; indice: { id: string; titulo: string }[] } {
    const limpio = sanitizarHtml(html)
    const usados = new Set<string>()
    const indice: { id: string; titulo: string }[] = []
    const conIds = limpio.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_m, tag: string, interior: string) => {
        const titulo = textoPlano(interior)
        let id = ancla(titulo) || "seccion"
        for (let n = 2; usados.has(id); n++) id = `${ancla(titulo) || "seccion"}-${n}`
        usados.add(id)
        if (tag === "h2") indice.push({ id, titulo })
        return `<${tag} id="${id}">${interior}</${tag}>`
    })
    // Cada tabla va en un contenedor con scroll horizontal para que no desborde la página en el celular.
    const envuelto = conIds.replace(/<table>/g, '<div class="tabla-scroll"><table>').replace(/<\/table>/g, "</table></div>")
    return { html: envuelto, indice }
}

// Palabras del texto (para el tiempo de lectura), sin etiquetas.
export const contarPalabras = (html: string) => textoPlano(html).split(/\s+/).filter(Boolean).length

// Rutas /archivos/articulos/... usadas dentro del contenido (HTML o Markdown), para limpiarlas del disco al borrar el artículo.
export const imagenesDelContenido = (contenido: string): string[] =>
    [...new Set([...contenido.matchAll(/\/archivos\/articulos\/[A-Za-z0-9._-]+/g)].map((m) => m[0]))]
