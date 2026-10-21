import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import mysql, { type Connection } from "mysql2/promise"
import { db } from "@/lib/db"
import {
    ES_LECTURA,
    MAX_FILAS,
    MAX_SQL,
    PROHIBIDO_EN_LECTURA,
    sinComentariosIniciales,
    type Celda,
    type Ejecucion,
    type Resultado,
} from "./tipos"

// La consola usa su PROPIA conexión (no el pool de la app): así "multipleStatements" solo existe aquí
// y nunca amplía el daño de una posible inyección SQL en el resto del sitio.
const conectar = (multiples: boolean) =>
    mysql.createConnection({
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER ?? "root",
        password: process.env.DB_PASSWORD ?? "",
        database: process.env.DB_NAME ?? "marmo_creativo",
        charset: "utf8mb4",
        dateStrings: true,
        connectTimeout: 10_000,
        multipleStatements: multiples,
        rowsAsArray: true,
    })

function formatear(v: unknown): Celda {
    if (v === null || v === undefined) return null
    if (typeof v === "number") return v
    if (typeof v === "bigint") return v.toString()
    if (v instanceof Date) return v.toISOString()
    if (Buffer.isBuffer(v)) return `0x${v.subarray(0, 24).toString("hex")}${v.length > 24 ? "…" : ""}`
    if (typeof v === "object") return JSON.stringify(v).slice(0, 1000)
    const s = String(v)
    return s.length > 1000 ? `${s.slice(0, 1000)}…` : s
}

type Encabezado = { affectedRows?: number; insertId?: number; info?: string; warningStatus?: number }

function aResultados(rows: unknown, fields: unknown): Resultado[] {
    // Varias sentencias: fields es un arreglo de (arreglo de columnas | undefined), uno por sentencia.
    const multiple =
        Array.isArray(rows) &&
        Array.isArray(fields) &&
        fields.length === rows.length &&
        fields.every((f) => f === undefined || Array.isArray(f))
    const pares: [unknown, unknown][] = multiple
        ? (rows as unknown[]).map((r, i) => [r, (fields as unknown[])[i]])
        : [[rows, fields]]

    return pares.map(([r, f]): Resultado => {
        if (Array.isArray(f)) {
            const filas = r as unknown[][]
            return {
                tipo: "filas",
                columnas: (f as { name: string }[]).map((c) => c.name),
                filas: filas.slice(0, MAX_FILAS).map((fila) => fila.map(formatear)),
                total: filas.length,
            }
        }
        const h = (r ?? {}) as Encabezado
        return {
            tipo: "ok",
            afectadas: h.affectedRows ?? 0,
            insertId: h.insertId ?? 0,
            info: h.info ?? "",
            advertencias: h.warningStatus ?? 0,
        }
    })
}

export async function ejecutarSQL(sql: string, escritura: boolean): Promise<Ejecucion> {
    const inicio = Date.now()
    const fallo = (error: string, codigo?: string): Ejecucion => ({ ok: false, error, codigo, ms: Date.now() - inicio })

    const texto = sql.trim()
    if (!texto) return fallo("Escribe una consulta.")
    if (texto.length > MAX_SQL) return fallo("La consulta es demasiado grande (máximo 1 MB).")

    if (!escritura) {
        if (!ES_LECTURA.test(sinComentariosIniciales(texto))) {
            return fallo("En modo solo lectura únicamente se permiten SELECT, SHOW, DESCRIBE y EXPLAIN. Cambia a modo escritura para otras sentencias.")
        }
        if (PROHIBIDO_EN_LECTURA.test(texto)) return fallo("Esa consulta usa funciones de archivos del servidor, que no se permiten.")
    }

    let conexion: Connection | null = null
    try {
        conexion = await conectar(escritura)
        await conexion.query("SET time_zone = '+00:00'")
        if (!escritura) {
            // Defensa extra: aunque la validación fallara, el servidor rechaza cualquier escritura en esta sesión.
            await conexion.query("SET SESSION TRANSACTION READ ONLY")
            await conexion.query("SET SESSION max_execution_time = 15000").catch(() => {}) // MySQL
            await conexion.query("SET SESSION max_statement_time = 15").catch(() => {}) // MariaDB
        }
        const [rows, fields] = await conexion.query(texto)
        return { ok: true, resultados: aResultados(rows, fields), ms: Date.now() - inicio }
    } catch (e) {
        const err = e as { sqlMessage?: string; message?: string; code?: string }
        const aviso = escritura ? " (Si había varias sentencias, las anteriores a esta ya se ejecutaron.)" : ""
        return fallo(`${err.sqlMessage ?? err.message ?? "Error desconocido"}${aviso}`, err.code)
    } finally {
        await conexion?.end().catch(() => {})
    }
}

// ---------------------------------------------------------------------------
// Bitácora de lo que se ejecuta en modo escritura
// ---------------------------------------------------------------------------
export type EntradaBitacora = { id: number; usuario: string; sql_texto: string; ok: number; detalle: string | null; created_at: string }

export async function registrarBitacora(usuario: string, sql: string, ok: boolean, detalle: string) {
    try {
        await db.query("INSERT INTO consulta_sql_log (usuario, sql_texto, ok, detalle) VALUES (?, ?, ?, ?)", [
            usuario.slice(0, 190),
            sql.slice(0, 200_000),
            ok ? 1 : 0,
            detalle.slice(0, 500),
        ])
    } catch {
        // La tabla puede no existir todavía: la bitácora es opcional y no debe impedir la consulta.
    }
}

export async function listarBitacora(limite = 15): Promise<{ disponible: boolean; entradas: EntradaBitacora[] }> {
    try {
        const [rows] = await db.query("SELECT id, usuario, sql_texto, ok, detalle, created_at FROM consulta_sql_log ORDER BY id DESC LIMIT ?", [limite])
        return { disponible: true, entradas: rows as EntradaBitacora[] }
    } catch {
        return { disponible: false, entradas: [] }
    }
}

// ---------------------------------------------------------------------------
// Archivos .sql que vienen con el proyecto (carpeta /database)
// ---------------------------------------------------------------------------
const CARPETA_SQL = path.resolve(process.cwd(), "database")
const MAX_ARCHIVO_SQL = 5 * 1024 * 1024

export async function listarArchivosSQL(): Promise<{ nombre: string; kb: number }[]> {
    try {
        const nombres = (await readdir(CARPETA_SQL)).filter((n) => n.toLowerCase().endsWith(".sql")).sort()
        return await Promise.all(nombres.map(async (nombre) => ({ nombre, kb: Math.max(1, Math.round((await stat(path.join(CARPETA_SQL, nombre))).size / 1024)) })))
    } catch {
        return []
    }
}

export async function leerArchivoSQL(nombre: string): Promise<string | null> {
    // Solo nombres que realmente existen en la lista: nada de rutas ni "..".
    if (!(await listarArchivosSQL()).some((a) => a.nombre === nombre)) return null
    const ruta = path.join(CARPETA_SQL, nombre)
    if ((await stat(ruta)).size > MAX_ARCHIVO_SQL) return null
    return readFile(ruta, "utf-8")
}
