import type { Metadata } from "next"
import { AreaShell } from "@/components/layout/area-shell"
import { requireUsuario } from "@/lib/session"

export const metadata: Metadata = {
  title: "Mi panel | Marmo Creativo",
  robots: { index: false, follow: false },
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const u = await requireUsuario("/panel")

  const links = [
    { label: "Inicio", href: "/panel" },
    { label: "Historial", href: "/panel/historial" },
    { label: "Mi perfil", href: "/panel/perfil" },
    ...(u.rol === "admin" ? [{ label: "Administración", href: "/admin" }] : []),
  ]

  return (
    <AreaShell eyebrow="Mi panel" titulo={`Hola, ${u.nombre.split(" ")[0]}.`} links={links}>
      {children}
    </AreaShell>
  )
}
