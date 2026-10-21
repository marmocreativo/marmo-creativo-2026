"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Code, Copy, Download, Eye, Link as LinkIcon, Palette, Phone, Save, Sparkles } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import {
    FORMAS_BOTON,
    TAMANOS_BOTON,
    type DatosWhatsapp,
} from "@/lib/herramientas/esquemas"
import { AvisoHistorial } from "./aviso-historial"
import { useGuardarHistorial } from "./use-historial"
import { bloqueCodigo, btnSecundario, campo, etiqueta, opcion, panel, tituloPanel } from "./ui"

type Formato = DatosWhatsapp["formato"]

const FORMATOS: { id: Formato; nombre: string; icono: typeof Code }[] = [
    { id: "html", nombre: "HTML", icono: Code },
    { id: "bootstrap", nombre: "Bootstrap", icono: Palette },
    { id: "tailwind", nombre: "Tailwind", icono: Sparkles },
    { id: "link", nombre: "Solo URL", icono: LinkIcon },
]

const FORMA_NOMBRE: Record<string, string> = { "4px": "Cuadrado", "8px": "Redondeado", "25px": "Píldora", "50px": "Circular" }
const TAMANO_NOMBRE: Record<string, string> = { "14px": "Pequeño", "16px": "Normal", "18px": "Grande", "20px": "Muy grande" }

const ICONO_PATH =
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486"

