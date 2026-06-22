import Link from "next/link";
import {
  Gift,
  CircleCheckBig,
  QrCode,
  MessageCircle,
  Palette,
  Monitor,
  Code,
  Sparkles,
  ExternalLink,
  Clock,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const tools = [
  {
    icon: QrCode,
    title: "Generador QR",
    description: "Crea códigos QR personalizados para cualquier propósito",
    available: true,
    href: "/herramientas/generador-qr",
  },
  {
    icon: MessageCircle,
    title: "Botones WhatsApp",
    description: "Genera botones de WhatsApp para tu sitio web",
    available: true,
    href: "/herramientas/boton-whatsapp",
  },
  {
    icon: Palette,
    title: "Paletas de Color",
    description: "Genera paletas de colores perfectas para tus proyectos",
    available: true,
    href: "/herramientas/paleta-colores",
  },
  {
    icon: Monitor,
    title: "Generador Favicon",
    description: "Crea favicons optimizados para tu sitio web",
    available: false,
    href: null,
  },
  {
    icon: Code,
    title: "Generador CSS",
    description: "Crea gradientes y efectos CSS con interfaz visual",
    available: false,
    href: null,
  },
  {
    icon: Sparkles,
    title: "Optimizador de Imágenes",
    description: "Optimiza y comprime imágenes sin perder calidad",
    available: false,
    href: null,
  },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary-foreground/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Herramientas Gratuitas
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Herramientas Útiles Para Ti
          </h1>

          <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Una colección de herramientas gratuitas que he creado para hacer
            tu trabajo más fácil.{" "}
            <strong className="text-secondary-foreground">
              Sin costo, sin registro, listas para usar.
            </strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <CircleCheckBig className="w-5 h-5 text-green-400" />
              <span>100% Gratuitas</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="w-5 h-5 text-green-400" />
              <span>Fáciles de usar</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="w-5 h-5 text-green-400" />
              <span>Siempre disponibles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de herramientas */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Herramientas Disponibles
            </h2>
            <p className="text-muted-foreground">
              Haz clic en cualquier herramienta para usarla o solicitar
              información
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card
                key={tool.title}
                className={
                  tool.available
                    ? "border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    : "hover:shadow-lg hover:scale-105 transition-all duration-300"
                }
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white ${
                      tool.available ? "bg-primary" : "bg-muted-foreground/40"
                    }`}
                  >
                    <tool.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg font-bold mb-2">
                    {tool.title}
                  </CardTitle>
                  <div className="mb-3">
                    {tool.available ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                        <CircleCheckBig className="w-4 h-4" />
                        Disponible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                        <Clock className="w-4 h-4" />
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {tool.available && tool.href ? (
                    <Button asChild className="w-full">
                      <Link href={tool.href}>
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Usar Ahora
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Solicitar Info
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA personalizado */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-secondary text-secondary-foreground rounded-2xl p-8">
            <Wrench className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas Algo Específico?
            </h2>
            <p className="text-xl text-secondary-foreground/80 mb-6">
              Si no encuentras lo que necesitas, puedo crear una herramienta
              personalizada para ti.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary-foreground/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">🎯</div>
                <div className="text-sm">Hecha a tu medida</div>
              </div>
              <div className="bg-secondary-foreground/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">⚡</div>
                <div className="text-sm">Entrega rápida</div>
              </div>
              <div className="bg-secondary-foreground/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">💝</div>
                <div className="text-sm">Precio justo</div>
              </div>
            </div>

            <Button size="lg" variant="outline">
              Solicitar Cotización
              <MessageCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}