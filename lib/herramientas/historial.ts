import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import type { DatosHerramienta, DatosQR, Herramienta } from "./esquemas"

export type EntradaHistorial = {
    id: number
    herramienta: Herramienta
    titulo: string
    datos: DatosHerramienta
    created_at: string
}

const MAX_POR_HERRAMIENTA = 50

// MySQL devuelve el JSON ya parseado; MariaDB lo devuelve como texto.
const aEntrada = (r: RowDataPacket): EntradaHistorial => ({
    id: r.id,
    herramienta: r.herramienta,
    titulo: r.titulo,
    datos: typeof r.datos === "string" ? JSON.parse(r.datos) : r.datos,
    created_at: r.created_at,
})

export async function listarHistorial(idUsuario: number, herramienta?: Herramienta, limite = MAX_POR_HERRAMIENTA) {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT id, herramienta, titulo, datos, created_at FROM herramienta_historial
         WHERE id_usuario = ? ${herramienta ? "AND herramienta = ?" : ""} ORDER BY id DESC LIMIT ?`,
        herramienta ? [idUsuario, herramienta, limite] : [idUsuario, limite],
    )
    return rows.map(aEntrada)
}

export async function obtenerEntrada(idUsuario: number, id: number, herramienta: Herramienta) {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, herramienta, titulo, datos, created_at FROM herramienta_historial WHERE id = ? AND id_usuario = ? AND herramienta = ?",
        [id, idUsuario, herramienta],
    )
    return rows[0] ? aEntrada(rows[0]) : null
}

export async function ultimaEntrada(idUsuario: number, herramienta: Herramienta) {
    return (await listarHistorial(idUsuario, herramienta, 1))[0] ?? null
}

// Inserta y recorta el historial a las últimas 50. Devuelve los datos de lo recortado (para borrar sus archivos).
export async function guardarEntrada(
    idUsuario: number,
    herramienta: Herramienta,
    titulo: string,
    datos: DatosHerramienta,
): Promise<DatosHerramienta[]> {
    await db.query<ResultSetHeader>(
        "INSERT INTO herramienta_historial (id_usuario, herramienta, titulo, datos) VALUES (?, ?, ?, ?)",
        [idUsuario, herramienta, titulo.slice(0, 200), JSON.stringify(datos)],
    )
    const [viejas] = await db.query<RowDataPacket[]>(
        `SELECT id, herramienta, titulo, datos, created_at FROM herramienta_historial
         WHERE id_usuario = ? AND herramienta = ? ORDER BY id DESC LIMIT 18446744073709551615 OFFSET ?`,
        [idUsuario, herramienta, MAX_POR_HERRAMIENTA],
    )
    if (viejas.length) {
        await db.query("DELETE FROM herramienta_historial WHERE id IN (?)", [viejas.map((v) => v.id)])
    }
    return viejas.map((v) => aEntrada(v).datos)
}

export async function borrarEntrada(idUsuario: number, id: number): Promise<DatosHerramienta | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, herramienta, titulo, datos, created_at FROM herramienta_historial WHERE id = ? AND id_usuario = ?",
        [id, idUsuario],
    )
    if (!rows[0]) return null
    await db.query("DELETE FROM herramienta_historial WHERE id = ? AND id_usuario = ?", [id, idUsuario])
    return aEntrada(rows[0]).datos
}

export async function limpiarHistorial(idUsuario: number, herramienta: Herramienta): Promise<DatosHerramienta[]> {
    const todas = await listarHistorial(idUsuario, herramienta, 1000)
    await db.query("DELETE FROM herramienta_historial WHERE id_usuario = ? AND herramienta = ?", [idUsuario, herramienta])
    return todas.map((e) => e.datos)
}

// Archivos (logos de QR) que dependen de estos datos.
export const archivosDe = (datos: DatosHerramienta[]): string[] =>
    datos.flatMap((d) => ("logo" in d && typeof (d as DatosQR).logo === "string" ? [(d as DatosQR).logo as string] : []))

// Todos los archivos del historial de un usuario (para limpiarlos al borrar su cuenta).
export async function archivosHistorialUsuario(idUsuario: number): Promise<string[]> {
    return archivosDe((await listarHistorial(idUsuario, undefined, 1000)).map((e) => e.datos))
}
