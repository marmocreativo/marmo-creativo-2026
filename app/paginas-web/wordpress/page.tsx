import Image from "next/image";
import {
  Clock,
  CircleCheckBig,
  ArrowRight,
  MessageCircle,
  SquarePen,
  RefreshCw,
  Settings,
  Users,
  Database,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "43%", title: "De la Web usa WordPress", description: "La plataforma más popular del mundo" },
  { value: "10-14", title: "Días de Entrega", description: "Tu sitio profesional listo en 2 semanas" },
  { value: "$1,000", title: "Ahorras Hoy", description: "Precio especial por tiempo limitado" },
];

const advantages = [
  { icon: SquarePen, title: "Fácil de Actualizar", description: "Editor intuitivo sin conocimientos técnicos" },
  { icon: RefreshCw, title: "Actualizaciones Automáticas", description: "Siempre seguro y actualizado" },
  { icon: Settings, title: "Miles de Plugins", description: "Formularios, SEO, seguridad y más" },
  { icon: Users, title: "Múltiples Usuarios", description: "Tu equipo colabora con distintos accesos" },
  { icon: Database, title: "Backups Automáticos", description: "Tu contenido siempre protegido" },
  { icon: TrendingUp, title: "SEO Optimizado", description: "Listo para Google desde el día 1" },
];

const process = [
  { step: "1", title: "Planificación del sitio", day: "Día 1-2" },
  { step: "2", title: "Diseño personalizado", day: "Días 3-7" },
  { step: "3", title: "Desarrollo WordPress", day: "Días 8-12" },
  { step: "4", title: "¡Listo para gestionar!", day: "Día 13-14" },
];

const examples = [
  { image: "/images/wordpress/wordpress-1.png", tag: "Educación", title: "CREE-IXE" },
  { image: "/images/wordpress/wordpress-2.png", tag: "Profesional", title: "Cazares Pérez" },
  { image: "/images/wordpress/wordpress-3.png", tag: "Empresarial", title: "Capetillo Producciones" },
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
                Entrega garantizada en 10-14 días
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                WordPress Profesional que
                <span className="text-accent block">
                  Tú Mismo Puedes Gestionar
                </span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Sitio web profesional con la plataforma más popular del
                mundo. Fácil de actualizar, seguro y completo.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Fácil de actualizar sin programación</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Capacitación completa incluida</span>
                </div>
              </div>

              <Button size="lg">
                Ver Detalles y Precio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  ⭐ MÁS POPULAR
                </div>
                <h3 className="text-xl font-bold mb-4">
                  WordPress Pro Completo
                </h3>

                <div className="mb-6">
                  <div className="text-xl text-secondary-foreground/50 line-through mb-1">
                    $8,000
                  </div>
                  <div className="text-5xl font-bold mb-2 text-accent">
                    $7,000
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

      {/* Por qué WordPress */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué WordPress?
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

      {/* Ventajas */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Ventajas Exclusivas de WordPress
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una plataforma completa para hacer crecer tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item) => (
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
              Proceso Profesional con Capacitación
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
              Comenzar Mi WordPress Pro
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
              Ejemplos de WordPress Profesionales
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
              Quiero Un WordPress Así
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
              ¿Listo para Gestionar tu Propio Sitio?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Con WordPress tendrás total control y libertad para hacer
              crecer tu presencia digital.
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-xl text-muted-foreground line-through">
                $8,000
              </div>
              <div className="text-4xl font-bold text-primary">$7,000</div>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Empezar Mi WordPress Pro!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}