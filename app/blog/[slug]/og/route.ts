import { NextResponse } from "next/server"
import sharp from "sharp"
import { obtenerArticulo } from "@/lib/blog"
import { leerArchivo } from "@/lib/uploads"

export const dynamic = "force-dynamic"

// Imagen para compartir (Open Graph): 1200 × 630 px (1.91:1), JPG. Es lo que Facebook, WhatsApp y LinkedIn muestran bien.
// Se genera a partir de la portada del artículo, sea cual sea su tamaño o proporción (recorte centrado).
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    // Detrás del proxy la URL de la petición es la interna: el respaldo apunta al dominio público.
    const respaldo = () => NextResponse.redirect("https://marmo-creativo.com/og-main.jpg", 307)

    let portada: string | null = null
    try {
        portada = (await obtenerArticulo(slug))?.portada ?? null
    } catch {
        return respaldo()
    }
    if (!portada?.startsWith("/archivos/")) return respaldo()

    const archivo = await leerArchivo(portada.slice("/archivos/".length).split("/"))
    if (!archivo) return respaldo()

    try {
        const jpg = await sharp(archivo.data, { limitInputPixels: 60_000_000 })
            .rotate()
            .resize(1200, 630, { fit: "cover", position: "centre" })
            .flatten({ background: "#ffffff" })
            .jpeg({ quality: 86, mozjpeg: true })
            .toBuffer()
        return new NextResponse(new Uint8Array(jpg), {
            headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600" },
        })
    } catch {
        return respaldo()
    }
}
