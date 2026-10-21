import { Award, Clock, Code2, Palette, RefreshCw, Rocket, Search, ShieldCheck } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/site/service-page";

export const metadata = {
  title: "WordPress Profesional para tu Negocio | Marmo Creativo",
  description:
    "Sitio web en WordPress, fácil de actualizar tú mismo, seguro y completo. Diseño a medida desde $8,000 MXN, entrega en 4 semanas.",
  keywords: [
    "página web WordPress México",
    "desarrollo WordPress profesional CDMX",
    "sitio web WordPress para empresa",
    "WordPress fácil de actualizar",
    "página web administrable WordPress",
  ],
  openGraph: {
    title: "WordPress Profesional para tu Negocio | Marmo Creativo",
    description:
      "Sitio web en WordPress, fácil de actualizar tú mismo, seguro y completo.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "WordPress Profesional para tu Negocio - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WordPress Profesional para tu Negocio",
    description:
      "Fácil de actualizar, seguro y completo. Desde $8,000 MXN.",
  },
  alternates: {
    canonical: "/paginas-web/wordpress",
  },
};

const config: ServicePageConfig = {
  portafolio: "wordpress",
  heroBg: "/images/wordpress_bg.jpg",
  eyebrow: "Para negocios que quieren actualizar su sitio sin depender de un programador",
  title: "WordPress profesional que tú mismo puedes gestionar",
  intro:
    "Un sitio web completo, construido en la plataforma más usada del mundo. Fácil de actualizar, seguro y con todo lo que tu negocio necesita.",
  bullets: [
    "Editor intuitivo, sin necesidad de programar",
    "4 semanas de entrega, con 3 meses de soporte incluido",
  ],
  card: {
    title: "WordPress profesional completo",
    subtitle: "Diseño y desarrollo a medida, listo para que lo gestiones tú mismo",
    priceLabel: "Desde",
    price: "$8,000 MXN",
    note: "No incluye dominio ni hosting · Incluye 3 meses de soporte",
    cta: "Quiero mi WordPress",
    waText: "Hola, quisiera un sitio en WordPress",
  },
  why: {
    title: "La plataforma que te da el control.",
    text: "Con WordPress no dependes de nadie para mantener tu sitio al día: tú decides cuándo y qué actualizar.",
    stats: [
      { value: "43%", title: "De la web usa WordPress", description: "La plataforma más usada y respaldada del mundo" },
      { value: "4", title: "Semanas de entrega", description: "El tiempo justo para una estructura completa y bien hecha" },
    ],
  },
  process: {
    title: "De no poder editar tu sitio, a tenerlo bajo tu control",
    subtitle: "4 semanas, un proceso claro, con capacitación incluida",
    steps: [
      { title: "Planificación del sitio y su estructura", day: "Semana 1", icon: Search },
      { title: "Diseño personalizado con tu contenido", day: "Semana 1-2", icon: Palette },
      { title: "Desarrollo en WordPress y capacitación", day: "Semana 2-3", icon: Code2 },
      { title: "Entrega y 3 meses de soporte", day: "Semana 4", icon: Rocket },
    ],
  },
  cases: {
    title: "Negocios reales. Sitios que ellos mismos actualizan.",
    text: "No son maquetas ni plantillas de muestra. Son negocios con presencia profesional en WordPress.",
    items: [
      { image: "/images/wordpress/capetillo.png", tag: "Producciones", title: "Capetillo Producciones", description: "Un sitio que tú mismo puedes actualizar, sin depender de nadie para mantenerlo al día", url: "https://capetilloproducciones.mx" },
      { image: "/images/wordpress/cree.png", tag: "Educación", title: "CREE-IXE", description: "Estructura clara y administrable, pensada para que el contenido se mantenga siempre vigente", url: "https://cree-ixe.com" },
      { image: "/images/wordpress/cazaresperez.png", tag: "Profesional", title: "Cazares Pérez", description: "Presencia profesional con el respaldo y la flexibilidad que da WordPress", url: "https://cazaresperez.com" },
    ],
  },
  includes: {
    title: "Lo que incluye tu inversión",
    subtitle: "Desde $8,000 MXN · No incluye dominio ni hosting",
    items: [
      { icon: RefreshCw, title: "Fácil de actualizar sin programación", description: "Editor intuitivo para que gestiones tu contenido tú mismo" },
      { icon: ShieldCheck, title: "Seguro y siempre actualizado", description: "Actualizaciones y backups que protegen tu sitio" },
      { icon: Clock, title: "Entrega en 4 semanas", description: "El tiempo necesario para una estructura completa, sin atajos" },
      { icon: Award, title: "3 meses de soporte después de la entrega", description: "Ajustes y acompañamiento incluidos sin costo extra" },
    ],
  },
  cta: {
    title: "¿Listo para gestionar tu propio sitio?",
    text: "Cuéntanos sobre tu negocio y lo que necesitas mostrar. Desde ahí definimos el alcance correcto para tu proyecto.",
    priceLabel: "Inversión desde",
    price: "$8,000 MXN",
  },
};

export default function Page() {
  return <ServicePage c={config} />;
}
