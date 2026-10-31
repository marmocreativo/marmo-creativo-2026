"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Pencil } from "lucide-react"
import { formato, rangoTarea, semanaDe } from "@/lib/crm/semana"
import { agruparHoy, type TareaFila } from "@/lib/crm/tareas-logica"
import { EdicionRapida } from "./edicion-rapida"
import { EstadoBarra } from "./estado-barra"
import { FechaEstimada } from "./fecha-estimada"
import { ResponsableAvatar } from "./responsable-avatar"
import { TextoColapsable } from "./texto-colapsable"

type Vista = "lista" | "semana" | "hoy"
type Responsable = { id: number; label: string }

// ---------------------------------------------------------------------------
// Piezas compartidas por las tres vistas
// ---------------------------------------------------------------------------
function Identidad({ t, alEditar }: { t: TareaFila; alEditar: (t: TareaFila) => void }) {
    return (
        <div className="min-w-0">
            {t.cliente && <p className="truncate text-xs text-muted-foreground">{t.cliente}</p>}
            <button type="button" onClick={() => alEditar(t)} title="Edición rápida" className="text-left text-sm font-medium leading-snug text-foreground underline-offset-2 hover:underline">
                {t.titulo}
            </button>
            {t.proyecto && <p className="truncate text-xs text-muted-foreground">{t.proyecto}</p>}
        </div>
    )
}

function Acciones({ t, volver, alEditar, compacta = false }: { t: TareaFila; volver: string; alEditar: (t: TareaFila) => void; compacta?: boolean }) {
    const boton = `flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground ${compacta ? "h-6 w-6" : "h-8 w-8"}`
    const icono = compacta ? "h-3.5 w-3.5" : "h-4 w-4"
    return (
        <div className="flex shrink-0 items-center">
            <button type="button" onClick={() => alEditar(t)} title="Edición rápida" aria-label="Edición rápida" className={boton}>
                <Pencil className={icono} />
            </button>
            <Link href={`/admin/tareas/${t.id}?volver=${encodeURIComponent(volver)}`} title="Edición completa" aria-label="Edición completa" className={boton}>
                <ArrowUpRight className={icono} />
            </Link>
        </div>
    )
}

function Tarjeta({ t, hoy, volver, alEditar }: { t: TareaFila; hoy: string; volver: string; alEditar: (t: TareaFila) => void }) {
    return (
        <article className="space-y-3 rounded-xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-2">
                <Identidad t={t} alEditar={alEditar} />
                <Acciones t={t} volver={volver} alEditar={alEditar} />
            </div>
            {t.descripcion && <TextoColapsable texto={t.descripcion} />}
            <EstadoBarra key={`${t.id}-${t.estado}`} id={t.id} estado={t.estado} />
            <div className="flex items-center justify-between gap-3">
                <FechaEstimada estimado={t.estimado} entregado={t.entregado} estado={t.estado} hoy={hoy} />
                <ResponsableAvatar nombre={t.responsable} avatar={t.responsable_avatar} />
            </div>
        </article>
    )
}

function Vacio({ children }: { children: React.ReactNode }) {
    return <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">{children}</p>
}

