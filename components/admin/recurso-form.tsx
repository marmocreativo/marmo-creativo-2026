"use client"

import { useActionState } from "react"
import Link from "next/link"
import type { Campo } from "@/lib/crm/recursos"
import type { Estado } from "@/lib/actions/auth"
import { SelectorImagen } from "@/components/forms/selector-imagen"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

type Opciones = Partial<Record<string, { id: number; label: string }[]>>

export function RecursoForm({
    campos,
    valores,
    opciones,
    accion,
    cancelarHref,
}: {
    campos: Campo[]
    valores: Record<string, string | number | null>
    opciones: Opciones
    accion: (prev: Estado, fd: FormData) => Promise<Estado>
    cancelarHref: string
}) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)

    return (
        <form action={enviar} className="grid md:grid-cols-2 gap-5 max-w-3xl">
            {campos.map((c) => {
                const v = valores[c.name]
                const ancho = c.tipo === "textarea" ? "md:col-span-2" : ""

                if (c.tipo === "checkbox") {
                    return (
                        <label key={c.name} className={`flex items-center gap-2 text-sm ${ancho}`}>
                            <input type="checkbox" name={c.name} defaultChecked={v === undefined ? c.name === "activo" : !!v} />
                            <span>
                                {c.label}
                                {c.ayuda && <span className="block text-xs text-muted-foreground">{c.ayuda}</span>}
                            </span>
                        </label>
                    )
                }

                if (c.tipo === "imagen") {
                    return (
                        <div key={c.name} className="md:col-span-2 space-y-2 text-sm text-muted-foreground">
                            <span className="block">{c.label}</span>
                            {v ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={String(v)} alt="" referrerPolicy="no-referrer" className={`rounded-lg border border-border ${c.imagen?.modo === "maximo" ? "max-h-40 max-w-xs object-contain bg-neutral-50" : "h-24 w-24 object-cover"}`} />
                            ) : null}
                            <SelectorImagen name={c.name} />
                            {v ? (
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name={`${c.name}__quitar`} /> Quitar imagen actual
                                </label>
                            ) : null}
                            {c.ayuda && <span className="block text-xs">{c.ayuda}</span>}
                        </div>
                    )
                }

                return (
                    <label key={c.name} className={`block text-sm text-muted-foreground ${ancho}`}>
                        {c.label}
                        {c.requerido && c.tipo !== "password" && " *"}
                        {c.tipo === "textarea" ? (
                            <textarea className={`${inputClass} mt-1`} rows={4} name={c.name} defaultValue={v ?? ""} />
                        ) : c.tipo === "select" ? (
                            <select className={`${inputClass} mt-1`} name={c.name} defaultValue={v ?? ""} required={c.requerido}>
                                {(!c.requerido || c.relacion) && <option value="">{c.relacion ? "— Elegir —" : "—"}</option>}
                                {c.relacion
                                    ? (opciones[c.relacion] ?? []).map((o) => (
                                          <option key={o.id} value={o.id}>{o.label}</option>
                                      ))
                                    : c.opciones!.map((o) => (
                                          <option key={o} value={o}>{c.etiquetas?.[o] ?? o}</option>
                                      ))}
                            </select>
                        ) : (
                            <input
                                className={`${inputClass} mt-1`}
                                type={c.tipo}
                                step={c.tipo === "number" ? "0.01" : undefined}
                                min={c.tipo === "number" ? 0 : undefined}
                                name={c.name}
                                defaultValue={c.tipo === "password" ? "" : (v ?? "")}
                                required={c.requerido && c.tipo !== "password"}
                                autoComplete={c.tipo === "password" ? "new-password" : undefined}
                            />
                        )}
                        {c.ayuda && <span className="block mt-1 text-xs">{c.ayuda}</span>}
                    </label>
                )
            })}

            {estado?.error && <p className="md:col-span-2 text-sm text-destructive" role="alert">{estado.error}</p>}

            <div className="md:col-span-2 flex items-center gap-4">
                <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                    {pendiente ? "Guardando…" : "Guardar"}
                </button>
                <Link href={cancelarHref} className="text-sm text-muted-foreground hover:text-foreground">Cancelar</Link>
            </div>
        </form>
    )
}
