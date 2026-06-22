import Image from "next/image";
import {
  Clock,
  CircleCheckBig,
  ArrowRight,
  MessageCircle,
  Target,
  Smartphone,
  Search,
  Zap,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "300%", title: "Más Conversiones", description: "Una landing convierte 3x más que un sitio tradicional" },
  { value: "5-7", title: "Días de Entrega", description: "Tu página lista en menos de una semana" },
  { value: "$1,000", title: "Ahorras Hoy", description: "Precio especial por tiempo limitado" },
];

const process = [
  { step: "1", title: "Platicamos tu idea", day: "Día 1" },
  { step: "2", title: "Diseñamos tu página", day: "Días 2-4" },
  { step: "3", title: "Desarrollo y pruebas", day: "Días 5-6" },
  { step: "4", title: "¡Listo para vender!", day: "Día 7" },
];

const examples = [
  { image: "/images/landing/landing-1.png", tag: "Educación", title: "Tu prepa en un exámen" },
  { image: "/images/landing/landing-2.png", tag: "E-learning", title: "Curso Online" },
  { image: "/images/landing/landing-3.png", tag: "E-commerce", title: "Producto Físico" },
];

const includedFeatures = [
  { icon: Target, title: "Diseño único y personalizado" },
  { icon: Smartphone, title: "100% responsive" },
  { icon: Search, title: "Optimización SEO básica" },
  { icon: Zap, title: "Velocidad optimizada" },
  { icon: Award, title: "Capacitación incluida" },
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
                Entrega garantizada en 5-7 días
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Landing Page que
                <span className="text-accent block">
                  Genera Clientes Automáticamente
                </span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Página profesional diseñada para convertir visitantes en
                clientes. Sin complicaciones, sin esperas largas.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Aumenta conversiones hasta 300%</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Lista en menos de una semana</span>
                </div>
              </div>

              <Button size="lg">
                Ver Detalles y Precio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  🔥 OFERTA LIMITADA
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Landing Page Profesional
                </h3>

                <div className="mb-6">
                  <div className="text-xl text-secondary-foreground/50 line-through mb-1">
                    $5,500
                  </div>
                  <div className="text-5xl font-bold mb-2 text-accent">
                    $4,500
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    Ahorras $1,000
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

      {/* Por qué una Landing Page */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué una Landing Page?
            </h2>
            <p className="text-xl text-muted-foreground">
              Los números no mienten: una página enfocada convierte más
            </p>
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

      {/* Proceso */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Proceso Simple y Rápido
            </h2>
            <p className="text-xl text-muted-foreground">
              De la idea a la página funcionando en solo 7 días
            </p>
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
              Comenzar Mi Proyecto
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
              Ejemplos de Nuestro Trabajo
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
              Quiero Una Landing Page Así
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Todo incluido */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Todo Incluido por $4,500
            </h2>
            <p className="text-xl text-muted-foreground">
              Sin sorpresas, sin costos ocultos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {includedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-5 text-center shadow-xl"
              >
                <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-xs text-foreground">
                  {feature.title}
                </h3>
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
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Listo para Más Clientes?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              No esperes más. Cada día sin una landing page es dinero que no
              entra.
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-xl text-muted-foreground line-through">
                $5,500
              </div>
              <div className="text-4xl font-bold text-primary">$4,500</div>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Empezar Mi Landing Page!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}