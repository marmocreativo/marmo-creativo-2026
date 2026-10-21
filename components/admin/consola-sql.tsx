"use client"

import { useRef, useState, useTransition } from "react"
import { AlertTriangle, Copy, FileCode2, Play, Trash2, Upload } from "lucide-react"
import { cargarArchivoSQL, ejecutarSQL } from "@/lib/actions/configuracion"
import { esSoloLectura, RIESGOSA, type Ejecucion, type ResultadoFilas } from "@/lib/sql/tipos"

const TABLAS = ["usuarios", "clientes", "contactos", "proyectos", "proyecto_imagenes", "tareas", "herramienta_historial"]

// Consultas listas para entender cómo está la base (útiles para compartir el estado con Claude).
const RAPIDAS = [
    {
        titulo: "Tablas y tamaño",
        sql: `SELECT table_name AS tabla, table_rows AS filas_aprox, ROUND((data_length + index_length) / 1024 / 1024, 2) AS mb
FROM information_schema.tables
WHERE table_schema = DATABASE()
ORDER BY table_name`,
    },
    {
        titulo: "Esquema (columnas)",
        sql: `SELECT table_name AS tabla, column_name AS columna, column_type AS tipo, is_nullable AS nulo, column_default AS por_defecto, column_key AS llave
FROM information_schema.columns
WHERE table_schema = DATABASE()
ORDER BY table_name, ordinal_position`,
    },
    {
        titulo: "Llaves foráneas",
        sql: `SELECT table_name AS tabla, column_name AS columna, referenced_table_name AS referencia, referenced_column_name AS ref_columna, constraint_name AS restriccion
FROM information_schema.key_column_usage
WHERE table_schema = DATABASE() AND referenced_table_name IS NOT NULL
ORDER BY table_name, constraint_name`,
    },
    {
        titulo: "Conteo exacto",
        sql: TABLAS.map((t) => `SELECT '${t}' AS tabla, COUNT(*) AS filas FROM ${t}`).join("\nUNION ALL\n"),
    },
    { titulo: "Versión y zona horaria", sql: "SELECT VERSION() AS version, DATABASE() AS base, @@time_zone AS zona, NOW() AS ahora_utc" },
]

const celda = (v: string | number | null) => (v === null ? "NULL" : String(v))

// Tabla en Markdown, para pegarla en un chat.
function aMarkdown(r: ResultadoFilas): string {
    const limpio = (v: string | number | null) => celda(v).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ")
    const cabecera = `| ${r.columnas.join(" | ")} |\n| ${r.columnas.map(() => "---").join(" | ")} |`
    return `${cabecera}\n${r.filas.map((f) => `| ${f.map(limpio).join(" | ")} |`).join("\n")}`
}

