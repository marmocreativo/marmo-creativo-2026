"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SubNav({ links }: { links: { label: string; href: string }[] }) {
    const pathname = usePathname()
    // El enlace más específico que coincida con la ruta actual es el activo.
    const activo = links
        .filter((l) => pathname === l.href || pathname.startsWith(l.href + "/"))
        .sort((a, b) => b.href.length - a.href.length)[0]?.href

    return (
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
                <Link
                    key={l.href}
                    href={l.href}
                    className={`text-sm font-medium pb-1 border-b transition-colors ${
                        l.href === activo ? "text-white border-white" : "text-white/60 border-transparent hover:text-white"
                    }`}
                >
                    {l.label}
                </Link>
            ))}
        </nav>
    )
}
