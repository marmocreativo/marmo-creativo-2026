"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { GoogleAnalytics } from "@next/third-parties/google"

const GA_ID = "G-QTEDWT40GE"

// Google Analytics en todo el sitio público, menos en /admin.
// Si llegas al admin navegando desde una página pública, el script de GA ya está cargado:
// por eso, además de no montarlo, se activa la bandera oficial "ga-disable" para que no registre nada.
export function Analytics() {
    const pathname = usePathname()
    const enAdmin = pathname === "/admin" || pathname.startsWith("/admin/")

    useEffect(() => {
        ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = enAdmin
    }, [enAdmin])

    return enAdmin ? null : <GoogleAnalytics gaId={GA_ID} />
}
