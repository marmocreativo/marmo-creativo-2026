// Tipos compartidos entre la consola SQL del servidor y su pantalla (sin imports de servidor).

export type Celda = string | number | null
export type ResultadoFilas = { tipo: "filas"; columnas: string[]; filas: Celda[][]; total: number }
export type ResultadoOk = { tipo: "ok"; afectadas: number; insertId: number; info: string; advertencias: number }
export type Resultado = ResultadoFilas | ResultadoOk
export type Ejecucion =
    | { ok: true; resultados: Resultado[]; ms: number }
    | { ok: false; error: string; codigo?: string; ms: number }

export const MAX_FILAS = 500
export const MAX_SQL = 1_000_000

// Quita comentarios y espacios del inicio para ver con qué palabra empieza la consulta.
export function sinComentariosIniciales(sql: string): string {
    let s = sql
    for (;;) {
        const antes = s
        s = s.replace(/^\s+/, "").replace(/^--[^\n]*(\n|$)/, "").replace(/^#[^\n]*(\n|$)/, "").replace(/^\/\*[\s\S]*?\*\//, "")
        if (s === antes) return s
    }
}

export const ES_LECTURA = /^(select|show|describe|desc|explain|with)\b/i
export const PROHIBIDO_EN_LECTURA = /\binto\s+(outfile|dumpfile)\b|\bload_file\s*\(|\bload\s+data\b/i
// Sentencias que conviene confirmar antes de correr en modo escritura.
export const RIESGOSA = /\b(drop|truncate|delete|alter|update|grant|revoke|rename)\b/i

export const esSoloLectura = (sql: string) => ES_LECTURA.test(sinComentariosIniciales(sql))
