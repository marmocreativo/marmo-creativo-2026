"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import type { Estado } from "@/lib/actions/auth"
import type { Archivo } from "@/lib/sitios/repo"
import { SelectorImagen } from "@/components/forms/selector-imagen"
import { BotonEliminar } from "@/components/admin/boton-eliminar"
import { botonClass, inputClass } from "@/components/auth/auth-shell"

type Accion = (prev: Estado, fd: FormData) => Promise<Estado>

export function SubirImagenes({ accion, etiqueta = "Subir imágenes", multiple = true }: { accion: Accion; etiqueta?: string; multiple?: boolean }) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (estado?.ok) formRef.current?.reset() // limpia el selector cuando la subida termina bien
    }, [estado])

    return (
        <form ref={formRef} action={enviar} className="flex flex-wrap items-center gap-4">
            <SelectorImagen name="imagenes" multiple={multiple} required />
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Subiendo…" : etiqueta}
            </button>
            {estado?.error && <p className="w-full text-sm text-destructive" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="w-full text-sm text-primary" role="status">{estado.ok}</p>}
        </form>
    )
}

export function SubirDocumentos({ accion }: { accion: Accion }) {
    const [estado, enviar, pendiente] = useActionState(accion, undefined)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (estado?.ok) formRef.current?.reset()
    }, [estado])

    return (
        <form ref={formRef} action={enviar} className="flex flex-wrap items-center gap-4">
            <input type="file" name="documentos" multiple required accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={`${inputClass} max-w-sm`} />
            <button type="submit" disabled={pendiente} className={`${botonClass} sm:w-auto`}>
                {pendiente ? "Subiendo…" : "Subir documentos"}
            </button>
            {estado?.error && <p className="w-full text-sm text-destructive" role="alert">{estado.error}</p>}
            {estado?.ok && <p className="w-full text-sm text-primary" role="status">{estado.ok}</p>}
        </form>
    )
}

export function ListaDocumentos({ documentos, eliminar }: { documentos: Archivo[]; eliminar: (id: number) => Promise<void> }) {
    if (documentos.length === 0) return <p className="text-sm text-muted-foreground">Aún no hay documentos.</p>
    return (
        <ul className="divide-y divide-border rounded-xl border border-border">
            {documentos.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                    <span className="min-w-0 truncate">
                        {d.nombre ?? "Documento"}
                        <span className="ml-2 text-xs text-muted-foreground">{d.texto ? `${d.texto.length.toLocaleString("es-MX")} caracteres leídos` : "PDF"}</span>
                    </span>
                    <BotonEliminar accion={eliminar.bind(null, d.id)} etiqueta="este documento" />
                </li>
            ))}
        </ul>
    )
}

// Cuadrícula de imágenes. Con `copiar`, cada una muestra su ruta para pegarla en el código (src="...").
export function GaleriaImagenes({ imagenes, eliminar, copiar = false }: { imagenes: Archivo[]; eliminar: (id: number) => Promise<void>; copiar?: boolean }) {
    const [copiada, setCopiada] = useState<number | null>(null)

    async function copiarRuta(a: Archivo) {
        try {
            await navigator.clipboard.writeText(a.archivo)
            setCopiada(a.id)
            setTimeout(() => setCopiada((c) => (c === a.id ? null : c)), 1500)
        } catch {
            // sin permiso de portapapeles: la ruta sigue visible en pantalla
        }
    }

    if (imagenes.length === 0) return <p className="text-sm text-muted-foreground">Aún no hay imágenes.</p>
    return (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {imagenes.map((img) => (
                <li key={img.id} className="rounded-xl border border-border p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.archivo} alt="" width={img.ancho ?? undefined} height={img.alto ?? undefined} loading="lazy" className="aspect-square w-full rounded-lg bg-neutral-100 object-contain" />
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span>{img.ancho} × {img.alto}</span>
                        <BotonEliminar accion={eliminar.bind(null, img.id)} etiqueta="esta imagen" />
                    </div>
                    {copiar && (
                        <button type="button" onClick={() => copiarRuta(img)} className="mt-2 flex w-full items-center gap-1.5 truncate text-left font-mono text-[11px] text-muted-foreground hover:text-foreground" title={img.archivo}>
                            {copiada === img.id ? <Check className="h-3 w-3 shrink-0" /> : <Copy className="h-3 w-3 shrink-0" />}
                            <span className="truncate">{copiada === img.id ? "Ruta copiada" : img.archivo.replace("/archivos/sitios/", "…/")}</span>
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )
}
