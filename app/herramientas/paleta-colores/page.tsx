import type { Metadata } from "next"
import { Palette } from "lucide-react"
import { EncabezadoHerramienta } from "@/components/herramientas/encabezado"
import { PaletaGenerator } from "@/components/herramientas/paleta-generator"
import { SeccionHistorial } from "@/components/herramientas/seccion-historial"
import type { DatosPaleta } from "@/lib/herramientas/esquemas"
import { contextoHerramienta } from "@/lib/herramientas/pagina"

export const metadata: Metadata = {
  title: "Generador Paleta de Colores Gratis | Selector HSL y Variables CSS",
  description:
    "Herramienta gratuita para crear paletas de colores perfectas. Selector visual HSL, variables CSS automáticas y vista previa en tiempo real para diseñadores.",
  keywords: [
    "paleta de colores",
    "generador colores",
    "selector HSL",
    "variables CSS",
    "color picker",
    "paleta web",
    "diseño colores",
  ],
  alternates: { canonical: "/herramientas/paleta-colores" },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ h?: string }> }) {
  const { h } = await searchParams
  const { sesion, historial, inicial } = await contextoHerramienta<DatosPaleta>("paleta", h)

  return (
    <>
      <EncabezadoHerramienta
        icono={Palette}
        titulo="Generador de Paletas"
        texto="Crea paletas de colores perfectas para tu proyecto. Fácil, rápido y gratis."
        puntos={["Código listo para usar", "Múltiples formatos", "Historial con tu cuenta"]}
      />

      <section className="bg-neutral-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <PaletaGenerator key={h ?? "nuevo"} sesion={sesion} inicial={inicial} />
        </div>
      </section>

      {sesion && <SeccionHistorial herramienta="paleta" entradas={historial} />}
    </>
  )
}
