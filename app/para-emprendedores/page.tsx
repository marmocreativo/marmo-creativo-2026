import type { Metadata } from "next";
import EmprendedoresContent from "./emprendedores-content";

export const metadata: Metadata = {
  title: "Página Web Corporativa para el Emprendedor Exitoso | Marmo Creativo",
  description:
    "Sitio web corporativo a la medida, sin plantillas ni IA genérica. Diseño profesional listo en 2-3 semanas. Para negocios que ya merecen verse como lo que son.",
};

export default function Page() {
  return <EmprendedoresContent />;
}