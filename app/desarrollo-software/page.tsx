import Image from "next/image";
import {
  Code,
  CircleCheckBig,
  Brain,
  Zap,
  Target,
  Workflow,
  Settings,
  Rocket,
  Smartphone,
  Monitor,
  Globe,
  Cog,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

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
    url: "https://marmocreativo.com/desarrollo-software",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/og-desarrollo-software.jpg",
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
    canonical: "https://marmocreativo.com/desarrollo-software",
  },
};

const techStack = [
  { logo: "/images/tech/react.png", name: "React", description: "Web, iOS + Android" },
  { logo: "/images/tech/electron.png", name: "Electron", description: "Windows + macOS + Linux" },
  { logo: "/images/tech/n8n.png", name: "Automatizaciones", description: "Multiplataforma" },
];

const stats = [
  { value: "70%", title: "Ahorro en Costos", description: "Un código para múltiples plataformas" },
  { value: "50%", title: "Tiempo Reducido", description: "Desarrollo paralelo en lugar de secuencial" },
  { value: "90%", title: "Código Reutilizable", description: "Máximo aprovechamiento del trabajo" },
];

const advantages = [
  { icon: Code, title: "JavaScript Everywhere", description: "Una sola tecnología para web, móvil y escritorio" },
  { icon: Zap, title: "Desarrollo Acelerado", description: "Reutilización de código reduce tiempo y costos" },
  { icon: Target, title: "Enfoque Empresarial", description: "Software que resuelve problemas reales" },
  { icon: Workflow, title: "Integraciones Poderosas", description: "Conectamos con APIs y bases de datos" },
  { icon: Settings, title: "Mantenimiento Simple", description: "Un solo código base para actualizar" },
  { icon: Rocket, title: "Escalabilidad Total", description: "Arquitectura preparada para crecer" },
];

const services = [
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "React Native para iOS y Android con rendimiento nativo",
    price: "Desde $45,000",
    delivery: "15-30 días",
    features: [
      "Una base de código para ambas plataformas",
      "Publicación en stores incluida",
      "Push notifications integradas",
    ],
  },
  {
    icon: Monitor,
    title: "Apps de Escritorio",
    description: "Electron y Tauri para Windows, macOS y Linux",
    price: "Desde $55,000",
    delivery: "20-40 días",
    features: [
      "Multiplataforma: Windows, macOS, Linux",
      "Instaladores automáticos",
      "Auto-updates incluidos",
    ],
  },
  {
    icon: Globe,
    title: "Aplicaciones Web",
    description: "React SPAs y PWAs modernas y escalables",
    price: "Desde $35,000",
    delivery: "10-25 días",
    features: [
      "Single Page Applications (SPA)",
      "Progressive Web Apps (PWA)",
      "Performance ultra-optimizado",
    ],
  },
  {
    icon: Cog,
    title: "Automatizaciones",
    description: "Bots y scripts que eliminan trabajo repetitivo",
    price: "Desde $25,000",
    delivery: "5-15 días",
    features: [
      "Integración con APIs y servicios",
      "Web scraping inteligente",
      "Reportes y notificaciones automáticas",
    ],
  },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/software_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Code className="w-4 h-4 shrink-0" />
                Desarrollo Multiplataforma
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Un Código para
                <span className="text-accent block">
                  Todas las Plataformas
                </span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-secondary-foreground/80 mb-4 sm:mb-8 leading-relaxed">
                Desarrollamos apps móviles, aplicaciones de escritorio, web
                apps y automatizaciones con JavaScript. Una tecnología,
                infinitas posibilidades para tu negocio.
              </p>

              <div className="hidden sm:block space-y-3 mb-8">
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">70% menos costo que desarrollo nativo</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">50% menos tiempo de desarrollo</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <h3 className="hidden sm:block text-lg sm:text-xl font-bold mb-6 text-center">
                Tecnologías que Dominamos
              </h3>

              <div className="space-y-2 sm:space-y-3 mb-6">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white/5 rounded-lg"
                  >
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="w-9 h-9 sm:w-12 sm:h-12 shrink-0"
                    />
                    <div className="text-left flex-1">
                      <div className="font-bold text-sm sm:text-base">{tech.name}</div>
                      <div className="hidden sm:block text-sm text-secondary-foreground/70">
                        {tech.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20platicar%20sobre%20desarrollo%20de%20software"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Platícanos tu Proyecto
                </a>
              </Button>
            </div>
          </div>
        </div>

        <a
          id="siguiente-seccion"
          href="#siguiente-seccion"
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Leer más</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </section>

      {/* Por qué multiplataforma */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Los Números Hablan por Sí Solos.
              </h2>
              <p className="text-xl text-muted-foreground">
                El desarrollo multiplataforma con JavaScript no es una moda:
                es una forma más eficiente de construir software.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="relative overflow-hidden text-center rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 aspect-square flex flex-col items-center justify-center shadow-xl"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-bold text-white/10 select-none leading-none">
                    {stat.value}
                  </span>

                  <h3 className="relative text-lg font-bold mb-2 text-white">
                    {stat.title}
                  </h3>
                  <p className="relative text-white/80 text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Ventajas del Desarrollo JavaScript
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una tecnología moderna que cambia la forma de crear software
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="relative w-full sm:w-[280px] rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 pt-12 mb-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-semibold text-sm mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20consulta%20t%C3%A9cnica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" />
                Solicitar Consulta Técnica
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Servicios de Desarrollo de Software
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones tecnológicas a la medida de cada necesidad de tu
              empresa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary/20 text-secondary border border-secondary/40 px-3 py-1.5 rounded-full font-bold text-sm">
                    {service.price}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{service.delivery}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 py-6 text-base font-semibold hover:opacity-90 transition-opacity"
                  size="lg"
                >
                 <a 
                    href={`https://wa.me/525523995604?text=Hola%2C%20quisiera%20cotizar%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Cotizar
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-neutral-300 bg-white/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                ¿Listo para Digitalizar tu Empresa?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Deja de usar software genérico. Cuéntanos qué necesita tu
                negocio y desarrollemos la solución correcta.
              </p>
            </div>

            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity shrink-0"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20empezar%20mi%20proyecto%20de%20software"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" />
                ¡Empezar Ahora!
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}