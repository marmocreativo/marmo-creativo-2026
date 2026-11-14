import Link from "next/link";
import {
  Code2,
  Download,
  FolderOpen,
  Image as ImageIcon,
  LayoutTemplate,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { PageHero } from "@/components/site/service-page";
import { CheckList, CtaBand, IconCard, Section, SectionHeader, SplitSection } from "@/components/site/blocks";
import { Faq } from "@/components/seo/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/offer-blocks";
import { whatsappLink } from "@/lib/seo/oferta";

const SITE = "https://marmo-creativo.com";
const PATH = "/creador-de-sitios-web";
const TITULO = "Creador de Páginas Web con IA en México | Marmo Creativo";
const DESCRIPCION =
  "Crea tu página web con IA: cuéntanos de tu negocio, elige entre 3 propuestas y exporta tu sitio en HTML con SEO, sitemap e imágenes optimizadas.";

export const metadata = {
  title: TITULO,
  description: DESCRIPCION,
  keywords: [
    "creador de páginas web con IA",
    "generador de sitios web con inteligencia artificial",
    "crear página web con inteligencia artificial",
    "página web para negocio con IA",
    "sitio web HTML optimizado para SEO",
    "crear página web México",
  ],
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: `${SITE}${PATH}`,
    siteName: "Marmo Creativo",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og-web.jpg", width: 1200, height: 630, alt: "Creador de páginas web con IA - Marmo Creativo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creador de Páginas Web con IA | Marmo Creativo",
    description: "Cuéntanos de tu negocio, elige entre 3 propuestas y exporta tu sitio listo para Google.",
    images: ["/og-web.jpg"],
  },
  alternates: { canonical: PATH },
};

const pasos = [
  {
    titulo: "Cuéntanos de tu negocio",
    texto: "Respondes un briefing sencillo y, si quieres, subes documentos de Word o PDF e imágenes de tu negocio.",
  },
  {
    titulo: "Define tu SEO y tu marca",
    texto: "Eliges la frase con la que quieres aparecer en Google (servicio + valor agregado + ubicación), tus colores, tus tipografías y subes tu logo.",
  },
  {
    titulo: "Muéstranos lo que te gusta",
    texto: "Pasas direcciones y capturas de sitios de referencia para que el diseño vaya con tu estilo, sin copiar a nadie.",
  },
  {
    titulo: "Elige entre 3 propuestas",
    texto: "La IA diseña 3 versiones de tu página de inicio, cada una con una dirección distinta. Tú te quedas con la que más te guste.",
  },
  {
    titulo: "Recibe tu sitio completo",
    texto: "Se genera el sitio con su hoja de estilos, tu inicio, hasta 5 páginas de servicio y tu contacto. Lo ajustas y lo exportas en un ZIP.",
  },
];

const incluye = [
  { icon: LayoutTemplate, title: "3 propuestas de diseño", description: "Ves tres versiones reales de tu página de inicio antes de decidir, no una sola opción." },
  { icon: Search, title: "SEO técnico desde el código", description: "Título, descripción, un solo h1, dirección canónica, Open Graph, datos estructurados, sitemap.xml y robots.txt." },
  { icon: ImageIcon, title: "Imágenes en WebP", description: "Tus fotos se convierten a WebP y se organizan en carpetas, listas para cargar rápido." },
  { icon: Code2, title: "Edición total del código", description: "Edita el HTML y el CSS a mano cuando quieras, con vista previa en vivo." },
  { icon: Wand2, title: "Cambios con solo escribirlos", description: "Pides «cambia el botón a verde» y la IA reescribe el código. Tú revisas y guardas: nada cambia sin tu permiso." },
  { icon: FolderOpen, title: "Galería de tu proyecto", description: "Subes tus imágenes una vez y las reutilizas en todas las páginas." },
  { icon: Download, title: "Exportas y es tuyo", description: "Descargas un ZIP con todo el sitio y lo subes a cualquier hosting. Sin ataduras." },
];

const faqs = [
  {
    q: "¿Necesito saber programar o diseñar?",
    a: "No. Llenas un briefing, eliges entre propuestas y pides cambios escribiéndolos con tus palabras. Si sí sabes de código, también puedes editar el HTML y el CSS directamente.",
  },
  {
    q: "¿Qué tipo de sitios puedo crear?",
    a: "Sitios estáticos en HTML y CSS de hasta 7 páginas: inicio, contacto y hasta 5 páginas de servicio. Es ideal para negocios, despachos, clínicas y profesionales que necesitan presencia en línea. No es para tiendas en línea ni sistemas con usuarios.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Estamos abriendo el creador poco a poco y el acceso es por invitación. Escríbenos por WhatsApp y te contamos las condiciones vigentes.",
  },
  {
    q: "¿Mi sitio va a salir en Google?",
    a: "El sitio sale con el SEO técnico bien hecho: etiquetas, estructura, sitemap y velocidad. Dónde aparezcas depende además de tu competencia, tu contenido y el tiempo. Nadie honesto te puede prometer una posición.",
  },
  {
    q: "¿Qué hacen con la información y los documentos que subo?",
    a: "Se usan únicamente para generar tu sitio. El contenido de tu briefing se envía a la IA que elijas al generar (Claude, de Anthropic, o Gemini, de Google) para redactar y diseñar las páginas. No pongas en el briefing contraseñas ni datos que no quieras que aparezcan en tu sitio.",
  },
  {
    q: "¿Puedo editar mi sitio después de generarlo?",
    a: "Sí, todo el tiempo. Cada página y la hoja de estilos se guardan y se pueden editar a mano o con instrucciones escritas. Lo que propone la IA aparece en el editor y solo se guarda cuando tú lo decides.",
  },
  {
    q: "¿Qué pasa si prefiero que lo hagan por mí?",
    a: "También lo hacemos. Con la Página Express te entregamos tu sitio en 72 horas, diseñado por nosotros, con atención personalizada.",
  },
];

