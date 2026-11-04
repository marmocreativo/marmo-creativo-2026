"use client"

import { useState } from "react"
import { Check, Link2 } from "lucide-react"
import { SiFacebook, SiWhatsapp, SiX } from "@icons-pack/react-simple-icons"

const boton =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"

// Enlaces para compartir el artículo y copiar su dirección.
export function Compartir({ url, titulo }: { url: string; titulo: string }) {
    const [copiado, setCopiado] = useState(false)
    const u = encodeURIComponent(url)
    const t = encodeURIComponent(titulo)

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopiado(true)
            setTimeout(() => setCopiado(false), 2000)
        } catch {
            // el navegador no dejó copiar: no pasa nada
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <a className={boton} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp" title="WhatsApp">
                <SiWhatsapp className="h-4 w-4" />
            </a>
            <a className={boton} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook" title="Facebook">
                <SiFacebook className="h-4 w-4" />
            </a>
            <a className={boton} href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X" title="X">
                <SiX className="h-4 w-4" />
            </a>
            <button type="button" className={boton} onClick={copiar} aria-label="Copiar enlace" title={copiado ? "¡Copiado!" : "Copiar enlace"}>
                {copiado ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            </button>
        </div>
    )
}
