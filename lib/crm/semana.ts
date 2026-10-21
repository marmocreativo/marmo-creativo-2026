// Fechas como "YYYY-MM-DD" con aritmética en UTC, para que la zona horaria no mueva los días.
const ZONA = "America/Mexico_City"
const DIA = 86_400_000

const aMs = (f: string) => {
    const [y, m, d] = f.split("-").map(Number)
    return Date.UTC(y, m - 1, d)
}
const deMs = (t: number) => new Date(t).toISOString().slice(0, 10)

export const hoyMX = () => new Date().toLocaleDateString("en-CA", { timeZone: ZONA })

export const esFecha = (s?: string): s is string => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && deMs(aMs(s)) === s

export const addDias = (f: string, n: number) => deMs(aMs(f) + n * DIA)

// La semana empieza en domingo.
export const domingoDe = (f: string) => addDias(f, -new Date(aMs(f)).getUTCDay())

export const semanaDe = (f: string) => {
    const d = domingoDe(f)
    return Array.from({ length: 7 }, (_, i) => addDias(d, i))
}

export const formato = (f: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(aMs(f)).toLocaleDateString("es-MX", { timeZone: "UTC", ...opts })

type ConFechas = { inicio?: string | number | null; estimado?: string | number | null; entregado?: string | number | null }

// Rango en el que una tarea "ocupa" días: de su inicio a su entrega (o estimado). Sin fechas: null.
export function rangoTarea(t: ConFechas): [string, string] | null {
    const ini = (t.inicio ?? t.estimado ?? t.entregado) as string | null
    if (!ini) return null
    const fin = ((t.entregado ?? t.estimado ?? t.inicio) as string | null) ?? ini
    return [ini, fin < ini ? ini : fin]
}
