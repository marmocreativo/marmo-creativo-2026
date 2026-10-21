"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import {
    Download,
    Eye,
    Link as LinkIcon,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    QrCode,
    Save,
    Shuffle,
    Upload,
    Wifi,
    type LucideIcon,
} from "lucide-react"
import type { DatosQR, TipoQR } from "@/lib/herramientas/esquemas"
import { AvisoHistorial } from "./aviso-historial"
import { useGuardarHistorial } from "./use-historial"
import { btnPrimario, btnSecundario, campo, etiqueta, opcion, panel, tituloPanel } from "./ui"


const TAMANO = 400 // px del PNG descargado

const TIPOS: { id: TipoQR; nombre: string; icono: LucideIcon; ejemplo: string }[] = [
    { id: "url", nombre: "Sitio Web", icono: LinkIcon, ejemplo: "https://mi-sitio.com" },
    { id: "text", nombre: "Texto", icono: MessageCircle, ejemplo: "Tu mensaje aquí" },
    { id: "email", nombre: "Email", icono: Mail, ejemplo: "contacto@empresa.com" },
    { id: "phone", nombre: "Teléfono", icono: Phone, ejemplo: "+52 123 456 7890" },
    { id: "wifi", nombre: "WiFi", icono: Wifi, ejemplo: "Red WiFi" },
    { id: "location", nombre: "Ubicación", icono: MapPin, ejemplo: "19.4326,-99.1332" },
]

type Wifi = { ssid: string; password: string; security: "WPA" | "WEP" | "nopass" }

const escaparWifi = (s: string) => s.replace(/([\\;,:"])/g, "\\$1")

// Texto que realmente se codifica en el QR según el tipo.
function codificar(tipo: TipoQR, contenido: string, wifi: Wifi): string {
    switch (tipo) {
        case "email":
            return `mailto:${contenido}`
        case "phone":
            return `tel:${contenido}`
        case "location": {
            if (contenido.includes(",")) {
                const [lat, lng] = contenido.split(",").map((s) => s.trim())
                return `geo:${lat},${lng}`
            }
            return `geo:${contenido}`
        }
        case "wifi":
            return `WIFI:T:${wifi.security};S:${escaparWifi(wifi.ssid)};P:${escaparWifi(wifi.password)};H:false;;`
        case "url":
            return /^https?:\/\//i.test(contenido) ? contenido : `https://${contenido}`
        default:
            return contenido
    }
}

// Cadena aleatoria larga (QR de versión media) para el QR de demostración.
function textoAleatorio() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const largo = Math.floor(Math.random() * 101) + 200
    return Array.from({ length: largo }, () => letras[Math.floor(Math.random() * letras.length)]).join("")
}

const cargarImagen = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })

async function dibujarLogo(canvas: HTMLCanvasElement, src: string, porcentaje: number) {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const logo = await cargarImagen(src)
    const lado = (canvas.width * porcentaje) / 100
    const x = (canvas.width - lado) / 2
    const y = (canvas.height - lado) / 2
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(x - 5, y - 5, lado + 10, lado + 10) // fondo blanco para que el logo no se mezcle
    ctx.drawImage(logo, x, y, lado, lado)
}

