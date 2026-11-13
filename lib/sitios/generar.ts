import { ErrorAnthropic, generarTexto, modeloEditar, modeloGenerar, usoVacio, type Herramienta, type Uso } from "@/lib/ia/anthropic"
import { bloquesReferencias, construirContexto, huellaReferencias } from "./contexto"
import { DIRECCIONES, instruccionBase, instruccionEdicionCss, instruccionEdicionHtml, SISTEMA_EDICION, instruccionPagina, instruccionPropuesta, instruccionReferencias, SISTEMA, SISTEMA_REFERENCIAS, TEMA_CONTACTO, TEMA_SERVICIO } from "./prompts"
import * as repo from "./repo"
import type { Pagina, Sitio } from "./repo"
import { fallarTarea, progreso, terminarTarea } from "./tareas"

// Orquesta la generación con IA. Corre en segundo plano (ver lib/actions/sitios-ia.ts) y va reportando su avance.

// Tope de salida por llamada. Incluye lo que el modelo "piensa" además del HTML: con 32 000 una propuesta llegó a truncarse.
const MAX_SALIDA = 48_000

// ---- Utilidades ---------------------------------------------------------------------------------------

const slugificar = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 50)
        .replace(/-+$/g, "")

// Saca los archivos de una respuesta: <archivo nombre="x">contenido</archivo>. Quita cercas de markdown si las hubiera.
function extraerArchivos(texto: string): Record<string, string> {
    const salida: Record<string, string> = {}
    for (const m of texto.matchAll(/<archivo\s+nombre="([^"]+)"\s*>([\s\S]*?)<\/archivo>/g)) {
        salida[m[1].trim()] = m[2].replace(/^\s*```[a-z]*\s*\n/i, "").replace(/\n?\s*```\s*$/i, "").trim()
    }
    return salida
}

// El HTML generado se guarda tal cual, salvo scripts externos: el sitio es estático y no debe cargar código de terceros.
function limpiarHtml(html: string): string {
    return html.replace(/<script\b[^>]*\bsrc\s*=[^>]*>\s*<\/script>/gi, "")
}

function exigirHtml(html: string | undefined, que: string): string {
    if (!html || !/<html[\s>]/i.test(html) || !/<\/html>/i.test(html)) throw new ErrorAnthropic(`La IA no devolvió ${que} completo. Inténtalo de nuevo.`)
    return limpiarHtml(html)
}

type Plan = { slug: string; titulo: string; tipo: Pagina["tipo"]; tema: string }

// Qué páginas llevará el sitio: Inicio, Contacto y hasta 5 de servicio (de la lista de servicios del briefing).
// Las páginas "otra" que ya existan se respetan y cuentan para el máximo de 7.
export function planearPaginas(s: Sitio, actuales: Pagina[]): { servicios: Plan[]; contacto: Plan; regenerarServicios: boolean } {
    const ubicacion = s.briefing.ubicacion ?? s.seo.ubicacion ?? ""
    const otras = actuales.filter((p) => p.tipo === "otra").length
    const cupo = Math.max(0, Math.min(5, 7 - 2 - otras))

    const desdeBriefing = (s.briefing.servicios ?? "")
        .split(/\r?\n/)
        .map((l) => l.replace(/^[\s\-•*·\d.)]+/, "").trim())
        .filter((l) => l.length >= 3)
        .map((l) => l.slice(0, 60))
    const vistos = new Set<string>(["index", "contacto", "styles", "img", "sitemap", "robots"])
    const servicios: Plan[] = []
    for (const titulo of desdeBriefing) {
        const slug = slugificar(titulo)
        if (!slug || vistos.has(slug)) continue
        vistos.add(slug)
        servicios.push({ slug, titulo, tipo: "servicio", tema: TEMA_SERVICIO(titulo, ubicacion) })
        if (servicios.length >= cupo) break
    }

    // Sin servicios en el briefing: se conservan (y se rehacen) las páginas de servicio que ya existían.
    const regenerarServicios = servicios.length > 0
    const usados = regenerarServicios
        ? servicios
        : actuales.filter((p) => p.tipo === "servicio").slice(0, cupo).map((p) => ({ slug: p.slug, titulo: p.titulo, tipo: "servicio" as const, tema: TEMA_SERVICIO(p.titulo, ubicacion) }))

    return { servicios: usados, contacto: { slug: "contacto", titulo: "Contacto", tipo: "contacto", tema: TEMA_CONTACTO }, regenerarServicios }
}

