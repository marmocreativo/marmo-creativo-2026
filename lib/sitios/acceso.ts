import { redirect } from "next/navigation"
import { requireUsuario } from "@/lib/session"
import type { Usuario } from "@/lib/usuarios"

// Quién puede usar el creador de sitios. Por ahora solo administradores (la IA gasta dinero de la API de Anthropic).
// Para abrirlo a usuarios registrados o a clientes habilitados, el cambio va únicamente aquí.
export const puedeCrearSitios = (u: Usuario) => u.rol === "admin"

export async function requireCreadorSitios(volverA = "/panel/sitios"): Promise<Usuario> {
    const u = await requireUsuario(volverA)
    if (!puedeCrearSitios(u)) redirect("/panel")
    return u
}
