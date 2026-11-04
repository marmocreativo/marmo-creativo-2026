import Link from "next/link"
import { ChevronRight, House } from "lucide-react"

export type Miga = { label: string; href?: string }

// Encabezado de cada pantalla del admin: ruta de navegación (breadcrumbs) + título + acciones a la derecha.
// La última miga es la pantalla actual (sin enlace); las anteriores llevan a su lista, con los filtros con que llegaste.
export function Encabezado({
    migas,
    titulo,
    descripcion,
    acciones,
}: {
    migas: Miga[]
    titulo: string
    descripcion?: string
    acciones?: React.ReactNode
}) {
    return (
        <header className="mb-5 border-b border-border pb-4">
            <nav aria-label="Ruta de navegación" className="mb-2">
                <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                    <li>
                        <Link href="/admin" aria-label="Resumen del administrador" className="inline-flex items-center rounded p-0.5 hover:text-foreground">
                            <House className="h-3.5 w-3.5" />
                        </Link>
                    </li>
                    {migas.map((m, i) => {
                        const actual = i === migas.length - 1
                        return (
                            <li key={`${m.label}-${i}`} className="flex min-w-0 items-center gap-1">
                                <ChevronRight className="h-3 w-3 shrink-0 opacity-60" aria-hidden />
                                {m.href && !actual ? (
                                    <Link href={m.href} className="truncate hover:text-foreground">
                                        {m.label}
                                    </Link>
                                ) : (
                                    <span aria-current={actual ? "page" : undefined} className={`max-w-[18rem] truncate ${actual ? "text-foreground" : ""}`}>
                                        {m.label}
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-xl font-medium text-foreground">{titulo}</h1>
                    {descripcion && <p className="mt-0.5 text-sm text-muted-foreground">{descripcion}</p>}
                </div>
                {acciones && <div className="flex shrink-0 items-center gap-2">{acciones}</div>}
            </div>
        </header>
    )
}
