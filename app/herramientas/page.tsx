import type { Metadata } from "next";
import { Clock, Code, Monitor, MessageCircle, Palette, QrCode, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/service-page";
import { CtaBand, IconCard, Section, SectionHeader } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";

export const metadata: Metadata = {
  title: "Herramientas Gratuitas para tu Negocio | Marmo Creativo",
  description:
    "Herramientas gratuitas para negocios: generador de QR, botón de WhatsApp y paleta de colores. Próximamente en Marmo Creativo.",
  alternates: { canonical: "/herramientas" },
  // Sin herramientas terminadas, el índice es contenido delgado. Quitar cuando haya al menos una lista.
  robots: { index: false },
};

const tools = [
  { icon: QrCode, title: "Generador QR", description: "Crea códigos QR personalizados para cualquier propósito" },
  { icon: MessageCircle, title: "Botón de WhatsApp", description: "Genera botones y enlaces de WhatsApp para tu sitio web" },
  { icon: Palette, title: "Paletas de color", description: "Genera paletas de colores perfectas para tus proyectos" },
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
        intro="Una colección de herramientas gratuitas para hacer tu trabajo más fácil: sin costo, sin registro, listas para usar."
        bullets={["100% gratuitas", "Fáciles de usar"]}
      />

      <Section bg="bg-white">
        <SectionHeader
          title="Próximamente"
          text="Estamos construyendo estas herramientas. Cuando estén listas las verás aquí."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t) => (
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
        bg="bg-neutral-100"
        title="¿Necesitas algo específico?"
        text="Si no encuentras lo que necesitas, podemos crear una herramienta personalizada para ti: hecha a tu medida, con entrega rápida y precio justo."
        cta="Solicitar cotización"
        href={whatsappLink("Hola, quisiera cotizar una herramienta personalizada")}
      />
    </>
  );
}
