import Link from "next/link"
import { notFound } from "next/navigation"
import { ListChecks, Plus } from "lucide-react"
import { Badge } from "@/components/admin/badge"
import { ClientesGrid } from "@/components/admin/clientes-grid"
import { ContactosGrid } from "@/components/admin/contactos-grid"
import { UsuariosGrid } from "@/components/admin/usuarios-grid"
import { EstadoSelect } from "@/components/admin/estado-select"
import { Filtros } from "@/components/admin/filtros"
import { clientesConConteos, usuariosParaCards, listar, opciones, type Fila } from "@/lib/crm/repo"
import { campoDe, getRecurso } from "@/lib/crm/recursos"
import { ETIQUETAS_CATEGORIA } from "@/lib/portafolio-categorias"
import { camposRapidos } from "@/lib/crm/estilos"

const peso = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" })

const entero = (v?: string) => {
  const n = Number(v)
  return Number.isInteger(n) && n > 0 ? n : undefined
}

const botonNuevo =
  "inline-flex items-center gap-1.5 bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string }>
  searchParams: Promise<{ id_cliente?: string }>
}) {
  const { recurso } = await params
  const sp = await searchParams
  const r = getRecurso(recurso)
  if (!r) notFound()

  const lista = `/admin/${r.slug}`

  const encabezado = (nuevo: string, detalle?: string) => (
    <>
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-foreground">{r.plural}</h2>
        <Link href={nuevo} className={botonNuevo}>
          <Plus className="h-4 w-4" /> Nuevo
        </Link>
      </div>
      {detalle && <p className="mb-4 text-sm text-muted-foreground">{detalle}</p>}
    </>
  )

  // --- Clientes: grid de cartas -------------------------------------------
  if (r.slug === "clientes") {
    const clientes = await clientesConConteos()
    return (
      <div>
        {encabezado(`${lista}/nuevo`, `${clientes.length} clientes`)}
        {clientes.length === 0 ? <p className="text-muted-foreground">Aún no hay clientes.</p> : <ClientesGrid clientes={clientes} />}
      </div>
    )
  }

  // --- Usuarios: cartas -----------------------------------------------------
  if (r.slug === "usuarios") {
    const usuarios = await usuariosParaCards()
    return (
      <div>
        {encabezado(`${lista}/nuevo`, `${usuarios.length} usuarios`)}
        <UsuariosGrid usuarios={usuarios} />
      </div>
    )
  }

  // --- Contactos y proyectos: lista con filtro por cliente ------------------
  const idCliente = entero(sp.id_cliente)
  const clientes = await opciones("clientes")
  const filas = await listar(r, { id_cliente: idCliente })

  // Crear o editar desde esta lista regresa a ella, con el mismo cliente filtrado.
  const volver = idCliente ? `${lista}?id_cliente=${idCliente}` : lista
  const nuevo = new URLSearchParams()
  if (idCliente) nuevo.set("id_cliente", String(idCliente))
  if (volver !== lista) nuevo.set("volver", volver)
  const hrefEditar = (id: unknown) => `${lista}/${id}${volver !== lista ? `?volver=${encodeURIComponent(volver)}` : ""}`

  const cols: { key: string; label: string }[] = r.columnas.map((n) => ({ key: n, label: campoDe(r, n).label }))
  if (r.slug === "proyectos") {
    // Portada | Proyecto (cliente pequeño sobre el título) | resto de columnas
    const resto = cols.filter((c) => c.key !== "titulo" && c.key !== "id_cliente")
    cols.splice(0, cols.length, { key: "portada", label: "" }, { key: "proyecto", label: "Proyecto" }, ...resto)
  }

  const celda = (fila: Fila, key: string) => {
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
        <div className="min-w-48 whitespace-normal">
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

  return (
    <div>
      {encabezado(
        `${lista}/nuevo${nuevo.size ? `?${nuevo}` : ""}`,
        `${filas.length} ${filas.length === 1 ? r.singular.toLowerCase() : r.plural.toLowerCase()}`,
      )}

      <div className="mb-5">
        <Filtros clientes={clientes} idCliente={idCliente} />
      </div>

      {filas.length === 0 ? (
        <p className="text-muted-foreground">No hay registros con estos filtros.</p>
      ) : r.slug === "contactos" ? (
        <ContactosGrid contactos={filas} volver={volver !== lista ? volver : undefined} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-left">
              <tr>
                {cols.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-4 py-3 font-medium">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  {cols.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {celda(f, c.key)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {r.slug === "proyectos" && (
                      <Link
                        href={`/admin/tareas?id_proyecto=${f.id}`}
                        className="mr-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-foreground transition-colors hover:border-foreground"
                      >
                        <ListChecks className="h-4 w-4" /> Tareas ({Number(f.n_tareas)})
                      </Link>
                    )}
                    <Link href={hrefEditar(f.id)} className="text-foreground underline underline-offset-4">
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
