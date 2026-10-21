import type { LucideIcon } from "lucide-react"
import { CtaBand, IconCard, Section, SectionHeader } from "@/components/site/blocks"
import { whatsappLink } from "@/lib/seo/oferta"

// "¿Necesitas algo más avanzado?": mismas funciones premium que tenían las herramientas legacy.
export function SeccionPremium({
    funciones,
    cta,
    mensaje,
    texto,
}: {
    funciones: { icon: LucideIcon; title: string; description: string }[]
    cta: string
    mensaje: string
    texto: string
}) {
    return (
        <>
            <Section bg="bg-neutral-100">
                <SectionHeader
                    title="Funciones premium disponibles."
                    text="Si necesitas características más avanzadas, podemos crear una herramienta personalizada para ti."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                    {funciones.map((f) => (
                        <IconCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
                    ))}
                </div>
            </Section>
            <CtaBand bg="bg-white" title="¿Te interesa una herramienta personalizada?" text={texto} cta={cta} href={whatsappLink(mensaje)} />
        </>
    )
}
