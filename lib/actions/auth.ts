"use server"

import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"
import { esperaLogin, esperaRegistro, ipDe, registrarIntentoRegistro, textoEspera } from "@/lib/login-limite"
import { actualizarPerfil, crearUsuario, usuarioPorEmail } from "@/lib/usuarios"
import { requireUsuario } from "@/lib/session"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"

export type Estado = { error?: string; ok?: string } | undefined

// Solo rutas internas, para evitar redirecciones abiertas.
function rutaSegura(v: FormDataEntryValue | null): string {
    const s = typeof v === "string" ? v : ""
    return s.startsWith("/") && !s.startsWith("//") ? s : "/panel"
}

const emailValido = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function iniciarSesion(_: Estado, fd: FormData): Promise<Estado> {
    const email = String(fd.get("email") ?? "")
    const ip = ipDe(await headers())

    // El mensaje es el mismo exista o no el correo.
    const antes = await esperaLogin(email, ip)
    if (antes > 0) return { error: textoEspera(antes) }

    try {
        await signIn("credentials", {
            email,
            password: String(fd.get("password") ?? ""),
            redirectTo: rutaSegura(fd.get("callbackUrl")),
        })
    } catch (e) {
        if (e instanceof AuthError) {
            // Si este fallo acaba de activar el bloqueo, avisamos cuánto esperar.
            const despues = await esperaLogin(email, ip)
            return { error: despues > 0 ? textoEspera(despues) : "Correo o contraseña incorrectos." }
        }
        throw e // el redirect de éxito también se lanza como error: hay que dejarlo pasar
    }
}

export async function entrarConGoogle(fd: FormData) {
    await signIn("google", { redirectTo: rutaSegura(fd.get("callbackUrl")) })
}

export async function registrar(_: Estado, fd: FormData): Promise<Estado> {
    const nombre = String(fd.get("nombre") ?? "").trim()
    const email = String(fd.get("email") ?? "").trim().toLowerCase()
    const password = String(fd.get("password") ?? "")
    const confirmar = String(fd.get("confirmar") ?? "")
    const promos = fd.get("enviar_promociones") === "on"

    if (nombre.length < 2) return { error: "Escribe tu nombre." }
    if (!emailValido(email)) return { error: "El correo no es válido." }
    if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." }
    if (password !== confirmar) return { error: "Las contraseñas no coinciden." }

    // Cada intento cuenta (también los exitosos): evita crear cuentas en masa desde una IP.
    const ip = ipDe(await headers())
    const espera = await esperaRegistro(ip)
    if (espera > 0) return { error: textoEspera(espera) }
    await registrarIntentoRegistro(ip)

    if (await usuarioPorEmail(email)) return { error: "Ya existe una cuenta con ese correo. Inicia sesión." }

    await crearUsuario({
        nombre,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        enviarPromociones: promos,
    })

    try {
        await signIn("credentials", { email, password, redirectTo: rutaSegura(fd.get("callbackUrl")) })
    } catch (e) {
        if (e instanceof AuthError) return { error: "Cuenta creada, pero no pudimos iniciar sesión. Intenta entrar." }
        throw e
    }
}

export async function cerrarSesion() {
    await signOut({ redirectTo: "/" })
}

export async function guardarPerfil(_: Estado, fd: FormData): Promise<Estado> {
    const u = await requireUsuario("/panel/perfil")
    const nombre = String(fd.get("nombre") ?? "").trim()
    const password = String(fd.get("password") ?? "")
    const promos = fd.get("enviar_promociones") === "on"

    if (nombre.length < 2) return { error: "Escribe tu nombre." }
    if (password && password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." }

    // Foto de perfil: recorte cuadrado 500 x 500, WebP.
    let avatar: string | null | undefined // undefined = sin cambio
    const archivo = fd.get("avatar")
    if (archivo instanceof File && archivo.size > 0) {
        try {
            avatar = (await guardarImagen(archivo, "usuarios", { tipo: "cuadrada", lado: 500 })).ruta
        } catch (e) {
            if (e instanceof ErrorImagen) return { error: `Foto de perfil: ${e.message}` }
            throw e
        }
    } else if (fd.get("avatar__quitar") === "on") {
        avatar = null
    }

    try {
        await actualizarPerfil(u.id, {
            nombre,
            enviarPromociones: promos,
            passwordHash: password ? await bcrypt.hash(password, 10) : undefined,
            avatar,
        })
    } catch (e) {
        if (typeof avatar === "string") await borrarArchivo(avatar)
        throw e
    }
    if (avatar !== undefined) await borrarArchivo(u.avatar) // solo borra archivos propios, no el avatar de Google

    revalidatePath("/panel/perfil")
    return { ok: "Cambios guardados." }
}
