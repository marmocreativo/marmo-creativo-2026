import Image from "next/image";
import {
  Palette,
  Briefcase,
  Printer,
  Target,
  Package,
  Globe,
  Award,
  Camera,
  Crown,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";

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
    url: "https://marmocreativo.com/diseno-grafico",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/grafico/og-diseno-grafico.jpg",
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
    canonical: "https://marmocreativo.com/diseno-grafico",
  },
};

const heroServices = [
  { icon: Briefcase, title: "Branding Completo", price: "Desde $3,000" },
  { icon: SiInstagram, title: "Redes Sociales", price: "Desde $1,500/mes" },
  { icon: Printer, title: "Material Gráfico", price: "Cotización personalizada" },
];

const gallery = [
  { image: "/images/grafico/grafico-1.png", title: "70 Aniversario Sonora Santanera", tag: "Redes" },
  { image: "/images/grafico/grafico-3.png", title: "Logo CES ENERGY", tag: "Branding" },
  { image: "/images/grafico/grafico-5.png", title: "Glass Studio", tag: "Branding" },
  { image: "/images/grafico/grafico-6.png", title: "CREE-IXE", tag: "Redes Sociales" },
  { image: "/images/grafico/grafico-9.png", title: "Key Productions", tag: "Impresos" },
  { image: "/images/grafico/grafico-12.png", title: "Capetillo Producciones", tag: "Redes Sociales" },
];

const brandingIncludes = [
  { icon: Target, title: "Identidad Corporativa" },
  { icon: Briefcase, title: "Papelería Empresarial" },
  { icon: Package, title: "Packaging y Etiquetas" },
  { icon: Globe, title: "Aplicaciones Digitales" },
  { icon: Printer, title: "Material Publicitario" },
  { icon: Award, title: "Manual de Marca" },
];

const socialPlans = [
  { icon: SiInstagram, title: "Básico", price: "$2,200", description: "Contenido esencial para redes sociales", featured: false },
  { icon: Camera, title: "Profesional", price: "$4,000", description: "Contenido completo para múltiples plataformas", featured: true },
  { icon: Crown, title: "Premium", price: "$7,000", description: "Suite completa de contenido premium", featured: false },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/grafico_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-8 md:mb-12">
            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Palette className="w-4 h-4 shrink-0" />
              Diseño Gráfico Profesional
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tu Marca Merece
              <span className="text-accent block">Diseños que Impacten</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Creamos identidades visuales memorables, contenido para redes
              sociales y soluciones gráficas que hacen que tu marca destaque.
            </p>

            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              size="lg"
            >
              <a href="#galeria">
                Ver Nuestros Trabajos
                <Palette className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
            {heroServices.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-6 text-center shadow-xl"
              >
                <div className="hidden sm:flex w-12 h-12 bg-white/10 rounded-full items-center justify-center mx-auto mb-3">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-1 text-xs sm:text-base leading-tight">{service.title}</h3>
                <p className="text-xs sm:text-sm text-secondary-foreground/70">
                  {service.price}
                </p>
              </div>
            ))}
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

      {/* Galería */}
      <section
        id="galeria"
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestros Trabajos de Diseño
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una muestra de proyectos reales que reflejan la calidad de
              nuestros diseños
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.image}
                className="group relative rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={256}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-primary font-semibold mb-6">
              ¿Te gusta nuestro estilo? Creemos algo único para tu marca.
            </p>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20solicitar%20un%20dise%C3%B1o"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" />
                Solicitar mi Diseño
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Branding completo */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Branding Completo desde $3,000
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Creamos la identidad visual completa de tu marca, pensada para
              conectar con tu audiencia
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {brandingIncludes.map((item) => (
              <div
                key={item.title}
                className="relative w-full sm:w-[220px] rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 pt-12 mb-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-primary/30 bg-white/60 backdrop-blur-xl p-8 text-center shadow-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2 text-primary">
              Paquete Branding Completo
            </h3>
            <div className="text-3xl font-bold text-primary mb-1">
              $3,000
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Entrega: 10-15 días
            </p>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20mi%20branding%20completo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" />
                Solicitar Mi Diseño
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Paquetes redes sociales */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Paquetes para Redes Sociales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Contenido visual profesional que hace crecer tu presencia
              digital
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {socialPlans.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-2xl p-6 pt-12 mb-24 text-center shadow-xl transition-transform duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-br from-secondary to-primary lg:scale-110 lg:z-10 shadow-2xl"
                    : "bg-white border border-primary/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    plan.featured ? "text-white" : "text-primary"
                  }`}
                >
                  {plan.title}
                </h3>
                <div
                  className={`text-3xl font-bold mb-1 ${
                    plan.featured ? "text-accent" : "text-primary"
                  }`}
                >
                  {plan.price}
                </div>
                <div
                  className={`text-xs mb-3 ${
                    plan.featured ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  MXN / mes
                </div>
                <p
                  className={`text-xs mb-6 ${
                    plan.featured ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <Button
                  asChild
                  className={`w-full rounded-full px-8 py-6 text-base font-semibold transition-opacity hover:opacity-90 ${
                    plan.featured
                      ? "bg-accent text-accent-foreground"
                      : "bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white"
                  }`}
                  size="lg"
                >
                  <a
                    href={`https://wa.me/525523995604?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.title)}%20de%20redes%20sociales`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Contratar
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-8 shadow-2xl">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Listo para Destacar Visualmente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tu marca merece diseños que generen impacto. Empecemos a crear
              algo extraordinario juntos.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-7 text-lg font-semibold"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20empezar%20mi%20proyecto%20de%20dise%C3%B1o"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                ¡Empezar ahora!
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}