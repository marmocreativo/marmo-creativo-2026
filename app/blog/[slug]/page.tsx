import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Calendar, ChevronLeft, Clock, FolderOpen, RefreshCw, Tag, User } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import { marked } from "marked"
import { Compartir } from "@/components/blog/compartir"
import { GaleriaBlog } from "@/components/blog/galeria"
import { JsonLd } from "@/components/seo/json-ld"
import { contarPalabras, prepararHtml } from "@/lib/blog-html"
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

// "Título | Marmo Creativo", sin repetir la marca si el título SEO ya la trae.
const conMarca = (t: string) => (/marmo creativo/i.test(t) ? t : `${t} | Marmo Creativo`)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = await cargar(slug)
  if (!a) return { title: "Artículo no encontrado | Marmo Creativo", robots: { index: false } }

  const titulo = a.metaTitulo || a.titulo
  const descripcion = a.metaDescripcion || a.resumen
  // Imagen para compartir: siempre 1200 × 630 JPG (la ruta /og la recorta desde la portada).
  const imagen = a.portada ? `/blog/${a.slug}/og` : "/og-main.jpg"
  return {
    title: conMarca(titulo),
    description: descripcion,
    keywords: a.palabraClave ? [a.palabraClave] : undefined,
    alternates: { canonical: `/blog/${a.slug}` },
    robots: a.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: `/blog/${a.slug}`,
      type: "article",
      locale: "es_MX",
      publishedTime: a.fecha,
      modifiedTime: a.actualizado,
      authors: ["Manuel Marmolejo Martínez"],
      section: ETIQUETAS_BLOG[a.categoria],
      images: [{ url: imagen, width: 1200, height: 630, type: "image/jpeg", alt: a.portadaAlt ?? a.titulo }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: [imagen] },
  }
}

const dato = "flex items-start gap-3 text-sm"
const rotulo = "text-xs text-muted-foreground"

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

  // Los artículos iniciales vienen en Markdown; los del editor visual, en HTML. Ambos terminan como HTML limpio.
  const origen = a.formato === "markdown" ? (marked.parse(a.contenido, { async: false, gfm: true }) as string) : a.contenido
  const { html, indice } = prepararHtml(origen)
  const palabras = contarPalabras(html)
  const minutos = minutosLectura(palabras)

  const categoria = CATEGORIAS_BLOG.find((c) => c.slug === a.categoria)
  const nombreCategoria = categoria?.nombre ?? ETIQUETAS_BLOG[a.categoria] ?? a.categoria
  const url = `${baseUrl}/blog/${a.slug}`
  const mensaje = `Hola, leí el artículo "${a.titulo}" en su blog y me gustaría platicar de mi proyecto.`
  const imagenes = [a.portada, ...a.galeria.map((g) => g.archivo)].filter((x): x is string => !!x).map((x) => `${baseUrl}${x}`)

  const articuloLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.metaTitulo || a.titulo,
    description: a.metaDescripcion || a.resumen,
    image: imagenes.length ? imagenes : [`${baseUrl}/og-main.jpg`],
    datePublished: a.fecha,
    dateModified: a.actualizado,
    inLanguage: "es-MX",
    mainEntityOfPage: url,
    articleSection: nombreCategoria,
    keywords: a.palabraClave ?? undefined,
    wordCount: palabras,
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

  const tablaDeContenido = (
    <ol className="space-y-2 text-sm">
      {indice.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} className="text-foreground/75 underline-offset-4 hover:text-foreground hover:underline">
            {i.titulo}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <JsonLd data={articuloLd} />
      <JsonLd data={migasLd} />

      <section className="relative -mt-20 bg-black text-white pt-36 md:pt-44 pb-14 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Blog
          </Link>
          <p className="mt-8 text-xs sm:text-sm font-medium tracking-wide text-white/80">{nombreCategoria}</p>
          <h1 className="mt-3 max-w-4xl text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight">{a.titulo}</h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed">{a.resumen}</p>
        </div>
      </section>

      <div className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
          {/* ───────── Sidebar izquierda: metadatos ───────── */}
          <aside className="order-last lg:order-first">
            <div className="space-y-6 lg:sticky lg:top-24">
              <section className="rounded-xl border border-border p-5" aria-label="Datos del artículo">
                <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">Sobre este artículo</h2>
                <dl className="mt-4 space-y-4">
                  <div className={dato}>
                    <FolderOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className={rotulo}>Categoría</dt>
                      <dd>
                        <Link href={`/blog?categoria=${a.categoria}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                          {nombreCategoria}
                        </Link>
                      </dd>
                    </div>
                  </div>
                  <div className={dato}>
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className={rotulo}>Publicado</dt>
                      <dd className="text-foreground">
                        <time dateTime={a.fecha}>{fechaLarga(a.fecha)}</time>
                      </dd>
                    </div>
                  </div>
                  {a.actualizado > a.fecha && (
                    <div className={dato}>
                      <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className={rotulo}>Actualizado</dt>
                        <dd className="text-foreground">
                          <time dateTime={a.actualizado}>{fechaLarga(a.actualizado)}</time>
                        </dd>
                      </div>
                    </div>
                  )}
                  <div className={dato}>
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className={rotulo}>Lectura</dt>
                      <dd className="text-foreground">{minutos} min · {palabras.toLocaleString("es-MX")} palabras</dd>
                    </div>
                  </div>
                  <div className={dato}>
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className={rotulo}>Autor</dt>
                      <dd className="text-foreground">Manuel Marmolejo</dd>
                    </div>
                  </div>
                  {a.palabraClave && (
                    <div className={dato}>
                      <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className={rotulo}>Tema</dt>
                        <dd className="text-foreground">{a.palabraClave}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              </section>

              {indice.length > 2 && (
                <nav className="hidden rounded-xl border border-border p-5 lg:block" aria-label="Contenido del artículo">
                  <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">En este artículo</h2>
                  <div className="mt-4">{tablaDeContenido}</div>
                </nav>
              )}

              <section className="rounded-xl border border-border p-5" aria-label="Compartir">
                <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">Compartir</h2>
                <div className="mt-3">
                  <Compartir url={url} titulo={a.titulo} />
                </div>
              </section>

              <a
                href={whatsappLink(mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <SiWhatsapp className="h-4 w-4" /> Hablar de mi proyecto
              </a>
            </div>
          </aside>

          {/* ───────── Contenido a la derecha ───────── */}
          <article className="min-w-0">
            {a.portada && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.portada} alt={a.portadaAlt || a.titulo} className="mb-10 w-full rounded-xl border border-border" />
            )}

            {indice.length > 2 && (
              <details className="mb-8 rounded-xl border border-border p-5 lg:hidden">
                <summary className="cursor-pointer text-sm font-medium text-foreground">En este artículo</summary>
                <div className="mt-4">{tablaDeContenido}</div>
              </details>
            )}

            <div className="contenido-blog" dangerouslySetInnerHTML={{ __html: html }} />

            {a.galeria.length > 0 && (
              <section className="mt-14" aria-label="Galería">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">Galería</h2>
                <GaleriaBlog imagenes={a.galeria} />
              </section>
            )}

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
          </article>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="border-t border-border bg-neutral-50 py-14 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
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