// ---------------------------------------------------------------------------
// Lista: tabla en pantallas medianas y grandes, tarjetas en el celular
// ---------------------------------------------------------------------------
function Lista({ filas, hoy, volver, alEditar }: { filas: TareaFila[]; hoy: string; volver: string; alEditar: (t: TareaFila) => void }) {
    if (filas.length === 0) return <Vacio>No hay tareas con estos filtros.</Vacio>

    return (
        <>
            <div className="hidden overflow-hidden rounded-xl border border-border md:block">
                <table className="w-full text-sm">
                    <thead className="bg-neutral-100 text-left text-xs font-medium text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2.5">Tarea</th>
                            <th className="w-44 px-4 py-2.5">Estado</th>
                            <th className="w-40 px-4 py-2.5">Estimado</th>
                            <th className="w-28 px-4 py-2.5 text-center">Responsable</th>
                            <th className="w-20 px-2 py-2.5" />
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((t) => (
                            <tr key={t.id} className="border-t border-border align-top transition-colors hover:bg-neutral-50">
                                <td className="px-4 py-3">
                                    <Identidad t={t} alEditar={alEditar} />
                                    {t.descripcion && <TextoColapsable texto={t.descripcion} className="mt-1.5 max-w-xl" />}
                                </td>
                                <td className="px-4 py-3">
                                    <EstadoBarra key={`${t.id}-${t.estado}`} id={t.id} estado={t.estado} />
                                </td>
                                <td className="px-4 py-3">
                                    <FechaEstimada estimado={t.estimado} entregado={t.entregado} estado={t.estado} hoy={hoy} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-center">
                                        <ResponsableAvatar nombre={t.responsable} avatar={t.responsable_avatar} />
                                    </div>
                                </td>
                                <td className="px-2 py-2 text-right">
                                    <Acciones t={t} volver={volver} alEditar={alEditar} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid gap-3 md:hidden">
                {filas.map((t) => (
                    <Tarjeta key={t.id} t={t} hoy={hoy} volver={volver} alEditar={alEditar} />
                ))}
            </div>
        </>
    )
}

// ---------------------------------------------------------------------------
// Semana: 7 columnas (domingo a sábado) en pantalla grande; días apilados en pantallas chicas
// ---------------------------------------------------------------------------
function TarjetaSemana({ t, hoy, volver, alEditar }: { t: TareaFila; hoy: string; volver: string; alEditar: (t: TareaFila) => void }) {
    return (
        <div className="min-w-0 space-y-1.5 rounded-lg border border-border bg-white p-2.5 text-xs">
            <div className="flex items-start justify-between gap-1">
                <button type="button" onClick={() => alEditar(t)} title="Edición rápida" className="text-left font-medium leading-snug text-foreground hover:underline">
                    {t.titulo}
                </button>
                <Acciones t={t} volver={volver} alEditar={alEditar} compacta />
            </div>
            {(t.cliente || t.proyecto) && <p className="text-muted-foreground">{[t.cliente, t.proyecto].filter(Boolean).join(" · ")}</p>}
            <EstadoBarra key={`${t.id}-${t.estado}`} id={t.id} estado={t.estado} className="min-w-0" />
            <div className="flex items-center justify-between gap-2">
                <FechaEstimada estimado={t.estimado} entregado={t.entregado} estado={t.estado} hoy={hoy} />
                <ResponsableAvatar nombre={t.responsable} avatar={t.responsable_avatar} tam={22} />
            </div>
        </div>
    )
}

function Semana({
    filas,
    domingo,
    hoy,
    volver,
    nav,
    alEditar,
}: {
    filas: TareaFila[]
    domingo: string
    hoy: string
    volver: string
    nav: { anterior: string; hoy: string; siguiente: string }
    alEditar: (t: TareaFila) => void
}) {
    const dias = semanaDe(domingo)
    const porDia = dias.map((dia) =>
        filas.filter((t) => {
            const r = rangoTarea(t)
            return r && dia >= r[0] && dia <= r[1]
        }),
    )
    // Sin ninguna fecha: se listan aparte (solo lo que sigue vivo).
    const sinFecha = filas.filter((t) => !rangoTarea(t) && t.estado !== "Entregado" && t.estado !== "Cancelado")

    const fin = dias[6]
    const mismoAnio = domingo.slice(0, 4) === fin.slice(0, 4)
    const titulo = `${formato(domingo, { day: "numeric", month: "short", ...(mismoAnio ? {} : { year: "numeric" }) })} – ${formato(fin, { day: "numeric", month: "short", year: "numeric" })}`
    const botonNav = "inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-sm transition-colors hover:border-foreground"

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{titulo}</p>
                <div className="flex items-center gap-1.5">
                    <Link href={nav.anterior} className={botonNav} aria-label="Semana anterior">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Anterior</span>
                    </Link>
                    <Link href={nav.hoy} className={botonNav}>
                        Hoy
                    </Link>
                    <Link href={nav.siguiente} className={botonNav} aria-label="Semana siguiente">
                        <span className="hidden sm:inline">Siguiente</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            <div className="@container">
            <div className="grid grid-cols-1 gap-2 @[560px]:grid-cols-2 @[800px]:grid-cols-4 @[1000px]:grid-cols-7">
                {dias.map((dia, i) => {
                    const esHoy = dia === hoy
                    const tareas = porDia[i]
                    return (
                        <section key={dia} className={`min-w-0 rounded-xl border p-2 ${esHoy ? "border-foreground bg-neutral-100" : "border-border bg-neutral-50"}`}>
                            <header className="flex items-baseline justify-between px-1 pb-1.5">
                                <span className="text-xs uppercase tracking-wide text-muted-foreground">{formato(dia, { weekday: "short" }).replace(".", "")}</span>
                                <span className={`text-sm ${esHoy ? "font-medium text-foreground" : "text-muted-foreground"}`}>{formato(dia, { day: "numeric" })}</span>
                            </header>
                            <div className="space-y-2">
                                {tareas.map((t) => (
                                    <TarjetaSemana key={t.id} t={t} hoy={hoy} volver={volver} alEditar={alEditar} />
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
            </div>

            {sinFecha.length > 0 && (
                <details className="mt-6">
                    <summary className="cursor-pointer text-sm font-medium text-foreground">
                        Sin fecha <span className="font-normal text-muted-foreground">({sinFecha.length} abiertas)</span>
                    </summary>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {sinFecha.map((t) => (
                            <TarjetaSemana key={t.id} t={t} hoy={hoy} volver={volver} alEditar={alEditar} />
                        ))}
                    </div>
                </details>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Por hacer hoy: atrasadas, luego las de hoy y luego las que van en tiempo
// ---------------------------------------------------------------------------
function Hoy({ filas, hoy, volver, alEditar }: { filas: TareaFila[]; hoy: string; volver: string; alEditar: (t: TareaFila) => void }) {
    const g = agruparHoy(filas, hoy)
    const secciones = [
        { clave: "atrasadas", titulo: "Atrasadas", items: g.atrasadas, marca: "bg-red-50 text-red-700 ring-red-200", linea: "border-red-300" },
        { clave: "hoy", titulo: "Se entregan hoy", items: g.deHoy, marca: "bg-orange-50 text-orange-700 ring-orange-200", linea: "border-orange-300" },
        { clave: "tiempo", titulo: "En tiempo", items: g.enTiempo, marca: "bg-neutral-100 text-neutral-700 ring-neutral-200", linea: "border-border" },
    ]
    const total = secciones.reduce((n, s) => n + s.items.length, 0) + g.sinFecha.length
    if (total === 0) return <Vacio>Todo al día: no hay tareas pendientes para hoy.</Vacio>

    return (
        <div className="space-y-8">
            {secciones.map(
                (s) =>
                    s.items.length > 0 && (
                        <section key={s.clave} aria-labelledby={`hoy-${s.clave}`}>
                            <h3 id={`hoy-${s.clave}`} className={`mb-3 flex items-center gap-2 border-b pb-2 text-sm font-medium text-foreground ${s.linea}`}>
                                {s.titulo}
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${s.marca}`}>{s.items.length}</span>
                            </h3>
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {s.items.map((t) => (
                                    <Tarjeta key={t.id} t={t} hoy={hoy} volver={volver} alEditar={alEditar} />
                                ))}
                            </div>
                        </section>
                    ),
            )}

            {g.sinFecha.length > 0 && (
                <details>
                    <summary className="cursor-pointer text-sm font-medium text-foreground">
                        Sin fecha <span className="font-normal text-muted-foreground">({g.sinFecha.length})</span>
                    </summary>
                    <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {g.sinFecha.map((t) => (
                            <Tarjeta key={t.id} t={t} hoy={hoy} volver={volver} alEditar={alEditar} />
                        ))}
                    </div>
                </details>
            )}
        </div>
    )
}

// ---------------------------------------------------------------------------
export function VistaTareas({
    filas,
    vista,
    hoy,
    domingo,
    responsables,
    volver,
    nav,
}: {
    filas: TareaFila[]
    vista: Vista
    hoy: string
    domingo: string
    responsables: Responsable[]
    volver: string // la lista con sus filtros: a ella se regresa tras editar
    nav: { anterior: string; hoy: string; siguiente: string }
}) {
    const [editando, setEditando] = useState<TareaFila | null>(null)

    return (
        <>
            {vista === "lista" && <Lista filas={filas} hoy={hoy} volver={volver} alEditar={setEditando} />}
            {vista === "semana" && <Semana filas={filas} domingo={domingo} hoy={hoy} volver={volver} nav={nav} alEditar={setEditando} />}
            {vista === "hoy" && <Hoy filas={filas} hoy={hoy} volver={volver} alEditar={setEditando} />}

            <EdicionRapida tarea={editando} responsables={responsables} hoy={hoy} volver={volver} alCerrar={() => setEditando(null)} />
        </>
    )
}
