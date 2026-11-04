import { NextResponse } from "next/server"
import { cadena, exigirAdmin, leerJson, peticionInvalida, responderError } from "@/lib/ia/acceso"
import { generarImagen, iaConfigurada, type Aspecto } from "@/lib/ia/gemini"
import { ESTILO_IMAGEN } from "@/lib/ia/nota"
import { borrarArchivo, ErrorImagen, guardarImagen } from "@/lib/uploads"

const RUTA_GENERADA = /^\/archivos\/articulos\/[0-9a-f-]{36}\.webp$/i

// Paso 3: genera UNA imagen con Gemini y la guarda como las demás del blog (WebP, lado largo a 1200 px).
export async function POST(req: Request) {
    const no = await exigirAdmin()
    if (no) return no
    if (!iaConfigurada()) return NextResponse.json({ error: "Falta configurar GEMINI_API_KEY en el servidor." }, { status: 503 })

    const j = await leerJson(req)
    if (!j) return peticionInvalida("Solicitud inválida.")
    const prompt = cadena(j.prompt, 600)
    if (prompt.length < 10) return peticionInvalida("Falta la descripción de la imagen.")
    const aspecto: Aspecto = j.aspecto === "4:3" || j.aspecto === "1:1" ? j.aspecto : "16:9"

    try {
        const bytes = await generarImagen(`${prompt}. ${ESTILO_IMAGEN}`, aspecto)
        const p = await guardarImagen(new File([new Uint8Array(bytes)], "ia.png"), "articulos", { tipo: "maximo", lado: 1200 })
        return NextResponse.json({ url: p.ruta, ancho: p.ancho, alto: p.alto })
    } catch (e) {
        if (e instanceof ErrorImagen) return NextResponse.json({ error: `La imagen generada no se pudo procesar: ${e.message}` }, { status: 502 })
        return responderError(e)
    }
}

// Si descartas el resultado, las imágenes generadas se borran para no dejar archivos huérfanos.
export async function DELETE(req: Request) {
    const no = await exigirAdmin()
    if (no) return no
    const j = await leerJson(req)
    const url = cadena(j?.url, 200)
    if (!RUTA_GENERADA.test(url)) return peticionInvalida("Ruta inválida.")
    await borrarArchivo(url)
    return NextResponse.json({ ok: true })
}
