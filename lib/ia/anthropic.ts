// Cliente de Claude (Anthropic) para el creador de sitios. Todo lo que habla con Anthropic vive aquí.
//
// · Los modelos se configuran por entorno: ANTHROPIC_MODELO_GENERAR (propuestas y sitio, calidad) y
//   ANTHROPIC_MODELO_EDITAR (análisis y ediciones por prompt, más barato).
// · Se usa streaming (las respuestas de HTML son largas) y el fallback del servidor ante rechazos de seguridad.
// · El SDK lee ANTHROPIC_API_KEY y, solo para pruebas locales con un servidor simulado, ANTHROPIC_BASE_URL.

import Anthropic from "@anthropic-ai/sdk"

export class ErrorAnthropic extends Error {}

export const anthropicConfigurada = () => !!process.env.ANTHROPIC_API_KEY?.trim()
export const modeloGenerar = () => process.env.ANTHROPIC_MODELO_GENERAR?.trim() || "claude-opus-5-5"
export const modeloEditar = () => process.env.ANTHROPIC_MODELO_EDITAR?.trim() || "claude-sonnet-5-5"

// USD por millón de tokens (entrada, salida). Solo para estimar el costo en pantalla.
const PRECIOS: Record<string, [number, number]> = {
    "claude-opus-5-5": [4, 20],
    "claude-opus-5": [5, 25],
    "claude-sonnet-5-5": [2, 10],
    "claude-sonnet-5": [2, 10],
    "claude-haiku-5-5": [0.1, 0.5],
}

export type Uso = { entrada: number; salida: number; costo: number }
export const usoVacio = (): Uso => ({ entrada: 0, salida: 0, costo: 0 })

function sumar(uso: Uso, modelo: string, entrada: number, salida: number) {
    uso.entrada += entrada
    uso.salida += salida
    const p = PRECIOS[modelo]
    if (p) uso.costo += (entrada * p[0] + salida * p[1]) / 1_000_000
}

let cliente: Anthropic | null = null
function getCliente(): Anthropic {
    if (!anthropicConfigurada()) {
        throw new ErrorAnthropic("Falta configurar ANTHROPIC_API_KEY en el servidor (.env.local en local, variables de entorno en Dokploy).")
    }
    return (cliente ??= new Anthropic({ maxRetries: 2, timeout: 10 * 60_000 }))
}

export type Bloque = Anthropic.Beta.BetaContentBlockParam
export type Herramienta = Anthropic.Beta.BetaToolUnion

function mensajeDe(e: unknown): string {
    if (e instanceof ErrorAnthropic) return e.message
    if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) {
        return "Anthropic rechazó la API key (inválida o sin permiso). Revisa ANTHROPIC_API_KEY."
    }
    if (e instanceof Anthropic.RateLimitError) return "Se alcanzó el límite de uso de Anthropic. Espera un momento e inténtalo de nuevo."
    if (e instanceof Anthropic.NotFoundError) return `Anthropic no encontró el modelo solicitado. Revisa ANTHROPIC_MODELO_GENERAR / ANTHROPIC_MODELO_EDITAR. (${e.message})`
    if (e instanceof Anthropic.BadRequestError) return `Anthropic rechazó la solicitud: ${e.message}`
    if (e instanceof Anthropic.APIConnectionTimeoutError) return "Anthropic tardó demasiado en responder. Inténtalo de nuevo."
    if (e instanceof Anthropic.APIConnectionError) return "No se pudo conectar con Anthropic."
    if (e instanceof Anthropic.APIError) return e.status && e.status >= 500 ? "Anthropic no está respondiendo ahora mismo. Inténtalo en unos minutos." : `Error de Anthropic: ${e.message}`
    console.error("[anthropic]", e)
    return "Ocurrió un error inesperado al generar con IA."
}

type Peticion = {
    modelo: string
    sistema: string
    contenido: Bloque[]
    maxTokens: number
    effort?: "low" | "medium" | "high"
    herramientas?: Herramienta[]
    uso: Uso // acumulador: se le suma lo gastado en esta llamada
}

// Una llamada completa: devuelve el texto de la respuesta. Si el servidor pausa un turno con herramientas
// (pause_turn), se continúa solo (máximo 4 veces).
export async function generarTexto(p: Peticion): Promise<string> {
    const c = getCliente()
    const mensajes: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: p.contenido }]

    try {
        for (let vuelta = 0; vuelta < 5; vuelta++) {
            const stream = c.beta.messages.stream({
                model: p.modelo,
                max_tokens: p.maxTokens,
                system: p.sistema,
                messages: mensajes,
                output_config: { effort: p.effort ?? "medium" },
                betas: ["server-side-fallback-2026-07-01"],
                fallbacks: "default",
                ...(p.herramientas?.length ? { tools: p.herramientas } : {}),
            })
            const r = await stream.finalMessage()
            sumar(p.uso, r.model || p.modelo, r.usage.input_tokens, r.usage.output_tokens)

            if (r.stop_reason === "refusal") throw new ErrorAnthropic("La IA no pudo atender esta solicitud por sus políticas de seguridad. Revisa que el briefing no contenga contenido sensible.")
            if (r.stop_reason === "pause_turn") {
                mensajes.push({ role: "assistant", content: r.content })
                continue
            }
            if (r.stop_reason === "max_tokens") throw new ErrorAnthropic("La respuesta de la IA quedó incompleta (demasiado larga). Simplifica el briefing o inténtalo de nuevo.")

            const texto = r.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("")
            if (!texto.trim()) throw new ErrorAnthropic("La IA devolvió una respuesta vacía. Inténtalo de nuevo.")
            return texto
        }
        throw new ErrorAnthropic("La IA no terminó de responder. Inténtalo de nuevo.")
    } catch (e) {
        throw new ErrorAnthropic(mensajeDe(e))
    }
}
