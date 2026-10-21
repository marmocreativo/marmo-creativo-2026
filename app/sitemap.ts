import type { MetadataRoute } from "next";
import { ciudades } from "@/lib/seo/ciudades";
import { giros } from "@/lib/seo/giros";
import { listarPortafolio } from "@/lib/portafolio";

const baseUrl = "https://marmo-creativo.com";

// lastModified fijo: actualizar la fecha solo cuando cambie el contenido de la página.
const routes: { path: string; lastModified: string; priority: number }[] = [
  { path: "", lastModified: "2026-10-02", priority: 1 },
  { path: "/precios", lastModified: "2026-10-02", priority: 0.9 },
  { path: "/empezar", lastModified: "2026-10-02", priority: 0.7 },
  { path: "/paginas-web", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/landing-pages", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/sitio-corporativo", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/wordpress", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/ecommerce", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/cms-custom", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/paginas-web/mantenimiento", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/para-emprendedores", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/desarrollo-software", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/diseno-grafico", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/outsourcing", lastModified: "2026-10-02", priority: 0.8 },
  { path: "/herramientas", lastModified: "2026-10-20", priority: 0.7 },
  { path: "/herramientas/generador-qr", lastModified: "2026-10-20", priority: 0.7 },
  { path: "/herramientas/boton-whatsapp", lastModified: "2026-10-20", priority: 0.7 },
  { path: "/herramientas/paleta-colores", lastModified: "2026-10-20", priority: 0.7 },
  { path: "/portafolio", lastModified: "2026-10-20", priority: 0.8 },
  ...giros.map((g) => ({ path: `/pagina-web-para/${g.slug}`, lastModified: "2026-10-02", priority: 0.7 })),
  ...ciudades.map((c) => ({ path: `/pagina-web/${c.slug}`, lastModified: "2026-10-02", priority: 0.7 })),
];

// Incluye los proyectos publicados del portafolio, así que se arma en cada petición (no en el build).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fijas: MetadataRoute.Sitemap = routes.map(({ path, lastModified, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));

  try {
    const proyectos = await listarPortafolio({ limite: 500 });
    return [
      ...fijas,
      ...proyectos.map((p) => ({
        url: `${baseUrl}/portafolio/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return fijas; // sin base de datos, al menos las páginas fijas
  }
}
