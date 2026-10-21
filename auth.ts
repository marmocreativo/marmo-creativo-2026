import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { esperaLogin, ipDe, limpiarFallos, registrarFallo } from "@/lib/login-limite"
import { upsertGoogle, usuarioPorEmail } from "@/lib/usuarios"

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
    pages: { signIn: "/login" },
    providers: [
        // Lee AUTH_GOOGLE_ID y AUTH_GOOGLE_SECRET del entorno.
        Google,
        Credentials({
            credentials: { email: {}, password: {} },
            async authorize(raw, request) {
                const email = String(raw?.email ?? "").trim().toLowerCase()
                const password = String(raw?.password ?? "")
                if (!email || !password) return null

                // También se limita aquí: /api/auth/callback/credentials se puede llamar sin pasar por la server action.
                const ip = ipDe(request.headers)
                if ((await esperaLogin(email, ip)) > 0) return null

                const u = await usuarioPorEmail(email)
                if (!u || !u.activo || !u.password_hash || !(await bcrypt.compare(password, u.password_hash))) {
                    await registrarFallo(email, ip)
                    return null
                }
                await limpiarFallos(email)

                return { id: String(u.id), name: u.nombre, email: u.email, image: u.avatar }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider !== "google") return true
            if (!profile?.email || !profile.email_verified) return false

            const u = await upsertGoogle({
                googleId: String(account.providerAccountId),
                email: profile.email,
                nombre: profile.name ?? profile.email,
                avatar: profile.picture ?? undefined,
            })
            return !!u && !!u.activo
        },
        async jwt({ token, user }) {
            // Solo al iniciar sesión: tomamos id y rol de la base de datos.
            if (user?.email) {
                const u = await usuarioPorEmail(user.email)
                if (u) {
                    token.id = u.id
                    token.rol = u.rol
                }
            }
            return token
        },
        async session({ session, token }) {
            // El tipo del callback mezcla la sesión de adaptador (id string); asignamos sin chocar con él.
            Object.assign(session.user, { id: Number(token.id), rol: token.rol ?? "usuario" })
            return session
        },
    },
})
