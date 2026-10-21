"use client"

import { useState, useTransition } from "react"
import { cambiarEstado } from "@/lib/actions/admin"
import { claseBadge } from "./badge"

// Dropdown con aspecto de badge: cambia el estado sin salir de la lista.
export function EstadoSelect({
    slug,
    id,
    campo,
    valor,
    opciones,
}: {
    slug: string
    id: number
    campo: string
    valor: string
    opciones: readonly string[]
}) {
    const [actual, setActual] = useState(valor)
    const [error, setError] = useState(false)
    const [pendiente, startTransition] = useTransition()

    return (
        <select
            aria-label="Cambiar estado"
            value={actual}
            disabled={pendiente}
            onChange={(e) => {
                const anterior = actual
                const nuevo = e.target.value
                setActual(nuevo)
                setError(false)
                startTransition(async () => {
                    const res = await cambiarEstado(slug, id, campo, nuevo)
                    if (!res.ok) {
                        setActual(anterior)
                        setError(true)
                    }
                })
            }}
            title={error ? "No se pudo guardar" : undefined}
            className={`${claseBadge(actual)} cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-foreground/30 disabled:opacity-60 ${error ? "ring-2 ring-destructive" : ""}`}
        >
            {opciones.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    )
}