const menu = (items: { slug: string; titulo: string }[]) => items.map((i) => `- ${i.titulo}: ${i.slug === "index" ? "index.html" : `${i.slug}.html`}`).join("\n")

// ---- Análisis de referencias -------------------------------------------------------------------------------

async function asegurarAnalisis(s: Sitio, uso: Uso): Promise<string | null> {
    const refs = await repo.listarArchivos(s.id, "referencia")
    if (!s.referencias_urls.length && !refs.length) return null

    const hash = await huellaReferencias(s)
    if (s.referencias_analisis?.hash === hash) return s.referencias_analisis.texto

    const herramientas: Herramienta[] = s.referencias_urls.length ? [{ type: "web_fetch_20260209", name: "web_fetch", max_uses: 4, max_content_tokens: 6000 }] : []
    const texto = (
        await generarTexto({
            modelo: modeloEditar(),
            sistema: SISTEMA_REFERENCIAS,
            contenido: [...(await bloquesReferencias(refs)), { type: "text", text: instruccionReferencias(s.referencias_urls) }],
            maxTokens: 4000,
            effort: "low",
            herramientas,
            uso,
        })
    ).trim()
    await repo.guardarAnalisisReferencias(s.id, { hash, texto })
    return texto
}

// ---- Paso 4: tres propuestas de Home -------------------------------------------------------------------

export async function ejecutarPropuestas(idTarea: number, s: Sitio) {
    const uso = usoVacio()
    try {
        const actuales = await repo.listarPaginas(s.id)
        const plan = planearPaginas(s, actuales)

        await progreso(idTarea, "Estudiando las referencias…", uso)
        const analisis = await asegurarAnalisis(s, uso).catch((e) => {
            console.error("[sitios-ia] análisis de referencias:", e) // no es indispensable: se sigue sin él
            return null
        })

        await progreso(idTarea, "Preparando el material del cliente…", uso)
        const ctx = await construirContexto(s, { conImagenes: true, analisis })
        const nav = menu([{ slug: "index", titulo: "Inicio" }, ...plan.servicios, { slug: "contacto", titulo: "Contacto" }])

        // Las propuestas anteriores solo se reemplazan si salió al menos una nueva (si todo falla, no se pierde nada).
        const generadas: { numero: number; nombre: string; html: string }[] = []
        await progreso(idTarea, "Diseñando 3 propuestas (toma unos minutos)…", uso)

        const resultados = await Promise.allSettled(
            DIRECCIONES.map(async (dir, i) => {
                const texto = await generarTexto({
                    modelo: modeloGenerar(),
                    sistema: SISTEMA,
                    contenido: [...ctx.bloques, { type: "text", text: instruccionPropuesta(dir, nav) }],
                    maxTokens: MAX_SALIDA,
                    effort: "medium",
                    uso,
                })
                const archivos = extraerArchivos(texto)
                const html = exigirHtml(archivos["index.html"] ?? texto.match(/<!doctype html[\s\S]*<\/html>/i)?.[0], "el HTML de la propuesta")
                const nombre = texto.match(/<nombre>([\s\S]*?)<\/nombre>/)?.[1]?.trim() || dir.nombre
                generadas.push({ numero: i + 1, nombre, html })
                await progreso(idTarea, `Propuesta ${generadas.length} de 3 lista…`, uso)
            }),
        )

        for (const x of resultados) if (x.status === "rejected") console.error("[sitios-ia] una propuesta falló:", x.reason)
        if (generadas.length === 0) {
            const fallo = resultados.find((r): r is PromiseRejectedResult => r.status === "rejected")
            throw fallo?.reason ?? new ErrorAnthropic("No se pudo generar ninguna propuesta.")
        }
        await repo.borrarPropuestas(s.id)
        for (const p of generadas) await repo.guardarPropuesta(s.id, p.numero, p.nombre, p.html)
        await repo.marcarEstado(s.id, "propuestas")
        if (generadas.length < 3) await fallarTarea(idTarea, `Se generaron ${generadas.length} de 3 propuestas; las demás fallaron. Puedes elegir una o volver a generar.`, uso)
        else await terminarTarea(idTarea, uso)
    } catch (e) {
        console.error("[sitios-ia] propuestas:", e)
        await fallarTarea(idTarea, e instanceof ErrorAnthropic ? e.message : "Ocurrió un error inesperado al generar las propuestas.", uso)
    }
}

