import {
  Globe,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  Clock,
  Building,
  FileText,
  ShoppingCart,
  Code2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "Páginas Web Profesionales | Marmo Creativo",
  description:
    "Landing pages, sitios corporativos, WordPress, e-commerce, CMS a medida y mantenimiento web. Soluciones a la medida de tu negocio, en Marmo Creativo.",
  keywords: [
    "páginas web México",
    "desarrollo web profesional CDMX",
    "landing page sitio corporativo e-commerce",
    "agencia de desarrollo web",
    "diseño y desarrollo de páginas web a medida",
  ],
  openGraph: {
    title: "Páginas Web Profesionales | Marmo Creativo",
    description:
      "Landing pages, sitios corporativos, WordPress, e-commerce, CMS a medida y mantenimiento web.",
    url: "https://marmocreativo.com/paginas-web",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/og-paginas-web.jpg",
        width: 1200,
        height: 630,
        alt: "Páginas Web Profesionales - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas Web Profesionales",
    description:
      "Desde landing pages hasta sistemas a medida. Soluciones para cada tipo de negocio.",
  },
  alternates: {
    canonical: "https://marmocreativo.com/paginas-web",
  },
};

const whyUs = [
  { icon: Zap, title: "Velocidad Optimizada", description: "Carga rápida garantizada para mejor experiencia de usuario" },
  { icon: Shield, title: "Seguridad Total", description: "SSL certificado y protección contra amenazas" },
  { icon: Users, title: "Fácil de Usar", description: "Interfaces intuitivas que cualquiera puede manejar" },
  { icon: Star, title: "Soporte Continuo", description: "Asistencia técnica cuando la necesites" },
];

const featuredPackages = [
  {
    icon: Globe,
    title: "Landing Page",
    price: "$5,000",
    delivery: "Entrega: 2 semanas",
    description: "Una sola página, bien hecha, para negocios que necesitan resolver su presencia en línea de forma simple y directa",
    href: "/paginas-web/landing-pages",
  },
  {
    icon: Building,
    title: "Sitio Corporativo",
    price: "$7,000",
    delivery: "Entrega: 3-4 semanas",
    description: "Estructura completa con varias secciones, pensado para empresas con trayectoria que necesitan respaldar su presencia",
    href: "/paginas-web/sitio-corporativo",
  },
  {
    icon: Code2,
    title: "CMS Personalizado",
    price: "Cotización a Medida",
    delivery: "Entrega: según alcance",
    description: "Sistemas construidos 100% a la medida cuando tu negocio tiene procesos que ninguna solución estándar resuelve",
    href: "/paginas-web/cms-custom",
  },
];

const secondaryPackages = [
  {
    icon: FileText,
    title: "WordPress",
    price: "$8,000",
    delivery: "4 semanas",
    href: "/paginas-web/wordpress",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    price: "$20,000",
    delivery: "5-6 semanas",
    href: "/paginas-web/ecommerce",
  },
  {
    icon: RefreshCw,
    title: "Mantenimiento",
    price: "Desde $800/mes",
    delivery: "Planes mensuales",
    href: "/paginas-web/mantenimiento",
  },
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

        <div className="relative max-w-6xl mx-auto px-6 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Páginas Web Profesionales
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tu Presencia Digital
            <span className="text-accent block">Profesional</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Creamos sitios web que convierten visitantes en clientes. Desde
            landing pages hasta sistemas a medida, tenemos la solución
            correcta para tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              size="lg"
            >
              <a href="#paquetes">
                Ver Paquetes
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-secondary to-neutral-900 border-2 border-neutral-800 text-white px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20consulta%20gratis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                Consulta Gratis
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué Elegir Nuestros Sitios Web?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada sitio que creamos está pensado para generar resultados
              reales para tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-primary" />
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
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestros Paquetes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones pensadas para cada etapa de tu negocio
            </p>
          </div>

          {/* Paquetes destacados */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {featuredPackages.map((pkg) => (
              <a
                key={pkg.title}
                href={pkg.href}
                className="group relative rounded-3xl bg-gradient-to-br from-secondary to-primary p-8 pt-14 text-center shadow-2xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <pkg.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  {pkg.title}
                </h3>
                <div className="text-3xl font-bold mb-1 text-accent">
                  {pkg.price}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-white/70 mb-4">
                  <Clock className="w-3 h-3" />
                  <span>{pkg.delivery}</span>
                </div>
                <p className="text-sm text-white/80 mb-6">
                  {pkg.description}
                </p>

                <span className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold group-hover:opacity-90 transition-opacity">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          {/* Paquetes secundarios */}
          <div className="flex flex-wrap justify-center gap-6">
            {secondaryPackages.map((pkg) => (
              <a
                key={pkg.title}
                href={pkg.href}
                className="w-full sm:w-[280px] rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <pkg.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1 text-primary">
                  {pkg.title}
                </h3>
                <div className="text-lg font-bold text-primary mb-1">
                  {pkg.price}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{pkg.delivery}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Necesitas Algo Diferente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cada proyecto es único. Platiquemos sobre tus necesidades
              específicas y encontremos la solución correcta para tu negocio.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-7 text-lg font-semibold"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20platicar%20sobre%20mi%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}