import { CircleAlert, Clock } from "lucide-react"
import { formato } from "@/lib/crm/semana"
import { urgencia, type NivelUrgencia } from "@/lib/crm/tareas-logica"

// Cuanto más cerca (o pasada) la fecha, más urgente el color. Solo aplica a lo que sigue abierto.
const PILDORA: Record<NivelUrgencia, string> = {
    vencida: "bg-red-50 text-red-700 ring-1 ring-red-200 font-medium",
    hoy: "bg-orange-50 text-orange-700 ring-1 ring-orange-200 font-medium",
    pronto: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    normal: "text-foreground",
    ninguna: "text-muted-foreground",
}

const corto = { day: "numeric", month: "short" } as const

export function FechaEstimada({
    estimado,
    entregado,
    estado,
    hoy,
}: {
    estimado: string | null
    entregado: string | null
    estado: string
    hoy: string
}) {
    if (!estimado && !entregado) return <span className="text-sm text-muted-foreground">—</span>

    const u = urgencia(estado, estimado, hoy)
    const Icono = u.nivel === "vencida" || u.nivel === "hoy" ? CircleAlert : u.nivel === "pronto" ? Clock : null

    return (
        <div className="text-sm leading-tight">
            {estimado && (
                <span className={`inline-flex items-center gap-1 rounded-md ${u.nivel === "normal" || u.nivel === "ninguna" ? "" : "px-1.5 py-0.5"} ${PILDORA[u.nivel]}`}>
                    {Icono && <Icono className="h-3.5 w-3.5" />}
                    {formato(estimado, corto)}
                </span>
            )}
            {u.texto && <span className={`mt-0.5 block text-xs ${u.nivel === "vencida" ? "text-red-600" : u.nivel === "hoy" ? "text-orange-600" : "text-amber-600"}`}>{u.texto}</span>}
            {entregado && <span className="mt-0.5 block text-xs text-muted-foreground">Entregada {formato(entregado, corto)}</span>}
        </div>
    )
}
