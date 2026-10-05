# Plan SEO — "Página web en 72 horas desde $3,500 MXN"

Fecha: 2026-10-02 · Autora: Alma (planeación en Opus) · Para: implementación en Sonnet

> **Nota para quien implemente:** lee `AGENTS.md` (Next.js 16 tiene cambios; consulta `node_modules/next/dist/docs/` antes de usar APIs de metadata, rutas dinámicas o `generateStaticParams`). Manuel prefiere que le propongas los cambios antes de aplicarlos: confirma con él al inicio de cada fase.

---

## 0. Diagnóstico: por qué el SEO está en 0

No es solo contenido. Hay errores técnicos que, por sí solos, le dicen a Google que **no indexe** las páginas de servicio.

### Críticos (bloquean el posicionamiento)

| # | Problema | Dónde | Efecto |
|---|----------|-------|--------|
| 1 | `alternates.canonical` y `openGraph.url` apuntan a **`marmocreativo.com`** (sin guion), un dominio que **ni siquiera resuelve**. El sitio real es `marmo-creativo.com`. Confirmado en producción. | 10 páginas: `app/paginas-web/*`, `app/desarrollo-software`, `app/diseno-grafico` | Google ve que la página "original" está en otro dominio → no la indexa o la ignora. |
| 2 | `sitemap.ts` lista rutas que **no existen** (`/paginas-web/para-emprendedores`, `/paginas-web/ux-ui`) y **omite** las que sí (`/para-emprendedores`, `/herramientas`). `lastModified: new Date()` en todo. | `app/sitemap.ts` | 404 en el sitemap + señales de baja calidad. |
| 3 | Páginas "stub" indexables: `/herramientas/generador-qr`, `/boton-whatsapp`, `/paleta-colores` solo dicen `<div>QR</div>`. Están enlazadas en el menú. | `app/herramientas/*` | Contenido delgado (thin content) baja la calidad percibida del sitio completo. |
| 4 | 9 imágenes OG referenciadas **no existen** (`/images/og-paginas-web.jpg`, `/images/landing/og-landing-pages.jpg`, etc.). | metadata de cada página | Previews rotos al compartir en WhatsApp/Facebook (tu canal principal). |
| 5 | `/outsourcing` y `/herramientas` **no tienen metadata** → heredan título y descripción del home. | — | Títulos duplicados. |

| 6 | **URLs del sitio anterior siguen en Google**: `/home.html` (18 impresiones, pos. 31) y `/outsourcing-creativo` (5 impresiones). Hoy dan 404. | Search Console | Autoridad del sitio viejo desperdiciada. Se arregla con redirecciones 301. |

### Lo que dice Search Console (últimos 3 meses, al 2026-10-02)

- **Total: 16 clics y ~1,550 impresiones.** Los 16 clics llegan al home, casi seguro por búsquedas de marca (Google las oculta como "anónimas").
- **Las impresiones "buenas" son un espejismo.** "graphic design" (752, pos. 4.3), "web development" (612, pos. 5.5) y "web hosting" (85) son búsquedas genéricas en inglés, desde escritorio y con **0 clics**. No tienen intención de compra y no vale la pena defenderlas. Cambiar el H1 del home no te hace perder nada real.
- **Cero visibilidad en lo que vende.** No hay ni una consulta con "página web", "precio", "económica", ciudad o giro. Es terreno virgen: reposicionar el home no tiene costo.
- **Las páginas de servicio casi no aparecen**: `/paginas-web` 36 impresiones, landing-pages 6, cms-custom 5 y el resto 0. Esto cuadra con el problema del canonical.
- **Móvil: solo 34 impresiones de 1,551.** Tu cliente (dueño de negocio pequeño) busca desde el celular. Hoy, para él, no existes.
- Las impresiones despegaron a mediados de agosto: el sitio es joven en Google (≈ 7 semanas con datos útiles).

### Importantes

