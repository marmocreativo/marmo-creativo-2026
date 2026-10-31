"use client"

import { useState } from "react"

// Texto visible pero recogido a 2 líneas; "Ver más" lo despliega.
export function TextoColapsable({ texto, className = "" }: { texto: string; className?: string }) {
    const [abierto, setAbierto] = useState(false)
    const largo = texto.length > 110 || texto.includes("\n")

    return (
        <div className={className}>
            <p className={`whitespace-pre-line break-words text-xs leading-relaxed text-muted-foreground ${abierto || !largo ? "" : "line-clamp-2"}`}>{texto}</p>
            {largo && (
                <button type="button" onClick={() => setAbierto((a) => !a)} aria-expanded={abierto} className="mt-0.5 text-xs text-foreground/70 underline underline-offset-2 hover:text-foreground">
                    {abierto ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    )
}
