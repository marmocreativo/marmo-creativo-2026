"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    Building2,
    ContactRound,
    FolderKanban,
    Globe,
    LayoutDashboard,
    ListChecks,
    LogOut,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    User,
    Users,
    type LucideIcon,
    Newspaper,
} from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cerrarSesion } from "@/lib/actions/auth"

type Enlace = { href: string; label: string; icono: LucideIcon; exacto?: boolean }

const PRINCIPAL: Enlace[] = [
    { href: "/admin", label: "Resumen", icono: LayoutDashboard, exacto: true },
    { href: "/admin/clientes", label: "Clientes", icono: Building2 },
    { href: "/admin/contactos", label: "Contactos", icono: ContactRound },
    { href: "/admin/proyectos", label: "Proyectos", icono: FolderKanban },
    { href: "/admin/tareas", label: "Tareas", icono: ListChecks },
    { href: "/admin/articulos", label: "Blog", icono: Newspaper },
    { href: "/admin/usuarios", label: "Usuarios", icono: Users },
]

const SECUNDARIO: Enlace[] = [
    { href: "/admin/configuracion", label: "Configuración", icono: Settings },
    { href: "/panel", label: "Mi panel", icono: User },
    { href: "/", label: "Ver sitio", icono: Globe, exacto: true },
]

const activo = (e: Enlace, pathname: string) => (e.exacto ? pathname === e.href : pathname === e.href || pathname.startsWith(e.href + "/"))

function Iniciales({ nombre, avatar }: { nombre: string; avatar: string | null }) {
    return avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt="" referrerPolicy="no-referrer" className="h-8 w-8 shrink-0 rounded-full border border-white/20 object-cover" />
    ) : (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-medium text-white">
            {nombre
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((p) => p[0]?.toUpperCase())
                .join("")}
        </span>
    )
}

// Lista de enlaces; `compacto` deja solo los íconos (con el nombre como ayuda al pasar el mouse).
function Navegacion({ pathname, compacto, alNavegar }: { pathname: string; compacto: boolean; alNavegar?: () => void }) {
    const fila = (e: Enlace) => {
        const esActivo = activo(e, pathname)
        return (
            <Link
                key={e.href}
                href={e.href}
                title={compacto ? e.label : undefined}
                aria-label={compacto ? e.label : undefined}
                aria-current={esActivo ? "page" : undefined}
                onClick={alNavegar}
                className={`flex h-9 items-center gap-3 rounded-md text-sm transition-colors ${compacto ? "justify-center" : "px-3"} ${
                    esActivo ? "bg-white/12 text-white" : "text-white/60 hover:bg-white/8 hover:text-white"
                }`}
            >
                <e.icono className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                {!compacto && <span className="truncate">{e.label}</span>}
            </Link>
        )
    }

    return (
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto" aria-label="Administración">
            {PRINCIPAL.map(fila)}
            <div className="my-2 h-px bg-white/10" />
            {SECUNDARIO.map(fila)}
        </nav>
    )
}

function Cierre({ compacto, nombre, avatar }: { compacto: boolean; nombre: string; avatar: string | null }) {
    return (
        <div className={`flex items-center gap-2 border-t border-white/10 pt-3 ${compacto ? "flex-col" : ""}`}>
            <Iniciales nombre={nombre} avatar={avatar} />
            {!compacto && <span className="min-w-0 flex-1 truncate text-sm text-white/80">{nombre}</span>}
            <form action={cerrarSesion}>
                <button
                    type="submit"
                    title="Cerrar sesión"
                    aria-label="Cerrar sesión"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/8 hover:text-white"
                >
                    <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
            </form>
        </div>
    )
}

export function AdminShell({
    nombre,
    avatar,
    colapsadoInicial,
    children,
}: {
    nombre: string
    avatar: string | null
    colapsadoInicial: boolean
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [colapsado, setColapsado] = useState(colapsadoInicial)
    const [menuMovil, setMenuMovil] = useState(false)

    const alternar = () => {
        const nuevo = !colapsado
        setColapsado(nuevo)
        // Se recuerda en una cookie para que el servidor pinte el menú ya en su estado (sin parpadeo).
        document.cookie = `admin_menu=${nuevo ? "icons" : "full"}; path=/admin; max-age=31536000; SameSite=Lax`
    }

    const seccion = [...PRINCIPAL, ...SECUNDARIO].filter((e) => activo(e, pathname)).sort((a, b) => b.href.length - a.href.length)[0]?.label ?? "Administración"

    return (
        <div className="min-h-screen bg-white text-foreground lg:flex">
            {/* Escritorio */}
            <aside
                className={`sticky top-0 hidden h-screen shrink-0 flex-col gap-3 bg-neutral-950 p-3 transition-[width] duration-200 lg:flex ${colapsado ? "w-16" : "w-60"}`}
            >
                <div className={`flex h-9 items-center ${colapsado ? "justify-center" : "justify-between px-1"}`}>
                    <Link href="/admin" aria-label="Inicio de administración" className="flex items-center">
                        {colapsado ? (
                            <Image src="/images/icon.svg" alt="Marmo" width={28} height={28} className="h-7 w-7" />
                        ) : (
                            <Image src="/images/logo.svg" alt="Marmo Creativo" width={110} height={32} className="h-7 w-auto" />
                        )}
                    </Link>
                </div>

                <Navegacion pathname={pathname} compacto={colapsado} />

                <button
                    type="button"
                    onClick={alternar}
                    title={colapsado ? "Expandir menú" : "Contraer menú"}
                    aria-label={colapsado ? "Expandir menú" : "Contraer menú"}
                    aria-expanded={!colapsado}
                    className={`flex h-9 items-center gap-3 rounded-md text-sm text-white/50 transition-colors hover:bg-white/8 hover:text-white ${colapsado ? "justify-center" : "px-3"}`}
                >
                    {colapsado ? <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.75} />}
                    {!colapsado && <span>Contraer</span>}
                </button>

                <Cierre compacto={colapsado} nombre={nombre} avatar={avatar} />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                {/* Móvil y tablet: barra delgada con el menú en un panel lateral */}
                <header className="sticky top-0 z-30 flex h-12 items-center gap-3 bg-neutral-950 px-3 text-white lg:hidden">
                    <Sheet open={menuMovil} onOpenChange={setMenuMovil}>
                        <SheetTrigger asChild>
                            <button type="button" aria-label="Abrir menú" className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" showCloseButton={false} className="w-64 gap-3 border-white/10 bg-neutral-950 p-3 text-white">
                            <SheetTitle className="sr-only">Menú de administración</SheetTitle>
                            <div className="flex h-9 items-center px-1">
                                <Image src="/images/logo.svg" alt="Marmo Creativo" width={110} height={32} className="h-7 w-auto" />
                            </div>
                            <Navegacion pathname={pathname} compacto={false} alNavegar={() => setMenuMovil(false)} />
                            <Cierre compacto={false} nombre={nombre} avatar={avatar} />
                        </SheetContent>
                    </Sheet>
                    <span className="text-sm font-medium">{seccion}</span>
                </header>

                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