export default function Page() {
  const href = whatsappLink("Hola, quiero acceso al creador de sitios web con IA");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Creador de sitios web con IA de Marmo Creativo",
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          description: DESCRIPCION,
          url: `${SITE}${PATH}`,
          inLanguage: "es-MX",
          provider: { "@type": "Organization", name: "Marmo Creativo", url: SITE },
          areaServed: "MX",
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Páginas web", path: "/paginas-web" },
          { name: "Creador de sitios web con IA", path: PATH },
        ]}
      />

      <PageHero
        bg="/images/landing_bg.jpg"
        eyebrow="Creador de sitios web con inteligencia artificial"
        title="Crea tu página web con IA, lista para aparecer en Google"
        intro="Cuéntanos de tu negocio, elige entre 3 propuestas de diseño y recibe un sitio rápido, con SEO bien hecho, que tú puedes editar y exportar cuando quieras."
        bullets={["Sitios en HTML de hasta 7 páginas", "SEO técnico, sitemap e imágenes optimizadas incluidos"]}
      >
        <div className="bg-white text-foreground p-6 sm:p-8 shadow-2xl">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Acceso por invitación</p>
          <h2 className="mt-2 text-2xl font-light">Pruébalo antes que nadie</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Estamos abriendo el creador poco a poco. Escríbenos y te damos acceso para que armes tu sitio.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <SiWhatsapp className="w-4 h-4" />
            Quiero acceso
          </a>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login?callbackUrl=%2Fpanel%2Fsitios" className="text-foreground underline underline-offset-4">
              Entrar al creador
            </Link>
          </p>
        </div>
      </PageHero>

      <SplitSection
        bg="bg-white"
        id="como-funciona"
        title="De tu idea a tu sitio en 5 pasos"
        text="Un proceso guiado, sin tecnicismos. Puedes pausar y continuar cuando quieras: todo se guarda."
      >
        <ol className="space-y-8">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-foreground text-sm text-background">{i + 1}</span>
              <div>
                <h3 className="text-xl font-light text-foreground">{p.titulo}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </SplitSection>

      <Section bg="bg-neutral-100">
        <SectionHeader
          title="Lo que recibes con tu sitio"
          text="No es una plantilla genérica: el diseño y los textos salen de tu negocio, con una base técnica pensada para Google."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {incluye.map((i) => (
            <IconCard key={i.title} icon={i.icon} title={i.title} description={i.description} />
          ))}
        </div>
      </Section>

      <SplitSection
        bg="bg-white"
        title="Hecho para sitios sencillos, y bien hechos"
        text="Para que no pierdas tiempo ni dinero, te decimos con claridad para qué sirve y para qué no."
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-light text-foreground">
              <Sparkles className="h-5 w-5 text-primary" /> Es ideal si
            </h3>
            <CheckList
              items={[
                "Necesitas presencia en línea para tu negocio o tu práctica profesional",
                "Quieres presentar tus servicios y que te contacten por WhatsApp o correo",
                "Quieres un sitio rápido, en tu propio dominio y hosting",
                "Prefieres tener el control de tu sitio sin depender de nadie",
              ]}
            />
          </div>
          <div>
            <h3 className="mb-5 text-xl font-light text-foreground">No es para</h3>
            <CheckList
              tone="muted"
              items={["Tiendas en línea con carrito y pagos", "Sistemas con usuarios, cuentas o bases de datos", "Sitios de más de 7 páginas"]}
            />
            <p className="mt-6 text-sm text-muted-foreground">
              Para eso mira nuestros{" "}
              <Link href="/paginas-web" className="text-foreground underline underline-offset-4">
                paquetes de páginas web
              </Link>{" "}
              o el{" "}
              <Link href="/paginas-web/ecommerce" className="text-foreground underline underline-offset-4">
                e-commerce
              </Link>
              .
            </p>
          </div>
        </div>
      </SplitSection>

      <Faq items={faqs} title="Dudas sobre el creador de sitios con IA" />

      <CtaBand
        bg="bg-neutral-100"
        title="¿Quieres armar tu sitio con IA?"
        text="Escríbenos, te damos acceso y en poco tiempo tienes tu página lista. Si prefieres que lo hagamos nosotros, también podemos: Página Express en 72 horas."
        cta="Quiero acceso al creador"
        href={href}
        notes={["Acceso por invitación", "Exportas tu sitio y es tuyo"]}
      />
    </>
  );
}
