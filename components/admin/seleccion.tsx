"use client"

import { createContext, useContext, useEffect, useRef, useState, useTransition, type ReactNode } from "react"
import { Trash2 } from "lucide-react"
import { eliminarVarios } from "@/lib/actions/admin"

// Selección y borrado (individual o en lote) para las listas del admin.
// <Seleccion> envuelve la lista; <Casilla> y <BorrarFila> se colocan en cada fila o tarjeta.

type Pendiente = { ids: number[]; nombre?: string }

type Ctx = {
    sel: Set<number>
    bloqueados: number[]
    ocupado: boolean
    alternar: (id: number) => void
    pedir: (p: Pendiente) => void
}

const Contexto = createContext<Ctx | null>(null)

const botonPeligro =
    "inline-flex items-center gap-1.5 rounded-lg bg-destructive px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
const botonSecundario =
    "inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground disabled:opacity-60"

export function Seleccion({
    slug,
    ids,
    bloqueados = [],
    aviso,
    children,
}: {
    slug: string
    ids: number[]
    /** Ids que no se pueden borrar (por ejemplo, tu propia cuenta). */
    bloqueados?: number[]
    /** Consecuencia extra que se muestra al confirmar (ej. "También se borran sus proyectos"). */
    aviso?: string
    children: ReactNode
}) {
    const [sel, setSel] = useState<Set<number>>(new Set())
    const [pendiente, setPendiente] = useState<Pendiente | null>(null)
    const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null)
    const [ocupado, iniciar] = useTransition()

    const libres = ids.filter((id) => !bloqueados.includes(id))
    // Solo cuenta lo que sigue en pantalla (la búsqueda o un borrado pueden haber quitado filas).
    const elegidas = libres.filter((id) => sel.has(id))
    const todas = libres.length > 0 && elegidas.length === libres.length

    const alternar = (id: number) =>
        setSel((prev) => {
            const sig = new Set(prev)
            if (sig.has(id)) sig.delete(id)
            else sig.add(id)
            return sig
        })

    const confirmar = () => {
        if (!pendiente) return
        const lista = pendiente.ids
        iniciar(async () => {
            const r = await eliminarVarios(slug, lista)
            setPendiente(null)
            if (r.error) setMensaje({ tipo: "error", texto: r.error })
            else {
                setMensaje({ tipo: "ok", texto: r.ok ?? "Listo." })
                setSel((prev) => new Set([...prev].filter((id) => !lista.includes(id))))
            }
        })
    }

    return (
        <Contexto.Provider value={{ sel, bloqueados, ocupado, alternar, pedir: setPendiente }}>
            <div className="mb-4 flex min-h-12 flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border px-4 py-2 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2 text-foreground">
                    <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-foreground"
                        checked={todas}
                        disabled={libres.length === 0}
                        ref={(el) => {
                            if (el) el.indeterminate = elegidas.length > 0 && !todas
                        }}
                        onChange={() => setSel(todas ? new Set() : new Set(libres))}
                    />
                    Seleccionar todo
                </label>

                {elegidas.length > 0 ? (
                    <>
                        <span className="text-muted-foreground">
                            {elegidas.length} {elegidas.length === 1 ? "seleccionado" : "seleccionados"}
                        </span>
                        <button type="button" className={botonPeligro} onClick={() => setPendiente({ ids: elegidas })} disabled={ocupado}>
                            <Trash2 className="h-4 w-4" /> Eliminar seleccionados
                        </button>
                        <button type="button" className="text-muted-foreground underline underline-offset-4 hover:text-foreground" onClick={() => setSel(new Set())}>
                            Quitar selección
                        </button>
                    </>
                ) : (
                    !mensaje && <span className="text-muted-foreground">Marca varios para eliminarlos juntos.</span>
                )}

                {mensaje && (
                    <span role="status" className={`ml-auto ${mensaje.tipo === "ok" ? "text-emerald-700" : "text-destructive"}`}>
                        {mensaje.texto}
                    </span>
                )}
            </div>

            {children}

            {pendiente && <Confirmacion pendiente={pendiente} aviso={aviso} ocupado={ocupado} alConfirmar={confirmar} alCancelar={() => !ocupado && setPendiente(null)} />}
        </Contexto.Provider>
    )
}

function Confirmacion({
    pendiente,
    aviso,
    ocupado,
    alConfirmar,
    alCancelar,
}: {
    pendiente: Pendiente
    aviso?: string
    ocupado: boolean
    alConfirmar: () => void
    alCancelar: () => void
}) {
    const cancelar = useRef<HTMLButtonElement>(null)
    const n = pendiente.ids.length

    useEffect(() => {
        cancelar.current?.focus()
        const tecla = (e: KeyboardEvent) => e.key === "Escape" && alCancelar()
        window.addEventListener("keydown", tecla)
        return () => window.removeEventListener("keydown", tecla)
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={alCancelar}>
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirmar-titulo"
                className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="confirmar-titulo" className="text-xl font-light text-foreground">
                    {n === 1 ? (pendiente.nombre ? `¿Eliminar “${pendiente.nombre}”?` : "¿Eliminar este registro?") : `¿Eliminar ${n} registros?`}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Esta acción no se puede deshacer.{aviso ? ` ${aviso}` : ""}
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button ref={cancelar} type="button" className={botonSecundario} onClick={alCancelar} disabled={ocupado}>
                        Cancelar
                    </button>
                    <button type="button" className={botonPeligro} onClick={alConfirmar} disabled={ocupado}>
                        <Trash2 className="h-4 w-4" /> {ocupado ? "Eliminando…" : "Eliminar"}
                    </button>
                </div>
            </div>
        </div>
    )
}

/** Casilla de una fila o tarjeta. Dentro de una tarjeta se coloca en su esquina con `esquina`. */
export function Casilla({ id, nombre, esquina = false }: { id: number; nombre: string; esquina?: boolean }) {
    const ctx = useContext(Contexto)
    if (!ctx) return null
    const bloqueada = ctx.bloqueados.includes(id)
    return (
        <input
            type="checkbox"
            aria-label={`Seleccionar ${nombre}`}
            title={bloqueada ? "No puedes eliminar tu propia cuenta" : undefined}
            className={`h-4 w-4 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-40 ${esquina ? "absolute left-2 top-2" : ""}`}
            checked={ctx.sel.has(id) && !bloqueada}
            disabled={bloqueada}
            onChange={() => ctx.alternar(id)}
        />
    )
}

/** Botón "Eliminar" de una fila o tarjeta: abre la confirmación. */
export function BorrarFila({ id, nombre }: { id: number; nombre: string }) {
    const ctx = useContext(Contexto)
    if (!ctx || ctx.bloqueados.includes(id)) return null
    return (
        <button
            type="button"
            onClick={() => ctx.pedir({ ids: [id], nombre })}
            aria-label={`Eliminar ${nombre}`}
            className="inline-flex items-center gap-1 text-destructive underline-offset-4 hover:underline"
        >
            <Trash2 className="h-4 w-4" /> Eliminar
        </button>
    )
}
