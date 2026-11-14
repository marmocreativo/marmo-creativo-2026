import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import type { Uso } from "@/lib/ia/anthropic"

// Tareas de IA en segundo plano (propuestas / sitio completo): la pantalla consulta su estado cada pocos segundos.
// Así una generación larga no depende de que la conexión HTTP aguante abierta (el proxy la cortaría).

export type TipoTarea = "propuestas" | "sitio" | "edicion"
export type Tarea = {
    id: number
    tipo: TipoTarea
    estado: "ejecutando" | "listo" | "error"
    progreso: string | null
    error: string | null
    tokens_entrada: number
    tokens_salida: number
    costo_usd: number | null
}

// Si el servidor se reinició a media tarea, quedaría "ejecutando" para siempre: pasado este tiempo se da por fallida.
const MINUTOS_MAX = 20

const aTarea = (r: RowDataPacket): Tarea => ({
    id: r.id,
    tipo: r.tipo,
    estado: r.estado,
    progreso: r.progreso,
    error: r.error,
    tokens_entrada: Number(r.tokens_entrada),
    tokens_salida: Number(r.tokens_salida),
    costo_usd: r.costo_usd === null ? null : Number(r.costo_usd),
})

async function cerrarVencidas(idSitio: number) {
    await db.query(
        "UPDATE sitio_ia_tareas SET estado = 'error', error = 'La generación se interrumpió (el servidor se reinició o tardó demasiado). Inténtalo de nuevo.' WHERE id_sitio = ? AND estado = 'ejecutando' AND updated_at < NOW() - INTERVAL ? MINUTE",
        [idSitio, MINUTOS_MAX],
    )
}

export async function ultimaTarea(idSitio: number): Promise<Tarea | null> {
    await cerrarVencidas(idSitio)
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM sitio_ia_tareas WHERE id_sitio = ? ORDER BY id DESC LIMIT 1", [idSitio])
    return rows[0] ? aTarea(rows[0]) : null
}

// Crea la tarea. Si ya hay una corriendo para ese sitio devuelve null (una a la vez: cada una gasta dinero).
export async function iniciarTarea(idSitio: number, tipo: TipoTarea): Promise<number | null> {
    await cerrarVencidas(idSitio)
    const [rows] = await db.query<RowDataPacket[]>("SELECT id FROM sitio_ia_tareas WHERE id_sitio = ? AND estado = 'ejecutando' LIMIT 1", [idSitio])
    if (rows[0]) return null
    const [res] = await db.query<ResultSetHeader>("INSERT INTO sitio_ia_tareas (id_sitio, tipo, progreso) VALUES (?, ?, 'Preparando…')", [idSitio, tipo])
    return res.insertId
}

export async function progreso(idTarea: number, texto: string, uso?: Uso) {
    await db.query("UPDATE sitio_ia_tareas SET progreso = ?, tokens_entrada = COALESCE(?, tokens_entrada), tokens_salida = COALESCE(?, tokens_salida) WHERE id = ?", [
        texto.slice(0, 200),
        uso?.entrada ?? null,
        uso?.salida ?? null,
        idTarea,
    ])
}

export async function terminarTarea(idTarea: number, uso: Uso, resultado?: string) {
    await db.query("UPDATE sitio_ia_tareas SET estado = 'listo', progreso = 'Listo', tokens_entrada = ?, tokens_salida = ?, costo_usd = ?, resultado = ? WHERE id = ?", [
        uso.entrada,
        uso.salida,
        uso.conocido ? Number(uso.costo.toFixed(4)) : null,
        resultado ?? null,
        idTarea,
    ])
}

// Las ediciones guardan su resultado (los archivos modificados) hasta que la pantalla lo recoge: se entrega una sola vez.
export async function recogerResultado(idSitio: number, idTarea: number): Promise<string | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT resultado FROM sitio_ia_tareas WHERE id = ? AND id_sitio = ? AND tipo = 'edicion' AND estado = 'listo'", [idTarea, idSitio])
    const r = rows[0]?.resultado as string | null | undefined
    if (!r) return null
    await db.query("UPDATE sitio_ia_tareas SET resultado = NULL WHERE id = ?", [idTarea])
    return r
}

export async function fallarTarea(idTarea: number, mensaje: string, uso?: Uso) {
    await db.query("UPDATE sitio_ia_tareas SET estado = 'error', error = ?, tokens_entrada = COALESCE(?, tokens_entrada), tokens_salida = COALESCE(?, tokens_salida), costo_usd = COALESCE(?, costo_usd) WHERE id = ?", [
        mensaje.slice(0, 500),
        uso?.entrada ?? null,
        uso?.salida ?? null,
        uso?.conocido ? Number(uso.costo.toFixed(4)) : null,
        idTarea,
    ])
}

// Costo acumulado de IA de un sitio (todas sus tareas).
export async function consumoDelSitio(idSitio: number): Promise<{ costo: number; tareas: number }> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT COALESCE(SUM(costo_usd), 0) AS costo, COUNT(*) AS n FROM sitio_ia_tareas WHERE id_sitio = ?", [idSitio])
    return { costo: Number(rows[0].costo), tareas: Number(rows[0].n) }
}