export function QrGenerator({ sesion, inicial }: { sesion: boolean; inicial?: DatosQR }) {
    const [tipo, setTipo] = useState<TipoQR>(inicial?.tipo ?? "url")
    const [contenido, setContenido] = useState(inicial ? (inicial.tipo === "wifi" ? "" : inicial.contenido) : "https://ejemplo.com")
    const [wifi, setWifi] = useState<Wifi>({ ssid: inicial?.wifi.ssid ?? "", password: "", security: inicial?.wifi.security ?? "WPA" })
    const [color, setColor] = useState(inicial?.color ?? "#000000")
    const [fondo, setFondo] = useState(inicial?.fondo ?? "#ffffff")
    const [logo, setLogo] = useState<string | undefined>(inicial?.logo)
    const [tamanoLogo, setTamanoLogo] = useState(inicial?.tamanoLogo ?? 20)
    const [demo, setDemo] = useState<string | null>(null) // texto aleatorio del QR de demostración
    const [imagen, setImagen] = useState("")
    const [generando, setGenerando] = useState(false)
    const [error, setError] = useState("")
    const logoRef = useRef<HTMLInputElement>(null)
    const { guardar, mensaje, pendiente } = useGuardarHistorial("qr", sesion)

    const tipoActual = TIPOS.find((t) => t.id === tipo)!
    const textoQr = demo ?? (tipo === "wifi" ? (wifi.ssid.trim() ? codificar(tipo, "", wifi) : "") : contenido.trim() ? codificar(tipo, contenido.trim(), wifi) : "")

    // Regenera el QR medio segundo después del último cambio.
    useEffect(() => {
        let cancelado = false
        const t = setTimeout(async () => {
            if (!textoQr) {
                setImagen("")
                return
            }
            setGenerando(true)
            setError("")
            try {
                const canvas = document.createElement("canvas")
                await QRCode.toCanvas(canvas, textoQr, {
                    width: TAMANO,
                    margin: 2,
                    errorCorrectionLevel: logo ? "H" : "M", // con logo central se necesita más redundancia
                    color: { dark: color, light: fondo },
                })
                if (logo) await dibujarLogo(canvas, logo, tamanoLogo)
                if (!cancelado) setImagen(canvas.toDataURL("image/png"))
            } catch {
                if (!cancelado) {
                    setImagen("")
                    setError("No se pudo generar el QR. Revisa el contenido (puede ser demasiado largo).")
                }
            } finally {
                if (!cancelado) setGenerando(false)
            }
        }, 500)
        return () => {
            cancelado = true
            clearTimeout(t)
        }
    }, [textoQr, color, fondo, logo, tamanoLogo])

    const datosActuales = (): DatosQR | null => {
        if (demo || !textoQr) return null
        return {
            tipo,
            contenido: tipo === "wifi" ? "" : contenido,
            color,
            fondo,
            tamanoLogo,
            wifi: { ssid: wifi.ssid, security: wifi.security }, // la contraseña de la red no se guarda
        }
    }

    const guardarActual = async () => {
        const datos = datosActuales()
        if (!datos) return
        let blob: Blob | null = null
        if (logo) {
            try {
                blob = await (await fetch(logo)).blob()
            } catch {
                blob = null
            }
        }
        guardar(datos, blob)
    }

    const descargar = () => {
        if (!imagen) return
        const a = document.createElement("a")
        a.download = demo ? `placeholder-qr-${Date.now()}.png` : `codigo-qr-${tipo}-${Date.now()}.png`
        a.href = imagen
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        void guardarActual()
    }

    const cambiarTipo = (id: TipoQR) => {
        setTipo(id)
        setDemo(null)
        setContenido(TIPOS.find((t) => t.id === id)!.ejemplo)
        if (id !== "wifi") setWifi({ ssid: "", password: "", security: "WPA" })
    }

    const subirLogo = (archivo?: File) => {
        if (!archivo) return
        const lector = new FileReader()
        lector.onload = (e) => setLogo(e.target?.result as string)
        lector.readAsDataURL(archivo)
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Configuración */}
            <div className={panel}>
                <h2 className={tituloPanel}>
                    <QrCode className="h-5 w-5" /> Configurar tu QR
                </h2>

                <div className="space-y-6">
                    <div className="border border-border bg-neutral-100 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-medium text-foreground">QR de demostración</h3>
                                <p className="text-xs text-muted-foreground">Genera un QR de tamaño medio para pruebas</p>
                            </div>
                            <button type="button" onClick={() => setDemo(textoAleatorio())} className={btnSecundario}>
                                <Shuffle className="h-4 w-4" /> Placeholder QR
                            </button>
                        </div>
                        {demo && (
                            <p className="mt-3 text-xs text-muted-foreground">QR placeholder generado: contenido aleatorio para demostración.</p>
                        )}
                    </div>

                    <div>
                        <span className={etiqueta}>¿Qué quieres compartir?</span>
                        <div className="grid grid-cols-2 gap-2">
                            {TIPOS.map((t) => (
                                <button key={t.id} type="button" onClick={() => cambiarTipo(t.id)} className={opcion(tipo === t.id && !demo)}>
                                    <t.icono className="h-4 w-4" /> {t.nombre}
                                </button>
                            ))}
                        </div>
                    </div>

                    {tipo === "wifi" && !demo && (
                        <div className="space-y-3 border border-border bg-neutral-100 p-4">
                            <h3 className="text-sm font-medium text-foreground">Configuración de red WiFi</h3>
                            <label className="block text-sm text-muted-foreground">
                                Nombre de la red
                                <input className={`${campo} mt-1`} value={wifi.ssid} maxLength={64} placeholder="Mi_WiFi" onChange={(e) => setWifi((w) => ({ ...w, ssid: e.target.value }))} />
                            </label>
                            <label className="block text-sm text-muted-foreground">
                                Contraseña
                                <input className={`${campo} mt-1`} type="password" value={wifi.password} placeholder="contraseña123" autoComplete="off" onChange={(e) => setWifi((w) => ({ ...w, password: e.target.value }))} />
                                <span className="mt-1 block text-xs">Va dentro del QR, pero no se guarda en tu historial.</span>
                            </label>
                            <label className="block text-sm text-muted-foreground">
                                Tipo de seguridad
                                <select className={`${campo} mt-1`} value={wifi.security} onChange={(e) => setWifi((w) => ({ ...w, security: e.target.value as Wifi["security"] }))}>
                                    <option value="WPA">WPA/WPA2</option>
                                    <option value="WEP">WEP</option>
                                    <option value="nopass">Sin contraseña</option>
                                </select>
                            </label>
                        </div>
                    )}

                    {tipo !== "wifi" && !demo && (
                        <label className="block text-sm text-muted-foreground">
                            Contenido
                            <textarea className={`${campo} mt-1 resize-none`} rows={3} maxLength={1000} value={contenido} placeholder={tipoActual.ejemplo} onChange={(e) => setContenido(e.target.value)} />
                            {tipo === "location" && <span className="mt-1 block text-xs">Formato: latitud,longitud (ejemplo: 19.4326,-99.1332)</span>}
                        </label>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm text-muted-foreground">
                            Color QR
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1 h-10 w-full cursor-pointer border border-border bg-white" />
                        </label>
                        <label className="block text-sm text-muted-foreground">
                            Fondo
                            <input type="color" value={fondo} onChange={(e) => setFondo(e.target.value)} className="mt-1 h-10 w-full cursor-pointer border border-border bg-white" />
                        </label>
                    </div>

                    <div className="space-y-3 border border-border p-4">
                        <span className="block text-sm text-muted-foreground">Logo central</span>
                        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => subirLogo(e.target.files?.[0])} />
                        <button type="button" onClick={() => logoRef.current?.click()} className={`${btnSecundario} w-full`}>
                            <Upload className="h-4 w-4" /> {logo ? "Cambiar logo" : "Subir logo"}
                        </button>
                        {logo && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={logo} alt="Logo" className="h-8 w-8 rounded object-cover" /> Logo cargado
                                    </span>
                                    <button type="button" onClick={() => setLogo(undefined)} className="text-xs text-destructive underline underline-offset-4">
                                        Quitar
                                    </button>
                                </div>
                                <label className="block text-xs text-muted-foreground">
                                    Tamaño del logo ({tamanoLogo}%)
                                    <input type="range" min={10} max={30} step={10} value={tamanoLogo} onChange={(e) => setTamanoLogo(Number(e.target.value))} className="mt-1 w-full" />
                                    <span className="flex justify-between"><span>10%</span><span>20%</span><span>30%</span></span>
                                </label>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Vista previa */}
            <div className={panel}>
                <h2 className={tituloPanel}>
                    <Eye className="h-5 w-5" /> Tu código QR
                </h2>

                <div className="bg-neutral-100 p-4 text-center md:p-8">
                    {generando ? (
                        <div className="flex h-48 flex-col items-center justify-center md:h-64">
                            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-foreground" />
                            <p className="text-sm text-muted-foreground">Generando…</p>
                        </div>
                    ) : imagen ? (
                        <div className="mx-auto w-full max-w-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imagen} alt="Código QR generado" className="h-auto w-full shadow-md" />
                        </div>
                    ) : (
                        <div className="flex h-48 items-center justify-center text-muted-foreground/50 md:h-64">
                            <QrCode className="h-16 w-16" />
                        </div>
                    )}

                    {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}

                    <div className="mt-6 space-y-3">
                        <button type="button" onClick={descargar} disabled={!imagen || generando} className={`${btnPrimario} w-full`}>
                            <Download className="h-4 w-4" /> Descargar QR
                        </button>
                        {sesion && (
                            <button type="button" onClick={guardarActual} disabled={!datosActuales() || pendiente} className={`${btnSecundario} w-full`}>
                                <Save className="h-4 w-4" /> Guardar en mi historial
                            </button>
                        )}
                        <AvisoHistorial sesion={sesion} ruta="/herramientas/generador-qr" mensaje={mensaje} />
                        <p className="break-words text-xs text-muted-foreground">
                            {demo
                                ? "QR Placeholder: contenido de demostración"
                                : tipo === "wifi"
                                  ? `WiFi: ${wifi.ssid || "Configura tu red"}`
                                  : `${contenido.substring(0, 50)}${contenido.length > 50 ? "…" : ""}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
