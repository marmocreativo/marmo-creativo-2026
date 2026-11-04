"use client"

import { useRef, useState } from "react"
import { Check, ExternalLink, Loader2, Sparkles, TriangleAlert, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ETIQUETAS_BLOG } from "@/lib/blog-categorias"
import type { ImagenIA, MetaIA, NotaIA, ResultadoIA } from "@/lib/ia/tipos"

const campo = "mt-1 w-full border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
const etiqueta = "block text-sm font-medium text-foreground"
const ayuda = "mt-1 block text-xs font-normal text-muted-foreground"

type PasoId = "nota" | "meta" | "img"
type EstadoPaso = "pendiente" | "curso" | "ok" | "error" | "omitido"

const NOMBRES: Record<PasoId, string> = {
    nota: "Investigar en Google, redactar la nota y verificar las fuentes",
    meta: "Generar los metadatos SEO",
    img: "Crear las imágenes",
}

async function pedir<T>(url: string, cuerpo: unknown, senal: AbortSignal): Promise<T> {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo), signal: senal })
    const j = (await r.json().catch(() => ({}))) as { error?: string }
    if (!r.ok) throw new Error(j.error ?? "No se pudo completar el paso.")
    return j as T
}

const borrarImagen = (url: string) =>
    fetch("/api/admin/articulos/ia/imagen", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) }).catch(() => {})

function IconoPaso({ estado }: { estado: EstadoPaso }) {
    if (estado === "curso") return <Loader2 className="h-4 w-4 animate-spin text-foreground" />
    if (estado === "ok") return <Check className="h-4 w-4 text-emerald-600" />
    if (estado === "error") return <X className="h-4 w-4 text-destructive" />
    return <span className="h-2 w-2 rounded-full bg-border" aria-hidden />
}

