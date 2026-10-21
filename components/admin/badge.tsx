import { estiloEstado, estiloPorDefecto } from "@/lib/crm/estilos"

export const claseBadge = (valor: string) =>
    `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${estiloEstado[valor] ?? estiloPorDefecto}`

export function Badge({ valor, texto }: { valor: string; texto?: string }) {
    return <span className={claseBadge(valor)}>{texto ?? valor}</span>
}