- **Ninguna página tiene datos estructurados** (JSON-LD): ni `Organization`, ni `LocalBusiness`, ni `Service`/`Offer`, ni `FAQPage`, ni `BreadcrumbList`.
- **El H1 del home no tiene ninguna keyword**: "Impulsamos tu Negocio Hasta las Estrellas". Nadie busca eso.
- **Precios contradictorios**: Sitio corporativo = $7,000 en `/paginas-web` y $15,000 en `/para-emprendedores`. Confunde a usuarios y a Google.
- `site.webmanifest` con `name` y `short_name` vacíos.
- Rendimiento móvil: video de 2.6 MB en el hero + fondos `bg-fixed` JPG de 300–800 KB vía CSS (no pasan por `next/image`). Afecta LCP.
- No hay perfil de Google Business, reseñas ni backlinks (autoridad de dominio ≈ 0).
- `/paginas-web/*` no tiene canonical en home ni en `/para-emprendedores` (se arregla con el punto 1).

---

## 1. Estrategia

### 1.1 ¿Es buena idea "72 horas desde $3,500"? Sí, con 3 ajustes

**Lo bueno:** velocidad + precio fijo es una oferta fácil de entender, fácil de vender por WhatsApp y con búsquedas de intención de compra ("página web barata", "página web rápida", "cuánto cuesta una página web").

**El riesgo:** ya existe **Páginalo** (paginalo.com.mx) con *exactamente* "páginas web en 72 horas desde $3,500 MXN" en Monterrey, y hay varios "web en 72 horas" más. Si copias la oferta tal cual, compites solo por precio contra alguien que llegó primero.

**Ajustes recomendados (mi mejor idea):**

1. **Diferénciate con "Página web + Google Maps en 72 h".** Incluye la alta/optimización del **Perfil de Negocio de Google** en el paquete. Al dueño de un negocio local no le importa "Next.js"; le importa *aparecer en Google cuando lo buscan*. Nadie de la competencia lo pone como titular.
   - Titular: **"Tu negocio en Google en 72 horas. Página web + Google Maps desde $3,500 MXN."**
2. **Garantía de tiempo**: "Si no está lista en 72 horas hábiles, no la pagas" (o te devolvemos el 50%). Ojo: el reloj arranca cuando recibes pago + contenido completo (formulario de brief). Eso tiene que estar clarísimo.
3. **Posiciónate por GIRO además de por CIUDAD.** Las páginas por ciudad son riesgo de "doorway pages" (Google penaliza 30 páginas casi idénticas cambiando solo el nombre de la ciudad) y no puedes salir en el mapa de ciudades donde no tienes dirección. En cambio, "página web para dentistas", "página web para restaurante", "página web para abogados" tienen menos competencia, intención alta y te permiten mostrar **demos reales por giro** — que además son las plantillas que te permiten entregar en 72 h.
   - Ciudades: sí, pero **pocas (8–10) y con contenido único de verdad**.

**Cómo convive con el posicionamiento premium actual:** no lo borres; conviértelo en la escalera de venta.

| Escalón | Producto | Precio | Entrega |
|--------|----------|--------|---------|
| Entrada | **Página Express** (1 página, plantilla por giro, + Google Maps) | $3,500 | 72 h |
| Medio | **Express Plus** (hasta 5 secciones, galería, blog básico, SEO local) | **$5,000** | 5 días |
| Recurrente | Hosting + dominio `.com` | **$1,500/año** | — |
| Recurrente | Hosting + dominio `.com.mx` o `.mx` | **$2,000/año** | — |
| Medio-alto | Sitio corporativo | **$7,000** | 3–4 semanas |
| Premium | WordPress, e-commerce, CMS a medida (lo actual) | $8,000+ / cotización | 4–6 semanas |

> **El negocio real está en el recurrente**, no en los $3,500. 50 clientes Express renovando hosting son ~$75,000–100,000 MXN al año casi sin trabajo.
>
> **Decidido:** los $3,500 **incluyen el primer año de hosting + dominio `.com`**. Si el cliente quiere `.com.mx`/`.mx`: +$500. Comunicarlo así: "$3,500 todo incluido el primer año · renovación $1,500/año".

### 1.2 Keywords objetivo

> No tengo acceso a volúmenes reales. **Antes de la Fase 2, valida con Google Keyword Planner o Search Console** y ajusta prioridades.

