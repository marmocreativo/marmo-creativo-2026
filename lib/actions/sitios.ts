"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { limpiarSeccion, type Seccion, SECCIONES } from "@/lib/sitios/campos"
import { guardarDocumento, ErrorDocumento } from "@/lib/sitios/documentos"
import * as repo from "@/lib/sitios/repo"
import { MAX_PAGINAS, MAX_SITIOS_POR_USUARIO, type TipoArchivo } from "@/lib/sitios/repo"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import { reCarpeta } from "@/lib/crm/validar"
import type { Estado } from "./auth"

const MAX_HTML = 500_000
const MAX_CSS = 300_000
const RESERVADOS = ["styles", "img", "sitemap", "robots", "assets"]

// Carga el sitio solo si es del usuario en sesión; si no, lanza (la petición falla y no hace nada).
async function sitioPropio(idSitio: number) {
    const u = await requireCreadorSitios()
    if (!Number.isInteger(idSitio) || idSitio <= 0) throw new Error("Sitio no válido.")
    const s = await repo.obtenerSitio(u.id, idSitio)
    if (!s) throw new Error("Sitio no encontrado.")
    return { u, s }
}

const refrescar = (id: number) => revalidatePath(`/panel/sitios/${id}`, "layout")

// ---- Proyecto web -------------------------------------------------------------------------------

export async function crearSitioAccion(_: Estado, fd: FormData): Promise<Estado> {
    const u = await requireCreadorSitios()
    const nombre = String(fd.get("nombre") ?? "").trim()
    if (nombre.length < 3) return { error: "Ponle un nombre al sitio (mínimo 3 letras)." }
    if (nombre.length > 150) return { error: "El nombre admite hasta 150 caracteres." }
    if ((await repo.contarSitios(u.id)) >= MAX_SITIOS_POR_USUARIO) return { error: `Llegaste al máximo de ${MAX_SITIOS_POR_USUARIO} sitios.` }

    const id = await repo.crearSitio(u.id, nombre)
    revalidatePath("/panel/sitios")
    redirect(`/panel/sitios/${id}/briefing`)
}

export async function eliminarSitioAccion(idSitio: number) {
    const { u, s } = await sitioPropio(idSitio)
    const archivos = await repo.archivosDelSitio(s.id)
    await repo.eliminarSitio(u.id, s.id) // las filas hijas se borran en cascada
    await Promise.all(archivos.map(borrarArchivo))
    revalidatePath("/panel/sitios")
    redirect("/panel/sitios")
}

// ---- Pasos 1 y 2: briefing, SEO y branding ---------------------------------------------------------

export async function guardarSeccionAccion(idSitio: number, seccion: Seccion, _: Estado, fd: FormData): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    if (!(seccion in SECCIONES)) return { error: "Sección no válida." }
    const r = limpiarSeccion(seccion, (n) => fd.get(n))
    if ("error" in r) return { error: r.error }

    await repo.actualizarSeccion(s.id, seccion, r.valores)
    refrescar(s.id)
    return { ok: "Cambios guardados." }
}

// ---- Paso 3: URLs de referencia -------------------------------------------------------------------

export async function guardarUrlsReferenciaAccion(idSitio: number, _: Estado, fd: FormData): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    const lineas = String(fd.get("urls") ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lineas.length > 8) return { error: "Máximo 8 sitios de referencia." }
    for (const l of lineas) {
        if (l.length > 300) return { error: "Una de las direcciones es demasiado larga." }
        let u: URL
        try {
            u = new URL(l)
        } catch {
            return { error: `«${l.slice(0, 60)}» no es una dirección válida. Incluye https://` }
        }
        if (u.protocol !== "http:" && u.protocol !== "https:") return { error: `«${l.slice(0, 60)}» debe empezar con http:// o https://` }
    }
    await repo.actualizarReferenciasUrls(s.id, [...new Set(lineas)])
    refrescar(s.id)
    return { ok: "Referencias guardadas." }
}

// ---- Archivos: galería, referencias, logo y documentos --------------------------------------------

const LIMITES: Record<Exclude<TipoArchivo, "documento">, { maxTotal: number; lado: number }> = {
    galeria: { maxTotal: 60, lado: 1600 },
    referencia: { maxTotal: 12, lado: 1600 },
    logo: { maxTotal: 1, lado: 800 },
}

