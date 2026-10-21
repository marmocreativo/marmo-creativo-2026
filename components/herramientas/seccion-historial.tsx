import { History } from "lucide-react"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { Section } from "@/components/site/blocks"
import { vaciarHistorial } from "@/lib/actions/herramientas"
import type { Herramienta } from "@/lib/herramientas/esquemas"
import type { EntradaHistorial } from "@/lib/herramientas/historial"
import { HistorialLista } from "./historial-lista"

// "Tu historial" al pie de cada herramienta (solo con sesión iniciada).
export function SeccionHistorial({ herramienta, entradas }: { herramienta: Herramienta; entradas: EntradaHistorial[] }) {
    return (
        <Section bg="bg-white">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="flex items-center gap-3 text-3xl font-light text-foreground md:text-4xl">
                        <History className="h-7 w-7" /> Tu historial
                    </h2>
                    <p className="mt-2 text-muted-foreground">Guardamos tus últimas 50 creaciones. Elige una para usarla de nuevo.</p>
                </div>
                {entradas.length > 0 && (
                    <BotonEliminar
                        accion={vaciarHistorial.bind(null, herramienta)}
                        etiqueta="todo el historial de esta herramienta"
                        texto="Vaciar historial"
                    />
                )}
            </div>
            <HistorialLista entradas={entradas} />
        </Section>
    )
}
