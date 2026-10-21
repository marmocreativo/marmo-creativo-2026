import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Code, Monitor, MessageCircle, Palette, QrCode, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/service-page";
import { CtaBand, IconCard, Section, SectionHeader } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";

export const metadata: Metadata = {
  title: "Herramientas Gratuitas para tu Negocio | Marmo Creativo",
  description:
    "Herramientas gratuitas para negocios: generador de QR, botón de WhatsApp y paleta de colores. Gratis, con historial en tu cuenta.",
  alternates: { canonical: "/herramientas" },
};

const disponibles = [
  { icon: QrCode, title: "Generador QR", description: "Crea códigos QR personalizados para cualquier propósito", href: "/herramientas/generador-qr" },
  { icon: MessageCircle, title: "Botón de WhatsApp", description: "Genera botones y enlaces de WhatsApp para tu sitio web", href: "/herramientas/boton-whatsapp" },
  { icon: Palette, title: "Paletas de color", description: "Genera paletas de colores perfectas para tus proyectos", href: "/herramientas/paleta-colores" },
];

const proximamente = [
  { icon: Monitor, title: "Generador de favicon", description: "Crea favicons optimizados para tu sitio web" },
  { icon: Code, title: "Generador CSS", description: "Crea gradientes y efectos CSS con interfaz visual" },
  { icon: Sparkles, title: "Optimizador de imágenes", description: "Optimiza y comprime imágenes sin perder calidad" },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/hero_bg.jpg"
        eyebrow="Herramientas gratuitas"
        title="Herramientas útiles para tu negocio."
        intro="Una colección de herramientas gratuitas para hacer tu trabajo más fácil. Con tu cuenta, guardas un historial de lo que generas."
        bullets={["100% gratuitas", "Historial con tu cuenta"]}
      />

      <Section bg="bg-white">
        <SectionHeader title="Elige una herramienta" text="Úsalas sin costo. Si inicias sesión, guardamos lo que generas para que lo reutilices." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {disponibles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <t.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-light text-foreground mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Usar herramienta <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section bg="bg-neutral-100">
        <SectionHeader title="Próximamente" text="Estamos construyendo estas herramientas. Cuando estén listas las verás aquí." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {proximamente.map((t) => (
            <IconCard
              key={t.title}
              icon={t.icon}
              title={t.title}
              description={t.description}
              footer={
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Próximamente
                </p>
              }
            />
          ))}
        </div>
      </Section>

      <CtaBand
        bg="bg-white"
        title="¿Necesitas algo específico?"
        text="Si no encuentras lo que necesitas, podemos crear una herramienta personalizada para ti: hecha a tu medida, con entrega rápida y precio justo."
        cta="Solicitar cotización"
        href={whatsappLink("Hola, quisiera cotizar una herramienta personalizada")}
      />
    </>
  );
}
