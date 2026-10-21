import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

export type Usuario = {
    id: number
    nombre: string
    email: string
    password_hash: string | null
    google_id: string | null
    avatar: string | null
    rol: "admin" | "usuario"
    enviar_promociones: 0 | 1
    activo: 0 | 1
}

export async function usuarioPorEmail(email: string): Promise<Usuario | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM usuarios WHERE email = ? LIMIT 1", [
        email.toLowerCase(),
    ])
    return (rows[0] as Usuario) ?? null
}

export async function usuarioPorId(id: number): Promise<Usuario | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM usuarios WHERE id = ? LIMIT 1", [id])
    return (rows[0] as Usuario) ?? null
}

export async function crearUsuario(d: {
    nombre: string
    email: string
    passwordHash?: string
    googleId?: string
    avatar?: string
    enviarPromociones?: boolean
}): Promise<number> {
    const [res] = await db.query<ResultSetHeader>(
        `INSERT INTO usuarios (nombre, email, password_hash, google_id, avatar, enviar_promociones)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            d.nombre,
            d.email.toLowerCase(),
            d.passwordHash ?? null,
            d.googleId ?? null,
            d.avatar ?? null,
            d.enviarPromociones ? 1 : 0,
        ],
    )
    return res.insertId
}

// Entró con Google: crea la cuenta (rol usuario) o vincula la existente por correo verificado.
export async function upsertGoogle(p: {
    googleId: string
    email: string
    nombre: string
    avatar?: string
}): Promise<Usuario | null> {
    const existente = await usuarioPorEmail(p.email)
    if (!existente) {
        await crearUsuario({ nombre: p.nombre, email: p.email, googleId: p.googleId, avatar: p.avatar })
    } else if (!existente.google_id) {
        await db.query("UPDATE usuarios SET google_id = ?, avatar = COALESCE(avatar, ?) WHERE id = ?", [
            p.googleId,
            p.avatar ?? null,
            existente.id,
        ])
    }
    return usuarioPorEmail(p.email)
}

export async function actualizarPerfil(
    id: number,
    d: { nombre: string; enviarPromociones: boolean; passwordHash?: string; avatar?: string | null },
) {
    const sets = ["nombre = ?", "enviar_promociones = ?"]
    const valores: (string | number | null)[] = [d.nombre, d.enviarPromociones ? 1 : 0]
    if (d.passwordHash) {
        sets.push("password_hash = ?")
        valores.push(d.passwordHash)
    }
    if (d.avatar !== undefined) {
        sets.push("avatar = ?")
        valores.push(d.avatar)
    }
    await db.query(`UPDATE usuarios SET ${sets.join(", ")} WHERE id = ?`, [...valores, id])
}
