import { NextResponse } from "next/server"
import { cadena, exigirAdmin, leerJson, peticionInvalida, responderError } from "@/lib/ia/acceso"
import { iaConfigurada } from "@/lib/ia/gemini"
import { redactarNota } from "@/lib/ia/nota"

// Paso 1 de "Crear nota con IA": investiga en Google, redacta la nota y verifica que las fuentes existan.
export async function POST(req: Request) {
    const no = await exigirAdmin()
    if (no) return no
    if (!iaConfigurada()) return NextResponse.json({ error: "Falta configurar GEMINI_API_KEY en el servidor." }, { status: 503 })

    const j = await leerJson(req)
    if (!j) return peticionInvalida("Solicitud inválida.")
    const titulo = cadena(j.titulo, 200)
    if (titulo.length < 8) return peticionInvalida("Escribe un título o tema (mínimo 8 caracteres).")

    try {
        return NextResponse.json(await redactarNota({ titulo, contenido: cadena(j.contenido, 6000), palabraClave: cadena(j.palabraClave, 120) }))
    } catch (e) {
        return responderError(e)
    }
}