export async function subirImagenesAccion(idSitio: number, tipo: "galeria" | "referencia" | "logo", _: Estado, fd: FormData): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    const lim = LIMITES[tipo]
    if (!lim) return { error: "Tipo de archivo no válido." }

    const archivos = fd.getAll("imagenes").filter((f): f is File => f instanceof File && f.size > 0)
    if (archivos.length === 0) return { error: "Elige al menos una imagen." }
    if (archivos.length > 10) return { error: "Sube máximo 10 imágenes a la vez." }
    if (tipo === "logo" && archivos.length > 1) return { error: "El logo es un solo archivo." }

    const actuales = await repo.listarArchivos(s.id, tipo)
    if (tipo !== "logo" && actuales.length + archivos.length > lim.maxTotal) return { error: `Se admiten hasta ${lim.maxTotal} imágenes en esta sección.` }

    let subidas = 0
    const fallos: string[] = []
    for (const f of archivos) {
        try {
            const p = await guardarImagen(f, "sitios", { tipo: "maximo", lado: lim.lado })
            try {
                await repo.agregarArchivo(s.id, tipo, { archivo: p.ruta, nombre: f.name, ancho: p.ancho, alto: p.alto })
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

    // El logo reemplaza al anterior (solo si la subida nueva salió bien).
    if (tipo === "logo" && subidas === 1) {
        for (const a of actuales) {
            const ruta = await repo.quitarArchivo(s.id, a.id)
            await borrarArchivo(ruta)
        }
    }

    refrescar(s.id)
    if (fallos.length) return { error: `${subidas} subida(s). No se pudo: ${fallos.join(" · ")}` }
    return { ok: tipo === "logo" ? "Logo actualizado." : `${subidas} imagen(es) agregada(s).` }
}

export async function subirDocumentosAccion(idSitio: number, _: Estado, fd: FormData): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    const archivos = fd.getAll("documentos").filter((f): f is File => f instanceof File && f.size > 0)
    if (archivos.length === 0) return { error: "Elige al menos un documento." }
    if ((await repo.contarArchivos(s.id, "documento")) + archivos.length > 5) return { error: "Se admiten hasta 5 documentos por sitio." }

    let subidos = 0
    const fallos: string[] = []
    for (const f of archivos) {
        try {
            const d = await guardarDocumento(f)
            try {
                await repo.agregarArchivo(s.id, "documento", { archivo: d.ruta, nombre: d.nombre, texto: d.texto })
                subidos++
            } catch (e) {
                await borrarArchivo(d.ruta)
                throw e
            }
        } catch (e) {
            if (e instanceof ErrorDocumento) fallos.push(e.message)
            else throw e
        }
    }

    refrescar(s.id)
    if (fallos.length) return { error: `${subidos} subido(s). ${fallos.join(" · ")}` }
    return { ok: `${subidos} documento(s) agregado(s).` }
}

export async function eliminarArchivoAccion(idSitio: number, idArchivo: number) {
    const { s } = await sitioPropio(idSitio)
    if (!Number.isInteger(idArchivo)) return
    const ruta = await repo.quitarArchivo(s.id, idArchivo)
    await borrarArchivo(ruta)
    refrescar(s.id)
}

// ---- Páginas y CSS (editor de código) ----------------------------------------------------------------

export async function crearPaginaAccion(idSitio: number, _: Estado, fd: FormData): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    const titulo = String(fd.get("titulo") ?? "").trim()
    const slug = String(fd.get("slug") ?? "").trim().toLowerCase()
    const tipo = fd.get("tipo") === "servicio" ? "servicio" : "otra"

    if (!titulo || titulo.length > 150) return { error: "Escribe el nombre de la página (hasta 150 caracteres)." }
    if (!slug || slug.length > 60 || !reCarpeta.test(slug)) return { error: "La URL solo admite minúsculas, números y guiones (ej. diseno-web)." }
    if (slug === "index" || RESERVADOS.includes(slug)) return { error: `«${slug}» es un nombre reservado.` }

    const paginas = await repo.listarPaginas(s.id)
    if (paginas.length >= MAX_PAGINAS) return { error: `El sitio admite hasta ${MAX_PAGINAS} páginas (Inicio y Contacto incluidas).` }
    if (tipo === "servicio" && paginas.filter((p) => p.tipo === "servicio").length >= 5) return { error: "Máximo 5 páginas de servicio." }
    if (paginas.some((p) => p.slug === slug)) return { error: "Ya existe una página con esa URL." }

    await repo.crearPagina(s.id, slug, titulo, tipo)
    refrescar(s.id)
    return { ok: "Página creada." }
}

export async function eliminarPaginaAccion(idSitio: number, idPagina: number): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    const p = await repo.obtenerPagina(s.id, idPagina)
    if (!p) return { error: "La página ya no existe." }
    if (p.tipo === "home") return { error: "La página de Inicio no se puede eliminar." }
    await repo.eliminarPagina(s.id, p.id)
    refrescar(s.id)
    return { ok: "Página eliminada." }
}

export async function guardarPaginaAccion(idSitio: number, idPagina: number, html: string, titulo?: string): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    if (typeof html !== "string" || html.length > MAX_HTML) return { error: "El código es demasiado largo (máximo 500 000 caracteres)." }
    const p = await repo.obtenerPagina(s.id, idPagina)
    if (!p) return { error: "La página ya no existe." }

    const t = typeof titulo === "string" ? titulo.trim() : undefined
    if (t !== undefined && (!t || t.length > 150)) return { error: "El nombre de la página debe tener entre 1 y 150 caracteres." }
    await repo.actualizarPagina(s.id, p.id, { html, titulo: t })
    refrescar(s.id)
    return { ok: "Página guardada." }
}

export async function guardarCssAccion(idSitio: number, css: string): Promise<Estado> {
    const { s } = await sitioPropio(idSitio)
    if (typeof css !== "string" || css.length > MAX_CSS) return { error: "La hoja de estilos es demasiado larga (máximo 300 000 caracteres)." }
    await repo.actualizarCss(s.id, css)
    refrescar(s.id)
    return { ok: "Estilos guardados." }
}
