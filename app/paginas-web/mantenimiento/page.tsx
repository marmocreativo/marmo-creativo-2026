import Image from "next/image";
import {
  Shield,
  CircleCheckBig,
  AlertTriangle,
  RefreshCw,
  Database,
  Zap,
  Search,
  MessageCircle,
  Crown,
  ChevronDown,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

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
    url: "https://marmocreativo.com/paginas-web/mantenimiento",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/maintenance/og-mantenimiento.jpg",
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
    canonical: "https://marmocreativo.com/paginas-web/mantenimiento",
  },
};

const whyCritical = [
  { value: "30K", title: "Sitios Hackeados Diarios", description: "Tu sitio puede ser el siguiente si nadie lo vigila" },
  { value: "24/7", title: "Monitoreo Continuo", description: "Vigilancia constante, no revisiones esporádicas" },
  { value: "90%", title: "Uptime Garantizado", description: "Siempre disponible para tus clientes" },
];

const services = [
  { icon: Shield, title: "Seguridad Avanzada", description: "Protección 24/7 contra malware y hackers" },
  { icon: RefreshCw, title: "Updates Automáticos", description: "WordPress, plugins y temas siempre actualizados" },
  { icon: Database, title: "Backups Seguros", description: "Copias automáticas en la nube" },
  { icon: Zap, title: "Optimización de Velocidad", description: "Sitio rápido y mejor ranking SEO" },
  { icon: Search, title: "Monitoreo SEO", description: "Seguimiento constante del posicionamiento" },
];

const plans = [
  {
    icon: Shield,
    title: "Cuidado Esencial",
    price: "$800",
    description: "Lo mínimo para que tu sitio no quede a la deriva",
    features: ["Backup semanal automático", "Updates de seguridad básicos", "Monitoreo uptime 24/7", "Soporte por email"],
    featured: false,
  },
  {
    icon: Zap,
    title: "Cuidado Activo",
    price: "$1,500",
    description: "Mantenimiento constante para empresas con presencia activa",
    features: ["Backup diario automático", "Updates completos", "Soporte por WhatsApp", "Hasta 5 cambios al mes"],
    featured: true,
  },
  {
    icon: Crown,
    title: "Cuidado Total",
    price: "$2,800",
    description: "Para empresas grandes que no pueden permitirse otro abandono",
    features: ["Backup diario + versionado", "Updates inmediatos", "Soporte prioritario", "Cambios ilimitados"],
    featured: false,
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
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/mantenimiento_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 shrink-0" />
                Para empresas que ya vivieron un sitio abandonado
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Tu Sitio No Debería
                <span className="text-accent block">
                  Quedar Abandonado Otra Vez
                </span>
              </h1>

              <p className="hidden sm:block text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Ya sea por descuido propio o porque el desarrollador anterior
                desapareció, un sitio sin mantenimiento es un riesgo real para
                una empresa grande. Nosotros lo rescatamos y lo mantenemos
                funcionando.
              </p>

              <div className="space-y-3 mb-8">
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Protección 24/7 contra hackers y caídas</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Backups automáticos y soporte continuo</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-6 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  RIESGO REAL
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-6">
                  La Realidad de los Sitios Abandonados
                </h3>

                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl sm:text-3xl font-bold mb-1 text-red-400">30,000</div>
                    <div className="text-sm text-secondary-foreground/70">sitios hackeados diariamente</div>
                  </div>
                  <div className="hidden sm:block bg-white/5 rounded-lg p-4">
                    <div className="text-2xl sm:text-3xl font-bold mb-1 text-orange-400">$50K+</div>
                    <div className="text-sm text-secondary-foreground/70">costo promedio de un ataque</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-sm text-green-300 font-semibold">
                    Con mantenimiento profesional, tu sitio deja de ser un riesgo
                  </div>
                </div>
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

      {/* Por qué es crítico */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                El Abandono Sale Más Caro que el Mantenimiento.
              </h2>
              <p className="text-xl text-muted-foreground">
                Una empresa grande no puede darse el lujo de que su sitio web
                quede sin nadie a cargo, sin importar de quién fue la falla.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {whyCritical.map((stat) => (
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

      {/* Servicios incluidos */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Servicios Incluidos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protección integral que mantiene tu sitio funcionando, sin que
              vuelva a depender de la buena voluntad de alguien
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative w-full sm:w-[280px] rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 pt-12 mb-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-semibold text-sm mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-white/80">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Empresas que Rescatamos. Resultados Reales.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No son maquetas ni casos hipotéticos. Son empresas que volvieron
              a tener un sitio funcionando como debería.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.company} className="flex items-start gap-4 p-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.company}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <Quote className="w-5 h-5 text-primary/40 mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    {testimonial.quote}
                  </p>
                  <div className="text-sm font-semibold text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Planes de Mantenimiento Mensual
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sin compromisos largos · Cancela cuando quieras
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-2xl p-6 pt-12 mb-24 shadow-xl transition-transform duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-br from-secondary to-primary lg:scale-110 lg:z-10 shadow-2xl"
                    : "bg-white border border-primary/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      Más Elegido
                    </div>
                  </div>
                )}

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>

                <div className="text-center mb-4">
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
                    MXN + IVA / mes
                  </div>
                  <p
                    className={`text-xs mb-4 ${
                      plan.featured ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.featured ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      <CircleCheckBig
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.featured ? "text-accent" : "text-primary"
                        }`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

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
                    href={`https://wa.me/525523995604?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.title)}`}
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
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-neutral-300 bg-neutral-200/40 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                No Dejes que tu Sitio se Abandone Otra Vez
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Cuéntanos en qué estado está tu sitio actual. Lo evaluamos y
                te ayudamos a elegir el plan correcto para tu empresa.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Planes desde
                </div>
                <div className="text-4xl font-bold text-primary">
                  $800 MXN
                </div>
              </div>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-md font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20mantenimiento%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Quiero Proteger mi Sitio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}