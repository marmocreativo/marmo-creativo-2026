"use client"

import { useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { inputClass } from "@/components/auth/auth-shell"

// Buscador de los listados: escribe en la URL (?q=) con un pequeño retraso y conserva el resto de filtros.
export function Buscador({ placeholder = "Buscar…" }: { placeholder?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const actuales = useSearchParams()
    const [valor, setValor] = useState(actuales.get("q") ?? "")
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const ir = (texto: string) => {
        const q = new URLSearchParams(actuales.toString())
        if (texto.trim()) q.set("q", texto.trim())
        else q.delete("q")
        const qs = q.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    }

    const cambiar = (texto: string) => {
        setValor(texto)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => ir(texto), 300)
    }

    return (
        <form
            role="search"
            onSubmit={(e) => {
                e.preventDefault()
                clearTimeout(timer.current)
                ir(valor)
            }}
            className="relative w-full sm:w-72"
        >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                type="search"
                aria-label="Buscar"
                placeholder={placeholder}
                value={valor}
                onChange={(e) => cambiar(e.target.value)}
                maxLength={80}
                className={`${inputClass} !py-2 !pl-9 !pr-9 [&::-webkit-search-cancel-button]:hidden`}
            />
            {valor && (
                <button
                    type="button"
                    aria-label="Borrar búsqueda"
                    onClick={() => {
                        clearTimeout(timer.current)
                        setValor("")
                        ir("")
                    }}
                    className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </form>
    )
}
