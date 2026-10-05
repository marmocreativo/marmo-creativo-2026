import Image from "next/image";
import { Award, Briefcase, Globe, Package, Printer, Target } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { PageHero } from "@/components/site/service-page";
import { btnDark, btnLight, CtaBand, IconCard, PlansTable, Section, SectionHeader, SplitSection, type Plan } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Diseño Gráfico Profesional | Marmo Creativo",
  description:
    "Branding completo, contenido para redes sociales y material gráfico que hacen que tu marca destaque. Identidades visuales memorables desde $3,000 MXN.",
  keywords: [
    "diseño gráfico México",
    "branding y diseño de marca CDMX",
    "diseño para redes sociales",
    "diseño de logo profesional",
    "identidad visual empresarial",
  ],
  openGraph: {
    title: "Diseño Gráfico Profesional | Marmo Creativo",
    description:
      "Branding completo, contenido para redes sociales y material gráfico que hacen que tu marca destaque.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Diseño Gráfico Profesional - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño Gráfico Profesional",
    description:
      "Diseños que impactan. Branding, redes sociales y material gráfico.",
  },
  alternates: {
    canonical: "/diseno-grafico",
  },
};

const heroServices = [
  { icon: Briefcase, title: "Branding completo", price: "Desde $3,000" },
  { icon: SiInstagram, title: "Redes sociales", price: "Desde $1,500/mes" },
  { icon: Printer, title: "Material gráfico", price: "Cotización personalizada" },
];

const gallery = [
  { image: "/images/grafico/grafico-1.png", title: "70 Aniversario Sonora Santanera", tag: "Redes" },
  { image: "/images/grafico/grafico-3.png", title: "Logo CES ENERGY", tag: "Branding" },
  { image: "/images/grafico/grafico-5.png", title: "Glass Studio", tag: "Branding" },
  { image: "/images/grafico/grafico-6.png", title: "CREE-IXE", tag: "Redes sociales" },
  { image: "/images/grafico/grafico-9.png", title: "Key Productions", tag: "Impresos" },
  { image: "/images/grafico/grafico-12.png", title: "Capetillo Producciones", tag: "Redes sociales" },
];

const brandingIncludes = [
  { icon: Target, title: "Identidad corporativa" },
  { icon: Briefcase, title: "Papelería empresarial" },
  { icon: Package, title: "Packaging y etiquetas" },
  { icon: Globe, title: "Aplicaciones digitales" },
  { icon: Printer, title: "Material publicitario" },
  { icon: Award, title: "Manual de marca" },
];

const socialPlans: Plan[] = [
  {
    name: "Básico",
    price: "$2,200",
    unit: "MXN / mes",
    lead: "Contenido esencial para redes sociales",
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Básico de redes sociales"),
    external: true,
  },
  {
    name: "Profesional",
    badge: "Más popular",
    price: "$4,000",
    unit: "MXN / mes",
    lead: "Contenido completo para múltiples plataformas",
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Profesional de redes sociales"),
    external: true,
    featured: true,
  },
  {
    name: "Premium",
    price: "$7,000",
    unit: "MXN / mes",
    lead: "Suite completa de contenido premium",
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Premium de redes sociales"),
    external: true,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/grafico_bg.jpg"
        eyebrow="Diseño gráfico profesional"
        title="Tu marca merece diseños que impacten."
        intro="Creamos identidades visuales memorables, contenido para redes sociales y soluciones gráficas que hacen que tu marca destaque."
        actions={
          <a href="#trabajos" className={btnLight}>
            Ver nuestros trabajos
            <ChevronRight className="w-4 h-4" />
          </a>
        }
      >
        <div className="bg-white text-foreground shadow-2xl">
          <div className="px-6 sm:px-8 py-6 border-b border-border">
            <h2 className="text-2xl font-light">Lo que hacemos</h2>
          </div>
          <ul className="divide-y divide-border">
            {heroServices.map((s) => (
              <li key={s.title} className="flex items-center gap-4 px-6 sm:px-8 py-5">
                <s.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="flex-1">{s.title}</span>
                <span className="text-sm text-muted-foreground">{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <Section bg="bg-white" id="trabajos">
        <SectionHeader
          title="Nuestros trabajos de diseño"
          text="Una muestra de proyectos reales que reflejan la calidad de nuestros diseños."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((g) => (
            <div
              key={g.title}
              className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{g.tag}</span>
                <h3 className="mt-2 text-xl font-light text-foreground">{g.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SplitSection
        bg="bg-neutral-100"
        title="Branding completo desde $3,000"
        text="Creamos la identidad visual completa de tu marca, pensada para conectar con tu audiencia. Entrega: 10-15 días."
        extra={
          <a
            href={whatsappLink("Hola, quisiera mi branding completo")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnDark} mt-8`}
          >
            Solicitar mi diseño
            <ChevronRight className="w-4 h-4" />
          </a>
        }
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {brandingIncludes.map((b) => (
            <IconCard key={b.title} {...b} />
          ))}
        </div>
      </SplitSection>

      <Section bg="bg-white">
        <SectionHeader
          title="Paquetes para redes sociales"
          text="Contenido visual profesional que hace crecer tu presencia digital."
        />
        <PlansTable plans={socialPlans} />
      </Section>

      <CtaBand
        bg="bg-neutral-100"
        title="¿Listo para destacar visualmente?"
        text="Tu marca merece diseños que generen impacto. Empecemos a crear algo extraordinario juntos."
        cta="Empezar ahora"
        href={whatsappLink("Hola, quisiera empezar mi proyecto de diseño")}
      />
    </>
  );
}
