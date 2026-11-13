// Campos de los pasos del wizard (briefing, SEO y branding). Los usan el formulario y la validación del servidor.

export type CampoSitio = {
    name: string
    label: string
    tipo: "text" | "textarea" | "color" | "select" | "email"
    max: number
    requerido?: boolean
    ayuda?: string
    placeholder?: string
    opciones?: readonly string[]
}

export type Seccion = "briefing" | "seo" | "branding"

export const FUENTES = [
    "Inter", "Poppins", "Montserrat", "Raleway", "Nunito", "DM Sans", "Open Sans", "Roboto", "Work Sans", "Space Grotesk",
    "Playfair Display", "Lora", "Merriweather", "Cormorant Garamond",
] as const

export const TONOS = ["Profesional y cercano", "Formal y corporativo", "Amigable e informal", "Moderno y directo", "Elegante y sobrio"] as const

export const BRIEFING: CampoSitio[] = [
    { name: "empresa", label: "Nombre de la empresa o marca", tipo: "text", max: 150, requerido: true },
    { name: "giro", label: "¿A qué se dedica?", tipo: "text", max: 200, requerido: true, placeholder: "Ej. Clínica dental, despacho contable, taller mecánico…" },
    { name: "descripcion", label: "Cuéntanos del negocio", tipo: "textarea", max: 3000, requerido: true, ayuda: "Historia, qué hacen, desde cuándo, qué los distingue. Mientras más detalle, mejor sitio." },
    { name: "servicios", label: "Servicios o productos principales", tipo: "textarea", max: 2000, ayuda: "Uno por línea. Si quieres páginas de servicio (hasta 5), pon aquí los más importantes primero." },
    { name: "publico", label: "¿A quién le venden?", tipo: "textarea", max: 1000, ayuda: "Tipo de cliente ideal, edad, giro, zona." },
    { name: "valor", label: "¿Por qué elegirlos a ustedes?", tipo: "textarea", max: 1000, ayuda: "Diferenciales: garantía, rapidez, experiencia, precio, trato…" },
    { name: "tono", label: "Tono de comunicación", tipo: "select", max: 60, opciones: TONOS },
    { name: "ubicacion", label: "Ciudad / zona donde operan", tipo: "text", max: 150 },
    { name: "direccion", label: "Dirección", tipo: "text", max: 250 },
    { name: "telefono", label: "Teléfono", tipo: "text", max: 40 },
    { name: "whatsapp", label: "WhatsApp", tipo: "text", max: 40, ayuda: "Con lada, sin espacios. Ej. 5215512345678" },
    { name: "email", label: "Correo de contacto", tipo: "email", max: 190 },
    { name: "horario", label: "Horario de atención", tipo: "text", max: 150 },
    { name: "redes", label: "Redes sociales", tipo: "textarea", max: 600, ayuda: "Una por línea, con su dirección. Ej. https://instagram.com/mi-negocio" },
    { name: "notas", label: "Algo más que debamos saber", tipo: "textarea", max: 2000, ayuda: "Preferencias, cosas que NO quieren, promociones, certificaciones…" },
]

export const SEO: CampoSitio[] = [
    { name: "servicio", label: "Servicio principal", tipo: "text", max: 80, placeholder: "Ej. Diseño de sitios web" },
    { name: "valor_agregado", label: "Valor agregado", tipo: "text", max: 80, placeholder: "Ej. en 72 horas" },
    { name: "ubicacion", label: "Ubicación", tipo: "text", max: 80, placeholder: "Ej. CDMX" },
    { name: "palabra_clave", label: "Palabra clave para posicionamiento", tipo: "text", max: 150, requerido: true, ayuda: "Recomendado: servicio + valor agregado + ubicación. Ej. «diseño de sitios web en 72 horas CDMX»." },
    { name: "palabras_secundarias", label: "Palabras clave secundarias", tipo: "textarea", max: 600, ayuda: "Opcional. Una por línea o separadas por comas." },
    { name: "dominio", label: "Dominio del sitio", tipo: "text", max: 120, placeholder: "ejemplo.com", ayuda: "Opcional por ahora. Se usará para el sitemap y las etiquetas SEO." },
]

export const BRANDING: CampoSitio[] = [
    { name: "color_primario", label: "Color principal", tipo: "color", max: 7, requerido: true },
    { name: "color_secundario", label: "Color secundario", tipo: "color", max: 7, requerido: true },
    { name: "color_acento", label: "Color de acento (botones)", tipo: "color", max: 7, requerido: true },
    { name: "color_fondo", label: "Color de fondo", tipo: "color", max: 7, requerido: true },
    { name: "color_texto", label: "Color de texto", tipo: "color", max: 7, requerido: true },
    { name: "fuente_titulos", label: "Tipografía de títulos", tipo: "select", max: 40, opciones: FUENTES, requerido: true },
    { name: "fuente_texto", label: "Tipografía de texto", tipo: "select", max: 40, opciones: FUENTES, requerido: true },
]

export const SECCIONES: Record<Seccion, CampoSitio[]> = { briefing: BRIEFING, seo: SEO, branding: BRANDING }

export const BRANDING_INICIAL: Record<string, string> = {
    color_primario: "#1f2937",
    color_secundario: "#6b7280",
    color_acento: "#2563eb",
    color_fondo: "#ffffff",
    color_texto: "#111827",
    fuente_titulos: "Poppins",
    fuente_texto: "Inter",
}

const reColor = /^#[0-9a-f]{6}$/i
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const reDominio = /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/i

// Valida lo que llega del formulario contra la definición de campos. Devuelve los valores limpios o un error.
export function limpiarSeccion(seccion: Seccion, entrada: (nombre: string) => FormDataEntryValue | null): { valores: Record<string, string> } | { error: string } {
    const valores: Record<string, string> = {}
    for (const c of SECCIONES[seccion]) {
        const raw = entrada(c.name)
        let s = typeof raw === "string" ? raw.trim() : ""
        if (!s) {
            if (c.requerido) return { error: `${c.label} es obligatorio.` }
            continue
        }
        if (s.length > c.max) return { error: `${c.label} admite hasta ${c.max} caracteres.` }
        if (c.tipo === "color" && !reColor.test(s)) return { error: `${c.label} no es un color válido.` }
        if (c.tipo === "select" && !c.opciones?.includes(s)) return { error: `${c.label} no es válido.` }
        if (c.tipo === "email" && !reEmail.test(s)) return { error: `${c.label} no es un correo válido.` }
        if (c.name === "dominio") {
            s = s.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "")
            if (!reDominio.test(s)) return { error: "El dominio no es válido (ej. ejemplo.com)." }
        }
        valores[c.name] = s
    }
    return { valores }
}
