import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { BRANDING_INICIAL } from "./campos"

export const MAX_PAGINAS = 7
export const MAX_SITIOS_POR_USUARIO = 20

export type Datos = Record<string, string>
export type Sitio = {
    id: number
    id_usuario: number
    nombre: string
    estado: "borrador" | "propuestas" | "completo"
    briefing: Datos
    seo: Datos
    branding: Datos
    referencias_urls: string[]
    referencias_analisis: { hash: string; texto: string } | null
    propuesta_elegida: number | null
    css: string
    updated_at: string
}
export type Pagina = { id: number; id_sitio: number; slug: string; titulo: string; tipo: "home" | "servicio" | "contacto" | "otra"; html: string; orden: number }
export type TipoArchivo = "galeria" | "referencia" | "logo" | "documento"
export type Archivo = { id: number; id_sitio: number; tipo: TipoArchivo; archivo: string; nombre: string | null; ancho: number | null; alto: number | null; texto: string | null }

// MySQL devuelve el JSON ya parseado; MariaDB lo devuelve como texto.
function json<T>(v: unknown, vacio: T): T {
    if (v == null) return vacio
    try {
        return (typeof v === "string" ? JSON.parse(v) : v) as T
    } catch {
        return vacio
    }
}

const aSitio = (r: RowDataPacket): Sitio => ({
    id: r.id,
    id_usuario: r.id_usuario,
    nombre: r.nombre,
    estado: r.estado,
    briefing: json<Datos>(r.briefing, {}),
    seo: json<Datos>(r.seo, {}),
    branding: { ...BRANDING_INICIAL, ...json<Datos>(r.branding, {}) },
    referencias_urls: json<string[]>(r.referencias_urls, []),
    referencias_analisis: json<{ hash: string; texto: string } | null>(r.referencias_analisis, null),
    propuesta_elegida: r.propuesta_elegida ?? null,
    css: r.css ?? "",
    updated_at: String(r.updated_at),
})

export async function listarSitios(idUsuario: number): Promise<(Pick<Sitio, "id" | "nombre" | "estado" | "updated_at"> & { n_paginas: number })[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT s.id, s.nombre, s.estado, s.updated_at,
                (SELECT COUNT(*) FROM sitio_paginas p WHERE p.id_sitio = s.id) AS n_paginas
           FROM sitios s WHERE s.id_usuario = ? ORDER BY s.updated_at DESC`,
        [idUsuario],
    )
    return rows.map((r) => ({ id: r.id, nombre: r.nombre, estado: r.estado, updated_at: String(r.updated_at), n_paginas: Number(r.n_paginas) }))
}

export async function contarSitios(idUsuario: number): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS n FROM sitios WHERE id_usuario = ?", [idUsuario])
    return Number(rows[0].n)
}

// Siempre se pide con el id del dueño: nadie abre el sitio de otra persona.
export async function obtenerSitio(idUsuario: number, id: number): Promise<Sitio | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM sitios WHERE id = ? AND id_usuario = ?", [id, idUsuario])
    return rows[0] ? aSitio(rows[0]) : null
}

const plantilla = (titulo: string) =>
    `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${titulo}</title>\n  <meta name="description" content="">\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main>\n    <h1>${titulo}</h1>\n  </main>\n</body>\n</html>\n`

const CSS_INICIAL = `/* Estilos del sitio */\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #111827; }\nmain { max-width: 960px; margin: 0 auto; padding: 2rem 1rem; }\n`

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

// Crea el proyecto con su Home y su página de Contacto vacías.
export async function crearSitio(idUsuario: number, nombre: string): Promise<number> {
    const conn = await db.getConnection()
    try {
        await conn.beginTransaction()
        const [res] = await conn.query<ResultSetHeader>("INSERT INTO sitios (id_usuario, nombre, css) VALUES (?, ?, ?)", [idUsuario, nombre, CSS_INICIAL])
        const id = res.insertId
        await conn.query(
            "INSERT INTO sitio_paginas (id_sitio, slug, titulo, tipo, html, orden) VALUES (?, 'index', 'Inicio', 'home', ?, 1), (?, 'contacto', 'Contacto', 'contacto', ?, 2)",
            [id, plantilla(escapar(nombre)), id, plantilla(`Contacto - ${escapar(nombre)}`)],
        )
        await conn.commit()
        return id
    } catch (e) {
        await conn.rollback()
        throw e
    } finally {
        conn.release()
    }
}

export const plantillaPagina = plantilla

export async function actualizarSeccion(id: number, seccion: "briefing" | "seo" | "branding", valores: Datos): Promise<void> {
    // `seccion` es una de tres constantes (nunca viene del usuario).
    await db.query(`UPDATE sitios SET ${seccion} = ? WHERE id = ?`, [JSON.stringify(valores), id])
}

export async function actualizarReferenciasUrls(id: number, urls: string[]): Promise<void> {
    await db.query("UPDATE sitios SET referencias_urls = ? WHERE id = ?", [JSON.stringify(urls), id])
}

export async function actualizarCss(id: number, css: string): Promise<void> {
    await db.query("UPDATE sitios SET css = ? WHERE id = ?", [css, id])
}

export async function renombrarSitio(id: number, nombre: string): Promise<void> {
    await db.query("UPDATE sitios SET nombre = ? WHERE id = ?", [nombre, id])
}

// ---- Páginas -----------------------------------------------------------------------------------

export async function listarPaginas(idSitio: number): Promise<Pagina[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, id_sitio, slug, titulo, tipo, html, orden FROM sitio_paginas WHERE id_sitio = ? ORDER BY orden ASC, id ASC",
        [idSitio],
    )
    return rows.map((r) => ({ ...(r as Omit<Pagina, "html">), html: r.html ?? "" }))
}

