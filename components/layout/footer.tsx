import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SiFacebook, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { giros } from "@/lib/seo/giros";
import { ciudades } from "@/lib/seo/ciudades";
import { whatsappLink } from "@/lib/seo/oferta";

const columnas = [
  {
    title: "Páginas web",
    links: [
      { label: "Página Express en 72 h", href: "/empezar" },
      { label: "Precios", href: "/precios" },
      { label: "Landing pages", href: "/paginas-web/landing-pages" },
      { label: "Sitio corporativo", href: "/paginas-web/sitio-corporativo" },
      { label: "WordPress", href: "/paginas-web/wordpress" },
      { label: "E-commerce", href: "/paginas-web/ecommerce" },
      { label: "CMS a medida", href: "/paginas-web/cms-custom" },
      { label: "Mantenimiento", href: "/paginas-web/mantenimiento" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Desarrollo de software", href: "/desarrollo-software" },
      { label: "Diseño gráfico", href: "/diseno-grafico" },
      { label: "Outsourcing creativo", href: "/outsourcing" },
      { label: "Para emprendedores", href: "/para-emprendedores" },
      { label: "Portafolio", href: "/portafolio" },
    ],
  },
  {
    title: "Página web para",
    links: giros.map((g) => ({ label: g.titulo, href: `/pagina-web-para/${g.slug}` })),
  },
  {
    title: "Atendemos",
    links: ciudades.map((c) => ({ label: c.nombre, href: `/pagina-web/${c.slug}` })),
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-2xl">
          Lleva tu negocio a Google en 72 horas.
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/empezar"
            className="inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-4 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Empezar mi página
            <ChevronRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappLink("Hola, me gustaría obtener más información sobre sus servicios.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/70 px-6 py-4 text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            <SiWhatsapp className="w-4 h-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid gap-12 lg:grid-cols-[minmax(0,3fr)_repeat(4,minmax(0,2fr))]">
        <div>
          <Image src="/images/logo.svg" alt="Marmo Creativo" width={140} height={40} className="h-10 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-xs">
            Estudio digital mexicano: páginas web, software a medida y diseño gráfico para negocios de todo el país.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <p className="text-white/40 uppercase tracking-[0.15em] text-xs">Contacto</p>
            <a
              href="https://wa.me/525523995604"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/80 hover:text-white transition-colors"
            >
              WhatsApp: +52 55 2399 5604
            </a>
            <a
              href="mailto:marmocreativo@gmail.com"
              className="block text-white/80 hover:text-white transition-colors"
            >
              marmocreativo@gmail.com
            </a>
            <p className="text-white/50">Lunes a viernes · Atención 100% en línea</p>
          </div>

          <a
            href="https://www.facebook.com/profile.php?id=61578199775997"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Marmo Creativo"
            className="mt-8 inline-flex text-white/60 hover:text-white transition-colors"
          >
            <SiFacebook className="w-5 h-5" />
          </a>
        </div>

        {columnas.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm text-white mb-5">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
          <span>© 2026 Marmo Creativo. Todos los derechos reservados.</span>
          <span>Hecho en México por L.D.G. Manuel Marmolejo Martínez</span>
        </div>
      </div>
    </footer>
  );
}