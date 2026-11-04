"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Imagen = { id: number; archivo: string; ancho: number; alto: number; descripcion: string | null }

// Galería del artículo: cuadrícula de miniaturas que se amplían en un visor (flechas y Esc del teclado).
export function GaleriaBlog({ imagenes }: { imagenes: Imagen[] }) {
    const [abierta, setAbierta] = useState<number | null>(null)

    useEffect(() => {
        if (abierta === null) return
        const total = imagenes.length
        const tecla = (e: KeyboardEvent) => {
            if (e.key === "Escape") setAbierta(null)
            if (e.key === "ArrowRight") setAbierta((i) => (i === null ? i : (i + 1) % total))
            if (e.key === "ArrowLeft") setAbierta((i) => (i === null ? i : (i - 1 + total) % total))
        }
        document.addEventListener("keydown", tecla)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", tecla)
            document.body.style.overflow = ""
        }
    }, [abierta, imagenes.length])

    const actual = abierta !== null ? imagenes[abierta] : null

    return (
        <>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {imagenes.map((img, i) => (
                    <li key={img.id}>
                        <button
                            type="button"
                            onClick={() => setAbierta(i)}
                            aria-label={`Ampliar imagen ${i + 1}${img.descripcion ? `: ${img.descripcion}` : ""}`}
                            className="block w-full overflow-hidden rounded-xl border border-border bg-neutral-100"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.archivo}
                                alt={img.descripcion ?? ""}
                                width={img.ancho}
                                height={img.alto}
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {actual && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Galería de imágenes"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setAbierta(null)}
                >
                    <button type="button" aria-label="Cerrar" onClick={() => setAbierta(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
                        <X className="h-5 w-5" />
                    </button>
                    {imagenes.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Imagen anterior"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setAbierta((i) => (i === null ? i : (i - 1 + imagenes.length) % imagenes.length))
                                }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                type="button"
                                aria-label="Imagen siguiente"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setAbierta((i) => (i === null ? i : (i + 1) % imagenes.length))
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                    <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={actual.archivo} alt={actual.descripcion ?? ""} className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain" />
                        {actual.descripcion && <figcaption className="mt-3 text-center text-sm text-white/80">{actual.descripcion}</figcaption>}
                    </figure>
                </div>
            )}
        </>
    )
}