export async function crearPagina(idSitio: number, slug: string, titulo: string, tipo: Pagina["tipo"]): Promise<number> {
    const [filas] = await db.query<RowDataPacket[]>("SELECT COALESCE(MAX(orden), 0) + 1 AS siguiente FROM sitio_paginas WHERE id_sitio = ?", [idSitio])
    const [res] = await db.query<ResultSetHeader>(
        "INSERT INTO sitio_paginas (id_sitio, slug, titulo, tipo, html, orden) VALUES (?, ?, ?, ?, ?, ?)",
        [idSitio, slug, titulo, tipo, plantilla(escapar(titulo)), Number(filas[0].siguiente)],
    )
    return res.insertId
}

export async function obtenerPagina(idSitio: number, idPagina: number): Promise<Pagina | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id, id_sitio, slug, titulo, tipo, html, orden FROM sitio_paginas WHERE id = ? AND id_sitio = ?",
        [idPagina, idSitio],
    )
    return rows[0] ? { ...(rows[0] as Omit<Pagina, "html">), html: rows[0].html ?? "" } : null
}

export async function actualizarPagina(idSitio: number, idPagina: number, cambios: { html?: string; titulo?: string }): Promise<void> {
    if (cambios.html !== undefined) await db.query("UPDATE sitio_paginas SET html = ? WHERE id = ? AND id_sitio = ?", [cambios.html, idPagina, idSitio])
    if (cambios.titulo !== undefined) await db.query("UPDATE sitio_paginas SET titulo = ? WHERE id = ? AND id_sitio = ?", [cambios.titulo, idPagina, idSitio])
}

export async function eliminarPagina(idSitio: number, idPagina: number): Promise<void> {
    await db.query("DELETE FROM sitio_paginas WHERE id = ? AND id_sitio = ?", [idPagina, idSitio])
}

// ---- Archivos (galería, referencias, logo, documentos) ------------------------------------------

