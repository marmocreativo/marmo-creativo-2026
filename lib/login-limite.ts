import { isIP } from "node:net"
import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

// Protección contra fuerza bruta. Los intentos viven en MySQL (tabla intentos_login) para
// sobrevivir a reinicios del contenedor. Solo se guardan fallos (y los intentos de registro).
// Tras `max` intentos en la ventana, la espera crece 1, 2, 4... minutos hasta `pausaMaxMin`.
// La pausa nunca supera la ventana: si no, los intentos caducarían antes que el bloqueo.
type Tipo = "email" | "ip" | "registro"
type Regla = { max: number; ventanaMin: number; pausaMaxMin: number }

const REGLAS: Record<Tipo, Regla> = {
    email: { max: 5, ventanaMin: 15, pausaMaxMin: 10 },
    // Más holgado: varias personas pueden compartir IP (oficina, NAT).
    ip: { max: 20, ventanaMin: 15, pausaMaxMin: 10 },
    registro: { max: 5, ventanaMin: 60, pausaMaxMin: 60 },
}

// Traefik agrega la IP real al FINAL de x-forwarded-for; lo anterior lo manda el cliente y se
// puede falsificar. Con N proxies de confianza, la IP válida es la N-ésima desde el final.
export function ipDe(headers: Headers): string {
    const saltos = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS ?? 1) || 1)
    const lista = (headers.get("x-forwarded-for") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    const candidata = lista.length ? lista[Math.max(0, lista.length - saltos)] : headers.get("x-real-ip")?.trim()
    return candidata && candidata.length <= 45 && isIP(candidata) ? candidata : "desconocida"
}

export const claveEmail = (email: string) => email.trim().toLowerCase().slice(0, 190)

export function textoEspera(seg: number): string {
    const min = Math.ceil(seg / 60)
    return `Demasiados intentos. Espera ${min <= 1 ? "1 minuto" : `${min} minutos`} e inténtalo de nuevo.`
}

async function esperaRestante(tipo: Tipo, clave: string): Promise<number> {
    const r = REGLAS[tipo]
    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS n, TIMESTAMPDIFF(SECOND, MAX(created_at), NOW()) AS pasado
           FROM intentos_login
          WHERE tipo = ? AND clave = ? AND created_at > NOW() - INTERVAL ? MINUTE`,
        [tipo, clave, r.ventanaMin],
    )
    const n = Number(rows[0]?.n ?? 0)
    if (n < r.max) return 0
    const pausa = Math.min(2 ** (n - r.max), r.pausaMaxMin) * 60
    return Math.max(0, pausa - Number(rows[0]?.pasado ?? 0))
}

/** Segundos que falta esperar (0 = libre). Si la base falla, no bloquea el acceso. */
export async function esperaLogin(email: string, ip: string): Promise<number> {
    try {
        const [a, b] = await Promise.all([esperaRestante("email", claveEmail(email)), esperaRestante("ip", ip)])
        return Math.max(a, b)
    } catch (e) {
        console.error("[login-limite] no se pudo consultar intentos_login:", e)
        return 0
    }
}

export async function esperaRegistro(ip: string): Promise<number> {
    try {
        return await esperaRestante("registro", ip)
    } catch (e) {
        console.error("[login-limite] no se pudo consultar intentos_login:", e)
        return 0
    }
}

async function anotar(pares: [Tipo, string][]) {
    try {
        await db.query("INSERT INTO intentos_login (tipo, clave) VALUES ?", [pares])
        // Limpieza ocasional de registros viejos, sin necesidad de un cron.
        if (Math.random() < 0.05) await db.query("DELETE FROM intentos_login WHERE created_at < NOW() - INTERVAL 1 DAY")
    } catch (e) {
        console.error("[login-limite] no se pudo guardar el intento:", e)
    }
}

export const registrarFallo = (email: string, ip: string) =>
    anotar([
        ["email", claveEmail(email)],
        ["ip", ip],
    ])

export const registrarIntentoRegistro = (ip: string) => anotar([["registro", ip]])

/** Login correcto: se borran los fallos de ese correo (los de la IP siguen contando). */
export async function limpiarFallos(email: string) {
    try {
        await db.query("DELETE FROM intentos_login WHERE tipo = 'email' AND clave = ?", [claveEmail(email)])
    } catch (e) {
        console.error("[login-limite] no se pudo limpiar intentos:", e)
    }
}
