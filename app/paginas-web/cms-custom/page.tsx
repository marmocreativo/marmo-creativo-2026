import Image from "next/image";
import {
  Code,
  MessageCircle,
  ArrowRight,
  Building,
  Users,
  Infinity as InfinityIcon,
  Brain,
  Target,
  Rocket,
  Shield,
  CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const techStack = [
  { logo: "/images/tech/laravel.png", name: "Laravel" },
  { logo: "/images/tech/react.png", name: "React" },
  { logo: "/images/tech/supabase.png", name: "Supabase" },
  { logo: "/images/tech/typescript.png", name: "TypeScript" },
];

const whenYouNeedIt = [
  { icon: Building, title: "Procesos Únicos", description: "Flujos de trabajo que no se adaptan a soluciones estándar" },
  { icon: Users, title: "Múltiples Roles", description: "Diferentes niveles de acceso y permisos" },
  { icon: InfinityIcon, title: "Escalabilidad Extrema", description: "Una base sólida para crecer significativamente" },
];

const advantages = [
  { icon: Target, title: "100% Personalizado", description: "Cada línea de código a tu medida" },
  { icon: Rocket, title: "Tecnologías Modernas", description: "Stack de vanguardia para máximo rendimiento" },
  { icon: Shield, title: "Seguridad Empresarial", description: "Protocolos de nivel enterprise" },
];

const process = [
  { step: "1", title: "Descubrimiento", description: "Análisis profundo de requisitos y arquitectura" },
  { step: "2", title: "Diseño & Planificación", description: "Arquitectura del sistema y especificaciones" },
  { step: "3", title: "Desarrollo", description: "Construcción con metodología ágil" },
  { step: "4", title: "Entrega & Soporte", description: "Implementación, capacitación y soporte 12 meses" },
];

const examples = [
  { image: "/images/custom/custom-1.png", title: "Review Quality", description: "Gestión de citas y exámenes de certificación" },
  { image: "/images/custom/custom-2.png", title: "P-Learning", description: "Capacitación continua con gamificación" },
  { image: "/images/custom/custom-3.png", title: "HEMA", description: "CRM para llamadas y citas médicas" },
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
            <Code className="w-4 h-4" />
            Desarrollo Personalizado
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            CMS Personalizado
            <span className="text-accent block">Para Tu Negocio Único</span>
          </h1>

          <p className="text-xl text-secondary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos sistemas de gestión de contenido con tecnologías
            modernas. Laravel, React, Supabase y más.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center"
              >
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 mx-auto mb-2"
                />
                <h3 className="font-semibold text-sm">{tech.name}</h3>
              </div>
            ))}
          </div>

          <Button size="lg">
            Platiquemos Tu Idea
            <MessageCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Cuándo lo necesitas + Ventajas */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Cuándo Necesitas un CMS Personalizado?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Las soluciones estándar no siempre cubren las necesidades
              específicas de cada empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {whenYouNeedIt.map((item) => (
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

          <div className="grid md:grid-cols-3 gap-6">
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

          <div className="text-center mt-12">
            <Button size="lg">
              Analicemos Tu Caso
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
              Nuestro Proceso de Desarrollo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Metodología probada que garantiza resultados exitosos
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary-foreground font-bold">
                    {item.step}
                  </span>
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
              Iniciar Mi Proyecto
              <Rocket className="ml-2 w-5 h-5" />
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
              Proyectos que Hemos Desarrollado
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example) => (
              <div
                key={example.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl overflow-hidden shadow-xl"
              >
                <Image
                  src={example.image}
                  alt={example.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-primary">
                    {example.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Cuéntanos Tu Idea
              <Brain className="ml-2 w-5 h-5" />
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
              ¿Listo para Revolucionar tu Negocio?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Platiquemos sin compromiso sobre tu proyecto.
            </p>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Platiquemos Tu Idea!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              📞 Respuesta en 2 horas • 💡 Consulta gratuita • 🚀 Sin
              compromiso
            </p>
          </div>
        </div>
      </section>
    </>
  );
}