"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/session"
import { campoDe, getRecurso, type Campo } from "@/lib/crm/recursos"
import { actualizar, crear, eliminar, obtener, type Fila } from "@/lib/crm/repo"
import { archivosDeRegistro } from "@/lib/crm/galeria"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import { camposRapidos } from "@/lib/crm/estilos"
import { hoyMX } from "@/lib/crm/semana"
import { contarPalabras, sanitizarHtml } from "@/lib/blog-html"
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
            return { valor: s.slice(0, c.tipo === "html" ? 200000 : c.tipo === "textarea" ? 5000 : 500) }
    }
}

// Solo se vuelve a una lista del mismo recurso (con sus filtros): nunca a una dirección cualquiera.
function rutaVolver(slug: string, v: string | null | undefined): string {
    const base = `/admin/${slug}`
    return typeof v === "string" && (v === base || v.startsWith(`${base}?`)) && !/[\r\n]/.test(v) ? v : base
}

export async function guardarRegistro(slug: string, id: number | null, volver: string | null, _: Estado, fd: FormData): Promise<Estado> {
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

    if (slug === "articulos") {
        if (!reCarpeta.test(String(datos.slug))) return { error: "La URL solo admite minúsculas, números y guiones (ej. mi-articulo)." }
        if (datos.publicado && !datos.fecha_publicacion) datos.fecha_publicacion = hoyMX()
        if (datos.publicado && String(datos.resumen ?? "").length < 50) return { error: "Para publicar, el resumen debe tener al menos 50 caracteres." }
        const limites: Record<string, number> = { titulo: 200, slug: 120, resumen: 500, meta_titulo: 80, meta_descripcion: 220, palabra_clave: 120, portada_alt: 200 }
        for (const [campo, max] of Object.entries(limites)) {
            if (String(datos[campo] ?? "").length > max) return { error: `${campoDe(r, campo).label} admite hasta ${max} caracteres.` }
        }
        // El editor visual produce HTML: se limpia antes de guardar. Desde aquí el artículo ya es HTML.
        datos.contenido = sanitizarHtml(String(datos.contenido ?? ""))
        if (contarPalabras(String(datos.contenido)) === 0 && !String(datos.contenido).includes("<img")) return { error: "El contenido no puede estar vacío." }
        datos.contenido_formato = "html"
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

    let idGuardado = id
    try {
        if (id) await actualizar(r, id, datos)
        else idGuardado = await crear(r, datos)
    } catch (e) {
        await Promise.all(nuevas.map(borrarArchivo))
        if ((e as { code?: string }).code === "ER_DUP_ENTRY") return { error: "Ya existe un registro con ese valor único (correo, carpeta o URL)." }
        throw e
    }
    await Promise.all(anteriores.map(borrarArchivo)) // ignora rutas externas (ej. avatar de Google)

    revalidatePath(`/admin/${slug}`)
    const destino = rutaVolver(slug, volver)

    if (slug === "articulos") {
        revalidatePath("/blog")
        revalidatePath(`/blog/${datos.slug}`)
        if (id) revalidatePath(`/admin/articulos/${id}`) // el formulario se vuelve a pintar con lo guardado
        // Un artículo es largo: al guardar se queda en el editor (no vuelve a la lista). Al crearlo, abre su edición
        // para poder agregar la galería, que necesita que el artículo ya exista.
        if (id) return { ok: "Cambios guardados." }
        const q = destino !== "/admin/articulos" ? `&volver=${encodeURIComponent(destino)}` : ""
        redirect(`/admin/articulos/${idGuardado}?creado=1${q}`)
    }

    // "Guardar y agregar otra": vuelve al formulario con el mismo cliente/proyecto ya elegido.
    if (!id && fd.get("_otra")) {
        const q = new URLSearchParams()
        for (const c of r.campos) if (c.relacion && datos[c.name] !== null && datos[c.name] !== undefined) q.set(c.name, String(datos[c.name]))
        if (destino !== `/admin/${slug}`) q.set("volver", destino)
        redirect(`/admin/${slug}/nuevo${q.size ? `?${q}` : ""}`)
    }
    redirect(destino)
}

// Edición rápida de una tarea desde las listas (sin abrir el formulario completo).
const CAMPOS_EDICION_RAPIDA = ["titulo", "descripcion", "estado", "inicio", "estimado", "entregado", "id_responsable", "url_entregable", "notas"]

export async function editarTareaRapida(id: number, _: Estado, fd: FormData): Promise<Estado> {
    await requireAdmin()
    const r = getRecurso("tareas")!
    if (!Number.isInteger(id) || !(await obtener(r, id))) return { error: "La tarea ya no existe." }

    const datos: Fila = {}
    for (const nombre of CAMPOS_EDICION_RAPIDA) {
        const v = validar(r.campos.find((c) => c.name === nombre)!, fd.get(nombre))
        if ("error" in v) return { error: v.error }
        datos[nombre] = v.valor
    }

    await actualizar(r, id, datos)
    revalidatePath("/admin/tareas")
    return { ok: "Cambios guardados." }
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

export async function eliminarRegistro(slug: string, id: number, volver: string | null = null) {
    const admin = await requireAdmin()
    const r = getRecurso(slug)
    if (!r) return
    if (slug === "usuarios" && id === admin.id) return // no puedes borrarte a ti mismo

    const archivos = await archivosDeRegistro(slug, id)
    await eliminar(r, id)
    await Promise.all(archivos.map(borrarArchivo))
    revalidatePath(`/admin/${slug}`)
    redirect(rutaVolver(slug, volver))
}
