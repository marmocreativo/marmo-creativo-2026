import { eliminarArchivoAccion, guardarSeccionAccion, subirDocumentosAccion, subirImagenesAccion } from "@/lib/actions/sitios"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { BRIEFING } from "@/lib/sitios/campos"
import { listarArchivos, obtenerSitio } from "@/lib/sitios/repo"
import { notFound } from "next/navigation"
import { FormSeccion } from "@/components/sitios/form-seccion"
import { GaleriaImagenes, ListaDocumentos, SubirDocumentos, SubirImagenes } from "@/components/sitios/archivos"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const n = Number((await params).id)
    const u = await requireCreadorSitios()
    const sitio = await obtenerSitio(u.id, n)
    if (!sitio) notFound()

    const [documentos, galeria] = await Promise.all([listarArchivos(sitio.id, "documento"), listarArchivos(sitio.id, "galeria")])

    return (
        <div className="space-y-14">
            <section>
                <h3 className="text-xl font-light text-foreground">Paso 1 · Briefing y contenido</h3>
                <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
                    Cuéntanos de la empresa. Lo que escribas aquí es lo que usará la IA para redactar el sitio. Los datos de contacto aparecerán en el sitio tal cual.
                </p>
                <FormSeccion campos={BRIEFING} valores={{ empresa: sitio.nombre, ...sitio.briefing }} accion={guardarSeccionAccion.bind(null, sitio.id, "briefing")} />
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-base font-medium text-foreground">Documentos</h3>
                <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
                    Si ya tienes información escrita (presentación, catálogo, brochure), súbela en Word (.docx) o PDF. Hasta 5 documentos de 10 MB.
                </p>
                <div className="space-y-4">
                    <SubirDocumentos accion={subirDocumentosAccion.bind(null, sitio.id)} />
                    <ListaDocumentos documentos={documentos} eliminar={eliminarArchivoAccion.bind(null, sitio.id)} />
                </div>
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-base font-medium text-foreground">Imágenes del negocio</h3>
                <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
                    Fotos de tu local, productos, equipo o trabajos. Se guardan en WebP (lado más largo 1600 px) en la galería del proyecto, para usarlas sin volver a subirlas.
                </p>
                <div className="space-y-6">
                    <SubirImagenes accion={subirImagenesAccion.bind(null, sitio.id, "galeria")} />
                    <GaleriaImagenes imagenes={galeria} eliminar={eliminarArchivoAccion.bind(null, sitio.id)} />
                </div>
            </section>
        </div>
    )
}
