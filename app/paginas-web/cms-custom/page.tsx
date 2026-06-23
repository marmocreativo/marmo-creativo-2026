import Image from "next/image";
import {
  Award,
  CircleCheckBig,
  ShieldCheck,
  Code2,
  Building,
  Users,
  Infinity as InfinityIcon,
  Search,
  Palette,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "CMS Personalizado / Desarrollo a Medida | Marmo Creativo",
  description:
    "Sistemas de gestión de contenido construidos a la medida de tu negocio, con tecnologías modernas como Laravel, React y Supabase. Cotización a medida según tu proyecto.",
  keywords: [
    "CMS personalizado México",
    "desarrollo de software a medida",
    "sistema de gestión de contenido custom",
    "desarrollo Laravel React México",
    "software empresarial a medida CDMX",
  ],
  openGraph: {
    title: "CMS Personalizado / Desarrollo a Medida | Marmo Creativo",
    description:
      "Sistemas de gestión de contenido construidos a la medida de tu negocio, con tecnologías modernas.",
    url: "https://marmocreativo.com/paginas-web/cms-custom",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/custom/og-cms-custom.jpg",
        width: 1200,
        height: 630,
        alt: "CMS Personalizado / Desarrollo a Medida - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMS Personalizado / Desarrollo a Medida",
    description:
      "Cada línea de código a tu medida. Cotización según tu proyecto.",
  },
  alternates: {
    canonical: "https://marmocreativo.com/paginas-web/cms-custom",
  },
};

const stats = [
  { value: "100%", title: "A Tu Medida", description: "Cada funcionalidad pensada para tu proceso real" },
  { value: "12", title: "Meses de Soporte sin Costo", description: "Acompañamiento extendido después de la entrega" },
  { value: "4", title: "Tecnologías de Vanguardia", description: "Laravel, React, Supabase y TypeScript" },
];

const whenYouNeedIt = [
  { icon: Building, title: "Procesos Únicos", description: "Flujos de trabajo que no se adaptan a soluciones estándar" },
  { icon: Users, title: "Múltiples Roles", description: "Diferentes niveles de acceso y permisos" },
  { icon: InfinityIcon, title: "Escalabilidad Extrema", description: "Una base sólida para crecer significativamente" },
];

const process = [
  { step: "1", title: "Descubrimiento y análisis de requisitos", day: "Fase 1", icon: Search },
  { step: "2", title: "Arquitectura y planificación del sistema", day: "Fase 2", icon: Palette },
  { step: "3", title: "Desarrollo con metodología ágil", day: "Fase 3", icon: Code2 },
  { step: "4", title: "Entrega, capacitación y 12 meses de soporte", day: "Fase 4", icon: Rocket },
];

const examples = [
  { image: "/images/custom/fitbyblue.png", tag: "Fitness", title: "Fit by Blue", description: "Plataforma a medida para gestionar usuarios y procesos propios del negocio", url: "https://fitbyblue.mx" },
  { image: "/images/custom/review.png", tag: "Certificaciones", title: "TOEIC MX", description: "Sistema de gestión de citas y exámenes de certificación construido desde cero", url: "https://toeic.mx" },
  { image: "/images/custom/diahmoes.png", tag: "Negocio a Medida", description: "Diah Moes", title: "Diah Moes", url: "https://www.diahmoes.com.mx" },
];

