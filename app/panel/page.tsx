import Link from "next/link"
import { ArrowRight } from "lucide-react"

const herramientas = [
  { titulo: "Generador de QR", texto: "Crea códigos QR para tu negocio.", href: "/herramientas/generador-qr" },
  { titulo: "Botón de WhatsApp", texto: "Genera el enlace y el botón para tu sitio.", href: "/herramientas/boton-whatsapp" },
  { titulo: "Paleta de colores", texto: "Arma la paleta de tu marca.", href: "/herramientas/paleta-colores" },
]

export default function Page() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground">Tus herramientas gratuitas</h2>
      <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Con tu cuenta tienes acceso a todo esto. Pronto sumaremos más servicios.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {herramientas.map((h) => (
          <Link
            key={h.href}
            href={h.href}
            className="group rounded-xl border border-border p-6 hover:border-foreground transition-colors"
          >
            <h3 className="text-xl font-light text-foreground">{h.titulo}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.texto}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
              Abrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
