import { notFound } from "next/navigation"
import { ArticuloForm } from "@/components/admin/articulo-form"
import { Encabezado } from "@/components/admin/encabezado"
import { RecursoForm } from "@/components/admin/recurso-form"
import { guardarRegistro } from "@/lib/actions/admin"
import { opcionesDe } from "@/lib/crm/repo"
import { getRecurso } from "@/lib/crm/recursos"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string }>
  searchParams: Promise<{ id_cliente?: string; id_proyecto?: string; volver?: string }>
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

  // Al guardar o cancelar se regresa a la misma lista (con sus filtros); la acción vuelve a validarlo.
  const lista = `/admin/${r.slug}`
  const volver = sp.volver && (sp.volver === lista || sp.volver.startsWith(`${lista}?`)) ? sp.volver : lista

  return (
    <div>
      <Encabezado
        migas={[{ label: r.plural, href: volver }, { label: `Crear ${r.singular.toLowerCase()}` }]}
        titulo={`Crear ${r.singular.toLowerCase()}`}
      />
      {r.slug === "articulos" ? (
        <ArticuloForm
          valores={{}}
          formato="html"
          galeria={[]}
          accion={guardarRegistro.bind(null, r.slug, null, volver)}
          cancelarHref={volver}
          nuevo
        />
      ) : (
        <RecursoForm
          campos={r.campos}
          valores={valores}
          opciones={await opcionesDe(r)}
          accion={guardarRegistro.bind(null, r.slug, null, volver)}
          cancelarHref={volver}
          permiteOtra
        />
      )}
    </div>
  )
}
