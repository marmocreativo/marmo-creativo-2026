"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/session"
import { getRecurso, type Campo } from "@/lib/crm/recursos"
import { actualizar, crear, eliminar, obtener, type Fila } from "@/lib/crm/repo"
import { archivosDeRegistro } from "@/lib/crm/galeria"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import { camposRapidos } from "@/lib/crm/estilos"
import type { Estado } from "./auth"

const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const reFecha = /^\d{4}-\d{2}-\d{2}$/
const reCarpeta = /^[a-z0-9]+(-[a-z0-9]+)*$/

// Devuelve el valor listo para la BD, o un mensaje de error.
function validar(c: Campo, raw: FormDataEntryValue | null): { valor: string | number | null } | { error: string } {
    if (c.tipo === "checkbox") return { valor: raw === "on" ? 1 : 0 }

    const s = typeof raw === "string" ? raw.trim() : ""
    if (!s) return c.requerido ? { error: `${c.label} es obligatorio.` } : { valor: null }

    switch (c.tipo) {
        case "email":
            return reEmail.test(s) ? { valor: s.toLowerCase() } : { error: `${c.label} no es un correo válido.` }
        case "url":
            return /^https?:\/\//i.test(s) ? { valor: s } : { error: `${c.label} debe empezar con http:// o https://` }
        case "date":
            return reFecha.test(s) ? { valor: s } : { error: `${c.label} no es una fecha válida.` }
        case "number": {
            const n = Number(s)
            return Number.isFinite(n) && n >= 0 ? { valor: n } : { error: `${c.label} debe ser un número.` }
        }
        case "select":
            if (c.relacion) {
                const n = Number(s)
                return Number.isInteger(n) && n > 0 ? { valor: n } : { error: `Elige ${c.label.toLowerCase()}.` }
            }
            return c.opciones?.includes(s) ? { valor: s } : { error: `${c.label} no es válido.` }
        default:
            return { valor: s.slice(0, c.tipo === "textarea" ? 5000 : 500) }
    }
}

export async function guardarRegistro(slug: string, id: number | null, _: Estado, fd: FormData): Promise<Estado> {
    const admin = await requireAdmin()
    const r = getRecurso(slug)
    if (!r) return { error: "Recurso no encontrado." }

    const datos: Fila = {}
    let password = ""
    const camposImagen: Campo[] = []
    for (const c of r.campos) {
        if (c.tipo === "password") {
            password = String(fd.get(c.name) ?? "")
            continue
        }
        if (c.tipo === "imagen") {
            camposImagen.push(c) // se procesan después de validar el resto
            continue
        }
        const v = validar(c, fd.get(c.name))
        if ("error" in v) return { error: v.error }
        datos[c.name] = v.valor
    }

    if (slug === "clientes") {
        if (!reCarpeta.test(String(datos.carpeta))) {
            return { error: "La carpeta solo admite minúsculas, números y guiones (ej. dental-sonrisa)." }
        }
        if (datos.rfc) {
            datos.rfc = String(datos.rfc).toUpperCase()
            if (!/^[A-ZÑ&0-9]{12,13}$/.test(String(datos.rfc))) return { error: "El RFC debe tener 12 o 13 caracteres." }
        }
    }

    if (slug === "usuarios") {
        if (password && password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." }
        if (!id && !password) return { error: "Define una contraseña para el nuevo usuario." }
        if (id === admin.id && (datos.rol !== "admin" || !datos.activo)) {
            return { error: "No puedes quitarte el rol de administrador ni desactivar tu propia cuenta." }
        }
        if (password) datos.password_hash = await bcrypt.hash(password, 10)
    }

    if (slug === "proyectos") {
        if (datos.mostrar_en_portafolio) {
            if (!datos.categoria_portafolio) return { error: "Para mostrarlo en el portafolio elige una categoría." }
            const actual = id ? await obtener(r, id) : null
            const traePortada = fd.get("portada") instanceof File && (fd.get("portada") as File).size > 0
            const conservaPortada = !!actual?.portada && fd.get("portada__quitar") !== "on"
            if (!traePortada && !conservaPortada) return { error: "Para mostrarlo en el portafolio sube una portada." }
        }
    }

    // Imágenes: se recortan y convierten a WebP; las anteriores se borran solo si todo sale bien.
    const existente = id ? await obtener(r, id) : null
    const nuevas: string[] = []
    const anteriores: string[] = []
    for (const c of camposImagen) {
        const archivo = fd.get(c.name)
        const previa = existente ? String(existente[c.name] ?? "") : ""
        if (archivo instanceof File && archivo.size > 0) {
            try {
                const p = await guardarImagen(archivo, c.imagen!.carpeta, { tipo: c.imagen!.modo ?? "cuadrada", lado: c.imagen!.lado })
                nuevas.push(p.ruta)
                datos[c.name] = p.ruta
                if (previa) anteriores.push(previa)
            } catch (e) {
                await Promise.all(nuevas.map(borrarArchivo))
                if (e instanceof ErrorImagen) return { error: `${c.label}: ${e.message}` }
                throw e
            }
        } else if (fd.get(`${c.name}__quitar`) === "on" && previa) {
            datos[c.name] = null
            anteriores.push(previa)
        }
    }

    try {
        if (id) await actualizar(r, id, datos)
        else await crear(r, datos)
    } catch (e) {
        await Promise.all(nuevas.map(borrarArchivo))
        if ((e as { code?: string }).code === "ER_DUP_ENTRY") return { error: "Ya existe un registro con ese valor único (correo o carpeta)." }
        throw e
    }
    await Promise.all(anteriores.map(borrarArchivo)) // ignora rutas externas (ej. avatar de Google)

    revalidatePath(`/admin/${slug}`)
    redirect(`/admin/${slug}`)
}

// Cambio rápido de estado desde la lista (dropdown con badge).
export async function cambiarEstado(slug: string, id: number, campo: string, valor: string): Promise<{ ok: boolean }> {
    await requireAdmin()
    const r = getRecurso(slug)
    const def = r?.campos.find((c) => c.name === campo)
    const permitido = camposRapidos[slug]?.includes(campo)
    if (!r || !permitido || !def?.opciones?.includes(valor) || !Number.isInteger(id)) return { ok: false }

    await actualizar(r, id, { [campo]: valor })
    revalidatePath(`/admin/${slug}`)
    return { ok: true }
}

export async function eliminarRegistro(slug: string, id: number) {
    const admin = await requireAdmin()
    const r = getRecurso(slug)
    if (!r) return
    if (slug === "usuarios" && id === admin.id) return // no puedes borrarte a ti mismo

    const archivos = await archivosDeRegistro(slug, id)
    await eliminar(r, id)
    await Promise.all(archivos.map(borrarArchivo))
    revalidatePath(`/admin/${slug}`)
    redirect(`/admin/${slug}`)
}
