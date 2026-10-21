"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardPaste, X } from "lucide-react"

const ACEPTA = "image/jpeg,image/png,image/webp,image/gif,image/avif"

type Vista = { url: string; nombre: string }

// Input de archivo con pegado desde el portapapeles (Ctrl+V) y vista previa.
// Sigue siendo un <input type="file" name=...>, así el formulario lo envía igual que un archivo elegido.
export function SelectorImagen({
    name,
    multiple = false,
    required = false,
}: {
    name: string
    multiple?: boolean
    required?: boolean
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const activa = useRef({ hover: false, foco: false })
    const [vistas, setVistas] = useState<Vista[]>([])
    const urls = useRef<string[]>([])

    const liberar = () => {
        urls.current.forEach((u) => URL.revokeObjectURL(u))
        urls.current = []
    }

    const sincronizar = () => {
        liberar()
        const archivos = Array.from(inputRef.current?.files ?? [])
        urls.current = archivos.map((f) => URL.createObjectURL(f))
        setVistas(archivos.map((f, i) => ({ url: urls.current[i], nombre: f.name })))
    }

    useEffect(() => {
        const input = inputRef.current
        const form = input?.form

        const alPegar = (e: ClipboardEvent) => {
            // Solo el selector en el que estás (con el mouse encima o con el foco).
            if (!input || (!activa.current.hover && !activa.current.foco)) return
            const destino = e.target
            if ((destino instanceof HTMLInputElement && destino.type !== "file") || destino instanceof HTMLTextAreaElement) return

            const imagenes = Array.from(e.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"))
            if (imagenes.length === 0) return
            e.preventDefault()

            const dt = new DataTransfer()
            if (multiple) Array.from(input.files ?? []).forEach((f) => dt.items.add(f))
            ;(multiple ? imagenes : imagenes.slice(0, 1)).forEach((f) => dt.items.add(f))
            input.files = dt.files
            sincronizar()
        }

        // form.reset() (por ejemplo tras subir la galería) también limpia la vista previa.
        const alReiniciar = () => setTimeout(sincronizar, 0)

        document.addEventListener("paste", alPegar)
        form?.addEventListener("reset", alReiniciar)
        return () => {
            document.removeEventListener("paste", alPegar)
            form?.removeEventListener("reset", alReiniciar)
            liberar()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple])

    const limpiar = () => {
        if (inputRef.current) inputRef.current.value = ""
        sincronizar()
    }

    return (
        <div
            tabIndex={0}
            onMouseEnter={() => (activa.current.hover = true)}
            onMouseLeave={() => (activa.current.hover = false)}
            onFocus={() => (activa.current.foco = true)}
            onBlur={() => (activa.current.foco = false)}
            className="space-y-3 rounded-lg border border-dashed border-border p-3 text-sm outline-none transition-colors focus:border-foreground hover:border-foreground/60"
        >
            <div className="flex flex-wrap items-center gap-3">
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    multiple={multiple}
                    required={required}
                    accept={ACEPTA}
                    onChange={sincronizar}
                    className="text-sm file:mr-3 file:border file:border-border file:bg-white file:px-3 file:py-2 file:text-sm file:text-foreground hover:file:border-foreground"
                />
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ClipboardPaste className="w-4 h-4" /> o pega con Ctrl+V
                </span>
            </div>

            {vistas.length > 0 && (
                <div className="space-y-2">
                    <ul className="flex flex-wrap gap-2">
                        {vistas.map((v) => (
                            <li key={v.url}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={v.url} alt={v.nombre} title={v.nombre} className="h-20 w-20 rounded-md border border-border object-cover" />
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={limpiar} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <X className="w-3.5 h-3.5" /> Quitar {vistas.length > 1 ? "selección" : "imagen seleccionada"}
                    </button>
                </div>
            )}
        </div>
    )
}
