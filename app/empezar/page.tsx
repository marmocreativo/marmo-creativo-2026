import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EmpezarForm } from "./empezar-form";

export const metadata: Metadata = {
  title: "Empieza tu Página Web en 72 Horas | Marmo Creativo",
  description:
    "Cuéntanos de tu negocio y arrancamos tu página web de $3,500 MXN. Las 72 horas empiezan con tu pago y tu información completa.",
  alternates: { canonical: "/empezar" },
};

const beneficios = [
  "Página profesional lista en 72 horas hábiles",
  "Alta u optimización de tu perfil de Google Maps",
  "Hosting y dominio .com el primer año incluidos",
  "Si no está lista a tiempo, no la pagas",
];

export default function Page() {
  return (
    <section className="relative -mt-20 min-h-screen flex items-center text-white overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landing_bg.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/50" />

      <div className="max-w-7xl mx-auto w-full px-6 pt-32 pb-16 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 lg:gap-20 items-center">
        {/* Izquierda: texto */}
        <div>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">
            Desde $3,500 MXN · Pago único
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
            Empieza tu página web.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
            Cuéntanos lo básico de tu negocio. Con eso armamos tu página y tu perfil de Google Maps.
          </p>

          <ul className="mt-8 space-y-4">
            {beneficios.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/90">
                <Check className="w-5 h-5 text-white shrink-0 mt-0.5" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-white/60 max-w-md">
            Las 72 horas hábiles empiezan cuando recibimos tu pago y tu información completa.
          </p>
        </div>

        {/* Derecha: formulario */}
        <EmpezarForm />
      </div>
    </section>
  );
}