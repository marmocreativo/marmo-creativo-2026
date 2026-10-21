import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { columnasDe, etiquetaRelacion, type Recurso, type Relacion } from "./recursos"

export type Fila = Record<string, string | number | null>

// Tablas y columnas salen siempre de recursos.ts (nunca del usuario); los valores van parametrizados.

export type Filtros = { id_cliente?: number; id_proyecto?: number; estados?: string[] }

export async function listar(r: Recurso, f: Filtros = {}): Promise<Fila[]> {
    const joins: string[] = []
    const extras: string[] = []
    const where: string[] = []
    const params: (string | number)[] = []

    for (const c of r.campos) {
        if (!c.relacion) continue
        const rel = etiquetaRelacion[c.relacion]
        joins.push(`LEFT JOIN ${rel.tabla} j_${c.name} ON j_${c.name}.id = t.${c.name}`)
        extras.push(`j_${c.name}.${rel.columna} AS ${c.name}__label`)
    }

    if (r.tabla === "proyectos") {
        extras.push("(SELECT COUNT(*) FROM tareas x WHERE x.id_proyecto = t.id) AS n_tareas")
    }
    if (r.tabla === "tareas") {
        // El cliente de una tarea es el de su proyecto.
        extras.push(
            "(SELECT c.nombre FROM proyectos p JOIN clientes c ON c.id = p.id_cliente WHERE p.id = t.id_proyecto) AS cliente__label",
        )
    }

    if (f.id_cliente) {
        if (r.tabla === "tareas") where.push("t.id_proyecto IN (SELECT id FROM proyectos WHERE id_cliente = ?)")
        else if (r.tabla === "contactos" || r.tabla === "proyectos") where.push("t.id_cliente = ?")
        if (["tareas", "contactos", "proyectos"].includes(r.tabla)) params.push(f.id_cliente)
    }
    if (f.id_proyecto && r.tabla === "tareas") {
        where.push("t.id_proyecto = ?")
        params.push(f.id_proyecto)
    }

    if (f.estados?.length && r.tabla === "tareas") {
        where.push(`t.estado IN (${f.estados.map(() => "?").join(",")})`)
        params.push(...f.estados)
    }

    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT ${["t.*", ...extras].join(", ")} FROM ${r.tabla} t ${joins.join(" ")}
         ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY ${r.orden} LIMIT 500`,
        params,
    )
    return rows as Fila[]
}

export async function clientesConConteos(): Promise<Fila[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT t.*,
            (SELECT COUNT(*) FROM contactos x WHERE x.id_cliente = t.id) AS n_contactos,
            (SELECT COUNT(*) FROM proyectos x WHERE x.id_cliente = t.id) AS n_proyectos,
            (SELECT COUNT(*) FROM tareas k JOIN proyectos p ON p.id = k.id_proyecto
              WHERE p.id_cliente = t.id AND k.estado IN ('Por Iniciar','En Proceso')) AS n_tareas_abiertas
         FROM clientes t ORDER BY t.nombre ASC`,
    )
    return rows as Fila[]
}

// Usuarios para las cartas del admin. Nunca incluye el hash de la contraseña.
export async function usuariosParaCards(): Promise<Fila[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT t.id, t.nombre, t.email, t.avatar, t.rol, t.enviar_promociones, t.activo, t.created_at,
            (t.google_id IS NOT NULL) AS con_google,
            (t.password_hash IS NOT NULL) AS con_password,
            (SELECT COUNT(*) FROM tareas k WHERE k.id_responsable = t.id AND k.estado IN ('Por Iniciar','En Proceso')) AS n_tareas_abiertas
         FROM usuarios t ORDER BY t.rol ASC, t.nombre ASC`,
    )
    return rows as Fila[]
}

// Proyectos con su cliente, para los dropdowns de filtro.
export async function proyectosParaFiltro(): Promise<{ id: number; label: string; id_cliente: number }[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, titulo AS label, id_cliente FROM proyectos ORDER BY titulo ASC LIMIT 1000",
    )
    return rows as { id: number; label: string; id_cliente: number }[]
}

export async function obtener(r: Recurso, id: number): Promise<Fila | null> {
    const [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM ${r.tabla} WHERE id = ?`, [id])
    return (rows[0] as Fila) ?? null
}

export async function crear(r: Recurso, datos: Fila): Promise<number> {
    const cols = Object.keys(datos)
    const [res] = await db.query<ResultSetHeader>(
        `INSERT INTO ${r.tabla} (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`,
        cols.map((c) => datos[c]),
    )
    return res.insertId
}

export async function actualizar(r: Recurso, id: number, datos: Fila): Promise<void> {
    const cols = Object.keys(datos)
    if (cols.length === 0) return
    await db.query(`UPDATE ${r.tabla} SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [
        ...cols.map((c) => datos[c]),
        id,
    ])
}

export async function eliminar(r: Recurso, id: number): Promise<void> {
    await db.query(`DELETE FROM ${r.tabla} WHERE id = ?`, [id])
}

export async function opciones(rel: Relacion): Promise<{ id: number; label: string }[]> {
    const { tabla, columna } = etiquetaRelacion[rel]
    const where = rel === "usuarios" ? "WHERE rol = 'admin' AND activo = 1" : ""
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT id, ${columna} AS label FROM ${tabla} ${where} ORDER BY ${columna} ASC LIMIT 1000`,
    )
    return rows as { id: number; label: string }[]
}

// Opciones de todos los selects con relación de un recurso, indexadas por tabla relacionada.
export async function opcionesDe(r: Recurso) {
    const rels = [...new Set(r.campos.flatMap((c) => (c.relacion ? [c.relacion] : [])))]
    const pares = await Promise.all(rels.map(async (k) => [k, await opciones(k)] as const))
    return Object.fromEntries(pares)
}

export async function contar(tabla: string, where = ""): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(`SELECT COUNT(*) AS n FROM ${tabla} ${where}`)
    return Number(rows[0].n)
}

export { columnasDe }