export async function listarArchivos(idSitio: number, tipo?: TipoArchivo): Promise<Archivo[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT id, id_sitio, tipo, archivo, nombre, ancho, alto, texto FROM sitio_archivos
          WHERE id_sitio = ? ${tipo ? "AND tipo = ?" : ""} ORDER BY id ASC`,
        tipo ? [idSitio, tipo] : [idSitio],
    )
    return rows as Archivo[]
}

export async function contarArchivos(idSitio: number, tipo: TipoArchivo): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS n FROM sitio_archivos WHERE id_sitio = ? AND tipo = ?", [idSitio, tipo])
    return Number(rows[0].n)
}

export async function agregarArchivo(
    idSitio: number,
    tipo: TipoArchivo,
    a: { archivo: string; nombre?: string | null; ancho?: number | null; alto?: number | null; texto?: string | null },
): Promise<void> {
    await db.query(
        "INSERT INTO sitio_archivos (id_sitio, tipo, archivo, nombre, ancho, alto, texto) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idSitio, tipo, a.archivo, a.nombre?.slice(0, 200) ?? null, a.ancho ?? null, a.alto ?? null, a.texto ?? null],
    )
}

// Borra la fila y devuelve la ruta del archivo para quitarlo del disco.
export async function quitarArchivo(idSitio: number, idArchivo: number): Promise<string | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT archivo FROM sitio_archivos WHERE id = ? AND id_sitio = ?", [idArchivo, idSitio])
    if (!rows[0]) return null
    await db.query("DELETE FROM sitio_archivos WHERE id = ?", [idArchivo])
    return rows[0].archivo as string
}

export async function archivosDelSitio(idSitio: number): Promise<string[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT archivo FROM sitio_archivos WHERE id_sitio = ?", [idSitio])
    return rows.map((r) => r.archivo as string)
}

export async function eliminarSitio(idUsuario: number, id: number): Promise<void> {
    await db.query("DELETE FROM sitios WHERE id = ? AND id_usuario = ?", [id, idUsuario])
}

// ---- IA: análisis de referencias, propuestas y páginas generadas ---------------------------------------

export type Propuesta = { id: number; numero: number; nombre: string | null; html: string }

export async function guardarAnalisisReferencias(id: number, analisis: { hash: string; texto: string }): Promise<void> {
    await db.query("UPDATE sitios SET referencias_analisis = ? WHERE id = ?", [JSON.stringify(analisis), id])
}

export async function listarPropuestas(idSitio: number): Promise<Propuesta[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT id, numero, nombre, html FROM sitio_propuestas WHERE id_sitio = ? ORDER BY numero ASC", [idSitio])
    return rows as Propuesta[]
}

// Genera de nuevo: las propuestas anteriores y la elegida se descartan.
export async function borrarPropuestas(idSitio: number): Promise<void> {
    await db.query("DELETE FROM sitio_propuestas WHERE id_sitio = ?", [idSitio])
    await db.query("UPDATE sitios SET propuesta_elegida = NULL WHERE id = ?", [idSitio])
}

export async function guardarPropuesta(idSitio: number, numero: number, nombre: string | null, html: string): Promise<void> {
    await db.query(
        "INSERT INTO sitio_propuestas (id_sitio, numero, nombre, html) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), html = VALUES(html)",
        [idSitio, numero, nombre?.slice(0, 100) ?? null, html],
    )
}

export async function elegirPropuesta(idSitio: number, numero: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT id FROM sitio_propuestas WHERE id_sitio = ? AND numero = ?", [idSitio, numero])
    if (!rows[0]) return false
    await db.query("UPDATE sitios SET propuesta_elegida = ? WHERE id = ?", [numero, idSitio])
    return true
}

export async function marcarEstado(idSitio: number, estado: Sitio["estado"]): Promise<void> {
    await db.query("UPDATE sitios SET estado = ? WHERE id = ?", [estado, idSitio])
}

// Guarda una página generada: si ya existe esa URL se reemplaza su contenido (y nombre), si no se crea.
export async function guardarPaginaGenerada(idSitio: number, p: { slug: string; titulo: string; tipo: Pagina["tipo"]; html: string; orden: number }): Promise<void> {
    await db.query(
        `INSERT INTO sitio_paginas (id_sitio, slug, titulo, tipo, html, orden) VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE titulo = VALUES(titulo), tipo = VALUES(tipo), html = VALUES(html), orden = VALUES(orden)`,
        [idSitio, p.slug, p.titulo, p.tipo, p.html, p.orden],
    )
}

// Al generar el sitio completo se vuelven a crear las páginas de servicio (las demás se conservan).
export async function eliminarPaginasDeTipo(idSitio: number, tipo: Pagina["tipo"]): Promise<void> {
    await db.query("DELETE FROM sitio_paginas WHERE id_sitio = ? AND tipo = ?", [idSitio, tipo])
}

export async function actualizarOrden(idSitio: number, slug: string, orden: number): Promise<void> {
    await db.query("UPDATE sitio_paginas SET orden = ? WHERE id_sitio = ? AND slug = ?", [orden, idSitio, slug])
}
