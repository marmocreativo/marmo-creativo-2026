import type { LucideIcon } from "lucide-react"
import { Check } from "lucide-react"

export function EncabezadoHerramienta({
    icono: Icono,
    titulo,
    texto,
    puntos,
}: {
    icono: LucideIcon
    titulo: string
    texto: string
    puntos: string[]
}) {
    return (
        <section className="relative -mt-20 bg-black pb-14 pt-36 text-white md:pb-16 md:pt-44">
            <div className="mx-auto max-w-7xl px-6">
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/80 sm:mb-6 sm:text-sm">
                    <Icono className="h-4 w-4" /> Herramienta gratuita
                </p>
                <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">{titulo}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{texto}</p>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                    {puntos.map((p) => (
                        <li key={p} className="flex items-center gap-2">
                            <Check className="h-4 w-4" /> {p}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
