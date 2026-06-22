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
  { label: "Landing Pages", href: "/paginas-web/landing-pages" },
  { label: "Sitio Corporativo", href: "/paginas-web/sitio-corporativo" },
  { label: "WordPress", href: "/paginas-web/wordpress" },
  { label: "E-commerce", href: "/paginas-web/ecommerce" },
  { label: "CMS Custom", href: "/paginas-web/cms-custom" },
  { label: "UX/UI", href: "/paginas-web/ux-ui" },
  { label: "Mantenimiento", href: "/paginas-web/mantenimiento" },
];

const herramientasItems = [
  { label: "Generador QR", href: "/herramientas/generador-qr" },
  { label: "Botón WhatsApp", href: "/herramientas/boton-whatsapp" },
  { label: "Paleta de colores", href: "/herramientas/paleta-colores" },
];

const navLinks = [
  { label: "Desarrollo de Software", href: "/desarrollo-software" },
  { label: "Diseño Gráfico", href: "/diseno-grafico" },
  { label: "Outsourcing Creativo", href: "/outsourcing" },
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
          ? "bg-secondary text-secondary-foreground border-b shadow-sm"
          : "bg-transparent text-secondary-foreground"
      }`}
    >
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-[auto_1fr_auto] items-center h-20 px-4 gap-4">
        {/* Columna 1: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Marmo Creativo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Columna 2: Nav centrado (desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-6">
          <NavDropdown label="Páginas Web" items={paginasWebItems} />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <NavDropdown label="Herramientas" items={herramientasItems} />
        </nav>

        {/* Columna 3: Login (desktop) + hamburguesa (móvil) */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="secondary" size="sm">
              Iniciar sesión
            </Button>
            <Button size="sm">Registrarse</Button>
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

                <span className="text-xs font-semibold text-muted-foreground mb-1">
                  Herramientas
                </span>
                {herramientasItems.map((item) => (
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

                <div className="flex flex-col gap-2 mt-2">
                  <Button variant="outline" className="w-full">
                    Iniciar sesión
                  </Button>
                  <Button className="w-full">Registrarse</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}