"use client"

import { useActionState, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FolderPlus, FolderUp, ImagePlus } from "lucide-react"
import { crearCarpetaMultimedia, subirMultimedia, type ReporteSubida } from "@/lib/actions/configuracion"

const EXTENSIONES = /\.(webp|jpe?g|png|gif|avif)$/i
const MAX_ARCHIVO = 25 * 1024 * 1024
const MAX_LOTE_BYTES = 18 * 1024 * 1024 // el límite de cada petición es 30 MB
const MAX_LOTE_ARCHIVOS = 40

type Elemento = { archivo: File; ruta: string }

const boton =
    "inline-flex items-center gap-2 border border-border bg-white px-4 py-2.5 text-sm text-foreground hover:border-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"

export function BarraMultimedia({ ruta }: { ruta: string }) {
    const router = useRouter()
    const [estadoCarpeta, crearCarpeta, creando] = useActionState(crearCarpetaMultimedia.bind(null, ruta), undefined)
    const [reemplazar, setReemplazar] = useState(false)
    const [quitarRaiz, setQuitarRaiz] = useState(true)
    const [subiendo, setSubiendo] = useState(false)
    const [progreso, setProgreso] = useState({ hechos: 0, total: 0 })
    const [reporte, setReporte] = useState<(ReporteSubida & { ignorados: number }) | null>(null)
    const archivosRef = useRef<HTMLInputElement>(null)
    const carpetaRef = useRef<HTMLInputElement>(null)

    const reunir = (lista: FileList | null): { elementos: Elemento[]; ignorados: number; errores: ReporteSubida["errores"] } => {
        const elementos: Elemento[] = []
        const errores: ReporteSubida["errores"] = []
        let ignorados = 0
        for (const archivo of Array.from(lista ?? [])) {
            const relativa = archivo.webkitRelativePath || archivo.name
            // Al subir una carpeta, su propio nombre se quita para que su contenido caiga en la carpeta actual.
            const rutaFinal = archivo.webkitRelativePath && quitarRaiz ? relativa.split("/").slice(1).join("/") : relativa
            const nombre = rutaFinal.split("/").pop() ?? ""
            if (!EXTENSIONES.test(nombre) || nombre.startsWith(".")) ignorados++
            else if (archivo.size > MAX_ARCHIVO) errores.push({ ruta: rutaFinal, motivo: "Pesa más de 25 MB" })
            else elementos.push({ archivo, ruta: rutaFinal })
        }
        return { elementos, ignorados, errores }
    }

    const subir = async (lista: FileList | null) => {
        const { elementos, ignorados, errores } = reunir(lista)
        if (elementos.length === 0 && errores.length === 0 && ignorados === 0) return

        // Lotes: cada petición lleva pocos MB para no toparse con límites del servidor.
        const lotes: Elemento[][] = []
        let actual: Elemento[] = []
        let bytes = 0
        for (const e of elementos) {
            if (actual.length && (bytes + e.archivo.size > MAX_LOTE_BYTES || actual.length >= MAX_LOTE_ARCHIVOS)) {
                lotes.push(actual)
                actual = []
                bytes = 0
            }
            actual.push(e)
            bytes += e.archivo.size
        }
        if (actual.length) lotes.push(actual)

        setSubiendo(true)
        setReporte(null)
        setProgreso({ hechos: 0, total: elementos.length })
        const total: ReporteSubida = { subidos: 0, omitidos: 0, errores: [...errores] }
        let hechos = 0

        for (const lote of lotes) {
            const fd = new FormData()
            fd.set("dir", ruta)
            if (reemplazar) fd.set("reemplazar", "on")
            for (const e of lote) {
                fd.append("archivo", e.archivo)
                fd.append("ruta", e.ruta)
            }
            try {
                const r = await subirMultimedia(fd)
                total.subidos += r.subidos
                total.omitidos += r.omitidos
                total.errores.push(...r.errores)
            } catch {
                total.errores.push({ ruta: `(lote de ${lote.length} archivos)`, motivo: "Se perdió la conexión con el servidor" })
            }
            hechos += lote.length
            setProgreso({ hechos, total: elementos.length })
        }

        setReporte({ ...total, ignorados })
        setSubiendo(false)
        if (archivosRef.current) archivosRef.current.value = ""
        if (carpetaRef.current) carpetaRef.current.value = ""
        router.refresh()
    }

    return (
        <div className="space-y-5 border border-border bg-neutral-100 p-5">
            <div className="flex flex-wrap items-start gap-6">
                {/* Nueva carpeta */}
                <form action={crearCarpeta} className="flex flex-wrap items-center gap-2">
                    <input
                        name="nombre"
                        required
                        maxLength={100}
                        placeholder="Nombre de la carpeta"
                        aria-label="Nombre de la carpeta"
                        className="w-52 border border-border bg-white px-3 py-2.5 text-sm focus:border-foreground focus:outline-none"
                    />
                    <button type="submit" disabled={creando} className={boton}>
                        <FolderPlus className="h-4 w-4" /> Nueva carpeta
                    </button>
                    {estadoCarpeta?.error && <span className="w-full text-sm text-destructive" role="alert">{estadoCarpeta.error}</span>}
                    {estadoCarpeta?.ok && <span className="w-full text-sm text-primary" role="status">{estadoCarpeta.ok}</span>}
                </form>

                {/* Subir */}
                <div className="flex flex-wrap items-center gap-2">
                    <input ref={archivosRef} type="file" multiple accept="image/webp,image/jpeg,image/png,image/gif,image/avif" className="hidden" onChange={(e) => subir(e.target.files)} />
                    <input
                        ref={carpetaRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => subir(e.target.files)}
                        {...({ webkitdirectory: "", directory: "" } as Record<string, string>)}
                    />
                    <button type="button" disabled={subiendo} onClick={() => archivosRef.current?.click()} className={boton}>
                        <ImagePlus className="h-4 w-4" /> Subir archivos
                    </button>
                    <button type="button" disabled={subiendo} onClick={() => carpetaRef.current?.click()} className={boton}>
                        <FolderUp className="h-4 w-4" /> Subir carpeta completa
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={quitarRaiz} onChange={(e) => setQuitarRaiz(e.target.checked)} />
                    Al subir una carpeta, no crear una carpeta con su nombre (úsalo con tu <code>uploads</code> local)
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={reemplazar} onChange={(e) => setReemplazar(e.target.checked)} />
                    Reemplazar los archivos que ya existan (si no, se omiten)
                </label>
            </div>

            <p className="text-xs text-muted-foreground">
                Se suben tal cual, sin modificarlos. Solo WebP, JPG, PNG, GIF y AVIF (hasta 25 MB cada uno); lo demás se ignora.
            </p>

            {subiendo && (
                <div role="status" aria-live="polite">
                    <p className="mb-2 text-sm text-foreground">Subiendo… {progreso.hechos} de {progreso.total}</p>
                    <div className="h-1.5 w-full bg-border">
                        <div className="h-full bg-foreground transition-all" style={{ width: `${progreso.total ? (progreso.hechos / progreso.total) * 100 : 0}%` }} />
                    </div>
                </div>
            )}

            {reporte && !subiendo && (
                <div className="text-sm" role="status">
                    <p className="text-foreground">
                        {reporte.subidos} subidos · {reporte.omitidos} omitidos (ya existían) · {reporte.errores.length} con error
                        {reporte.ignorados ? ` · ${reporte.ignorados} ignorados (no son imágenes)` : ""}
                    </p>
                    {reporte.errores.length > 0 && (
                        <ul className="mt-2 max-h-48 overflow-auto font-mono text-xs text-destructive">
                            {reporte.errores.slice(0, 50).map((e, i) => (
                                <li key={i}>{e.ruta}: {e.motivo}</li>
                            ))}
                            {reporte.errores.length > 50 && <li>…y {reporte.errores.length - 50} más</li>}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
