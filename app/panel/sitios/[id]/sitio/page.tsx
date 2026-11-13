import { notFound } from "next/navigation"
import {
    crearPaginaAccion,
    eliminarArchivoAccion,
    eliminarPaginaAccion,
    guardarCssAccion,
    guardarPaginaAccion,
    subirImagenesAccion,
} from "@/lib/actions/sitios"
import { estadoIAAccion, generarSitioAccion, iniciarEdicionAccion, resultadoEdicionAccion } from "@/lib/actions/sitios-ia"
import { anthropicConfigurada } from "@/lib/ia/anthropic"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { dominioDe, revisar } from "@/lib/sitios/exportar"
import { ultimaTarea } from "@/lib/sitios/tareas"
import { listarArchivos, listarPaginas, MAX_PAGINAS, obtenerSitio } from "@/lib/sitios/repo"
import { EditorCodigo } from "@/components/sitios/editor-codigo"
import { GaleriaImagenes, SubirImagenes } from "@/components/sitios/archivos"
import { PanelExportar } from "@/components/sitios/panel-exportar"
import { PanelIA } from "@/components/sitios/panel-ia"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const n = Number((await params).id)
    const u = await requireCreadorSitios()
    const sitio = await obtenerSitio(u.id, n)
    if (!sitio) notFound()

    const [paginas, archivos, tarea] = await Promise.all([listarPaginas(sitio.id), listarArchivos(sitio.id), ultimaTarea(sitio.id)])
    const galeria = archivos.filter((a) => a.tipo === "galeria")
    const avisos = revisar(sitio, paginas, archivos)
    const yaGenerado = sitio.estado === "completo"
    const bloqueo = !anthropicConfigurada()
        ? "Falta configurar ANTHROPIC_API_KEY en el servidor."
        : !sitio.propuesta_elegida
          ? "Primero elige una propuesta en el paso 4."
          : null

    return (
        <div className="space-y-14">
            <section>
                <h3 className="text-xl font-light text-foreground">Paso 5 · Sitio completo</h3>
                <p className="mt-2 mb-6 max-w-3xl text-sm text-muted-foreground">
                    Con la propuesta elegida, la IA crea la hoja de estilos aparte, el Inicio, hasta 5 páginas de servicio posicionadas con SEO y la página de Contacto.
                    Después puedes ajustar todo en el editor de código de abajo.
                </p>
                <div className="mb-10 max-w-3xl">
                    <PanelIA
                        idSitio={sitio.id}
                        tipo="sitio"
                        etiqueta="Generar el sitio completo con IA"
                        etiquetaOtra="Volver a generar el sitio"
                        hayResultado={yaGenerado}
                        confirmar="Esto reemplaza los estilos (styles.css) y el contenido de Inicio, Contacto y las páginas de servicio, incluidos los cambios que hayas hecho a mano. Cada generación consume crédito de la API. ¿Continuar?"
                        iniciar={generarSitioAccion}
                        consultar={estadoIAAccion}
                        inicial={tarea}
                        bloqueo={bloqueo}
                    />
                </div>
                <p className="mt-2 mb-6 max-w-3xl text-sm text-muted-foreground">
                    Edita el código de cada página y de la hoja de estilos (<span className="font-mono">styles.css</span>). Los cambios no se guardan solos: usa «Guardar cambios».
                    Cada página debe enlazar los estilos con <span className="font-mono">&lt;link rel=&quot;stylesheet&quot; href=&quot;styles.css&quot;&gt;</span>.
                </p>
                <EditorCodigo
                    key={tarea?.id ?? 0}
                    idSitio={sitio.id}
                    paginas={paginas}
                    css={sitio.css}
                    maxPaginas={MAX_PAGINAS}
                    guardarPagina={guardarPaginaAccion}
                    guardarCss={guardarCssAccion}
                    eliminarPagina={eliminarPaginaAccion}
                    crearPagina={crearPaginaAccion.bind(null, sitio.id)}
                    iniciarEdicion={iniciarEdicionAccion}
                    consultar={estadoIAAccion}
                    recoger={resultadoEdicionAccion}
                />
            </section>

            <section className="border-t border-border pt-10">
                <PanelExportar idSitio={sitio.id} avisos={avisos} puedeDescargar={!!dominioDe(sitio)} />
            </section>

            <section className="border-t border-border pt-10">
                <h3 className="text-base font-medium text-foreground">Galería del proyecto</h3>
                <p className="mt-1 mb-4 max-w-3xl text-sm text-muted-foreground">
                    Haz clic en la ruta de una imagen para copiarla y pégala en el código, por ejemplo{" "}
                    <span className="font-mono">&lt;img src=&quot;/archivos/sitios/…webp&quot; alt=&quot;…&quot;&gt;</span>. Al exportar el sitio, las imágenes se ordenan en carpetas y las rutas se ajustan solas.
                </p>
                <div className="space-y-6">
                    <SubirImagenes accion={subirImagenesAccion.bind(null, sitio.id, "galeria")} />
                    <GaleriaImagenes imagenes={galeria} eliminar={eliminarArchivoAccion.bind(null, sitio.id)} copiar />
                </div>
            </section>
        </div>
    )
}
