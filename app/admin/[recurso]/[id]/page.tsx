import { notFound } from "next/navigation"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { RecursoForm } from "@/components/admin/recurso-form"
import { GaleriaProyecto } from "@/components/admin/galeria-proyecto"
import { listarGaleria } from "@/lib/crm/galeria"
import { eliminarRegistro, guardarRegistro } from "@/lib/actions/admin"
import { obtener, opcionesDe } from "@/lib/crm/repo"
import { getRecurso } from "@/lib/crm/recursos"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string; id: string }>
  searchParams: Promise<{ volver?: string }>
}) {
  const { recurso, id } = await params
  const sp = await searchParams
  const r = getRecurso(recurso)
  const n = Number(id)
  if (!r || !Number.isInteger(n) || n < 1) notFound()

  const fila = await obtener(r, n)
  if (!fila) notFound()

  // Al guardar, cancelar o borrar se regresa a la lista de donde vienes (con sus filtros).
  const lista = `/admin/${r.slug}`
  const volver = sp.volver && (sp.volver === lista || sp.volver.startsWith(`${lista}?`)) ? sp.volver : lista

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 className="text-lg font-medium text-foreground">Editar {r.singular.toLowerCase()}</h2>
        <BotonEliminar accion={eliminarRegistro.bind(null, r.slug, n, volver)} etiqueta={`este ${r.singular.toLowerCase()}`} />
      </div>
      <RecursoForm
        campos={r.campos}
        valores={fila}
        opciones={await opcionesDe(r)}
        accion={guardarRegistro.bind(null, r.slug, n, volver)}
        cancelarHref={volver}
      />
      {r.slug === "proyectos" && <GaleriaProyecto idProyecto={n} imagenes={await listarGaleria(n)} />}
    </div>
  )
}
