// Categorías del portafolio = servicios que ofrece el sitio. `seccion` es la página del servicio
// que muestra el carrusel de esa categoría. Para agregar un servicio nuevo, basta una línea aquí.
export const CATEGORIAS_PORTAFOLIO = [
    { slug: "landing-pages", nombre: "Landing Pages", seccion: "/paginas-web/landing-pages" },
    { slug: "sitio-corporativo", nombre: "Sitio Corporativo", seccion: "/paginas-web/sitio-corporativo" },
    { slug: "wordpress", nombre: "WordPress", seccion: "/paginas-web/wordpress" },
    { slug: "ecommerce", nombre: "E-commerce", seccion: "/paginas-web/ecommerce" },
    { slug: "cms-custom", nombre: "CMS Custom", seccion: "/paginas-web/cms-custom" },
    { slug: "mantenimiento", nombre: "Mantenimiento web", seccion: "/paginas-web/mantenimiento" },
    { slug: "desarrollo-software", nombre: "Desarrollo de Software", seccion: "/desarrollo-software" },
    { slug: "diseno-grafico", nombre: "Diseño Gráfico", seccion: "/diseno-grafico" },
    { slug: "outsourcing", nombre: "Outsourcing Creativo", seccion: "/outsourcing" },
] as const

export const SLUGS_CATEGORIA: string[] = CATEGORIAS_PORTAFOLIO.map((c) => c.slug)

export const ETIQUETAS_CATEGORIA: Record<string, string> = Object.fromEntries(
    CATEGORIAS_PORTAFOLIO.map((c) => [c.slug, c.nombre]),
)

// Las seis categorías de "Páginas web", para el índice de esa sección.
export const CATEGORIAS_WEB: string[] = SLUGS_CATEGORIA.slice(0, 6)
