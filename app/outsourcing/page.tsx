import { Award, Briefcase, Check, ChevronRight, Clock, Code, DollarSign, Monitor, Shield, Smartphone, Users, X, Zap } from "lucide-react";
import { CarruselPortafolio } from "@/components/portafolio/carrusel";
import { PageHero } from "@/components/site/service-page";
import { btnLight, btnOutlineLight, CtaBand, cardClass, IconCard, PlansTable, Section, SectionHeader, type Plan } from "@/components/site/blocks";
import { Faq } from "@/components/seo/faq";
import { whatsappLink } from "@/lib/seo/oferta";

const heroStats = [
  { icon: Briefcase, value: "300+", label: "Proyectos entregados" },
  { icon: Award, value: "98%", label: "Satisfacción" },
  { icon: Clock, value: "15+", label: "Años de experiencia" },
];

const challenges = [
  { icon: Users, problem: "No tienes desarrolladores en tu equipo de diseño", solution: "Nosotros somos tu equipo técnico de confianza" },
  { icon: Clock, problem: "Rechazas proyectos porque hay que programarlos", solution: "Desarrollamos lo que tu equipo ya diseñó, bajo tu marca" },
  { icon: DollarSign, problem: "Pierdes el cliente al subcontratar desarrollo afuera", solution: "Tú cobras el proyecto completo, nosotros somos invisibles" },
  { icon: Shield, problem: "Te preocupa la calidad de un desarrollador externo", solution: "15+ años de experiencia y garantía total" },
];

const services = [
  { icon: Code, title: "Desarrollo web", description: "Convertimos tu diseño en sitios corporativos, e-commerce y aplicaciones web", delivery: "2-8 semanas" },
  { icon: Smartphone, title: "Apps móviles", description: "iOS y Android con tecnología React Native", delivery: "6-12 semanas" },
  { icon: Monitor, title: "Software desktop", description: "Aplicaciones de escritorio multiplataforma", delivery: "4-10 semanas" },
  { icon: Zap, title: "Automatizaciones", description: "Bots y scripts para optimizar procesos de tus clientes", delivery: "1-4 semanas" },
];

const waPartner = whatsappLink("Hola, mi agencia de diseño quiere ser partner");

const partnerships: Plan[] = [
  {
    name: "Socio Colaborador",
    price: "20%",
    unit: "comisión",
    lead: "Perfecta para empezar y proyectos puntuales",
    items: ["Desarrollamos bajo tu marca", "Tú cobras el precio completo", "Sin compromiso mínimo", "Soporte post-entrega incluido"],
    cta: "Contactar",
    href: whatsappLink("Hola, me interesa el plan Socio Colaborador"),
    external: true,
  },
  {
    name: "Socio Estratégico",
    badge: "Más popular",
    price: "25%",
    unit: "comisión",
    lead: "La opción más popular para agencias de diseño en crecimiento",
    items: ["Descuentos de 15-30% en servicios", "Prioridad en tiempos de entrega", "Account manager dedicado", "Reportes detallados de progreso"],
    cta: "Contactar",
    href: whatsappLink("Hola, me interesa el plan Socio Estratégico"),
    external: true,
    featured: true,
  },
  {
    name: "Socio Premium",
    price: "A negociar",
    lead: "Partnership exclusivo para agencias de diseño grandes",
    items: ["Equipo dedicado exclusivo", "Exclusividad territorial", "Revenue sharing en proyectos grandes", "Soporte 24/7 prioritario"],
    cta: "Contactar",
    href: whatsappLink("Hola, me interesa el plan Socio Premium"),
    external: true,
  },
];

