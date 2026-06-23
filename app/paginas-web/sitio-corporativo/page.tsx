import Image from "next/image";
import {
  Award,
  CircleCheckBig,
  Clock,
  ShieldCheck,
  Building2,
  Search,
  Palette,
  Code2,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "Sitio Corporativo para Empresas Grandes | Marmo Creativo",
  description:
    "Un sitio web a la altura de tu empresa: múltiples secciones, estructura sólida y presencia digital que respalda tu trayectoria. Desde $7,000 MXN, entrega en 3-4 semanas.",
  keywords: [
    "sitio corporativo para empresas México",
    "página web para empresa grande",
    "desarrollo web corporativo CDMX",
    "sitio web institucional profesional",
    "página web empresarial Next.js",
  ],
  openGraph: {
    title: "Sitio Corporativo para Empresas Grandes | Marmo Creativo",
    description:
      "Un sitio web a la altura de tu empresa: múltiples secciones, estructura sólida y presencia digital que respalda tu trayectoria.",
    url: "https://marmocreativo.com/paginas-web/sitio-corporativo",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/corporativo/og-sitio-corporativo.jpg",
        width: 1200,
        height: 630,
        alt: "Sitio Corporativo para Empresas Grandes - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitio Corporativo para Empresas Grandes",
    description:
      "Estructura sólida, varias secciones, presencia digital seria. Desde $7,000 MXN.",
  },
  alternates: {
    canonical: "https://marmocreativo.com/paginas-web/sitio-corporativo",
  },
};

const stats = [
  { value: "5+", title: "Secciones a Medida", description: "Inicio, nosotros, servicios, equipo, contacto y más" },
  { value: "3-4", title: "Semanas de Entrega", description: "El tiempo necesario para una estructura sólida, sin atajos" },
];

const process = [
  { step: "1", title: "Análisis de tu empresa y estructura de contenido", day: "Semana 1", icon: Search },
  { step: "2", title: "Arquitectura del sitio y diseño visual", day: "Semana 1-2", icon: Palette },
  { step: "3", title: "Desarrollo de todas las secciones", day: "Semana 2-3", icon: Code2 },
  { step: "4", title: "Revisión, ajustes y entrega final", day: "Semana 4", icon: Rocket },
];

const examples = [
  { image: "/images/corporativo/reikitamashi.png", tag: "Holisticos", title: "Reiki Tamashi", description: "Un sitio con varias secciones que organiza servicios, equipo y contacto sin perder claridad", url: "https://reikitamashi.com" },
  { image: "/images/corporativo/geneticlab.png", tag: "Laboratorios y medicina", title: "Geneticlab", description: "aboratorio de diagnóstico molecular oncológico fundado en 2019, con más de 5,300 pruebas procesadas para médicos oncólogos, instituciones clínicas y laboratorios de referencia en México.", url: "https://geneticlab.mx" },
];

const includedFeatures = [
  { icon: Building2, title: "Estructura completa para empresas grandes", description: "Varias secciones organizadas: nosotros, servicios, equipo y más" },
  { icon: ShieldCheck, title: "Presencia digital que respalda tu trayectoria", description: "Diseño serio, acorde al tamaño y peso de tu empresa" },
  { icon: Clock, title: "Entrega en 3-4 semanas", description: "El tiempo justo para una estructura sólida, bien planeada" },
  { icon: Award, title: "3 meses de soporte después de la entrega", description: "Ajustes y acompañamiento incluidos sin costo extra" },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/corporativo_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4 shrink-0" />
                Para empresas que necesitan una estructura sólida, no una sola página
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Un Sitio Web a la Altura
                <span className="text-accent block">
                  de tu Empresa
                </span>
              </h1>

              <p className="hidden sm:block text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Si tu empresa ya tiene trayectoria, necesitas algo más que una
                landing page: un sitio con varias secciones que organice toda
                tu información y transmita la solidez que tu negocio ya tiene.
              </p>

              <div className="space-y-3 mb-8">
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Varias secciones, cada una con su propósito claro</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">3-4 semanas de entrega, con 3 meses de soporte incluido</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Sitio Corporativo para tu Empresa
                </h3>
                <p className="hidden sm:block text-sm text-secondary-foreground/60 mb-6">
                  Diseño y desarrollo a medida, con estructura completa
                </p>

                <div className="mb-6">
                  <div className="text-sm text-secondary-foreground/60 mb-1">
                    Desde
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2 text-accent">
                    $7,000 MXN
                  </div>
                </div>

                <div className="hidden sm:block text-xs text-secondary-foreground/50 mb-6">
                  No incluye dominio ni hosting · Incluye 3 meses de soporte
                </div>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity mt-2 sm:mt-0"
                  size="lg"
                >
                  <a
                    href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20un%20sitio%20corporativo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Quiero mi Sitio Corporativo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <a
          id="siguiente-seccion"
          href="#siguiente-seccion"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Leer más</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </section>

      {/* Por qué un sitio corporativo */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Tu Empresa Ya Creció. Tu Sitio Web Debe Reflejarlo.
              </h2>
              <p className="text-xl text-muted-foreground">
                Una sola página no alcanza para comunicar todo lo que tu
                empresa ofrece. Necesitas estructura, orden y varias secciones
                que respalden tu trayectoria.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* Proceso */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              De una Estructura Dispersa, a un Sitio Completo y Sólido
            </h2>
            <p className="text-xl text-muted-foreground">
              3-4 semanas, un proceso ordenado, pensado para empresas con historia
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
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Empresas Reales. Estructuras Reales.
              </h2>
              <p className="text-xl text-muted-foreground">
                No son maquetas ni plantillas de muestra. Son empresas que
                organizaron toda su información en un sitio completo y serio.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* Lo que incluye */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Lo que Incluye tu Inversión
            </h2>
            <p className="text-xl text-muted-foreground">
              Desde $7,000 MXN · No incluye dominio ni hosting
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
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-neutral-300 bg-neutral-200/40 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                ¿Listo para un Sitio a la Altura de tu Empresa?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Cuéntanos sobre tu empresa y la estructura que necesitas. Desde
                ahí definimos el alcance correcto para tu proyecto.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Inversión desde
                </div>
                <div className="text-4xl font-bold text-primary">
                  $7,000 MXN
                </div>
              </div>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20un%20sitio%20corporativo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Quiero mi Sitio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}