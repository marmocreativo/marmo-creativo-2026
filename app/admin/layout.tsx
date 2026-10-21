import type { Metadata } from "next"
import { AreaShell } from "@/components/layout/area-shell"
import { requireAdmin } from "@/lib/session"
import { recursos } from "@/lib/crm/recursos"

export const metadata: Metadata = {
  title: "Administración | Marmo Creativo",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  const links = [
    { label: "Resumen", href: "/admin" },
    ...Object.values(recursos).map((r) => ({ label: r.plural, href: `/admin/${r.slug}` })),
    { label: "Configuración", href: "/admin/configuracion" },
    { label: "Mi panel", href: "/panel" },
  ]

  return (
    <AreaShell eyebrow="Administración" titulo="CRM y usuarios" links={links}>
      {children}
    </AreaShell>
  )
}
