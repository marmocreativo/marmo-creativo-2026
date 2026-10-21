// Tipos y validación de lo que guarda el historial de cada herramienta.
// Sin imports de servidor: lo usan tanto el cliente (tipos) como las server actions (normalizar).

export const HERRAMIENTAS = ["qr", "whatsapp", "paleta"] as const
export type Herramienta = (typeof HERRAMIENTAS)[number]

export const INFO_HERRAMIENTA: Record<Herramienta, { nombre: string; ruta: string }> = {
    qr: { nombre: "Generador de QR", ruta: "/herramientas/generador-qr" },
    whatsapp: { nombre: "Botón de WhatsApp", ruta: "/herramientas/boton-whatsapp" },
    paleta: { nombre: "Paleta de colores", ruta: "/herramientas/paleta-colores" },
}

export const esHerramienta = (v: unknown): v is Herramienta => HERRAMIENTAS.includes(v as Herramienta)

// ---------------------------------------------------------------------------
// QR
// ---------------------------------------------------------------------------
export const TIPOS_QR = ["url", "text", "email", "phone", "wifi", "location"] as const
export type TipoQR = (typeof TIPOS_QR)[number]
export const NOMBRE_TIPO_QR: Record<TipoQR, string> = {
    url: "Sitio web",
    text: "Texto",
    email: "Email",
    phone: "Teléfono",
    wifi: "WiFi",
    location: "Ubicación",
}
export const SEGURIDAD_WIFI = ["WPA", "WEP", "nopass"] as const

export type DatosQR = {
    tipo: TipoQR
    contenido: string // vacío en WiFi
    color: string
    fondo: string
    tamanoLogo: number // 10 | 20 | 30
    wifi: { ssid: string; security: (typeof SEGURIDAD_WIFI)[number] } // la contraseña de la red NO se guarda
    logo?: string // ruta pública del logo guardado (la pone el servidor)
    logoHash?: string // para no guardar dos veces lo mismo (la pone el servidor)
}

// ---------------------------------------------------------------------------
// Botón de WhatsApp
// ---------------------------------------------------------------------------
export const FORMATOS_WHATSAPP = ["html", "bootstrap", "tailwind", "link"] as const
export const FORMAS_BOTON = ["4px", "8px", "25px", "50px"] as const
export const TAMANOS_BOTON = ["14px", "16px", "18px", "20px"] as const

export type DatosWhatsapp = {
    telefono: string
    mensaje: string
    textoBoton: string
    formato: (typeof FORMATOS_WHATSAPP)[number]
    estilo: { backgroundColor: string; textColor: string; borderRadius: string; fontSize: string }
}

// ---------------------------------------------------------------------------
// Paleta de colores
// ---------------------------------------------------------------------------
export const FUENTES_GOOGLE = [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins",
    "Source Sans Pro", "Nunito", "Raleway", "Ubuntu", "Playfair Display",
    "Merriweather", "Oswald", "Lora", "Fira Sans", "Work Sans",
]

export type HSL = { h: number; s: number; l: number }
export type DatosPaleta = { primary: HSL; secondary: HSL; accent: HSL; fuente: string }

// ---------------------------------------------------------------------------
// Normalización (servidor): acepta datos desconocidos y devuelve solo campos válidos, o null.
// ---------------------------------------------------------------------------
const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v)
const texto = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : null)
const hex = (v: unknown) => (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null)
const una = <T extends string | number>(v: unknown, lista: readonly T[]) => (lista.includes(v as T) ? (v as T) : null)
const entero = (v: unknown, min: number, max: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : null

export function normalizarQR(raw: unknown): DatosQR | null {
    if (!esObj(raw) || !esObj(raw.wifi)) return null
    const tipo = una(raw.tipo, TIPOS_QR)
    const contenido = texto(raw.contenido, 1000)
    const color = hex(raw.color)
    const fondo = hex(raw.fondo)
    const tamanoLogo = una(raw.tamanoLogo, [10, 20, 30] as const)
    const ssid = texto(raw.wifi.ssid, 64)
    const security = una(raw.wifi.security, SEGURIDAD_WIFI)
    if (!tipo || contenido === null || !color || !fondo || !tamanoLogo || ssid === null || !security) return null
    if (tipo === "wifi" ? !ssid.trim() : !contenido.trim()) return null
    return { tipo, contenido, color, fondo, tamanoLogo, wifi: { ssid, security } }
}

export function normalizarWhatsapp(raw: unknown): DatosWhatsapp | null {
    if (!esObj(raw) || !esObj(raw.estilo)) return null
    const telefono = texto(raw.telefono, 30)
    const mensaje = texto(raw.mensaje, 500)
    const textoBoton = texto(raw.textoBoton, 60)
    const formato = una(raw.formato, FORMATOS_WHATSAPP)
    const backgroundColor = hex(raw.estilo.backgroundColor)
    const textColor = hex(raw.estilo.textColor)
    const borderRadius = una(raw.estilo.borderRadius, FORMAS_BOTON)
    const fontSize = una(raw.estilo.fontSize, TAMANOS_BOTON)
    if (telefono === null || mensaje === null || textoBoton === null || !formato) return null
    if (!backgroundColor || !textColor || !borderRadius || !fontSize || !telefono.replace(/\D/g, "")) return null
    return { telefono, mensaje, textoBoton, formato, estilo: { backgroundColor, textColor, borderRadius, fontSize } }
}

const hsl = (v: unknown): HSL | null => {
    if (!esObj(v)) return null
    const h = entero(v.h, 0, 360)
    const s = entero(v.s, 0, 100)
    const l = entero(v.l, 0, 100)
    return h === null || s === null || l === null ? null : { h, s, l }
}

export function normalizarPaleta(raw: unknown): DatosPaleta | null {
    if (!esObj(raw)) return null
    const primary = hsl(raw.primary)
    const secondary = hsl(raw.secondary)
    const accent = hsl(raw.accent)
    const fuente = una(raw.fuente, FUENTES_GOOGLE)
    return primary && secondary && accent && fuente ? { primary, secondary, accent, fuente } : null
}

export type DatosHerramienta = DatosQR | DatosWhatsapp | DatosPaleta

export function hslAHex({ h, s, l }: HSL): string {
    const hh = h / 360, ss = s / 100, ll = l / 100
    const hue = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
    }
    let r: number, g: number, b: number
    if (ss === 0) r = g = b = ll
    else {
        const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
        const p = 2 * ll - q
        r = hue(p, q, hh + 1 / 3)
        g = hue(p, q, hh)
        b = hue(p, q, hh - 1 / 3)
    }
    const c = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0")
    return `#${c(r)}${c(g)}${c(b)}`
}

export function hexAHsl(hexColor: string): HSL {
    const r = parseInt(hexColor.slice(1, 3), 16) / 255
    const g = parseInt(hexColor.slice(3, 5), 16) / 255
    const b = parseInt(hexColor.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h /= 6
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export const hslACss = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`
