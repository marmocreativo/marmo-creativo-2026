import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import { obtenerPortafolio, slugProyecto, type ProyectoPortafolio } from "@/lib/portafolio"
import { CATEGORIAS_PORTAFOLIO, ETIQUETAS_CATEGORIA } from "@/lib/portafolio-categorias"
import { whatsappLink } from "@/lib/seo/oferta"

export const dynamic = "force-dynamic"

// "12-sitio-web-capetillo" -> 12. El texto del slug es solo para SEO.
const idDe = (slug: string) => {
  const n = parseInt(slug, 10)
  return Number.isInteger(n) && n > 0 ? n : null
}

async function cargar(slug: string): Promise<ProyectoPortafolio | null> {
  const id = idDe(slug)
  if (!id) return null
  try {
    return await obtenerPortafolio(id)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await cargar(slug)
  if (!p) return { title: "Proyecto no encontrado | Marmo Creativo", robots: { index: false } }

  const descripcion = (p.descripcion ?? `${p.titulo}: proyecto de ${ETIQUETAS_CATEGORIA[p.categoria]} de Marmo Creativo.`).slice(0, 160)
  return {
    title: `${p.titulo} | Portafolio Marmo Creativo`,
    description: descripcion,
    alternates: { canonical: `/portafolio/${slugProyecto(p.id, p.titulo)}` },
    openGraph: { title: p.titulo, description: descripcion, images: [{ url: p.imagen }], type: "article", locale: "es_MX" },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await cargar(slug)
  if (!p) notFound()

  // Una sola URL por proyecto: si el título cambió, se manda al slug vigente.
  if (slug !== p.slug) permanentRedirect(`/portafolio/${p.slug}`)

  const categoria = CATEGORIAS_PORTAFOLIO.find((c) => c.slug === p.categoria)

  return (
    <>
      <section className="relative -mt-20 bg-black text-white pt-36 md:pt-44 pb-14 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/portafolio" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Portafolio
          </Link>
          <p className="mt-8 text-xs sm:text-sm font-medium tracking-wide text-white/80">
            {categoria?.nombre ?? p.categoria}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight">{p.titulo}</h1>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-start">
          {/* Imagen principal */}
          <div className="overflow-hidden rounded-xl border border-border bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imagen} alt={p.titulo} className="block h-auto w-full" />
          </div>

          {/* Descripción */}
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl md:text-4xl font-light leading-tight text-foreground">Sobre el proyecto</h2>
            {p.descripcion ? (
              <p className="mt-5 whitespace-pre-line text-lg text-muted-foreground leading-relaxed">{p.descripcion}</p>
            ) : (
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Proyecto de {categoria?.nombre.toLowerCase() ?? "nuestro portafolio"}.
              </p>
            )}
            {categoria && (
              <Link
                href={categoria.seccion}
                className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Conoce nuestro servicio de {categoria.nombre} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Galería: conserva la proporción original de cada imagen */}
      {p.galeria.length > 0 && (
        <section className="bg-neutral-100 py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-10 text-3xl md:text-4xl font-light text-foreground">Galería</h2>
            <ul className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {p.galeria.map((img) => (
                <li key={img.id} className="mb-5 break-inside-avoid">
                  <a
                    href={img.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl border border-border bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.archivo}
                      alt={`${p.titulo}, imagen ${img.id}`}
                      width={img.ancho}
                      height={img.alto}
                      loading="lazy"
                      className="block h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-4">¿Quieres algo así para tu negocio?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Cuéntanos qué necesitas y te decimos cómo lo resolvemos.</p>
          </div>
          <a
            href={whatsappLink(`Hola, vi el proyecto "${p.titulo}" en su portafolio y me gustaría algo así`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity"
          >
            <SiWhatsapp className="w-4 h-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
