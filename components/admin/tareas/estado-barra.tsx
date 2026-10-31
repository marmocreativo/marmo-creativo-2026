"use client"

import { useState, useTransition } from "react"
import { ChevronDown } from "lucide-react"
import { cambiarEstado } from "@/lib/actions/admin"
import { ESTADOS_TAREA, PROGRESO } from "@/lib/crm/tareas-logica"

// El estado como barra de progreso; al tocarla se abre el selector y se cambia sin salir de la lista.
// El padre le pone `key={id + estado}` para que se reinicie cuando el servidor actualiza el dato.
export function EstadoBarra({ id, estado, className = "min-w-28" }: { id: number; estado: string; className?: string }) {
    const [actual, setActual] = useState(estado)
    const [error, setError] = useState(false)
    const [pendiente, startTransition] = useTransition()
    const p = PROGRESO[actual] ?? PROGRESO["Por Iniciar"]

    return (
        <div className={`group relative ${className} rounded-md ${pendiente ? "opacity-60" : ""} ${error ? "ring-2 ring-destructive" : "focus-within:ring-2 focus-within:ring-foreground/30"}`}>
            <div className="flex items-center justify-between gap-2 text-xs">
                <span className={`font-medium ${p.texto}`}>{actual}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground opacity-40 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-200" aria-hidden="true">
                <div className={`h-full rounded-full transition-all duration-300 ${p.barra}`} style={{ width: `${p.pct}%` }} />
            </div>
            <select
                aria-label="Cambiar estado de la tarea"
                value={actual}
                disabled={pendiente}
                title={error ? "No se pudo guardar" : "Cambiar estado"}
                onChange={(e) => {
                    const anterior = actual
                    const nuevo = e.target.value
                    setActual(nuevo)
                    setError(false)
                    startTransition(async () => {
                        const res = await cambiarEstado("tareas", id, "estado", nuevo)
                        if (!res.ok) {
                            setActual(anterior)
                            setError(true)
                        }
                    })
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            >
                {ESTADOS_TAREA.map((e) => (
                    <option key={e} value={e}>
                        {e}
                    </option>
                ))}
            </select>
        </div>
    )
}
