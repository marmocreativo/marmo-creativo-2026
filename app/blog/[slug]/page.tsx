import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, ChevronLeft } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import { Markdown, indiceDe } from "@/components/blog/markdown"
import { JsonLd } from "@/components/seo/json-ld"
import { fechaLarga, listarArticulos, minutosLectura, obtenerArticulo, type Articulo, type ResumenArticulo } from "@/lib/blog"
import { CATEGORIAS_BLOG, ETIQUETAS_BLOG } from "@/lib/blog-categorias"
import { whatsappLink } from "@/lib/seo/oferta"

export const dynamic = "force-dynamic"

const baseUrl = "https://marmo-creativo.com"

async function cargar(slug: string): Promise<Articulo | null> {
  try {
    return await obtenerArticulo(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = await cargar(slug)
  if (!a) return { title: "Artículo no encontrado | Marmo Creativo", robots: { index: false } }

  const imagen = a.portada ?? "/og-main.jpg"
  return {
    title: `${a.titulo} | Marmo Creativo`,
    description: a.resumen,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      title: a.titulo,
      description: a.resumen,
      url: `/blog/${a.slug}`,
      type: "article",
      locale: "es_MX",
      publishedTime: a.fecha,
      modifiedTime: a.actualizado,
      authors: ["Manuel Marmolejo Martínez"],
      images: [{ url: imagen }],
    },
    twitter: { card: "summary_large_image", title: a.titulo, description: a.resumen, images: [imagen] },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await cargar(slug)
  if (!a) notFound()

  let relacionados: ResumenArticulo[] = []
  try {
    relacionados = await listarArticulos({ categoria: a.categoria, excluirId: a.id, limite: 3 })
    if (relacionados.length < 3) {
      const otros = await listarArticulos({ excluirId: a.id, limite: 6 })
      relacionados = [...relacionados, ...otros.filter((o) => !relacionados.some((r) => r.id === o.id))].slice(0, 3)
    }
  } catch {
    // sin relacionados
  }

  const categoria = CATEGORIAS_BLOG.find((c) => c.slug === a.categoria)
  const indice = indiceDe(a.contenido)
  const minutos = minutosLectura(a.contenido)
  const url = `${baseUrl}/blog/${a.slug}`
  const mensaje = `Hola, leí el artículo "${a.titulo}" en su blog y me gustaría platicar de mi proyecto.`

  const articuloLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titulo,
    description: a.resumen,
    image: [a.portada ? `${baseUrl}${a.portada}` : `${baseUrl}/og-main.jpg`],
    datePublished: a.fecha,
    dateModified: a.actualizado,
    inLanguage: "es-MX",
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Manuel Marmolejo Martínez", url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: "Marmo Creativo",
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/android-chrome-512x512.png` },
    },
  }
  const migasLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: a.titulo, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={articuloLd} />
      <JsonLd data={migasLd} />

      <section className="relative -mt-20 bg-black text-white pt-36 md:pt-44 pb-14 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Blog
          </Link>
          <p className="mt-8 text-xs sm:text-sm font-medium tracking-wide text-white/80">{categoria?.nombre ?? ETIQUETAS_BLOG[a.categoria] ?? a.categoria}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight">{a.titulo}</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed">{a.resumen}</p>
          <p className="mt-6 text-sm text-white/60">
            Por Manuel Marmolejo · <time dateTime={a.fecha}>{fechaLarga(a.fecha)}</time> · {minutos} min de lectura
          </p>
        </div>
      </section>

      <article className="bg-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {a.portada && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.portada} alt={a.titulo} className="mb-10 w-full rounded-xl border border-border" />
          )}

          {indice.length > 2 && (
            <nav aria-label="Contenido del artículo" className="mb-10 rounded-xl border border-border bg-neutral-50 p-6">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">En este artículo</p>
              <ol className="mt-3 space-y-1.5 text-base">
                {indice.map((i) => (
                  <li key={i.id}>
                    <a href={`#${i.id}`} className="text-foreground/80 underline-offset-4 hover:text-foreground hover:underline">
                      {i.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <Markdown texto={a.contenido} />

          <aside className="mt-14 rounded-xl bg-black p-8 md:p-10 text-white">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">¿Quieres que lo hagamos por ti?</h2>
            <p className="mt-3 text-white/80 leading-relaxed">
              Cuéntanos de tu negocio y te decimos, sin compromiso, qué necesitas y cuánto cuesta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                <SiWhatsapp className="w-4 h-4" /> Escribir por WhatsApp
              </a>
              {categoria && (
                <Link href={categoria.servicio.href} className="inline-flex items-center gap-1.5 border border-white/40 px-5 py-3 text-sm font-medium transition-colors hover:border-white">
                  {categoria.servicio.texto} <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </aside>
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="border-t border-border bg-neutral-50 py-14 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sigue leyendo</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relacionados.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{ETIQUETAS_BLOG[r.categoria] ?? r.categoria}</span>
                  <h3 className="mt-3 text-lg font-medium leading-snug text-foreground">{r.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{r.resumen}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Leer
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
