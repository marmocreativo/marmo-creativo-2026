// Reglas de las vistas de tareas. Todo es puro (sin servidor ni navegador) para poder probarlo.
import { diasEntre } from "./semana"

export const ESTADOS_TAREA = ["Por Iniciar", "En Proceso", "Entregado", "Cancelado", "Congelado"] as const
export const ABIERTAS: readonly string[] = ["Por Iniciar", "En Proceso"]

export type TareaFila = {
    id: number
    titulo: string
    descripcion: string | null
    estado: string
    inicio: string | null
    estimado: string | null
    entregado: string | null
    id_proyecto: number
    proyecto: string | null
    id_cliente: number | null
    cliente: string | null
    id_responsable: number | null
    responsable: string | null
    responsable_avatar: string | null
    url_entregable: string | null
    notas: string | null
}

type Cruda = Record<string, string | number | null | undefined>
const txt = (v: unknown) => (v === null || v === undefined || v === "" ? null : String(v))
const num = (v: unknown) => (v === null || v === undefined || v === "" ? null : Number(v))

// Fila del repositorio (con sus columnas "__label") -> forma sencilla que viaja al navegador.
export function aTarea(f: Cruda): TareaFila {
    return {
        id: Number(f.id),
        titulo: String(f.titulo ?? ""),
        descripcion: txt(f.descripcion),
        estado: String(f.estado ?? "Por Iniciar"),
        inicio: txt(f.inicio),
        estimado: txt(f.estimado),
        entregado: txt(f.entregado),
        id_proyecto: Number(f.id_proyecto),
        proyecto: txt(f.id_proyecto__label),
        id_cliente: num(f.cliente_id),
        cliente: txt(f.cliente__label),
        id_responsable: num(f.id_responsable),
        responsable: txt(f.id_responsable__label),
        responsable_avatar: txt(f.responsable_avatar),
        url_entregable: txt(f.url_entregable),
        notas: txt(f.notas),
    }
}

// ---------------------------------------------------------------------------
// Estado como barra de progreso
// ---------------------------------------------------------------------------
export const PROGRESO: Record<string, { pct: number; barra: string; texto: string }> = {
    "Por Iniciar": { pct: 8, barra: "bg-neutral-400", texto: "text-neutral-600" },
    "En Proceso": { pct: 50, barra: "bg-blue-500", texto: "text-blue-700" },
    Entregado: { pct: 100, barra: "bg-green-500", texto: "text-green-700" },
    Cancelado: { pct: 100, barra: "bg-red-400", texto: "text-red-700" },
    Congelado: { pct: 50, barra: "bg-purple-400", texto: "text-purple-700" },
}

// ---------------------------------------------------------------------------
// Urgencia de la fecha estimada (solo para lo que sigue abierto)
// ---------------------------------------------------------------------------
export type NivelUrgencia = "vencida" | "hoy" | "pronto" | "normal" | "ninguna"

export function urgencia(estado: string, estimado: string | null, hoy: string): { nivel: NivelUrgencia; texto: string } {
    if (!estimado || !ABIERTAS.includes(estado)) return { nivel: "ninguna", texto: "" }
    const dias = diasEntre(hoy, estimado)
    if (dias < 0) return { nivel: "vencida", texto: dias === -1 ? "Vencida ayer" : `Vencida hace ${-dias} días` }
    if (dias === 0) return { nivel: "hoy", texto: "Vence hoy" }
    if (dias === 1) return { nivel: "pronto", texto: "Vence mañana" }
    if (dias <= 3) return { nivel: "pronto", texto: `Vence en ${dias} días` }
    return { nivel: "normal", texto: "" }
}

export const ESTILO_URGENCIA: Record<NivelUrgencia, string> = {
    vencida: "text-red-600 font-medium",
    hoy: "text-orange-600 font-medium",
    pronto: "text-amber-600",
    normal: "text-muted-foreground",
    ninguna: "text-muted-foreground",
}

// ---------------------------------------------------------------------------
// "Por hacer hoy": atrasadas, luego las de hoy y luego las que van en tiempo
// ---------------------------------------------------------------------------
export type GruposHoy = {
    atrasadas: TareaFila[]
    deHoy: TareaFila[]
    enTiempo: TareaFila[]
    sinFecha: TareaFila[]
}

const porFecha = (a: TareaFila, b: TareaFila) => (a.estimado ?? "").localeCompare(b.estimado ?? "") || a.titulo.localeCompare(b.titulo, "es")

export function agruparHoy(filas: TareaFila[], hoy: string): GruposHoy {
    // Solo lo abierto, y sin lo que aún no toca empezar (inicio futuro).
    const vigentes = filas.filter((t) => ABIERTAS.includes(t.estado) && !(t.inicio && t.inicio > hoy && (!t.estimado || t.estimado > hoy)))
    return {
        atrasadas: vigentes.filter((t) => t.estimado && t.estimado < hoy).sort(porFecha),
        deHoy: vigentes.filter((t) => t.estimado === hoy).sort(porFecha),
        enTiempo: vigentes.filter((t) => t.estimado && t.estimado > hoy).sort(porFecha),
        sinFecha: vigentes.filter((t) => !t.estimado).sort((a, b) => a.titulo.localeCompare(b.titulo, "es")),
    }
}
