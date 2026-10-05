import type { MetadataRoute } from "next";
import { ciudades } from "@/lib/seo/ciudades";
import { giros } from "@/lib/seo/giros";

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
  ...giros.map((g) => ({ path: `/pagina-web-para/${g.slug}`, lastModified: "2026-10-02", priority: 0.7 })),
  ...ciudades.map((c) => ({ path: `/pagina-web/${c.slug}`, lastModified: "2026-10-02", priority: 0.7 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
