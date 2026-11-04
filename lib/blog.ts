import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { hoyMX } from "@/lib/crm/semana"
import { SLUGS_BLOG } from "@/lib/blog-categorias"
import { listarGaleriaArticulo, type ImagenArticulo } from "@/lib/crm/galeria-articulos"

export type ResumenArticulo = {
    id: number
    slug: string
    titulo: string
    resumen: string
    categoria: string
    portada: string | null
    fecha: string // YYYY-MM-DD
    actualizado: string // YYYY-MM-DD
    noindex: boolean
}

export type Articulo = ResumenArticulo & {
    contenido: string
    formato: "markdown" | "html"
    portadaAlt: string | null
    metaTitulo: string | null
    metaDescripcion: string | null
    palabraClave: string | null
    galeria: ImagenArticulo[]
}

type Fila = RowDataPacket & {
    id: number
    slug: string
    titulo: string
    resumen: string
    categoria: string
    portada: string | null
    fecha: string
    actualizado: string
    noindex: number
    contenido?: string
    contenido_formato?: "markdown" | "html"
    portada_alt?: string | null
    meta_titulo?: string | null
    meta_descripcion?: string | null
    palabra_clave?: string | null
}

const COLUMNAS = `a.id, a.slug, a.titulo, a.resumen, a.categoria, a.portada, a.noindex,
    DATE_FORMAT(a.fecha_publicacion, '%Y-%m-%d') AS fecha, DATE_FORMAT(a.updated_at, '%Y-%m-%d') AS actualizado`

// Solo publicados cuya fecha ya llegó (una fecha futura los programa).
const VISIBLE = "a.publicado = 1 AND a.fecha_publicacion IS NOT NULL AND a.fecha_publicacion <= ?"

const aResumen = (f: Fila): ResumenArticulo => ({
    id: f.id,
    slug: f.slug,
    titulo: f.titulo,
    resumen: f.resumen,
    categoria: f.categoria,
    portada: f.portada,
    fecha: f.fecha,
    actualizado: f.actualizado,
    noindex: !!f.noindex,
})

export async function listarArticulos(opts: { categoria?: string; excluirId?: number; limite?: number } = {}): Promise<ResumenArticulo[]> {
    const where = [VISIBLE]
    const params: (string | number)[] = [hoyMX()]
    if (opts.categoria && SLUGS_BLOG.includes(opts.categoria)) {
        where.push("a.categoria = ?")
        params.push(opts.categoria)
    }
    if (opts.excluirId) {
        where.push("a.id <> ?")
        params.push(opts.excluirId)
    }
    params.push(opts.limite ?? 60)
    const [rows] = await db.query<Fila[]>(
        `SELECT ${COLUMNAS} FROM articulos a WHERE ${where.join(" AND ")} ORDER BY a.fecha_publicacion DESC, a.id DESC LIMIT ?`,
        params,
    )
    return rows.map(aResumen)
}

export async function obtenerArticulo(slug: string): Promise<Articulo | null> {
    const [rows] = await db.query<Fila[]>(
        `SELECT ${COLUMNAS}, a.contenido, a.contenido_formato, a.portada_alt, a.meta_titulo, a.meta_descripcion, a.palabra_clave
         FROM articulos a WHERE a.slug = ? AND ${VISIBLE}`,
        [slug, hoyMX()],
    )
    const f = rows[0]
    if (!f) return null
    return {
        ...aResumen(f),
        contenido: f.contenido ?? "",
        formato: f.contenido_formato === "html" ? "html" : "markdown",
        portadaAlt: f.portada_alt ?? null,
        metaTitulo: f.meta_titulo ?? null,
        metaDescripcion: f.meta_descripcion ?? null,
        palabraClave: f.palabra_clave ?? null,
        galeria: await listarGaleriaArticulo(f.id),
    }
}

// Minutos de lectura (≈ 200 palabras por minuto).
export const minutosLectura = (palabras: number) => Math.max(1, Math.round(palabras / 200))

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
export const fechaLarga = (iso: string) => {
    const [a, m, d] = iso.split("-").map(Number)
    return `${d} de ${MESES[m - 1]} de ${a}`
}
