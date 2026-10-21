import { randomUUID } from "node:crypto"
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp, { type Sharp } from "sharp"

// Carpeta donde se guardan las imágenes subidas. En Docker debe ser un volumen.
export const RAIZ_UPLOADS = path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.UPLOAD_DIR ?? "uploads")

export const CARPETAS = ["clientes", "usuarios", "proyectos", "galeria", "herramientas"] as const
export type Carpeta = (typeof CARPETAS)[number]

const MAX_BYTES = 8 * 1024 * 1024
const FORMATOS = ["jpeg", "png", "webp", "gif", "avif"] // sin SVG: no se aceptan imágenes vectoriales

export type Procesada = { ruta: string; ancho: number; alto: number }

export class ErrorImagen extends Error {}

type Modo = { tipo: "cuadrada"; lado: number } | { tipo: "maximo"; lado: number }

// Valida que sea una imagen real, la recorta o escala, la convierte a WebP y la guarda.
// Devuelve la ruta pública (/archivos/<carpeta>/<id>.webp).
export async function guardarImagen(archivo: File, carpeta: Carpeta, modo: Modo): Promise<Procesada> {
    if (archivo.size === 0) throw new ErrorImagen("El archivo está vacío.")
    if (archivo.size > MAX_BYTES) throw new ErrorImagen("La imagen pesa más de 8 MB.")

    const entrada = Buffer.from(await archivo.arrayBuffer())
    let base: Sharp
    try {
        base = sharp(entrada, { limitInputPixels: 60_000_000 })
        const meta = await base.metadata()
        // Se valida el contenido real, no el tipo que declara el navegador.
        if (!meta.format || !FORMATOS.includes(meta.format)) throw new Error("formato")
    } catch {
        throw new ErrorImagen("El archivo no es una imagen válida (usa JPG, PNG, WebP, GIF o AVIF).")
    }

    const pipeline = base.rotate() // respeta la orientación EXIF
    const redimensionada =
        modo.tipo === "cuadrada"
            ? pipeline.resize(modo.lado, modo.lado, { fit: "cover", position: "centre" })
            : pipeline.resize(modo.lado, modo.lado, { fit: "inside", withoutEnlargement: true })

    const { data, info } = await redimensionada.webp({ quality: 82 }).toBuffer({ resolveWithObject: true })

    const nombre = `${randomUUID()}.webp`
    const dir = path.join(/*turbopackIgnore: true*/ RAIZ_UPLOADS, carpeta)
    await mkdir(/*turbopackIgnore: true*/ dir, { recursive: true })
    await writeFile(path.join(/*turbopackIgnore: true*/ dir, nombre), data)

    return { ruta: `/archivos/${carpeta}/${nombre}`, ancho: info.width, alto: info.height }
}

// Ruta pública -> ruta en disco, solo dentro de la carpeta de uploads. Si no es nuestra, null.
export function rutaEnDisco(rutaPublica: string | null | undefined): string | null {
    if (!rutaPublica?.startsWith("/archivos/")) return null // ej. avatar externo de Google
    const abs = path.resolve(/*turbopackIgnore: true*/ RAIZ_UPLOADS, rutaPublica.slice("/archivos/".length))
    return abs.startsWith(RAIZ_UPLOADS + path.sep) ? abs : null
}

export async function borrarArchivo(rutaPublica: string | null | undefined) {
    const abs = rutaEnDisco(rutaPublica)
    if (!abs) return
    try {
        await unlink(/*turbopackIgnore: true*/ abs)
    } catch {
        // ya no existía: nada que hacer
    }
}

// Tipos que se sirven desde /archivos. Todo lo demás da 404 aunque exista en el disco.
const TIPOS_SERVIDOS: Record<string, string> = {
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".avif": "image/avif",
}

const UUID_WEBP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.webp$/i

export async function leerArchivo(segmentos: string[]): Promise<{ data: Buffer; tipo: string; inmutable: boolean } | null> {
    const abs = rutaEnDisco(`/archivos/${segmentos.join("/")}`)
    const tipo = abs ? TIPOS_SERVIDOS[path.extname(abs).toLowerCase()] : undefined
    if (!abs || !tipo) return null
    try {
        // Los archivos que generamos (nombre UUID) nunca cambian; los importados a mano sí pueden reemplazarse.
        return { data: await readFile(/*turbopackIgnore: true*/ abs), tipo, inmutable: UUID_WEBP.test(path.basename(abs)) }
    } catch {
        return null
    }
}
