"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const PASOS = [
    { slug: "briefing", titulo: "Briefing y contenido" },
    { slug: "seo", titulo: "SEO y branding" },
    { slug: "referencias", titulo: "Referencias" },
    { slug: "propuestas", titulo: "Propuestas" },
    { slug: "sitio", titulo: "Sitio completo" },
]

// Barra de pasos del wizard. Se puede saltar a cualquier paso: nada obliga a ir en orden.
export function Pasos({ idSitio }: { idSitio: number }) {
    const pathname = usePathname()
    return (
        <ol className="mb-10 flex flex-wrap gap-2">
            {PASOS.map((p, i) => {
                const href = `/panel/sitios/${idSitio}/${p.slug}`
                const activo = pathname === href
                return (
                    <li key={p.slug}>
                        <Link
                            href={href}
                            aria-current={activo ? "step" : undefined}
                            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                                activo ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                            }`}
                        >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${activo ? "bg-background text-foreground" : "bg-neutral-100"}`}>{i + 1}</span>
                            {p.titulo}
                        </Link>
                    </li>
                )
            })}
        </ol>
    )
}
