import { usuarioActual } from "@/lib/session"
import type { DatosHerramienta, Herramienta } from "./esquemas"
import { listarHistorial, obtenerEntrada, type EntradaHistorial } from "./historial"

// Lo que necesita cada página de herramienta: si hay sesión, el historial y (con ?h=<id>) la entrada a reutilizar.
// Si la base de datos no responde, la herramienta sigue funcionando sin historial.
export async function contextoHerramienta<T extends DatosHerramienta>(herramienta: Herramienta, h?: string) {
    let sesion = false
    let historial: EntradaHistorial[] = []
    let inicial: T | undefined
    try {
        const u = await usuarioActual()
        if (u) {
            sesion = true
            historial = await listarHistorial(u.id, herramienta)
            const id = Number(h)
            if (Number.isInteger(id) && id > 0) {
                inicial = (await obtenerEntrada(u.id, id, herramienta))?.datos as T | undefined
            }
        }
    } catch {
        // sin base de datos
    }
    return { sesion, historial, inicial }
}
