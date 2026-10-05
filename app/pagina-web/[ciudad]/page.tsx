import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Faq } from "@/components/seo/faq";
import { Breadcrumbs, ServiceJsonLd } from "@/components/seo/offer-blocks";
import { ciudades, getCiudad } from "@/lib/seo/ciudades";
import { giros } from "@/lib/seo/giros";

export const dynamicParams = false;

export function generateStaticParams() {
  return ciudades.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}): Promise<Metadata> {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) return {};
  const path = `/pagina-web/${c.slug}`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: path },
    openGraph: { title: c.title, description: c.description, url: path },
  };
}

// TODO: reemplazar por imágenes reales de cada zona (campo `imagen` en lib/seo/ciudades.ts)
function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-500 ${className}`}
    >
      <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
      <span className="text-xs">{label}</span>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) notFound();
  const path = `/pagina-web/${c.slug}`;

  const ventajas = [
    {
      icon: MessageCircle,
      title: "Atención 100% en línea",
      description: `Trabajamos por WhatsApp y videollamada, así que no tienes que trasladarte en ${c.nombre}.`,
    },
    {
      icon: MapPin,
      title: "Perfil de Google para tu zona",
      description: `Configuramos tu perfil de Google Maps para que te encuentren cerca de ti, en ${c.nombre}.`,
    },
    {
      icon: Clock,
      title: "Lista en 72 horas",
      description: "Mismo precio y mismo tiempo de entrega que en cualquier ciudad de México.",
    },
  ];

  return (
    <>
      <ServiceJsonLd name={`Diseño de páginas web en ${c.nombre}`} path={path} area={c.nombre} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Precios", path: "/precios" },
          { name: `Páginas web en ${c.nombre}`, path },
        ]}
      />

      {/* Hero */}
      <section className="relative -mt-20 text-white overflow-hidden lg:min-h-[88vh] flex items-center">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/web_bg.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

        <div className="max-w-7xl w-full mx-auto px-6 pt-36 md:pt-44 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">
              Páginas web en {c.nombre}
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
              {c.h1}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">{c.intro}</p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/empezar"
                className="inline-flex items-center justify-between gap-6 bg-white text-black px-7 py-4 text-base font-medium hover:bg-white/90 transition-colors"
              >
                Empezar mi página
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center justify-center border border-white/70 px-7 py-4 text-base font-medium hover:bg-white hover:text-black transition-colors"
              >
                Ver precios
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {["Lista en 72 horas", "Google Maps incluido", "Desde $3,500 MXN"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-10">
            <span className="flex h-6 w-6 items-center justify-center bg-foreground text-background">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            Cómo trabajamos
          </div>

          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground max-w-2xl mb-6">
            Cómo trabajamos con
            <br />
            negocios de {c.nombre}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-14 md:mb-20">
            {c.contexto}
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {ventajas.map((v) => (
              <div key={v.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 mb-6">
                  <v.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas que atendemos */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">
              Zonas que atendemos
              <br />
              en {c.nombre}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tu perfil de Google puede indicar las zonas donde das servicio para que te encuentren
              quienes buscan cerca.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.zonas.map((z, i) => (
              <div
                key={z}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-light leading-snug text-foreground">{z}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={c.faqs} />

      {/* Página web para tu giro */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Página web para tu giro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Tenemos una plantilla pensada para cada tipo de negocio, con las secciones que tu cliente
              espera ver.
            </p>
          </div>

          <div className="rounded-xl border border-foreground/80 bg-white overflow-hidden">
            <div className="bg-neutral-100 border-b border-foreground/80 px-6 py-5">
              <h3 className="text-xl font-light text-foreground">Páginas web por giro</h3>
            </div>
            <ul className="divide-y divide-border">
              {giros.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/pagina-web-para/${g.slug}`}
                    className="group flex items-center justify-between px-6 py-4 text-foreground hover:bg-neutral-50 transition-colors"
                  >
                    <span>{g.titulo}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}