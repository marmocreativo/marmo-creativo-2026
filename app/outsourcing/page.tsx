"use client";

import { useState } from "react";
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
  Phone,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const heroStats = [
  { icon: Briefcase, value: "300+", label: "Proyectos entregados" },
  { icon: Award, value: "98%", label: "Satisfacción" },
  { icon: Clock, value: "15+", label: "Años de experiencia" },
];

const challenges = [
  {
    icon: Users,
    problem: "No tienes desarrolladores en tu equipo de diseño",
    solution: "Nosotros somos tu equipo técnico de confianza",
  },
  {
    icon: Clock,
    problem: "Rechazas proyectos porque hay que programarlos",
    solution: "Desarrollamos lo que tu equipo ya diseñó, bajo tu marca",
  },
  {
    icon: DollarSign,
    problem: "Pierdes el cliente al subcontratar desarrollo afuera",
    solution: "Tú cobras el proyecto completo, nosotros somos invisibles",
  },
  {
    icon: Shield,
    problem: "Te preocupa la calidad de un desarrollador externo",
    solution: "15+ años de experiencia y garantía total",
  },
];

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Convertimos tu diseño en sitios corporativos, e-commerce y aplicaciones web",
    delivery: "2-8 semanas",
    popular: false,
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
    description: "Bots y scripts para optimizar procesos de tus clientes",
    delivery: "1-4 semanas",
    popular: false,
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
    description: "La opción más popular para agencias de diseño en crecimiento",
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
    description: "Partnership exclusivo para agencias de diseño grandes",
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
  {
    question: "¿Cómo funciona exactamente el modelo de comisiones?",
    answer: "Tú le cobras a tu cliente el precio completo del proyecto. Nosotros desarrollamos el trabajo bajo tu marca y te facturamos solo nuestra parte, descontando la comisión de tu plan. Tú decides el margen final que le presentas a tu cliente.",
  },
  {
    question: "¿El cliente sabrá que ustedes desarrollan el proyecto?",
    answer: "No. Trabajamos 100% en segundo plano: sin marca visible, sin contacto directo con tu cliente y con comunicación siempre a través de tu agencia.",
  },
  {
    question: "¿Qué pasa si el cliente no queda satisfecho?",
    answer: "Incluimos rondas de revisión y ajustes dentro de cada proyecto. Si algo no cumple lo acordado, lo corregimos sin costo extra hasta que el resultado sea el esperado.",
  },
  {
    question: "¿Puedo empezar con un proyecto pequeño para probar?",
    answer: "Sí. El plan Socio Colaborador no tiene compromiso mínimo, así que puedes empezar con un solo proyecto y evaluar cómo trabajamos antes de escalar a otro plan.",
  },
  {
    question: "¿Ofrecen soporte después de la entrega?",
    answer: "Sí, todos los proyectos incluyen soporte post-entrega. El alcance exacto depende del tipo de proyecto y tu plan de partnership.",
  },
  {
    question: "¿Qué tecnologías manejan?",
    answer: "Trabajamos con tecnologías modernas como React, Next.js, React Native, Electron, WordPress y Laravel, según lo que mejor se adapte a cada proyecto de tu cliente.",
  },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/outsourcing_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-8 md:mb-12">
            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4 shrink-0" />
              Outsourcing Técnico para Agencias de Diseño
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Multiplica tus Ingresos
              <br />
              <span className="text-accent">
                sin Contratar Desarrolladores
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Somos el equipo técnico de{" "}
              <strong className="text-secondary-foreground">
                agencias de diseño exitosas
              </strong>
              . Desarrollamos lo que tu equipo ya diseñó, bajo tu marca,
              <span className="hidden sm:inline">
                {" "}mientras tú te enfocas en diseñar y conseguir clientes.
              </span>{" "}
              <strong className="text-accent">
                Gana 20-30% de comisión por proyecto.
              </strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-5 sm:py-7 text-sm sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20mi%20agencia%20de%20dise%C3%B1o%20quiere%20ser%20partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Handshake className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  Quiero ser Partner
                </a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-secondary to-neutral-900 text-white px-6 sm:px-10 py-5 sm:py-7 text-sm sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quisiera%20agendar%20una%20llamada%20sobre%20outsourcing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  Agendar Llamada
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-6 text-center shadow-xl"
              >
                <div className="hidden sm:flex w-12 h-12 bg-white/10 rounded-full items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-secondary-foreground/70">
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
              ¿Te Suena Familiar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estos son los retos que enfrentan las agencias de diseño y cómo
              los resolvemos juntos
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
        </div>
      </section>

      {/* Servicios */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Servicios que Desarrollamos Bajo tu Marca
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Convertimos lo que tu equipo diseña en proyectos funcionales,
              sin que tu cliente sepa que hay alguien más detrás
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl"
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
                        <span className="bg-secondary/20 text-secondary border border-secondary/40 text-xs px-2 py-0.5 rounded-full">
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
              Elige tu Modelo de Partnership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diferentes opciones para diferentes volúmenes y necesidades de
              tu agencia de diseño
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {partnerships.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-2xl p-6 pt-12 mb-24 text-center shadow-xl transition-transform duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-br from-secondary to-primary lg:scale-110 lg:z-10 shadow-2xl"
                    : "bg-white border border-primary/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-md">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>

                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.featured ? "text-white" : "text-primary"
                  }`}
                >
                  {plan.title}
                </h3>
                <div
                  className={`text-3xl font-bold mb-2 ${
                    plan.featured ? "text-accent" : "text-primary"
                  }`}
                >
                  {plan.commission}
                </div>
                <p
                  className={`text-sm mb-6 ${
                    plan.featured ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="space-y-2 mb-6 text-left">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.featured ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      <CircleCheckBig
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.featured ? "text-accent" : "text-primary"
                        }`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className={`w-full rounded-full px-8 py-6 text-base font-semibold transition-opacity hover:opacity-90 ${
                    plan.featured
                      ? "bg-accent text-accent-foreground"
                      : "bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white"
                  }`}
                  size="lg"
                >
                  <a
                    href={`https://wa.me/525523995604?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Contactar
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Las dudas más comunes de las agencias de diseño antes de ser
              partners
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-xl border border-primary/20 bg-white/60 backdrop-blur-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-medium text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ display: "grid" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
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
              ¿Listo para ser Nuestro Partner?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Únete a las agencias de diseño que ya confían en nosotros para
              crecer sin límites técnicos.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-7 text-lg font-semibold"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20mi%20agencia%20de%20dise%C3%B1o%20quiere%20ser%20partner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                Contactar Ahora
              </a>
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