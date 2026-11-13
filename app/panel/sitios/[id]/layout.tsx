import Link from "next/link"
import { notFound } from "next/navigation"
import { eliminarSitioAccion } from "@/lib/actions/sitios"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { obtenerSitio } from "@/lib/sitios/repo"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { Pasos } from "@/components/sitios/pasos"

export default async function SitioLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params
    const n = Number(id)
    const u = await requireCreadorSitios()
    const sitio = Number.isInteger(n) && n > 0 ? await obtenerSitio(u.id, n) : null
    if (!sitio) notFound()

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <Link href="/panel/sitios" className="text-sm text-muted-foreground hover:text-foreground">← Todos los sitios</Link>
                    <h2 className="mt-2 text-3xl font-light text-foreground md:text-4xl">{sitio.nombre}</h2>
                </div>
                <BotonEliminar accion={eliminarSitioAccion.bind(null, sitio.id)} etiqueta={`el sitio «${sitio.nombre}» con todas sus páginas e imágenes`} texto="Eliminar sitio" />
            </div>
            <Pasos idSitio={sitio.id} />
            {children}
        </div>
    )
}
