"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/session"
import { recursos } from "@/lib/crm/recursos"
import { obtener } from "@/lib/crm/repo"
import { agregarImagen, contarGaleria, quitarImagen } from "@/lib/crm/galeria"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import type { Estado } from "./auth"

const MAX_POR_SUBIDA = 10
const MAX_POR_PROYECTO = 60

export async function subirGaleria(idProyecto: number, _: Estado, fd: FormData): Promise<Estado> {
    await requireAdmin()
    if (!(await obtener(recursos.proyectos, idProyecto))) return { error: "El proyecto no existe." }

    const archivos = fd.getAll("imagenes").filter((f): f is File => f instanceof File && f.size > 0)
    if (archivos.length === 0) return { error: "Elige al menos una imagen." }
    if (archivos.length > MAX_POR_SUBIDA) return { error: `Sube máximo ${MAX_POR_SUBIDA} imágenes a la vez.` }
    if ((await contarGaleria(idProyecto)) + archivos.length > MAX_POR_PROYECTO) {
        return { error: `La galería admite hasta ${MAX_POR_PROYECTO} imágenes.` }
    }

    let subidas = 0
    const fallos: string[] = []
    for (const f of archivos) {
        try {
            // Lado mayor de 800 px, conserva la proporción original.
            const p = await guardarImagen(f, "galeria", { tipo: "maximo", lado: 800 })
            try {
                await agregarImagen(idProyecto, p)
                subidas++
            } catch (e) {
                await borrarArchivo(p.ruta)
                throw e
            }
        } catch (e) {
            if (e instanceof ErrorImagen) fallos.push(`${f.name}: ${e.message}`)
            else throw e
        }
    }

    revalidatePath(`/admin/proyectos/${idProyecto}`)
    if (fallos.length) {
        return { error: `${subidas} subida(s). No se pudo: ${fallos.join(" · ")}` }
    }
    return { ok: `${subidas} imagen(es) agregada(s).` }
}

export async function eliminarImagenGaleria(idImagen: number, idProyecto: number) {
    await requireAdmin()
    const archivo = await quitarImagen(idImagen, idProyecto)
    await borrarArchivo(archivo)
    revalidatePath(`/admin/proyectos/${idProyecto}`)
}