export function ConsolaSql({ archivos }: { archivos: { nombre: string; kb: number }[] }) {
    const [sql, setSql] = useState(RAPIDAS[0].sql)
    const [escritura, setEscritura] = useState(false)
    const [entiendo, setEntiendo] = useState(false)
    const [resultado, setResultado] = useState<Ejecucion | null>(null)
    const [archivo, setArchivo] = useState(archivos[0]?.nombre ?? "")
    const [aviso, setAviso] = useState("")
    const [copiado, setCopiado] = useState<number | null>(null)
    const [pendiente, start] = useTransition()
    const entradaArchivo = useRef<HTMLInputElement>(null)

    const poner = (texto: string, aviso = "") => {
        setSql(texto)
        setAviso(aviso)
        setResultado(null)
        // Si lo que cargaste modifica datos, pasamos a modo escritura (sin ejecutar nada).
        setEscritura(!esSoloLectura(texto))
        setEntiendo(false)
    }

    const correr = () => {
        if (!sql.trim() || pendiente) return
        if (escritura) {
            if (!entiendo) return
            if (RIESGOSA.test(sql) && !confirm("Esta consulta puede modificar o borrar datos de la base. ¿Ejecutarla de todos modos?")) return
        }
        start(async () => {
            setAviso("")
            setResultado(await ejecutarSQL(sql, escritura))
            if (escritura) setEntiendo(false) // cada ejecución de escritura se confirma de nuevo
        })
    }

    const cargarDelProyecto = () => {
        if (!archivo) return
        start(async () => {
            const r = await cargarArchivoSQL(archivo)
            if (r.ok && r.texto !== undefined) poner(r.texto, `Cargado ${archivo}. Revísalo y ejecútalo cuando estés listo.`)
            else setAviso("No se pudo cargar ese archivo.")
        })
    }

    const cargarLocal = async (f?: File) => {
        if (!f) return
        if (f.size > 2 * 1024 * 1024) return setAviso("El archivo pesa más de 2 MB. Súbelo partido o usa la carpeta database/ del proyecto.")
        poner(await f.text(), `Cargado ${f.name}. Revísalo y ejecútalo cuando estés listo.`)
        if (entradaArchivo.current) entradaArchivo.current.value = ""
    }

    const copiar = async (r: ResultadoFilas, i: number) => {
        try {
            await navigator.clipboard.writeText(aMarkdown(r))
            setCopiado(i)
            setTimeout(() => setCopiado(null), 2000)
        } catch {
            setAviso("No se pudo copiar al portapapeles.")
        }
    }

    const boton =
        "inline-flex items-center gap-2 border border-border bg-white px-3 py-2 text-sm text-foreground hover:border-foreground transition-colors disabled:opacity-40"

    return (
        <div className="space-y-6">
            {/* Modo */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex rounded-lg border border-border p-0.5 text-sm" role="group" aria-label="Modo de ejecución">
                    <button type="button" onClick={() => { setEscritura(false); setEntiendo(false) }} className={`rounded-md px-4 py-2 transition-colors ${!escritura ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                        Solo lectura
                    </button>
                    <button type="button" onClick={() => setEscritura(true)} className={`rounded-md px-4 py-2 transition-colors ${escritura ? "bg-destructive text-white" : "text-muted-foreground hover:text-foreground"}`}>
                        Escritura
                    </button>
                </div>
                <p className="text-sm text-muted-foreground">
                    {escritura
                        ? "Puede modificar o borrar datos y estructura. Permite varias sentencias (migraciones y seeds)."
                        : "Solo SELECT, SHOW, DESCRIBE y EXPLAIN. Una sola sentencia; el servidor rechaza cualquier cambio."}
                </p>
            </div>

            {/* Consultas rápidas y archivos */}
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Consultas rápidas:</span>
                    {RAPIDAS.map((r) => (
                        <button key={r.titulo} type="button" onClick={() => poner(r.sql)} className={boton}>
                            {r.titulo}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {archivos.length > 0 && (
                        <>
                            <FileCode2 className="h-4 w-4 text-muted-foreground" />
                            <select value={archivo} onChange={(e) => setArchivo(e.target.value)} className="border border-border bg-white px-3 py-2 text-sm" aria-label="Archivo SQL del proyecto">
                                {archivos.map((a) => (
                                    <option key={a.nombre} value={a.nombre}>{a.nombre} ({a.kb} KB)</option>
                                ))}
                            </select>
                            <button type="button" onClick={cargarDelProyecto} disabled={pendiente} className={boton}>Cargar del proyecto</button>
                        </>
                    )}
                    <input ref={entradaArchivo} type="file" accept=".sql,text/plain" className="hidden" onChange={(e) => cargarLocal(e.target.files?.[0])} />
                    <button type="button" onClick={() => entradaArchivo.current?.click()} className={boton}>
                        <Upload className="h-4 w-4" /> Abrir archivo .sql
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div>
                <textarea
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                            e.preventDefault()
                            correr()
                        }
                    }}
                    spellCheck={false}
                    rows={12}
                    aria-label="Consulta SQL"
                    placeholder="SELECT * FROM usuarios LIMIT 10"
                    className={`w-full border bg-white p-4 font-mono text-sm leading-relaxed focus:outline-none ${escritura ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground"}`}
                />
                {aviso && <p className="mt-2 text-sm text-primary" role="status">{aviso}</p>}
            </div>

            {/* Ejecutar */}
            <div className="flex flex-wrap items-center gap-4">
                {escritura && (
                    <label className="flex items-center gap-2 text-sm text-destructive">
                        <input type="checkbox" checked={entiendo} onChange={(e) => setEntiendo(e.target.checked)} />
                        <AlertTriangle className="h-4 w-4" /> Entiendo que esto modifica la base de datos
                    </label>
                )}
                <button
                    type="button"
                    onClick={correr}
                    disabled={pendiente || !sql.trim() || (escritura && !entiendo)}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${escritura ? "bg-destructive" : "bg-foreground"}`}
                >
                    <Play className="h-4 w-4" /> {pendiente ? "Ejecutando…" : "Ejecutar"}
                </button>
                <button type="button" onClick={() => { setSql(""); setResultado(null); setAviso("") }} className={boton}>
                    <Trash2 className="h-4 w-4" /> Limpiar
                </button>
                <span className="text-xs text-muted-foreground">Ctrl + Enter para ejecutar</span>
            </div>

            {/* Resultado */}
            {resultado && !resultado.ok && (
                <div className="border border-destructive/40 bg-red-50 p-4 text-sm text-destructive" role="alert">
                    <p className="font-medium">Error{resultado.codigo ? ` (${resultado.codigo})` : ""}</p>
                    <p className="mt-1 whitespace-pre-wrap break-words font-mono text-xs">{resultado.error}</p>
                </div>
            )}

            {resultado?.ok && (
                <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                        {resultado.resultados.length} {resultado.resultados.length === 1 ? "resultado" : "resultados"} en {resultado.ms} ms
                    </p>
                    {resultado.resultados.map((r, i) =>
                        r.tipo === "ok" ? (
                            <div key={i} className="border border-border bg-neutral-100 p-4 text-sm">
                                <p className="text-foreground">
                                    {resultado.resultados.length > 1 && <span className="mr-2 text-muted-foreground">#{i + 1}</span>}
                                    OK · {r.afectadas} {r.afectadas === 1 ? "fila afectada" : "filas afectadas"}
                                    {r.insertId ? ` · último id ${r.insertId}` : ""}
                                    {r.advertencias ? ` · ${r.advertencias} advertencia(s)` : ""}
                                </p>
                                {r.info && <p className="mt-1 font-mono text-xs text-muted-foreground">{r.info}</p>}
                            </div>
                        ) : (
                            <div key={i}>
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        {resultado.resultados.length > 1 && <span className="mr-2">#{i + 1}</span>}
                                        {r.total} {r.total === 1 ? "fila" : "filas"}
                                        {r.total > r.filas.length ? ` (se muestran las primeras ${r.filas.length})` : ""}
                                    </p>
                                    <button type="button" onClick={() => copiar(r, i)} className={boton}>
                                        <Copy className="h-4 w-4" /> {copiado === i ? "¡Copiado!" : "Copiar como texto"}
                                    </button>
                                </div>
                                <div className="max-h-[480px] overflow-auto border border-border">
                                    <table className="w-full text-left font-mono text-xs">
                                        <thead className="sticky top-0 bg-neutral-100">
                                            <tr>
                                                {r.columnas.map((c, j) => (
                                                    <th key={j} className="whitespace-nowrap px-3 py-2 font-medium text-foreground">{c}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {r.filas.map((fila, k) => (
                                                <tr key={k} className="border-t border-border align-top">
                                                    {fila.map((v, j) => (
                                                        <td key={j} className={`max-w-xs truncate px-3 py-1.5 ${v === null ? "italic text-muted-foreground/60" : "text-foreground"}`} title={celda(v)}>
                                                            {celda(v)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    )
}
