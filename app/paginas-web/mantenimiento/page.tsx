import {
  Shield,
  CircleCheckBig,
  ArrowRight,
  RefreshCw,
  Database,
  Zap,
  Search,
  Phone,
  MessageCircle,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const whyCritical = [
  { value: "30K", title: "Sitios Hackeados Diarios", description: "Tu sitio puede ser el siguiente" },
  { value: "24/7", title: "Monitoreo Continuo", description: "Vigilancia constante" },
  { value: "99.9%", title: "Uptime Garantizado", description: "Siempre disponible para tus clientes" },
];

const services = [
  { icon: Shield, title: "Seguridad Avanzada", description: "Protección 24/7 contra malware y hackers" },
  { icon: RefreshCw, title: "Updates Automáticos", description: "WordPress, plugins y temas actualizados" },
  { icon: Database, title: "Backups Seguros", description: "Copias automáticas en la nube" },
  { icon: Zap, title: "Optimización Velocidad", description: "Sitio rápido y mejor ranking SEO" },
  { icon: Search, title: "Monitoreo SEO", description: "Seguimiento del posicionamiento" },
];

const plans = [
  {
    icon: Shield,
    title: "Básico",
    price: "$2,000",
    oldPrice: "$2,500",
    description: "Protección esencial para sitios pequeños",
    features: ["Backup semanal automático", "Updates de seguridad básicos", "Monitoreo uptime 24/7", "Soporte por email"],
    featured: false,
  },
  {
    icon: Zap,
    title: "Profesional",
    price: "$3,500",
    oldPrice: "$4,500",
    description: "Mantenimiento completo para sitios empresariales",
    features: ["Backup diario automático", "Updates completos", "Soporte por WhatsApp", "Hasta 5 cambios/mes"],
    featured: true,
  },
  {
    icon: Crown,
    title: "Empresarial",
    price: "$5,500",
    oldPrice: "$7,000",
    description: "Servicio premium para e-commerce",
    features: ["Backup diario + versionado", "Updates inmediatos", "Soporte prioritario", "Cambios ilimitados"],
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

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Mantenimiento Web Profesional
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Tu Sitio Web Siempre
                <span className="text-accent block">
                  Seguro y Actualizado
                </span>
              </h1>

              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Servicio mensual que mantiene tu sitio protegido, rápido y
                funcionando 24/7. Olvídate de preocupaciones técnicas.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Protección 24/7 contra hackers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-400" />
                  <span>Backups diarios automáticos</span>
                </div>
              </div>

              <Button size="lg">
                Ver Planes de Protección
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  ⚠️ RIESGO REAL
                </div>
                <h3 className="text-xl font-bold mb-6">
                  La Realidad de los Sitios Web
                </h3>

                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1 text-red-400">30,000</div>
                    <div className="text-sm text-secondary-foreground/70">sitios hackeados diariamente</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1 text-orange-400">$50K+</div>
                    <div className="text-sm text-secondary-foreground/70">costo promedio de un ataque</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-sm text-green-300 font-semibold">
                    ✅ Con mantenimiento profesional tu sitio está protegido
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué es crítico */}
      <section
        className="relative py-16 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              ¿Por qué es Crítico el Mantenimiento?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyCritical.map((stat) => (
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

      {/* Servicios incluidos */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Servicios Incluidos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protección integral que mantiene tu sitio funcionando como el
              primer día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="text-center rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Planes de Mantenimiento Mensual
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sin compromisos largos • Cancela cuando quieras
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
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
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-primary/10 border border-primary/30">
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
                  <div className="text-xs text-muted-foreground mb-3">
                    MXN + IVA / mes
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Contratar
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
              No Esperes a que sea Tarde
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cada día sin mantenimiento es un día de riesgo. Protege tu
              inversión digital hoy mismo.
            </p>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-xl text-muted-foreground line-through">
                $4,500
              </div>
              <div className="text-4xl font-bold text-primary">$3,500</div>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              ¡Proteger Mi Sitio Ahora!
              <MessageCircle className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}