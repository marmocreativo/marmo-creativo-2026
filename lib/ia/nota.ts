import { SLUGS_BLOG } from "@/lib/blog-categorias"
import { sanitizarHtml } from "@/lib/blog-html"
import { ErrorIA, generarTexto } from "./gemini"
import { htmlFuentes, verificarFuentes } from "./fuentes"
import type { MetaIA, NotaIA } from "./tipos"

const MIN_FUENTES = 2

export type EntradaNota = { titulo: string; contenido: string; palabraClave: string }

// Quita las vallas ```html … ``` que a veces pone el modelo.
const sinVallas = (t: string) =>
    t
        .trim()
        .replace(/^```[a-z]*\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim()

export async function redactarNota(e: EntradaNota): Promise<NotaIA> {
    const prompt = `Eres redactor SEO senior de Marmo Creativo, un estudio mexicano de páginas web, software a la medida y diseño gráfico. Escribe una nota de blog en español de México.

TEMA / TÍTULO: ${e.titulo}
${e.palabraClave ? `PALABRA CLAVE PRINCIPAL: ${e.palabraClave}\n` : ""}NOTAS DEL EDITOR (ideas, datos y enfoque que quiere ver en la nota; úsalas como base):
${e.contenido || "(sin notas adicionales: decide tú el mejor enfoque para el tema)"}

INVESTIGACIÓN OBLIGATORIA
- Usa la búsqueda de Google para encontrar información actual y confiable: documentación oficial, estudios, medios reconocidos, sitios de las propias herramientas o instituciones.
- Todo dato, cifra, fecha, nombre de herramienta, norma o afirmación técnica verificable debe salir de lo que encontraste. Si no encuentras respaldo para algo, NO lo afirmes.
- No inventes estadísticas, citas, precios, estudios ni enlaces. No atribuyas a Marmo Creativo clientes, casos ni precios que no estén en las notas del editor.
- Menciona en el texto el nombre de la fuente cuando uses un dato (por ejemplo: "según la documentación de Google Search Central…"). Parafrasea; no copies frases textuales largas.

REDACCIÓN
- 900 a 1,300 palabras. Tono cercano y profesional, tuteo, frases claras, sin relleno ni frases de moda.
- La introducción responde la intención de búsqueda en las primeras líneas.
- 4 a 6 secciones con subtítulos (h2, y h3 si hace falta). Usa listas o una tabla cuando ayuden a comparar.
- Incluye una sección "Preguntas frecuentes" (3 o 4 preguntas con respuesta breve) y cierra con un siguiente paso para el lector.

FORMATO DE SALIDA
Devuelve SOLO el cuerpo en HTML limpio, usando únicamente: h2, h3, p, ul, ol, li, strong, em, a, table, thead, tbody, tr, th, td, blockquote.
Sin h1, sin <html> ni <body>, sin Markdown, sin bloque de código, sin comentarios y sin sección de fuentes (esa la agrego yo).`

    const r = await generarTexto(prompt, { buscar: true })
    const cuerpo = sanitizarHtml(sinVallas(r.texto))
    if (cuerpo.length < 400) throw new ErrorIA("La nota que devolvió Gemini quedó demasiado corta. Inténtalo de nuevo con más notas o un tema más específico.")

    const fuentes = await verificarFuentes(r.fuentes)
    if (fuentes.length < MIN_FUENTES) {
        throw new ErrorIA(
            `Gemini no pudo respaldar la nota con suficientes fuentes reales (${fuentes.length} verificada${fuentes.length === 1 ? "" : "s"}; se requieren ${MIN_FUENTES}). ` +
                "Por seguridad no se generó la nota. Inténtalo de nuevo o reformula el tema para que sea más concreto.",
        )
    }

    return { html: `${cuerpo}${htmlFuentes(fuentes)}`, fuentes, consultas: r.consultas.slice(0, 12) }
}

// ───────────── Metadatos e ideas de imágenes ─────────────

const slugify = (t: string) =>
    t
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80)
        .replace(/-+$/g, "")

function extraerJson(texto: string): Record<string, unknown> {
    const limpio = sinVallas(texto)
    const ini = limpio.indexOf("{")
    const fin = limpio.lastIndexOf("}")
    if (ini < 0 || fin <= ini) throw new ErrorIA("Gemini no devolvió los metadatos en el formato esperado. Inténtalo de nuevo.")
    try {
        return JSON.parse(limpio.slice(ini, fin + 1)) as Record<string, unknown>
    } catch {
        throw new ErrorIA("Gemini no devolvió los metadatos en el formato esperado. Inténtalo de nuevo.")
    }
}

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "")

export async function generarMetadatos(titulo: string, html: string, palabraClave: string): Promise<MetaIA> {
    const plano = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 7000)
    const prompt = `A partir de esta nota de blog de Marmo Creativo (estudio mexicano de páginas web, software y diseño), devuelve SOLO un objeto JSON válido (sin texto antes ni después, sin bloque de código) con estas claves:

- "titulo": título atractivo de la nota, máximo 60 caracteres, con la palabra clave al inicio (si el del editor ya es bueno, déjalo).
- "slug": URL en minúsculas, sin acentos, solo letras, números y guiones, máximo 70 caracteres.
- "resumen": 150 a 250 caracteres, para tarjetas del blog.
- "meta_titulo": máximo 60 caracteres.
- "meta_descripcion": entre 120 y 155 caracteres, resume la nota e invita a hacer clic.
- "palabra_clave": la consulta principal a la que apunta la nota (2 a 5 palabras).
- "categoria": exactamente una de: ${SLUGS_BLOG.join(", ")}.
- "portada_alt": descripción de la imagen de portada, máximo 120 caracteres, en español.
- "imagenes": arreglo de EXACTAMENTE 2 objetos {"prompt","alt"}. "prompt" es una descripción EN INGLÉS para generar una imagen editorial relacionada con el tema (la primera será la portada horizontal; la segunda ilustra una sección). Sin texto, sin letras, sin logotipos, sin marcas reales y sin rostros de personas reconocibles; escenas o conceptos visuales claros. "alt" es el texto alternativo en español (máximo 120 caracteres).

TÍTULO DEL EDITOR: ${titulo}
${palabraClave ? `PALABRA CLAVE DEL EDITOR: ${palabraClave}\n` : ""}
NOTA:
${plano}`

    const r = await generarTexto(prompt, { buscar: false })
    const j = extraerJson(r.texto)

    const categoria = typeof j.categoria === "string" && SLUGS_BLOG.includes(j.categoria) ? j.categoria : "paginas-web"
    const imagenes = (Array.isArray(j.imagenes) ? j.imagenes : [])
        .map((i) => ({ prompt: texto((i as Record<string, unknown>)?.prompt, 600), alt: texto((i as Record<string, unknown>)?.alt, 200) }))
        .filter((i) => i.prompt)
        .slice(0, 2)

    return {
        titulo: texto(j.titulo, 200) || titulo,
        slug: slugify(texto(j.slug, 120) || texto(j.titulo, 120) || titulo),
        resumen: texto(j.resumen, 300),
        meta_titulo: texto(j.meta_titulo, 80),
        meta_descripcion: texto(j.meta_descripcion, 220),
        palabra_clave: texto(j.palabra_clave, 120) || palabraClave,
        categoria,
        portada_alt: texto(j.portada_alt, 200),
        imagenes,
    }
}

// Estilo común de las imágenes del blog para que se vean como una familia.
export const ESTILO_IMAGEN =
    "Clean modern editorial style, soft natural lighting, balanced composition, professional and approachable mood. No text, no letters, no numbers, no logos, no watermarks, no recognizable real people."
