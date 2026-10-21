import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Fila } from "@/lib/crm/repo"
import { addDias, formato, rangoTarea, semanaDe } from "@/lib/crm/semana"
import { EstadoSelect } from "./estado-select"

const ESTADOS = ["Por Iniciar", "En Proceso", "Entregado", "Cancelado", "Congelado"] as const
const CERRADAS = ["Entregado", "Cancelado"]

function Tarjeta({ t }: { t: Fila }) {
    return (
        <div className="rounded-lg border border-border bg-white p-2 text-xs space-y-1.5">
            <Link href={`/admin/tareas/${t.id}`} className="block font-medium text-foreground leading-snug hover:underline">
                {t.titulo}
            </Link>
            <p className="text-muted-foreground leading-snug">
                {t.cliente__label}
                {t.id_proyecto__label ? ` · ${t.id_proyecto__label}` : ""}
            </p>
            <EstadoSelect slug="tareas" id={Number(t.id)} campo="estado" valor={String(t.estado)} opciones={ESTADOS} />
        </div>
    )
}

export function TareasSemana({
    filas,
    domingo,
    hoy,
    href,
}: {
    filas: Fila[]
    domingo: string
    hoy: string
    href: (semana: string) => string // enlace a otra semana conservando los filtros
}) {
    const dias = semanaDe(domingo)
    const hastaSabado = dias[6]

    const porDia = dias.map((dia) =>
        filas.filter((t) => {
            const r = rangoTarea(t)
            return r && dia >= r[0] && dia <= r[1]
        }),
    )
    const sinFecha = filas.filter((t) => !rangoTarea(t) && !CERRADAS.includes(String(t.estado)))

    const mismoAnio = domingo.slice(0, 4) === hastaSabado.slice(0, 4)
    const titulo = `${formato(domingo, { day: "numeric", month: "short", ...(mismoAnio ? {} : { year: "numeric" }) })} – ${formato(hastaSabado, { day: "numeric", month: "short", year: "numeric" })}`

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-light text-foreground">{titulo}</p>
                <div className="flex items-center gap-2 text-sm">
                    <Link href={href(addDias(domingo, -7))} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 hover:border-foreground transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Anterior
                    </Link>
                    <Link href={href(hoy)} className="rounded-lg border border-border px-3 py-1.5 hover:border-foreground transition-colors">
                        Hoy
                    </Link>
                    <Link href={href(addDias(domingo, 7))} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 hover:border-foreground transition-colors">
                        Siguiente <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 min-w-[1000px]">
                    {dias.map((dia, i) => {
                        const esHoy = dia === hoy
                        return (
                            <section
                                key={dia}
                                className={`rounded-xl border p-2 min-h-48 ${esHoy ? "border-foreground bg-neutral-100" : "border-border bg-neutral-50"}`}
                            >
                                <header className="mb-2 px-1 flex items-baseline justify-between">
                                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                        {formato(dia, { weekday: "short" }).replace(".", "")}
                                    </span>
                                    <span className={`text-lg font-light ${esHoy ? "text-foreground" : "text-muted-foreground"}`}>
                                        {formato(dia, { day: "numeric" })}
                                    </span>
                                </header>
                                <div className="space-y-2">
                                    {porDia[i].map((t) => (
                                        <Tarjeta key={t.id} t={t} />
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>
            </div>

            {sinFecha.length > 0 && (
                <div className="mt-8">
                    <h3 className="mb-3 text-lg font-light text-foreground">
                        Sin fecha <span className="text-sm text-muted-foreground">({sinFecha.length} abiertas)</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {sinFecha.map((t) => (
                            <Tarjeta key={t.id} t={t} />
                        ))}
                    </div>
                </div>
            )}

            {filas.length === 0 && (
                <p className="mt-6 text-muted-foreground">No hay tareas con estos filtros.</p>
            )}
        </div>
    )
}
