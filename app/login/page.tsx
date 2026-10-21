import type { Metadata } from "next"
import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Iniciar sesión | Marmo Creativo",
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const { callbackUrl } = await searchParams
  const destino = callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/panel"

  return (
    <AuthShell titulo="Inicia sesión" subtitulo="Accede a tu panel y a las herramientas gratuitas.">
      <GoogleButton callbackUrl={destino} />
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> o con tu correo <span className="h-px flex-1 bg-border" />
      </div>
      <LoginForm callbackUrl={destino} />
      <p className="text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="text-foreground underline underline-offset-4">
          Regístrate gratis
        </Link>
      </p>
    </AuthShell>
  )
}
