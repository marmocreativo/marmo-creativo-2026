import Link from "next/link"
import { ChevronLeft, ChevronRight, Folder, Home } from "lucide-react"
import { BarraMultimedia } from "@/components/admin/barra-multimedia"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { eliminarMultimedia } from "@/lib/actions/configuracion"
import { formatoBytes, listarDirectorio, separar } from "@/lib/multimedia"

const BASE = "/admin/configuracion/multimedia"
const url = (segmentos: string[]) => `/archivos/${segmentos.map(encodeURIComponent).join("/")}`
const enlace = (segmentos: string[], pagina?: number) => {
  const q = new URLSearchParams()
  if (segmentos.length) q.set("ruta", segmentos.join("/"))
  if (pagina && pagina > 1) q.set("pagina", String(pagina))
  const qs = q.toString()
  return qs ? `${BASE}?${qs}` : BASE
}

export default async function Page({ searchParams }: { searchParams: Promise<{ ruta?: string; pagina?: string }> }) {
  const sp = await searchParams
  const segmentos = separar(sp.ruta ?? "")
  const listado = await listarDirectorio(segmentos, Number(sp.pagina) || 1)

  return (
    <div>
      <Link href="/admin/configuracion" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Configuración
      </Link>
      <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground">Importar multimedia</h2>
      <p className="mt-3 mb-8 max-w-3xl text-muted-foreground leading-relaxed">
        Es la carpeta de imágenes del servidor (<code>uploads</code>). Para llevar tu portafolio de local a producción: sube aquí tu carpeta{" "}
        <code>uploads</code> completa (conserva <code>clientes/</code>, <code>proyectos/</code>, <code>galeria/</code>…) y luego importa los datos
        con la{" "}
        <Link href="/admin/configuracion/sql" className="text-foreground underline underline-offset-4">
          consulta SQL
        </Link>
        .
      </p>

      <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1 text-sm">
        <Link href={BASE} className="inline-flex items-center gap-1 text-foreground hover:underline">
          <Home className="w-4 h-4" /> uploads
        </Link>
        {segmentos.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href={enlace(segmentos.slice(0, i + 1))} className="text-foreground hover:underline">
              {s}
            </Link>
          </span>
        ))}
      </nav>

      {!listado ? (
        <p className="text-muted-foreground">
          Esa carpeta no existe o la ruta no es válida.{" "}
          <Link href={BASE} className="text-foreground underline underline-offset-4">
            Volver al inicio
          </Link>
          .
        </p>
      ) : (
        <>
          <BarraMultimedia ruta={segmentos.join("/")} />

          <p className="mt-6 mb-4 text-sm text-muted-foreground">
            {listado.carpetas.length} {listado.carpetas.length === 1 ? "carpeta" : "carpetas"} · {listado.totalArchivos}{" "}
            {listado.totalArchivos === 1 ? "archivo" : "archivos"}
          </p>

          {listado.carpetas.length === 0 && listado.totalArchivos === 0 && <p className="text-muted-foreground">Esta carpeta está vacía.</p>}

          {listado.carpetas.length > 0 && (
            <ul className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {listado.carpetas.map((c) => (
                <li key={c.nombre} className="flex items-center justify-between gap-2 border border-border bg-white px-4 py-3">
                  <Link href={enlace([...segmentos, c.nombre])} className="flex min-w-0 items-center gap-2 text-foreground hover:underline">
                    <Folder className="w-5 h-5 shrink-0 text-primary" />
                    <span className="truncate">{c.nombre}</span>
                  </Link>
                  <BotonEliminar
                    accion={eliminarMultimedia.bind(null, [...segmentos, c.nombre].join("/"))}
                    etiqueta={`la carpeta “${c.nombre}” con todo lo que contiene (si algún proyecto usa esas imágenes, dejarán de verse)`}
                  />
                </li>
              ))}
            </ul>
          )}

          {listado.archivos.length > 0 && (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {listado.archivos.map((a) => {
                const ruta = [...segmentos, a.nombre]
                return (
                  <li key={a.nombre} className="overflow-hidden rounded-xl border border-border bg-white">
                    <a href={url(ruta)} target="_blank" rel="noopener noreferrer" className="block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url(ruta)} alt={a.nombre} loading="lazy" className="h-28 w-full bg-neutral-100 object-cover" />
                    </a>
                    <div className="space-y-1 p-3">
                      <p className="truncate text-xs text-foreground" title={a.nombre}>
                        {a.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatoBytes(a.bytes)}</p>
                      <div className="pt-1 text-xs">
                        <BotonEliminar
                          accion={eliminarMultimedia.bind(null, ruta.join("/"))}
                          etiqueta={`el archivo “${a.nombre}” (si algún proyecto lo usa, dejará de verse)`}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {listado.paginas > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4 text-sm">
              {listado.pagina > 1 && (
                <Link href={enlace(segmentos, listado.pagina - 1)} className="underline underline-offset-4">
                  ← Anterior
                </Link>
              )}
              <span className="text-muted-foreground">
                Página {listado.pagina} de {listado.paginas}
              </span>
              {listado.pagina < listado.paginas && (
                <Link href={enlace(segmentos, listado.pagina + 1)} className="underline underline-offset-4">
                  Siguiente →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
