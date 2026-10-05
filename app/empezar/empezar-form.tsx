"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { whatsappLink } from "@/lib/seo/oferta";

const inputClass =
  "w-full border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors";

const requeridos = [
  { name: "giro", label: "¿A qué se dedica tu negocio?", placeholder: "Ej. Consultorio dental" },
  { name: "negocio", label: "Nombre del negocio", placeholder: "Ej. Dental Sonrisa" },
] as const;

const opcionales = [
  { name: "direccion", label: "Dirección o zona de servicio", placeholder: "Calle, colonia, ciudad" },
  { name: "colores", label: "Colores o estilo", placeholder: "Ej. azul y blanco, minimalista" },
  { name: "dominio", label: "Dominio que quisieras", placeholder: "Ej. dentalsonrisa.com" },
] as const;

export function EmpezarForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [textos, setTextos] = useState("");
  const [mas, setMas] = useState(false);

  const set = (name: string, value: string) => setV((p) => ({ ...p, [name]: value }));
  const valid = ["giro", "negocio", "nombre", "whatsapp"].every((k) => v[k]?.trim());

  const linea = (label: string, key: string) => `• ${label}: ${v[key]?.trim() || "—"}`;
  const mensaje = [
    "Hola, quiero mi Página Express en 72 horas. Estos son mis datos:",
    linea("Giro", "giro"),
    linea("Negocio", "negocio"),
    linea("Mi nombre", "nombre"),
    linea("Mi WhatsApp", "whatsapp"),
    ...opcionales.map((c) => linea(c.label, c.name)),
    `• Servicios o textos: ${textos.trim() || "—"}`,
    "",
    "Te mando por este chat mi logo y fotos.",
  ].join("\n");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        window.open(whatsappLink(mensaje), "_blank", "noopener,noreferrer");
      }}
      className="bg-white text-foreground p-6 sm:p-8 shadow-2xl space-y-4"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-light">Cuéntanos de tu negocio</h2>
        <p className="text-sm text-muted-foreground">Toma menos de 2 minutos.</p>
      </div>

      {requeridos.map((c) => (
        <input
          key={c.name}
          className={inputClass}
          placeholder={c.placeholder}
          aria-label={c.label}
          required
          value={v[c.name] ?? ""}
          onChange={(e) => set(c.name, e.target.value)}
        />
      ))}

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          className={inputClass}
          placeholder="Tu nombre"
          aria-label="Tu nombre"
          required
          value={v.nombre ?? ""}
          onChange={(e) => set("nombre", e.target.value)}
        />
        <input
          className={inputClass}
          type="tel"
          placeholder="Tu WhatsApp"
          aria-label="Tu WhatsApp"
          required
          value={v.whatsapp ?? ""}
          onChange={(e) => set("whatsapp", e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={() => setMas((m) => !m)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${mas ? "rotate-180" : ""}`} />
        Agregar más detalles (opcional)
      </button>

      {mas && (
        <div className="space-y-4">
          {opcionales.map((c) => (
            <input
              key={c.name}
              className={inputClass}
              placeholder={c.label}
              aria-label={c.label}
              value={v[c.name] ?? ""}
              onChange={(e) => set(c.name, e.target.value)}
            />
          ))}
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Servicios, horarios o lo que quieras decir de tu negocio"
            aria-label="Servicios o textos"
            value={textos}
            onChange={(e) => setTextos(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!valid}
        className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <SiWhatsapp className="w-4 h-4" />
        Enviar por WhatsApp
      </button>

      <p className="text-xs text-muted-foreground">
        Se abre WhatsApp con tu información lista. Ahí mismo nos mandas tu logo y tus fotos.
      </p>
    </form>
  );
}