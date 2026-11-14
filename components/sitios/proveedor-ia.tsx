"use client"

import { useSyncExternalStore } from "react"
import type { OpcionProveedor, Proveedor } from "@/lib/ia/texto"

const LLAVE = "sitios-proveedor-ia"
const oyentes = new Set<() => void>()

function suscribir(avisar: () => void) {
    oyentes.add(avisar)
    window.addEventListener("storage", avisar)
    return () => {
        oyentes.delete(avisar)
        window.removeEventListener("storage", avisar)
    }
}

function leer(): string | null {
    try {
        return localStorage.getItem(LLAVE)
    } catch {
        return null // sin almacenamiento (modo privado, etc.): se usa el valor por defecto
    }
}

// El proveedor elegido se recuerda en este navegador y se comparte entre todos los botones de IA de la pantalla.
// useSyncExternalStore evita desajustes entre el servidor (que solo conoce el valor por defecto) y el navegador.
export function useProveedorIA(opciones: OpcionProveedor[], defecto: Proveedor): [Proveedor, (p: Proveedor) => void] {
    const guardado = useSyncExternalStore(suscribir, leer, () => null)
    const valido = opciones.find((o) => o.id === guardado && o.disponible)
    const valor = (valido?.id ?? defecto) as Proveedor

    function cambiar(p: Proveedor) {
        try {
            localStorage.setItem(LLAVE, p)
        } catch {
            // no se pudo recordar: el cambio igual aplica a esta pantalla
        }
        oyentes.forEach((f) => f())
    }
    return [valor, cambiar]
}

export function SelectorProveedor({
    opciones,
    valor,
    onChange,
    deshabilitado,
}: {
    opciones: OpcionProveedor[]
    valor: Proveedor
    onChange: (p: Proveedor) => void
    deshabilitado?: boolean
}) {
    return (
        <label className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Generar con</span>
            <select
                value={valor}
                onChange={(e) => onChange(e.target.value as Proveedor)}
                disabled={deshabilitado}
                className="border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-foreground disabled:opacity-50"
            >
                {opciones.map((o) => (
                    <option key={o.id} value={o.id} disabled={!o.disponible}>
                        {o.nombre}
                        {o.disponible ? "" : " — sin configurar"}
                    </option>
                ))}
            </select>
        </label>
    )
}
