// Categorías del blog. `servicio` es la página de servicio a la que enlaza el artículo (enlace interno para SEO).
export const CATEGORIAS_BLOG = [
    { slug: "paginas-web", nombre: "Páginas web", servicio: { href: "/paginas-web", texto: "Ver nuestros servicios de páginas web" } },
    { slug: "seo-local", nombre: "SEO y presencia local", servicio: { href: "/precios", texto: "Ver paquetes y precios" } },
    { slug: "desarrollo-software", nombre: "Software a la medida", servicio: { href: "/desarrollo-software", texto: "Conocer el desarrollo de software a la medida" } },
    { slug: "diseno-grafico", nombre: "Diseño gráfico", servicio: { href: "/diseno-grafico", texto: "Ver el servicio de diseño gráfico" } },
    { slug: "emprendedores", nombre: "Para emprendedores", servicio: { href: "/para-emprendedores", texto: "Ver lo que tenemos para emprendedores" } },
] as const

export const SLUGS_BLOG: string[] = CATEGORIAS_BLOG.map((c) => c.slug)

export const ETIQUETAS_BLOG: Record<string, string> = Object.fromEntries(CATEGORIAS_BLOG.map((c) => [c.slug, c.nombre]))