const includedFeatures = [
  { icon: Code2, title: "100% personalizado", description: "Cada línea de código construida para tu proceso, no una plantilla" },
  { icon: Rocket, title: "Tecnologías modernas", description: "Stack de vanguardia para máximo rendimiento y escalabilidad" },
  { icon: ShieldCheck, title: "Seguridad de nivel empresarial", description: "Protocolos pensados para proteger tu información" },
  { icon: Award, title: "12 meses de soporte después de la entrega", description: "Acompañamiento extendido, sin costo extra" },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/custom_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Code2 className="w-4 h-4 shrink-0" />
                Para negocios cuyos procesos no caben en una solución estándar
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Un CMS Construido
                <span className="text-accent block">
                  para tu Negocio Único
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Cuando las soluciones estándar no cubren lo que tu negocio
                necesita, construimos un sistema a la medida, con tecnologías
                modernas como Laravel, React y Supabase.
              </p>

              <div className="space-y-3 mb-8">
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Cada funcionalidad pensada para tu proceso real</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">12 meses de soporte incluido después de la entrega</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center">
                <h3 className="hidden sm:block text-lg sm:text-xl font-bold mb-2">
                  CMS Personalizado
                </h3>
                <p className="hidden sm:block text-sm text-secondary-foreground/60 mb-6">
                  Construido desde cero, a la medida de tu negocio
                </p>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-bold mb-2 text-accent">
                    Cotización a Medida
                  </div>
                  <div className="hidden sm:block text-sm text-secondary-foreground/60">
                    Cada proyecto es distinto, lo cotizamos según tu alcance
                  </div>
                </div>

                <div className="hidden sm:block text-xs text-secondary-foreground/50 mb-6">
                  Consulta inicial sin costo · Incluye 12 meses de soporte
                </div>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity mt-2 sm:mt-0"
                  size="lg"
                >
                  <a
                    href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20platicar%20sobre%20un%20CMS%20personalizado"
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

      {/* Cuándo lo necesitas */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                ¿Cuándo Necesitas algo Hecho a tu Medida?
              </h2>
              <p className="text-xl text-muted-foreground">
                Las soluciones estándar no siempre cubren las necesidades
                específicas de cada empresa.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {whenYouNeedIt.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
                >
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="relative overflow-hidden text-center rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 aspect-square flex flex-col items-center justify-center shadow-xl"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-bold text-white/10 select-none leading-none">
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
      </section>

      {/* Proceso */}
      <section className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden" style={{ backgroundImage: "url('/images/body_bg.jpg')" }}>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestro Proceso de Desarrollo
            </h2>
            <p className="text-xl text-muted-foreground">
              Metodología ágil, pensada para llegar a un resultado sólido
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item) => (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 bg-white border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br hover:from-accent hover:to-white hover:border-accent/30"
              >
                <span className="absolute top-2 right-4 text-7xl font-bold text-primary/10 select-none leading-none">
                  {item.step}
                </span>

                <item.icon className="relative w-10 h-10 text-primary" />

                <div className="relative">
                  <h3 className="text-lg font-bold mb-2 text-primary">
                    {item.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {item.day}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Proyectos Reales. Sistemas a la Medida.
            </h2>
            <p className="text-xl text-muted-foreground">
              No son maquetas ni plantillas de muestra. Son sistemas
              construidos desde cero para necesidades específicas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {examples.map((example) => (
              <a
                key={example.title}
                href={example.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] block transition-transform duration-300 hover:scale-105 hover:z-10"
              >
                <Image
                  src={example.image}
                  alt={example.title}
                  fill
                  className="object-contain transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                <div className="absolute top-3 left-3 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {example.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="font-semibold text-white mb-1">
                    {example.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {example.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que incluye */}
      <section className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden" style={{ backgroundImage: "url('/images/body_bg.jpg')" }}>
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Lo que Incluye tu Proyecto
            </h2>
            <p className="text-xl text-muted-foreground">
              Cotización a medida · Consulta inicial sin costo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
            {includedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 pt-12 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-semibold text-sm mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/80">
                  {feature.description}
                </p>
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
                ¿Listo para Resolver tu Proceso Único?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Cuéntanos qué necesita tu negocio. Analizamos tu caso y te
                cotizamos el alcance correcto para tu proyecto.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Inversión
                </div>
                <div className="text-3xl font-bold text-primary">
                  Cotización a Medida
                </div>
              </div>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20platicar%20sobre%20un%20CMS%20personalizado"
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
      </section>
    </>
  );
}