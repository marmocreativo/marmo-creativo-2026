"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { guardarHistorial } from "@/lib/actions/herramientas"
import type { DatosHerramienta, Herramienta } from "@/lib/herramientas/esquemas"

// Guarda lo generado en el historial del usuario. Si no hay sesión, no hace nada.
export function useGuardarHistorial(herramienta: Herramienta, sesion: boolean) {
    const router = useRouter()
    const [mensaje, setMensaje] = useState<{ texto: string; error: boolean } | null>(null)
    const [pendiente, start] = useTransition()
    const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => () => void (temporizador.current && clearTimeout(temporizador.current)), [])

    const guardar = (datos: DatosHerramienta, logo?: Blob | null) => {
        if (!sesion) return
        start(async () => {
            const fd = new FormData()
            fd.set("herramienta", herramienta)
            fd.set("datos", JSON.stringify(datos))
            if (logo) fd.set("logo", new File([logo], "logo", { type: logo.type }))

            const r = await guardarHistorial(fd)
            setMensaje({
                texto: r.ok ? (r.guardado ? "Guardado en tu historial" : "Ya estaba en tu historial") : (r.error ?? "No se pudo guardar"),
                error: !r.ok,
            })
            if (r.ok && r.guardado) router.refresh()

            if (temporizador.current) clearTimeout(temporizador.current)
            temporizador.current = setTimeout(() => setMensaje(null), 3500)
        })
    }

    return { guardar, mensaje, pendiente }
}
