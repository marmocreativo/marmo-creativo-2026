"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Download, Eye, Menu, Save, Settings, Type } from "lucide-react"
import {
    FUENTES_GOOGLE,
    hexAHsl,
    hslACss,
    hslAHex,
    type DatosPaleta,
    type HSL,
} from "@/lib/herramientas/esquemas"
import { AvisoHistorial } from "./aviso-historial"
import { ColorWheel } from "./color-wheel"
import { useGuardarHistorial } from "./use-historial"
import { bloqueCodigo, btnPrimario, btnSecundario, campo, panel, tituloPanel } from "./ui"

type Paleta = Pick<DatosPaleta, "primary" | "secondary" | "accent">

const INICIAL: Paleta = {
    primary: { h: 217, s: 91, l: 60 },
    secondary: { h: 142, s: 76, l: 36 },
    accent: { h: 38, s: 92, l: 50 },
}

function ControlColor({
    etiqueta,
    color,
    onChange,
    onCopiar,
    copiado,
}: {
    etiqueta: string
    color: HSL
    onChange: (c: HSL) => void
    onCopiar: () => void
    copiado: boolean
}) {
    const [escrito, setEscrito] = useState<string | null>(null) // lo que se está tecleando en HEX
    const hex = escrito ?? hslAHex(color)

    const cambiarHex = (valor: string) => {
        setEscrito(valor)
        if (/^#[0-9A-Fa-f]{6}$/.test(valor)) onChange(hexAHsl(valor))
    }
    const numero = (v: string, max: number) => Math.min(max, Math.max(0, parseInt(v) || 0))

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{etiqueta}</span>
                <button
                    type="button"
                    onClick={onCopiar}
                    aria-label={`Copiar ${etiqueta}`}
                    title="Copiar HEX"
                    className="h-8 w-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: hslACss(color) }}
                />
            </div>

            <div className="flex justify-center">
                <ColorWheel color={color} onChange={(c) => { setEscrito(null); onChange(c) }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <label className="block text-xs text-muted-foreground">
                    HEX
                    <input className={`${campo} mt-1 !py-2`} value={hex} placeholder="#000000" onChange={(e) => cambiarHex(e.target.value)} onBlur={() => setEscrito(null)} />
                </label>
                <div className="text-xs text-muted-foreground">
                    HSL
                    <p className="py-2 text-sm">{color.h}°, {color.s}%, {color.l}%</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {([["H", "h", 360], ["S", "s", 100], ["L", "l", 100]] as const).map(([letra, clave, max]) => (
                    <label key={letra} className="block text-xs text-muted-foreground">
                        {letra}
                        <input
                            type="number"
                            min={0}
                            max={max}
                            value={color[clave]}
                            onChange={(e) => { setEscrito(null); onChange({ ...color, [clave]: numero(e.target.value, max) }) }}
                            className="mt-1 w-full border border-border px-2 py-1 text-xs"
                        />
                    </label>
                ))}
            </div>

            {copiado && <p className="text-center text-xs font-medium text-primary">¡Copiado!</p>}
        </div>
    )
}

export function PaletaGenerator({ sesion, inicial }: { sesion: boolean; inicial?: DatosPaleta }) {
    const [paleta, setPaleta] = useState<Paleta>(inicial ?? INICIAL)
    const [fuente, setFuente] = useState(inicial?.fuente ?? "Inter")
    const [copiado, setCopiado] = useState("")
    const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { guardar, mensaje, pendiente } = useGuardarHistorial("paleta", sesion)

    useEffect(() => () => void (temporizador.current && clearTimeout(temporizador.current)), [])

    // Carga la fuente elegida desde Google Fonts.
    useEffect(() => {
        const link = document.createElement("link")
        link.href = `https://fonts.googleapis.com/css2?family=${fuente.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`
        link.rel = "stylesheet"
        document.head.appendChild(link)
        return () => void link.remove()
    }, [fuente])

    const css = `:root {\n${Object.entries(paleta)
        .map(([nombre, c]) => `  --color-${nombre}: ${hslACss(c)};`)
        .join("\n")}\n  --font-family: '${fuente}', sans-serif;\n}`

    const datos = (): DatosPaleta => ({ ...paleta, fuente })
    const guardarActual = () => guardar(datos())

    const copiarHex = async (nombre: keyof Paleta) => {
        try {
            await navigator.clipboard.writeText(hslAHex(paleta[nombre]))
            setCopiado(nombre)
            if (temporizador.current) clearTimeout(temporizador.current)
            temporizador.current = setTimeout(() => setCopiado(""), 2000)
        } catch {
            // sin permiso de portapapeles: no pasa nada
        }
    }

    const descargarCss = () => {
        const blob = new Blob([css], { type: "text/css" })
        const href = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = href
        a.download = "color-palette.css"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(href)
        guardarActual()
    }

    const cambiar = (nombre: keyof Paleta) => (c: HSL) => setPaleta((p) => ({ ...p, [nombre]: c }))
    const primary = hslACss(paleta.primary)
    const secondary = hslACss(paleta.secondary)
    const accent = hslACss(paleta.accent)

    return (
        <div className="grid gap-6 lg:grid-cols-5">
            {/* Controles */}
            <div className="space-y-6 lg:col-span-2">
                <div className={panel}>
                    <h2 className={tituloPanel}>
                        <Settings className="h-5 w-5" /> Configuración de colores
                    </h2>
                    <div className="space-y-10">
                        <ControlColor etiqueta="Color primario" color={paleta.primary} onChange={cambiar("primary")} onCopiar={() => copiarHex("primary")} copiado={copiado === "primary"} />
                        <ControlColor etiqueta="Color secundario" color={paleta.secondary} onChange={cambiar("secondary")} onCopiar={() => copiarHex("secondary")} copiado={copiado === "secondary"} />
                        <ControlColor etiqueta="Color de acento" color={paleta.accent} onChange={cambiar("accent")} onCopiar={() => copiarHex("accent")} copiado={copiado === "accent"} />
                    </div>
                </div>

                <div className={panel}>
                    <h2 className={tituloPanel}>
                        <Type className="h-5 w-5" /> Tipografía
                    </h2>
                    <select className={campo} value={fuente} onChange={(e) => setFuente(e.target.value)} style={{ fontFamily: fuente }}>
                        {FUENTES_GOOGLE.map((f) => (
                            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                        ))}
                    </select>
                </div>

                <div className={panel}>
                    <h2 className={tituloPanel}>
                        <Copy className="h-5 w-5" /> Variables CSS
                    </h2>
                    <pre className={bloqueCodigo}><code>{css}</code></pre>
                    <div className="mt-4 space-y-3">
                        <button type="button" onClick={descargarCss} className={`${btnPrimario} w-full`}>
                            <Download className="h-4 w-4" /> Descargar CSS
                        </button>
                        {sesion && (
                            <button type="button" onClick={guardarActual} disabled={pendiente} className={`${btnSecundario} w-full`}>
                                <Save className="h-4 w-4" /> Guardar en mi historial
                            </button>
                        )}
                        <AvisoHistorial sesion={sesion} ruta="/herramientas/paleta-colores" mensaje={mensaje} />
                    </div>
                </div>
            </div>

            {/* Vista previa */}
            <div className="lg:col-span-3">
                <div className={`${panel} !p-0 overflow-hidden`}>
                    <h2 className={`${tituloPanel} !mb-0 p-6 md:p-7`}>
                        <Eye className="h-5 w-5" /> Vista previa del diseño
                    </h2>
                    <div className="min-h-[600px] overflow-y-auto bg-white text-gray-800 lg:min-h-[800px]" style={{ fontFamily: fuente }}>
                        <nav className="p-4 shadow-sm lg:p-6" style={{ backgroundColor: primary }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-white/20" />
                                    <h3 className="text-lg font-bold text-white lg:text-xl">Mi Sitio Web</h3>
                                </div>
                                <div className="hidden items-center gap-4 md:flex">
                                    <span className="text-white">Inicio</span>
                                    <span className="text-white">Servicios</span>
                                    <span className="text-white">Contacto</span>
                                    <span className="rounded-lg px-4 py-2 font-medium text-white" style={{ backgroundColor: accent }}>Comenzar</span>
                                </div>
                                <Menu className="h-6 w-6 text-white md:hidden" />
                            </div>
                        </nav>

                        <section className="bg-gray-50 p-6 text-center lg:p-12">
                            <div className="mx-auto max-w-4xl">
                                <h3 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">Bienvenido a Nuestro Servicio</h3>
                                <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 lg:text-lg">
                                    Descubre cómo podemos ayudarte a alcanzar tus objetivos con nuestras soluciones innovadoras y personalizadas.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <span className="rounded-lg px-6 py-3 font-medium text-white lg:px-8" style={{ backgroundColor: accent }}>Empezar Ahora</span>
                                    <span className="rounded-lg border-2 px-6 py-3 font-medium lg:px-8" style={{ borderColor: accent, color: accent }}>Saber Más</span>
                                </div>
                            </div>
                        </section>

                        <section className="p-6 lg:p-12">
                            <div className="mx-auto max-w-6xl">
                                <h3 className="mb-8 text-center text-2xl font-bold lg:mb-12 lg:text-3xl">Nuestros Servicios</h3>
                                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                                    {[
                                        ["Soluciones Innovadoras", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."],
                                        ["Experiencia Comprobada", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."],
                                    ].map(([titulo, texto]) => (
                                        <div key={titulo} className="space-y-6">
                                            <div className="flex h-48 items-center justify-center rounded-lg bg-gray-200 lg:h-64">
                                                <span className="text-lg text-gray-500">Imagen Placeholder</span>
                                            </div>
                                            <h4 className="text-xl font-bold lg:text-2xl">{titulo}</h4>
                                            <p className="leading-relaxed text-gray-600">{texto}</p>
                                            <span className="inline-block font-medium" style={{ color: accent }}>Leer más →</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center lg:mt-16">
                                    <h4 className="mb-6 text-xl font-bold lg:text-2xl">¿Listo para comenzar?</h4>
                                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                                        Contáctanos hoy mismo y descubre cómo podemos transformar tu negocio con nuestras soluciones personalizadas.
                                    </p>
                                    <span className="inline-block rounded-lg px-8 py-3 font-medium text-white" style={{ backgroundColor: accent }}>Contáctanos</span>
                                </div>
                            </div>
                        </section>

                        <footer className="p-6 text-white lg:p-8" style={{ backgroundColor: secondary }}>
                            <div className="mx-auto max-w-6xl">
                                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                                    <div>
                                        <h4 className="mb-4 font-bold">Mi Sitio Web</h4>
                                        <p className="text-white/80">Soluciones innovadoras para tu negocio.</p>
                                    </div>
                                    <div>
                                        <h4 className="mb-4 font-bold">Enlaces</h4>
                                        <ul className="space-y-2 text-white/80"><li>Inicio</li><li>Servicios</li><li>Contacto</li></ul>
                                    </div>
                                    <div>
                                        <h4 className="mb-4 font-bold">Contacto</h4>
                                        <p className="text-white/80">Email: hola@sitio.com<br />Teléfono: +1 234 567 8900</p>
                                    </div>
                                </div>
                                <div className="border-t border-white/20 pt-6 text-center text-white/80">
                                    <p>&copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            {copiado && (
                <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background shadow-lg" role="status">
                    <Check className="h-4 w-4" /> Color copiado al portapapeles
                </div>
            )}
        </div>
    )
}
