import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://marmo-creativo.com";

  const routes = [
    "",
    "/paginas-web",
    "/paginas-web/para-emprendedores",
    "/paginas-web/landing-pages",
    "/paginas-web/sitio-corporativo",
    "/paginas-web/wordpress",
    "/paginas-web/ecommerce",
    "/paginas-web/cms-custom",
    "/paginas-web/ux-ui",
    "/paginas-web/mantenimiento",
    "/desarrollo-software",
    "/diseno-grafico",
    "/outsourcing",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}