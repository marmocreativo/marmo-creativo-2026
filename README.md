# Marmo Creativo

Sitio web oficial de **Marmo Creativo**, agencia digital especializada en desarrollo web, software a medida, diseño gráfico y outsourcing creativo.

- **Dominio final:** https://marmo-creativo.com
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui

## Servicios (secciones del sitio)

- `desarrollo-software` — desarrollo de software a medida
- `diseno-grafico` — diseño gráfico
- `outsourcing` — outsourcing creativo
- `paginas-web` — desarrollo web, con subservicios:
  - `cms-custom`
  - `ecommerce`
  - `landing-pages`
  - `mantenimiento`
  - `sitio-corporativo`
  - `wordpress`
- `para-emprendedores` — contenido orientado a emprendedores
- `herramientas` — utilidades gratuitas:
  - `boton-whatsapp`
  - `generador-qr`
  - `paleta-colores`

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Script            | Descripción                          |
| ----------------- | ------------------------------------- |
| `npm run dev`      | Levanta el servidor de desarrollo     |
| `npm run build`    | Genera el build de producción         |
| `npm run start`    | Sirve el build de producción          |
| `npm run lint`     | Corre ESLint                          |
| `npm run format`   | Formatea el código con Prettier       |
| `npm run typecheck`| Verifica tipos con TypeScript         |

## Componentes UI

Este proyecto usa [shadcn/ui](https://ui.shadcn.com/). Para agregar un nuevo componente:

```bash
npx shadcn@latest add button
```

Los componentes se colocan en `components/ui` y se importan así:

```tsx
import { Button } from "@/components/ui/button";
```

## SEO

El proyecto incluye `robots.ts` y `sitemap.ts` en `app/` para la generación automática de `robots.txt` y `sitemap.xml`.
