import type { Aviso } from "@/lib/sitios/exportar"

// Revisión previa y descarga del sitio en ZIP. Se calcula en el servidor con lo que está GUARDADO (no con lo que
// haya sin guardar en el editor), por eso el aviso al final.
export function PanelExportar({ idSitio, avisos, puedeDescargar }: { idSitio: number; avisos: Aviso[]; puedeDescargar: boolean }) {
    const errores = avisos.filter((a) => a.nivel === "error")
    const otros = avisos.filter((a) => a.nivel === "aviso")

    return (
        <div>
            <h3 className="text-xl font-light text-foreground">Exportar el sitio</h3>
            <p className="mt-2 mb-6 max-w-3xl text-sm text-muted-foreground">
                Descarga un ZIP listo para subir a cualquier hosting: las páginas HTML, <span className="font-mono">styles.css</span>, las imágenes ordenadas en carpetas (
                <span className="font-mono">img/galeria</span>, <span className="font-mono">img/logo</span>) en WebP, <span className="font-mono">sitemap.xml</span> y{" "}
                <span className="font-mono">robots.txt</span>.
            </p>

            <div className="max-w-3xl rounded-xl border border-border p-6">
                {avisos.length === 0 ? (
                    <p className="flex items-center gap-2 text-sm">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Revisión sin pendientes: título, descripción, h1, enlaces e imágenes en orden.
                    </p>
                ) : (
                    <div className="space-y-4 text-sm">
                        {errores.length > 0 && (
                            <div>
                                <p className="mb-2 font-medium text-destructive">Corrige antes de publicar ({errores.length})</p>
                                <ul className="space-y-1.5">
                                    {errores.map((a, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden />
                                            <span>{a.pagina && <span className="font-mono text-xs">{a.pagina}: </span>}{a.texto}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {otros.length > 0 && (
                            <div>
                                <p className="mb-2 font-medium text-foreground">Recomendaciones ({otros.length})</p>
                                <ul className="space-y-1.5">
                                    {otros.map((a, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden />
                                            <span>{a.pagina && <span className="font-mono text-xs">{a.pagina}: </span>}{a.texto}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4">
                    {puedeDescargar ? (
                        <a
                            href={`/panel/sitios/${idSitio}/exportar`}
                            className="inline-flex items-center justify-center bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                            Descargar ZIP
                        </a>
                    ) : (
                        <span className="inline-flex cursor-not-allowed items-center justify-center bg-foreground px-6 py-4 text-sm font-medium text-background opacity-40" aria-disabled="true">
                            Descargar ZIP
                        </span>
                    )}
                    {!puedeDescargar && <p className="text-sm text-muted-foreground">Define el dominio en el paso 2 (SEO) para poder exportar.</p>}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Esta revisión usa lo que está guardado: guarda tus cambios del editor antes de exportar.</p>
            </div>
        </div>
    )
}
