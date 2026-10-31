import Link from "next/link"
import { CalendarCheck, CalendarDays, List, Plus } from "lucide-react"
import { Filtros } from "@/components/admin/filtros"
import { VistaTareas } from "@/components/admin/tareas/vista-tareas"
import { OPCIONES_ESTADO } from "@/lib/crm/estilos"
import { recursos } from "@/lib/crm/recursos"
import { listar, opciones, proyectosParaFiltro } from "@/lib/crm/repo"
import { addDias, domingoDe, esFecha, hoyMX } from "@/lib/crm/semana"
import { ABIERTAS, aTarea, agruparHoy } from "@/lib/crm/tareas-logica"

const entero = (v?: string) => {
  const n = Number(v)
  return Number.isInteger(n) && n > 0 ? n : undefined
}

type Vista = "lista" | "semana" | "hoy"
const VISTAS: { v: Vista; label: string; icono: typeof List }[] = [
  { v: "lista", label: "Lista", icono: List },
  { v: "semana", label: "Semana", icono: CalendarDays },
  { v: "hoy", label: "Hoy", icono: CalendarCheck },
]

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id_cliente?: string; id_proyecto?: string; estado?: string; vista?: string; semana?: string }>
}) {
  const sp = await searchParams
  const vista: Vista = sp.vista === "semana" || sp.vista === "hoy" ? sp.vista : "lista"

  const idProyecto = entero(sp.id_proyecto)
  let idCliente = entero(sp.id_cliente)

  const [clientes, proyectos, responsables] = await Promise.all([opciones("clientes"), proyectosParaFiltro(), opciones("usuarios")])
  // Si llegas con solo el proyecto (botón "Tareas" de un proyecto), el cliente se muestra con el suyo.
  if (!idCliente && idProyecto) idCliente = proyectos.find((p) => p.id === idProyecto)?.id_cliente

  // La lista abre con las abiertas; la semana, con todas (para ver lo ya entregado); "hoy" siempre con las abiertas.
  const estadoSel = OPCIONES_ESTADO.some((o) => o.value === sp.estado) ? sp.estado! : vista === "semana" ? "todas" : "abiertas"
  const estados = vista === "hoy" || estadoSel === "abiertas" ? [...ABIERTAS] : estadoSel === "todas" ? undefined : [estadoSel]

  const filas = (await listar(recursos.tareas, { id_cliente: idCliente, id_proyecto: idProyecto, estados })).map(aTarea)

  const hoy = hoyMX()
  // En "Hoy" no entran las que aún no toca empezar: el contador cuenta solo lo que se muestra.
  const g = vista === "hoy" ? agruparHoy(filas, hoy) : null
  const cuenta = g ? g.atrasadas.length + g.deHoy.length + g.enTiempo.length + g.sinFecha.length : filas.length
  const domingo = domingoDe(esFecha(sp.semana) ? sp.semana : hoy)

  // Enlaces que conservan los filtros activos al cambiar de vista o de semana.
  const enlace = (cambios: Record<string, string | undefined> = {}) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...sp, ...cambios })) if (v) q.set(k, v)
    const qs = q.toString()
    return `/admin/tareas${qs ? `?${qs}` : ""}`
  }

  // Desde aquí se crea o edita y se regresa exactamente a esta vista, con su proyecto y filtros.
  const volver = enlace()
  const nuevo = new URLSearchParams()
  if (idProyecto) nuevo.set("id_proyecto", String(idProyecto))
  if (idCliente) nuevo.set("id_cliente", String(idCliente))
  nuevo.set("volver", volver)

  const proyectoFiltrado = idProyecto ? proyectos.find((p) => p.id === idProyecto)?.label : undefined

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-foreground">Tareas</h2>
        <Link
          href={`/admin/tareas/nuevo?${nuevo}`}
          className="inline-flex items-center gap-1.5 bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Nueva
        </Link>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {cuenta} {cuenta === 1 ? "tarea" : "tareas"}
        {proyectoFiltrado ? ` en “${proyectoFiltrado}”` : ""}
      </p>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Filtros clientes={clientes} proyectos={proyectos} estado={vista === "hoy" ? undefined : estadoSel} idCliente={idCliente} idProyecto={idProyecto} />
        <div className="inline-flex rounded-lg border border-border p-0.5 text-sm" role="group" aria-label="Vista">
          {VISTAS.map(({ v, label, icono: Icono }) => (
            <Link
              key={v}
              href={enlace({ vista: v === "lista" ? undefined : v, semana: undefined })}
              aria-current={vista === v ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                vista === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icono className="h-4 w-4" /> {label}
            </Link>
          ))}
        </div>
      </div>

      <VistaTareas
        filas={filas}
        vista={vista}
        hoy={hoy}
        domingo={domingo}
        responsables={responsables}
        volver={volver}
        nav={{
          anterior: enlace({ semana: addDias(domingo, -7) }),
          hoy: enlace({ semana: undefined }),
          siguiente: enlace({ semana: addDias(domingo, 7) }),
        }}
      />
    </div>
  )
}