// Para que el texto del botón no rompa el HTML que se copia.
const escaparHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function WhatsappGenerator({ sesion, inicial }: { sesion: boolean; inicial?: DatosWhatsapp }) {
    const [telefono, setTelefono] = useState(inicial?.telefono ?? "+52 123 456 7890")
    const [mensaje, setMensaje] = useState(inicial?.mensaje ?? "¡Hola! Me interesa conocer más sobre sus servicios.")
    const [textoBoton, setTextoBoton] = useState(inicial?.textoBoton ?? "Contactar por WhatsApp")
    const [formato, setFormato] = useState<Formato>(inicial?.formato ?? "html")
    const [estilo, setEstilo] = useState(
        inicial?.estilo ?? { backgroundColor: "#25D366", textColor: "#ffffff", borderRadius: "25px", fontSize: "16px" },
    )
    const [copiado, setCopiado] = useState(false)
    const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { guardar, mensaje: estadoGuardado, pendiente } = useGuardarHistorial("whatsapp", sesion)

    useEffect(() => () => void (temporizador.current && clearTimeout(temporizador.current)), [])

    const numero = telefono.replace(/[^\d+]/g, "")
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    const texto = escaparHtml(textoBoton)

    const codigos: Record<Formato, string> = {
        html: `<a href="${url}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background-color: ${estilo.backgroundColor}; color: ${estilo.textColor}; padding: 12px 24px; border-radius: ${estilo.borderRadius}; text-decoration: none; font-size: ${estilo.fontSize}; font-weight: bold; font-family: Arial, sans-serif; transition: all 0.3s ease; border: none; cursor: pointer;" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="${ICONO_PATH}"/>
  </svg>
  ${texto}
</a>`,
        bootstrap: `<a href="${url}" target="_blank" class="btn btn-success d-inline-flex align-items-center gap-2 text-decoration-none">
  <i class="fab fa-whatsapp"></i>
  ${texto}
</a>`,
        tailwind: `<a href="${url}" target="_blank" class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 no-underline">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="${ICONO_PATH}"/>
  </svg>
  ${texto}
</a>`,
        link: url,
    }
    const codigo = codigos[formato]

    const datos = (): DatosWhatsapp | null =>
        numero.replace(/\D/g, "") ? { telefono, mensaje, textoBoton, formato, estilo } : null

    const guardarActual = () => {
        const d = datos()
        if (d) guardar(d)
    }

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(codigo)
            setCopiado(true)
            if (temporizador.current) clearTimeout(temporizador.current)
            temporizador.current = setTimeout(() => setCopiado(false), 2000)
            guardarActual()
        } catch {
            alert("Error al copiar el código")
        }
    }

    const descargar = () => {
        const blob = new Blob([codigo], { type: "text/html" })
        const href = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = href
        a.download = `boton-whatsapp-${formato}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(href)
        guardarActual()
    }

    const esHtml = formato === "html"

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Configuración */}
            <div className={panel}>
                <h2 className={tituloPanel}>
                    <Phone className="h-5 w-5" /> Configurar tu botón
                </h2>

                <div className="space-y-6">
                    <label className="block text-sm text-muted-foreground">
                        Número de WhatsApp
                        <input className={`${campo} mt-1`} value={telefono} maxLength={30} placeholder="+52 123 456 7890" onChange={(e) => setTelefono(e.target.value)} />
                        <span className="mt-1 block text-xs">Incluye código de país (ej: +52 para México)</span>
                    </label>

                    <label className="block text-sm text-muted-foreground">
                        Mensaje predefinido (opcional)
                        <textarea className={`${campo} mt-1 resize-none`} rows={3} maxLength={500} value={mensaje} placeholder="¡Hola! Me interesa conocer más sobre sus servicios." onChange={(e) => setMensaje(e.target.value)} />
                        <span className="mt-1 block text-xs">Este mensaje aparecerá al abrir WhatsApp</span>
                    </label>

                    <label className="block text-sm text-muted-foreground">
                        Texto del botón
                        <input className={`${campo} mt-1`} value={textoBoton} maxLength={60} placeholder="Contactar por WhatsApp" onChange={(e) => setTextoBoton(e.target.value)} />
                    </label>

                    {esHtml && (
                        <div className="space-y-4 border border-border bg-neutral-100 p-4">
                            <h3 className="text-sm font-medium text-foreground">Personalización</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="block text-sm text-muted-foreground">
                                    Color de fondo
                                    <input type="color" value={estilo.backgroundColor} onChange={(e) => setEstilo((s) => ({ ...s, backgroundColor: e.target.value }))} className="mt-1 h-10 w-full cursor-pointer border border-border bg-white" />
                                </label>
                                <label className="block text-sm text-muted-foreground">
                                    Color del texto
                                    <input type="color" value={estilo.textColor} onChange={(e) => setEstilo((s) => ({ ...s, textColor: e.target.value }))} className="mt-1 h-10 w-full cursor-pointer border border-border bg-white" />
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="block text-sm text-muted-foreground">
                                    Forma del botón
                                    <select className={`${campo} mt-1`} value={estilo.borderRadius} onChange={(e) => setEstilo((s) => ({ ...s, borderRadius: e.target.value }))}>
                                        {FORMAS_BOTON.map((f) => (
                                            <option key={f} value={f}>{FORMA_NOMBRE[f]}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block text-sm text-muted-foreground">
                                    Tamaño
                                    <select className={`${campo} mt-1`} value={estilo.fontSize} onChange={(e) => setEstilo((s) => ({ ...s, fontSize: e.target.value }))}>
                                        {TAMANOS_BOTON.map((t) => (
                                            <option key={t} value={t}>{TAMANO_NOMBRE[t]}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    )}

                    <div>
                        <span className={etiqueta}>Formato de código</span>
                        <div className="grid grid-cols-2 gap-2">
                            {FORMATOS.map((f) => (
                                <button key={f.id} type="button" onClick={() => setFormato(f.id)} className={opcion(formato === f.id)}>
                                    <f.icono className="h-4 w-4 shrink-0" /> <span className="truncate">{f.nombre}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vista previa y código */}
            <div className={`${panel} space-y-6`}>
                <h2 className={`${tituloPanel} !mb-0`}>
                    <Eye className="h-5 w-5" /> Tu botón WhatsApp
                </h2>

                <div className="bg-neutral-100 p-6 text-center">
                    <h3 className="mb-4 text-sm text-muted-foreground">Vista previa:</h3>
                    <div className="flex justify-center">
                        {formato === "link" ? (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-primary underline">
                                {textoBoton}
                            </a>
                        ) : (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-full items-center gap-2 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
                                style={{
                                    backgroundColor: esHtml ? estilo.backgroundColor : "#25D366",
                                    color: esHtml ? estilo.textColor : "#ffffff",
                                    borderRadius: esHtml ? estilo.borderRadius : "25px",
                                    fontSize: esHtml ? estilo.fontSize : "16px",
                                }}
                            >
                                <SiWhatsapp className="h-5 w-5 shrink-0" />
                                <span className="max-w-[200px] truncate md:max-w-none">{textoBoton}</span>
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <h3 className="text-sm text-muted-foreground">Código {formato === "link" ? "URL" : formato.toUpperCase()}:</h3>
                        <div className="flex gap-2">
                            <button type="button" onClick={copiar} className={btnSecundario}>
                                {copiado ? <><Check className="h-3.5 w-3.5" /> Copiado</> : <><Copy className="h-3.5 w-3.5" /> Copiar</>}
                            </button>
                            {formato !== "link" && (
                                <button type="button" onClick={descargar} className={btnSecundario}>
                                    <Download className="h-3.5 w-3.5" /> Descargar
                                </button>
                            )}
                        </div>
                    </div>
                    <pre className={`${bloqueCodigo} max-h-64`}>
                        <code className="whitespace-pre-wrap break-all md:break-normal">{codigo}</code>
                    </pre>
                </div>

                <div className="space-y-3">
                    {sesion && (
                        <button type="button" onClick={guardarActual} disabled={!datos() || pendiente} className={`${btnSecundario} w-full`}>
                            <Save className="h-4 w-4" /> Guardar en mi historial
                        </button>
                    )}
                    <AvisoHistorial sesion={sesion} ruta="/herramientas/boton-whatsapp" mensaje={estadoGuardado} />
                </div>

                <div className="bg-neutral-100 p-4">
                    <h4 className="mb-2 text-sm font-medium text-foreground">Información:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        {["Funciona en todos los dispositivos", "Abre WhatsApp automáticamente", "Mensaje predefinido incluido"].map((t) => (
                            <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4" /> {t}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
