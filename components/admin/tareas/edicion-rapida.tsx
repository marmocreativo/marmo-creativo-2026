"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { editarTareaRapida } from "@/lib/actions/admin"
import type { Estado } from "@/lib/actions/auth"
import { ESTADOS_TAREA, type TareaFila } from "@/lib/crm/tareas-logica"

const campo = "mt-1 w-full border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
const etiqueta = "block text-xs text-muted-foreground"

function Formulario({
    tarea,
    responsables,
    hoy,
    volver,
    alCerrar,
}: {
    tarea: TareaFila
    responsables: { id: number; label: string }[]
    hoy: string
    volver: string
    alCerrar: () => void
}) {
    const [estado, setEstado] = useState(tarea.estado)
    const [entregado, setEntregado] = useState(tarea.entregado ?? "")

    // Al guardar bien se cierra el panel; la lista se actualiza sola (la acción revalida la página).
    const accion = async (previo: Estado, fd: FormData): Promise<Estado> => {
        const r = await editarTareaRapida(tarea.id, previo, fd)
        if (r?.ok) alCerrar()
        return r
    }
    const [resultado, enviar, pendiente] = useActionState(accion, undefined)

    return (
        <form action={enviar} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
            <label className={etiqueta}>
                Título
                <input className={campo} name="titulo" defaultValue={tarea.titulo} required maxLength={200} />
            </label>

            <label className={etiqueta}>
                Descripción
                <textarea className={`${campo} resize-y`} name="descripcion" defaultValue={tarea.descripcion ?? ""} rows={3} />
            </label>

            <div className="grid grid-cols-2 gap-3">
                <label className={etiqueta}>
                    Estado
                    <select
                        className={campo}
                        name="estado"
                        value={estado}
                        onChange={(e) => {
                            setEstado(e.target.value)
                            // Sugerencia: al marcarla entregada se propone la fecha de hoy (editable).
                            if (e.target.value === "Entregado" && !entregado) setEntregado(hoy)
                        }}
                    >
                        {ESTADOS_TAREA.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={etiqueta}>
                    Responsable
                    <select className={campo} name="id_responsable" defaultValue={tarea.id_responsable ?? ""}>
                        <option value="">Sin asignar</option>
                        {responsables.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <label className={etiqueta}>
                    Inicio
                    <input className={campo} type="date" name="inicio" defaultValue={tarea.inicio ?? ""} />
                </label>
                <label className={etiqueta}>
                    Estimado
                    <input className={campo} type="date" name="estimado" defaultValue={tarea.estimado ?? ""} />
                </label>
                <label className={`${etiqueta} col-span-2 sm:col-span-1`}>
                    Entregado
                    <input className={campo} type="date" name="entregado" value={entregado} onChange={(e) => setEntregado(e.target.value)} />
                </label>
            </div>

            <label className={etiqueta}>
                URL del entregable
                <input className={campo} type="url" name="url_entregable" defaultValue={tarea.url_entregable ?? ""} placeholder="https://" />
            </label>

            <label className={etiqueta}>
                Notas
                <textarea className={`${campo} resize-y`} name="notas" defaultValue={tarea.notas ?? ""} rows={2} />
            </label>

            {resultado?.error && (
                <p className="text-sm text-destructive" role="alert">
                    {resultado.error}
                </p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={pendiente}
                    className="inline-flex items-center justify-center bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    {pendiente ? "Guardando…" : "Guardar"}
                </button>
                <Link
                    href={`/admin/tareas/${tarea.id}?volver=${encodeURIComponent(volver)}`}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                    Edición completa <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </form>
    )
}

export function EdicionRapida({
    tarea,
    responsables,
    hoy,
    volver,
    alCerrar,
}: {
    tarea: TareaFila | null
    responsables: { id: number; label: string }[]
    hoy: string
    volver: string
    alCerrar: () => void
}) {
    return (
        <Sheet open={!!tarea} onOpenChange={(abierto) => !abierto && alCerrar()}>
            <SheetContent side="right" className="gap-3 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md">
                <SheetHeader className="pb-0">
                    <SheetTitle className="pr-8 text-base font-medium">Edición rápida</SheetTitle>
                    <SheetDescription className="truncate text-xs">
                        {tarea ? [tarea.cliente, tarea.proyecto].filter(Boolean).join(" · ") : ""}
                    </SheetDescription>
                </SheetHeader>
                {/* key: al abrir otra tarea el formulario empieza limpio */}
                {tarea && <Formulario key={tarea.id} tarea={tarea} responsables={responsables} hoy={hoy} volver={volver} alCerrar={alCerrar} />}
            </SheetContent>
        </Sheet>
    )
}
