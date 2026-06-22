import Image from "next/image";
import {
  Palette,
  ArrowRight,
  Briefcase,
  Printer,
  Target,
  Package,
  Globe,
  Award,
  Camera,
  Crown,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const heroServices = [
  { icon: Briefcase, title: "Branding Completo", price: "Desde $3,000" },
  { icon: SiInstagram, title: "Redes Sociales", price: "Desde $1,500/mes" },
  { icon: Printer, title: "Material Gráfico", price: "Cotización personalizada" },
];

const gallery = [
  { image: "/images/grafico/grafico-1.png", title: "70 Aniversario Sonora Santanera", tag: "Redes" },
  { image: "/images/grafico/grafico-2.png", title: "GeneticLab", tag: "Impresos" },
  { image: "/images/grafico/grafico-3.png", title: "Logo CES ENERGY", tag: "Branding" },
  { image: "/images/grafico/grafico-4.png", title: "Logo Jose Luis Duval", tag: "Branding" },
  { image: "/images/grafico/grafico-5.png", title: "Glass Studio", tag: "Branding" },
  { image: "/images/grafico/grafico-6.png", title: "CREE-IXE", tag: "Redes Sociales" },
  { image: "/images/grafico/grafico-7.png", title: "Prem Dayal", tag: "Redes Sociales" },
  { image: "/images/grafico/grafico-8.png", title: "Briefing Aranza", tag: "Impresos" },
  { image: "/images/grafico/grafico-9.png", title: "Key Productions", tag: "Impresos" },
  { image: "/images/grafico/grafico-10.png", title: "Key Productions", tag: "Redes Sociales" },
  { image: "/images/grafico/grafico-11.png", title: "Tony Balardi y Luis de la Mora", tag: "Redes Sociales" },
  { image: "/images/grafico/grafico-12.png", title: "Capetillo Producciones", tag: "Redes Sociales" },
];

const brandingIncludes = [
  { icon: Target, title: "Identidad Corporativa" },
  { icon: Briefcase, title: "Papelería Empresarial" },
  { icon: Package, title: "Packaging y Etiquetas" },
  { icon: Globe, title: "Aplicaciones Digitales" },
  { icon: Printer, title: "Material Publicitario" },
  { icon: Award, title: "Manual de Marca" },
];

const socialPlans = [
  { icon: SiInstagram, title: "Básico", price: "$2,200", oldPrice: "$2,900", description: "Contenido esencial para redes sociales", featured: false },
  { icon: Camera, title: "Profesional", price: "$4,000", oldPrice: "$5,200", description: "Contenido completo para múltiples plataformas", featured: true },
  { icon: Crown, title: "Premium", price: "$7,000", oldPrice: "$9,000", description: "Suite completa de contenido premium", featured: false },
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
              <Palette className="w-4 h-4" />
              Diseño Gráfico Profesional
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tu Marca Merece
              <span className="text-accent block">Diseños que Impacten</span>
            </h1>

            <p className="text-xl text-secondary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Creamos identidades visuales memorables, contenido para redes
              sociales y soluciones gráficas que hacen que tu marca destaque.
            </p>

            <Button size="lg">
              Ver Nuestros Trabajos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {heroServices.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-xl"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-1">{service.title}</h3>
                <p className="text-sm text-secondary-foreground/70">
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Nuestros Trabajos de Diseño
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora nuestra galería de proyectos reales y descubre la
              calidad de nuestros diseños
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.image}
                className="group relative rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={256}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-primary font-semibold mb-6">
              ¿Te gusta nuestro estilo? Creemos algo único para tu marca.
            </p>
            <Button size="lg">
              Solicitar Mi Diseño
              <Palette className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Branding completo */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Branding Completo desde $3,000
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Creamos la identidad visual completa de tu marca que conecta
              con tu audiencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {brandingIncludes.map((item) => (
              <div
                key={item.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-primary">{item.title}</h3>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl p-8 text-center shadow-xl shadow-primary/10">
            <h3 className="text-xl font-bold mb-2 text-primary">
              Paquete Branding Completo
            </h3>
            <div className="text-3xl font-bold text-primary mb-1">
              $3,000
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Entrega: 10-15 días
            </p>
            <Button size="lg">
              Solicitar Branding Completo
              <Briefcase className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Paquetes redes sociales */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Paquetes para Redes Sociales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Contenido visual profesional que hace crecer tu presencia
              digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {socialPlans.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-2xl backdrop-blur-xl p-6 text-center shadow-xl ${
                  plan.featured
                    ? "border-2 border-primary bg-primary/10 md:scale-105"
                    : "border border-primary/20 bg-white/40"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Más Popular
                    </div>
                  </div>
                )}
                <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  {plan.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {plan.oldPrice}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <Button className="w-full" size="sm">
                  Contratar {plan.title}
                </Button>
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
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Listo para Destacar Visualmente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tu marca merece diseños que generen impacto. Empecemos a crear
              algo extraordinario juntos.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="mr-2 w-5 h-5" />
              ¡Empezar Mi Proyecto de Diseño!
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}