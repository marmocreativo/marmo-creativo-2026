import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { crearSitioAccion } from "@/lib/actions/sitios"
import { requireCreadorSitios } from "@/lib/sitios/acceso"
import { listarSitios } from "@/lib/sitios/repo"
import { NuevoSitio } from "@/components/sitios/formularios-simples"

const ETIQUETA = { borrador: "Borrador", propuestas: "Con propuestas", completo: "Completo" } as const

export default async function Page() {
    const u = await requireCreadorSitios()
    const sitios = await listarSitios(u.id)

    return (
        <div>
            <h2 className="text-3xl font-light text-foreground md:text-4xl">Sitios web</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Crea sitios estáticos en HTML de hasta 7 páginas: llena el briefing, elige colores y referencias, y edita el código cuando quieras.
            </p>

            <section className="mt-10">
                <h3 className="mb-4 text-base font-medium text-foreground">Nuevo sitio</h3>
                <NuevoSitio accion={crearSitioAccion} />
            </section>

            <section className="mt-14">
                <h3 className="mb-4 text-base font-medium text-foreground">Tus sitios</h3>
                {sitios.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Todavía no tienes sitios. Crea el primero arriba.</p>
                ) : (
                    <ul className="grid gap-6 md:grid-cols-3">
                        {sitios.map((s) => (
                            <li key={s.id}>
                                <Link href={`/panel/sitios/${s.id}/briefing`} className="group block rounded-xl border border-border p-6 transition-colors hover:border-foreground">
                                    <p className="text-xs text-muted-foreground">{ETIQUETA[s.estado]} · {s.n_paginas} página(s)</p>
                                    <h4 className="mt-1 text-xl font-light text-foreground">{s.nombre}</h4>
                                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                                        Abrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}
