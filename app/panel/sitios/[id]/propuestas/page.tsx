import Link from "next/link"
import { notFound } from "next/navigation"
import { elegirPropuestaAccion, estadoIAAccion, generarPropuestasAccion } from "@/lib/actions/sitios-ia"
import { opcionesProveedor, proveedorPorDefecto } from "@/lib/ia/texto"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { listarArchivos, listarPropuestas, obtenerSitio } from "@/lib/sitios/repo"
import { consumoDelSitio, ultimaTarea } from "@/lib/sitios/tareas"
import { PanelIA } from "@/components/sitios/panel-ia"
import { VistaPropuestas } from "@/components/sitios/vista-propuestas"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const n = Number((await params).id)
    const u = await requireCreadorSitios()
    const sitio = await obtenerSitio(u.id, n)
    if (!sitio) notFound()

    const [docs, referencias, propuestas, tarea, consumo] = await Promise.all([
        listarArchivos(sitio.id, "documento"),
        listarArchivos(sitio.id, "referencia"),
        listarPropuestas(sitio.id),
        ultimaTarea(sitio.id),
        consumoDelSitio(sitio.id),
    ])
    const base = `/panel/sitios/${sitio.id}`
    const briefingListo = !!(sitio.briefing.empresa && sitio.briefing.giro && sitio.briefing.descripcion)
    const listo = [
        { ok: briefingListo, texto: "Briefing con empresa, giro y descripción", href: `${base}/briefing` },
        { ok: !!sitio.seo.palabra_clave, texto: "Palabra clave de posicionamiento", href: `${base}/seo` },
        { ok: docs.length > 0, texto: `Documentos subidos: ${docs.length} (opcional)`, href: `${base}/briefing` },
        { ok: referencias.length > 0 || sitio.referencias_urls.length > 0, texto: `Referencias: ${sitio.referencias_urls.length} direcciones, ${referencias.length} imágenes (opcional)`, href: `${base}/referencias` },
    ]

    const proveedores = opcionesProveedor()
    const defecto = proveedorPorDefecto()
    const bloqueo = !proveedores.some((p) => p.disponible)
        ? "Falta configurar ANTHROPIC_API_KEY o GEMINI_API_KEY en el servidor."
        : !briefingListo
          ? "Completa el briefing (empresa, giro y descripción) en el paso 1."
          : null

    return (
        <section>
            <h3 className="text-xl font-light text-foreground">Paso 4 · Propuestas</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                La IA diseña 3 propuestas de la página de inicio (solo el Home, en HTML), cada una con una dirección creativa distinta y usando tu briefing, branding, logo,
                imágenes y referencias. Elige la que más te guste para construir el resto del sitio.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {listo.map((i) => (
                    <li key={i.texto} className="flex items-center gap-2">
                        <span className={`inline-block h-2 w-2 rounded-full ${i.ok ? "bg-emerald-500" : "bg-neutral-300"}`} aria-hidden />
                        <Link href={i.href} className="underline-offset-4 hover:underline">{i.texto}</Link>
                    </li>
                ))}
            </ul>

            <div className="mt-8 max-w-3xl">
                <PanelIA
                    idSitio={sitio.id}
                    tipo="propuestas"
                    etiqueta="Generar 3 propuestas con IA"
                    etiquetaOtra="Generar propuestas nuevas"
                    hayResultado={propuestas.length > 0}
                    confirmar={propuestas.length > 0 ? "Se descartarán las propuestas actuales (y la que elegiste) para generar tres nuevas. Cada generación consume crédito de la API. ¿Continuar?" : undefined}
                    iniciar={generarPropuestasAccion}
                    consultar={estadoIAAccion}
                    inicial={tarea}
                    bloqueo={bloqueo}
                    proveedores={proveedores}
                    defecto={defecto}
                />
                {consumo.tareas > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                        Consumo de IA en este sitio: {consumo.tareas} generación(es), costo estimado US${consumo.costo.toFixed(2)}.
                    </p>
                )}
            </div>

            {propuestas.length > 0 && (
                <div className="mt-10">
                    <VistaPropuestas idSitio={sitio.id} propuestas={propuestas} elegida={sitio.propuesta_elegida} elegir={elegirPropuestaAccion} siguienteHref={`${base}/sitio`} />
                </div>
            )}
        </section>
    )
}
