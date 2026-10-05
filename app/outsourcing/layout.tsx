import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outsourcing Creativo: Diseño y Desarrollo para Agencias | Marmo Creativo",
  description:
    "Equipo de diseño y desarrollo web a tu disposición: trabajamos en marca blanca para agencias y empresas. Más de 15 años de experiencia.",
  alternates: { canonical: "/outsourcing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
