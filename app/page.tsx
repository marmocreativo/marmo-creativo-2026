import {
  Globe,
  Smartphone,
  Palette,
  ArrowRight,
  CircleCheckBig,
  ChevronRight,
  QrCode,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  ArrowDown,
  Mail,
  Building2,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 min-h-screen pt-20 flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="max-w-6xl mx-auto px-6 text-center space-y-8 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Transformamos tus ideas en
            <span className="block text-accent">soluciones digitales</span>
          </h1>

          <p className="text-xl md:text-2xl text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Desarrollo web, software personalizado, UX/UI y diseño gráfico
            para empresas que buscan destacar en el mercado digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Ver Servicios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 text-left">
            {/* Card 1: Páginas Web */}
            <div className="relative rounded-2xl border border-primary/30 bg-primary/1 backdrop-blur-xl p-6 shadow-2xl shadow-primary/20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Páginas Web</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Sitios optimizados para conversión, diseño UX/UI y rendimiento real.
                </p>
              </div>
            </div>

            {/* Card 2: Desarrollo de Software */}
            <div className="relative rounded-2xl border border-primary/30 bg-primary/1 backdrop-blur-xl p-6 shadow-2xl shadow-primary/20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Desarrollo de Software</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Apps, automatizaciones y sistemas a medida que crecen con tu negocio.
                </p>
              </div>
            </div>

            {/* Card 3: Diseño Gráfico */}
            <div className="relative rounded-2xl border border-primary/30 bg-primary/1 backdrop-blur-xl p-6 shadow-2xl shadow-primary/20 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Diseño Gráfico</h3>
                <p className="text-sm text-secondary-foreground/70">
                  Identidad visual y contenido que hace que tu marca destaque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acerca de */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl border border-border bg-white/40 backdrop-blur-xl p-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Acerca de Marmo Creativo
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong className="text-foreground">
                    L.D.G. Manuel Marmolejo Martínez (Marmo)
                  </strong>{" "}
                  es diseñador gráfico y desarrollador web fullstack con más
                  de 15 años de experiencia trabajando con empresas de todos
                  los tamaños.
                </p>
                <p>
                  En 2025 echa a andar{" "}
                  <strong className="text-foreground">
                    "Marmo Creativo"
                  </strong>
                  , un estudio creativo que combina experiencia y talento
                  joven para ofrecer soluciones digitales personalizadas.
                </p>
                <p>
                  Mantenemos un equipo pequeño que garantiza trato personal y
                  diseño a medida, aprovechando las habilidades de
                  diseñadores talentosos para potenciar tu negocio.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl p-8 shadow-xl shadow-primary/10 space-y-5">
              {[
                "Trato personalizado y directo",
                "Diseño a medida para cada cliente",
                "Equipo especializado y talentoso",
                "Soluciones escalables y modernas",
              ].map((text) => (
                <div key={text} className="flex items-center gap-4">
                  <CircleCheckBig className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {[
              { value: "15+", label: "Años de Experiencia" },
              { value: "140+", label: "Clientes Satisfechos" },
              { value: "420+", label: "Proyectos Completados" },
            ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-2xl border border-accent/40 bg-accent/10 backdrop-blur-xl p-6 shadow-xl shadow-accent/10"
                >
                <div className="text-6xl md:text-7xl font-bold mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="relative py-20 bg-background overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones integrales de diseño y desarrollo para potenciar tu
              presencia digital y hacer crecer tu negocio con tecnología de
              vanguardia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Páginas Web",
                description:
                  "Sitios web profesionales con diseño UX/UI optimizado, responsivos y enfocados en conversiones",
                items: [
                  "Landing Pages efectivas",
                  "WordPress personalizado",
                  "E-commerce completo",
                  "Diseño UX/UI profesional",
                  "Optimización SEO",
                  "Mantenimiento técnico",
                ],
              },
              {
                icon: Smartphone,
                title: "Desarrollo de Software",
                description:
                  "Aplicaciones web y móviles personalizadas que automatizan y optimizan tus procesos de negocio",
                items: [
                  "Apps móviles nativas",
                  "Aplicaciones de escritorio",
                  "Sistemas web complejos",
                  "Automatización de procesos",
                  "Integración de APIs",
                  "Consultoría técnica",
                ],
              },
              {
                icon: Palette,
                title: "Diseño Gráfico",
                description:
                  "Branding completo, identidad visual consistente y materiales promocionales que destacan tu marca",
                items: [
                  "Identidad corporativa",
                  "Material publicitario",
                  "Contenido para redes sociales",
                  "Packaging y editorial",
                  "Outsourcing creativo",
                  "Impresión especializada",
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-8 shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button variant="secondary" className="w-full">
                  Ver detalles
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl p-8 shadow-xl shadow-primary/10">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Cada proyecto es único. Contáctanos para discutir tus
                necesidades específicas y crear una solución personalizada
                para tu negocio.
              </p>
              <Button size="lg">Solicitar consulta gratuita</Button>
            </div>
          </div>
        </div>
      </section>


      {/* Contacto */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Hablemos de tu Proyecto
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ¿Listo para llevar tu negocio al siguiente nivel? Contáctanos y
              hagamos realidad tu proyecto digital. Respuesta garantizada en
              menos de 24 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          <a
            href="https://wa.me/525523995604"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-green-500/40 bg-white/40 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <MessageCircle className="absolute -right-6 -bottom-6 w-40 h-40 text-green-500/15 rotate-12" />
            <div className="relative">
              <h3 className="text-2xl font-bold mb-1 text-green-600">WhatsApp</h3>
              <p className="text-muted-foreground mb-3">Respuesta inmediata</p>
              <p className="font-semibold text-lg text-green-600">+52 55 2399 5604</p>
            </div>
          </a>
          <a
          
            href="mailto:marmocreativo@gmail.com"
            className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-white/40 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <Mail className="absolute -right-6 -bottom-6 w-40 h-40 text-primary/15 rotate-12" />
            <div className="relative">
              <h3 className="text-2xl font-bold mb-1 text-primary">Email</h3>
              <p className="text-muted-foreground mb-3">
                Respuesta profesional
              </p>
              <p className="font-semibold text-lg text-primary">marmocreativo@gmail.com</p>
            </div>
          </a>
        </div>
        </div>
      </section>
    </>
  );
}