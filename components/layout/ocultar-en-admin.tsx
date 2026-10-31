"use client"

import { usePathname } from "next/navigation"

// El header y el footer del sitio público no van dentro de /admin (ahí hay un menú lateral propio).
export function OcultarEnAdmin({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return pathname === "/admin" || pathname.startsWith("/admin/") ? null : <>{children}</>
}
