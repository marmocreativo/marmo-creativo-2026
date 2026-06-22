import Image from "next/image";
import {
  Clock,
  CircleCheckBig,
  ArrowRight,
  MessageCircle,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Tags,
  ChartColumn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "39%", title: "Usa WooCommerce", description: "La plataforma de e-commerce más popular del mundo" },
  { value: "21-30", title: "Días de Entrega", description: "Tu tienda online completa lista para vender" },
  { value: "$5,000", title: "Ahorras Hoy", description: "Precio especial solo por tiempo limitado" },
];

const features = [
  { icon: ShoppingCart, title: "Productos Ilimitados", description: "Sin restricciones en tu catálogo" },
  { icon: CreditCard, title: "Múltiples Pasarelas", description: "PayPal, Stripe, OXXO y más" },
  { icon: Package, title: "Gestión de Inventario", description: "Control automático de stock" },
  { icon: Truck, title: "Cálculo de Envíos", description: "Integración con paqueterías" },
  { icon: Tags, title: "Cupones y Descuentos", description: "Sistema completo de promociones" },
  { icon: ChartColumn, title: "Reportes de Ventas", description: "Analytics para mejores decisiones" },
];

const process = [
  { step: "1", title: "Análisis del negocio", day: "Día 1-3" },
  { step: "2", title: "Diseño de la tienda", day: "Días 4-12" },
  { step: "3", title: "Desarrollo e integración", day: "Días 13-25" },
  { step: "4", title: "¡Listo para vender!", day: "Día 26-30" },
];

const examples = [
  { image: "/images/ecommerce/ecommerce-1.png", tag: "Arte", title: "Tiger Arte" },
  { image: "/images/ecommerce/ecommerce-2.png", tag: "Ecommerce", title: "Abanico y tú" },
  { image: "/images/ecommerce/ecommerce-3.png", tag: "Tecnología", title: "Grupo PC" },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 flex items-center text-secondary-foreground overflow-hidden py-24">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                Entrega garantizada en 21-30 días
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Tienda Online que
                <span className="text-accent block">Vende las 24 Horas</span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                E-commerce profesional con WooCommerce. Todo lo que
                necesitas para vender online: pagos, envíos, inventario y
                más.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Productos ilimitados sin restricciones</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Múltiples formas de pago integradas</span>
                </div>
              </div>

              <Button size="lg">
                Ver Detalles y Precio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  💰 MAXIMIZA VENTAS
                </div>
                <h3 className="text-xl font-bold mb-4">
                  E-commerce Completo desde:
                </h3>

                <div className="mb-6">
                  <div className="text-xl text-secondary-foreground/50 line-through mb-1">
                    $20,000
                  </div>
                  <div className="text-5xl font-bold mb-2 text-accent">
                    $15,000
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    Ahorras $5,000
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  ¡Empezar Ahora!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué WooCommerce */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué WooCommerce?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="text-4xl md:text-5xl font-bold mb-3 text-primary">
                  {stat.value}
                </div>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  {stat.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para vender online profesionalmente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => (
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

      {/* Proceso */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Proceso Completo en 30 Días
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1 text-primary">
                  {item.title}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {item.day}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Comenzar Mi Tienda Online
              <MessageCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ejemplos */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Ejemplos de Tiendas Exitosas
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {examples.map((example) => (
              <div
                key={example.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={example.image}
                    alt={example.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {example.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    {example.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Quiero Una Tienda Así
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
              ¿Listo para Vender Online?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tu tienda online trabajará 24/7 generando ingresos mientras tú
              descansas.
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-xl text-muted-foreground line-through">
                $20,000
              </div>
              <div className="text-4xl font-bold text-primary">$15,000</div>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Empezar Mi Tienda Online!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}