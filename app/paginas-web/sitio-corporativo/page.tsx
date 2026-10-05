import { Award, Building2, Clock, Code2, Palette, Rocket, Search, ShieldCheck } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/site/service-page";

export const metadata = {
  title: "Sitio Corporativo para Empresas Grandes | Marmo Creativo",
  description:
    "Un sitio web a la altura de tu empresa: múltiples secciones, estructura sólida y presencia digital que respalda tu trayectoria. Desde $7,000 MXN, entrega en 3-4 semanas.",
  keywords: [
    "sitio corporativo para empresas México",
    "página web para empresa grande",
    "desarrollo web corporativo CDMX",
    "sitio web institucional profesional",
    "página web empresarial Next.js",
  ],
  openGraph: {
    title: "Sitio Corporativo para Empresas Grandes | Marmo Creativo",
    description:
      "Un sitio web a la altura de tu empresa: múltiples secciones, estructura sólida y presencia digital que respalda tu trayectoria.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Sitio Corporativo para Empresas Grandes - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitio Corporativo para Empresas Grandes",
    description:
      "Estructura sólida, varias secciones, presencia digital seria. Desde $7,000 MXN.",
  },
  alternates: {
    canonical: "/paginas-web/sitio-corporativo",
  },
};

const config: ServicePageConfig = {
  heroBg: "/images/corporativo_bg.jpg",
  eyebrow: "Para empresas que necesitan una estructura sólida, no una sola página",
  title: "Un sitio web a la altura de tu empresa",
  intro:
    "Si tu empresa ya tiene trayectoria, necesitas algo más que una landing page: un sitio con varias secciones que organice toda tu información y transmita la solidez que tu negocio ya tiene.",
  bullets: [
    "Varias secciones, cada una con su propósito claro",
    "3-4 semanas de entrega, con 3 meses de soporte incluido",
  ],
  card: {
    title: "Sitio Corporativo para tu empresa",
    subtitle: "Diseño y desarrollo a medida, con estructura completa",
    priceLabel: "Desde",
    price: "$7,000 MXN",
    note: "No incluye dominio ni hosting · Incluye 3 meses de soporte",
    cta: "Quiero mi Sitio Corporativo",
    waText: "Hola, quisiera un sitio corporativo",
  },
  why: {
    title: "Tu empresa ya creció. Tu sitio web debe reflejarlo.",
    text: "Una sola página no alcanza para comunicar todo lo que tu empresa ofrece. Necesitas estructura, orden y varias secciones que respalden tu trayectoria.",
    stats: [
      { value: "5+", title: "Secciones a medida", description: "Inicio, nosotros, servicios, equipo, contacto y más" },
      { value: "3-4", title: "Semanas de entrega", description: "El tiempo necesario para una estructura sólida, sin atajos" },
    ],
  },
  process: {
    title: "De una estructura dispersa, a un sitio completo y sólido",
    subtitle: "3-4 semanas, un proceso ordenado, pensado para empresas con historia",
    steps: [
      { title: "Análisis de tu empresa y estructura de contenido", day: "Semana 1", icon: Search },
      { title: "Arquitectura del sitio y diseño visual", day: "Semana 1-2", icon: Palette },
      { title: "Desarrollo de todas las secciones", day: "Semana 2-3", icon: Code2 },
      { title: "Revisión, ajustes y entrega final", day: "Semana 4", icon: Rocket },
    ],
  },
  cases: {
    title: "Empresas reales. Estructuras reales.",
    text: "No son maquetas ni plantillas de muestra. Son empresas que organizaron toda su información en un sitio completo y serio.",
    items: [
      { image: "/images/corporativo/reikitamashi.png", tag: "Holísticos", title: "Reiki Tamashi", description: "Un sitio con varias secciones que organiza servicios, equipo y contacto sin perder claridad", url: "https://reikitamashi.com" },
      { image: "/images/corporativo/geneticlab.png", tag: "Laboratorios y medicina", title: "Geneticlab", description: "Laboratorio de diagnóstico molecular oncológico fundado en 2019, con más de 5,300 pruebas procesadas para médicos oncólogos, instituciones clínicas y laboratorios de referencia en México.", url: "https://geneticlab.mx" },
    ],
  },
  includes: {
    title: "Lo que incluye tu inversión",
    subtitle: "Desde $7,000 MXN · No incluye dominio ni hosting",
    items: [
      { icon: Building2, title: "Estructura completa para empresas grandes", description: "Varias secciones organizadas: nosotros, servicios, equipo y más" },
      { icon: ShieldCheck, title: "Presencia digital que respalda tu trayectoria", description: "Diseño serio, acorde al tamaño y peso de tu empresa" },
      { icon: Clock, title: "Entrega en 3-4 semanas", description: "El tiempo justo para una estructura sólida, bien planeada" },
      { icon: Award, title: "3 meses de soporte después de la entrega", description: "Ajustes y acompañamiento incluidos sin costo extra" },
    ],
  },
  cta: {
    title: "¿Listo para un sitio a la altura de tu empresa?",
    text: "Cuéntanos sobre tu empresa y la estructura que necesitas. Desde ahí definimos el alcance correcto para tu proyecto.",
    priceLabel: "Inversión desde",
    price: "$7,000 MXN",
  },
};

export default function Page() {
  return <ServicePage c={config} />;
}
