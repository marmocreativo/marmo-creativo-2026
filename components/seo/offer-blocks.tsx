import Link from "next/link";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappLink } from "@/lib/seo/oferta";

const SITE = "https://marmo-creativo.com";

export const incluyeBasico = [
  "Hosting y dominio .com el primer año",
  "Perfil de Google Maps",
  "Botón de WhatsApp",
  "Una ronda de cambios",
];

export function OfferHero({ h1, intro }: { h1: string; intro: string }) {
  return (
    <section className="relative -mt-20 pt-36 pb-16 bg-secondary text-secondary-foreground text-center">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{h1}</h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80">{intro}</p>
        <p className="text-accent font-semibold">
          Desde $3,500 MXN · Garantía: si no está lista en 72 horas hábiles, no la pagas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold"
          >
            <Link href="/empezar">
              Empezar mi página
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-10 py-7 text-lg">
            <Link href="/precios">Ver precios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function IncluyeBloque() {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-2xl border border-primary/20 bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Qué incluye la Página Express</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {incluyeBasico.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CircleCheckBig className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {i}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Renovación anual: $1,500 MXN (.com) o $2,000 MXN (.com.mx / .mx).
          </p>
        </div>
      </div>
    </section>
  );
}

export function CtaFinal({ mensaje }: { mensaje: string }) {
  return (
    <section className="py-16 bg-background text-center">
      <div className="max-w-2xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl font-bold text-primary">¿Empezamos?</h2>
        <p className="text-muted-foreground">Cuéntanos de tu negocio y arrancamos tu página.</p>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold"
        >
          <a href={whatsappLink(mensaje)} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp className="mr-2 w-5 h-5" />
            Escribir por WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

export function RelatedLinks({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-primary mb-6">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-full border border-primary/30 bg-white px-5 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceJsonLd({
  name,
  path,
  area,
}: {
  name: string;
  path: string;
  area?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        url: `${SITE}${path}`,
        provider: { "@type": "Organization", name: "Marmo Creativo", url: SITE },
        areaServed: area ? { "@type": "City", name: area } : "MX",
        offers: { "@type": "Offer", price: "3500", priceCurrency: "MXN" },
      }}
    />
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE}${it.path}`,
        })),
      }}
    />
  );
}
