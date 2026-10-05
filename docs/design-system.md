# Design System — Marmo Creativo

Versión 0.1 · 2026-10-05 · Basado en el rediseño del Home, `/precios`, `/empezar` y el footer/header.

Objetivo: que cualquier página nueva (giros, ciudades, blog, herramientas) se vea del mismo sitio sin tener que adivinar. Si algo no está aquí, se agrega aquí primero y luego se usa.

---

## 1. Principios

1. **Limpio y editorial.** Mucho aire, poca decoración. Tipografía grande y ligera, líneas finas, cero sombras pesadas.
2. **Cuadrado = acción, redondeado suave = contenido.** Los botones son cuadrados (sin `rounded`); las cards llevan `rounded-xl`.
3. **Texto a la izquierda, contenido a la derecha.** Las secciones se explican en una columna y se muestran en la otra.
4. **Una idea por sección.** Eyebrow + título + párrafo, y el contenido.
5. **Honestidad.** Nada inventado: logos, cifras y testimonios solo si son reales.

---

## 2. Tipografía

Fuente única: **Inter** (`--font-sans`, ya cargada en `app/layout.tsx`). No agregar otra familia.

El sello del sitio es el **peso ligero (`font-light`) en títulos**. El peso medio solo se usa en botones y datos que deben destacar.

| Uso | Clases |
|-----|--------|
| H1 hero (home) | `text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.02] tracking-tight` |
| H1 hero (páginas internas) | `text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight` |
| H2 de sección | `text-4xl md:text-5xl font-light leading-tight text-foreground` |
| H2 de bloque grande (statement) | `text-3xl md:text-5xl font-light leading-[1.2]` (primera frase `text-foreground`, resto `text-foreground/40`) |
| H3 de card / columna | `text-xl font-light text-foreground` |
| Precio / cifra grande | `text-5xl md:text-7xl font-light` + unidad `text-base text-muted-foreground` |
| Párrafo de apoyo | `text-lg text-muted-foreground leading-relaxed` |
| Texto de card | `text-sm text-muted-foreground leading-relaxed` |
| Eyebrow (etiqueta sobre el título) | `text-sm text-muted-foreground` (opcional ícono `w-5 h-5 text-primary`) |
| Micro-texto | `text-xs text-muted-foreground` |
| Etiqueta en mayúsculas | `text-xs tracking-[0.15em] uppercase text-muted-foreground` |

Reglas:
- Un solo H1 por página.
- Títulos en **sentence case** ("Tu página web lista en 72 horas."), no en Title Case.
- Saltos de línea manuales (`<br />`) en H2 solo para equilibrar; en móvil se ignoran.

---

## 3. Color

Los tokens viven en `app/globals.css`. **Usar siempre el token, nunca un hex.**

| Token | Valor (claro) | Uso |
|-------|---------------|-----|
| `foreground` | casi negro | Texto principal, botones primarios |
| `background` | blanco | Fondo base |
| `primary` | granate | Íconos, enlaces, palomitas, badge "Más popular" |
| `muted-foreground` | gris medio | Texto secundario |
| `border` | gris muy claro | Líneas y bordes de cards |
| `neutral-100` | gris claro | Fondo alterno de secciones, encabezados de tabla |
| `stone-100` | crema | Fondo de la lista grande de servicios |
| `black` | negro | Footer, barras de grupo en tablas, hero con overlay |
| `accent` | crema/dorado | Solo acentos sobre fondos oscuros (p. ej. precio en hero) |

Reglas:
- **El granate no se usa como fondo de botones** (decisión del rediseño). Es para acentos pequeños.
- Alternar fondos entre secciones: `bg-white` ↔ `bg-neutral-100`. Nunca dos iguales seguidas.
- Sobre fondos oscuros, texto `text-white` y apoyo `text-white/60`–`/85`.
- Líneas de tabla fuertes: `border-foreground/80`; líneas suaves: `border-border`.

---

## 4. Espacio y layout

- **Contenedor:** `max-w-7xl mx-auto px-6` en todas las secciones.
- **Padding vertical de sección:** `py-20 md:py-28`.
- **Hero interno:** `-mt-20 pt-40 pb-20 md:pt-48 md:pb-28` (el `-mt-20` lo mete debajo del header transparente).
- **Gap entre columnas:** `gap-12 lg:gap-16`.
- **Cards en cuadrícula:** `gap-5`.

### Layout estándar de sección (texto + contenido)

```tsx
<section className="relative py-20 md:py-28 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
    <div className="lg:sticky lg:top-28">{/* eyebrow + h2 + párrafos */}</div>
    <div className="grid sm:grid-cols-2 gap-5">{/* cards */}</div>
  </div>
</section>
```

Proporción 5/7. La columna de texto es `sticky` solo en escritorio.

### Layout de encabezado de tabla/sección ancha

`grid lg:grid-cols-2 gap-8 lg:gap-16 items-end`: título a la izquierda, párrafo a la derecha.

---

## 5. Componentes

### 5.1 Botones (siempre cuadrados)

