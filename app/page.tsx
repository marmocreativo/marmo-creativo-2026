import type { Metadata } from "next";
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
  Clock,
  ShieldCheck,
  MapPin,
  ListChecks,
  FileText,
  Check,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { HeroVideo } from "@/components/home/hero-video";
import { Faq } from "@/components/seo/faq";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";
import { faqsOferta, whatsappLink } from "@/lib/seo/oferta";
import { giros } from "@/lib/seo/giros";
import { ciudades } from "@/lib/seo/ciudades";

export const metadata: Metadata = {
  title: "Página Web en 72 Horas desde $3,500 MXN | Marmo Creativo",
  description:
    "Tu página web profesional + perfil de Google Maps, lista en 72 horas. Precio fijo desde $3,500 MXN, hosting y dominio el primer año incluidos. Todo México.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Página Web en 72 Horas desde $3,500 MXN | Marmo Creativo",
    description:
      "Tu página web profesional + perfil de Google Maps, lista en 72 horas. Precio fijo desde $3,500 MXN.",
    url: "/",
  },
};

const beneficios = [
  { icon: Globe, title: "Página profesional", description: "Diseño adaptado a tu giro y a tu marca, optimizado para celular." },
  { icon: MapPin, title: "Google Maps incluido", description: "Alta u optimización de tu perfil para que te encuentren por zona." },
  { icon: MessageCircle, title: "WhatsApp y formulario", description: "Tus clientes te escriben con un toque, sin perder mensajes." },
  { icon: ShieldCheck, title: "Hosting, dominio y SSL", description: "El primer año va incluido. Renovación: $1,500 MXN al año." },
  { icon: Clock, title: "Garantía de 72 horas", description: "Si no está lista en 72 horas hábiles, no la pagas." },
  { icon: Rocket, title: "Una ronda de cambios", description: "Ajustamos lo que necesites antes de publicar, sin costo extra." },
];

const condiciones = [
  {
    title: "Información completa desde el inicio",
    description: "Logo, textos, fotos, horarios y datos de contacto, todo en el formulario de brief. Es lo que más tiempo ahorra.",
  },
  {
    title: "Plantilla probada por giro",
    description: "No diseñamos desde cero: adaptamos una estructura que ya funciona para tu tipo de negocio.",
  },
  {
    title: "Pago confirmado",
    description: "El reloj de las 72 horas hábiles arranca cuando recibimos tu pago, para dedicarte el tiempo completo.",
  },
  {
    title: "Una persona al frente de tu proyecto",
    description: "Hablas directo con quien diseña y publica tu página. Sin intermediarios ni juntas de más.",
  },
  {
    title: "Respuestas ágiles de tu parte",
    description: "Si necesitamos aclarar algo, tu respuesta en el mismo día mantiene el plazo. Te avisamos de inmediato si falta algo.",
  },
  {
    title: "Una sola ronda de cambios",
    description: "Revisas la propuesta, nos mandas tus ajustes juntos y los aplicamos antes de publicar.",
  },
];

const tablaPrecios = [
  {
    name: "Express",
    badge: "Más popular",
    price: "$3,500",
    note: "Pago único · incluye hosting y dominio .com el primer año",
    lead: "Qué incluye:",
    items: [
      "1 página con plantilla de tu giro",
      "Entrega en 72 horas hábiles",
      "Alta u optimización de Google Maps",
      "Botón de WhatsApp y formulario",
      "Hosting + dominio .com el primer año",
      "Certificado SSL",
      "1 ronda de cambios",
    ],
    cta: "Empezar con Express",
    href: "/empezar",
  },
  {
    name: "Express Plus",
    price: "$5,000",
    note: "Pago único · incluye hosting y dominio .com el primer año",
    lead: "Todo lo de Express, más:",
    items: [
      "Hasta 5 secciones",
      "Galería de fotos",
      "Blog básico",
      "SEO local básico",
      "Entrega en 5 días",
    ],
    cta: "Quiero Express Plus",
    href: "/empezar",
  },
  {
    name: "Sitio Corporativo",
    price: "$7,000",
    note: "Pago único · hosting y dominio se cotizan aparte",
    lead: "Diseño a la medida:",
    items: [
      "Varias secciones con diseño propio",
      "Estructura sólida para tu empresa",
      "Optimización de velocidad",
      "Entrega en 3-4 semanas",
    ],
    cta: "Ver Sitio Corporativo",
    href: "/paginas-web/sitio-corporativo",
  },
  {
    name: "Proyectos a medida",
    price: "$8,000+",
    note: "Se cotiza según el alcance",
    lead: "Para necesidades específicas:",
    items: [
      "WordPress",
      "Tienda en línea (e-commerce)",
      "CMS y sistemas a medida",
      "Mantenimiento web",
      "Entrega en 4-6 semanas",
    ],
    cta: "Ver todos los servicios",
    href: "/paginas-web",
  },
];



