import {
  Globe,
  Smartphone,
  Palette,
  ArrowRight,
  CircleCheckBig,
  ChevronRight,
  MessageCircle,
  Mail,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const heroCards = [
  {
    icon: Globe,
    title: "Páginas Web",
    description: "Sitios optimizados para conversión, diseño UX/UI y rendimiento real.",
    href: "/paginas-web",
  },
  {
    icon: Smartphone,
    title: "Desarrollo de Software",
    description: "Apps, automatizaciones y sistemas a medida que crecen con tu negocio.",
    href: "/desarrollo-software",
  },
  {
    icon: Palette,
    title: "Diseño Gráfico",
    description: "Identidad visual y contenido que hace que tu marca destaque.",
    href: "/diseno-grafico",
  },
];

const aboutChecklist = [
  "Trato personalizado y directo",
  "Diseño a medida para cada cliente",
  "Equipo especializado y talentoso",
  "Soluciones escalables y modernas",
];

const stats = [
  { value: "15+", label: "Años de Experiencia" },
  { value: "140+", label: "Clientes Satisfechos" },
  { value: "420+", label: "Proyectos Completados" },
];

const services = [
  {
    icon: Globe,
    title: "Páginas Web",
    description:
      "Sitios web profesionales con diseño UX/UI optimizado, responsivos y enfocados en conversiones",
    items: [
      "Landing Pages efectivas",
      "Sitios corporativos completos",
      "WordPress y E-commerce",
      "CMS personalizado a medida",
      "Optimización SEO",
      "Mantenimiento técnico",
    ],
    href: "/paginas-web",
  },
  {
    icon: Smartphone,
    title: "Desarrollo de Software",
    description:
      "Aplicaciones web y móviles personalizadas que automatizan y optimizan tus procesos de negocio",
    items: [
      "Apps móviles multiplataforma",
      "Aplicaciones de escritorio",
      "Sistemas web complejos",
      "Automatización de procesos",
      "Integración de APIs",
      "Consultoría técnica",
    ],
    href: "/desarrollo-software",
  },
  {
    icon: Palette,
    title: "Diseño Gráfico",
    description:
      "Branding completo, identidad visual consistente y materiales promocionales que destacan tu marca",
    items: [
      "Identidad corporativa",
      "Material publicitario",
      "Contenido para redes sociales",
      "Packaging y editorial",
      "Outsourcing creativo",
      "Impresión especializada",
    ],
    href: "/diseno-grafico",
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
      <section className="relative -mt-20 min-h-screen pt-20 flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_bg.jpg"
          className="fixed inset-0 -z-20 w-full h-full object-cover"
        >
          <source src="/images/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="max-w-6xl mx-auto px-6 text-center space-y-6 sm:space-y-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Transformamos tus Ideas en
            <span className="block text-accent">Soluciones Digitales</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Desarrollo web, software personalizado, UX/UI y diseño gráfico
            para empresas que buscan destacar en el mercado digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-5 sm:py-7 text-sm sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              size="lg"
            >
              <a href="#servicios" className="flex items-center justify-center gap-2 whitespace-nowrap">
                Ver Servicios
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </a>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-secondary to-neutral-800 text-white px-6 sm:px-10 py-5 sm:py-7 text-sm sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Consulta Gratis
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mt-8 sm:mt-16 text-left">
            {heroCards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className={`relative rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur p-4 sm:p-6 shadow-2xl shadow-primary/20 overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                {/* Spotlight cónico desde arriba */}
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-72 sm:h-72 opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(232,212,184,0.35) 90deg, rgba(139,46,46,0.45) 180deg, rgba(232,212,184,0.35) 270deg, transparent 360deg)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Glow ambiental detrás del ícono */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-24 bg-accent/30 rounded-full blur-2xl" />

                {/* Viñeta para fundir el spotlight hacia el fondo de la card */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-secondary" />

                <div className="relative flex flex-col items-center text-center pt-4 sm:pt-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-accent/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(232,212,184,0.3)]">
                    <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{card.title}</h3>
                  <p className="hidden sm:block text-sm text-secondary-foreground/70">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Acerca de */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl border border-border bg-white/40 backdrop-blur-xl p-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Acerca de Marmo Creativo
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong className="text-foreground">
                    L.D.G. Manuel Marmolejo Martínez (Marmo)
                  </strong>{" "}
                  es diseñador gráfico y desarrollador web fullstack con más
                  de 15 años de experiencia trabajando con empresas de todos
                  los tamaños.
                </p>
                <p>
                  En 2025 echa a andar{" "}
                  <strong className="text-foreground">
                    "Marmo Creativo"
                  </strong>
                  , un estudio creativo que combina experiencia y talento
                  joven para ofrecer soluciones digitales personalizadas.
                </p>
                <p>
                  Mantenemos un equipo pequeño que garantiza trato personal y
                  diseño a medida, aprovechando las habilidades de
                  diseñadores talentosos para potenciar tu negocio.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl p-8 shadow-xl shadow-primary/10 space-y-5">
              {aboutChecklist.map((text) => (
                <div key={text} className="flex items-center gap-4">
                  <CircleCheckBig className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden text-center rounded-2xl bg-gradient-to-br from-secondary to-primary p-6 aspect-square flex flex-col items-center justify-center shadow-xl"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8rem] font-bold text-white/10 select-none leading-none">
                  {stat.value}
                </span>
                <div className="relative text-4xl md:text-5xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="relative text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones integrales de diseño y desarrollo para potenciar tu
              presencia digital y hacer crecer tu negocio con tecnología de
              vanguardia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white p-8 shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white py-6 text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  <Link href={service.href}>
                    Ver Detalles
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="rounded-2xl border border-primary/30 bg-white/60 backdrop-blur-xl p-8 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                ¿No Encuentras lo que Buscas?
              </h3>
              <p className="text-muted-foreground mb-6">
                Cada proyecto es único. Cuéntanos qué necesita tu negocio y
                creemos una solución a tu medida.
              </p>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20consulta%20gratuita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="mr-2 w-5 h-5" />
                  Solicitar Consulta Gratuita
                </a>
              </Button>
            </div>
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
              Empresas que Ya Confiaron en Nosotros
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No son maquetas ni casos hipotéticos. Son resultados reales de
              negocios reales.
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

      {/* Contacto */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Hablemos de tu Proyecto
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ¿Listo para llevar tu negocio al siguiente nivel? Contáctanos y
              hagamos realidad tu proyecto digital. Respuesta garantizada en
              menos de 24 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://wa.me/525523995604"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-green-500/40 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <MessageCircle className="absolute -right-6 -bottom-6 w-40 h-40 text-green-500/15 rotate-12" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-1 text-green-600">WhatsApp</h3>
                <p className="text-muted-foreground mb-3">Respuesta inmediata</p>
                <p className="font-semibold text-lg text-green-600">+52 55 2399 5604</p>
              </div>
            </a>
            <a
              href="mailto:marmocreativo@gmail.com"
              className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <Mail className="absolute -right-6 -bottom-6 w-40 h-40 text-primary/15 rotate-12" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-1 text-primary">Email</h3>
                <p className="text-muted-foreground mb-3">
                  Respuesta profesional
                </p>
                <p className="font-semibold text-lg text-primary">marmocreativo@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}