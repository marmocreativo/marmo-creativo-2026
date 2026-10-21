import { Award, Clock, Code2, Palette, Rocket, Search, ShieldCheck, Wrench } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/site/service-page";

export const metadata = {
  title: "Landing Pages para Empresas con Trayectoria | Marmo Creativo",
  description:
    "Si no tienes presencia en línea, o la que tienes está vieja, una landing page simple y directa resuelve eso. Diseño a medida desde $5,000 MXN, entrega en 2 semanas.",
  keywords: [
    "landing page para empresas México",
    "landing page simple y rápida de implementar",
    "página web para negocio sin sitio web",
    "landing page profesional CDMX",
    "página web para empresa con trayectoria",
    "desarrollo web Next.js México",
  ],
  openGraph: {
    title: "Landing Pages para Empresas con Trayectoria | Marmo Creativo",
    description:
      "Si no tienes presencia en línea, o la que tienes está vieja, una landing page simple y directa resuelve eso.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Landing Pages para Empresas con Trayectoria - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Pages para Empresas con Trayectoria",
    description:
      "Simple, directa y a la altura de tu empresa. Desde $5,000 MXN.",
  },
  alternates: {
    canonical: "/paginas-web/landing-pages",
  },
};

const config: ServicePageConfig = {
  portafolio: "landing-pages",
  heroBg: "/images/landing_bg.jpg",
  eyebrow: "Para empresas que necesitan resolver esto simple y directo",
  title: "¿Tu negocio no tiene presencia en línea, o la que tiene está vieja?",
  intro:
    "Una landing page resuelve esto sin complicarte: una sola página, bien diseñada, lista para que tu negocio finalmente exista en internet como debería.",
  bullets: [
    "Una sola página, enfocada en lo que realmente importa",
    "Lista en 2 semanas, con 2 meses de soporte incluido",
  ],
  card: {
    title: "Landing Page para tu negocio",
    subtitle: "Diseño y desarrollo a medida, simple y directo",
    priceLabel: "Desde",
    price: "$5,000 MXN",
    note: "No incluye dominio ni hosting · Incluye 2 meses de soporte",
    cta: "Quiero mi Landing Page",
    waText: "Hola, quisiera una landing page",
  },
  why: {
    title: "Lo simple, bien hecho, vende.",
    text: "No necesitas un sitio enorme. Necesitas una página que diga lo correcto, en el momento correcto, y no te falle.",
    stats: [
      { value: "1", title: "Sola página, bien hecha", description: "Sin secciones de relleno, sin contenido que nadie va a leer" },
      { value: "2", title: "Semanas de entrega", description: "El tiempo justo para hacerlo bien sin que se alargue" },
      { value: "3", title: "Meses de soporte sin costo", description: "Ajustes y acompañamiento incluidos después de la entrega" },
    ],
  },
  process: {
    title: "De no existir en línea, a tener tu página lista",
    subtitle: "2 semanas, un proceso claro, sin complicaciones de por medio",
    steps: [
      { title: "Entendemos qué necesitas comunicar", day: "Semana 1", icon: Search },
      { title: "Diseñamos con tu contenido real", day: "Semana 1", icon: Palette },
      { title: "Construimos y probamos en todos los dispositivos", day: "Semana 2", icon: Code2 },
      { title: "Entrega y 2 meses de soporte", day: "Semana 2", icon: Rocket },
    ],
  },
  cases: {
    title: "Negocios reales. Resultados reales.",
    text: "No son maquetas ni plantillas de muestra. Son empresas que dejaron de ser invisibles en línea, con una sola página bien hecha.",
    items: [
      { image: "/images/landing/electro-embobinados-v.png", tag: "Industria pesada", title: "Electro Embobinados Industriales", description: "Pasaron de no tener presencia en línea a una página que comunica sus 40 años de experiencia con la seriedad que merecen", url: "https://electroembobinadosindustriales.com" },
      { image: "/images/landing/ascentica-v.png", tag: "Hospitales y corporativos", title: "Ascentica Elevadores", description: "Una sola página, enfocada en una sola cosa: que el cliente correcto los encuentre y los contacte de inmediato", url: "https://elevadoresascentica.com.mx/elevador-fuera-de-servicio/" },
    ],
  },
  includes: {
    title: "Lo que incluye tu inversión",
    subtitle: "Desde $5,000 MXN · No incluye dominio ni hosting",
    items: [
      { icon: Wrench, title: "Contenido real de tu negocio, no relleno genérico", description: "Tus servicios, tus números, tu forma de trabajar, no textos de plantilla" },
      { icon: ShieldCheck, title: "Se ve igual de seria en el celular que en la laptop", description: "Tu cliente la va a abrir desde WhatsApp, no solo desde escritorio" },
      { icon: Clock, title: "Lista en 2 semanas, sin vueltas", description: "Una sola página, hecha con cuidado, sin procesos eternos" },
      { icon: Award, title: "2 meses de soporte después de la entrega", description: "Si algo necesita ajuste, ahí estamos, sin costo extra" },
    ],
  },
  cta: {
    title: "¿Listo para existir en línea como debería ser?",
    text: "Cuéntanos de tu negocio y de lo que necesitas comunicar. Desde ahí definimos el alcance correcto para tu proyecto.",
    priceLabel: "Inversión desde",
    price: "$5,000 MXN",
  },
};

export default function Page() {
  return <ServicePage c={config} />;
}
