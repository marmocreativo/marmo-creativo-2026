import { Award, Clock, Code2, CreditCard, Palette, Rocket, Search, ShoppingCart } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/site/service-page";

export const metadata = {
  title: "Tienda Online / E-commerce Profesional | Marmo Creativo",
  description:
    "Tienda online completa con WooCommerce: pagos, envíos, inventario y todo lo necesario para vender 24/7. Desde $20,000 MXN, entrega en 5-6 semanas, con facilidades de pago.",
  keywords: [
    "tienda online México",
    "desarrollo e-commerce WooCommerce",
    "página web para vender productos",
    "tienda virtual profesional CDMX",
    "e-commerce con pasarela de pago México",
  ],
  openGraph: {
    title: "Tienda Online / E-commerce Profesional | Marmo Creativo",
    description:
      "Tienda online completa con WooCommerce: pagos, envíos, inventario y todo lo necesario para vender 24/7.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Online / E-commerce Profesional - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Online / E-commerce Profesional",
    description:
      "Todo lo necesario para vender 24/7. Desde $20,000 MXN, con facilidades de pago.",
  },
  alternates: {
    canonical: "/paginas-web/ecommerce",
  },
};

const config: ServicePageConfig = {
  portafolio: "ecommerce",
  heroBg: "/images/ecommerce_bg.jpg",
  eyebrow: "Para negocios listos para vender en línea, no solo mostrarse",
  title: "Una tienda online que vende las 24 horas",
  intro:
    "E-commerce profesional con WooCommerce: catálogo completo, pagos, envíos e inventario, todo integrado para que tu negocio venda sin parar.",
  bullets: [
    "Catálogo de productos sin restricciones",
    "5-6 semanas de entrega, con 3 meses de soporte incluido",
  ],
  card: {
    title: "Tienda online completa",
    subtitle: "Diseño y desarrollo a medida, lista para vender",
    priceLabel: "Desde",
    price: "$20,000 MXN",
    priceNote: "El alcance final se cotiza según tu proyecto",
    note: "No incluye dominio ni hosting · Incluye 3 meses de soporte · Pregúntanos por nuestras facilidades de pago",
    cta: "Quiero mi Tienda",
    waText: "Hola, quisiera una tienda online",
  },
  why: {
    title: "Tu negocio, abierto todo el día.",
    text: "Con una tienda online no dependes de un horario: tus clientes compran cuando quieren, y tu negocio sigue generando ingresos.",
    stats: [
      { value: "39%", title: "Usa WooCommerce", description: "La plataforma de e-commerce más usada del mundo" },
      { value: "5-6", title: "Semanas de entrega", description: "El tiempo necesario para una tienda completa y bien hecha" },
    ],
  },
  process: {
    title: "De no vender en línea, a tener tu tienda lista",
    subtitle: "5-6 semanas, un proceso claro, pensado para que vendas sin contratiempos",
    steps: [
      { title: "Análisis del negocio y catálogo", day: "Semana 1", icon: Search },
      { title: "Diseño de la tienda", day: "Semana 1-2", icon: Palette },
      { title: "Desarrollo, pagos y envíos", day: "Semana 3-5", icon: Code2 },
      { title: "Pruebas, entrega y soporte", day: "Semana 6", icon: Rocket },
    ],
  },
  cases: {
    title: "Tiendas reales. Ventas reales.",
    text: "No son maquetas ni plantillas de muestra. Son negocios que ya venden en línea con una tienda completa y profesional.",
    items: [
      { image: "/images/ecommerce/hevia.png", tag: "Arte y galería", title: "Galería Hevia", description: "Una tienda online que muestra cada pieza con la seriedad que merece una galería de arte", url: "https://galeria-hevia.com" },
      { image: "/images/ecommerce/thebroom.png", tag: "E-commerce", title: "The Broom Society", description: "Catálogo completo, pagos integrados y una experiencia de compra clara de inicio a fin", url: "https://thebroomsociety.com" },
    ],
  },
  includes: {
    title: "Lo que incluye tu inversión",
    subtitle: "Desde $20,000 MXN · No incluye dominio ni hosting",
    items: [
      { icon: ShoppingCart, title: "Catálogo sin límite de productos", description: "Tu inventario completo, sin restricciones" },
      { icon: CreditCard, title: "Facilidades de pago para tus clientes", description: "Múltiples pasarelas y formas de pago integradas" },
      { icon: Clock, title: "Entrega en 5-6 semanas", description: "El tiempo justo para una tienda sólida, sin atajos" },
      { icon: Award, title: "3 meses de soporte después de la entrega", description: "Ajustes y acompañamiento incluidos sin costo extra" },
    ],
  },
  cta: {
    title: "¿Listo para vender en línea?",
    text: "Cuéntanos sobre tu negocio y tu catálogo. Desde ahí definimos el alcance correcto para tu proyecto y te contamos de nuestras facilidades de pago.",
    priceLabel: "Inversión desde",
    price: "$20,000 MXN",
  },
};

export default function Page() {
  return <ServicePage c={config} />;
}
