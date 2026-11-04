import Link from "next/link"
import { notFound } from "next/navigation"
import { ListChecks, Plus } from "lucide-react"
import { Badge } from "@/components/admin/badge"
import { Buscador } from "@/components/admin/buscador"
import { ClientesGrid } from "@/components/admin/clientes-grid"
import { ContactosGrid } from "@/components/admin/contactos-grid"
import { Encabezado } from "@/components/admin/encabezado"
import { UsuariosGrid } from "@/components/admin/usuarios-grid"
import { EstadoSelect } from "@/components/admin/estado-select"
import { Filtros } from "@/components/admin/filtros"
import { BorrarFila, Casilla, Seleccion } from "@/components/admin/seleccion"
import { requireAdmin } from "@/lib/session"
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

// Lo que arrastra borrar un registro, para decirlo en la confirmación.
const AVISO: Record<string, string> = {
  clientes: "También se eliminan sus contactos, proyectos, tareas e imágenes.",
  proyectos: "También se eliminan sus tareas e imágenes.",
  articulos: "También se eliminan sus imágenes.",
}

const PLACEHOLDER: Record<string, string> = {
  clientes: "Buscar cliente, correo, RFC…",
  contactos: "Buscar contacto, puesto, cliente…",
  proyectos: "Buscar proyecto o cliente…",
  usuarios: "Buscar usuario o correo…",
  articulos: "Buscar artículo, URL o palabra clave…",
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ recurso: string }>
  searchParams: Promise<{ id_cliente?: string; q?: string }>
}) {
  const { recurso } = await params
  const sp = await searchParams
  const r = getRecurso(recurso)
  if (!r) notFound()

  const lista = `/admin/${r.slug}`
  const q = (sp.q ?? "").trim().slice(0, 80)
  const textoNuevo = r.slug === "articulos" ? "Nuevo artículo" : "Nuevo"

  const encabezado = (nuevo: string, descripcion: string) => (
    <Encabezado
      migas={[{ label: r.plural }]}
      titulo={r.plural}
      descripcion={descripcion}
      acciones={
        <Link href={nuevo} className={botonNuevo}>
          <Plus className="h-4 w-4" /> {textoNuevo}
        </Link>
      }
    />
  )

  const cuenta = (n: number, singular: string, plural: string) => `${n} ${n === 1 ? singular : plural}${q ? ` para “${q}”` : ""}`
  const sinResultados = (
    <p className="text-muted-foreground">
      {q ? `Nada coincide con “${q}”. Prueba con otra palabra o borra la búsqueda.` : `Aún no hay ${r.plural.toLowerCase()}.`}
    </p>
  )

  // --- Clientes: grid de cartas -------------------------------------------
  if (r.slug === "clientes") {
    const clientes = await clientesConConteos(q)
    return (
      <div>
        {encabezado(`${lista}/nuevo`, cuenta(clientes.length, "cliente", "clientes"))}
        <div className="mb-5">
          <Buscador placeholder={PLACEHOLDER.clientes} />
        </div>
        {clientes.length === 0 ? (
          sinResultados
        ) : (
          <Seleccion slug={r.slug} ids={clientes.map((c) => Number(c.id))} aviso={AVISO.clientes}>
            <ClientesGrid clientes={clientes} />
          </Seleccion>
        )}
      </div>
    )
  }

  // --- Usuarios: cartas -----------------------------------------------------
  if (r.slug === "usuarios") {
    const [usuarios, yo] = await Promise.all([usuariosParaCards(q), requireAdmin()])
    return (
      <div>
        {encabezado(`${lista}/nuevo`, cuenta(usuarios.length, "usuario", "usuarios"))}
        <div className="mb-5">
          <Buscador placeholder={PLACEHOLDER.usuarios} />
        </div>
        {usuarios.length === 0 ? (
          sinResultados
        ) : (
          <Seleccion slug={r.slug} ids={usuarios.map((u) => Number(u.id))} bloqueados={[yo.id]}>
            <UsuariosGrid usuarios={usuarios} />
          </Seleccion>
        )}
      </div>
    )
  }

  // --- Contactos, proyectos y blog: lista con búsqueda (y filtro por cliente en los dos primeros) ---
  const conCliente = r.slug === "contactos" || r.slug === "proyectos"
  const idCliente = conCliente ? entero(sp.id_cliente) : undefined
  const clientes = conCliente ? await opciones("clientes") : []
  const filas = await listar(r, { id_cliente: idCliente, q })

  // Crear o editar desde esta lista regresa a ella, con el mismo cliente y búsqueda.
  const estado = new URLSearchParams()
  if (idCliente) estado.set("id_cliente", String(idCliente))
  if (q) estado.set("q", q)
  const volver = estado.size ? `${lista}?${estado}` : lista
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
  if (r.slug === "articulos") {
    cols.splice(0, cols.length, { key: "articulo", label: "Artículo" }, ...cols.filter((c) => c.key !== "titulo"))
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
    if (key === "articulo") {
      return (
        <div className="flex min-w-64 items-center gap-3 whitespace-normal">
          {fila.portada ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={String(fila.portada)} alt="" width={64} height={40} className="h-10 w-16 shrink-0 rounded border border-border object-cover" />
          ) : (
            <span className="block h-10 w-16 shrink-0 rounded bg-neutral-100" />
          )}
          <div>
            <p className="text-foreground">{fila.titulo}</p>
            <p className="text-xs text-muted-foreground">/blog/{fila.slug}</p>
          </div>
        </div>
      )
    }
    const c = campoDe(r, key)
    if (c.tipo === "select" && c.opciones) {
      const valor = String(fila[key])
      if (c.etiquetas) return c.etiquetas[valor] ?? valor
      if (camposRapidos[r.slug]?.includes(key)) {
        return <EstadoSelect slug={r.slug} id={Number(fila.id)} campo={key} valor={valor} opciones={c.opciones} />
      }
      return <Badge valor={valor} />
    }
    if (c.relacion) return fila[`${key}__label`] ?? "—"
    if (c.tipo === "checkbox") {
      if (r.slug === "articulos") {
        return fila[key] ? (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">Publicado</span>
        ) : (
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-muted-foreground">Borrador</span>
        )
      }
      return fila[key] ? "Sí" : "No"
    }
    if (key === "importe") return peso.format(Number(fila[key]))
    return fila[key] ?? "—"
  }

  return (
    <div>
      {encabezado(
        `${lista}/nuevo${nuevo.size ? `?${nuevo}` : ""}`,
        cuenta(filas.length, r.slug === "articulos" ? "artículo" : r.singular.toLowerCase(), r.slug === "articulos" ? "artículos" : r.plural.toLowerCase()),
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Buscador placeholder={PLACEHOLDER[r.slug]} />
        {conCliente && <Filtros clientes={clientes} idCliente={idCliente} />}
      </div>

      {filas.length === 0 ? (
        sinResultados
      ) : r.slug === "contactos" ? (
        <Seleccion slug={r.slug} ids={filas.map((f) => Number(f.id))}>
          <ContactosGrid contactos={filas} volver={volver !== lista ? volver : undefined} />
        </Seleccion>
      ) : (
        <Seleccion slug={r.slug} ids={filas.map((f) => Number(f.id))} aviso={AVISO[r.slug]}>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-left">
              <tr>
                <th className="w-10 py-3 pl-4" />
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
                  <td className="py-3 pl-4">
                    <Casilla id={Number(f.id)} nombre={String(f.titulo ?? f.id)} />
                  </td>
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
                    <span className="inline-flex items-center gap-4 align-middle">
                      <BorrarFila id={Number(f.id)} nombre={String(f.titulo ?? f.id)} />
                      <Link href={hrefEditar(f.id)} className="text-foreground underline underline-offset-4">
                        Editar
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Seleccion>
      )}
    </div>
  )
}
