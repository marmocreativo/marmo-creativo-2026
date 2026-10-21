import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ConsolaSql } from "@/components/admin/consola-sql"
import { listarArchivosSQL, listarBitacora } from "@/lib/sql/consola"

const fecha = (v: string) =>
  new Date(v.replace(" ", "T") + "Z").toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  })

export default async function Page() {
  const [archivos, bitacora] = await Promise.all([listarArchivosSQL(), listarBitacora()])

  return (
    <div>
      <Link href="/admin/configuracion" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Configuración
      </Link>
      <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground">Consulta SQL</h2>
      <p className="mt-3 mb-8 max-w-3xl text-muted-foreground leading-relaxed">
        Se ejecuta con el usuario de base de datos de la aplicación. Los archivos del proyecto traen <code>USE marmo_creativo;</code>: si tu
        base se llama distinto, cambia esa línea antes de ejecutarlos.
      </p>

      <ConsolaSql archivos={archivos} />

      <section className="mt-14 border-t border-border pt-10">
        <h3 className="text-2xl font-light text-foreground">Bitácora de escritura</h3>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Lo que se ejecuta en modo escritura queda registrado: quién, cuándo y con qué resultado.
        </p>
        {!bitacora.disponible ? (
          <p className="text-sm text-muted-foreground">
            La tabla de bitácora no existe todavía. Ejecuta <code>database/migracion-configuracion.sql</code> desde esta misma consola (cárgalo con
            “Cargar del proyecto”).
          </p>
        ) : bitacora.entradas.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no se ha ejecutado nada en modo escritura.</p>
        ) : (
          <ul className="divide-y divide-border border border-border">
            {bitacora.entradas.map((e) => (
              <li key={e.id} className="p-4 text-sm">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className={e.ok ? "text-primary" : "text-destructive"}>{e.ok ? "OK" : "Error"}</span>
                  <span className="text-muted-foreground">{fecha(e.created_at)}</span>
                  <span className="text-muted-foreground">{e.usuario}</span>
                  {e.detalle && <span className="truncate text-xs text-muted-foreground">{e.detalle}</span>}
                </div>
                <pre className="mt-2 max-h-24 overflow-hidden whitespace-pre-wrap break-words font-mono text-xs text-foreground">
                  {e.sql_texto.length > 400 ? `${e.sql_texto.slice(0, 400)}…` : e.sql_texto}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
