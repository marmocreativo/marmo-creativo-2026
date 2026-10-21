"use client"

import { SessionProvider } from "next-auth/react"

// Sin pasar sesión: se consulta desde el navegador, así las páginas públicas siguen siendo estáticas.
export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>
}
