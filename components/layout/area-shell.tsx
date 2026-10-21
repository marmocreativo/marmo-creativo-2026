import { cerrarSesion } from "@/lib/actions/auth"
import { SubNav } from "./sub-nav"

// Cabecera oscura compartida por /panel y /admin; debajo va el contenido sobre el layout público.
export function AreaShell({
    eyebrow,
    titulo,
    links,
    children,
}: {
    eyebrow: string
    titulo: string
    links: { label: string; href: string }[]
    children: React.ReactNode
}) {
    return (
        <>
            <section className="-mt-20 bg-black text-white pt-32 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-sm text-white/60">{eyebrow}</p>
                    <h1 className="mt-2 text-4xl md:text-5xl font-light leading-tight">{titulo}</h1>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <SubNav links={links} />
                        <form action={cerrarSesion}>
                            <button type="submit" className="text-sm text-white/60 hover:text-white transition-colors">
                                Cerrar sesión
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <main className="max-w-7xl mx-auto px-6 py-12 min-h-[50vh]">{children}</main>
        </>
    )
}
