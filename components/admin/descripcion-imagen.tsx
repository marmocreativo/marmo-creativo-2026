"use client"

import { useState, useTransition } from "react"
import { guardarDescripcionImagen } from "@/lib/actions/galeria-articulos"

// Texto alternativo de una imagen de la galería: se guarda al salir del campo.
export function DescripcionImagen({ idImagen, idArticulo, inicial }: { idImagen: number; idArticulo: number; inicial: string }) {
    const [texto, setTexto] = useState(inicial)
    const [guardado, setGuardado] = useState(inicial)
    const [pendiente, empezar] = useTransition()

    const guardar = () => {
        if (texto.trim() === guardado.trim()) return
        empezar(async () => {
            await guardarDescripcionImagen(idImagen, idArticulo, texto)
            setGuardado(texto)
        })
    }

    return (
        <input
            aria-label="Texto alternativo de la imagen"
            value={texto}
            maxLength={200}
            onChange={(e) => setTexto(e.target.value)}
            onBlur={guardar}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    e.currentTarget.blur()
                }
            }}
            placeholder="Descripción de la imagen"
            className={`mt-2 w-full border bg-white px-2 py-1.5 text-xs text-foreground focus:border-foreground focus:outline-none ${
                pendiente ? "border-border opacity-60" : "border-border"
            }`}
        />
    )
}
