import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Image as ImageIcon,
  MessageCircle,
  Search,
  TrendingUp,
} from "lucide-react";
import { Faq } from "@/components/seo/faq";
import { Breadcrumbs, ServiceJsonLd } from "@/components/seo/offer-blocks";
import { ciudades } from "@/lib/seo/ciudades";
import { getGiro, giros } from "@/lib/seo/giros";

export const dynamicParams = false;

export function generateStaticParams() {
  return giros.map((g) => ({ giro: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ giro: string }>;
}): Promise<Metadata> {
  const { giro } = await params;
  const g = getGiro(giro);
  if (!g) return {};
  const path = `/pagina-web-para/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: path },
    openGraph: { title: g.title, description: g.description, url: path },
  };
}

const iconosProblemas = [Search, MessageCircle, TrendingUp];

// TODO: reemplazar por imágenes reales de cada giro (campo `imagen` en lib/seo/giros.ts)
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

export default async function Page({ params }: { params: Promise<{ giro: string }> }) {
  const { giro } = await params;
  const g = getGiro(giro);
  if (!g) notFound();
  const path = `/pagina-web-para/${g.slug}`;

  return (
    <>
      <ServiceJsonLd name={`Página web para ${g.nombre}`} path={path} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Precios", path: "/precios" },
          { name: `Página web para ${g.titulo}`, path },
        ]}
      />

      {/* Hero */}
      <section className="relative -mt-20 bg-black text-white overflow-hidden lg:min-h-[88vh] flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-6 pt-36 md:pt-44 pb-16 lg:pb-24 flex-1 flex items-center">
          <div className="lg:w-[52%]">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">
              Página web para {g.titulo.toLowerCase()}
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
              {g.h1}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
              {g.intro}
            </p>

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

        <div className="relative h-72 lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%]">
          <Image
            src={`/images/giros/${g.slug}/hero.webp`}
            alt={`Página web para ${g.nombre}`}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Problemas comunes */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-10">
            <span className="flex h-6 w-6 items-center justify-center bg-foreground text-background">
              <Search className="w-3.5 h-3.5" />
            </span>
            Problemas comunes
          </div>

          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground max-w-2xl mb-6">
            Tres cosas que te cuesta
            <br />
            clientes sin página web
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-14 md:mb-20">
            Esto es lo que más vemos en negocios de {g.nombre} que todavía no tienen una página propia.
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {g.dolores.map((d, i) => {
              const Icon = iconosProblemas[i % iconosProblemas.length];
              return (
                <div key={d.titulo}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 mb-6">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">{d.titulo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{d.texto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qué lleva tu página */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">
              Qué lleva tu página
              <br />
              web para {g.titulo.toLowerCase()}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Una estructura pensada para que quien te encuentra en Google entienda rápido qué haces y te
              escriba.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.secciones.map((s, i) => (
              <div
                key={s}
                className="flex flex-col rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="p-6 md:p-7 flex-1">
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-light leading-snug text-foreground">{s}</h3>
                </div>
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image
                    src={`/images/giros/${g.slug}/card-0${i + 1}.jpg`}
                    alt={s}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={g.faqs} />

      {/* Atendemos tu ciudad */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Atendemos tu ciudad
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Trabajamos 100% en línea, con el mismo precio y el mismo tiempo de entrega en todo México.
            </p>
          </div>

          <div className="rounded-xl border border-foreground/80 bg-white overflow-hidden">
            <div className="bg-neutral-100 border-b border-foreground/80 px-6 py-5">
              <h3 className="text-xl font-light text-foreground">Páginas web por ciudad</h3>
            </div>
            <ul className="divide-y divide-border">
              {ciudades.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/pagina-web/${c.slug}`}
                    className="group flex items-center justify-between px-6 py-4 text-foreground hover:bg-neutral-50 transition-colors"
                  >
                    <span>{c.nombre}</span>
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