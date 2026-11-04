"use client"

import { useImperativeHandle, useState } from "react"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import type { Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { TableKit } from "@tiptap/extension-table"
import { Placeholder } from "@tiptap/extensions"
import { marked } from "marked"
import {
    Bold,
    Eraser,
    Heading2,
    Heading3,
    ImagePlus,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo2,
    Strikethrough,
    Table2,
    Underline as IconoSubrayado,
    Undo2,
} from "lucide-react"
import type { ImagenArticulo } from "@/lib/crm/galeria-articulos"

type ImagenGaleria = Pick<ImagenArticulo, "id" | "archivo" | "descripcion">

// Lo que el formulario puede pedirle al editor (por ejemplo, cargar el texto que generó la IA).
export type ControlEditor = { reemplazar: (html: string) => void }

const campo = "w-full border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"

async function subirImagen(archivo: File): Promise<{ url: string } | { error: string }> {
    const fd = new FormData()
    fd.append("imagen", archivo)
    try {
        const r = await fetch("/api/admin/articulos/imagen", { method: "POST", body: fd })
        const j = (await r.json()) as { url?: string; error?: string }
        if (!r.ok || !j.url) return { error: j.error ?? "No se pudo subir la imagen." }
        return { url: j.url }
    } catch {
        return { error: "No se pudo subir la imagen. Revisa tu conexión." }
    }
}

function Boton({
    titulo,
    activo = false,
    deshabilitado = false,
    onClick,
    children,
}: {
    titulo: string
    activo?: boolean
    deshabilitado?: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            title={titulo}
            aria-label={titulo}
            aria-pressed={activo}
            disabled={deshabilitado}
            // onMouseDown evita que el botón le quite el foco (y la selección) al editor.
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded transition-colors disabled:opacity-30 ${
                activo ? "bg-foreground text-background" : "text-foreground/70 hover:bg-neutral-100 hover:text-foreground"
            }`}
        >
            {children}
        </button>
    )
}

const Separador = () => <span className="mx-1 h-5 w-px bg-border" aria-hidden />

function Barra({ editor, abrirPanel }: { editor: Editor; abrirPanel: (p: "enlace" | "imagen") => void }) {
    // El editor no vuelve a pintar la barra en cada cambio: se lee solo lo que la barra necesita.
    const e = useEditorState({
        editor,
        selector: ({ editor: ed }) => ({
            negrita: ed.isActive("bold"),
            cursiva: ed.isActive("italic"),
            subrayado: ed.isActive("underline"),
            tachado: ed.isActive("strike"),
            h2: ed.isActive("heading", { level: 2 }),
            h3: ed.isActive("heading", { level: 3 }),
            lista: ed.isActive("bulletList"),
            numerada: ed.isActive("orderedList"),
            cita: ed.isActive("blockquote"),
            enlace: ed.isActive("link"),
            tabla: ed.isActive("table"),
            deshacer: ed.can().undo(),
            rehacer: ed.can().redo(),
        }),
    })
    const c = () => editor.chain().focus()

    return (
        <div className="border-b border-border">
            <div className="flex flex-wrap items-center gap-0.5 p-1.5">
                <Boton titulo="Negrita (Ctrl+B)" activo={e.negrita} onClick={() => c().toggleBold().run()}>
                    <Bold className="h-4 w-4" />
                </Boton>
                <Boton titulo="Cursiva (Ctrl+I)" activo={e.cursiva} onClick={() => c().toggleItalic().run()}>
                    <Italic className="h-4 w-4" />
                </Boton>
                <Boton titulo="Subrayado (Ctrl+U)" activo={e.subrayado} onClick={() => c().toggleUnderline().run()}>
                    <IconoSubrayado className="h-4 w-4" />
                </Boton>
                <Boton titulo="Tachado" activo={e.tachado} onClick={() => c().toggleStrike().run()}>
                    <Strikethrough className="h-4 w-4" />
                </Boton>
                <Separador />
                <Boton titulo="Subtítulo (H2)" activo={e.h2} onClick={() => c().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="h-4 w-4" />
                </Boton>
                <Boton titulo="Subtítulo menor (H3)" activo={e.h3} onClick={() => c().toggleHeading({ level: 3 }).run()}>
                    <Heading3 className="h-4 w-4" />
                </Boton>
                <Separador />
                <Boton titulo="Lista con viñetas" activo={e.lista} onClick={() => c().toggleBulletList().run()}>
                    <List className="h-4 w-4" />
                </Boton>
                <Boton titulo="Lista numerada" activo={e.numerada} onClick={() => c().toggleOrderedList().run()}>
                    <ListOrdered className="h-4 w-4" />
                </Boton>
                <Boton titulo="Cita" activo={e.cita} onClick={() => c().toggleBlockquote().run()}>
                    <Quote className="h-4 w-4" />
                </Boton>
                <Boton titulo="Línea divisoria" onClick={() => c().setHorizontalRule().run()}>
                    <Minus className="h-4 w-4" />
                </Boton>
                <Separador />
                <Boton titulo="Enlace" activo={e.enlace} onClick={() => abrirPanel("enlace")}>
                    <Link2 className="h-4 w-4" />
                </Boton>
                <Boton titulo="Insertar imagen" onClick={() => abrirPanel("imagen")}>
                    <ImagePlus className="h-4 w-4" />
                </Boton>
                <Boton titulo="Insertar tabla" onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                    <Table2 className="h-4 w-4" />
                </Boton>
                <Separador />
                <Boton titulo="Quitar formato" onClick={() => c().unsetAllMarks().clearNodes().run()}>
                    <Eraser className="h-4 w-4" />
                </Boton>
                <Boton titulo="Deshacer (Ctrl+Z)" deshabilitado={!e.deshacer} onClick={() => c().undo().run()}>
                    <Undo2 className="h-4 w-4" />
                </Boton>
                <Boton titulo="Rehacer (Ctrl+Y)" deshabilitado={!e.rehacer} onClick={() => c().redo().run()}>
                    <Redo2 className="h-4 w-4" />
                </Boton>
            </div>

            {e.tabla && (
                <div className="flex flex-wrap items-center gap-1 border-t border-border bg-neutral-50 px-2 py-1.5 text-xs">
                    <span className="mr-1 text-muted-foreground">Tabla:</span>
                    {[
                        ["Fila arriba", () => c().addRowBefore().run()],
                        ["Fila abajo", () => c().addRowAfter().run()],
                        ["Columna izquierda", () => c().addColumnBefore().run()],
                        ["Columna derecha", () => c().addColumnAfter().run()],
                        ["Quitar fila", () => c().deleteRow().run()],
                        ["Quitar columna", () => c().deleteColumn().run()],
                        ["Borrar tabla", () => c().deleteTable().run()],
                    ].map(([texto, accion]) => (
                        <button
                            key={texto as string}
                            type="button"
                            onMouseDown={(ev) => ev.preventDefault()}
                            onClick={accion as () => void}
                            className="rounded border border-border bg-white px-2 py-1 text-foreground hover:border-foreground"
                        >
                            {texto as string}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// Editor visual (WYSIWYG) del contenido de un artículo. El HTML viaja en un campo oculto con el nombre dado.
// Si el artículo viene en Markdown (los borradores iniciales), se convierte a HTML al abrirlo; al guardar ya queda en HTML.
export function EditorHtml({
    nombre,
    valor,
    formato,
    galeria,
    controlRef,
}: {
    nombre: string
    valor: string
    formato: "markdown" | "html"
    galeria: ImagenGaleria[]
    controlRef?: React.Ref<ControlEditor>
}) {
    const [inicial] = useState(() => (formato === "markdown" ? (marked.parse(valor, { async: false, gfm: true }) as string) : valor))
    const [html, setHtml] = useState(inicial)
    const [panel, setPanel] = useState<"enlace" | "imagen" | null>(null)
    const [url, setUrl] = useState("")
    const [alt, setAlt] = useState("")
    const [subiendo, setSubiendo] = useState(false)
    const [errorImagen, setErrorImagen] = useState<string | null>(null)

    const editor = useEditor({
        immediatelyRender: false, // evita diferencias entre servidor y navegador (Next.js)
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } },
            }),
            Image.configure({ allowBase64: false }),
            TableKit.configure({ table: { resizable: false } }),
            Placeholder.configure({ placeholder: "Escribe tu artículo aquí. Usa la barra para subtítulos, listas, enlaces, imágenes y tablas…" }),
        ],
        content: inicial,
        onUpdate: ({ editor: ed }) => setHtml(ed.getHTML()),
        editorProps: {
            attributes: { class: "contenido-blog min-h-[460px] px-6 py-5 focus:outline-none" },
            // Pegar o arrastrar imágenes al texto: se suben y se insertan donde estás.
            handlePaste: (view, ev) => {
                const archivos = Array.from(ev.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"))
                if (archivos.length === 0) return false
                ev.preventDefault()
                void (async () => {
                    for (const f of archivos) {
                        const r = await subirImagen(f)
                        if ("error" in r) return setErrorImagen(r.error)
                        setErrorImagen(null)
                        view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src: r.url, alt: "" })))
                    }
                })()
                return true
            },
            handleDrop: (view, ev) => {
                const archivos = Array.from(ev.dataTransfer?.files ?? []).filter((f) => f.type.startsWith("image/"))
                if (archivos.length === 0) return false
                ev.preventDefault()
                const pos = view.posAtCoords({ left: ev.clientX, top: ev.clientY })?.pos ?? view.state.selection.from
                void (async () => {
                    for (const f of archivos) {
                        const r = await subirImagen(f)
                        if ("error" in r) return setErrorImagen(r.error)
                        setErrorImagen(null)
                        view.dispatch(view.state.tr.insert(pos, view.state.schema.nodes.image.create({ src: r.url, alt: "" })))
                    }
                })()
                return true
            },
        },
    })

    useImperativeHandle(controlRef, () => ({ reemplazar: (h: string) => editor?.commands.setContent(h, { emitUpdate: true }) }), [editor])

    const abrirPanel = (p: "enlace" | "imagen") => {
        if (!editor) return
        if (panel === p) return setPanel(null)
        if (p === "enlace") setUrl((editor.getAttributes("link").href as string | undefined) ?? "")
        if (p === "imagen") setAlt("")
        setErrorImagen(null)
        setPanel(p)
    }

    const aplicarEnlace = () => {
        if (!editor) return
        const href = url.trim()
        const cadena = editor.chain().focus().extendMarkRange("link")
        if (!href) cadena.unsetLink().run()
        else cadena.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : `https://${href}` }).run()
        setPanel(null)
    }

    const insertarImagen = (src: string, texto: string) => {
        editor?.chain().focus().setImage({ src, alt: texto }).run()
        setPanel(null)
    }

    const subirDesdeArchivo = async (archivo: File | undefined) => {
        if (!archivo) return
        setSubiendo(true)
        setErrorImagen(null)
        const r = await subirImagen(archivo)
        setSubiendo(false)
        if ("error" in r) return setErrorImagen(r.error)
        insertarImagen(r.url, alt.trim())
    }

    const palabras = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length

    return (
        <div className="rounded-xl border border-border bg-white">
            <input type="hidden" name={nombre} value={html} />
            {editor ? (
                <div className="sticky top-12 z-10 rounded-t-xl bg-white lg:top-0">
                    <Barra editor={editor} abrirPanel={abrirPanel} />

                    {panel === "enlace" && (
                        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-neutral-50 p-3">
                            <input
                                autoFocus
                                className={`${campo} flex-1 min-w-56`}
                                placeholder="https://… o /precios (déjalo vacío para quitar el enlace)"
                                value={url}
                                onChange={(ev) => setUrl(ev.target.value)}
                                onKeyDown={(ev) => {
                                    if (ev.key === "Enter") {
                                        ev.preventDefault()
                                        aplicarEnlace()
                                    }
                                }}
                            />
                            <button type="button" onClick={aplicarEnlace} className="bg-foreground px-4 py-2 text-sm font-medium text-background">
                                Aplicar
                            </button>
                            <button type="button" onClick={() => setPanel(null)} className="text-sm text-muted-foreground hover:text-foreground">
                                Cancelar
                            </button>
                        </div>
                    )}

                    {panel === "imagen" && (
                        <div className="space-y-3 border-b border-border bg-neutral-50 p-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <input
                                    className={`${campo} flex-1 min-w-56`}
                                    placeholder="Texto alternativo (describe la imagen; ayuda al SEO y a la accesibilidad)"
                                    value={alt}
                                    onChange={(ev) => setAlt(ev.target.value)}
                                />
                                <label className="inline-flex cursor-pointer items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-background">
                                    {subiendo ? "Subiendo…" : "Subir imagen"}
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                                        className="sr-only"
                                        disabled={subiendo}
                                        onChange={(ev) => {
                                            void subirDesdeArchivo(ev.target.files?.[0])
                                            ev.target.value = ""
                                        }}
                                    />
                                </label>
                                <button type="button" onClick={() => setPanel(null)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Cerrar
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                También puedes pegar (Ctrl+V) o arrastrar imágenes directo al texto. Se guardan en WebP, con el lado largo a 1200 px.
                            </p>
                            {galeria.length > 0 && (
                                <div>
                                    <p className="mb-2 text-xs font-medium text-foreground">O elige una de la galería de este artículo:</p>
                                    <ul className="flex flex-wrap gap-2">
                                        {galeria.map((g) => (
                                            <li key={g.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => insertarImagen(g.archivo, alt.trim() || g.descripcion || "")}
                                                    title={g.descripcion ?? "Insertar en el texto"}
                                                    className="overflow-hidden rounded-lg border border-border hover:border-foreground"
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={g.archivo} alt={g.descripcion ?? ""} className="h-16 w-16 object-cover" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    {errorImagen && (
                        <p className="border-b border-border bg-red-50 px-3 py-2 text-sm text-destructive" role="alert">
                            {errorImagen}
                        </p>
                    )}
                </div>
            ) : (
                <div className="h-11 border-b border-border" />
            )}

            <EditorContent editor={editor} />

            <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                {palabras} palabras · ≈ {Math.max(1, Math.round(palabras / 200))} min de lectura
            </p>
        </div>
    )
}
