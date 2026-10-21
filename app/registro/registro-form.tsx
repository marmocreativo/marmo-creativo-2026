"use client"

import { useActionState } from "react"
import { registrar } from "@/lib/actions/auth"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

export function RegistroForm({ callbackUrl }: { callbackUrl: string }) {
    const [estado, accion, pendiente] = useActionState(registrar, undefined)

    return (
        <form action={accion} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <input className={inputClass} name="nombre" placeholder="Tu nombre" aria-label="Nombre" required autoComplete="name" />
            <input className={inputClass} type="email" name="email" placeholder="Tu correo" aria-label="Correo" required autoComplete="email" />
            <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputClass} type="password" name="password" placeholder="Contraseña" aria-label="Contraseña" minLength={8} required autoComplete="new-password" />
                <input className={inputClass} type="password" name="confirmar" placeholder="Repite la contraseña" aria-label="Repite la contraseña" minLength={8} required autoComplete="new-password" />
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" name="enviar_promociones" className="mt-0.5" />
                Quiero recibir promociones y novedades de Marmo Creativo.
            </label>
            {estado?.error && <p className="text-sm text-destructive" role="alert">{estado.error}</p>}
            <button type="submit" disabled={pendiente} className={botonClass}>
                {pendiente ? "Creando cuenta…" : "Crear cuenta"}
            </button>
        </form>
    )
}
