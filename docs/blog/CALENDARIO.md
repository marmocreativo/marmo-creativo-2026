# Estrategia SEO del blog — Marmo Creativo

## Por qué un blog (con los datos de Search Console, 3 meses)

- 10 clics y ~1,900 impresiones; casi todo en la home y en consultas en inglés sin intención ("graphic design", "web development").
- Lo valioso está cerca de la página 1: `diseño magento guadalajara` (pos. 12.8), `desarrollo de cms a medida` (14.8), `/pagina-web/guadalajara` (16.7).
- Las páginas de servicio y ciudad son comerciales y casi iguales entre sí; el blog agrega **contenido informativo único** que responde búsquedas reales y enlaza a esas páginas.

## Reglas de cada artículo

1. **Una consulta principal** por artículo (la que aparece en el título y en el slug) y 2–3 secundarias en subtítulos.
2. **800–1,500 palabras** (los 5 primeros borradores rondan las 750–950: amplíalos con tus casos reales si puedes), con tabla o checklist y sección de preguntas frecuentes (sirve para fragmentos destacados).
3. **Enlaces internos**: mínimo 2 a páginas de servicio/ciudad/precios y 1 a otro artículo. El CTA final ya enlaza a la página de servicio de su categoría.
4. **Portada propia** (1200 px) y resumen de 120–160 caracteres.
5. **Un artículo cada semana o cada dos**: la constancia pesa más que el volumen. Mejor 1 al mes bien hecho que 10 en un día.
6. **Revisar a las 4–6 semanas** en Search Console (Rendimiento → Páginas → /blog/...) y mejorar los que tienen impresiones pero no clics (título/resumen) o posición 8–20 (más contenido, más enlaces internos).
7. Después de publicar: **Inspección de URL → Solicitar indexación** en Search Console.

## Borradores listos (en `docs/blog/`)

| # | Artículo | Consulta objetivo | Enlaza a |
|---|---|---|---|
| 1 | ¿Cuánto cuesta una página web en México en 2026? | cuánto cuesta una página web | /precios |
| 2 | CMS a la medida vs WordPress | desarrollo de cms a medida, cms personalizado | /paginas-web/cms-custom, /paginas-web/wordpress |
| 3 | Cómo elegir quién haga tu página web en Guadalajara | diseño de páginas web guadalajara | /pagina-web/guadalajara |
| 4 | Tu página web en 72 horas | página web en 72 horas | /precios, /empezar |
| 5 | Google Maps para tu negocio | google maps negocio local | /pagina-web/monterrey, /puebla, /guadalajara |

## Siguientes temas (por orden de prioridad)

**Búsquedas locales (una por ciudad, con contenido distinto cada una, no plantilla):**
- Diseño de páginas web en Monterrey: qué buscan las empresas regiomontanas (industria, B2B, proveedores).
- Páginas web en Puebla: negocios locales, turismo y servicios.
- Páginas web en CDMX: cómo destacar por colonia/alcaldía.

**Servicio (intención de compra):**
- Tienda en línea con WooCommerce: cuánto cuesta y qué incluye.
- Landing page vs sitio completo: cuál elegir.
- Magento en Guadalajara: cuándo vale la pena y cuándo es demasiado (hay impresiones por `diseño magento guadalajara`; verificar primero si ofreces Magento).
- Mantenimiento web: qué incluye y por qué tu sitio de WordPress se pone lento.
- Cuánto cuesta una app móvil en México.
- Cuánto cuesta un logotipo / identidad de marca.

**Por giro (reutilizan las páginas `/pagina-web-para/<giro>`):**
- Página web para abogados: qué debe tener.
- Página web para estéticas, consultorios, restaurantes…

**Educativos (menor intención, más alcance):**
- Qué necesita una página web para vender por WhatsApp.
- Cómo saber si tu página web está lenta y qué hacer.
- Dominio .com vs .com.mx.

## Pendientes técnicos (no incluidos todavía)

- Feed RSS (`/blog/feed.xml`).
- Paginación del listado cuando haya más de ~60 artículos.
- Buscador y etiquetas.
