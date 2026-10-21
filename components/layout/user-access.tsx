"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export function useAcceso() {
    const { data, status } = useSession()
    const user = data?.user
    return {
        cargando: status === "loading",
        href: user ? (user.rol === "admin" ? "/admin" : "/panel") : "/login",
        label: user ? (user.rol === "admin" ? "Admin" : "Mi panel") : "Acceso",
    }
}

export function UserAccess({ className, onClick }: { className?: string; onClick?: () => void }) {
    const { cargando, href, label } = useAcceso()
    return (
        <Link
            href={href}
            onClick={onClick}
            className={className}
            style={{ visibility: cargando ? "hidden" : "visible" }}
        >
            {label}
        </Link>
    )
}
