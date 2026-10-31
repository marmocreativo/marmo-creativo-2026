import type { Metadata } from "next"
import { cookies } from "next/headers"
import { AdminShell } from "@/components/admin/admin-shell"
import { requireAdmin } from "@/lib/session"

export const metadata: Metadata = {
  title: "Administración | Marmo Creativo",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin()
  // Estado del menú (completo o solo íconos) guardado por el navegador.
  const colapsado = (await cookies()).get("admin_menu")?.value === "icons"

  return (
    <AdminShell nombre={admin.nombre} avatar={admin.avatar} colapsadoInicial={colapsado}>
      {children}
    </AdminShell>
  )
}
