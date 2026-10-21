import { notFound } from "next/navigation"
import { RecursoForm } from "@/components/admin/recurso-form"
import { guardarRegistro } from "@/lib/actions/admin"
import { opcionesDe } from "@/lib/crm/repo"
import { getRecurso } from "@/lib/crm/recursos"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string }>
  searchParams: Promise<{ id_cliente?: string; id_proyecto?: string }>
}) {
  const { recurso } = await params
  const sp = await searchParams
  const r = getRecurso(recurso)
  if (!r) notFound()

  // Si vienes de una lista filtrada, el cliente o proyecto llega preseleccionado.
  const valores: Record<string, string> = {}
  for (const c of r.campos) {
    const v = sp[c.name as "id_cliente" | "id_proyecto"]
    if (c.relacion && v && /^\d+$/.test(v)) valores[c.name] = v
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8">Nuevo: {r.singular.toLowerCase()}</h2>
      <RecursoForm
        campos={r.campos}
        valores={valores}
        opciones={await opcionesDe(r)}
        accion={guardarRegistro.bind(null, r.slug, null)}
        cancelarHref={`/admin/${r.slug}`}
      />
    </div>
  )
}
