import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { listarPortafolio, type ItemPortafolio } from "@/lib/portafolio"
import { CATEGORIAS_PORTAFOLIO, ETIQUETAS_CATEGORIA, SLUGS_CATEGORIA } from "@/lib/portafolio-categorias"

// Lee la base de datos en cada visita (no se puede prerenderizar en el build de Docker).
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Portafolio de Proyectos | Marmo Creativo",
  description:
    "Sitios web, tiendas en línea, software a medida y diseño gráfico que hemos hecho para negocios reales. Conoce el portafolio de Marmo Creativo.",
  alternates: { canonical: "/portafolio" },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams
  const activa = categoria && SLUGS_CATEGORIA.includes(categoria) ? categoria : undefined

  let proyectos: ItemPortafolio[] = []
  try {
    proyectos = await listarPortafolio({ categorias: activa ? [activa] : [] })
  } catch {
    // sin base de datos: se muestra el estado vacío
  }

  const chip = (activo: boolean) =>
    `border px-4 py-2 text-sm transition-colors ${
      activo ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
    }`

  return (
    <>
      <section className="relative -mt-20 bg-black text-white pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">Portafolio</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">Lo que hemos hecho.</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Proyectos reales de negocios reales: sitios web, tiendas en línea, software a medida y diseño.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Categorías" className="mb-10 flex flex-wrap gap-2">
            <Link href="/portafolio" className={chip(!activa)}>Todos</Link>
            {CATEGORIAS_PORTAFOLIO.map((c) => (
              <Link key={c.slug} href={`/portafolio?categoria=${c.slug}`} className={chip(activa === c.slug)}>
                {c.nombre}
              </Link>
            ))}
          </nav>

          {proyectos.length === 0 ? (
            <p className="text-lg text-muted-foreground">
              {activa ? "Aún no hay proyectos publicados en esta categoría." : "Pronto publicaremos nuestros proyectos."}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {proyectos.map((p) => (
                <Link
                  key={p.id}
                  href={`/portafolio/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imagen} alt={p.titulo} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {ETIQUETAS_CATEGORIA[p.categoria] ?? p.categoria}
                    </span>
                    <h2 className="mt-3 text-xl font-light text-foreground">{p.titulo}</h2>
                    {p.descripcion && (
                      <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.descripcion}</p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Ver proyecto
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
