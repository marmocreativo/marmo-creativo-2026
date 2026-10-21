"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/session"
import { ejecutarSQL as ejecutar, leerArchivoSQL, registrarBitacora } from "@/lib/sql/consola"
import type { Ejecucion } from "@/lib/sql/tipos"
import {
    borrarRuta,
    crearCarpeta,
    ErrorMultimedia,
    guardarArchivo,
    resolverRuta,
    separar,
} from "@/lib/multimedia"
import type { Estado } from "./auth"

const PAGINA_MULTIMEDIA = "/admin/configuracion/multimedia"

// ---------------------------------------------------------------------------
// Consulta SQL
// ---------------------------------------------------------------------------
export async function ejecutarSQL(sql: string, escritura: boolean): Promise<Ejecucion> {
    const admin = await requireAdmin() // se vuelve a comprobar contra la base de datos en cada ejecución
    const r = await ejecutar(sql, escritura)

    // Lo que modifica la base queda en la bitácora (quién, cuándo y qué).
    if (escritura) {
        const detalle = r.ok
            ? r.resultados.map((x) => (x.tipo === "ok" ? `${x.afectadas} filas` : `${x.total} filas`)).join(" · ")
            : r.error
        await registrarBitacora(admin.email, sql, r.ok, detalle)
        revalidatePath("/admin/configuracion/sql")
    }
    return r
}

export async function cargarArchivoSQL(nombre: string): Promise<{ ok: boolean; texto?: string }> {
    await requireAdmin()
    const texto = await leerArchivoSQL(nombre)
    return texto === null ? { ok: false } : { ok: true, texto }
}

// ---------------------------------------------------------------------------
// Multimedia
// ---------------------------------------------------------------------------
export type ReporteSubida = { subidos: number; omitidos: number; errores: { ruta: string; motivo: string }[] }

const MAX_ARCHIVOS_POR_LOTE = 100
const MAX_PROFUNDIDAD = 8

export async function crearCarpetaMultimedia(dir: string, _: Estado, fd: FormData): Promise<Estado> {
    await requireAdmin()
    try {
        await crearCarpeta(separar(dir), String(fd.get("nombre") ?? "").trim())
    } catch (e) {
        if (e instanceof ErrorMultimedia) return { error: e.message }
        throw e
    }
    revalidatePath(PAGINA_MULTIMEDIA)
    return { ok: "Carpeta creada." }
}

// Sube archivos SIN modificarlos. `ruta` (paralelo a `archivo`) es la ruta relativa dentro de `dir`:
// permite subir una carpeta completa conservando su estructura.
export async function subirMultimedia(fd: FormData): Promise<ReporteSubida> {
    await requireAdmin()
    const reporte: ReporteSubida = { subidos: 0, omitidos: 0, errores: [] }

    const dir = separar(String(fd.get("dir") ?? ""))
    if (!resolverRuta(dir)) return { ...reporte, errores: [{ ruta: "(destino)", motivo: "La carpeta de destino no es válida" }] }

    const archivos = fd.getAll("archivo").filter((f): f is File => f instanceof File)
    const rutas = fd.getAll("ruta").map(String)
    const reemplazar = fd.get("reemplazar") === "on"
    if (archivos.length > MAX_ARCHIVOS_POR_LOTE) {
        return { ...reporte, errores: [{ ruta: "(lote)", motivo: `Máximo ${MAX_ARCHIVOS_POR_LOTE} archivos por lote` }] }
    }

    for (let i = 0; i < archivos.length; i++) {
        const relativa = separar(rutas[i] ?? archivos[i].name)
        const mostrar = relativa.join("/") || archivos[i].name
        try {
            if (relativa.length === 0 || relativa.length > MAX_PROFUNDIDAD) throw new ErrorMultimedia("Ruta no válida")
            const r = await guardarArchivo([...dir, ...relativa], Buffer.from(await archivos[i].arrayBuffer()), reemplazar)
            if (r === "subido") reporte.subidos++
            else reporte.omitidos++
        } catch (e) {
            if (!(e instanceof ErrorMultimedia)) throw e
            reporte.errores.push({ ruta: mostrar, motivo: e.message })
        }
    }

    revalidatePath(PAGINA_MULTIMEDIA)
    return reporte
}

export async function eliminarMultimedia(ruta: string) {
    await requireAdmin()
    try {
        await borrarRuta(separar(ruta))
    } catch (e) {
        if (!(e instanceof ErrorMultimedia)) throw e
    }
    revalidatePath(PAGINA_MULTIMEDIA)
}
