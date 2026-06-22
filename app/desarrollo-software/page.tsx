import Image from "next/image";
import {
  Code,
  CircleCheckBig,
  ArrowRight,
  Brain,
  Zap,
  Target,
  Workflow,
  Settings,
  Rocket,
  Smartphone,
  Monitor,
  Globe,
  Cog,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const techStack = [
  { logo: "/images/tech/react.png", name: "React", description: "Web, iOS + Android" },
  { logo: "/images/tech/electron.png", name: "Electron", description: "Windows + macOS + Linux" },
  { logo: "/images/tech/n8n.png", name: "Automatizaciones", description: "Multiplataforma" },
];

const stats = [
  { value: "70%", title: "Ahorro en Costos", description: "Un código para múltiples plataformas" },
  { value: "50%", title: "Tiempo Reducido", description: "Desarrollo paralelo en lugar de secuencial" },
  { value: "90%", title: "Código Reutilizable", description: "Máximo aprovechamiento del trabajo" },
];

const advantages = [
  { icon: Code, title: "JavaScript Everywhere", description: "Una sola tecnología para web, móvil y escritorio" },
  { icon: Zap, title: "Desarrollo Acelerado", description: "Reutilización de código reduce tiempo y costos" },
  { icon: Target, title: "Enfoque Empresarial", description: "Software que resuelve problemas reales" },
  { icon: Workflow, title: "Integraciones Poderosas", description: "Conectamos con APIs y bases de datos" },
  { icon: Settings, title: "Mantenimiento Simple", description: "Un solo código base para actualizar" },
  { icon: Rocket, title: "Escalabilidad Total", description: "Arquitectura preparada para crecer" },
];

const services = [
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "React Native para iOS y Android con rendimiento nativo",
    price: "Desde $45,000",
    delivery: "15-30 días",
    features: [
      "Una base de código para ambas plataformas",
      "Publicación en stores incluida",
      "Push notifications integradas",
    ],
  },
  {
    icon: Monitor,
    title: "Apps de Escritorio",
    description: "Electron y Tauri para Windows, macOS y Linux",
    price: "Desde $55,000",
    delivery: "20-40 días",
    features: [
      "Multiplataforma: Windows, macOS, Linux",
      "Instaladores automáticos",
      "Auto-updates incluidos",
    ],
  },
  {
    icon: Globe,
    title: "Aplicaciones Web",
    description: "React SPAs y PWAs modernas y escalables",
    price: "Desde $35,000",
    delivery: "10-25 días",
    features: [
      "Single Page Applications (SPA)",
      "Progressive Web Apps (PWA)",
      "Performance ultra-optimizado",
    ],
  },
  {
    icon: Cog,
    title: "Automatizaciones",
    description: "Bots y scripts que eliminan trabajo repetitivo",
    price: "Desde $25,000",
    delivery: "5-15 días",
    features: [
      "Integración con APIs y servicios",
      "Web scraping inteligente",
      "Reportes y notificaciones automáticas",
    ],
  },
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
                <Code className="w-4 h-4" />
                Desarrollo Multiplataforma
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Un Código para
                <span className="text-accent block">
                  Todas las Plataformas
                </span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Desarrollamos apps móviles, aplicaciones de escritorio, web
                apps y automatizaciones con JavaScript. Una tecnología,
                infinitas posibilidades para tu negocio.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>70% menos costo que desarrollo nativo</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>50% menos tiempo de desarrollo</span>
                </div>
              </div>

              <Button size="lg">
                Ver Servicios
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">
                Tecnologías que Dominamos
              </h3>

              <div className="space-y-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                  >
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                    <div className="text-left flex-1">
                      <div className="font-bold">{tech.name}</div>
                      <div className="text-sm text-secondary-foreground/70">
                        {tech.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué multiplataforma */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué Desarrollo Multiplataforma?
            </h2>
            <p className="text-xl text-muted-foreground">
              Los números demuestran la eficiencia del desarrollo con
              JavaScript
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

      {/* Ventajas */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Ventajas del Desarrollo JavaScript
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una tecnología moderna que revoluciona la forma de crear
              software
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

          <div className="text-center mt-12">
            <Button size="lg">
              Solicitar Consulta Técnica
              <Brain className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Servicios de Desarrollo de Software
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones tecnológicas personalizadas para cada necesidad de
              tu empresa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/20 text-accent border border-accent/40 px-3 py-1.5 rounded-full font-bold text-sm">
                    {service.price}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{service.delivery}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Cotizar
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
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
              ¿Listo para Digitalizar tu Empresa?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Deja de usar software genérico. Desarrollemos la solución
              perfecta para tu negocio.
            </p>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Empezar Mi Proyecto!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              💻 JavaScript multiplataforma • ⚡ Desarrollo ágil • 🚀 Entrega
              rápida
            </p>
          </div>
        </div>
      </section>
    </>
  );
}