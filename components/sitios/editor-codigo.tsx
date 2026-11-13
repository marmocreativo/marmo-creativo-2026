"use client"

import { useActionState, useEffect, useMemo, useState, useTransition } from "react"
import type { Estado } from "@/lib/actions/auth"
import type { EntradaEdicion } from "@/lib/actions/sitios-ia"
import type { ResultadoEdicion } from "@/lib/sitios/generar"
import type { Pagina } from "@/lib/sitios/repo"
import type { Tarea } from "@/lib/sitios/tareas"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

type Props = {
    idSitio: number
    paginas: Pagina[]
    css: string
    maxPaginas: number
    guardarPagina: (idSitio: number, idPagina: number, html: string, titulo?: string) => Promise<Estado>
    guardarCss: (idSitio: number, css: string) => Promise<Estado>
    eliminarPagina: (idSitio: number, idPagina: number) => Promise<Estado>
    crearPagina: (prev: Estado, fd: FormData) => Promise<Estado>
    iniciarEdicion: (idSitio: number, e: EntradaEdicion) => Promise<Estado>
    consultar: (idSitio: number) => Promise<Tarea | null>
    recoger: (idSitio: number, idTarea: number) => Promise<ResultadoEdicion | null>
}

type Alcance = "pagina" | "css" | "sitio"

const CSS = "css"
const clave = (p: Pagina) => `p${p.id}`
const sin = <T,>(o: Record<string | number, T>, k: string | number) => {
    const copia = { ...o }
    delete copia[k]
    return copia
}

// Une la hoja de estilos al HTML para la vista previa (el sitio exportado usa styles.css aparte).
// Los enlaces se abren en otra pestaña para que no reemplacen la vista previa.
function documentoDeVista(html: string, css: string) {
    const conEstilos = /<link[^>]+href=["'][^"']*styles\.css["'][^>]*>/i.test(html)
        ? html.replace(/<link[^>]+href=["'][^"']*styles\.css["'][^>]*>/i, `<style>${css}</style>`)
        : html.replace(/<\/head>/i, `<style>${css}</style></head>`)
    return /<head[^>]*>/i.test(conEstilos) ? conEstilos.replace(/<head[^>]*>/i, (m) => `${m}<base target="_blank">`) : `<base target="_blank">${conEstilos}`
}

