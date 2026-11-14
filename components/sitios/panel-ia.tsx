"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Estado } from "@/lib/actions/auth"
import type { OpcionProveedor, Proveedor } from "@/lib/ia/texto"
import type { Tarea } from "@/lib/sitios/tareas"
import { botonClass } from "@/components/auth/auth-shell"
import { SelectorProveedor, useProveedorIA } from "./proveedor-ia"

type Props = {
    idSitio: number
    tipo: Tarea["tipo"]
    etiqueta: string
    etiquetaOtra?: string // texto del botón cuando ya hay resultado ("Volver a generar")
    hayResultado?: boolean
    confirmar?: string // si se pasa, se pide confirmación antes de lanzar
    iniciar: (idSitio: number, proveedor: Proveedor) => Promise<Estado>
    proveedores: OpcionProveedor[]
    defecto: Proveedor
    consultar: (idSitio: number) => Promise<Tarea | null>
    inicial: Tarea | null
    bloqueo?: string | null // motivo por el que no se puede lanzar todavía
}

const dinero = (n: number) => `US$${n.toFixed(2)}`

// Botón que lanza una generación con IA y muestra su avance. La generación corre en el servidor en segundo plano;
// aquí se consulta cada 3 segundos y, al terminar, se recarga la página con el resultado.
export function PanelIA({ idSitio, tipo, etiqueta, etiquetaOtra, hayResultado, confirmar, iniciar, consultar, inicial, bloqueo, proveedores, defecto }: Props) {
    const router = useRouter()
    const [tarea, setTarea] = useState<Tarea | null>(inicial)
    const [error, setError] = useState<string | null>(null)
    const [enviando, empezar] = useTransition()
    const [proveedor, cambiarProveedor] = useProveedorIA(proveedores, defecto)
    const corriendo = tarea?.estado === "ejecutando"

    useEffect(() => {
        if (!corriendo) return
        const t = setInterval(async () => {
            try {
                const nueva = await consultar(idSitio)
                if (nueva) setTarea(nueva)
                if (nueva && nueva.estado !== "ejecutando") router.refresh()
            } catch {
                // un fallo de red no detiene la generación: se vuelve a consultar en el siguiente ciclo
            }
        }, 3000)
        return () => clearInterval(t)
    }, [corriendo, idSitio, consultar, router])

    function lanzar() {
        if (confirmar && !confirm(confirmar)) return
        setError(null)
        empezar(async () => {
            const r = await iniciar(idSitio, proveedor)
            if (r?.error) return setError(r.error)
            const t = await consultar(idSitio)
            setTarea(t ?? { id: 0, tipo, estado: "ejecutando", progreso: "Preparando…", error: null, tokens_entrada: 0, tokens_salida: 0, costo_usd: null })
        })
    }

    const propia = tarea && tarea.tipo === tipo ? tarea : null
    const deshabilitado = enviando || corriendo || !!bloqueo

    return (
        <div className="rounded-xl border border-border p-6">
            <div className="mb-4">
                <SelectorProveedor opciones={proveedores} valor={proveedor} onChange={cambiarProveedor} deshabilitado={corriendo} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <button type="button" onClick={lanzar} disabled={deshabilitado} className={`${botonClass} sm:w-auto`}>
                    {corriendo ? "Generando…" : hayResultado ? (etiquetaOtra ?? etiqueta) : etiqueta}
                </button>
                {bloqueo && <p className="text-sm text-muted-foreground">{bloqueo}</p>}
            </div>

            {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}

            {corriendo && (
                <div className="mt-4" role="status" aria-live="polite">
                    <p className="flex items-center gap-2 text-sm text-foreground">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
                        {tarea?.progreso ?? "Generando…"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Puedes salir de esta pantalla: la generación sigue en el servidor. Suele tardar de 2 a 6 minutos.</p>
                </div>
            )}

            {!corriendo && propia?.estado === "error" && propia.error && <p className="mt-4 text-sm text-destructive" role="alert">{propia.error}</p>}
            {!corriendo && propia && propia.estado !== "ejecutando" && propia.tokens_entrada + propia.tokens_salida > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                    Última generación: {(propia.tokens_entrada + propia.tokens_salida).toLocaleString("es-MX")} tokens
                    {propia.costo_usd !== null ? ` · costo estimado ${dinero(propia.costo_usd)}` : " · costo no estimado (Gemini)"}
                </p>
            )}
        </div>
    )
}
