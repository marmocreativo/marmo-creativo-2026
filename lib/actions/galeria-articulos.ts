"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/session"
import { recursos } from "@/lib/crm/recursos"
import { obtener } from "@/lib/crm/repo"
import {
    agregarImagenArticulo,
    contarGaleriaArticulo,
    describirImagenArticulo,
    quitarImagenArticulo,
} from "@/lib/crm/galeria-articulos"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import type { Estado } from "./auth"

const MAX_POR_SUBIDA = 10
const MAX_POR_ARTICULO = 40

export async function subirGaleriaArticulo(idArticulo: number, _: Estado, fd: FormData): Promise<Estado> {
    await requireAdmin()
    if (!(await obtener(recursos.articulos, idArticulo))) return { error: "El artículo no existe." }

    const archivos = fd.getAll("imagenes").filter((f): f is File => f instanceof File && f.size > 0)
    if (archivos.length === 0) return { error: "Elige al menos una imagen." }
    if (archivos.length > MAX_POR_SUBIDA) return { error: `Sube máximo ${MAX_POR_SUBIDA} imágenes a la vez.` }
    if ((await contarGaleriaArticulo(idArticulo)) + archivos.length > MAX_POR_ARTICULO) {
        return { error: `La galería admite hasta ${MAX_POR_ARTICULO} imágenes.` }
    }

    let subidas = 0
    const fallos: string[] = []
    for (const f of archivos) {
        try {
            const p = await guardarImagen(f, "articulos", { tipo: "maximo", lado: 1200 })
            try {
                await agregarImagenArticulo(idArticulo, p)
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

    revalidatePath(`/admin/articulos/${idArticulo}`)
    if (fallos.length) return { error: `${subidas} subida(s). No se pudo: ${fallos.join(" · ")}` }
    return { ok: `${subidas} imagen(es) agregada(s).` }
}

export async function eliminarImagenArticulo(idImagen: number, idArticulo: number) {
    await requireAdmin()
    const archivo = await quitarImagenArticulo(idImagen, idArticulo)
    await borrarArchivo(archivo)
    revalidatePath(`/admin/articulos/${idArticulo}`)
}

export async function guardarDescripcionImagen(idImagen: number, idArticulo: number, descripcion: string): Promise<void> {
    await requireAdmin()
    const limpia = descripcion.trim().slice(0, 200)
    await describirImagenArticulo(idImagen, idArticulo, limpia || null)
    revalidatePath(`/admin/articulos/${idArticulo}`)
}
