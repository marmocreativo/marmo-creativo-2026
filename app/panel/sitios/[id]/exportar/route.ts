import { NextResponse } from "next/server"
import { puedeCrearSitios } from "@/lib/sitios/acceso"
import { armarZip, ErrorExportar, nombreZip } from "@/lib/sitios/exportar"
import { listarArchivos, listarPaginas, obtenerSitio } from "@/lib/sitios/repo"
import { usuarioActual } from "@/lib/session"

export const dynamic = "force-dynamic"

// Descarga del sitio en ZIP. Solo el dueño (con acceso al creador de sitios) puede bajarlo.
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const u = await usuarioActual()
    if (!u || !puedeCrearSitios(u)) return new NextResponse("No autorizado.", { status: 401 })

    const id = Number((await params).id)
    const sitio = Number.isInteger(id) && id > 0 ? await obtenerSitio(u.id, id) : null
    if (!sitio) return new NextResponse("Sitio no encontrado.", { status: 404 })

    try {
        const [paginas, archivos] = await Promise.all([listarPaginas(sitio.id), listarArchivos(sitio.id)])
        const zip = await armarZip(sitio, paginas, archivos)
        return new NextResponse(new Uint8Array(zip), {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${nombreZip(sitio)}"`,
                "Cache-Control": "no-store",
            },
        })
    } catch (e) {
        if (e instanceof ErrorExportar) return new NextResponse(e.message, { status: 422 })
        console.error("[sitios] exportar:", e)
        return new NextResponse("No se pudo generar el ZIP.", { status: 500 })
    }
}
