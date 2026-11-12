import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { ipDe } from "@/lib/login-limite"
import { ErrorHerramienta, herramientas } from "@/lib/mcp/crm"

// Conector MCP (Streamable HTTP, sin estado) para que Claude trabaje con el CRM.
// Acceso: encabezado "Authorization: Bearer <MCP_TOKEN>". Sin MCP_TOKEN en el entorno, el conector no existe (404).

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const VERSIONES = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"]
const SITIO = "https://marmo-creativo.com"
const MAX_BYTES = 200_000

const INSTRUCCIONES =
    "CRM de Marmo Creativo. Jerarquía: cliente → contactos y proyectos; proyecto → tareas. Empieza con crm_esquema si no conoces los campos. " +
    "Antes de crear algo, busca con crm_buscar para no duplicar. No hay borrado: si algo sobra, dilo para que se quite desde el admin."

// Intentos fallidos por IP (en memoria; un solo contenedor): 10 en 15 min y se bloquea esa IP un rato.
const fallos = new Map<string, number[]>()
const VENTANA = 15 * 60_000
function bloqueada(ip: string): boolean {
    const ahora = Date.now()
    const recientes = (fallos.get(ip) ?? []).filter((t) => ahora - t < VENTANA)
    fallos.set(ip, recientes)
    return recientes.length >= 10
}
function anotarFallo(ip: string) {
    fallos.set(ip, [...(fallos.get(ip) ?? []), Date.now()])
    if (fallos.size > 500) for (const [k, v] of fallos) if (!v.some((t) => Date.now() - t < VENTANA)) fallos.delete(k)
}

const huella = (s: string) => createHash("sha256").update(s).digest()

function tokenValido(req: Request, esperado: string): boolean {
    const m = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") ?? "")
    return !!m && timingSafeEqual(huella(m[1].trim()), huella(esperado))
}

type Id = string | number | null
const ok = (id: Id, result: unknown) => ({ jsonrpc: "2.0", id, result })
const fallo = (id: Id, code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } })

async function atender(msg: unknown): Promise<unknown | null> {
    if (!msg || typeof msg !== "object") return fallo(null, -32600, "Solicitud no válida.")
    const { id, method, params } = msg as { id?: Id; method?: unknown; params?: Record<string, unknown> }
    if (typeof method !== "string") return null // respuestas del cliente: nada que hacer
    if (id === undefined) return null // notificaciones (ej. notifications/initialized)

    switch (method) {
        case "initialize": {
            const pedida = String(params?.protocolVersion ?? "")
            return ok(id, {
                protocolVersion: VERSIONES.includes(pedida) ? pedida : VERSIONES[0],
                capabilities: { tools: { listChanged: false } },
                serverInfo: { name: "marmo-creativo-crm", title: "CRM Marmo Creativo", version: "1.0.0" },
                instructions: INSTRUCCIONES,
            })
        }
        case "ping":
            return ok(id, {})
        case "tools/list":
            return ok(id, { tools: herramientas.map(({ name, description, inputSchema, annotations }) => ({ name, description, inputSchema, annotations })) })
        case "tools/call": {
            const h = herramientas.find((x) => x.name === params?.name)
            if (!h) return fallo(id, -32602, `Herramienta desconocida: ${String(params?.name)}`)
            const args = (params?.arguments && typeof params.arguments === "object" ? params.arguments : {}) as Record<string, unknown>
            try {
                const salida = await h.ejecutar(args)
                console.info(`[mcp] ${h.name}${typeof args.recurso === "string" ? ` ${args.recurso}` : ""}`)
                return ok(id, { content: [{ type: "text", text: JSON.stringify(salida) }] })
            } catch (e) {
                if (e instanceof ErrorHerramienta) return ok(id, { isError: true, content: [{ type: "text", text: e.message }] })
                console.error(`[mcp] error en ${h.name}:`, e)
                return ok(id, { isError: true, content: [{ type: "text", text: "Error interno del servidor al ejecutar la herramienta." }] })
            }
        }
        default:
            return fallo(id, -32601, `Método no soportado: ${method}`)
    }
}

export async function POST(req: Request) {
    const esperado = process.env.MCP_TOKEN
    if (!esperado || esperado.length < 32) return new NextResponse(null, { status: 404 }) // conector desactivado

    // Un navegador de otro sitio no debe poder usar este endpoint.
    const origen = req.headers.get("origin")
    if (origen && origen !== SITIO && !/^https?:\/\/localhost(:\d+)?$/.test(origen)) return new NextResponse(null, { status: 403 })

    const ip = ipDe(req.headers)
    if (bloqueada(ip)) return NextResponse.json({ error: "Demasiados intentos. Espera unos minutos." }, { status: 429 })
    if (!tokenValido(req, esperado)) {
        anotarFallo(ip)
        return NextResponse.json({ error: "No autorizado." }, { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="marmo-crm"' } })
    }

    const texto = await req.text()
    if (texto.length > MAX_BYTES) return NextResponse.json(fallo(null, -32600, "Solicitud demasiado grande."), { status: 413 })
    let cuerpo: unknown
    try {
        cuerpo = JSON.parse(texto)
    } catch {
        return NextResponse.json(fallo(null, -32700, "JSON no válido."), { status: 400 })
    }

    const lote = Array.isArray(cuerpo)
    const mensajes: unknown[] = Array.isArray(cuerpo) ? cuerpo : [cuerpo]
    const respuestas = (await Promise.all(mensajes.map(atender))).filter((r) => r !== null)
    if (!respuestas.length) return new NextResponse(null, { status: 202 }) // solo notificaciones
    return NextResponse.json(lote ? respuestas : respuestas[0], { headers: { "Cache-Control": "no-store" } })
}

// Este conector no abre flujos SSE ni sesiones: GET y DELETE no aplican.
const noPermitido = () => new NextResponse(null, { status: 405, headers: { Allow: "POST" } })
export const GET = noPermitido
export const DELETE = noPermitido
