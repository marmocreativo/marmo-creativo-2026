import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { PageHero } from "@/components/site/service-page";
import { btnLight, CtaBand, IconCard, PlansTable, Section, SectionHeader, SplitSection, type Plan } from "@/components/site/blocks";
import { whatsappLink } from "@/lib/seo/oferta";

export const metadata = {
  title: "Páginas Web Profesionales | Marmo Creativo",
  description:
    "Landing pages, sitios corporativos, WordPress, e-commerce, CMS a medida y mantenimiento web. Soluciones a la medida de tu negocio, en Marmo Creativo.",
  keywords: [
    "páginas web México",
    "desarrollo web profesional CDMX",
    "landing page sitio corporativo e-commerce",
    "agencia de desarrollo web",
    "diseño y desarrollo de páginas web a medida",
  ],
  openGraph: {
    title: "Páginas Web Profesionales | Marmo Creativo",
    description:
      "Landing pages, sitios corporativos, WordPress, e-commerce, CMS a medida y mantenimiento web.",
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-web.jpg",
        width: 1200,
        height: 630,
        alt: "Páginas Web Profesionales - Marmo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas Web Profesionales",
    description:
      "Desde landing pages hasta sistemas a medida. Soluciones para cada tipo de negocio.",
  },
  alternates: {
    canonical: "/paginas-web",
  },
};

const whyUs = [
  { icon: Zap, title: "Velocidad optimizada", description: "Carga rápida garantizada para mejor experiencia de usuario" },
  { icon: Shield, title: "Seguridad total", description: "SSL certificado y protección contra amenazas" },
  { icon: Users, title: "Fácil de usar", description: "Interfaces intuitivas que cualquiera puede manejar" },
  { icon: Star, title: "Soporte continuo", description: "Asistencia técnica cuando la necesites" },
];

const featuredPackages: Plan[] = [
  {
    name: "Landing Page",
    price: "$5,000",
    unit: "MXN",
    note: "Entrega: 2 semanas",
    lead: "Una sola página, bien hecha, para negocios que necesitan resolver su presencia en línea de forma simple y directa.",
    cta: "Ver detalles",
    href: "/paginas-web/landing-pages",
  },
  {
    name: "Sitio Corporativo",
    badge: "Más elegido",
    price: "$7,000",
    unit: "MXN",
    note: "Entrega: 3-4 semanas",
    lead: "Estructura completa con varias secciones, pensado para empresas con trayectoria que necesitan respaldar su presencia.",
    cta: "Ver detalles",
    href: "/paginas-web/sitio-corporativo",
    featured: true,
  },
  {
    name: "CMS Personalizado",
    price: "A medida",
    note: "Entrega: según alcance",
    lead: "Sistemas construidos 100% a la medida cuando tu negocio tiene procesos que ninguna solución estándar resuelve.",
    cta: "Ver detalles",
    href: "/paginas-web/cms-custom",
  },
];

const secondaryPackages = [
  { icon: FileText, title: "WordPress", price: "$8,000", delivery: "4 semanas", href: "/paginas-web/wordpress" },
  { icon: ShoppingCart, title: "E-commerce", price: "$20,000", delivery: "5-6 semanas", href: "/paginas-web/ecommerce" },
  { icon: RefreshCw, title: "Mantenimiento", price: "Desde $800/mes", delivery: "Planes mensuales", href: "/paginas-web/mantenimiento" },
];

export default function Page() {
  return (
    <>
      <PageHero
        bg="/images/web_bg.jpg"
        eyebrow="Páginas web profesionales"
        title="Tu presencia digital profesional."
        intro="Creamos sitios web que convierten visitantes en clientes. Desde landing pages hasta sistemas a medida, tenemos la solución correcta para tu negocio."
        actions={
          <>
            <a href="#paquetes" className={btnLight}>
              Ver paquetes
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappLink("Hola, quisiera una consulta gratis")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <SiWhatsapp className="w-4 h-4" />
              O pide una consulta gratis
            </a>
          </>
        }
      />

      <SplitSection
        bg="bg-white"
        title="¿Por qué elegir nuestros sitios web?"
        text="Cada sitio que creamos está pensado para generar resultados reales para tu negocio."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {whyUs.map((w) => (
            <IconCard key={w.title} {...w} />
          ))}
        </div>
      </SplitSection>

      <Section bg="bg-neutral-100" id="paquetes">
        <SectionHeader title="Nuestros paquetes" text="Soluciones pensadas para cada etapa de tu negocio." />
        <PlansTable plans={featuredPackages} />

        <div className="mt-8 rounded-xl border border-foreground/80 bg-white overflow-hidden">
          <div className="bg-neutral-100 border-b border-foreground/80 px-6 py-5">
            <h3 className="text-xl font-light text-foreground">Otros servicios</h3>
          </div>
          <ul className="divide-y divide-border">
            {secondaryPackages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_2fr_1fr_1fr_auto] items-center gap-4 px-6 py-5 hover:bg-neutral-50 transition-colors"
                >
                  <p.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">{p.title}</span>
                  <span className="hidden md:block text-sm text-foreground">{p.price}</span>
                  <span className="hidden md:block text-sm text-muted-foreground">{p.delivery}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          ¿Prefieres algo rápido y económico?{" "}
          <Link href="/precios" className="text-primary underline underline-offset-4">
            Mira la Página Express en 72 horas desde $3,500 MXN
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        bg="bg-white"
        title="¿Necesitas algo diferente?"
        text="Cada proyecto es único. Platiquemos sobre tus necesidades específicas y encontremos la solución correcta para tu negocio."
        cta="Contactar ahora"
        href={whatsappLink("Hola, quisiera platicar sobre mi proyecto")}
      />
    </>
  );
}
