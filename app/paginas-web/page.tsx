import {
  Globe,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  Clock,
  CircleCheckBig,
  Building,
  FileText,
  ShoppingCart,
  Database,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const whyUs = [
  {
    icon: Zap,
    title: "Velocidad Optimizada",
    description: "Carga rápida garantizada para mejor experiencia de usuario",
  },
  {
    icon: Shield,
    title: "Seguridad Total",
    description: "SSL certificado y protección contra amenazas",
  },
  {
    icon: Users,
    title: "Fácil de Usar",
    description: "Interfaces intuitivas que cualquiera puede manejar",
  },
  {
    icon: Star,
    title: "Soporte Continuo",
    description: "Asistencia técnica cuando la necesites",
  },
];

const packages = [
  {
    icon: Globe,
    title: "Landing Page",
    price: "$4,500",
    oldPrice: "$5,500",
    delivery: "Entrega: 5-7 días",
    description: "Página única optimizada para conversiones y ventas",
    featured: false,
  },
  {
    icon: Building,
    title: "Sitio Corporativo",
    price: "$6,000",
    oldPrice: "$8,000",
    delivery: "Entrega: 12-16 días",
    description: "Sitio empresarial completo con hasta 5 secciones",
    featured: false,
  },
  {
    icon: FileText,
    title: "WordPress Pro",
    price: "$8,000",
    oldPrice: "$9,000",
    delivery: "Entrega: 10-14 días",
    description: "Sitio web profesional con gestor de contenidos",
    featured: true,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    price: "$15,000",
    oldPrice: "$20,000",
    delivery: "Entrega: 21-30 días",
    description: "Tienda online completa para vender en línea",
    featured: false,
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

        <div className="relative max-w-6xl mx-auto px-6 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Páginas Web Profesionales
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tu presencia digital
            <span className="text-accent"> profesional</span>
          </h1>

          <p className="text-xl text-secondary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Creamos sitios web que convierten visitantes en clientes. Desde
            landing pages hasta sistemas complejos, tenemos la solución
            perfecta para tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg">
              Ver Paquetes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              <MessageCircle className="mr-2 w-5 h-5" />
              Consulta Gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué elegir nuestros sitios web?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada sitio que creamos está diseñado para generar resultados
              reales para tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
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

      {/* Paquetes */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Paquetes Estándar
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones probadas y optimizadas para diferentes tipos de
              negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className={`relative rounded-2xl backdrop-blur-xl p-6 shadow-xl ${
                  pkg.featured
                    ? "border-2 border-primary bg-primary/10 lg:scale-105"
                    : "border border-primary/20 bg-white/40"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-primary/10 border border-primary/30">
                    <pkg.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {pkg.oldPrice}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{pkg.delivery}</span>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Ver Detalles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CMS */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl p-8 shadow-xl shadow-primary/10 text-center">
            <div className="w-16 h-16 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <Database className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              ¿Necesitas algo más complejo?
            </h2>
            <div className="text-xl font-bold text-primary mb-1">
              Cotización Personalizada
            </div>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Para proyectos empresariales que requieren un sistema
              desarrollado 100% a medida.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                Ver Detalles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 w-4 h-4" />
                Solicitar Cotización
              </Button>
            </div>
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
              ¿Necesitas algo diferente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cada proyecto es único. Platiquemos sobre tus necesidades
              específicas y creemos una solución 100% personalizada para tu
              negocio.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="mr-2 w-5 h-5" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}