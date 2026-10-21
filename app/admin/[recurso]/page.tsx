import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, List, ListChecks, Plus } from "lucide-react"
import { Badge } from "@/components/admin/badge"
import { ClientesGrid } from "@/components/admin/clientes-grid"
import { ContactosGrid } from "@/components/admin/contactos-grid"
import { UsuariosGrid } from "@/components/admin/usuarios-grid"
import { EstadoSelect } from "@/components/admin/estado-select"
import { Filtros } from "@/components/admin/filtros"
import { TareasSemana } from "@/components/admin/tareas-semana"
import { domingoDe, esFecha, hoyMX } from "@/lib/crm/semana"
import { clientesConConteos, usuariosParaCards, listar, opciones, proyectosParaFiltro, type Fila } from "@/lib/crm/repo"
import { campoDe, getRecurso } from "@/lib/crm/recursos"
import { ETIQUETAS_CATEGORIA } from "@/lib/portafolio-categorias"
import { camposRapidos, OPCIONES_ESTADO } from "@/lib/crm/estilos"

const peso = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" })

const entero = (v?: string) => {
  const n = Number(v)
  return Number.isInteger(n) && n > 0 ? n : undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string }>
  searchParams: Promise<{
    id_cliente?: string
    id_proyecto?: string
    estado?: string
    vista?: string
    semana?: string
  }>
}) {
  const { recurso } = await params
  const sp = await searchParams
  const r = getRecurso(recurso)
  if (!r) notFound()

  const nuevoHref = (q: Record<string, number | undefined>) => {
    const qs = new URLSearchParams(Object.entries(q).flatMap(([k, v]) => (v ? [[k, String(v)]] : []))).toString()
    return `/admin/${r.slug}/nuevo${qs ? `?${qs}` : ""}`
  }

  // --- Clientes: grid de cartas -------------------------------------------
  if (r.slug === "clientes") {
    const clientes = await clientesConConteos()
    return (
      <div>
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">Clientes</h2>
          <Link
            href={nuevoHref({})}
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Nuevo
          </Link>
        </div>
        {clientes.length === 0 ? <p className="text-muted-foreground">Aún no hay clientes.</p> : <ClientesGrid clientes={clientes} />}
      </div>
    )
  }

  // --- Usuarios: cartas -----------------------------------------------------
  if (r.slug === "usuarios") {
    const usuarios = await usuariosParaCards()
    return (
      <div>
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">Usuarios</h2>
          <Link
            href={nuevoHref({})}
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Nuevo
          </Link>
        </div>
        <UsuariosGrid usuarios={usuarios} />
      </div>
    )
  }

  // --- Contactos, proyectos y tareas: tabla con filtros --------------------
  const conFiltroCliente = ["contactos", "proyectos", "tareas"].includes(r.slug)
  const esTareas = r.slug === "tareas"

  let idCliente = entero(sp.id_cliente)
  const idProyecto = esTareas ? entero(sp.id_proyecto) : undefined

  const [clientes, proyectos] = await Promise.all([
    conFiltroCliente ? opciones("clientes") : Promise.resolve([]),
    esTareas ? proyectosParaFiltro() : Promise.resolve([]),
  ])
  // Si llegas con solo el proyecto (botón "Ver tareas"), el filtro de cliente se muestra con el suyo.
  if (!idCliente && idProyecto) idCliente = proyectos.find((p) => p.id === idProyecto)?.id_cliente

  // Tareas: la lista abre con las abiertas; la semana, con todas (para ver lo ya entregado).
  const vistaSemana = esTareas && sp.vista === "semana"
  const estadoSel = esTareas
    ? OPCIONES_ESTADO.some((o) => o.value === sp.estado)
      ? sp.estado!
      : vistaSemana
        ? "todas"
        : "abiertas"
    : undefined
  const estados = estadoSel === "abiertas" ? ["Por Iniciar", "En Proceso"] : estadoSel && estadoSel !== "todas" ? [estadoSel] : undefined

  const filas = await listar(r, { id_cliente: idCliente, id_proyecto: idProyecto, estados })

  // Enlaces que conservan los filtros activos al cambiar de vista o de semana.
  const hoy = hoyMX()
  const domingo = domingoDe(esFecha(sp.semana) ? sp.semana : hoy)
  const enlace = (cambios: Record<string, string | undefined>) => {
    const q = new URLSearchParams()
    const base: Record<string, string | undefined> = { ...sp, ...cambios }
    for (const [k, v] of Object.entries(base)) if (v) q.set(k, v)
    const qs = q.toString()
    return `/admin/${r.slug}${qs ? `?${qs}` : ""}`
  }

  const cols: { key: string; label: string }[] = r.columnas.map((n) => ({ key: n, label: campoDe(r, n).label }))
  if (esTareas) cols.splice(1, 0, { key: "cliente__label", label: "Cliente" })
  if (r.slug === "proyectos") {
    // Portada | Proyecto (cliente pequeño sobre el título) | resto de columnas
    const resto = cols.filter((c) => c.key !== "titulo" && c.key !== "id_cliente")
    cols.splice(0, cols.length, { key: "portada", label: "" }, { key: "proyecto", label: "Proyecto" }, ...resto)
  }

  const celda = (fila: Fila, key: string) => {
    if (key === "cliente__label") return fila[key] ?? "—"
    if (key === "portada") {
      return fila.portada ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(fila.portada)} alt="" width={100} className="h-auto w-[100px] rounded-md border border-border" />
      ) : (
        <span className="block h-[70px] w-[100px] rounded-md bg-neutral-100" />
      )
    }
    if (key === "proyecto") {
      return (
        <div className="whitespace-normal min-w-48">
          <p className="text-xs text-muted-foreground">{fila.id_cliente__label ?? "—"}</p>
          <p className="text-foreground">{fila.titulo}</p>
          {fila.mostrar_en_portafolio ? (
            <p className="mt-1 text-xs text-primary">
              En portafolio · {ETIQUETAS_CATEGORIA[String(fila.categoria_portafolio)] ?? "sin categoría"}
            </p>
          ) : null}
        </div>
      )
    }
    const c = campoDe(r, key)
    if (c.tipo === "select" && c.opciones) {
      const valor = String(fila[key])
      if (camposRapidos[r.slug]?.includes(key)) {
        return <EstadoSelect slug={r.slug} id={Number(fila.id)} campo={key} valor={valor} opciones={c.opciones} />
      }
      return <Badge valor={valor} />
    }
    if (c.relacion) return fila[`${key}__label`] ?? "—"
    if (c.tipo === "checkbox") return fila[key] ? "Sí" : "No"
    if (key === "importe") return peso.format(Number(fila[key]))
    return fila[key] ?? "—"
  }

  const proyectoFiltrado = idProyecto ? proyectos.find((p) => p.id === idProyecto)?.label : undefined

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-2">
        <h2 className="text-3xl md:text-4xl font-light text-foreground">{r.plural}</h2>
        <Link
          href={nuevoHref({ id_cliente: idCliente, id_proyecto: idProyecto })}
          className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Nuevo
        </Link>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        {filas.length} {filas.length === 1 ? r.singular.toLowerCase() : r.plural.toLowerCase()}
        {proyectoFiltrado ? ` en “${proyectoFiltrado}”` : ""}
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {conFiltroCliente && (
          <Filtros
            clientes={clientes}
            proyectos={esTareas ? proyectos : undefined}
            estado={estadoSel}
            idCliente={idCliente}
            idProyecto={idProyecto}
          />
        )}
        {esTareas && (
          <div className="inline-flex rounded-lg border border-border p-0.5 text-sm">
            {[
              { v: undefined, label: "Lista", icono: List },
              { v: "semana", label: "Semana", icono: CalendarDays },
            ].map(({ v, label, icono: Icono }) => (
              <Link
                key={label}
                href={enlace({ vista: v, semana: undefined })}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                  (v === "semana") === vistaSemana ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icono className="w-4 h-4" /> {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {vistaSemana ? (
        <TareasSemana filas={filas} domingo={domingo} hoy={hoy} href={(semana) => enlace({ semana })} />
      ) : filas.length === 0 ? (
        <p className="text-muted-foreground">No hay registros con estos filtros.</p>
      ) : r.slug === "contactos" ? (
        <ContactosGrid contactos={filas} />
      ) : (
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-left">
              <tr>
                {cols.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">{c.label}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  {cols.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-muted-foreground whitespace-nowrap">{celda(f, c.key)}</td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {r.slug === "proyectos" && (
                      <Link
                        href={`/admin/tareas?id_proyecto=${f.id}`}
                        className="mr-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-foreground hover:border-foreground transition-colors"
                      >
                        <ListChecks className="w-4 h-4" /> Tareas ({Number(f.n_tareas)})
                      </Link>
                    )}
                    <Link href={`/admin/${r.slug}/${f.id}`} className="text-foreground underline underline-offset-4">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