// ---- Paso 5: sitio completo -----------------------------------------------------------------------------

export async function ejecutarSitio(idTarea: number, s: Sitio) {
    const uso = usoVacio()
    try {
        const propuestas = await repo.listarPropuestas(s.id)
        const elegida = propuestas.find((p) => p.numero === s.propuesta_elegida)
        if (!elegida) throw new ErrorAnthropic("Primero elige una de las propuestas.")

        const actuales = await repo.listarPaginas(s.id)
        const plan = planearPaginas(s, actuales)
        const otras = actuales.filter((p) => p.tipo === "otra")
        const todas = [{ slug: "index", titulo: "Inicio" }, ...plan.servicios, ...otras, { slug: "contacto", titulo: "Contacto" }]
        const nav = menu(todas)

        // 1) Hoja de estilos + Home definitivo + descripción de las imágenes.
        await progreso(idTarea, "Creando la hoja de estilos y la página de inicio…", uso)
        const ctx = await construirContexto(s, { conImagenes: true, analisis: s.referencias_analisis?.texto ?? null })
        const base = await generarTexto({
            modelo: modeloGenerar(),
            sistema: SISTEMA,
            contenido: [
                ...ctx.bloques,
                { type: "text", text: `Propuesta elegida (${elegida.nombre ?? `n.º ${elegida.numero}`}):\n<propuesta_elegida>\n${elegida.html}\n</propuesta_elegida>` },
                { type: "text", text: instruccionBase(nav, todas.filter((t) => t.slug !== "index").map((t) => t.titulo).join(", ") || "ninguna más") },
            ],
            maxTokens: MAX_SALIDA,
            effort: "medium",
            uso,
        })
        const archivos = extraerArchivos(base)
        const css = archivos["styles.css"]
        if (!css || css.length < 200) throw new ErrorAnthropic("La IA no devolvió la hoja de estilos. Inténtalo de nuevo.")
        const inicio = exigirHtml(archivos["index.html"], "la página de inicio")
        const imagenesJson = archivos["imagenes.json"] ?? "[]"

        await repo.actualizarCss(s.id, css)
        await repo.guardarPaginaGenerada(s.id, { slug: "index", titulo: "Inicio", tipo: "home", html: inicio, orden: 1 })
        if (plan.regenerarServicios) await repo.eliminarPaginasDeTipo(s.id, "servicio")
        // Orden del menú: Inicio, servicios, páginas propias y Contacto al final.
        for (const [i, p] of otras.entries()) await repo.actualizarOrden(s.id, p.slug, plan.servicios.length + 2 + i)
        await progreso(idTarea, "Inicio y estilos listos", uso)

        // 2) Demás páginas (servicios y contacto), de 3 en 3.
        const pendientes: (Plan & { orden: number })[] = [
            ...plan.servicios.map((p, i) => ({ ...p, orden: i + 2 })),
            { ...plan.contacto, orden: 100 },
        ]
        const fallidas: string[] = []
        let hechas = 0
        const cola = [...pendientes]
        const trabajador = async () => {
            for (let p = cola.shift(); p; p = cola.shift()) {
                try {
                    const texto = await generarTexto({
                        modelo: modeloGenerar(),
                        sistema: SISTEMA,
                        contenido: [
                            ...(await construirContexto(s, { conImagenes: false, analisis: s.referencias_analisis?.texto ?? null })).bloques,
                            { type: "text", text: `<imagenes_disponibles>\n${imagenesJson}\n</imagenes_disponibles>\n<styles_css>\n${css}\n</styles_css>\n<index_html>\n${inicio}\n</index_html>` },
                            { type: "text", text: instruccionPagina(p, nav) },
                        ],
                        maxTokens: MAX_SALIDA,
                        effort: "medium",
                        uso,
                    })
                    const html = exigirHtml(extraerArchivos(texto)[`${p.slug}.html`] ?? texto.match(/<!doctype html[\s\S]*<\/html>/i)?.[0], `la página «${p.titulo}»`)
                    await repo.guardarPaginaGenerada(s.id, { slug: p.slug, titulo: p.titulo, tipo: p.tipo, html, orden: p.orden })
                } catch (e) {
                    console.error(`[sitios-ia] página ${p.slug}:`, e)
                    fallidas.push(p.titulo)
                }
                hechas++
                await progreso(idTarea, `Páginas ${hechas} de ${pendientes.length} listas…`, uso)
            }
        }
        await Promise.all(Array.from({ length: Math.min(3, pendientes.length) }, trabajador))

        await repo.marcarEstado(s.id, "completo")
        if (fallidas.length) await fallarTarea(idTarea, `El sitio se generó, pero fallaron estas páginas: ${fallidas.join(", ")}. Puedes volver a generar o crearlas a mano.`, uso)
        else await terminarTarea(idTarea, uso)
    } catch (e) {
        console.error("[sitios-ia] sitio:", e)
        await fallarTarea(idTarea, e instanceof ErrorAnthropic ? e.message : "Ocurrió un error inesperado al generar el sitio.", uso)
    }
}

