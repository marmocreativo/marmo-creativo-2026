import Link from "next/link"
import { ArrowRight, Database, FolderOpen } from "lucide-react"

const secciones = [
  {
    href: "/admin/configuracion/sql",
    icono: Database,
    titulo: "Consulta SQL",
    texto: "Corre consultas, migraciones y seeds directo en la base de datos, sin consola. También sirve para revisar cómo está la base.",
  },
  {
    href: "/admin/configuracion/multimedia",
    icono: FolderOpen,
    titulo: "Importar multimedia",
    texto: "Explorador de la carpeta de imágenes del servidor: crea carpetas y sube archivos (o carpetas completas) sin modificarlos.",
  },
]

export default function Page() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground">Configuración</h2>
      <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Herramientas para mantener el sitio y pasar tu trabajo de local a producción.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {secciones.map((s) => (
          <Link key={s.href} href={s.href} className="group rounded-xl border border-border p-6 hover:border-foreground transition-colors">
            <s.icono className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-light text-foreground">{s.titulo}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.texto}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
              Abrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
