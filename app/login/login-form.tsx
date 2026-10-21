"use client"

import { useActionState } from "react"
import { iniciarSesion } from "@/lib/actions/auth"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
    const [estado, accion, pendiente] = useActionState(iniciarSesion, undefined)

    return (
        <form action={accion} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <input className={inputClass} type="email" name="email" placeholder="Tu correo" aria-label="Correo" required autoComplete="email" />
            <input className={inputClass} type="password" name="password" placeholder="Tu contraseña" aria-label="Contraseña" required autoComplete="current-password" />
            {estado?.error && <p className="text-sm text-destructive" role="alert">{estado.error}</p>}
            <button type="submit" disabled={pendiente} className={botonClass}>
                {pendiente ? "Entrando…" : "Iniciar sesión"}
            </button>
        </form>
    )
}