export function EditorCodigo({ idSitio, paginas, css, maxPaginas, guardarPagina, guardarCss, eliminarPagina, crearPagina, iniciarEdicion, consultar, recoger }: Props) {
    const [activaElegida, setActiva] = useState<string>(paginas[0] ? clave(paginas[0]) : CSS)
    const [vistaElegida, setVista] = useState<number | null>(paginas[0]?.id ?? null)
    const [ediciones, setEdiciones] = useState<Record<string, string>>({}) // solo lo modificado y sin guardar
    const [titulos, setTitulos] = useState<Record<number, string>>({})
    const [mensaje, setMensaje] = useState<Estado>(undefined)
    const [guardando, empezar] = useTransition()
    const [estadoNueva, enviarNueva, creando] = useActionState(crearPagina, undefined)
    const [instruccion, setInstruccion] = useState("")
    const [alcance, setAlcance] = useState<Alcance>("pagina")
    const [tareaIA, setTareaIA] = useState<number | null>(null)
    const [progresoIA, setProgresoIA] = useState("")
    const [msgIA, setMsgIA] = useState<Estado>(undefined)

    // Si borran la página activa (o cambia la lista), se usa la primera que exista.
    const activa = activaElegida === CSS || paginas.some((p) => clave(p) === activaElegida) ? activaElegida : paginas[0] ? clave(paginas[0]) : CSS
    const vista = vistaElegida !== null && paginas.some((p) => p.id === vistaElegida) ? vistaElegida : (paginas[0]?.id ?? null)
    const pagina = paginas.find((p) => clave(p) === activa) ?? null
    const base = (k: string) => (k === CSS ? css : (paginas.find((p) => clave(p) === k)?.html ?? ""))
    const codigo = (k: string) => ediciones[k] ?? base(k)
    const tituloActual = pagina ? (titulos[pagina.id] ?? pagina.titulo) : ""
    const sucio = (k: string) => k in ediciones && ediciones[k] !== base(k)
    const tituloSucio = !!pagina && pagina.id in titulos && titulos[pagina.id] !== pagina.titulo
    const hayCambios = Object.keys(ediciones).some(sucio) || Object.keys(titulos).length > 0

    // Edición con IA: corre en el servidor en segundo plano; aquí se consulta su avance y, al terminar, el resultado
    // se pone en los campos del editor (sin guardar) para que el usuario lo revise.
    useEffect(() => {
        if (tareaIA === null) return
        let vivo = true
        const t = setInterval(async () => {
            try {
                const x = await consultar(idSitio)
                if (!vivo || !x || x.id !== tareaIA) return
                if (x.estado === "ejecutando") return setProgresoIA(x.progreso ?? "")
                clearInterval(t)
                setTareaIA(null)
                if (x.estado === "error") return setMsgIA({ error: x.error ?? "La IA no pudo completar la edición." })
                const res = await recoger(idSitio, x.id)
                if (!res) return setMsgIA({ error: "No se pudo recuperar el resultado. Inténtalo de nuevo." })
                const nuevos: Record<string, string> = {}
                for (const [id, html] of Object.entries(res.paginas)) nuevos[`p${id}`] = html
                if (res.css) nuevos[CSS] = res.css
                setEdiciones((e) => ({ ...e, ...nuevos }))
                const primera = Object.keys(nuevos)[0]
                if (primera) {
                    setActiva(primera)
                    if (primera !== CSS) setVista(Number(primera.slice(1)))
                }
                setMsgIA(
                    res.cambios === 0
                        ? { ok: "La IA revisó el contenido y no encontró nada que cambiar con esa instrucción." }
                        : { ok: `La IA propuso cambios en ${res.cambios} archivo(s) (marcados con • en las pestañas). Revísalos y guarda lo que te sirva.${res.avisos ? " " + res.avisos : ""}` },
                )
            } catch {
                // un fallo de red no detiene la edición: se vuelve a consultar en el siguiente ciclo
            }
        }, 3000)
        return () => {
            vivo = false
            clearInterval(t)
        }
    }, [tareaIA, idSitio, consultar, recoger])

    // Aviso al cerrar la pestaña con cambios sin guardar.
    useEffect(() => {
        if (!hayCambios) return
        const f = (e: BeforeUnloadEvent) => e.preventDefault()
        window.addEventListener("beforeunload", f)
        return () => window.removeEventListener("beforeunload", f)
    }, [hayCambios])

    const paginaVista = paginas.find((p) => p.id === vista) ?? paginas[0] ?? null
    const documento = useMemo(
        () => (paginaVista ? documentoDeVista(codigo(clave(paginaVista)), codigo(CSS)) : ""),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [paginaVista, ediciones, css, paginas],
    )

    function elegir(k: string) {
        setActiva(k)
        setMensaje(undefined)
        const p = paginas.find((x) => clave(x) === k)
        if (p) setVista(p.id)
    }

    function guardar() {
        setMensaje(undefined)
        empezar(async () => {
            const r =
                activa === CSS
                    ? await guardarCss(idSitio, codigo(CSS))
                    : pagina
                      ? await guardarPagina(idSitio, pagina.id, codigo(activa), tituloSucio ? tituloActual : undefined)
                      : { error: "No hay nada que guardar." }
            setMensaje(r)
            if (r?.ok) {
                setEdiciones((e) => sin(e, activa))
                if (pagina) setTitulos((t) => sin(t, pagina.id))
            }
        })
    }

    function descartar() {
        setEdiciones((e) => sin(e, activa))
        if (pagina) setTitulos((t) => sin(t, pagina.id))
        setMensaje(undefined)
    }

    const sucias = Object.keys(ediciones).filter(sucio)
    function guardarTodo() {
        setMensaje(undefined)
        empezar(async () => {
            const errores: string[] = []
            for (const k of sucias) {
                const r = k === CSS ? await guardarCss(idSitio, ediciones[k]) : await guardarPagina(idSitio, Number(k.slice(1)), ediciones[k])
                if (r?.ok) setEdiciones((e) => sin(e, k))
                else errores.push(r?.error ?? "No se pudo guardar.")
            }
            setMensaje(errores.length ? { error: errores.join(" · ") } : { ok: "Todo guardado." })
        })
    }

    async function aplicarIA() {
        setMsgIA(undefined)
        if (alcance === "pagina" && !pagina) return setMsgIA({ error: "Elige primero la pestaña de la página que quieres editar." })
        const sucioPaginas: Record<number, string> = {}
        for (const p of paginas) if (sucio(clave(p))) sucioPaginas[p.id] = ediciones[clave(p)]
        const r = await iniciarEdicion(idSitio, { alcance, idPagina: pagina?.id, instruccion, paginas: sucioPaginas, css: sucio(CSS) ? ediciones[CSS] : undefined })
        if (r?.error) return setMsgIA(r)
        const t = await consultar(idSitio)
        if (!t) return setMsgIA({ error: "No se pudo iniciar la edición." })
        setProgresoIA("Preparando…")
        setTareaIA(t.id)
    }

    function borrar() {
        if (!pagina || !confirm(`¿Eliminar la página «${pagina.titulo}»? Esta acción no se puede deshacer.`)) return
        empezar(async () => {
            const r = await eliminarPagina(idSitio, pagina.id)
            setMensaje(r)
            if (r?.ok) setEdiciones((e) => sin(e, activa))
        })
    }

    return (
        <div>
            {/* Pestañas: páginas + hoja de estilos */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
                {paginas.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => elegir(clave(p))}
                        className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${activa === clave(p) ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                    >
                        {p.titulo}
                        {sucio(clave(p)) && " •"}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => elegir(CSS)}
                    className={`rounded-md border px-3 py-1.5 font-mono text-sm transition-colors ${activa === CSS ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                >
                    styles.css{sucio(CSS) && " •"}
                </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div>
                    {pagina && (
                        <div className="mb-3 grid gap-3 sm:grid-cols-2">
                            <label className="block text-sm text-muted-foreground">
                                Nombre en el menú
                                <input className={`${inputClass} mt-1`} value={tituloActual} maxLength={150} onChange={(e) => setTitulos((t) => ({ ...t, [pagina.id]: e.target.value }))} />
                            </label>
                            <p className="self-end text-sm text-muted-foreground">
                                Archivo: <span className="font-mono">{pagina.slug}.html</span>
                            </p>
                        </div>
                    )}
                    <textarea
                        value={codigo(activa)}
                        onChange={(e) => setEdiciones((s) => ({ ...s, [activa]: e.target.value }))}
                        spellCheck={false}
                        wrap="off"
                        aria-label={activa === CSS ? "Código de styles.css" : "Código HTML de la página"}
                        className="h-[32rem] w-full resize-y border border-border bg-neutral-950 p-4 font-mono text-[13px] leading-relaxed text-neutral-100 outline-none focus:border-foreground"
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button type="button" onClick={guardar} disabled={guardando || (!sucio(activa) && !tituloSucio)} className={`${botonClass} sm:w-auto`}>
                            {guardando ? "Guardando…" : "Guardar cambios"}
                        </button>
                        {sucias.length > 1 && (
                            <button type="button" onClick={guardarTodo} disabled={guardando} className="rounded-md border border-foreground px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background">
                                Guardar todo ({sucias.length})
                            </button>
                        )}
                        {(sucio(activa) || tituloSucio) && (
                            <button type="button" onClick={descartar} disabled={guardando} className="text-sm text-muted-foreground underline underline-offset-4">
                                Descartar cambios
                            </button>
                        )}
                        {pagina && pagina.tipo !== "home" && (
                            <button type="button" onClick={borrar} disabled={guardando} className="text-sm text-destructive underline underline-offset-4">
                                Eliminar página
                            </button>
                        )}
                        {(sucio(activa) || tituloSucio) && <span className="text-sm text-muted-foreground">Cambios sin guardar</span>}
                        {mensaje?.error && <span className="text-sm text-destructive" role="alert">{mensaje.error}</span>}
                        {mensaje?.ok && <span className="text-sm text-primary" role="status">{mensaje.ok}</span>}
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                        <span>Vista previa{paginaVista ? ` · ${paginaVista.titulo}` : ""}</span>
                        <span className="text-xs">Se actualiza al escribir, aunque no hayas guardado.</span>
                    </p>
                    {/* sandbox sin allow-same-origin: el HTML del sitio no puede tocar la sesión ni el resto de la app. */}
                    <iframe title="Vista previa del sitio" sandbox="allow-scripts" srcDoc={documento} className="h-[32rem] w-full border border-border bg-white" />
                </div>
            </div>

            {/* Editar con IA */}
            <div className="mt-10 rounded-xl border border-border p-5">
                <h3 className="text-base font-medium text-foreground">Editar con IA</h3>
                <p className="mt-1 mb-4 max-w-3xl text-sm text-muted-foreground">
                    Describe el cambio con tus palabras. La IA reescribe el código en los campos de arriba, pero <strong>no guarda nada</strong>: revisa el resultado y usa «Guardar cambios».
                </p>
                <fieldset className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-sm" disabled={tareaIA !== null}>
                    <legend className="sr-only">Qué editar</legend>
                    {(
                        [
                            ["pagina", pagina ? `Esta página (${pagina.titulo})` : "Esta página"],
                            ["css", "Hoja de estilos"],
                            ["sitio", "Todo el sitio"],
                        ] as const
                    ).map(([v, t]) => (
                        <label key={v} className="flex items-center gap-2">
                            <input type="radio" name="alcance-ia" checked={alcance === v} onChange={() => setAlcance(v)} /> {t}
                        </label>
                    ))}
                </fieldset>
                <textarea
                    value={instruccion}
                    onChange={(e) => setInstruccion(e.target.value)}
                    rows={3}
                    maxLength={2000}
                    disabled={tareaIA !== null}
                    placeholder="Ej. Cambia el botón principal a verde y agrega un botón flotante de WhatsApp. / Haz el texto del inicio más corto y directo."
                    className={`${inputClass} max-w-3xl`}
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={aplicarIA} disabled={tareaIA !== null || instruccion.trim().length < 5} className={`${botonClass} sm:w-auto`}>
                        {tareaIA !== null ? "Editando…" : "Aplicar con IA"}
                    </button>
                    <span className="text-xs text-muted-foreground">
                        {alcance === "sitio" ? "Edita los estilos y todas las páginas; toma varios minutos." : "Suele tardar menos de 2 minutos."} Usa Claude Sonnet: costo bajo por edición.
                    </span>
                </div>
                {tareaIA !== null && (
                    <p className="mt-3 flex items-center gap-2 text-sm" role="status" aria-live="polite">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden /> {progresoIA}
                    </p>
                )}
                {msgIA?.error && <p className="mt-3 text-sm text-destructive" role="alert">{msgIA.error}</p>}
                {msgIA?.ok && <p className="mt-3 text-sm text-primary" role="status">{msgIA.ok}</p>}
            </div>

            {/* Nueva página */}
            <form action={enviarNueva} className="mt-10 max-w-3xl border-t border-border pt-8">
                <h3 className="text-base font-medium text-foreground">Agregar página</h3>
                <p className="mt-1 mb-4 text-sm text-muted-foreground">
                    {paginas.length} de {maxPaginas} páginas (Inicio y Contacto incluidas). Hasta 5 pueden ser páginas de servicio.
                </p>
                <div className="grid gap-4 sm:grid-cols-4">
                    <label className="block text-sm text-muted-foreground sm:col-span-1">
                        Nombre
                        <input className={`${inputClass} mt-1`} name="titulo" required maxLength={150} placeholder="Diseño web" />
                    </label>
                    <label className="block text-sm text-muted-foreground sm:col-span-1">
                        URL
                        <input className={`${inputClass} mt-1`} name="slug" required maxLength={60} placeholder="diseno-web" />
                    </label>
                    <label className="block text-sm text-muted-foreground sm:col-span-1">
                        Tipo
                        <select className={`${inputClass} mt-1`} name="tipo" defaultValue="servicio">
                            <option value="servicio">Servicio</option>
                            <option value="otra">Otra</option>
                        </select>
                    </label>
                    <div className="flex items-end">
                        <button type="submit" disabled={creando || paginas.length >= maxPaginas} className={`${botonClass} sm:w-auto`}>
                            {creando ? "Creando…" : "Agregar"}
                        </button>
                    </div>
                </div>
                {estadoNueva?.error && <p className="mt-3 text-sm text-destructive" role="alert">{estadoNueva.error}</p>}
                {estadoNueva?.ok && <p className="mt-3 text-sm text-primary" role="status">{estadoNueva.ok}</p>}
            </form>
        </div>
    )
}
