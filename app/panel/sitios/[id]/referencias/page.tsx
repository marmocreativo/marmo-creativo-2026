import { notFound } from "next/navigation"
import { eliminarArchivoAccion, guardarUrlsReferenciaAccion, subirImagenesAccion } from "@/lib/actions/sitios"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { listarArchivos, obtenerSitio } from "@/lib/sitios/repo"
import { GaleriaImagenes, SubirImagenes } from "@/components/sitios/archivos"
import { FormUrls } from "@/components/sitios/formularios-simples"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const n = Number((await params).id)
    const u = await requireCreadorSitios()
    const sitio = await obtenerSitio(u.id, n)
    if (!sitio) notFound()

    const referencias = await listarArchivos(sitio.id, "referencia")

    return (
        <div className="space-y-14">
            <section>
                <h3 className="text-xl font-light text-foreground">Paso 3 · Referencias</h3>
                <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
                    Muéstranos sitios que te gusten: la IA los toma como inspiración de estilo y estructura (no los copia).
                </p>
                <FormUrls accion={guardarUrlsReferenciaAccion.bind(null, sitio.id)} urls={sitio.referencias_urls} />
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-base font-medium text-foreground">Capturas de pantalla</h3>
                <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
                    Sube imágenes de sitios de referencia (puedes pegar con Ctrl+V). Hasta 12.
                </p>
                <div className="space-y-6">
                    <SubirImagenes accion={subirImagenesAccion.bind(null, sitio.id, "referencia")} />
                    <GaleriaImagenes imagenes={referencias} eliminar={eliminarArchivoAccion.bind(null, sitio.id)} />
                </div>
            </section>
        </div>
    )
}