// Botón + panel lateral "Crear nota con IA": investiga en Google con Gemini, redacta, genera metadatos e imágenes,
// y al aprobarlo lo pasa al formulario (el artículo se guarda con el botón de siempre).
export function NotaIA({
    iaLista,
    tituloInicial,
    onAplicar,
}: {
    iaLista: boolean
    tituloInicial: string
    onAplicar: (r: ResultadoIA) => void
}) {
    const [abierto, setAbierto] = useState(false)
    const [titulo, setTitulo] = useState(tituloInicial)
    const [contenido, setContenido] = useState("")
    const [palabraClave, setPalabraClave] = useState("")
    const [conImagenes, setConImagenes] = useState(true)

    const [fase, setFase] = useState<"formulario" | "trabajando" | "listo">("formulario")
    const [pasos, setPasos] = useState<Record<PasoId, EstadoPaso>>({ nota: "pendiente", meta: "pendiente", img: "pendiente" })
    const [detalle, setDetalle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [resultado, setResultado] = useState<ResultadoIA | null>(null)
    const control = useRef<AbortController | null>(null)

    const marcar = (id: PasoId, e: EstadoPaso) => setPasos((p) => ({ ...p, [id]: e }))

    const generar = async () => {
        if (titulo.trim().length < 8) return setError("Escribe un título o tema (mínimo 8 caracteres).")
        const ctrl = new AbortController()
        control.current = ctrl
        setError(null)
        setResultado(null)
        setFase("trabajando")
        setPasos({ nota: "curso", meta: "pendiente", img: conImagenes ? "pendiente" : "omitido" })
        setDetalle("")

        let paso: PasoId = "nota"
        const avisos: string[] = []
        try {
            const nota = await pedir<NotaIA>("/api/admin/articulos/ia/nota", { titulo, contenido, palabraClave }, ctrl.signal)
            marcar("nota", "ok")

            paso = "meta"
            marcar("meta", "curso")
            const meta = await pedir<MetaIA>("/api/admin/articulos/ia/metadatos", { titulo, html: nota.html, palabraClave }, ctrl.signal)
            marcar("meta", "ok")

            const imagenes: ImagenIA[] = []
            if (conImagenes) {
                paso = "img"
                marcar("img", "curso")
                for (let i = 0; i < meta.imagenes.length; i++) {
                    setDetalle(`Imagen ${i + 1} de ${meta.imagenes.length}…`)
                    try {
                        const img = await pedir<{ url: string; ancho: number; alto: number }>(
                            "/api/admin/articulos/ia/imagen",
                            { prompt: meta.imagenes[i].prompt, aspecto: i === 0 ? "16:9" : "4:3" },
                            ctrl.signal,
                        )
                        imagenes.push({ ...img, alt: meta.imagenes[i].alt })
                    } catch (e) {
                        if (ctrl.signal.aborted) throw e
                        avisos.push(`No se pudo crear la imagen ${i + 1}: ${e instanceof Error ? e.message : "error desconocido"}`)
                    }
                }
                marcar("img", imagenes.length > 0 ? "ok" : "error")
                setDetalle("")
            }

            setResultado({ nota, meta, imagenes, avisos })
            setFase("listo")
        } catch (e) {
            if (ctrl.signal.aborted) return
            marcar(paso, "error")
            setError(e instanceof Error ? e.message : "No se pudo generar la nota.")
            setFase("formulario")
        } finally {
            control.current = null
        }
    }

    const cancelar = () => {
        control.current?.abort()
        setFase("formulario")
        setDetalle("")
    }

    const descartar = () => {
        resultado?.imagenes.forEach((i) => void borrarImagen(i.url))
        setResultado(null)
        setFase("formulario")
    }

    const aplicar = () => {
        if (!resultado) return
        onAplicar(resultado)
        setResultado(null) // las imágenes ya pertenecen al formulario: no se borran
        setFase("formulario")
        setAbierto(false)
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-foreground/30 bg-neutral-50 p-4">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">¿Quieres que la IA escriba la nota?</p>
                    <p className="text-xs text-muted-foreground">
                        Dale un título y tus ideas: investiga en Google, redacta con fuentes reales, arma el SEO y crea imágenes.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setAbierto(true)}
                    className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    <Sparkles className="h-4 w-4" /> Crear nota con IA
                </button>
            </div>

            <Sheet open={abierto} onOpenChange={setAbierto}>
                <SheetContent side="right" className="gap-3 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-xl">
                    <SheetHeader className="pb-0">
                        <SheetTitle className="pr-8 text-base font-medium">Crear nota con IA</SheetTitle>
                        <SheetDescription className="text-xs">Gemini investiga, redacta y prepara el artículo. Tú lo revisas antes de aplicarlo.</SheetDescription>
                    </SheetHeader>

                    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-5">
                        {!iaLista && (
                            <p className="flex gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900" role="alert">
                                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>
                                    Falta la API key de Gemini. Agrega <code>GEMINI_API_KEY</code> en <code>.env.local</code> (o en las variables de entorno de Dokploy) y reinicia el servidor.
                                </span>
                            </p>
                        )}

                        {fase !== "listo" && (
                            <div className="space-y-4">
                                <label className={etiqueta}>
                                    Título o tema *
                                    <input
                                        className={campo}
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        disabled={fase === "trabajando"}
                                        maxLength={200}
                                        placeholder="Ej. Cuánto cuesta una tienda en línea en México"
                                    />
                                </label>
                                <label className={etiqueta}>
                                    Contenido, ideas o datos que quieres incluir
                                    <textarea
                                        className={`${campo} resize-y`}
                                        rows={7}
                                        value={contenido}
                                        onChange={(e) => setContenido(e.target.value)}
                                        disabled={fase === "trabajando"}
                                        maxLength={6000}
                                        placeholder="Enfoque, público, puntos que no pueden faltar, tus precios o experiencia real… Mientras más me des, mejor queda."
                                    />
                                    <span className={ayuda}>La IA lo usa como base y lo completa con lo que investiga. No agrega precios ni casos tuyos que no escribas aquí.</span>
                                </label>
                                <label className={etiqueta}>
                                    Palabra clave principal (opcional)
                                    <input className={campo} value={palabraClave} onChange={(e) => setPalabraClave(e.target.value)} disabled={fase === "trabajando"} maxLength={120} placeholder="Ej. tienda en línea precio" />
                                </label>
                                <label className="flex items-start gap-2 text-sm">
                                    <input type="checkbox" checked={conImagenes} onChange={(e) => setConImagenes(e.target.checked)} disabled={fase === "trabajando"} className="mt-0.5" />
                                    <span>
                                        <span className="font-medium text-foreground">Crear 2 imágenes con IA</span>
                                        <span className={ayuda}>Una de portada y otra dentro del texto.</span>
                                    </span>
                                </label>

                                <p className="text-xs text-muted-foreground">
                                    Tarda de 1 a 2 minutos y usa tu cuota de Gemini (búsqueda en Google e imágenes). Si no encuentra al menos 2 fuentes reales, no genera la nota.
                                </p>
                            </div>
                        )}

                        {fase === "trabajando" && (
                            <ol className="space-y-2 rounded-lg border border-border p-4 text-sm" aria-live="polite">
                                {(["nota", "meta", "img"] as PasoId[])
                                    .filter((id) => pasos[id] !== "omitido")
                                    .map((id) => (
                                        <li key={id} className="flex items-center gap-3">
                                            <IconoPaso estado={pasos[id]} />
                                            <span className={pasos[id] === "pendiente" ? "text-muted-foreground" : "text-foreground"}>
                                                {NOMBRES[id]}
                                                {id === "img" && pasos.img === "curso" && detalle ? ` · ${detalle}` : ""}
                                            </span>
                                        </li>
                                    ))}
                            </ol>
                        )}

                        {error && (
                            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}

                        {fase === "listo" && resultado && (
                            <div className="space-y-5">
                                <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                                    <Check className="h-4 w-4" /> Nota lista para revisar
                                </p>

                                <section className="space-y-1 rounded-lg border border-border p-4 text-sm">
                                    <p className="font-medium text-foreground">{resultado.meta.titulo}</p>
                                    <p className="text-muted-foreground">{resultado.meta.resumen}</p>
                                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                                        <dt className="text-muted-foreground">URL</dt>
                                        <dd className="text-foreground">/blog/{resultado.meta.slug}</dd>
                                        <dt className="text-muted-foreground">Categoría</dt>
                                        <dd className="text-foreground">{ETIQUETAS_BLOG[resultado.meta.categoria] ?? resultado.meta.categoria}</dd>
                                        <dt className="text-muted-foreground">Palabra clave</dt>
                                        <dd className="text-foreground">{resultado.meta.palabra_clave || "—"}</dd>
                                        <dt className="text-muted-foreground">Título SEO</dt>
                                        <dd className="text-foreground">{resultado.meta.meta_titulo || "—"}</dd>
                                        <dt className="text-muted-foreground">Meta descripción</dt>
                                        <dd className="text-foreground">{resultado.meta.meta_descripcion || "—"}</dd>
                                    </dl>
                                </section>

                                {resultado.imagenes.length > 0 && (
                                    <section>
                                        <p className="mb-2 text-sm font-medium text-foreground">Imágenes creadas con IA</p>
                                        <ul className="grid grid-cols-2 gap-3">
                                            {resultado.imagenes.map((i, n) => (
                                                <li key={i.url} className="overflow-hidden rounded-lg border border-border">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={i.url} alt={i.alt} className="aspect-video w-full object-cover" />
                                                    <p className="p-2 text-xs text-muted-foreground">{n === 0 ? "Portada" : "Dentro del texto"}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                <section>
                                    <p className="mb-2 text-sm font-medium text-foreground">Fuentes verificadas ({resultado.nota.fuentes.length})</p>
                                    <ul className="space-y-1.5 text-sm">
                                        {resultado.nota.fuentes.map((f) => (
                                            <li key={f.url}>
                                                <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-foreground underline underline-offset-4 hover:opacity-80">
                                                    <span className="break-words">{f.titulo}</span>
                                                    <ExternalLink className="mt-1 h-3 w-3 shrink-0" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    {resultado.nota.consultas.length > 0 && (
                                        <p className="mt-3 text-xs text-muted-foreground">Búsquedas que hizo: {resultado.nota.consultas.join(" · ")}</p>
                                    )}
                                </section>

                                {resultado.avisos.length > 0 && (
                                    <ul className="space-y-1 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                                        {resultado.avisos.map((a) => (
                                            <li key={a}>{a}</li>
                                        ))}
                                    </ul>
                                )}

                                <p className="rounded-lg bg-neutral-50 p-3 text-xs text-muted-foreground">
                                    Revisa el texto antes de publicar: la IA puede equivocarse aunque cite fuentes (abre los enlaces para confirmar los datos importantes) y las imágenes pueden
                                    traer detalles raros.
                                    <strong className="text-foreground"> Al aplicar se reemplazan el contenido, el resumen y los metadatos que tengas en el formulario.</strong>
                                </p>
                            </div>
                        )}

                        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                            {fase === "formulario" && (
                                <button
                                    type="button"
                                    onClick={generar}
                                    disabled={!iaLista}
                                    className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                                >
                                    <Sparkles className="h-4 w-4" /> {error ? "Intentar de nuevo" : "Generar nota"}
                                </button>
                            )}
                            {fase === "trabajando" && (
                                <button type="button" onClick={cancelar} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                                    Cancelar
                                </button>
                            )}
                            {fase === "listo" && (
                                <>
                                    <button type="button" onClick={aplicar} className="bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90">
                                        Aplicar al formulario
                                    </button>
                                    <button type="button" onClick={descartar} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                                        Descartar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
