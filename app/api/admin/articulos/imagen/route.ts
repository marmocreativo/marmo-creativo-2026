import { NextResponse } from "next/server"
import { usuarioActual } from "@/lib/session"
import { ErrorImagen, guardarImagen } from "@/lib/uploads"

// Sube una imagen desde el editor del blog (botón, arrastrar o pegar). Solo administradores.
// Se guarda en WebP con el lado más largo a 1200 px, igual que la portada y la galería.
export async function POST(req: Request) {
    const u = await usuarioActual()
    if (!u || u.rol !== "admin") return NextResponse.json({ error: "No autorizado." }, { status: 401 })

    const fd = await req.formData().catch(() => null)
    const archivo = fd?.get("imagen")
    if (!(archivo instanceof File) || archivo.size === 0) return NextResponse.json({ error: "No llegó ninguna imagen." }, { status: 400 })

    try {
        const p = await guardarImagen(archivo, "articulos", { tipo: "maximo", lado: 1200 })
        return NextResponse.json({ url: p.ruta, ancho: p.ancho, alto: p.alto })
    } catch (e) {
        if (e instanceof ErrorImagen) return NextResponse.json({ error: e.message }, { status: 400 })
        throw e
    }
}
