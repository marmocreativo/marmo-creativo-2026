"use client"

import { useActionState, useEffect, useRef } from "react"
import type { Estado } from "@/lib/actions/auth"
import { SelectorImagen } from "@/components/forms/selector-imagen"
import { botonClass } from "@/components/auth/auth-shell"

export function SubirGaleria({ accion }: { accion: (prev: Estado, fd: FormData) => Promise<Estado> }) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    const formRef = useRef<HTMLFormElement>(null)

    // Limpia el selector cuando la subida termina bien.
    useEffect(() => {
        if (estado?.ok) formRef.current?.reset()
    }, [estado])

    return (
        <form ref={formRef} action={enviar} className="flex flex-wrap items-center gap-4">
            <SelectorImagen name="imagenes" multiple required />
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Subiendo…" : "Subir imágenes"}
            </button>
            {estado?.error && <p className="w-full text-sm text-destructive" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="w-full text-sm text-primary" role="status">{estado.ok}</p>}
        </form>
    )
}
