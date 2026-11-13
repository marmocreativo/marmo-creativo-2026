"use client"

import { useActionState, useRef, useState } from "react"
import type { Estado } from "@/lib/actions/auth"
import type { CampoSitio } from "@/lib/sitios/campos"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

// Formulario genérico de los pasos 1 y 2 (briefing, SEO, branding), generado a partir de lib/sitios/campos.ts.
// Con `sugerirClave`, calcula la palabra clave recomendada: servicio + valor agregado + ubicación.
export function FormSeccion({
    campos,
    valores,
    accion,
    sugerirClave = false,
}: {
    campos: CampoSitio[]
    valores: Record<string, string>
    accion: (prev: Estado, fd: FormData) => Promise<Estado>
    sugerirClave?: boolean
}) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    const formRef = useRef<HTMLFormElement>(null)
    const [sugerencia, setSugerencia] = useState(() => componer(valores))

    const alEscribir = () => {
        if (!sugerirClave || !formRef.current) return
        const fd = new FormData(formRef.current)
        setSugerencia(componer(Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]))))
    }

    const usarSugerencia = () => {
        const campo = formRef.current?.elements.namedItem("palabra_clave")
        if (campo instanceof HTMLInputElement) campo.value = sugerencia
    }

    return (
        <form ref={formRef} action={enviar} onInput={alEscribir} className="grid max-w-3xl gap-5 md:grid-cols-2">
            {campos.map((c) => {
                const v = valores[c.name] ?? ""
                const ancho = c.tipo === "textarea" || c.name === "palabra_clave" ? "md:col-span-2" : ""
                return (
                    <label key={c.name} className={`block text-sm text-muted-foreground ${ancho}`}>
                        {c.label}
                        {c.requerido && " *"}
                        {c.tipo === "textarea" ? (
                            <textarea className={`${inputClass} mt-1`} rows={4} name={c.name} defaultValue={v} maxLength={c.max} placeholder={c.placeholder} />
                        ) : c.tipo === "select" ? (
                            <select className={`${inputClass} mt-1`} name={c.name} defaultValue={v} required={c.requerido}>
                                {!c.requerido && <option value="">—</option>}
                                {c.opciones!.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        ) : c.tipo === "color" ? (
                            <span className="mt-1 flex items-center gap-3">
                                <input type="color" name={c.name} defaultValue={v || "#000000"} className="h-11 w-16 cursor-pointer border border-border bg-white p-1" />
                                <span className="font-mono text-xs">{v}</span>
                            </span>
                        ) : (
                            <input className={`${inputClass} mt-1`} type={c.tipo} name={c.name} defaultValue={v} maxLength={c.max} placeholder={c.placeholder} required={c.requerido} />
                        )}
                        {c.ayuda && <span className="mt-1 block text-xs">{c.ayuda}</span>}
                        {sugerirClave && c.name === "palabra_clave" && sugerencia && (
                            <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                Sugerencia: <strong className="text-foreground">{sugerencia}</strong>
                                <button type="button" onClick={usarSugerencia} className="underline underline-offset-4">Usar</button>
                            </span>
                        )}
                    </label>
                )
            })}

            {estado?.error && <p className="text-sm text-destructive md:col-span-2" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="text-sm text-primary md:col-span-2" role="status">{estado.ok}</p>}

            <div className="md:col-span-2">
                <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                    {pendiente ? "Guardando…" : "Guardar"}
                </button>
            </div>
        </form>
    )
}

function componer(v: Record<string, string>) {
    return [v.servicio, v.valor_agregado, v.ubicacion].map((s) => (s ?? "").trim()).filter(Boolean).join(" ")
}
