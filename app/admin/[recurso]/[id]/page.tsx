import { notFound } from "next/navigation"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { RecursoForm } from "@/components/admin/recurso-form"
import { GaleriaProyecto } from "@/components/admin/galeria-proyecto"
import { listarGaleria } from "@/lib/crm/galeria"
import { eliminarRegistro, guardarRegistro } from "@/lib/actions/admin"
import { obtener, opcionesDe } from "@/lib/crm/repo"
import { getRecurso } from "@/lib/crm/recursos"

export default async function Page({ params }: { params: Promise<{ recurso: string; id: string }> }) {
  const { recurso, id } = await params
  const r = getRecurso(recurso)
  const n = Number(id)
  if (!r || !Number.isInteger(n) || n < 1) notFound()

  const fila = await obtener(r, n)
  if (!fila) notFound()

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-light text-foreground">Editar {r.singular.toLowerCase()}</h2>
        <BotonEliminar accion={eliminarRegistro.bind(null, r.slug, n)} etiqueta={`este ${r.singular.toLowerCase()}`} />
      </div>
      <RecursoForm
        campos={r.campos}
        valores={fila}
        opciones={await opcionesDe(r)}
        accion={guardarRegistro.bind(null, r.slug, n)}
        cancelarHref={`/admin/${r.slug}`}
      />
      {r.slug === "proyectos" && <GaleriaProyecto idProyecto={n} imagenes={await listarGaleria(n)} />}
    </div>
  )
}
