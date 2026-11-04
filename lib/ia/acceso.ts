import { NextResponse } from "next/server"
import { usuarioActual } from "@/lib/session"
import { ErrorIA } from "./gemini"

// Las rutas de la IA gastan dinero (API de Google) y escriben archivos: solo administradores.
export async function exigirAdmin(): Promise<NextResponse | null> {
    const u = await usuarioActual()
    if (!u || u.rol !== "admin") return NextResponse.json({ error: "No autorizado." }, { status: 401 })
    return null
}

export async function leerJson(req: Request, maxCaracteres = 20_000): Promise<Record<string, unknown> | null> {
    try {
        const t = await req.text()
        if (t.length > maxCaracteres) return null
        const j: unknown = JSON.parse(t)
        return j && typeof j === "object" && !Array.isArray(j) ? (j as Record<string, unknown>) : null
    } catch {
        return null
    }
}

export const cadena = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")

export const peticionInvalida = (mensaje: string) => NextResponse.json({ error: mensaje }, { status: 400 })

export function responderError(e: unknown): NextResponse {
    if (e instanceof ErrorIA) return NextResponse.json({ error: e.message }, { status: 502 })
    console.error("[ia]", e)
    return NextResponse.json({ error: "Ocurrió un error inesperado al generar con IA." }, { status: 500 })
}
