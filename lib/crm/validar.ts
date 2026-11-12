// Validación de campos del CRM, compartida por el admin (formularios) y el conector MCP (JSON).

import type { Campo } from "./recursos"

export const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const reFecha = /^\d{4}-\d{2}-\d{2}$/
export const reCarpeta = /^[a-z0-9]+(-[a-z0-9]+)*$/

// Devuelve el valor listo para la BD, o un mensaje de error.
// `raw` puede venir de un formulario (string, "on" en checkboxes) o de JSON (string, número, booleano).
export function validar(c: Campo, raw: unknown): { valor: string | number | null } | { error: string } {
    if (c.tipo === "checkbox") return { valor: raw === "on" || raw === true || raw === 1 || raw === "1" ? 1 : 0 }

    const s = typeof raw === "string" ? raw.trim() : typeof raw === "number" && Number.isFinite(raw) ? String(raw) : ""
    if (!s) return c.requerido ? { error: `${c.label} es obligatorio.` } : { valor: null }

    switch (c.tipo) {
        case "email":
            return reEmail.test(s) ? { valor: s.toLowerCase() } : { error: `${c.label} no es un correo válido.` }
        case "url":
            return /^https?:\/\//i.test(s) ? { valor: s } : { error: `${c.label} debe empezar con http:// o https://` }
        case "date":
            return reFecha.test(s) ? { valor: s } : { error: `${c.label} no es una fecha válida.` }
        case "number": {
            const n = Number(s)
            return Number.isFinite(n) && n >= 0 ? { valor: n } : { error: `${c.label} debe ser un número.` }
        }
        case "select":
            if (c.relacion) {
                const n = Number(s)
                return Number.isInteger(n) && n > 0 ? { valor: n } : { error: `Elige ${c.label.toLowerCase()}.` }
            }
            return c.opciones?.includes(s) ? { valor: s } : { error: `${c.label} no es válido.` }
        default:
            return { valor: s.slice(0, c.tipo === "html" ? 200000 : c.tipo === "textarea" ? 5000 : 500) }
    }
}
