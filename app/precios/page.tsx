import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Clock, X } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Faq } from "@/components/seo/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { faqsPrecios, whatsappLink } from "@/lib/seo/oferta";

export const metadata: Metadata = {
  title: "Precios de Páginas Web en México 2026 | Desde $3,500 MXN",
  description:
    "Paquetes de páginas web con precio fijo: Express $3,500 (72 horas), Express Plus $5,000, Corporativo $7,000. Hosting y dominio el primer año incluidos.",
  alternates: { canonical: "/precios" },
  openGraph: {
    title: "Precios de Páginas Web en México 2026 | Marmo Creativo",
    description: "Precio fijo y sin mensualidades. Desde $3,500 MXN con hosting y dominio el primer año.",
    url: "/precios",
  },
};

const paquetes = [
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
    items: ["Hasta 5 secciones", "Galería de fotos", "Blog básico", "SEO local básico", "Entrega en 5 días"],
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

const renovaciones = [
  { price: "$1,500", detail: "Hosting + dominio .com", note: "Por año, a partir del segundo año." },
  { price: "$2,000", detail: "Hosting + dominio .com.mx o .mx", note: "Por año. Al contratar, la Página Express suma $500 MXN con estos dominios." },
];

const noIncluye = [
  { title: "Tienda en línea", description: "Cobros y carrito de compras se cotizan como proyecto de e-commerce." },
  { title: "Redacción de textos desde cero", description: "Usamos los textos que nos mandes; te ayudamos a ordenarlos y pulirlos." },
  { title: "Sesión de fotos o video", description: "Trabajamos con tus fotos. Si no tienes, podemos proponer imágenes de apoyo." },
  { title: "Sistemas de reservas a medida", description: "Agenda por WhatsApp sí; calendarios y paneles propios se cotizan aparte." },
];

type Celda = boolean | string;

const comparativaGrupos: {
  title: string;
  rows: { feature: string; wix: Celda; express: Celda; agencia: Celda }[];
}[] = [
  {
    title: "Tiempo y costo",
    rows: [
      { feature: "Tiempo de entrega", wix: "Semanas, depende de ti", express: "72 horas", agencia: "4-8 semanas" },
      { feature: "Precio inicial", wix: "$300-$600 al mes", express: "$3,500 pago único", agencia: "$12,000+" },
      { feature: "Sin mensualidades", wix: false, express: true, agencia: "Depende" },
    ],
  },
  {
    title: "Lo que incluye",
    rows: [
      { feature: "Hecha por un profesional", wix: false, express: true, agencia: true },
      { feature: "Alta en Google Maps", wix: false, express: true, agencia: "Rara vez" },
      { feature: "Hosting y dominio el primer año", wix: false, express: true, agencia: false },
      { feature: "Botón de WhatsApp y formulario", wix: true, express: true, agencia: true },
      { feature: "Diseño adaptado a celular", wix: true, express: true, agencia: true },
      { feature: "Una ronda de cambios", wix: false, express: true, agencia: true },
    ],
  },
  {
    title: "Servicio",
    rows: [
      { feature: "Trato directo con quien la hace", wix: false, express: true, agencia: "Depende" },
      { feature: "Garantía de tiempo de entrega", wix: false, express: true, agencia: false },
      { feature: "El dominio es tuyo", wix: true, express: true, agencia: "Depende" },
    ],
  },
];

function CeldaValor({ value, destacada }: { value: Celda; destacada?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary text-primary">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-foreground">—</span>;
  }
  return (
    <span className={destacada ? "font-medium text-primary" : "text-muted-foreground"}>{value}</span>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Página web Express en 72 horas",
          provider: { "@type": "Organization", name: "Marmo Creativo", url: "https://marmo-creativo.com" },
          areaServed: "MX",
          offers: {
            "@type": "Offer",
            price: "3500",
            priceCurrency: "MXN",
            url: "https://marmo-creativo.com/precios",
          },
        }}
      />

      {/* Hero */}
      <section className="relative -mt-20 pt-40 pb-20 md:pt-48 md:pb-28 text-white overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">
            Precio fijo · Sin mensualidades ocultas
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl">
            Precios claros para tu página web.
          </h1>
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Desde <strong className="text-white">$3,500 MXN</strong>, con hosting y dominio .com el primer año
            incluidos. Elige el paquete que corresponde a la etapa de tu negocio.
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
              href={whatsappLink("Hola, tengo una duda sobre los precios de las páginas web")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <SiWhatsapp className="w-4 h-4" />
              O pregunta por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Tabla de paquetes */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">
              Un paquete para cada
              <br />
              etapa de tu negocio
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pagas una vez y el primer año de hosting y dominio .com viene incluido en Express y Express
              Plus. Si tu proyecto crece, ampliamos tu página y te descontamos lo que ya pagaste por la base.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 rounded-xl border border-foreground/80 bg-white overflow-hidden divide-y md:divide-y-0 md:divide-x divide-foreground/80 [&>*:nth-child(n+3)]:md:border-t [&>*:nth-child(n+3)]:md:border-foreground/80 lg:[&>*:nth-child(n+3)]:border-t-0">
            {paquetes.map((p) => (
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
        </div>
      </section>

      {/* Renovación anual */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
              <Clock className="w-5 h-5 text-primary" />
              Después del primer año
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Renovación anual,
              <br />
              sin sorpresas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Tu primer año de hosting y dominio ya está pagado. Cuando termina, solo renuevas una vez al año
              y nosotros nos encargamos de todo lo técnico.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              El dominio se registra a tu nombre y es tuyo siempre. Sin mensualidades ni cargos escondidos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {renovaciones.map((r) => (
              <div
                key={r.detail}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="text-5xl font-light text-foreground">
                  {r.price}
                  <span className="ml-2 text-base text-muted-foreground">MXN / año</span>
                </div>
                <h3 className="mt-4 text-xl font-light text-foreground">{r.detail}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué no incluye */}
      <section className="relative py-20 md:py-28 bg-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
              <X className="w-5 h-5 text-primary" />
              Transparencia
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Lo que NO incluye
              <br />
              la Página Express
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Preferimos decírtelo desde el principio. Así sabes exactamente qué recibes por $3,500 MXN y
              cuándo conviene un paquete más grande.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {noIncluye.map((n) => (
              <div
                key={n.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <X className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-light text-foreground mb-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Comparativa */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">
              Comparar opciones
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hacerlo tú mismo, contratar una agencia o ir con nosotros: cada opción funciona para algo
              distinto. Esto es lo que cambia.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px] rounded-xl border border-foreground/80 bg-white overflow-hidden">
              {/* Encabezado */}
              <div className="grid grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1.5fr))] divide-x divide-foreground/80 bg-neutral-100 border-b border-foreground/80">
                {["Características", "Hazlo tú (Wix, etc.)", "Marmo Express", "Agencia tradicional"].map((h) => (
                  <div key={h} className="px-6 py-6 text-lg font-light text-foreground">
                    {h}
                  </div>
                ))}
              </div>

              {/* Fila de acción */}
              <div className="grid grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1.5fr))] divide-x divide-foreground/80 border-b border-foreground/80">
                <div className="px-6 py-4" />
                <div className="px-6 py-4 text-sm text-muted-foreground">Tú lo armas</div>
                <div className="px-6 py-4">
                  <Link href="/empezar" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Empezar con Express
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="px-6 py-4 text-sm text-muted-foreground">Cotización</div>
              </div>

              {comparativaGrupos.map((grupo) => (
                <div key={grupo.title}>
                  <div className="bg-black px-6 py-3.5 text-sm text-white">{grupo.title}</div>
                  {grupo.rows.map((r, i) => (
                    <div
                      key={r.feature}
                      className={`grid grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1.5fr))] divide-x divide-foreground/80 text-sm ${
                        i % 2 === 1 ? "bg-neutral-100" : "bg-white"
                      }`}
                    >
                      <div className="px-6 py-5 text-foreground">{r.feature}</div>
                      <div className="px-6 py-5"><CeldaValor value={r.wix} /></div>
                      <div className="px-6 py-5"><CeldaValor value={r.express} destacada /></div>
                      <div className="px-6 py-5"><CeldaValor value={r.agencia} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Rangos de referencia del mercado en México; pueden variar según el proveedor.
          </p>
        </div>
      </section>


      <Faq items={faqsPrecios} title="Preguntas sobre precios" />
    </>
  );
}