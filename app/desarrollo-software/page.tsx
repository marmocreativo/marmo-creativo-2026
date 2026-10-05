import Image from "next/image";
import { Cog, Code, Globe, Monitor, Rocket, Settings, Smartphone, Target, Workflow, Zap } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { PageHero } from "@/components/site/service-page";
import { CtaBand, IconCard, PlansTable, Section, SectionHeader, SplitSection, StatCard, type Plan } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";

export const metadata = {
  title: "Desarrollo de Software a Medida | Marmo Creativo",
  description:
    "Apps móviles, aplicaciones de escritorio, web apps y automatizaciones con JavaScript multiplataforma. Un código, infinitas posibilidades para tu negocio.",
  keywords: [
    "desarrollo de software México",
    "desarrollo de apps multiplataforma",
    "React Native Electron automatizaciones",
    "desarrollo de aplicaciones a medida CDMX",
    "software empresarial JavaScript",
  ],
  openGraph: {
    title: "Desarrollo de Software a Medida | Marmo Creativo",
    description:
      "Apps móviles, aplicaciones de escritorio, web apps y automatizaciones con JavaScript multiplataforma.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-desarrollo.jpg",
        width: 1200,
        height: 630,
        alt: "Desarrollo de Software a Medida - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de Software a Medida",
    description:
      "Un código, infinitas posibilidades. Apps móviles, escritorio, web y automatizaciones.",
  },
  alternates: {
    canonical: "/desarrollo-software",
  },
};

const techStack = [
  { logo: "/images/tech/react.png", name: "React", description: "Web, iOS + Android" },
  { logo: "/images/tech/electron.png", name: "Electron", description: "Windows + macOS + Linux" },
  { logo: "/images/tech/n8n.png", name: "Automatizaciones", description: "Multiplataforma" },
];

const stats = [
  { value: "70%", title: "Ahorro en costos", description: "Un código para múltiples plataformas" },
  { value: "50%", title: "Tiempo reducido", description: "Desarrollo paralelo en lugar de secuencial" },
  { value: "90%", title: "Código reutilizable", description: "Máximo aprovechamiento del trabajo" },
];

const advantages = [
  { icon: Code, title: "JavaScript everywhere", description: "Una sola tecnología para web, móvil y escritorio" },
  { icon: Zap, title: "Desarrollo acelerado", description: "Reutilización de código reduce tiempo y costos" },
  { icon: Target, title: "Enfoque empresarial", description: "Software que resuelve problemas reales" },
  { icon: Workflow, title: "Integraciones poderosas", description: "Conectamos con APIs y bases de datos" },
  { icon: Settings, title: "Mantenimiento simple", description: "Un solo código base para actualizar" },
  { icon: Rocket, title: "Escalabilidad total", description: "Arquitectura preparada para crecer" },
];

const services: (Plan & { icon: typeof Cog })[] = [
  {
    icon: Smartphone,
    name: "Apps móviles",
    price: "$45,000",
    unit: "MXN desde",
    note: "Entrega: 15-30 días",
    lead: "React Native para iOS y Android con rendimiento nativo",
    items: ["Una base de código para ambas plataformas", "Publicación en stores incluida", "Push notifications integradas"],
    cta: "Cotizar",
    href: whatsappLink("Hola, quisiera cotizar Apps Móviles"),
    external: true,
  },
  {
    icon: Monitor,
    name: "Apps de escritorio",
    price: "$55,000",
    unit: "MXN desde",
    note: "Entrega: 20-40 días",
    lead: "Electron y Tauri para Windows, macOS y Linux",
    items: ["Multiplataforma: Windows, macOS, Linux", "Instaladores automáticos", "Auto-updates incluidos"],
    cta: "Cotizar",
    href: whatsappLink("Hola, quisiera cotizar Apps de Escritorio"),
    external: true,
  },
  {
    icon: Globe,
    name: "Aplicaciones web",
    price: "$35,000",
    unit: "MXN desde",
    note: "Entrega: 10-25 días",
    lead: "React SPAs y PWAs modernas y escalables",
    items: ["Single Page Applications (SPA)", "Progressive Web Apps (PWA)", "Performance ultra-optimizado"],
    cta: "Cotizar",
    href: whatsappLink("Hola, quisiera cotizar Aplicaciones Web"),
    external: true,
  },
  {
    icon: Cog,
    name: "Automatizaciones",
    price: "$25,000",
    unit: "MXN desde",
    note: "Entrega: 5-15 días",
    lead: "Bots y scripts que eliminan trabajo repetitivo",
    items: ["Integración con APIs y servicios", "Web scraping inteligente", "Reportes y notificaciones automáticas"],
    cta: "Cotizar",
    href: whatsappLink("Hola, quisiera cotizar Automatizaciones"),
    external: true,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/software_bg.jpg"
        eyebrow="Desarrollo multiplataforma"
        title="Un código para todas las plataformas."
        intro="Desarrollamos apps móviles, aplicaciones de escritorio, web apps y automatizaciones con JavaScript. Una tecnología, infinitas posibilidades para tu negocio."
        bullets={["70% menos costo que desarrollo nativo", "50% menos tiempo de desarrollo"]}
      >
        <div className="bg-white text-foreground p-6 sm:p-8 shadow-2xl">
          <h2 className="text-2xl font-light">Tecnologías que dominamos</h2>
          <div className="mt-6 grid grid-cols-3 gap-px bg-border border border-border">
            {techStack.map((t) => (
              <div key={t.name} className="bg-white p-4 flex flex-col items-center text-center">
                <Image src={t.logo} alt={t.name} width={48} height={48} className="h-12 w-12 object-contain" />
                <div className="mt-3 text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.description}</div>
              </div>
            ))}
          </div>
          <a
            href={whatsappLink("Hola, quisiera platicar sobre desarrollo de software")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <SiWhatsapp className="w-4 h-4" />
            Platícanos tu proyecto
          </a>
        </div>
      </PageHero>

      <SplitSection
        bg="bg-white"
        title="Los números hablan por sí solos."
        text="El desarrollo multiplataforma con JavaScript no es una moda: es una forma más eficiente de construir software."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>
      </SplitSection>

      <Section bg="bg-neutral-100">
        <SectionHeader
          title="Ventajas del desarrollo JavaScript"
          text="Una tecnología moderna que cambia la forma de crear software."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a) => (
            <IconCard key={a.title} {...a} />
          ))}
        </div>
      </Section>

      <Section bg="bg-white">
        <SectionHeader
          title="Servicios de desarrollo de software"
          text="Soluciones tecnológicas a la medida de cada necesidad de tu empresa."
        />
        <PlansTable plans={services} cols={4} />
      </Section>

      <CtaBand
        bg="bg-neutral-100"
        title="¿Listo para digitalizar tu empresa?"
        text="Deja de usar software genérico. Cuéntanos qué necesita tu negocio y desarrollemos la solución correcta."
        cta="Empezar ahora"
        href={whatsappLink("Hola, quisiera empezar mi proyecto de software")}
      />
    </>
  );
}
