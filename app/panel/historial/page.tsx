import Link from "next/link"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { HistorialLista } from "@/components/herramientas/historial-lista"
import { vaciarHistorial } from "@/lib/actions/herramientas"
import { HERRAMIENTAS, INFO_HERRAMIENTA } from "@/lib/herramientas/esquemas"
import { listarHistorial } from "@/lib/herramientas/historial"
import { requireUsuario } from "@/lib/session"

export default async function Page() {
  const u = await requireUsuario("/panel/historial")
  const entradas = await listarHistorial(u.id)

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground">Mi historial</h2>
      <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-2xl">
        Lo que generas en las herramientas se guarda aquí. Guardamos las últimas 50 de cada una.
      </p>

      {entradas.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          Todavía no has guardado nada. Prueba una <Link href="/herramientas" className="text-foreground underline underline-offset-4">herramienta</Link>.
        </p>
      )}

      <div className="mt-10 space-y-14">
        {HERRAMIENTAS.map((h) => {
          const de = entradas.filter((e) => e.herramienta === h)
          if (de.length === 0) return null
          return (
            <section key={h}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-light text-foreground">
                  <Link href={INFO_HERRAMIENTA[h].ruta} className="hover:underline">{INFO_HERRAMIENTA[h].nombre}</Link>
                  <span className="ml-2 text-sm text-muted-foreground">({de.length})</span>
                </h3>
                <BotonEliminar accion={vaciarHistorial.bind(null, h)} etiqueta={`todo el historial de ${INFO_HERRAMIENTA[h].nombre}`} texto="Vaciar" />
              </div>
              <HistorialLista entradas={de} />
            </section>
          )
        })}
      </div>
    </div>
  )
}
