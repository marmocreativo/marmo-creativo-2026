import Image from "next/image";
import {
  Award,
  CircleCheckBig,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  Wrench,
  Search,
  Palette,
  Code2,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "Landing Pages para Empresas con Trayectoria | Marmo Creativo",
  description:
    "Si no tienes presencia en línea, o la que tienes está vieja, una landing page simple y directa resuelve eso. Diseño a medida desde $5,000 MXN, entrega en 2 semanas.",
  keywords: [
    "landing page para empresas México",
    "landing page simple y rápida de implementar",
    "página web para negocio sin sitio web",
    "landing page profesional CDMX",
    "página web para empresa con trayectoria",
    "desarrollo web Next.js México",
  ],
  openGraph: {
    title: "Landing Pages para Empresas con Trayectoria | Marmo Creativo",
    description:
      "Si no tienes presencia en línea, o la que tienes está vieja, una landing page simple y directa resuelve eso.",
    url: "https://marmocreativo.com/paginas-web/landing-pages",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/landing/og-landing-pages.jpg",
        width: 1200,
        height: 630,
        alt: "Landing Pages para Empresas con Trayectoria - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Pages para Empresas con Trayectoria",
    description:
      "Simple, directa y a la altura de tu empresa. Desde $5,000 MXN.",
  },
  alternates: {
    canonical: "https://marmocreativo.com/paginas-web/landing-pages",
  },
};

const stats = [
  { value: "1", title: "Sola Página, Bien Hecha", description: "Sin secciones de relleno, sin contenido que nadie va a leer" },
  { value: "2", title: "Semanas de Entrega", description: "El tiempo justo para hacerlo bien sin que se alargue" },
  { value: "3", title: "Meses de Soporte sin Costo", description: "Ajustes y acompañamiento incluidos después de la entrega" },
];

const process = [
  { step: "1", title: "Entendemos qué necesitas comunicar", day: "Semana 1", icon: Search },
  { step: "2", title: "Diseñamos con tu contenido real", day: "Semana 1", icon: Palette },
  { step: "3", title: "Construimos y probamos en todos los dispositivos", day: "Semana 2", icon: Code2 },
  { step: "4", title: "Entrega y 2 meses de soporte", day: "Semana 2", icon: Rocket },
];

const examples = [
  { image: "/images/landing/electro-embobinados-v.png", tag: "Industria Pesada", title: "Electro Embobinados Industriales", description: "Pasaron de no tener presencia en línea a una página que comunica sus 40 años de experiencia con la seriedad que merecen", url: "https://electroembobinadosindustriales.com" },
  { image: "/images/landing/ascentica-v.png", tag: "Hospitales y Corporativos", title: "Ascentica Elevadores", description: "Una sola página, enfocada en una sola cosa: que el cliente correcto los encuentre y los contacte de inmediato", url: "https://elevadoresascentica.com.mx/elevador-fuera-de-servicio/" },
];

const includedFeatures = [
  { icon: Wrench, title: "Contenido real de tu negocio, no relleno genérico", description: "Tus servicios, tus números, tu forma de trabajar — no textos de plantilla" },
  { icon: ShieldCheck, title: "Se ve igual de seria en el celular que en la laptop", description: "Tu cliente la va a abrir desde WhatsApp, no solo desde escritorio" },
  { icon: Clock, title: "Lista en 2 semanas, sin vueltas", description: "Una sola página, hecha con cuidado, sin procesos eternos" },
  { icon: Award, title: "2 meses de soporte después de la entrega", description: "Si algo necesita ajuste, ahí estamos — sin costo extra" },
];


export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 shrink-0" />
                Para empresas que necesitan resolver esto simple y directo
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                ¿Tu Negocio No Tiene Presencia en Línea,
                <span className="text-accent block">
                  o la que Tiene Está Vieja?
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Una landing page resuelve esto sin complicarte: una sola
                página, bien diseñada, lista para que tu negocio finalmente
                exista en internet como debería.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Una sola página, enfocada en lo que realmente importa</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Lista en 2 semanas, con 2 meses de soporte incluido</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Landing Page para tu Negocio
                </h3>
                <p className="hidden sm:block text-sm text-secondary-foreground/60 mb-6">
                  Diseño y desarrollo a medida, simple y directo
                </p>

                <div className="mb-6">
                  <div className="text-sm text-secondary-foreground/60 mb-1">
                    Desde
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2 text-accent">
                    $5,000 MXN
                  </div>
                  <div className="text-sm text-secondary-foreground/60">
                    El alcance final se cotiza según tu proyecto
                  </div>
                </div>

                <div className="hidden sm:block text-xs text-secondary-foreground/50 mb-6">
                  No incluye dominio ni hosting · Incluye 2 meses de soporte
                </div>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity mt-2 sm:mt-0"
                  size="lg"
                >
                  <a
                    href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20landing%20page"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Quiero mi Landing Page
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

      {/* Por qué una landing page */}
      <section
        
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Lo Simple, Bien Hecho, Vende.
              </h2>
              <p className="text-xl text-muted-foreground">
                No necesitas un sitio enorme. Necesitas una página que diga lo
                correcto, en el momento correcto, y no te falle.
              </p>
            </div>

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
        </div>
      </section>

      {/* Proceso */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              De No Existir en Línea, a Tener tu Página Lista
            </h2>
            <p className="text-xl text-muted-foreground">
              2 semanas, un proceso claro, sin complicaciones de por medio
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
                Negocios Reales. Resultados Reales.
              </h2>
              <p className="text-xl text-muted-foreground">
                No son maquetas ni plantillas de muestra. Son empresas que dejaron de
                ser invisibles en línea — con una sola página, bien hecha.
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
              Desde $5,000 MXN · No incluye dominio ni hosting
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
                ¿Listo para Existir en Línea Como Debería Ser?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Cuéntanos de tu negocio y de lo que necesitas comunicar. Desde ahí
                definimos el alcance correcto para tu proyecto.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Inversión desde
                </div>
                <div className="text-4xl font-bold text-primary">
                  $5,000 MXN
                </div>
              </div>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20landing%20page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Quiero mi Landing Page
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}