| Variante | Clases |
|----------|--------|
| Primario sobre fondo claro | `inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity` |
| Primario sobre fondo oscuro | `inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-base font-medium hover:bg-white/90 transition-colors` |
| Secundario (contorno) claro | `border border-foreground/60 px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors` |
| Secundario (contorno) oscuro | `border border-white/70 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black transition-colors` |
| Enlace de texto | `text-sm text-white/80 hover:text-white` (oscuro) · `text-primary underline underline-offset-4` (claro) |

Los CTA que avanzan llevan `ChevronRight w-4 h-4` al final. Un botón primario por vista; el resto, contorno o enlace.

### 5.2 Card

```tsx
<div className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all">
  <Icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
  <h3 className="text-xl font-light text-foreground mb-2">Título</h3>
  <p className="text-sm text-muted-foreground leading-relaxed">Descripción.</p>
</div>
```

- Íconos de `lucide-react`, `strokeWidth={1.5}`, color `text-primary`.
- Sin sombra en reposo; la sombra aparece solo en hover.

### 5.3 Tabla

- Contenedor: `rounded-xl border border-foreground/80 bg-white overflow-hidden`.
- Encabezado: `bg-neutral-100 border-b border-foreground/80`, texto `text-xl font-light`.
- Columnas separadas con `divide-x divide-foreground/80`.
- Barra de grupo (tablas de comparación): `bg-black px-6 py-3.5 text-sm text-white`.
- Filas alternas `bg-white` / `bg-neutral-100`.
- Valores: palomita en círculo (`h-6 w-6 rounded-full border border-primary text-primary`) o guion "—".
- En móvil, envolver en `overflow-x-auto` con `min-w-[760px]`.

### 5.4 FAQ

Componente compartido `components/seo/faq.tsx`. Texto a la izquierda (sticky), preguntas a la derecha como filas con línea divisoria y un `+` que rota. Emite JSON-LD `FAQPage`. **No duplicar:** usar siempre el componente.

### 5.5 Hero

- Imagen de fondo (`/images/*_bg.jpg`) con degradado `bg-gradient-to-r from-black/85 via-black/65 to-black/40`.
- Texto alineado a la izquierda, sobre una línea de contexto pequeña (`text-xs sm:text-sm text-white/80`).
- CTA principal blanco + enlace secundario de WhatsApp.
- El home además usa video y la franja de logos de clientes; las páginas internas no.

### 5.5b Formularios

- Campos: `w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-foreground`.
- Sin etiquetas largas: placeholder + `aria-label`.
- Mostrar solo lo indispensable; lo demás tras "Agregar más detalles (opcional)".
- Tarjeta del formulario: `bg-white p-6 sm:p-8 shadow-2xl` (cuadrada).

### 5.6 Chips / enlaces relacionados

Para listas de enlaces (giros, ciudades) usar **tablas de filas** (`divide-y divide-border`, fila con texto + `ChevronRight`), no botones sueltos.

### 5.7 Header y footer

- Header: transparente sobre el hero, negro translúcido con blur al hacer scroll. Nav a la izquierda junto al logo, WhatsApp (texto) y botón blanco cuadrado a la derecha.
- Footer: fondo negro. Fila de CTA arriba, columnas de enlaces, contacto en la primera columna, barra legal abajo. **Es el contacto principal del sitio**: no hay sección de contacto en las páginas.

---

## 6. Patrón de página

Orden típico de una página de oferta (giro / ciudad):

1. Hero oscuro (H1 + subtítulo + CTA).
2. Sección texto-izquierda / cards-derecha (problemas o beneficios del giro/ciudad).
3. Sección texto-izquierda / lista o cards (qué lleva tu página / zonas que atendemos).
4. Tabla de "qué incluye" o precios si aplica.
5. FAQ (componente compartido).
6. Enlaces relacionados como tabla.
7. Footer (con CTA).

Fondos alternando: hero oscuro → blanco → gris → blanco → … → FAQ blanco → gris → footer negro.

---

## 7. Imágenes y movimiento

- Fondos de hero: `bg-cover bg-center`, siempre con overlay oscuro; evitar `bg-fixed` (pesa y se ve raro en móvil).
- Fotos de personas/casos: cuadradas con `rounded-2xl`.
- Movimiento: solo transiciones suaves (`transition-colors`, `hover:-translate-y-0.5`). Nada de animaciones llamativas.
- Video del hero: solo en escritorio (en móvil se muestra el póster).

---

## 8. SEO dentro del diseño

- Un H1 por página, con la keyword natural.
- Las páginas de oferta incluyen JSON-LD (`Service`, `BreadcrumbList`, `FAQPage`) con los componentes de `components/seo/`.
- Cada página define `title`, `description` y `alternates.canonical` relativo.
- Datos compartidos: textos de FAQ y ofertas en `lib/seo/`; no copiar texto entre páginas.

---

## 9. Pendientes del sistema

- [ ] Páginas de servicio antiguas (`/paginas-web/*`, `/desarrollo-software`, `/diseno-grafico`, `/outsourcing`, `/para-emprendedores`) aún usan el estilo anterior (redondeado, fondos de imagen).
- [ ] Páginas de giro y ciudad: aplicar este sistema (siguiente paso).
- [ ] Definir estilo de blog y herramientas.
- [ ] Extraer `SectionTextCards`, `PricingTable` y `Hero` como componentes reutilizables cuando haya 3+ usos.
- [ ] Revisar contraste del texto `/60` sobre fotos en móvil.
