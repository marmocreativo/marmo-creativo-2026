"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { EditorHtml } from "@/components/admin/editor-html"
import { SelectorImagen } from "@/components/forms/selector-imagen"
import type { Estado } from "@/lib/actions/auth"
import { CATEGORIAS_BLOG } from "@/lib/blog-categorias"
import type { ImagenArticulo } from "@/lib/crm/galeria-articulos"

type Valores = Record<string, string | number | null | undefined>

const campo = "mt-1 w-full border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
const etiqueta = "block text-sm font-medium text-foreground"
const ayuda = "mt-1 block text-xs font-normal text-muted-foreground"
const tarjeta = "rounded-xl border border-border bg-white p-5"

const slugify = (t: string) =>
    t
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 100)

const hoyMX = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Mexico_City" })

// Contador "n / máx" que se pone rojo al pasarse (Google corta los títulos y descripciones largos).
function Contador({ n, max, min }: { n: number; max: number; min?: number }) {
    const mal = n > max
    const poco = min !== undefined && n > 0 && n < min
    return (
        <span className={`text-xs font-normal tabular-nums ${mal ? "text-destructive" : poco ? "text-amber-600" : "text-muted-foreground"}`}>
            {n} / {max}
        </span>
    )
}

export function ArticuloForm({
    valores,
    formato,
    galeria,
    accion,
    cancelarHref,
    nuevo,
    creado,
}: {
    valores: Valores
    formato: "markdown" | "html"
    galeria: ImagenArticulo[]
    accion: (prev: Estado, fd: FormData) => Promise<Estado>
    cancelarHref: string
    nuevo: boolean
    creado?: boolean
}) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    const texto = (k: string) => String(valores[k] ?? "")

    const [titulo, setTitulo] = useState(texto("titulo"))
    const [slug, setSlug] = useState(texto("slug"))
    const [slugManual, setSlugManual] = useState(false)
    const [resumen, setResumen] = useState(texto("resumen"))
    const [metaTitulo, setMetaTitulo] = useState(texto("meta_titulo"))
    const [metaDescripcion, setMetaDescripcion] = useState(texto("meta_descripcion"))
    const [categoria, setCategoria] = useState(texto("categoria"))
    const [palabraClave, setPalabraClave] = useState(texto("palabra_clave"))
    const [noindex, setNoindex] = useState(!!valores.noindex)
    const [portadaAlt, setPortadaAlt] = useState(texto("portada_alt"))
    const [publicado, setPublicado] = useState(!!valores.publicado)
    const [fecha, setFecha] = useState(texto("fecha_publicacion"))

    const programado = publicado && !!fecha && fecha > hoyMX()
    const portada = valores.portada ? String(valores.portada) : null

    // Vista previa de cómo se verá en Google.
    const tituloGoogle = (metaTitulo || titulo || "Título del artículo").slice(0, 70)
    const descripcionGoogle = (metaDescripcion || resumen || "Aquí aparecerá la descripción que lee Google.").slice(0, 165)

    return (
        <form action={enviar} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
            {/* ───────── Columna izquierda: contenido y SEO ───────── */}
            <div className="min-w-0 space-y-6">
                <section className={`${tarjeta} space-y-5`}>
                    <label className={etiqueta}>
                        <span className="flex items-center justify-between">
                            Título *<Contador n={titulo.length} max={70} />
                        </span>
                        <input
                            className={`${campo} text-base`}
                            name="titulo"
                            required
                            maxLength={200}
                            value={titulo}
                            onChange={(e) => {
                                setTitulo(e.target.value)
                                if (nuevo && !slugManual) setSlug(slugify(e.target.value))
                            }}
                            placeholder="Ej. ¿Cuánto cuesta una página web en México?"
                        />
                    </label>

                    <label className={etiqueta}>
                        URL del artículo *
                        <span className="mt-1 flex items-stretch">
                            <span className="flex items-center border border-r-0 border-border bg-neutral-50 px-3 text-sm text-muted-foreground">/blog/</span>
                            <input
                                className="w-full border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
                                name="slug"
                                required
                                maxLength={120}
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value)
                                    setSlugManual(true)
                                }}
                                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                                title="Minúsculas, números y guiones"
                            />
                        </span>
                        <span className={ayuda}>
                            {nuevo ? "Se genera del título; puedes cambiarla." : "No la cambies si el artículo ya está publicado: se perdería el enlace en Google."}
                        </span>
                    </label>

                    <label className={etiqueta}>
                        <span className="flex items-center justify-between">
                            Resumen *<Contador n={resumen.length} max={300} />
                        </span>
                        <textarea
                            className={`${campo} resize-y`}
                            name="resumen"
                            rows={3}
                            required
                            maxLength={500}
                            value={resumen}
                            onChange={(e) => setResumen(e.target.value)}
                        />
                        <span className={ayuda}>Aparece en las tarjetas del blog y bajo el título. Si no pones meta descripción, también la usa Google.</span>
                    </label>

                    <label className={etiqueta}>
                        Categoría *
                        <select className={campo} name="categoria" required value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="" disabled>
                                — Elegir —
                            </option>
                            {CATEGORIAS_BLOG.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                    {c.nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div>
                        <span className={etiqueta}>Contenido *</span>
                        <div className="mt-1">
                            <EditorHtml nombre="contenido" valor={texto("contenido")} formato={formato} galeria={galeria} />
                        </div>
                        {formato === "markdown" && !nuevo && (
                            <span className={ayuda}>Este borrador estaba en Markdown: se convirtió al editor visual y, al guardar, queda en formato visual.</span>
                        )}
                    </div>
                </section>

                <section className={`${tarjeta} space-y-5`}>
                    <div>
                        <h3 className="text-base font-medium text-foreground">SEO y metadatos</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Lo que se lee en Google y al compartir el enlace. Si lo dejas vacío se usan el título y el resumen.
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-neutral-50 p-4" aria-label="Vista previa en Google">
                        <p className="truncate text-xs text-emerald-800">marmo-creativo.com › blog › {slug || "url-del-articulo"}</p>
                        <p className="mt-1 truncate text-lg leading-snug text-[#1a0dab]">{tituloGoogle}</p>
                        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-neutral-600">{descripcionGoogle}</p>
                    </div>

                    <label className={etiqueta}>
                        <span className="flex items-center justify-between">
                            Título SEO <Contador n={metaTitulo.length} max={60} />
                        </span>
                        <input
                            className={campo}
                            name="meta_titulo"
                            maxLength={80}
                            value={metaTitulo}
                            onChange={(e) => setMetaTitulo(e.target.value)}
                            placeholder={titulo || "Si está vacío se usa el título"}
                        />
                        <span className={ayuda}>Ideal: hasta 60 caracteres, con la palabra clave al inicio. Se le agrega “| Marmo Creativo”.</span>
                    </label>

                    <label className={etiqueta}>
                        <span className="flex items-center justify-between">
                            Meta descripción <Contador n={metaDescripcion.length} max={160} min={120} />
                        </span>
                        <textarea
                            className={`${campo} resize-y`}
                            name="meta_descripcion"
                            rows={3}
                            maxLength={220}
                            value={metaDescripcion}
                            onChange={(e) => setMetaDescripcion(e.target.value)}
                            placeholder={resumen || "Si está vacía se usa el resumen"}
                        />
                        <span className={ayuda}>Ideal: entre 120 y 160 caracteres. Resume el artículo e invita a hacer clic.</span>
                    </label>

                    <label className={etiqueta}>
                        Palabra clave principal
                        <input className={campo} name="palabra_clave" maxLength={120} value={palabraClave} onChange={(e) => setPalabraClave(e.target.value)} placeholder="Ej. cuánto cuesta una página web" />
                        <span className={ayuda}>La búsqueda a la que apunta el artículo. Debe aparecer en el título, la URL y los primeros párrafos.</span>
                    </label>

                    <label className="flex items-start gap-2 text-sm">
                        <input type="checkbox" name="noindex" checked={noindex} onChange={(e) => setNoindex(e.target.checked)} className="mt-0.5" />
                        <span>
                            <span className="font-medium text-foreground">No indexar en buscadores</span>
                            <span className={ayuda}>Google no mostrará este artículo y no entra al sitemap. Útil para pruebas o contenido que no quieres posicionar.</span>
                        </span>
                    </label>
                </section>
            </div>

            {/* ───────── Columna derecha: publicación e imagen ───────── */}
            <aside className="min-w-0 space-y-6 lg:sticky lg:top-4">
                <section className={`${tarjeta} space-y-4`}>
                    <h3 className="text-base font-medium text-foreground">Publicación</h3>

                    <label className="flex items-start gap-2 text-sm">
                        <input type="checkbox" name="publicado" checked={publicado} onChange={(e) => setPublicado(e.target.checked)} className="mt-0.5" />
                        <span>
                            <span className="font-medium text-foreground">Publicado</span>
                            <span className={ayuda}>
                                {!publicado
                                    ? "Borrador: no se ve en el sitio ni en el sitemap."
                                    : programado
                                      ? "Programado: aparecerá el día de su fecha."
                                      : "Visible en el sitio y en el sitemap."}
                            </span>
                        </span>
                    </label>

                    <label className={etiqueta}>
                        Fecha de publicación
                        <input className={campo} type="date" name="fecha_publicacion" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                        <span className={ayuda}>Si publicas sin fecha se usa la de hoy. Una fecha futura lo programa.</span>
                    </label>

                    {estado?.error && (
                        <p className="text-sm text-destructive" role="alert">
                            {estado.error}
                        </p>
                    )}
                    {estado?.ok && (
                        <p className="text-sm text-emerald-700" role="status">
                            {estado.ok}
                        </p>
                    )}
                    {creado && !estado && (
                        <p className="text-sm text-emerald-700" role="status">
                            Artículo creado. Ya puedes agregar su galería debajo.
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={pendiente}
                            className="inline-flex items-center justify-center bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                        >
                            {pendiente ? "Guardando…" : nuevo ? "Crear artículo" : "Guardar cambios"}
                        </button>
                        <Link href={cancelarHref} className="text-sm text-muted-foreground hover:text-foreground">
                            {nuevo ? "Cancelar" : "Volver a la lista"}
                        </Link>
                    </div>

                    {!nuevo && publicado && !programado && !noindex && (
                        <a
                            href={`/blog/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                            Ver en el sitio <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </section>

                <section className={`${tarjeta} space-y-3`}>
                    <h3 className="text-base font-medium text-foreground">Imagen de portada</h3>
                    {portada && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={portada} alt="" className="w-full rounded-lg border border-border object-cover" />
                    )}
                    <div className="min-w-0 [&_input[type=file]]:w-full [&_input[type=file]]:max-w-full">
                        <SelectorImagen name="portada" />
                    </div>
                    {portada && (
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input type="checkbox" name="portada__quitar" /> Quitar imagen actual
                        </label>
                    )}
                    <label className={etiqueta}>
                        Texto alternativo
                        <input className={campo} name="portada_alt" maxLength={200} value={portadaAlt} onChange={(e) => setPortadaAlt(e.target.value)} placeholder="Describe la imagen" />
                    </label>
                    <p className="text-xs text-muted-foreground">
                        Opcional. Conserva la proporción; el lado más largo se reduce a 1200 px (WebP). También es la imagen al compartir en redes.
                    </p>
                </section>
            </aside>
        </form>
    )
}
