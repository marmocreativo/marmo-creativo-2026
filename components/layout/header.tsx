"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavDropdown } from "./nav-dropdown";

const paginasWebItems = [
  { label: "Página Express en 72 h", href: "/empezar" },
  { label: "Todos los paquetes", href: "/paginas-web" },
  { label: "Landing Pages", href: "/paginas-web/landing-pages" },
  { label: "Sitio Corporativo", href: "/paginas-web/sitio-corporativo" },
  { label: "WordPress", href: "/paginas-web/wordpress" },
  { label: "E-commerce", href: "/paginas-web/ecommerce" },
  { label: "CMS Custom", href: "/paginas-web/cms-custom" },
  { label: "Mantenimiento", href: "/paginas-web/mantenimiento" },
];

const navLinks = [
  { label: "Precios", href: "/precios" },
  { label: "Desarrollo de Software", href: "/desarrollo-software" },
  { label: "Diseño Gráfico", href: "/diseno-grafico" },
  { label: "Outsourcing", href: "/outsourcing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur text-white border-b border-white/10"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 gap-6">
        {/* Izquierda: logo + navegación */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Marmo Creativo"
              width={140}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            <NavDropdown label="Páginas Web" items={paginasWebItems} />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Derecha: WhatsApp + CTA (desktop) y hamburguesa (móvil) */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://wa.me/525523995604"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/empezar"
              className="bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Mi página en 72 h
            </Link>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/logo.svg"
                    alt="Marmo Creativo"
                    width={120}
                    height={36}
                    className="h-9 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                <span className="text-xs font-semibold text-muted-foreground mt-2 mb-1">
                  Páginas Web
                </span>
                {paginasWebItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="h-px bg-border my-2" />

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="h-px bg-border my-2" />

                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href="/empezar"
                    onClick={() => setMobileOpen(false)}
                    className="bg-black text-white px-5 py-3 text-sm font-medium text-center hover:bg-black/90 transition-colors"
                  >
                    Mi página en 72 h
                  </Link>
                  <a
                    href="https://wa.me/525523995604"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="border border-black/60 px-5 py-3 text-sm font-medium text-center hover:bg-black hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}