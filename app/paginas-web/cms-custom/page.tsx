import { Award, Building, Code2, Infinity as InfinityIcon, Palette, Rocket, Search, ShieldCheck, Users } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/site/service-page";

export const metadata = {
  title: "CMS Personalizado / Desarrollo a Medida | Marmo Creativo",
  description:
    "Sistemas de gestión de contenido construidos a la medida de tu negocio, con tecnologías modernas como Laravel, React y Supabase. Cotización a medida según tu proyecto.",
  keywords: [
    "CMS personalizado México",
    "desarrollo de software a medida",
    "sistema de gestión de contenido custom",
    "desarrollo Laravel React México",
    "software empresarial a medida CDMX",
  ],
  openGraph: {
    title: "CMS Personalizado / Desarrollo a Medida | Marmo Creativo",
    description:
      "Sistemas de gestión de contenido construidos a la medida de tu negocio, con tecnologías modernas.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "CMS Personalizado / Desarrollo a Medida - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMS Personalizado / Desarrollo a Medida",
    description:
      "Cada línea de código a tu medida. Cotización según tu proyecto.",
  },
  alternates: {
    canonical: "/paginas-web/cms-custom",
  },
};

const config: ServicePageConfig = {
  heroBg: "/images/custom_bg.jpg",
  eyebrow: "Para negocios cuyos procesos no caben en una solución estándar",
  title: "Un CMS construido para tu negocio único",
  intro:
    "Cuando las soluciones estándar no cubren lo que tu negocio necesita, construimos un sistema a la medida, con tecnologías modernas como Laravel, React y Supabase.",
  bullets: [
    "Cada funcionalidad pensada para tu proceso real",
    "12 meses de soporte incluido después de la entrega",
  ],
  card: {
    title: "CMS personalizado",
    subtitle: "Construido desde cero, a la medida de tu negocio",
    priceLabel: "Inversión",
    price: "Cotización a medida",
    priceNote: "Cada proyecto es distinto, lo cotizamos según tu alcance",
    note: "Consulta inicial sin costo · Incluye 12 meses de soporte",
    cta: "Platícanos tu proyecto",
    waText: "Hola, quisiera platicar sobre un CMS personalizado",
  },
  why: {
    title: "Hecho a tu medida, de principio a fin.",
    text: "Un sistema pensado para cómo trabaja tu negocio, con acompañamiento extendido después de la entrega.",
    stats: [
      { value: "100%", title: "A tu medida", description: "Cada funcionalidad pensada para tu proceso real" },
      { value: "12", title: "Meses de soporte sin costo", description: "Acompañamiento extendido después de la entrega" },
      { value: "4", title: "Tecnologías de vanguardia", description: "Laravel, React, Supabase y TypeScript" },
    ],
  },
  extra: {
    title: "¿Cuándo necesitas algo hecho a tu medida?",
    text: "Las soluciones estándar no siempre cubren las necesidades específicas de cada empresa.",
    items: [
      { icon: Building, title: "Procesos únicos", description: "Flujos de trabajo que no se adaptan a soluciones estándar" },
      { icon: Users, title: "Múltiples roles", description: "Diferentes niveles de acceso y permisos" },
      { icon: InfinityIcon, title: "Escalabilidad extrema", description: "Una base sólida para crecer significativamente" },
    ],
  },
  process: {
    title: "Nuestro proceso de desarrollo",
    subtitle: "Metodología ágil, pensada para llegar a un resultado sólido",
    steps: [
      { title: "Descubrimiento y análisis de requisitos", day: "Fase 1", icon: Search },
      { title: "Arquitectura y planificación del sistema", day: "Fase 2", icon: Palette },
      { title: "Desarrollo con metodología ágil", day: "Fase 3", icon: Code2 },
      { title: "Entrega, capacitación y 12 meses de soporte", day: "Fase 4", icon: Rocket },
    ],
  },
  cases: {
    title: "Proyectos reales. Sistemas a la medida.",
    text: "No son maquetas ni plantillas de muestra. Son sistemas construidos desde cero para necesidades específicas.",
    items: [
      { image: "/images/custom/fitbyblue.png", tag: "Fitness", title: "Fit by Blue", description: "Plataforma a medida para gestionar usuarios y procesos propios del negocio", url: "https://fitbyblue.mx" },
      { image: "/images/custom/review.png", tag: "Certificaciones", title: "TOEIC MX", description: "Sistema de gestión de citas y exámenes de certificación construido desde cero", url: "https://toeic.mx" },
      { image: "/images/custom/diahmoes.png", tag: "Negocio a medida", title: "Diah Moes", url: "https://www.diahmoes.com.mx" },
    ],
  },
  includes: {
    title: "Lo que incluye tu proyecto",
    subtitle: "Cotización a medida · Consulta inicial sin costo",
    items: [
      { icon: Code2, title: "100% personalizado", description: "Cada línea de código construida para tu proceso, no una plantilla" },
      { icon: Rocket, title: "Tecnologías modernas", description: "Stack de vanguardia para máximo rendimiento y escalabilidad" },
      { icon: ShieldCheck, title: "Seguridad de nivel empresarial", description: "Protocolos pensados para proteger tu información" },
      { icon: Award, title: "12 meses de soporte después de la entrega", description: "Acompañamiento extendido, sin costo extra" },
    ],
  },
  cta: {
    title: "¿Listo para resolver tu proceso único?",
    text: "Cuéntanos qué necesita tu negocio. Analizamos tu caso y te cotizamos el alcance correcto para tu proyecto.",
    priceLabel: "Inversión",
    price: "Cotización a medida",
  },
};

export default function Page() {
  return <ServicePage c={config} />;
}
