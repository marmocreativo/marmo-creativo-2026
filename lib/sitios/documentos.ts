import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { RAIZ_UPLOADS } from "@/lib/uploads"

// Documentos del briefing (Word y PDF). Se guardan en uploads/sitios-docs, que NO se sirve públicamente
// (/archivos solo entrega imágenes). De un .docx se extrae el texto; los PDF los leerá la IA directamente.

export class ErrorDocumento extends Error {}

const MAX_BYTES = 10 * 1024 * 1024
const MAX_TEXTO = 60_000

export type DocumentoGuardado = { ruta: string; nombre: string; texto: string | null }

export async function guardarDocumento(archivo: File): Promise<DocumentoGuardado> {
    if (archivo.size === 0) throw new ErrorDocumento("El archivo está vacío.")
    if (archivo.size > MAX_BYTES) throw new ErrorDocumento("El documento pesa más de 10 MB.")

    const ext = path.extname(archivo.name).toLowerCase()
    if (ext !== ".pdf" && ext !== ".docx") throw new ErrorDocumento("Solo se aceptan documentos PDF o Word (.docx).")

    const datos = Buffer.from(await archivo.arrayBuffer())
    // Se valida el contenido real: un PDF empieza con "%PDF" y un .docx es un zip ("PK").
    const cabecera = datos.subarray(0, 5).toString("latin1")
    if (ext === ".pdf" && !cabecera.startsWith("%PDF")) throw new ErrorDocumento(`${archivo.name} no es un PDF válido.`)
    if (ext === ".docx" && !cabecera.startsWith("PK")) throw new ErrorDocumento(`${archivo.name} no es un documento de Word (.docx) válido.`)

    let texto: string | null = null
    if (ext === ".docx") {
        try {
            const mammoth = await import("mammoth")
            const r = await mammoth.extractRawText({ buffer: datos })
            texto = r.value.replace(/\n{3,}/g, "\n\n").trim().slice(0, MAX_TEXTO) || null
        } catch {
            throw new ErrorDocumento(`No se pudo leer ${archivo.name}. Guárdalo de nuevo como .docx o súbelo como PDF.`)
        }
    }

    const dir = path.join(/*turbopackIgnore: true*/ RAIZ_UPLOADS, "sitios-docs")
    await mkdir(/*turbopackIgnore: true*/ dir, { recursive: true })
    const nombreDisco = `${randomUUID()}${ext}`
    await writeFile(path.join(/*turbopackIgnore: true*/ dir, nombreDisco), datos)

    return { ruta: `/archivos/sitios-docs/${nombreDisco}`, nombre: archivo.name, texto }
}
