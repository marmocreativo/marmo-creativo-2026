import {
  Building2,
  Handshake,
  ArrowRight,
  Calendar,
  Briefcase,
  Award,
  Clock,
  Users,
  DollarSign,
  Shield,
  X,
  CircleCheckBig,
  Code,
  Smartphone,
  Monitor,
  Zap,
  Target,
  Crown,
  ChevronDown,
  MessageCircle,
  Phone,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const heroStats = [
  { icon: Briefcase, value: "300+", label: "Proyectos entregados" },
  { icon: Award, value: "98%", label: "Satisfacción" },
  { icon: Clock, value: "15+", label: "Años de experiencia" },
];

const challenges = [
  {
    icon: Users,
    problem: "No tienes desarrolladores internos",
    solution: "Nosotros somos tu equipo técnico de confianza",
  },
  {
    icon: Clock,
    problem: "Pierdes proyectos por falta de capacidad",
    solution: "Desarrollamos bajo tu marca en tus tiempos",
  },
  {
    icon: DollarSign,
    problem: "Rechazas proyectos técnicos complejos",
    solution: "Márgenes del 20-30% sin invertir en equipo",
  },
  {
    icon: Shield,
    problem: "Te preocupa la calidad del outsourcing",
    solution: "15+ años de experiencia y garantía total",
  },
];

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Sitios corporativos, e-commerce y aplicaciones web",
    delivery: "2-8 semanas",
    popular: true,
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "iOS y Android con tecnología React Native",
    delivery: "6-12 semanas",
    popular: false,
  },
  {
    icon: Monitor,
    title: "Software Desktop",
    description: "Aplicaciones de escritorio multiplataforma",
    delivery: "4-10 semanas",
    popular: false,
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    description: "Bots y scripts para optimizar procesos",
    delivery: "1-4 semanas",
    popular: true,
  },
];

const partnerships = [
  {
    icon: Handshake,
    title: "Socio Colaborador",
    commission: "20%",
    description: "Perfecta para empezar y proyectos puntuales",
    features: [
      "Desarrollamos bajo tu marca",
      "Tú cobras el precio completo",
      "Sin compromiso mínimo",
      "Soporte post-entrega incluido",
    ],
    featured: false,
  },
  {
    icon: Target,
    title: "Socio Estratégico",
    commission: "25%",
    description: "La opción más popular para agencias en crecimiento",
    features: [
      "Descuentos de 15-30% en servicios",
      "Prioridad en tiempos de entrega",
      "Account manager dedicado",
      "Reportes detallados de progreso",
    ],
    featured: true,
  },
  {
    icon: Crown,
    title: "Socio Premium",
    commission: "A negociar",
    description: "Partnership exclusivo para agencias grandes",
    features: [
      "Equipo dedicado exclusivo",
      "Exclusividad territorial",
      "Revenue sharing en proyectos grandes",
      "Soporte 24/7 prioritario",
    ],
    featured: false,
  },
];

const faqs = [
  "¿Cómo funciona exactamente el modelo de comisiones?",
  "¿El cliente sabrá que ustedes desarrollan el proyecto?",
  "¿Qué pasa si el cliente no queda satisfecho?",
  "¿Puedo empezar con un proyecto pequeño para probar?",
  "¿Ofrecen soporte después de la entrega?",
  "¿Qué tecnologías manejan?",
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Outsourcing Creativo para Agencias
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Multiplica tus ingresos
              <br />
              <span className="text-accent">
                sin contratar desarrolladores
              </span>
            </h1>

            <p className="text-xl text-secondary-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Somos el equipo técnico de{" "}
              <strong className="text-secondary-foreground">
                agencias exitosas
              </strong>
              . Desarrollamos bajo tu marca mientras tú te enfocas en
              conseguir clientes.{" "}
              <strong className="text-accent">
                Gana 20-30% de comisión por proyecto.
              </strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Handshake className="mr-2 w-5 h-5" />
                Quiero ser Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="mr-2 w-5 h-5" />
                Agendar Llamada
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-xl"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-secondary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Te suena familiar */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Te suena familiar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estos son los retos que enfrentan las agencias y cómo los
              solucionamos juntos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((item) => (
              <div
                key={item.problem}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <h3 className="font-bold text-foreground text-base leading-snug">
                        {item.problem}
                      </h3>
                    </div>
                    <div className="flex items-start gap-3">
                      <CircleCheckBig className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground font-medium text-base leading-snug">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              Ver qué desarrollamos para ti
              <ArrowRight className="ml-2 w-5 h-5" />
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
              Servicios que desarrollamos bajo tu marca
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cubrimos todas las necesidades técnicas que tus clientes
              demandan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/30">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-primary">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span className="bg-accent/20 text-accent border border-accent/40 text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Clock className="w-3 h-3" />
                      <span>Entrega: {service.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos de partnership */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Elige tu modelo de partnership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diferentes opciones para diferentes volúmenes y necesidades de
              tu agencia
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {partnerships.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-2xl backdrop-blur-xl p-6 shadow-xl ${
                  plan.featured
                    ? "border-2 border-primary bg-primary/10 lg:scale-105"
                    : "border border-primary/20 bg-white/40"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-primary/10 border border-primary/30">
                    <plan.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {plan.title}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {plan.commission}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button className="w-full">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Contactar por WhatsApp
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Las dudas más comunes de las agencias antes de ser partners
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((question) => (
              <div
                key={question}
                className="rounded-xl border border-primary/20 bg-white/40 backdrop-blur-xl shadow-md overflow-hidden"
              >
                <button className="w-full p-5 text-left flex justify-between items-center hover:bg-primary/5 transition-colors">
                  <h3 className="font-medium text-foreground pr-4">
                    {question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                </button>
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
              ¿Listo para ser nuestro partner?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Únete a las agencias que ya confían en nosotros para crecer sin
              límites técnicos.
            </p>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="mr-2 w-5 h-5" />
              Contactar por WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex items-center justify-center gap-6 text-sm flex-wrap text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Respuesta en 2 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Sin compromiso inicial</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>98% satisfacción</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}