import Image from "next/image";
import {
  Clock,
  CircleCheckBig,
  ArrowRight,
  MessageCircle,
  Target,
  Building,
  FileText,
  Camera,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5", title: "Secciones Incluidas", description: "Hasta 5 secciones personalizadas" },
  { value: "12-16", title: "Días de Entrega", description: "Tu sitio completo en menos de 3 semanas" },
  { value: "$2,000", title: "Ahorras Hoy", description: "Precio especial por tiempo limitado" },
];

const sections = [
  { icon: Target, title: "Inicio con hero impactante" },
  { icon: Building, title: "Nosotros / Quiénes somos" },
  { icon: FileText, title: "Servicios detallados" },
  { icon: Camera, title: "Galería / Portafolio" },
  { icon: Mail, title: "Contacto avanzado" },
];

const process = [
  { step: "1", title: "Análisis de tu empresa", day: "Día 1-2" },
  { step: "2", title: "Arquitectura y diseño", day: "Días 3-8" },
  { step: "3", title: "Desarrollo y contenido", day: "Días 9-14" },
  { step: "4", title: "¡Tu empresa online!", day: "Día 15-16" },
];

const examples = [
  { image: "/images/corporativo/corporativo-1.png", tag: "Consultorios", title: "Reiki tamashi" },
  { image: "/images/corporativo/corporativo-2.png", tag: "Educación", title: "TOEIC mx" },
  { image: "/images/corporativo/corporativo-3.png", tag: "Empresarial", title: "Crediticia" },
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
                Entrega garantizada en 12-16 días
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Sitio Corporativo que
                <span className="text-accent block">
                  Proyecta Profesionalismo
                </span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Sitio web empresarial completo con hasta 5 secciones
                personalizadas. Diseño que transmite confianza a tus
                clientes.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Imagen empresarial profesional</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Optimización SEO completa</span>
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
                  Sitio Corporativo Completo
                </h3>

                <div className="mb-6">
                  <div className="text-xl text-secondary-foreground/50 line-through mb-1">
                    $8,000
                  </div>
                  <div className="text-5xl font-bold mb-2 text-accent">
                    $6,000
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    Ahorras $2,000
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

      {/* Por qué un Sitio Corporativo */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué un Sitio Corporativo?
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

      {/* 5 Secciones */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              5 Secciones Personalizadas
            </h2>
            <p className="text-xl text-muted-foreground">
              Cada sección diseñada para destacar lo mejor de tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-5 shadow-xl"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-primary">
                  {section.title}
                </h3>
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
              Proceso Profesional y Detallado
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
              Comenzar Mi Sitio Corporativo
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
              Ejemplos de Sitios Corporativos
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
              Quiero Un Sitio Corporativo Así
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
              ¿Listo para Proyectar Profesionalismo?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tu empresa merece un sitio web que refleje su calidad y
              experiencia.
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-xl text-muted-foreground line-through">
                $8,000
              </div>
              <div className="text-4xl font-bold text-primary">$6,000</div>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Empezar Mi Sitio Corporativo!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}