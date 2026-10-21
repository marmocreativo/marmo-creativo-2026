import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import type { Procesada } from "@/lib/uploads"
import { archivosHistorialUsuario } from "@/lib/herramientas/historial"

export type ImagenGaleria = { id: number; id_proyecto: number; archivo: string; ancho: number; alto: number }

export async function listarGaleria(idProyecto: number): Promise<ImagenGaleria[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, id_proyecto, archivo, ancho, alto FROM proyecto_imagenes WHERE id_proyecto = ? ORDER BY id ASC",
        [idProyecto],
    )
    return rows as ImagenGaleria[]
}

export async function contarGaleria(idProyecto: number): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS n FROM proyecto_imagenes WHERE id_proyecto = ?", [
        idProyecto,
    ])
    return Number(rows[0].n)
}

export async function agregarImagen(idProyecto: number, p: Procesada): Promise<void> {
    await db.query<ResultSetHeader>(
        "INSERT INTO proyecto_imagenes (id_proyecto, archivo, ancho, alto) VALUES (?, ?, ?, ?)",
        [idProyecto, p.ruta, p.ancho, p.alto],
    )
}

// Borra la fila y devuelve la ruta del archivo para quitarlo del disco.
export async function quitarImagen(idImagen: number, idProyecto: number): Promise<string | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT archivo FROM proyecto_imagenes WHERE id = ? AND id_proyecto = ?",
        [idImagen, idProyecto],
    )
    if (!rows[0]) return null
    await db.query("DELETE FROM proyecto_imagenes WHERE id = ?", [idImagen])
    return rows[0].archivo as string
}

const col = (rows: RowDataPacket[], campo: string) => rows.map((r) => r[campo] as string | null).filter((v): v is string => !!v)

// Todos los archivos que pertenecen a un registro (para limpiarlos del disco al borrarlo).
export async function archivosDeRegistro(slug: string, id: number): Promise<string[]> {
    if (slug === "usuarios") {
        const [u] = await db.query<RowDataPacket[]>("SELECT avatar FROM usuarios WHERE id = ?", [id])
        return [...col(u, "avatar"), ...(await archivosHistorialUsuario(id))]
    }
    if (slug === "proyectos") {
        const [p] = await db.query<RowDataPacket[]>("SELECT portada FROM proyectos WHERE id = ?", [id])
        const [g] = await db.query<RowDataPacket[]>("SELECT archivo FROM proyecto_imagenes WHERE id_proyecto = ?", [id])
        return [...col(p, "portada"), ...col(g, "archivo")]
    }
    if (slug === "clientes") {
        const [c] = await db.query<RowDataPacket[]>("SELECT logo FROM clientes WHERE id = ?", [id])
        const [p] = await db.query<RowDataPacket[]>("SELECT portada FROM proyectos WHERE id_cliente = ?", [id])
        const [g] = await db.query<RowDataPacket[]>(
            "SELECT i.archivo FROM proyecto_imagenes i JOIN proyectos p ON p.id = i.id_proyecto WHERE p.id_cliente = ?",
            [id],
        )
        return [...col(c, "logo"), ...col(p, "portada"), ...col(g, "archivo")]
    }
    return []
}
