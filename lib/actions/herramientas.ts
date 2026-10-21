"use server"

import { createHash } from "node:crypto"
import { revalidatePath } from "next/cache"
import { usuarioActual } from "@/lib/session"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"
import {
    esHerramienta,
    hslAHex,
    INFO_HERRAMIENTA,
    NOMBRE_TIPO_QR,
    normalizarPaleta,
    normalizarQR,
    normalizarWhatsapp,
    type DatosHerramienta,
    type DatosQR,
    type Herramienta,
} from "@/lib/herramientas/esquemas"
import {
    archivosDe,
    borrarEntrada,
    guardarEntrada,
    limpiarHistorial,
    ultimaEntrada,
} from "@/lib/herramientas/historial"

export type ResultadoHistorial = { ok: boolean; guardado?: boolean; error?: string }

// JSON con las llaves ordenadas: MySQL reordena las llaves de una columna JSON, así que comparamos así.
const canonico = (v: unknown): string =>
    Array.isArray(v)
        ? `[${v.map(canonico).join(",")}]`
        : v && typeof v === "object"
          ? `{${Object.entries(v as Record<string, unknown>)
                .filter(([, x]) => x !== undefined)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([k, x]) => `${JSON.stringify(k)}:${canonico(x)}`)
                .join(",")}}`
          : JSON.stringify(v)

export async function guardarHistorial(fd: FormData): Promise<ResultadoHistorial> {
    const u = await usuarioActual()
    if (!u) return { ok: false, error: "Inicia sesión para guardar tu historial." }

    const herramienta = fd.get("herramienta")
    const crudo = String(fd.get("datos") ?? "")
    if (!esHerramienta(herramienta) || crudo.length > 20_000) return { ok: false, error: "Datos no válidos." }

    let raw: unknown
    try {
        raw = JSON.parse(crudo)
    } catch {
        return { ok: false, error: "Datos no válidos." }
    }

    let datos: DatosHerramienta | null = null
    let titulo = ""
    let logo: File | null = null

    if (herramienta === "qr") {
        const d = normalizarQR(raw)
        if (d) {
            const archivo = fd.get("logo")
            if (archivo instanceof File && archivo.size > 0) {
                logo = archivo
                d.logoHash = createHash("sha256").update(Buffer.from(await archivo.arrayBuffer())).digest("hex")
            }
            datos = d
            titulo = `${NOMBRE_TIPO_QR[d.tipo]}: ${d.tipo === "wifi" ? d.wifi.ssid : d.contenido}`.slice(0, 80)
        }
    } else if (herramienta === "whatsapp") {
        const d = normalizarWhatsapp(raw)
        if (d) {
            datos = d
            titulo = `${d.telefono} · ${d.textoBoton}`
        }
    } else {
        const d = normalizarPaleta(raw)
        if (d) {
            datos = d
            titulo = `${hslAHex(d.primary)} · ${hslAHex(d.secondary)} · ${hslAHex(d.accent)} · ${d.fuente}`
        }
    }
    if (!datos) return { ok: false, error: "Datos no válidos." }

    // Si es idéntico a lo último guardado, no se duplica.
    const ultima = await ultimaEntrada(u.id, herramienta)
    if (ultima) {
        const { logo: _logoGuardado, ...previos } = ultima.datos as DatosQR
        void _logoGuardado
        if (canonico(previos) === canonico(datos)) return { ok: true, guardado: false }
    }

    // Logo del QR: se guarda como WebP (lado mayor 300 px; se dibuja a ≤30% de un QR de 400 px).
    if (logo) {
        try {
            ;(datos as DatosQR).logo = (await guardarImagen(logo, "herramientas", { tipo: "maximo", lado: 300 })).ruta
        } catch (e) {
            if (e instanceof ErrorImagen) return { ok: false, error: `Logo: ${e.message}` }
            throw e
        }
    }

    try {
        const podados = await guardarEntrada(u.id, herramienta, titulo, datos)
        await Promise.all(archivosDe(podados).map(borrarArchivo))
    } catch (e) {
        await borrarArchivo((datos as DatosQR).logo)
        throw e
    }

    revalidatePath("/panel/historial")
    return { ok: true, guardado: true }
}

export async function eliminarHistorial(id: number) {
    const u = await usuarioActual()
    if (!u) return
    const datos = await borrarEntrada(u.id, id)
    if (datos) await Promise.all(archivosDe([datos]).map(borrarArchivo))
    revalidatePath("/panel/historial")
    for (const h of Object.values(INFO_HERRAMIENTA)) revalidatePath(h.ruta)
}

export async function vaciarHistorial(herramienta: Herramienta) {
    const u = await usuarioActual()
    if (!u || !esHerramienta(herramienta)) return
    await Promise.all(archivosDe(await limpiarHistorial(u.id, herramienta)).map(borrarArchivo))
    revalidatePath("/panel/historial")
    revalidatePath(INFO_HERRAMIENTA[herramienta].ruta)
}
