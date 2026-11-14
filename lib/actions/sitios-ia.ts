"use server"

import { after } from "next/server"
import { revalidatePath } from "next/cache"
import { resolverProveedor, type Proveedor } from "@/lib/ia/texto"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { ejecutarEdicion, ejecutarPropuestas, ejecutarSitio, type AlcanceEdicion, type ResultadoEdicion } from "@/lib/sitios/generar"
import * as repo from "@/lib/sitios/repo"
import { iniciarTarea, recogerResultado, ultimaTarea, type Tarea } from "@/lib/sitios/tareas"
import type { Estado } from "./auth"

async function sitioPropio(idSitio: number) {
    const u = await requireCreadorSitios()
    if (!Number.isInteger(idSitio) || idSitio <= 0) throw new Error("Sitio no válido.")
    const s = await repo.obtenerSitio(u.id, idSitio)
    if (!s) throw new Error("Sitio no encontrado.")
    return s
}

const refrescar = (id: number) => revalidatePath(`/panel/sitios/${id}`, "layout")

// Las generaciones cuestan dinero: antes de lanzarlas se revisa que haya API key y material mínimo.
function revisarListo(s: repo.Sitio): string | null {
    if (!s.briefing.empresa || !s.briefing.giro || !s.briefing.descripcion) return "Completa primero el briefing (empresa, giro y descripción) en el paso 1."
    return null
}

export async function generarPropuestasAccion(idSitio: number, proveedor?: Proveedor): Promise<Estado> {
    const s = await sitioPropio(idSitio)
    const motivo = revisarListo(s)
    if (motivo) return { error: motivo }
    const elegido = resolverProveedor(proveedor)
    if ("error" in elegido) return { error: elegido.error }

    const id = await iniciarTarea(s.id, "propuestas")
    if (!id) return { error: "Ya hay una generación en curso para este sitio. Espera a que termine." }
    after(() => ejecutarPropuestas(id, s, elegido.proveedor)) // sigue corriendo después de responder; la pantalla consulta el avance
    return { ok: "Generando propuestas…" }
}

export async function elegirPropuestaAccion(idSitio: number, numero: number): Promise<Estado> {
    const s = await sitioPropio(idSitio)
    if (!Number.isInteger(numero) || numero < 1 || numero > 3) return { error: "Propuesta no válida." }
    if (!(await repo.elegirPropuesta(s.id, numero))) return { error: "Esa propuesta ya no existe." }
    refrescar(s.id)
    return { ok: "Propuesta elegida." }
}

export async function generarSitioAccion(idSitio: number, proveedor?: Proveedor): Promise<Estado> {
    const s = await sitioPropio(idSitio)
    const motivo = revisarListo(s)
    if (motivo) return { error: motivo }
    const elegido = resolverProveedor(proveedor)
    if ("error" in elegido) return { error: elegido.error }
    if (!s.propuesta_elegida) return { error: "Primero elige una propuesta en el paso 4." }

    const id = await iniciarTarea(s.id, "sitio")
    if (!id) return { error: "Ya hay una generación en curso para este sitio. Espera a que termine." }
    after(() => ejecutarSitio(id, s, elegido.proveedor))
    return { ok: "Generando el sitio…" }
}

export async function estadoIAAccion(idSitio: number): Promise<Tarea | null> {
    const s = await sitioPropio(idSitio)
    return ultimaTarea(s.id)
}

// ---- Edición por prompts ---------------------------------------------------------------------------------

export type EntradaEdicion = {
    proveedor?: Proveedor
    alcance: AlcanceEdicion
    idPagina?: number
    instruccion: string
    paginas: Record<number, string> // lo que hay en el editor sin guardar (por id de página)
    css?: string
}

const MAX_ARCHIVO = 500_000

export async function iniciarEdicionAccion(idSitio: number, e: EntradaEdicion): Promise<Estado> {
    const s = await sitioPropio(idSitio)
    const elegido = resolverProveedor(e?.proveedor)
    if ("error" in elegido) return { error: elegido.error }

    const instruccion = typeof e?.instruccion === "string" ? e.instruccion.trim() : ""
    if (instruccion.length < 5) return { error: "Escribe qué quieres cambiar (al menos unas palabras)." }
    if (instruccion.length > 2000) return { error: "La instrucción admite hasta 2000 caracteres." }
    if (!["pagina", "css", "sitio"].includes(e.alcance)) return { error: "Alcance no válido." }

    const paginas = await repo.listarPaginas(s.id)
    if (e.alcance === "pagina" && !paginas.some((p) => p.id === e.idPagina)) return { error: "Elige la página que quieres editar." }

    // Solo se aceptan ediciones sin guardar de páginas que sí son de este sitio, y de tamaño razonable.
    const limpias: Record<number, string> = {}
    for (const p of paginas) {
        const v = e.paginas?.[p.id]
        if (typeof v === "string") {
            if (v.length > MAX_ARCHIVO) return { error: "Una de las páginas es demasiado larga para editarla con IA." }
            limpias[p.id] = v
        }
    }
    if (typeof e.css === "string" && e.css.length > MAX_ARCHIVO) return { error: "La hoja de estilos es demasiado larga para editarla con IA." }

    const id = await iniciarTarea(s.id, "edicion")
    if (!id) return { error: "Ya hay una generación en curso para este sitio. Espera a que termine." }
    const params = { proveedor: elegido.proveedor, alcance: e.alcance, idPagina: e.idPagina, instruccion, paginas: limpias, css: typeof e.css === "string" ? e.css : undefined }
    after(() => ejecutarEdicion(id, s, params))
    return { ok: "Editando…" }
}

// Entrega (una sola vez) los archivos que la IA modificó. No guarda nada: la pantalla los pone en el editor.
export async function resultadoEdicionAccion(idSitio: number, idTarea: number): Promise<ResultadoEdicion | null> {
    const s = await sitioPropio(idSitio)
    if (!Number.isInteger(idTarea)) return null
    const json = await recogerResultado(s.id, idTarea)
    if (!json) return null
    try {
        return JSON.parse(json) as ResultadoEdicion
    } catch {
        return null
    }
}
