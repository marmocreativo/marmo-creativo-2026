import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { listarGaleria, type ImagenGaleria } from "@/lib/crm/galeria"
import { SLUGS_CATEGORIA } from "@/lib/portafolio-categorias"

export type ItemPortafolio = {
    id: number
    slug: string
    titulo: string
    categoria: string
    descripcion: string | null
    imagen: string
}

export type ProyectoPortafolio = ItemPortafolio & { galeria: ImagenGaleria[] }

function slugify(texto: string) {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60)
}

// URL pública: "12-sitio-web-capetillo". Lo que cuenta es el id; el texto es para SEO.
export const slugProyecto = (id: number, titulo: string) => `${id}-${slugify(titulo) || "proyecto"}`

const COLUMNAS = `p.id, p.titulo, p.categoria_portafolio AS categoria, p.descripcion_portafolio AS descripcion,
    COALESCE(p.portada, (SELECT i.archivo FROM proyecto_imagenes i WHERE i.id_proyecto = p.id ORDER BY i.id LIMIT 1)) AS imagen`

type Fila = RowDataPacket & { id: number; titulo: string; categoria: string; descripcion: string | null; imagen: string }

const aItem = (f: Fila): ItemPortafolio => ({
    id: f.id,
    slug: slugProyecto(f.id, f.titulo),
    titulo: f.titulo,
    categoria: f.categoria,
    descripcion: f.descripcion,
    imagen: f.imagen,
})

// Proyectos publicados con imagen, más recientes primero.
export async function listarPortafolio(opts: { categorias?: string[]; limite?: number } = {}): Promise<ItemPortafolio[]> {
    const categorias = (opts.categorias ?? []).filter((c) => SLUGS_CATEGORIA.includes(c))
    const params: (string | number)[] = [...categorias, opts.limite ?? 60]
    const [rows] = await db.query<Fila[]>(
        `SELECT ${COLUMNAS}
         FROM proyectos p
         WHERE p.mostrar_en_portafolio = 1 AND p.categoria_portafolio IS NOT NULL
         ${categorias.length ? `AND p.categoria_portafolio IN (${categorias.map(() => "?").join(",")})` : ""}
         HAVING imagen IS NOT NULL
         ORDER BY p.id DESC LIMIT ?`,
        params,
    )
    return rows.map(aItem)
}

export async function obtenerPortafolio(id: number): Promise<ProyectoPortafolio | null> {
    const [rows] = await db.query<Fila[]>(
        `SELECT ${COLUMNAS} FROM proyectos p
         WHERE p.id = ? AND p.mostrar_en_portafolio = 1 AND p.categoria_portafolio IS NOT NULL
         HAVING imagen IS NOT NULL`,
        [id],
    )
    if (!rows[0]) return null
    return { ...aItem(rows[0]), galeria: await listarGaleria(id) }
}
