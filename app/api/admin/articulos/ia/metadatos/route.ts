import { NextResponse } from "next/server"
import { cadena, exigirAdmin, leerJson, peticionInvalida, responderError } from "@/lib/ia/acceso"
import { iaConfigurada } from "@/lib/ia/gemini"
import { generarMetadatos } from "@/lib/ia/nota"

// Paso 2: metadatos SEO (título, descripción, slug, categoría…) e ideas de las imágenes, a partir de la nota ya escrita.
export async function POST(req: Request) {
    const no = await exigirAdmin()
    if (no) return no
    if (!iaConfigurada()) return NextResponse.json({ error: "Falta configurar GEMINI_API_KEY en el servidor." }, { status: 503 })

    const j = await leerJson(req, 150_000)
    if (!j) return peticionInvalida("Solicitud inválida.")
    const html = cadena(j.html, 120_000)
    if (html.length < 200) return peticionInvalida("Falta el texto de la nota.")

    try {
        return NextResponse.json(await generarMetadatos(cadena(j.titulo, 200), html, cadena(j.palabraClave, 120)))
    } catch (e) {
        return responderError(e)
    }
}
