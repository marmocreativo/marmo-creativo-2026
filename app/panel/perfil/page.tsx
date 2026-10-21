import { requireUsuario } from "@/lib/session"
import { PerfilForm } from "./perfil-form"

export default async function Page() {
  const u = await requireUsuario("/panel/perfil")

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8">Mi perfil</h2>
      <PerfilForm
        nombre={u.nombre}
        email={u.email}
        promos={!!u.enviar_promociones}
        conPassword={!!u.password_hash}
        avatar={u.avatar}
      />
    </div>
  )
}