| Cluster | Ejemplos | Página destino | Intención |
|---------|----------|----------------|-----------|
| Oferta principal | página web en 72 horas · página web rápida · página web económica · página web barata México · página web desde 3500 | **Home** | Compra |
| Precio | cuánto cuesta una página web en México · precio página web 2026 · paquetes de páginas web | `/precios` + guía en blog | Investigación → compra |
| Ciudad | diseño de páginas web en Guadalajara · página web económica Monterrey · páginas web CDMX | `/pagina-web/[ciudad]` | Compra local |
| Giro | página web para dentistas · página web para restaurante · página web para abogados · página web para estética | `/pagina-web-para/[giro]` | Compra |
| Google Maps | cómo aparecer en Google Maps · dar de alta mi negocio en Google | blog + home | Problema → oferta |
| Herramientas | generador link WhatsApp · botón de WhatsApp para página web · generador QR | `/herramientas/*` | Tráfico + backlinks |

### 1.3 Arquitectura de URLs

```
/                                   ← Home = página de la oferta 72 h (concentra la poca autoridad que hay)
/precios                            ← tabla de paquetes, comparativa, FAQ de precio
/pagina-web/[ciudad]                ← 8–10 ciudades al inicio
/pagina-web-para/[giro]             ← 8–12 giros al inicio, cada uno con demo
/demos                              ← galería de plantillas por giro (link a demo en vivo)
/como-funciona                      ← proceso 72 h, qué necesitas mandar, garantía (opcional: puede vivir en home)
/empezar                            ← formulario de brief (lo que arranca el reloj)
/blog/[slug]                        ← guías informativas
/paginas-web/*                      ← se queda: servicios premium (corporativo, ecommerce, CMS…)
/desarrollo-software, /diseno-grafico, /outsourcing   ← se quedan, sin cambios de foco
/herramientas/*                     ← construir de verdad o sacar del índice
```

**Ciudades iniciales (por tamaño de mercado PyME y competencia):**
CDMX, Estado de México (Naucalpan/Tlalnepantla/Ecatepec), Guadalajara, Monterrey, Puebla, Querétaro, León, Toluca, Mérida, Tijuana.
Segunda ola: Cancún, San Luis Potosí, Aguascalientes, Chihuahua, Hermosillo, Morelia, Saltillo, Veracruz.

**Giros iniciales** (negocios locales que viven de que los encuentren y suelen no tener web):
dentistas/consultorios, médicos y especialistas, restaurantes y cafeterías, estéticas y barberías, abogados, contadores, talleres mecánicos, inmobiliarias/agentes, gimnasios/entrenadores, psicólogos, veterinarias, escuelas/cursos.

### 1.4 Regla anti-"doorway" para páginas de ciudad y giro

Cada página **debe** tener al menos 40–50% de contenido único. Por ciudad:
- Intro específica (giros fuertes en esa ciudad, contexto económico breve y real).
- Clientes/proyectos de esa ciudad si los hay (si no, no inventes; usa "atendemos 100% en línea por WhatsApp y videollamada").
- Sección "Colonias/zonas/municipios que atendemos" (solo si aporta).
- FAQ local ("¿Tienen oficina en Guadalajara?" → respuesta honesta: trabajo remoto, mismo precio, mismo tiempo).
- Enlaces internos a 3–4 giros relevantes.

Por giro:
- Demo en vivo (captura + link) de la plantilla de ese giro.
- Secciones que necesita ese giro (agenda de citas para dentista, menú para restaurante, etc.).
- Copy de dolor específico ("tus pacientes te buscan en Google antes de llamar").
- FAQ del giro.

**Si no hay contenido único para una ciudad, no se publica.** Mejor 6 páginas buenas que 30 clonadas.

---

## 2. Plan de implementación (fases para Sonnet)

### Fase 1 — Arreglos técnicos (1 día) ⚠️ hacer primero

