import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { hoyMX } from "@/lib/crm/semana"
import { SLUGS_BLOG } from "@/lib/blog-categorias"

export type ResumenArticulo = {
    id: number
    slug: string
    titulo: string
    resumen: string
    categoria: string
    portada: string | null
    fecha: string // YYYY-MM-DD
    actualizado: string // YYYY-MM-DD
}

export type Articulo = ResumenArticulo & { contenido: string }

type Fila = RowDataPacket & {
    id: number
    slug: string
    titulo: string
    resumen: string
    categoria: string
    portada: string | null
    fecha: string
    actualizado: string
    contenido?: string
}

const COLUMNAS = `a.id, a.slug, a.titulo, a.resumen, a.categoria, a.portada,
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
    const [rows] = await db.query<Fila[]>(`SELECT ${COLUMNAS}, a.contenido FROM articulos a WHERE a.slug = ? AND ${VISIBLE}`, [slug, hoyMX()])
    if (!rows[0]) return null
    return { ...aResumen(rows[0]), contenido: rows[0].contenido ?? "" }
}

// Minutos de lectura (≈ 200 palabras por minuto).
export const minutosLectura = (texto: string) => Math.max(1, Math.round(texto.split(/\s+/).filter(Boolean).length / 200))

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
export const fechaLarga = (iso: string) => {
    const [a, m, d] = iso.split("-").map(Number)
    return `${d} de ${MESES[m - 1]} de ${a}`
}
