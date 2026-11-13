import { notFound } from "next/navigation"
import { eliminarArchivoAccion, guardarSeccionAccion, subirImagenesAccion } from "@/lib/actions/sitios"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { BRANDING, SEO } from "@/lib/sitios/campos"
import { listarArchivos, obtenerSitio } from "@/lib/sitios/repo"
import { FormSeccion } from "@/components/sitios/form-seccion"
import { GaleriaImagenes, SubirImagenes } from "@/components/sitios/archivos"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const n = Number((await params).id)
    const u = await requireCreadorSitios()
    const sitio = await obtenerSitio(u.id, n)
    if (!sitio) notFound()

    const logos = await listarArchivos(sitio.id, "logo")
    // Valores iniciales útiles: la ubicación del briefing y el nombre como base de la palabra clave.
    const seo = { ubicacion: sitio.briefing.ubicacion ?? "", ...sitio.seo }

    return (
        <div className="space-y-14">
            <section>
                <h3 className="text-xl font-light text-foreground">Paso 2 · SEO</h3>
                <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
                    Elige la frase con la que quieres aparecer en Google. La fórmula que mejor funciona es <strong>servicio + valor agregado + ubicación</strong>.
                </p>
                <FormSeccion campos={SEO} valores={seo} accion={guardarSeccionAccion.bind(null, sitio.id, "seo")} sugerirClave />
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-xl font-light text-foreground">Branding</h3>
                <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">Colores y tipografías de la marca. Se usan en el CSS del sitio.</p>
                <FormSeccion campos={BRANDING} valores={sitio.branding} accion={guardarSeccionAccion.bind(null, sitio.id, "branding")} />
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-base font-medium text-foreground">Logo</h3>
                <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
                    Sube tu logo en PNG (de preferencia con fondo transparente). Se guarda en WebP conservando la transparencia. Si subes otro, reemplaza al anterior.
                </p>
                <div className="space-y-6">
                    <SubirImagenes accion={subirImagenesAccion.bind(null, sitio.id, "logo")} etiqueta="Subir logo" multiple={false} />
                    <GaleriaImagenes imagenes={logos} eliminar={eliminarArchivoAccion.bind(null, sitio.id)} copiar />
                </div>
            </section>
        </div>
    )
}
