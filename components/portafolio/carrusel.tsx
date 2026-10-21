"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ETIQUETAS_CATEGORIA } from "@/lib/portafolio-categorias"

type Item = { id: number; slug: string; titulo: string; categoria: string; imagen: string }

// Carrusel con las portadas de los proyectos de una (o varias) categorías.
// Se llena desde el navegador para que las páginas de servicio sigan siendo estáticas.
// Si no hay proyectos publicados, no pinta nada.
export function CarruselPortafolio({
    categoria,
    titulo = "Proyectos recientes",
    className = "",
}: {
    categoria: string | string[]
    titulo?: string
    className?: string
}) {
    const claves = (Array.isArray(categoria) ? categoria : [categoria]).join(",")
    const [items, setItems] = useState<Item[] | null>(null)
    const pista = useRef<HTMLDivElement>(null)
    const [limites, setLimites] = useState({ izq: false, der: false })

    useEffect(() => {
        let vivo = true
        fetch(`/api/portafolio?categoria=${encodeURIComponent(claves)}`)
            .then((r) => (r.ok ? r.json() : []))
            .then((d: Item[]) => vivo && setItems(d))
            .catch(() => vivo && setItems([]))
        return () => {
            vivo = false
        }
    }, [claves])

    const medir = () => {
        const el = pista.current
        if (!el) return
        setLimites({ izq: el.scrollLeft > 4, der: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
    }

    useEffect(() => {
        const el = pista.current
        if (!el) return
        const ro = new ResizeObserver(medir)
        ro.observe(el)
        medir()
        return () => ro.disconnect()
    }, [items])

    if (!items?.length) return null

    const mover = (dir: 1 | -1) => {
        const el = pista.current
        if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
    }

    const boton =
        "flex h-10 w-10 items-center justify-center border border-border bg-white text-foreground transition-colors hover:border-foreground disabled:opacity-30 disabled:hover:border-border"

    return (
        <div className={className}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-light text-foreground">{titulo}</h3>
                <div className="flex items-center gap-4">
                    <Link href="/portafolio" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Ver todo el portafolio <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="hidden sm:flex gap-2">
                        <button type="button" onClick={() => mover(-1)} disabled={!limites.izq} aria-label="Anterior" className={boton}>
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => mover(1)} disabled={!limites.der} aria-label="Siguiente" className={boton}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={pista}
                onScroll={medir}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
            >
                {items.map((it) => (
                    <Link
                        key={it.id}
                        href={`/portafolio/${it.slug}`}
                        className="group w-[280px] sm:w-[340px] shrink-0 snap-start"
                    >
                        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-neutral-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={it.imagen}
                                alt={it.titulo}
                                loading="lazy"
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        </div>
                        <p className="mt-3 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            {ETIQUETAS_CATEGORIA[it.categoria] ?? it.categoria}
                        </p>
                        <p className="mt-1 text-lg font-light text-foreground">{it.titulo}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
