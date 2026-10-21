import Link from "next/link"
import { eliminarHistorial } from "@/lib/actions/herramientas"
import {
    hslACss,
    INFO_HERRAMIENTA,
    NOMBRE_TIPO_QR,
    type DatosPaleta,
    type DatosQR,
    type DatosWhatsapp,
    type Herramienta,
} from "@/lib/herramientas/esquemas"
import type { EntradaHistorial } from "@/lib/herramientas/historial"
import { BotonEliminar } from "@/components/admin/boton-eliminar"

const fecha = (v: string) =>
    new Date(v.replace(" ", "T") + "Z").toLocaleString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Mexico_City",
    })

function Vista({ e }: { e: EntradaHistorial }) {
    if (e.herramienta === "paleta") {
        const d = e.datos as DatosPaleta
        return (
            <div className="flex overflow-hidden rounded-md border border-border">
                {[d.primary, d.secondary, d.accent].map((c, i) => (
                    <span key={i} className="h-10 flex-1" style={{ backgroundColor: hslACss(c) }} />
                ))}
            </div>
        )
    }
    if (e.herramienta === "whatsapp") {
        const d = e.datos as DatosWhatsapp
        return (
            <span
                className="inline-block max-w-full truncate px-4 py-2 text-xs font-bold text-white"
                style={{ backgroundColor: d.estilo.backgroundColor, color: d.estilo.textColor, borderRadius: d.estilo.borderRadius }}
            >
                {d.textoBoton}
            </span>
        )
    }
    const d = e.datos as DatosQR
    return (
        <div className="flex items-center gap-3">
            <span className="h-10 w-10 shrink-0 border border-border" style={{ backgroundColor: d.fondo }}>
                <span className="m-2 block h-6 w-6" style={{ backgroundColor: d.color }} />
            </span>
            <span className="text-xs text-muted-foreground">{NOMBRE_TIPO_QR[d.tipo]}</span>
        </div>
    )
}

// Lista del historial. Cada entrada se abre en su herramienta con ?h=<id> para reutilizarla.
export function HistorialLista({
    entradas,
    mostrarHerramienta = false,
}: {
    entradas: EntradaHistorial[]
    mostrarHerramienta?: boolean
}) {
    if (entradas.length === 0) {
        return <p className="text-muted-foreground">Aún no hay nada en tu historial.</p>
    }

    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entradas.map((e) => (
                <li key={e.id} className="flex flex-col rounded-xl border border-border bg-white p-5">
                    {mostrarHerramienta && (
                        <p className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {INFO_HERRAMIENTA[e.herramienta as Herramienta].nombre}
                        </p>
                    )}
                    <p className="truncate text-sm text-foreground" title={e.titulo}>{e.titulo}</p>
                    <p className="mb-4 text-xs text-muted-foreground">{fecha(e.created_at)}</p>
                    <div className="mb-4 flex-1">
                        <Vista e={e} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <Link
                            href={`${INFO_HERRAMIENTA[e.herramienta as Herramienta].ruta}?h=${e.id}`}
                            className="text-foreground underline underline-offset-4"
                        >
                            Usar de nuevo
                        </Link>
                        <BotonEliminar accion={eliminarHistorial.bind(null, e.id)} etiqueta="esta entrada del historial" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
