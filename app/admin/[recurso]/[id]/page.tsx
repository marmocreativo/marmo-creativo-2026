import { notFound } from "next/navigation"
import { ArticuloForm } from "@/components/admin/articulo-form"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { Encabezado } from "@/components/admin/encabezado"
import { GaleriaArticulo } from "@/components/admin/galeria-articulo"
import { GaleriaProyecto } from "@/components/admin/galeria-proyecto"
import { RecursoForm } from "@/components/admin/recurso-form"
import { listarGaleria } from "@/lib/crm/galeria"
import { listarGaleriaArticulo } from "@/lib/crm/galeria-articulos"
import { eliminarRegistro, guardarRegistro } from "@/lib/actions/admin"
import { iaConfigurada } from "@/lib/ia/gemini"
import { obtener, opcionesDe } from "@/lib/crm/repo"
import { getRecurso } from "@/lib/crm/recursos"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string; id: string }>
  searchParams: Promise<{ volver?: string; creado?: string }>
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

  // Nombre del registro para el título y la ruta de navegación.
  const galeriaArticulo = r.slug === "articulos" ? await listarGaleriaArticulo(n) : []
  const nombre = String(fila.titulo ?? fila.nombre ?? `${r.singular} ${n}`)

  return (
    <div>
      <Encabezado
        migas={[{ label: r.plural, href: volver }, { label: nombre }]}
        titulo={nombre}
        descripcion={`Editar ${r.singular.toLowerCase()}`}
        acciones={<BotonEliminar accion={eliminarRegistro.bind(null, r.slug, n, volver)} etiqueta={`este ${r.singular.toLowerCase()}`} />}
      />

      {r.slug === "articulos" ? (
        <>
          <ArticuloForm
            valores={fila}
            formato={fila.contenido_formato === "html" ? "html" : "markdown"}
            galeria={galeriaArticulo}
            accion={guardarRegistro.bind(null, r.slug, n, volver)}
            cancelarHref={volver}
            nuevo={false}
            creado={sp.creado === "1"}
            iaLista={iaConfigurada()}
          />
          <GaleriaArticulo idArticulo={n} imagenes={galeriaArticulo} />
        </>
      ) : (
        <RecursoForm
          campos={r.campos}
          valores={fila}
          opciones={await opcionesDe(r)}
          accion={guardarRegistro.bind(null, r.slug, n, volver)}
          cancelarHref={volver}
        />
      )}
      {r.slug === "proyectos" && <GaleriaProyecto idProyecto={n} imagenes={await listarGaleria(n)} />}
    </div>
  )
}
