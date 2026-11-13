"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Estado } from "@/lib/actions/auth"
import type { Propuesta } from "@/lib/sitios/repo"
import { botonClass } from "@/components/auth/auth-shell"

// Las propuestas son HTML generado: se muestran en un iframe con sandbox y SIN allow-same-origin,
// así ese código no puede leer la sesión ni nada de esta aplicación.
const SANDBOX = "allow-scripts"

export function VistaPropuestas({
    idSitio,
    propuestas,
    elegida,
    elegir,
    siguienteHref,
}: {
    idSitio: number
    propuestas: Propuesta[]
    elegida: number | null
    elegir: (idSitio: number, numero: number) => Promise<Estado>
    siguienteHref: string
}) {
    const router = useRouter()
    const [grande, setGrande] = useState<Propuesta | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [pendiente, empezar] = useTransition()

    useEffect(() => {
        if (!grande) return
        const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setGrande(null)
        window.addEventListener("keydown", alTeclear)
        return () => window.removeEventListener("keydown", alTeclear)
    }, [grande])

    function elegirUna(p: Propuesta) {
        setError(null)
        empezar(async () => {
            const r = await elegir(idSitio, p.numero)
            if (r?.error) setError(r.error)
            else router.refresh()
        })
    }

    return (
        <div>
            <div className="grid gap-6 xl:grid-cols-3">
                {propuestas.map((p) => {
                    const activa = elegida === p.numero
                    return (
                        <article key={p.id} className={`rounded-xl border p-3 ${activa ? "border-foreground ring-1 ring-foreground" : "border-border"}`}>
                            <div className="mb-3 flex items-center justify-between gap-2 px-1">
                                <h4 className="text-sm font-medium text-foreground">{p.numero}. {p.nombre ?? `Propuesta ${p.numero}`}</h4>
                                {activa && <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">Elegida</span>}
                            </div>
                            <iframe title={`Propuesta ${p.numero}`} sandbox={SANDBOX} srcDoc={p.html} loading="lazy" className="h-[30rem] w-full rounded-md border border-border bg-white" />
                            <div className="mt-3 flex flex-wrap items-center gap-3 px-1">
                                <button type="button" onClick={() => elegirUna(p)} disabled={pendiente || activa} className={`${botonClass} sm:w-auto`}>
                                    {activa ? "Elegida" : "Elegir esta"}
                                </button>
                                <button type="button" onClick={() => setGrande(p)} className="text-sm underline underline-offset-4">Ver en grande</button>
                            </div>
                        </article>
                    )
                })}
            </div>

            {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
            {elegida && (
                <p className="mt-6 text-sm text-muted-foreground">
                    Propuesta {elegida} elegida. <a href={siguienteHref} className="underline underline-offset-4">Continuar al paso 5 para generar el sitio completo →</a>
                </p>
            )}

            {grande && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={`Propuesta ${grande.numero} en grande`}>
                    <div className="mb-3 flex items-center justify-between text-white">
                        <span className="text-sm">{grande.numero}. {grande.nombre ?? `Propuesta ${grande.numero}`}</span>
                        <button type="button" onClick={() => setGrande(null)} className="text-sm underline underline-offset-4">Cerrar (Esc)</button>
                    </div>
                    <iframe title={`Propuesta ${grande.numero} en grande`} sandbox={SANDBOX} srcDoc={grande.html} className="w-full flex-1 rounded-md bg-white" />
                </div>
            )}
        </div>
    )
}
