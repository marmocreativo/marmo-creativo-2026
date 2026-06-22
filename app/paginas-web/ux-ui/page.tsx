import {
  Eye,
  Monitor,
  TestTube,
  Palette,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Smartphone,
  Search,
  Lightbulb,
  RefreshCw,
  CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Eye, title: "Auditoría UX" },
  { icon: Monitor, title: "Análisis UI" },
  { icon: TestTube, title: "Testing Usuario" },
  { icon: Palette, title: "Rediseño" },
];

const symptoms = [
  { icon: TrendingUp, title: "Bajas Conversiones", description: "Mucho tráfico pero pocas conversiones" },
  { icon: Users, title: "Usuarios Confundidos", description: "Quejas sobre dificultad de uso" },
  { icon: Smartphone, title: "Problemas Móviles", description: "Experiencia móvil no optimizada" },
];

const approach = [
  { icon: Search, title: "Investigación y Análisis", description: "Estudiamos usuarios y objetivos de negocio" },
  { icon: Lightbulb, title: "Estrategia UX/UI", description: "Soluciones basadas en datos" },
  { icon: Palette, title: "Diseño y Prototipado", description: "Soluciones visuales que mejoran la experiencia" },
  { icon: RefreshCw, title: "Optimización Continua", description: "Iteramos con base en métricas" },
];

const firstConsultIncludes = [
  "Auditoría inicial gratuita",
  "Análisis de métricas actuales",
  "Identificación de oportunidades",
  "Propuesta personalizada",
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

        <div className="relative max-w-6xl mx-auto px-6 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Auditoría y Rediseño UX/UI
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Optimizamos Tu
            <span className="text-accent block">Experiencia Digital</span>
          </h1>

          <p className="text-xl text-secondary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Realizamos auditorías profundas y rediseños estratégicos que
            convierten tu producto digital en una experiencia que tus
            usuarios aman.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center"
              >
                <service.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{service.title}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Solicitar Auditoría
              <MessageCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Síntomas */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Tu Producto Tiene Estos Síntomas?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Si experimentas alguno de estos problemas, es momento de
              optimizar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {symptoms.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
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

          <div className="text-center mt-12">
            <Button size="lg">
              Evaluemos Tu Caso
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enfoque */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestro Enfoque UX/UI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Metodología probada que combina investigación y diseño
              estratégico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item) => (
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

          <div className="text-center mt-12">
            <Button size="lg">
              Iniciar Proceso UX/UI
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
              ¿Listo para Optimizar tu UX/UI?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cada día que esperas es una oportunidad perdida.
            </p>

            <div className="grid md:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-6">
              {firstConsultIncludes.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleCheckBig className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Solicitar Auditoría Gratuita!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}