1. **Canonicals**: en las 10 páginas con `https://marmocreativo.com/...`, cambiar a rutas relativas (`alternates: { canonical: "/paginas-web/landing-pages" }`) y quitar `openGraph.url` absoluto o usar relativo — `metadataBase` en `app/layout.tsx` ya resuelve el dominio. Agregar canonical a home (`"/"`) y `/para-emprendedores`.
   - Archivos: `app/paginas-web/page.tsx`, `app/paginas-web/{landing-pages,sitio-corporativo,wordpress,ecommerce,cms-custom,mantenimiento}/page.tsx`, `app/desarrollo-software/page.tsx`, `app/diseno-grafico/page.tsx`.
   - Verificar: `grep -rn "marmocreativo.com" app` → 0 resultados (ojo: el correo `marmocreativo@gmail.com` sí es válido).
2. **Sitemap**: reescribir `app/sitemap.ts` con rutas reales, sin `/paginas-web/ux-ui` ni `/paginas-web/para-emprendedores`; agregar `/para-emprendedores`. Generarlo desde los mismos arreglos de datos que se usarán en Fase 3 (ciudades/giros) para que nunca se desincronice. `lastModified` fijo por página (no `new Date()`).
3. **Herramientas stub**: quitar del menú (`components/layout/header.tsx`, `herramientasItems`) y del sitemap, y agregar `robots: { index: false }` a esas 3 páginas hasta que existan de verdad (Fase 5).
4. **Metadata faltante**: `title`/`description` para `/outsourcing` y `/herramientas`.
5. **Imágenes OG**: o crear los 9 archivos faltantes (1200×630), o apuntar todas a `/og-main.jpg` mientras tanto. Recomendado: una ruta `opengraph-image.tsx` por segmento con `ImageResponse` para generarlas (revisar docs de Next 16).
6. **`site.webmanifest`**: llenar `name: "Marmo Creativo"`, `short_name: "Marmo"`, `theme_color` de marca.
7. **JSON-LD base** en `app/layout.tsx`: `Organization` + `ProfessionalService` (nombre, logo, `telephone: +52 55 2399 5604`, `email`, `areaServed: "MX"`, `sameAs: [Facebook]`, `founder: Manuel Marmolejo Martínez`). Crear `components/seo/json-ld.tsx` reutilizable.
8. **Precios**: unificar. **Decidido: sitio corporativo = $7,000.** Corregir `app/para-emprendedores/emprendedores-content.tsx` (dice $15,000 en el bloque de precio y en el texto del link de WhatsApp `%2415%2C000`) y revisar `app/paginas-web/sitio-corporativo/page.tsx` para que todo diga $7,000. El dominio definitivo es `marmo-creativo.com`.
9. **Redirecciones 301** en `next.config.ts` (`async redirects()`, revisar sintaxis en docs de Next 16):
   - `/home.html` → `/`
   - `/outsourcing-creativo` → `/outsourcing`
   - Pedirle a Manuel que revise en Search Console → *Indexación → Páginas* si hay más URLs viejas con 404 y agregarlas.

**Después del deploy (Manuel):** en Search Console → inspeccionar URLs de servicios → "Solicitar indexación"; reenviar sitemap.

### Fase 2 — Reposicionar Home y crear la oferta (2–3 días)

1. **Home (`app/page.tsx`)** pasa a ser la página de la oferta:
   - `title`: `Página Web en 72 Horas desde $3,500 MXN | Marmo Creativo`
   - `description`: `Tu página web profesional + perfil de Google Maps, lista en 72 horas. Precio fijo desde $3,500 MXN, sin mensualidades ocultas. Atendemos todo México.` (≤160 caracteres; ajustar)
   - **H1**: "Tu página web lista en 72 horas" + subtítulo "Desde $3,500 MXN. Incluye alta en Google Maps."
   - Secciones: oferta y qué incluye → cómo funciona (3 pasos: mandas tu info, diseñamos, en 72 h estás en línea) → garantía → demos por giro → precios (resumen y link a `/precios`) → testimonios reales (ya existen) → "¿Y si necesito algo más grande?" (link a servicios premium) → FAQ → CTA WhatsApp.
   - Mantener las stats (15+ años, 140+ clientes, 420+ proyectos): son el mejor argumento contra "barato = malo".
   - Bajar peso del hero: video más ligero (<1 MB, o solo póster en móvil) y fondos vía `next/image` o WebP/AVIF.