const statsAbout = [
  { value: "15+", unit: "años", description: "De experiencia en diseño gráfico y desarrollo web fullstack." },
  { value: "140+", unit: "clientes", description: "Negocios y empresas de todo México que ya confiaron en nosotros." },
  { value: "420+", unit: "proyectos", description: "Sitios, sistemas y materiales de diseño entregados." },
];

const stats = [
  { value: "15+", label: "Años de Experiencia" },
  { value: "140+", label: "Clientes Satisfechos" },
  { value: "420+", label: "Proyectos Completados" },
];

const serviciosLista = [
  { label: "Sitios corporativos", href: "/paginas-web/sitio-corporativo" },
  { label: "Tiendas en línea (e-commerce)", href: "/paginas-web/ecommerce" },
  { label: "Sitios en WordPress", href: "/paginas-web/wordpress" },
  { label: "CMS y sistemas web a medida", href: "/paginas-web/cms-custom" },
  { label: "Software y apps a la medida", href: "/desarrollo-software" },
  { label: "Diseño gráfico e identidad", href: "/diseno-grafico" },
  { label: "Outsourcing creativo", href: "/outsourcing" },
  { label: "Mantenimiento web", href: "/paginas-web/mantenimiento" },
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
      <section className="relative -mt-20 min-h-screen flex flex-col text-white overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <HeroVideo />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 -z-10 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="flex-1 flex items-center pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">
              Hosting y dominio el primer año incluidos · Garantía de 72 horas
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.02] tracking-tight max-w-4xl">
              Tu página web lista en 72 horas.
            </h1>

            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
              Desde <strong className="text-white">$3,500 MXN</strong>, con alta en Google Maps.
              Si no está lista en 72 horas hábiles, no la pagas.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/empezar"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-4 text-base font-medium hover:bg-white/90 transition-colors w-full sm:w-auto"
              >
                Empezar mi página
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappLink("Hola, quiero mi página web en 72 horas")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                O escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Franja de confianza */}
        <div className="border-t border-white/15 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              <span>Con la confianza de 140+ clientes en todo México</span>
              <span>15+ años de experiencia</span>
            </div>
            <a
              href="#testimonios"
              className="inline-flex items-center justify-center border border-white/70 px-5 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              Nuestros clientes
            </a>
          </div>
        </div>
      </section>

            {/* Oferta */}
      <section id="oferta" className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          {/* Columna izquierda */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
              <MapPin className="w-5 h-5 text-primary" />
              Tu negocio en Google
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Tu negocio en Google
              <br />
              en 72 horas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Tus clientes te buscan en Google antes de llamar. Te entregamos una página web
              profesional y tu perfil de Google Maps listos en 72 horas, por un precio fijo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              <strong className="text-foreground font-semibold">$3,500 MXN</strong> pago único, con el
              primer año de hosting y dominio incluidos.
            </p>
            <Link
              href="/empezar"
              className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity"
            >
              Empezar mi página
              <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              El reloj de las 72 horas empieza con tu pago y tu información completa.
            </p>
          </div>

          {/* Columna derecha: cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {beneficios.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <b.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-light text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


            {/* Cómo funciona */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          {/* Columna izquierda */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
              <Clock className="w-5 h-5 text-primary" />
              Cómo lo logramos
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              72 horas es posible
              <br />
              cuando se cumplen
              <br />
              las condiciones
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              No es magia ni prisa: es proceso. Trabajamos con plantillas probadas para cada giro
              y un solo responsable por proyecto, así que tu página se arma sobre una base que ya
              funciona en lugar de empezar de cero.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Lo único que necesitamos de ti es tu información completa y tu pago. En cuanto los
              recibimos empiezan a correr las 72 horas hábiles: diseñamos, configuramos tu perfil
              de Google Maps y te mandamos la propuesta para revisión.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Si todo está en orden, tu negocio sale en línea en tiempo récord. Y si por nuestra
              parte no llegamos a tiempo, no la pagas.
            </p>
          </div>

          {/* Columna derecha: cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {condiciones.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <ListChecks className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-light text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


            {/* Precios resumen */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 items-end">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <FileText className="w-5 h-5 text-primary" />
                Precios claros
              </div>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">
                Un precio fijo, sin
                <br />
                mensualidades ocultas
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pagas una vez y el primer año de hosting y dominio .com viene incluido en Express y
              Express Plus. Después solo renuevas cada año: $1,500 MXN con .com o $2,000 MXN con
              .com.mx o .mx. Y si tu proyecto es más grande, tienes un paquete para cada etapa de tu
              negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 rounded-xl border border-foreground/80 bg-white overflow-hidden divide-y md:divide-y-0 md:divide-x divide-foreground/80 [&>*:nth-child(n+3)]:md:border-t [&>*:nth-child(n+3)]:md:border-foreground/80 lg:[&>*:nth-child(n+3)]:border-t-0">
            {tablaPrecios.map((p) => (
              <div key={p.name} className="flex flex-col">
                <div className="flex items-center gap-3 bg-neutral-100 border-b border-foreground/80 px-6 py-5 min-h-[76px]">
                  <h3 className="text-xl font-light text-foreground">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-primary text-white text-xs font-semibold px-3 py-1">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 px-6 py-6">
                  <div className="text-5xl font-light text-foreground">
                    {p.price}
                    <span className="ml-2 text-base text-muted-foreground">MXN</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground min-h-[32px]">{p.note}</p>

                  <p className="mt-6 mb-4 text-sm text-foreground">{p.lead}</p>
                  <ul className="space-y-3 flex-1">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                      p.badge
                        ? "bg-foreground text-background hover:opacity-90"
                        : "border border-foreground/70 text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {p.cta}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Renovación anual de hosting + dominio: $1,500 MXN (.com) · $2,000 MXN (.com.mx / .mx).{" "}
            <Link href="/precios" className="text-primary underline underline-offset-4">
              Ver comparativa completa y preguntas frecuentes
            </Link>
          </p>
        </div>
      </section>


      {/* Acerca de */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-3xl md:text-5xl font-light leading-[1.2] max-w-4xl">
            <span className="text-foreground">
              Marmo Creativo es un estudio digital creado por L.D.G. Manuel Marmolejo (Marmo).{" "}
            </span>
            <span className="text-foreground/40">
              Diseñador gráfico y desarrollador fullstack con más de 15 años trabajando con empresas
              de todos los tamaños. Un equipo pequeño que te da trato directo y diseño a medida.
            </span>
          </p>

          <div className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
            <span>Trato personal · Diseño a medida · Soluciones modernas</span>
            <span>Desde 2025 como Marmo Creativo</span>
          </div>
          <div className="mt-4 border-t border-border" />

          <div className="grid md:grid-cols-3 md:divide-x divide-border">
            {statsAbout.map((s, i) => (
              <div key={s.value} className="py-10 md:px-8 first:md:pl-0 last:md:pr-0">
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
                <div className="mt-10 md:mt-16 text-6xl md:text-7xl font-light text-foreground">
                  {s.value}
                  <span className="ml-3 text-lg text-muted-foreground">{s.unit}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-xs">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Servicios */}
      <section id="servicios" className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,2fr)_minmax(0,7fr)_minmax(0,2fr)] gap-10 lg:gap-12 items-center">
          <p className="text-sm text-muted-foreground max-w-[14rem]">
            ¿Y si necesitas algo más grande? Para proyectos de mayor alcance, también hacemos
          </p>

          <ul className="space-y-1 md:space-y-2">
            {serviciosLista.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block text-3xl md:text-5xl font-light leading-tight tracking-tight text-foreground md:text-foreground/30 hover:text-foreground transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="lg:self-end">
            <Link
              href="/paginas-web"
              className="inline-flex items-center gap-3 border border-foreground/60 px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Ver todos los servicios
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* Testimonios */}
      <section id="testimonios" className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-4">
              Empresas que ya confiaron en nosotros
            </h2>
            <p className="text-lg text-muted-foreground">
              No son maquetas ni casos hipotéticos. Son resultados reales de negocios reales.
            </p>
          </div>
          <TestimonialsSlider items={testimonials} />
        </div>
      </section>


      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Página web para tu giro",
              rows: giros.map((g) => ({ label: g.titulo, href: `/pagina-web-para/${g.slug}` })),
            },
            {
              title: "Atendemos tu ciudad",
              rows: ciudades.map((c) => ({ label: c.nombre, href: `/pagina-web/${c.slug}` })),
            },
          ].map((table) => (
            <div key={table.title} className="rounded-xl border border-foreground/80 bg-white overflow-hidden">
              <div className="bg-neutral-100 border-b border-foreground/80 px-6 py-5">
                <h2 className="text-xl font-light text-foreground">{table.title}</h2>
              </div>
              <ul className="divide-y divide-border">
                {table.rows.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group flex items-center justify-between px-6 py-4 text-foreground hover:bg-neutral-50 transition-colors"
                    >
                      <span>{r.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      <Faq items={faqsOferta} />

    </>
  );
}