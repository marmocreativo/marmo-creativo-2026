import { leerArchivo } from "@/lib/uploads"

// Sirve las imágenes subidas (están fuera de /public para que funcionen con el build standalone y el volumen de Docker).
export async function GET(_: Request, { params }: { params: Promise<{ ruta: string[] }> }) {
  const { ruta } = await params
  const archivo = await leerArchivo(ruta)
  if (!archivo) return new Response("No encontrado", { status: 404 })

  return new Response(new Uint8Array(archivo.data), {
    headers: {
      "Content-Type": archivo.tipo,
      // Nombre UUID = contenido fijo (caché larga). Importados a mano: pueden cambiar, caché corta.
      "Cache-Control": archivo.inmutable ? "public, max-age=31536000, immutable" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
