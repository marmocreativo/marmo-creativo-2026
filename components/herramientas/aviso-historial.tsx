import Link from "next/link"
import { History } from "lucide-react"

// Estado del historial bajo los botones de cada herramienta.
export function AvisoHistorial({
    sesion,
    ruta,
    mensaje,
}: {
    sesion: boolean
    ruta: string
    mensaje: { texto: string; error: boolean } | null
}) {
    if (mensaje) {
        return (
            <p role="status" className={`text-xs ${mensaje.error ? "text-destructive" : "text-primary"}`}>
                {mensaje.texto}
            </p>
        )
    }
    if (!sesion) {
        return (
            <p className="text-xs text-muted-foreground">
              <History className="mr-1 inline h-3.5 w-3.5" />
              <Link href={`/login?callbackUrl=${encodeURIComponent(ruta)}`} className="underline underline-offset-4">
                Inicia sesión
              </Link>{" "}
              para guardar lo que generes en tu historial.
            </p>
        )
    }
    return <p className="text-xs text-muted-foreground">Lo que descargues o copies se guarda en tu historial.</p>
}