2. **`/precios`**: tabla de paquetes (Express $3,500 con primer año de hosting + `.com` incluido, Express Plus $5,000, Corporativo $7,000, premium) + bloque de renovación anual (hosting + `.com` $1,500/año; hosting + `.com.mx`/`.mx` $2,000/año), "qué NO incluye" (honestidad = confianza), comparativa vs. "hazlo tú mismo con Wix" y vs. agencia tradicional, FAQ de precio. JSON-LD `Service` con `Offer` (`price: 3500`, `priceCurrency: MXN`).
3. **`/empezar`** (brief): formulario con giro, nombre, logo, colores, textos, fotos, WhatsApp, dirección para Google Maps. Al enviar → WhatsApp con resumen o correo. Esto es lo que hace viable entregar en 72 h.
4. **FAQ + JSON-LD `FAQPage`** en home y precios. Preguntas clave: ¿de verdad 72 h? ¿cuándo empieza a contar? ¿qué pasa si no me gusta? ¿el dominio es mío? ¿cuánto cuesta renovar? ¿atienden en mi ciudad?
5. **Header**: CTA principal "Mi página en 72 h"; menú "Páginas Web" incluye Express arriba. Footer: enlaces a ciudades y giros (enlazado interno).
6. Actualizar `public/llms.txt` con la nueva oferta.

### Fase 3 — Páginas por giro y por ciudad (1–2 semanas, iterativo)

1. Crear `lib/seo/giros.ts` y `lib/seo/ciudades.ts`: arreglos tipados con **todo el contenido único** (slug, nombre, título, descripción, intro, dolores, secciones recomendadas, FAQ, demo URL/imagen, giros relacionados, etc.).
2. Rutas dinámicas `app/pagina-web-para/[giro]/page.tsx` y `app/pagina-web/[ciudad]/page.tsx` con `generateStaticParams` + `generateMetadata` (verificar API en docs de Next 16; en versiones recientes `params` es una Promise).
   - Title giro: `Página Web para Dentistas en 72 Horas desde $3,500 | Marmo Creativo`
   - Title ciudad: `Diseño de Páginas Web en Guadalajara · Listas en 72 h desde $3,500`
   - JSON-LD: `Service` (con `areaServed` = ciudad) + `BreadcrumbList` + `FAQPage`.
3. Componente compartido de layout de oferta (hero, incluye, proceso, CTA) para no duplicar, **pero el texto viene del archivo de datos y debe ser distinto por página**.
4. Arrancar con **4 giros + 4 ciudades**, publicar, esperar 2–3 semanas de datos en Search Console, y luego escalar.
5. `/demos`: galería de plantillas por giro. Cada demo idealmente en vivo (subdominio `demo-dentista.marmo-creativo.com` o ruta `/demos/dentista`, con `noindex` si es contenido de relleno).
6. Enlazado interno: cada ciudad enlaza a giros; cada giro enlaza a ciudades; home enlaza a ambos hubs.

### Fase 4 — Contenido informativo (continuo, 2 artículos/mes)

Blog en `app/blog/[slug]` (MDX o datos en TS). Primeros temas (alta intención, compiten con los artículos que hoy salen en Google):
1. ¿Cuánto cuesta una página web en México en 2026? (precios reales, con tu tabla)
2. Cómo dar de alta tu negocio en Google Maps paso a paso
3. Página web vs. solo redes sociales: qué necesita tu negocio
4. Wix vs. página hecha por un profesional: comparativa honesta de costos a 3 años
5. Qué necesitas para tener tu página web en 72 horas (checklist — convierte directo al brief)
6. Dominio .com o .com.mx: cuál elegir

Cada artículo: autor = Manuel (E-E-A-T), JSON-LD `Article`, CTA a la oferta.

### Fase 5 — Herramientas gratuitas como imán de tráfico (opcional, alto retorno)

