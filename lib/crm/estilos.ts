// Color de cada estado (badge). Los valores son únicos entre recursos.
export const estiloEstado: Record<string, string> = {
    "Por Iniciar": "bg-neutral-100 text-neutral-700 border-neutral-300",
    "En Proceso": "bg-blue-50 text-blue-700 border-blue-200",
    Entregado: "bg-green-50 text-green-700 border-green-200",
    Cancelado: "bg-red-50 text-red-700 border-red-200",
    Congelado: "bg-purple-50 text-purple-700 border-purple-200",
    Pendiente: "bg-yellow-50 text-yellow-800 border-yellow-200",
    Parcial: "bg-orange-50 text-orange-700 border-orange-200",
    Pagado: "bg-green-50 text-green-700 border-green-200",
    Vencido: "bg-red-50 text-red-700 border-red-200",
    Activo: "bg-green-50 text-green-700 border-green-200",
    Inactivo: "bg-neutral-100 text-neutral-500 border-neutral-300",
    Proyectos: "bg-blue-50 text-blue-700 border-blue-200",
    Iguala: "bg-green-50 text-green-700 border-green-200",
    admin: "bg-purple-50 text-purple-700 border-purple-200",
    usuario: "bg-neutral-100 text-neutral-700 border-neutral-300",
}

export const estiloPorDefecto = "bg-neutral-100 text-neutral-700 border-neutral-300"

// Opciones del filtro de estado en la lista de tareas.
export const OPCIONES_ESTADO = [
    { value: "abiertas", label: "Abiertas (por iniciar y en proceso)" },
    { value: "todas", label: "Todos los estados" },
    { value: "Por Iniciar", label: "Por Iniciar" },
    { value: "En Proceso", label: "En Proceso" },
    { value: "Entregado", label: "Entregado" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Congelado", label: "Congelado" },
]

// Campos con cambio rápido desde la lista: recurso -> campos.
export const camposRapidos: Record<string, string[]> = {
    proyectos: ["estado_entrega", "estado_pago"],
    tareas: ["estado"],
}
