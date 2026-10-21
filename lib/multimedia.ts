import { mkdir, readdir, rm, stat, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import { RAIZ_UPLOADS } from "@/lib/uploads"

// Explorador de la carpeta de uploads (el volumen de Docker en producción).
// Regla de oro: nada que venga del navegador toca el disco sin pasar por resolverRuta().

export const TIPOS_MULTIMEDIA: Record<string, string> = {
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".avif": "image/avif",
}

// sharp reporta el AVIF como "heif".
const EXTENSIONES_POR_FORMATO: Record<string, string[]> = {
    jpeg: [".jpg", ".jpeg"],
    png: [".png"],
    webp: [".webp"],
    gif: [".gif"],
    heif: [".avif"],
}

export const MAX_ARCHIVO = 25 * 1024 * 1024
const POR_PAGINA = 120

// Letras, números, espacio y . _ ( ) -; sin empezar por punto, ni terminar en punto o espacio.
const NOMBRE_VALIDO = /^[\p{L}\p{N}][\p{L}\p{N} ._()\-]{0,99}$/u
export const nombreValido = (n: string) => NOMBRE_VALIDO.test(n) && !/[. ]$/.test(n)

export class ErrorMultimedia extends Error {}

// Segmentos -> ruta absoluta dentro de la raíz, o null si algún segmento es sospechoso.
export function resolverRuta(segmentos: string[]): string | null {
    if (!segmentos.every(nombreValido)) return null
    const abs = path.resolve(RAIZ_UPLOADS, ...segmentos)
    return abs === RAIZ_UPLOADS || abs.startsWith(RAIZ_UPLOADS + path.sep) ? abs : null
}

export const separar = (ruta: string) => ruta.split("/").filter(Boolean)

export type Carpeta = { nombre: string }
export type ArchivoMultimedia = { nombre: string; bytes: number; fecha: string }
export type Listado = { carpetas: Carpeta[]; archivos: ArchivoMultimedia[]; totalArchivos: number; pagina: number; paginas: number }

export async function listarDirectorio(segmentos: string[], pagina = 1): Promise<Listado | null> {
    const abs = resolverRuta(segmentos)
    if (!abs) return null

    let entradas
    try {
        entradas = await readdir(abs, { withFileTypes: true })
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT" && abs === RAIZ_UPLOADS) {
            await mkdir(RAIZ_UPLOADS, { recursive: true }) // primera vez en un servidor nuevo
            return { carpetas: [], archivos: [], totalArchivos: 0, pagina: 1, paginas: 1 }
        }
        return null
    }

    const collator = new Intl.Collator("es", { numeric: true })
    const carpetas = entradas.filter((e) => e.isDirectory() && nombreValido(e.name)).map((e) => ({ nombre: e.name })).sort((a, b) => collator.compare(a.nombre, b.nombre))
    const nombres = entradas
        .filter((e) => e.isFile() && nombreValido(e.name) && path.extname(e.name).toLowerCase() in TIPOS_MULTIMEDIA)
        .map((e) => e.name)
        .sort(collator.compare)

    const paginas = Math.max(1, Math.ceil(nombres.length / POR_PAGINA))
    const actual = Math.min(Math.max(1, pagina), paginas)
    // Solo se consulta tamaño y fecha de los archivos de la página que se muestra.
    const archivos = await Promise.all(
        nombres.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA).map(async (nombre) => {
            const s = await stat(path.join(abs, nombre))
            return { nombre, bytes: s.size, fecha: s.mtime.toISOString() }
        }),
    )
    return { carpetas, archivos, totalArchivos: nombres.length, pagina: actual, paginas }
}

export async function crearCarpeta(segmentos: string[], nombre: string) {
    const padre = resolverRuta(segmentos)
    if (!padre) throw new ErrorMultimedia("La ruta no es válida.")
    if (!nombreValido(nombre)) throw new ErrorMultimedia("Nombre no permitido: usa letras, números, espacios y . _ - ( ), sin empezar con punto.")
    try {
        await mkdir(path.join(padre, nombre))
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "EEXIST") throw new ErrorMultimedia("Ya existe una carpeta con ese nombre.")
        throw new ErrorMultimedia("No se pudo crear la carpeta.")
    }
}

export type ResultadoSubida = "subido" | "omitido"

// Guarda el archivo TAL CUAL llegó (sin recomprimir ni recortar). Solo se comprueba que sea una imagen real
// y que su contenido coincida con la extensión, para no alojar HTML disfrazado de .png.
export async function guardarArchivo(segmentos: string[], contenido: Buffer, reemplazar: boolean): Promise<ResultadoSubida> {
    const nombre = segmentos[segmentos.length - 1]
    const abs = segmentos.length ? resolverRuta(segmentos) : null
    if (!abs || !nombre) throw new ErrorMultimedia("Ruta no válida (usa letras, números, espacios y . _ - ( ))")

    const ext = path.extname(nombre).toLowerCase()
    if (!(ext in TIPOS_MULTIMEDIA)) throw new ErrorMultimedia("Tipo no permitido (solo WebP, JPG, PNG, GIF y AVIF)")
    if (contenido.length === 0) throw new ErrorMultimedia("Archivo vacío")
    if (contenido.length > MAX_ARCHIVO) throw new ErrorMultimedia("Pesa más de 25 MB")

    try {
        const meta = await sharp(contenido, { limitInputPixels: 120_000_000 }).metadata()
        if (!meta.format || !EXTENSIONES_POR_FORMATO[meta.format]?.includes(ext)) throw new Error("no coincide")
    } catch {
        throw new ErrorMultimedia("No es una imagen válida o su contenido no coincide con la extensión")
    }

    await mkdir(path.dirname(abs), { recursive: true })
    try {
        await writeFile(abs, contenido, { flag: reemplazar ? "w" : "wx" })
        return "subido"
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "EEXIST") return "omitido"
        throw new ErrorMultimedia("No se pudo escribir en el disco")
    }
}

// Borra un archivo o una carpeta (con todo lo que tenga). La raíz no se puede borrar.
export async function borrarRuta(segmentos: string[]) {
    const abs = segmentos.length ? resolverRuta(segmentos) : null
    if (!abs) throw new ErrorMultimedia("Ruta no válida.")
    try {
        const s = await stat(abs)
        if (s.isDirectory()) await rm(abs, { recursive: true })
        else await unlink(abs)
    } catch {
        throw new ErrorMultimedia("No se pudo borrar (puede que ya no exista).")
    }
}

export const formatoBytes = (b: number) => (b < 1024 ? `${b} B` : b < 1024 ** 2 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 ** 2).toFixed(1)} MB`)
