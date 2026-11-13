"use client"

import { useActionState } from "react"
import type { Estado } from "@/lib/actions/auth"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

type Accion = (prev: Estado, fd: FormData) => Promise<Estado>

export function NuevoSitio({ accion }: { accion: Accion }) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    return (
        <form action={enviar} className="flex max-w-xl flex-wrap items-end gap-4">
            <label className="block min-w-60 flex-1 text-sm text-muted-foreground">
                Nombre del sitio
                <input className={`${inputClass} mt-1`} name="nombre" required minLength={3} maxLength={150} placeholder="Ej. Clínica Dental Sonrisa" />
            </label>
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Creando…" : "Crear sitio"}
            </button>
            {estado?.error && <p className="w-full text-sm text-destructive" role="alert">{estado.error}</p>}
        </form>
    )
}

export function FormUrls({ accion, urls }: { accion: Accion; urls: string[] }) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    return (
        <form action={enviar} className="max-w-3xl space-y-4">
            <label className="block text-sm text-muted-foreground">
                Direcciones de sitios que te gustan
                <textarea className={`${inputClass} mt-1`} name="urls" rows={5} defaultValue={urls.join("\n")} placeholder={"https://ejemplo.com\nhttps://otro-sitio.com"} />
                <span className="mt-1 block text-xs">Una por línea, hasta 8. Con https://</span>
            </label>
            {estado?.error && <p className="text-sm text-destructive" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="text-sm text-primary" role="status">{estado.ok}</p>}
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Guardando…" : "Guardar direcciones"}
            </button>
        </form>
    )
}
