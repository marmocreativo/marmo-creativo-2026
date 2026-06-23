import Image from "next/image";
import {
  Award,
  CircleCheckBig,
  Clock,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  Search,
  Palette,
  Code2,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "Tienda Online / E-commerce Profesional | Marmo Creativo",
  description:
    "Tienda online completa con WooCommerce: pagos, envíos, inventario y todo lo necesario para vender 24/7. Desde $20,000 MXN, entrega en 5-6 semanas, con facilidades de pago.",
  keywords: [
    "tienda online México",
    "desarrollo e-commerce WooCommerce",
    "página web para vender productos",
    "tienda virtual profesional CDMX",
    "e-commerce con pasarela de pago México",
  ],
  openGraph: {
    title: "Tienda Online / E-commerce Profesional | Marmo Creativo",
    description:
      "Tienda online completa con WooCommerce: pagos, envíos, inventario y todo lo necesario para vender 24/7.",
    url: "https://marmocreativo.com/paginas-web/ecommerce",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/ecommerce/og-ecommerce.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Online / E-commerce Profesional - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Online / E-commerce Profesional",
    description:
      "Todo lo necesario para vender 24/7. Desde $20,000 MXN, con facilidades de pago.",
  },
  alternates: {
    canonical: "https://marmocreativo.com/paginas-web/ecommerce",
  },
};

const stats = [
  { value: "39%", title: "Usa WooCommerce", description: "La plataforma de e-commerce más usada del mundo" },
  { value: "5-6", title: "Semanas de Entrega", description: "El tiempo necesario para una tienda completa y bien hecha" },
];

const process = [
  { step: "1", title: "Análisis del negocio y catálogo", day: "Semana 1", icon: Search },
  { step: "2", title: "Diseño de la tienda", day: "Semana 1-2", icon: Palette },
  { step: "3", title: "Desarrollo, pagos y envíos", day: "Semana 3-5", icon: Code2 },
  { step: "4", title: "Pruebas, entrega y soporte", day: "Semana 6", icon: Rocket },
];

const examples = [
  { image: "/images/ecommerce/hevia.png", tag: "Arte y Galería", title: "Galería Hevia", description: "Una tienda online que muestra cada pieza con la seriedad que merece una galería de arte", url: "https://galeria-hevia.com" },
  { image: "/images/ecommerce/thebroom.png", tag: "Ecommerce", title: "The Broom Society", description: "Catálogo completo, pagos integrados y una experiencia de compra clara de inicio a fin", url: "https://thebroomsociety.com" },
];

const includedFeatures = [
  { icon: ShoppingCart, title: "Catálogo sin límite de productos", description: "Tu inventario completo, sin restricciones" },
  { icon: CreditCard, title: "Facilidades de pago para tus clientes", description: "Múltiples pasarelas y formas de pago integradas" },
  { icon: Clock, title: "Entrega en 5-6 semanas", description: "El tiempo justo para una tienda sólida, sin atajos" },
  { icon: Award, title: "3 meses de soporte después de la entrega", description: "Ajustes y acompañamiento incluidos sin costo extra" },
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
                <ShoppingCart className="w-4 h-4 shrink-0" />
                Para negocios listos para vender en línea, no solo mostrarse
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Una Tienda Online que
                <span className="text-accent block">Vende las 24 Horas</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                E-commerce profesional con WooCommerce: catálogo completo,
                pagos, envíos e inventario, todo integrado para que tu
                negocio venda sin parar.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">Catálogo de productos sin restricciones</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base">5-6 semanas de entrega, con 3 meses de soporte incluido</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Tienda Online Completa
                </h3>
                <p className="hidden sm:block text-sm text-secondary-foreground/60 mb-6">
                  Diseño y desarrollo a medida, lista para vender
                </p>

                <div className="mb-6">
                  <div className="text-sm text-secondary-foreground/60 mb-1">
                    Desde
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2 text-accent">
                    $20,000 MXN
                  </div>
                  <div className="text-sm text-secondary-foreground/60">
                    El alcance final se cotiza según tu proyecto
                  </div>
                </div>

                <div className="hidden sm:block text-xs text-secondary-foreground/50 mb-6">
                  No incluye dominio ni hosting · Incluye 3 meses de soporte · Preguntanos por nuestras facilidades de pago
                </div>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity mt-2 sm:mt-0"
                  size="lg"
                >
                  <a
                    href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20tienda%20online"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Quiero mi Tienda Online
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

      {/* Por qué WooCommerce */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Tu Negocio, Abierto Todo el Día.
              </h2>
              <p className="text-xl text-muted-foreground">
                Con una tienda online no dependes de un horario: tus clientes
                compran cuando quieren, y tu negocio sigue generando ingresos.
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
              De No Vender en Línea, a Tener tu Tienda Lista
            </h2>
            <p className="text-xl text-muted-foreground">
              5-6 semanas, un proceso claro, pensado para que vendas sin contratiempos
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
                Tiendas Reales. Ventas Reales.
              </h2>
              <p className="text-xl text-muted-foreground">
                No son maquetas ni plantillas de muestra. Son negocios que ya
                venden en línea con una tienda completa y profesional.
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
              Desde $20,000 MXN · No incluye dominio ni hosting
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
                ¿Listo para Vender en Línea?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Cuéntanos sobre tu negocio y tu catálogo. Desde ahí definimos
                el alcance correcto para tu proyecto — y te contamos de
                nuestras facilidades de pago.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Inversión desde
                </div>
                <div className="text-4xl font-bold text-primary">
                  $20,000 MXN
                </div>
              </div>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20una%20tienda%20online"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Quiero mi Tienda Online
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}