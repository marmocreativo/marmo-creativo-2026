import type { Metadata } from "next"
import { BarChart3, Crown, MessageCircle, Palette, Zap } from "lucide-react"
import { EncabezadoHerramienta } from "@/components/herramientas/encabezado"
import { SeccionHistorial } from "@/components/herramientas/seccion-historial"
import { SeccionPremium } from "@/components/herramientas/seccion-premium"
import { WhatsappGenerator } from "@/components/herramientas/whatsapp-generator"
import type { DatosWhatsapp } from "@/lib/herramientas/esquemas"
import { contextoHerramienta } from "@/lib/herramientas/pagina"

export const metadata: Metadata = {
  title: "Generador Botones WhatsApp Gratis | Click to Chat Personalizado",
  description:
    "Crea botones WhatsApp personalizados para tu web. Código HTML, Bootstrap, Tailwind listo para usar. Con mensaje predefinido y estilos personalizables.",
  keywords: [
    "botón whatsapp",
    "click to chat",
    "generador whatsapp",
    "código whatsapp web",
    "botón whatsapp html",
    "whatsapp business button",
  ],
  alternates: { canonical: "/herramientas/boton-whatsapp" },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ h?: string }> }) {
  const { h } = await searchParams
  const { sesion, historial, inicial } = await contextoHerramienta<DatosWhatsapp>("whatsapp", h)

  return (
    <>
      <EncabezadoHerramienta
        icono={MessageCircle}
        titulo="Generador de Botones WhatsApp"
        texto={'Crea botones "Click to Chat" personalizados para tu sitio web. Fácil, rápido y gratis.'}
        puntos={["Código listo para usar", "Múltiples formatos", "Historial con tu cuenta"]}
      />

      <section className="bg-neutral-100 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <WhatsappGenerator key={h ?? "nuevo"} sesion={sesion} inicial={inicial} />
        </div>
      </section>

      {sesion && <SeccionHistorial herramienta="whatsapp" entradas={historial} />}

      <SeccionPremium
        funciones={[
          { icon: Palette, title: "Diseños avanzados", description: "Botones con animaciones y efectos especiales" },
          { icon: BarChart3, title: "Estadísticas de clics", description: "Análisis de cuántas personas hacen clic" },
          { icon: Crown, title: "Múltiples números", description: "Sistema para diferentes departamentos" },
          { icon: Zap, title: "Integración CRM", description: "Conecta con tu sistema de gestión" },
        ]}
        texto="Podemos crear una versión premium con estadísticas, múltiples números y diseños avanzados."
        cta="Solicitar herramienta personalizada"
        mensaje="Hola, me interesa una herramienta de WhatsApp personalizada con funciones premium como estadísticas, múltiples números y diseños avanzados"
      />
    </>
  )
}
