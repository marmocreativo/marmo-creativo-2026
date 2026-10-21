"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { inputClass } from "@/components/auth/auth-shell"
import { OPCIONES_ESTADO } from "@/lib/crm/estilos"

type Op = { id: number; label: string }
type OpProyecto = Op & { id_cliente: number }

export function Filtros({
    clientes,
    proyectos,
    estado,
    idCliente,
    idProyecto,
}: {
    clientes: Op[]
    proyectos?: OpProyecto[] // si viene, se muestra el filtro por proyecto
    estado?: string // si viene, se muestra el filtro por estado (valor efectivo)
    idCliente?: number
    idProyecto?: number
}) {
    const router = useRouter()
    const pathname = usePathname()
    const actuales = useSearchParams()

    // Cambia algunos parámetros y conserva el resto (vista, semana, etc.).
    const ir = (cambios: Record<string, string | undefined>) => {
        const q = new URLSearchParams(actuales.toString())
        for (const [k, v] of Object.entries(cambios)) {
            if (v) q.set(k, v)
            else q.delete(k)
        }
        const qs = q.toString()
        router.push(qs ? `${pathname}?${qs}` : pathname)
    }

    const limpiar = new URLSearchParams(actuales.toString())
    for (const k of ["id_cliente", "id_proyecto", "estado"]) limpiar.delete(k)
    const limpiarHref = limpiar.toString() ? `${pathname}?${limpiar}` : pathname

    const proyectosVisibles = proyectos?.filter((p) => !idCliente || p.id_cliente === idCliente)
    const hayFiltro = !!idCliente || !!idProyecto || actuales.has("estado")

    return (
        <div className="flex flex-wrap items-center gap-3">
            <select
                aria-label="Filtrar por cliente"
                className={`${inputClass} !w-auto min-w-52`}
                value={idCliente ?? ""}
                onChange={(e) => ir({ id_cliente: e.target.value || undefined, id_proyecto: undefined })}
            >
                <option value="">Todos los clientes</option>
                {clientes.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                ))}
            </select>

            {proyectosVisibles && (
                <select
                    aria-label="Filtrar por proyecto"
                    className={`${inputClass} !w-auto min-w-60`}
                    value={idProyecto ?? ""}
                    onChange={(e) => ir({ id_proyecto: e.target.value || undefined })}
                >
                    <option value="">Todos los proyectos</option>
                    {proyectosVisibles.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                </select>
            )}

            {estado && (
                <select
                    aria-label="Filtrar por estado"
                    className={`${inputClass} !w-auto min-w-52`}
                    value={estado}
                    onChange={(e) => ir({ estado: e.target.value })}
                >
                    {OPCIONES_ESTADO.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            )}

            {hayFiltro && (
                <Link href={limpiarHref} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Quitar filtros
                </Link>
            )}
        </div>
    )
}