// ---- Edición por prompts ---------------------------------------------------------------------------------

export type AlcanceEdicion = "pagina" | "css" | "sitio"
export type ParamsEdicion = {
    alcance: AlcanceEdicion
    idPagina?: number
    instruccion: string
    // Lo que el usuario ya tiene en el editor sin guardar: la IA parte de eso, no de lo guardado.
    paginas: Record<number, string>
    css?: string
}
export type ResultadoEdicion = { paginas: Record<number, string>; css?: string; cambios: number; avisos?: string }

const resumenDelSitio = (s: Sitio, paginas: Pagina[]) =>
    `<datos_del_sitio>
Sitio: ${s.nombre}
Palabra clave: ${s.seo.palabra_clave ?? "(sin definir)"}
Dominio: ${s.seo.dominio ?? "(sin definir)"}
Páginas: ${paginas.map((p) => `${p.titulo} (${p.slug === "index" ? "index" : p.slug}.html)`).join(", ")}
</datos_del_sitio>`

// Edita con IA una página, la hoja de estilos o todo el sitio. No guarda nada en las páginas: el resultado
// vuelve a la pantalla, que lo pone en los campos del editor para que el usuario lo revise y lo guarde.
export async function ejecutarEdicion(idTarea: number, s: Sitio, p: ParamsEdicion) {
    const uso = usoVacio()
    try {
        const guardadas = await repo.listarPaginas(s.id)
        const paginas = guardadas.map((x) => ({ ...x, html: p.paginas[x.id] ?? x.html }))
        let css = p.css ?? s.css
        const resumen = resumenDelSitio(s, paginas)
        const resultado: ResultadoEdicion = { paginas: {}, cambios: 0 }

        const editarCss = async () => {
            const inicio = paginas.find((x) => x.slug === "index") ?? paginas[0]
            const texto = await generarTexto({
                modelo: modeloEditar(),
                sistema: SISTEMA_EDICION,
                contenido: [
                    { type: "text", text: resumen },
                    { type: "text", text: `<index_html>
${inicio?.html ?? ""}
</index_html>
<archivo_a_editar nombre="styles.css">
${css}
</archivo_a_editar>` },
                    { type: "text", text: instruccionEdicionCss(p.instruccion) },
                ],
                maxTokens: MAX_SALIDA,
                effort: "medium",
                uso,
            })
            const nuevo = extraerArchivos(texto)["styles.css"]
            if (!nuevo || nuevo.length < 50) throw new ErrorAnthropic("La IA no devolvió la hoja de estilos. Inténtalo de nuevo.")
            if (nuevo !== css.trim()) {
                css = nuevo
                resultado.css = nuevo
            }
        }

        const editarPagina = async (pg: Pagina & { html: string }, puedeCss: boolean) => {
            const nombre = pg.slug === "index" ? "index.html" : `${pg.slug}.html`
            const texto = await generarTexto({
                modelo: modeloEditar(),
                sistema: SISTEMA_EDICION,
                contenido: [
                    { type: "text", text: resumen },
                    { type: "text", text: `<styles_css>
${css}
</styles_css>
<archivo_a_editar nombre="${nombre}">
${pg.html}
</archivo_a_editar>` },
                    { type: "text", text: instruccionEdicionHtml(nombre, p.instruccion, puedeCss) },
                ],
                maxTokens: MAX_SALIDA,
                effort: "medium",
                uso,
            })
            const archivos = extraerArchivos(texto)
            const html = exigirHtml(archivos[nombre] ?? texto.match(/<!doctype html[\s\S]*<\/html>/i)?.[0], `la página «${pg.titulo}»`)
            if (html.trim() !== pg.html.trim()) resultado.paginas[pg.id] = html
            const cssNuevo = archivos["styles.css"]
            if (puedeCss && cssNuevo && cssNuevo.length > Math.max(200, css.length * 0.6) && cssNuevo !== css.trim()) {
                css = cssNuevo
                resultado.css = cssNuevo
            }
        }

        if (p.alcance === "css") {
            await progreso(idTarea, "Editando la hoja de estilos…", uso)
            await editarCss()
        } else if (p.alcance === "pagina") {
            const pg = paginas.find((x) => x.id === p.idPagina)
            if (!pg) throw new ErrorAnthropic("La página ya no existe.")
            await progreso(idTarea, `Editando «${pg.titulo}»…`, uso)
            await editarPagina(pg, true)
        } else {
            // Todo el sitio: primero los estilos (para que las páginas usen las clases nuevas) y luego las páginas, de 3 en 3.
            await progreso(idTarea, "Editando la hoja de estilos…", uso)
            await editarCss()
            const cola = [...paginas]
            const fallidas: string[] = []
            let hechas = 0
            const trabajador = async () => {
                for (let pg = cola.shift(); pg; pg = cola.shift()) {
                    try {
                        await editarPagina(pg, false)
                    } catch (e) {
                        console.error(`[sitios-ia] edición de ${pg.slug}:`, e)
                        fallidas.push(pg.titulo)
                    }
                    hechas++
                    await progreso(idTarea, `Páginas ${hechas} de ${paginas.length} revisadas…`, uso)
                }
            }
            await Promise.all(Array.from({ length: Math.min(3, paginas.length) }, trabajador))
            if (fallidas.length === paginas.length) throw new ErrorAnthropic("La IA no pudo editar ninguna página. Inténtalo de nuevo.")
            // Lo que sí se pudo editar se entrega igual; la pantalla muestra el aviso de lo que faltó.
            if (fallidas.length) resultado.avisos = `No se pudieron editar: ${fallidas.join(", ")}. Puedes repetir la instrucción solo en esas páginas.`
        }

        resultado.cambios = Object.keys(resultado.paginas).length + (resultado.css ? 1 : 0)
        await terminarTarea(idTarea, uso, JSON.stringify(resultado))
    } catch (e) {
        console.error("[sitios-ia] edición:", e)
        await fallarTarea(idTarea, e instanceof ErrorAnthropic ? e.message : "Ocurrió un error inesperado al editar con IA.", uso)
    }
}
