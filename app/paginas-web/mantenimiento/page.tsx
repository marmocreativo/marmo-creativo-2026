import { Database, RefreshCw, Search, Shield, Zap } from "lucide-react";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";
import { PageHero } from "@/components/site/service-page";
import { CtaBand, IconCard, PlansTable, Section, SectionHeader, SplitSection, StatCard, type Plan } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";

export const metadata = {
  title: "Mantenimiento Web para Empresas Grandes | Marmo Creativo",
  description:
    "Si tu sitio fue abandonado por negligencia propia o de tu desarrollador anterior, lo rescatamos y lo mantenemos seguro, actualizado y funcionando. Planes desde $800 MXN/mes.",
  keywords: [
    "mantenimiento web para empresas México",
    "rescate de sitio web abandonado",
    "mantenimiento WordPress empresarial",
    "soporte web mensual CDMX",
    "sitio web abandonado por desarrollador",
  ],
  openGraph: {
    title: "Mantenimiento Web para Empresas Grandes | Marmo Creativo",
    description:
      "Si tu sitio fue abandonado por negligencia propia o de tu desarrollador anterior, lo rescatamos y lo mantenemos funcionando.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Mantenimiento Web para Empresas Grandes - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantenimiento Web para Empresas Grandes",
    description:
      "Rescatamos sitios abandonados y los mantenemos funcionando. Desde $800 MXN/mes.",
  },
  alternates: {
    canonical: "/paginas-web/mantenimiento",
  },
};

const whyCritical = [
  { value: "30K", title: "Sitios hackeados diarios", description: "Tu sitio puede ser el siguiente si nadie lo vigila" },
  { value: "24/7", title: "Monitoreo continuo", description: "Vigilancia constante, no revisiones esporádicas" },
  { value: "90%", title: "Uptime garantizado", description: "Siempre disponible para tus clientes" },
];

const services = [
  { icon: Shield, title: "Seguridad avanzada", description: "Protección 24/7 contra malware y hackers" },
  { icon: RefreshCw, title: "Updates automáticos", description: "WordPress, plugins y temas siempre actualizados" },
  { icon: Database, title: "Backups seguros", description: "Copias automáticas en la nube" },
  { icon: Zap, title: "Optimización de velocidad", description: "Sitio rápido y mejor ranking SEO" },
  { icon: Search, title: "Monitoreo SEO", description: "Seguimiento constante del posicionamiento" },
];

const plans: Plan[] = [
  {
    name: "Cuidado Esencial",
    price: "$800",
    unit: "MXN + IVA / mes",
    lead: "Lo mínimo para que tu sitio no quede a la deriva",
    items: ["Backup semanal automático", "Updates de seguridad básicos", "Monitoreo uptime 24/7", "Soporte por email"],
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Cuidado Esencial"),
    external: true,
  },
  {
    name: "Cuidado Activo",
    badge: "Más elegido",
    price: "$1,500",
    unit: "MXN + IVA / mes",
    lead: "Mantenimiento constante para empresas con presencia activa",
    items: ["Backup diario automático", "Updates completos", "Soporte por WhatsApp", "Hasta 5 cambios al mes"],
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Cuidado Activo"),
    external: true,
    featured: true,
  },
  {
    name: "Cuidado Total",
    price: "$2,800",
    unit: "MXN + IVA / mes",
    lead: "Para empresas grandes que no pueden permitirse otro abandono",
    items: ["Backup diario + versionado", "Updates inmediatos", "Soporte prioritario", "Cambios ilimitados"],
    cta: "Contratar",
    href: whatsappLink("Hola, me interesa el plan Cuidado Total"),
    external: true,
  },
];

const testimonials = [
  {
    image: "/images/wordpress/capetillo.png",
    company: "Capetillo Producciones",
    name: "Alberto Capetillo",
    quote: "Rediseñaron nuestro sitio desde cero después de perder el dominio anterior. Hoy tenemos más de 300 artistas posicionados y generamos más de 30 leads al mes.",
  },
  {
    image: "/images/corporativo/geneticlab.png",
    company: "Genetic Lab",
    name: "Leopoldo Maciel",
    quote: "No solo rediseñaron nuestras páginas: desarrollaron herramientas a la medida para nuestros procesos internos. Eso fue lo que realmente cambió la forma en que operamos.",
  },
  {
    image: "/images/custom/review.png",
    company: "TOEIC MX",
    name: "Antonio Pérez Martínez",
    quote: "Rediseñaron y actualizaron nuestro sitio, lo posicionaron correctamente y hoy recibimos más de 3 mil visitas al mes.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/mantenimiento_bg.jpg"
        eyebrow="Para empresas que ya vivieron un sitio abandonado"
        title="Tu sitio no debería quedar abandonado otra vez"
        intro="Ya sea por descuido propio o porque el desarrollador anterior desapareció, un sitio sin mantenimiento es un riesgo real para una empresa grande. Nosotros lo rescatamos y lo mantenemos funcionando."
        bullets={["Protección 24/7 contra hackers y caídas", "Backups automáticos y soporte continuo"]}
      >
        <div className="bg-white text-foreground p-6 sm:p-8 shadow-2xl">
          <p className="text-xs tracking-[0.15em] uppercase text-primary">Riesgo real</p>
          <h2 className="mt-2 text-2xl font-light">La realidad de los sitios abandonados</h2>
          <div className="mt-6 grid grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-white p-4">
              <div className="text-3xl font-light">30,000</div>
              <div className="mt-1 text-xs text-muted-foreground">sitios hackeados diariamente</div>
            </div>
            <div className="bg-white p-4">
              <div className="text-3xl font-light">$50K+</div>
              <div className="mt-1 text-xs text-muted-foreground">costo promedio de un ataque</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-foreground">
            Con mantenimiento profesional, tu sitio deja de ser un riesgo.
          </p>
        </div>
      </PageHero>

      <SplitSection
        bg="bg-white"
        title="El abandono sale más caro que el mantenimiento."
        text="Una empresa grande no puede darse el lujo de que su sitio web quede sin nadie a cargo, sin importar de quién fue la falla."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {whyCritical.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>
      </SplitSection>

      <Section bg="bg-neutral-100">
        <SectionHeader
          title="Servicios incluidos"
          text="Protección integral que mantiene tu sitio funcionando, sin que vuelva a depender de la buena voluntad de alguien."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <IconCard key={s.title} {...s} />
          ))}
        </div>
      </Section>

      <Section bg="bg-white">
        <SectionHeader
          title="Empresas que rescatamos. Resultados reales."
          text="No son maquetas ni casos hipotéticos. Son empresas que volvieron a tener un sitio funcionando como debería."
        />
        <TestimonialsSlider items={testimonials} />
      </Section>

      <Section bg="bg-neutral-100">
        <SectionHeader title="Planes de mantenimiento mensual" text="Sin compromisos largos. Cancela cuando quieras." />
        <PlansTable plans={plans} />
      </Section>

      <CtaBand
        bg="bg-white"
        title="No dejes que tu sitio se abandone otra vez"
        text="Cuéntanos en qué estado está tu sitio actual. Lo evaluamos y te ayudamos a elegir el plan correcto para tu empresa."
        priceLabel="Planes desde"
        price="$800 MXN"
        cta="Quiero proteger mi sitio"
        href={whatsappLink("Hola, quisiera saber más sobre mantenimiento web")}
      />
    </>
  );
}
