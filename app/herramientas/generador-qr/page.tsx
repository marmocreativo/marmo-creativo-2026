import type { Metadata } from "next"
import { BarChart3, Crown, Palette, QrCode, Sparkles } from "lucide-react"
import { EncabezadoHerramienta } from "@/components/herramientas/encabezado"
import { QrGenerator } from "@/components/herramientas/qr-generator"
import { SeccionHistorial } from "@/components/herramientas/seccion-historial"
import { SeccionPremium } from "@/components/herramientas/seccion-premium"
import type { DatosQR } from "@/lib/herramientas/esquemas"
import { contextoHerramienta } from "@/lib/herramientas/pagina"

export const metadata: Metadata = {
  title: "Generador QR Gratis | Códigos QR con Logo y Colores Personalizados",
  description:
    "Generador de códigos QR gratuito y fácil. Crea QR para URL, WiFi, email, teléfono con colores personalizados y logo. Descarga inmediata e historial con tu cuenta.",
  keywords: [
    "generador QR gratis",
    "código QR personalizado",
    "QR con logo",
    "generador código QR",
    "QR wifi",
    "QR colores",
    "herramienta QR gratuita",
  ],
  alternates: { canonical: "/herramientas/generador-qr" },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ h?: string }> }) {
  const { h } = await searchParams
  const { sesion, historial, inicial } = await contextoHerramienta<DatosQR>("qr", h)

  return (
    <>
      <EncabezadoHerramienta
        icono={QrCode}
        titulo="Generador de Códigos QR"
        texto="Crea códigos QR funcionales para tus proyectos. Gratis, fácil y rápido."
        puntos={["Descarga inmediata", "Con logo y colores", "Historial con tu cuenta"]}
      />

      <section className="bg-neutral-100 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <QrGenerator key={h ?? "nuevo"} sesion={sesion} inicial={inicial} />
        </div>
      </section>

      {sesion && <SeccionHistorial herramienta="qr" entradas={historial} />}

      <SeccionPremium
        funciones={[
          { icon: Palette, title: "Diseños con gradientes", description: "QR coloridos con efectos degradados" },
          { icon: Crown, title: "Logos personalizados", description: "QR con tu marca en el centro" },
          { icon: BarChart3, title: "Estadísticas de escaneo", description: "Análisis de cuántas veces se escaneó" },
          { icon: Sparkles, title: "QR dinámicos", description: "Cambia el contenido sin regenerar el código" },
        ]}
        texto="Podemos crear una versión premium con todas las funciones que necesites para tu negocio."
        cta="Solicitar cotización"
        mensaje="Hola, me interesa una herramienta de QR personalizada con funciones premium como gradientes, logos y estadísticas"
      />
    </>
  )
}
