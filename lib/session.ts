import { cache } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { usuarioPorId, type Usuario } from "@/lib/usuarios"

// Usuario actual leído de la base de datos (así un cambio de rol o una baja aplican de inmediato).
export const usuarioActual = cache(async (): Promise<Usuario | null> => {
    const session = await auth()
    if (!session?.user?.id) return null
    const u = await usuarioPorId(session.user.id)
    return u && u.activo ? u : null
})

export async function requireUsuario(volverA = "/panel"): Promise<Usuario> {
    const u = await usuarioActual()
    if (!u) redirect(`/login?callbackUrl=${encodeURIComponent(volverA)}`)
    return u
}

export async function requireAdmin(): Promise<Usuario> {
    const u = await requireUsuario("/admin")
    if (u.rol !== "admin") redirect("/panel")
    return u
}
