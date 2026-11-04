import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { listarArticulos, fechaLarga, type ResumenArticulo } from "@/lib/blog"
import { CATEGORIAS_BLOG, ETIQUETAS_BLOG, SLUGS_BLOG } from "@/lib/blog-categorias"

// Lee la base de datos en cada visita (no se puede prerenderizar en el build de Docker).
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog de Páginas Web, Software y Diseño | Marmo Creativo",
  description:
    "Guías prácticas para negocios en México: cuánto cuesta una página web, cómo elegir agencia, CMS a la medida, SEO local y diseño. Por Marmo Creativo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Marmo Creativo",
    description: "Guías prácticas sobre páginas web, software a la medida y diseño para negocios en México.",
    url: "/blog",
  },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams
  const activa = categoria && SLUGS_BLOG.includes(categoria) ? categoria : undefined

  let articulos: ResumenArticulo[] = []
  try {
    articulos = await listarArticulos({ categoria: activa })
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
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">Blog</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">Guías para tu negocio en línea.</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Precios reales, decisiones técnicas explicadas sin tecnicismos y lo que aprendemos haciendo sitios web en México.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Categorías" className="mb-10 flex flex-wrap gap-2">
            <Link href="/blog" className={chip(!activa)}>Todos</Link>
            {CATEGORIAS_BLOG.map((c) => (
              <Link key={c.slug} href={`/blog?categoria=${c.slug}`} className={chip(activa === c.slug)}>
                {c.nombre}
              </Link>
            ))}
          </nav>

          {articulos.length === 0 ? (
            <p className="text-lg text-muted-foreground">
              {activa ? "Aún no hay artículos en esta categoría." : "Pronto publicaremos nuestros primeros artículos."}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articulos.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {a.portada ? (
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.portada} alt={a.titulo} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-end bg-black p-6 text-white/70">
                      <span className="text-xs tracking-[0.15em] uppercase">{ETIQUETAS_BLOG[a.categoria] ?? a.categoria}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      {ETIQUETAS_BLOG[a.categoria] ?? a.categoria} · {fechaLarga(a.fecha)}
                    </span>
                    <h2 className="mt-3 text-xl font-medium leading-snug text-foreground">{a.titulo}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.resumen}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Leer artículo
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