Construir de verdad (son de público objetivo exacto: dueños de negocio pequeño):
1. **Generador de link y botón de WhatsApp** (`/herramientas/boton-whatsapp`) — búsquedas constantes, fácil de hacer, 100% cliente.
2. **Generador de QR** (`/herramientas/generador-qr`) — mucha competencia pero mucho volumen; útil para negocios locales (QR a menú, a WhatsApp, a Google reseñas).
3. **"Link para pedir reseñas en Google"** — nueva idea: herramienta que genera el link directo a dejar reseña. Encaja perfecto con la oferta de Google Maps.

Cada herramienta: contenido explicativo debajo + CTA "¿Y si mejor te hacemos la página completa en 72 h?". Quitar `noindex` solo cuando estén terminadas.

---

## 3. Fuera del código (Manuel) — igual de importante

**SEO tarda 3–6 meses.** Sin estas acciones el código solo no basta.

1. **Perfil de Negocio de Google** (hoy no existe): crear como "negocio de área de servicio" en CDMX (dirección oculta), categoría "Diseñador de sitios web", con fotos, servicios y precios. Es la vía más rápida para salir en "diseño de páginas web cerca de mí".
2. **Reseñas**: tienes 140+ clientes. Pídeles reseña en Google (meta: 20 en el primer mes). Es el factor #1 del mapa local.
3. **Crédito en el footer** de cada sitio Express que entregues: "Página web hecha en 72 h por Marmo Creativo" → enlace al home. Con volumen, es tu fuente principal de backlinks.
4. **Directorios**: Sortlist, Clutch, GoodFirms, Cylex, Hotfrog, Páginas Amarillas, Infobel, Yelp MX. Mismo nombre, teléfono y web en todos (NAP consistente).
5. **Valida la oferta con anuncios antes de escalar contenido**: $3,000–5,000 MXN en Google Ads ("página web económica", "página web rápida") + Meta Ads a la home nueva durante 2–3 semanas. Si convierte, escala el SEO; si no, ajustas oferta sin haber gastado semanas de contenido.
6. **Operación para cumplir 72 h**: biblioteca de plantillas por giro (Next.js o Astro, bloques reutilizables), checklist de lanzamiento, 1 ronda de cambios incluida. Sin esto la promesa te va a quemar.
7. **Search Console**: después de Fase 1, solicitar indexación; revisar cada 2 semanas "Páginas" y "Rendimiento".

---

## 4. Métricas de éxito

**Línea base (Search Console, 3 meses al 2026-10-02):** 16 clics · 1,551 impresiones · 34 impresiones en móvil · 0 consultas con "página web", precio, ciudad o giro.

| Plazo | Meta |
|-------|------|
| 2 semanas | 100% de páginas de servicio indexadas (hoy probablemente 0 por el canonical) |
| 1 mes | Perfil de Google activo + 20 reseñas; home rankeando top 50 en "página web en 72 horas" |
| 3 meses | Páginas de giro en top 20; 300+ clics orgánicos/mes; primeros leads orgánicos |
| 6 meses | Top 10 en 3+ giros y 2+ ciudades; 1,000+ clics/mes; ≥5 ventas Express/mes por orgánico |

---

## 5. Orden recomendado (resumen)

1. Fase 1 (técnico) → deploy → Search Console.
2. Perfil de Google + reseñas (en paralelo, Manuel).
3. Fase 2 (home + precios + brief) → anuncios de validación.
4. Fase 3 en olas pequeñas (4 + 4 páginas), medir, escalar.
5. Fase 4 y 5 en paralelo, ritmo constante.

---

### Referencias de competencia revisadas
- [Páginalo](https://paginalo.com.mx/) — misma oferta (72 h, $3,500) solo en Monterrey; sin páginas por ciudad ni blog.
- [Sitios Web 72](https://sitiosweb72.com/), [Web en 72 horas](https://web72horas.com/), [Tu Sitio Web en 72 Horas](https://multimarketingonline.com/tu-sitio-web-en-72-horas)
- Rangos de mercado 2026: [ListoWeb](https://listoweb.com.mx/cuanto-cuesta-una-pagina-web/), [UniversePage](https://universepage.com.mx/blog/cuanto-cuesta-pagina-web-mexico), [PreciosPaginaWeb](https://preciospaginaweb.com/mexico-pesos-mexicanos-mxn/) — landings $6,500–12,000; $3,500 te pone claramente en el rango bajo.
