import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import type { Procesada } from "@/lib/uploads"

export type ImagenArticulo = { id: number; id_articulo: number; archivo: string; ancho: number; alto: number; descripcion: string | null }

export async function listarGaleriaArticulo(idArticulo: number): Promise<ImagenArticulo[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, id_articulo, archivo, ancho, alto, descripcion FROM articulo_imagenes WHERE id_articulo = ? ORDER BY id ASC",
        [idArticulo],
    )
    return rows as ImagenArticulo[]
}

export async function contarGaleriaArticulo(idArticulo: number): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS n FROM articulo_imagenes WHERE id_articulo = ?", [idArticulo])
    return Number(rows[0].n)
}

export async function agregarImagenArticulo(idArticulo: number, p: Procesada): Promise<void> {
    await db.query("INSERT INTO articulo_imagenes (id_articulo, archivo, ancho, alto) VALUES (?, ?, ?, ?)", [idArticulo, p.ruta, p.ancho, p.alto])
}

// Borra la fila y devuelve la ruta del archivo para quitarlo del disco.
export async function quitarImagenArticulo(idImagen: number, idArticulo: number): Promise<string | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT archivo FROM articulo_imagenes WHERE id = ? AND id_articulo = ?", [idImagen, idArticulo])
    if (!rows[0]) return null
    await db.query("DELETE FROM articulo_imagenes WHERE id = ?", [idImagen])
    return rows[0].archivo as string
}

export async function describirImagenArticulo(idImagen: number, idArticulo: number, descripcion: string | null): Promise<void> {
    await db.query("UPDATE articulo_imagenes SET descripcion = ? WHERE id = ? AND id_articulo = ?", [descripcion, idImagen, idArticulo])
}
