import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiFacebook } from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="relative w-full text-secondary-foreground overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/footer_bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* CTA */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-10 text-center shadow-2xl">
          <h3 className="text-2xl font-bold">
            ¿Listo para impulsar tu proyecto?
          </h3>
          <p className="mt-2 text-secondary-foreground/80">
            Contáctanos y hagamos realidad tu siguiente proyecto digital.
          </p>
          <Button
            size="lg"
            className="mt-6 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:shadow-[0_0_45px_rgba(220,38,38,0.8)] transition-shadow"
            asChild
          >
            <a
              href="https://wa.me/525523995604?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar Ahora
            </a>
          </Button>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative container mx-auto px-4 py-8 border-t border-accent/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo.svg"
              alt="Marmo Creativo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-secondary-foreground/70 max-w-sm">
              Transformamos empresas a través de soluciones digitales
              estratégicas que generan resultados medibles.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61578199775997"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center hover:bg-accent/20 transition-colors"
            >
              <SiFacebook className="w-5 h-5 text-accent" />
            </a>
            <div className="text-sm text-secondary-foreground/70">
              © 2026 Marmo Creativo. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}