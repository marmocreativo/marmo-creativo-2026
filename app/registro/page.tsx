import type { Metadata } from "next"
import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"
import { RegistroForm } from "./registro-form"

export const metadata: Metadata = {
  title: "Crear cuenta | Marmo Creativo",
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const { callbackUrl } = await searchParams
  const destino = callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/panel"

  return (
    <AuthShell titulo="Crea tu cuenta" subtitulo="Gratis. Te da acceso a nuestras herramientas.">
      <GoogleButton callbackUrl={destino} />
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> o con tu correo <span className="h-px flex-1 bg-border" />
      </div>
      <RegistroForm callbackUrl={destino} />
      <p className="text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  )
}