const faqs = [
  { q: "¿Cómo funciona exactamente el modelo de comisiones?", a: "Tú le cobras a tu cliente el precio completo del proyecto. Nosotros desarrollamos el trabajo bajo tu marca y te facturamos solo nuestra parte, descontando la comisión de tu plan. Tú decides el margen final que le presentas a tu cliente." },
  { q: "¿El cliente sabrá que ustedes desarrollan el proyecto?", a: "No. Trabajamos 100% en segundo plano: sin marca visible, sin contacto directo con tu cliente y con comunicación siempre a través de tu agencia." },
  { q: "¿Qué pasa si el cliente no queda satisfecho?", a: "Incluimos rondas de revisión y ajustes dentro de cada proyecto. Si algo no cumple lo acordado, lo corregimos sin costo extra hasta que el resultado sea el esperado." },
  { q: "¿Puedo empezar con un proyecto pequeño para probar?", a: "Sí. El plan Socio Colaborador no tiene compromiso mínimo, así que puedes empezar con un solo proyecto y evaluar cómo trabajamos antes de escalar a otro plan." },
  { q: "¿Ofrecen soporte después de la entrega?", a: "Sí, todos los proyectos incluyen soporte post-entrega. El alcance exacto depende del tipo de proyecto y tu plan de partnership." },
  { q: "¿Qué tecnologías manejan?", a: "Trabajamos con tecnologías modernas como React, Next.js, React Native, Electron, WordPress y Laravel, según lo que mejor se adapte a cada proyecto de tu cliente." },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/outsourcing_bg.jpg"
        eyebrow="Outsourcing técnico para agencias de diseño"
        title="Multiplica tus ingresos sin contratar desarrolladores."
        intro="Somos el equipo técnico de agencias de diseño exitosas. Desarrollamos lo que tu equipo ya diseñó, bajo tu marca, mientras tú te enfocas en diseñar y conseguir clientes. Gana 20-30% de comisión por proyecto."
        actions={
          <>
            <a href={waPartner} target="_blank" rel="noopener noreferrer" className={btnLight}>
              Quiero ser partner
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappLink("Hola, quisiera agendar una llamada sobre outsourcing")}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutlineLight}
            >
              Agendar llamada
            </a>
          </>
        }
      >
        <div className="bg-white text-foreground shadow-2xl">
          <ul className="divide-y divide-border">
            {heroStats.map((s) => (
              <li key={s.label} className="flex items-center gap-5 px-6 sm:px-8 py-6">
                <s.icon className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                <span className="text-4xl font-light">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <Section bg="bg-white">
        <SectionHeader
          title="¿Te suena familiar?"
          text="Estos son los retos que enfrentan las agencias de diseño y cómo los resolvemos juntos."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {challenges.map((c) => (
            <div key={c.problem} className={cardClass}>
              <c.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <p className="flex items-start gap-3 text-foreground">
                <X className="w-4 h-4 text-primary shrink-0 mt-1.5" />
                {c.problem}
              </p>
              <p className="mt-3 flex items-start gap-3 text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0 mt-1.5" strokeWidth={2.5} />
                {c.solution}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="bg-neutral-100">
        <SectionHeader
          title="Servicios que desarrollamos bajo tu marca"
          text="Convertimos lo que tu equipo diseña en proyectos funcionales, sin que tu cliente sepa que hay alguien más detrás."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <IconCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              description={s.description}
              footer={
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Entrega: {s.delivery}
                </p>
              }
            />
          ))}
        </div>
      </Section>

      <Section bg="bg-white">
        <SectionHeader
          title="Elige tu modelo de partnership"
          text="Diferentes opciones para diferentes volúmenes y necesidades de tu agencia de diseño."
        />
        <PlansTable plans={partnerships} />
        <CarruselPortafolio categoria="outsourcing" className="mt-16" />
      </Section>

      <Faq items={faqs} title="Preguntas de agencias antes de ser partners" />

      <CtaBand
        bg="bg-neutral-100"
        title="¿Listo para ser nuestro partner?"
        text="Únete a las agencias de diseño que ya confían en nosotros para crecer sin límites técnicos."
        cta="Contactar ahora"
        href={waPartner}
        notes={["Respuesta en 2 horas", "Sin compromiso inicial", "98% satisfacción"]}
      />
    </>
  );
}
