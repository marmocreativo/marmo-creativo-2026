"use client"

import { useActionState } from "react"
import { guardarPerfil } from "@/lib/actions/auth"
import { SelectorImagen } from "@/components/forms/selector-imagen"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

export function PerfilForm({
    nombre,
    email,
    promos,
    conPassword,
    avatar,
}: {
    nombre: string
    email: string
    promos: boolean
    conPassword: boolean
    avatar: string | null
}) {
    const [estado, accion, pendiente] = useActionState(guardarPerfil, undefined)

    return (
        <form action={accion} className="space-y-4 max-w-md">
            <div className="space-y-2 text-sm text-muted-foreground">
                <span className="block">Foto de perfil</span>
                {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="" referrerPolicy="no-referrer" className="h-24 w-24 rounded-full border border-border object-cover" />
                ) : null}
                <SelectorImagen name="avatar" />
                {avatar ? (
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="avatar__quitar" /> Quitar foto actual
                    </label>
                ) : null}
                <span className="block text-xs">Se recorta a 500 × 500 px. Máximo 8 MB.</span>
            </div>
            <label className="block text-sm text-muted-foreground">
                Nombre
                <input className={`${inputClass} mt-1`} name="nombre" defaultValue={nombre} required />
            </label>
            <label className="block text-sm text-muted-foreground">
                Correo
                <input className={`${inputClass} mt-1 bg-muted`} value={email} disabled readOnly />
            </label>
            <label className="block text-sm text-muted-foreground">
                {conPassword ? "Nueva contraseña (opcional)" : "Crear contraseña (opcional, hoy entras con Google)"}
                <input className={`${inputClass} mt-1`} type="password" name="password" minLength={8} autoComplete="new-password" />
            </label>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" name="enviar_promociones" defaultChecked={promos} className="mt-0.5" />
                Quiero recibir promociones y novedades.
            </label>
            {estado?.error && <p className="text-sm text-destructive" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="text-sm text-primary" role="status">{estado.ok}</p>}
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Guardando…" : "Guardar cambios"}
            </button>
        </form>
    )
}
