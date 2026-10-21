import { listarPortafolio } from "@/lib/portafolio"

// Alimenta el carrusel de las páginas de servicio (que son estáticas): /api/portafolio?categoria=landing-pages,wordpress
export async function GET(request: Request) {
  const categorias = (new URL(request.url).searchParams.get("categoria") ?? "").split(",").filter(Boolean).slice(0, 10)

  try {
    const items = await listarPortafolio({ categorias, limite: 12 })
    return Response.json(items, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    })
  } catch {
    // Sin base de datos el sitio sigue funcionando: simplemente no hay carrusel.
    return Response.json([], { headers: { "Cache-Control": "no-store" } })
  }
}
