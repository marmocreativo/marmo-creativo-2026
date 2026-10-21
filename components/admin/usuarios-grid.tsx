import Link from "next/link"
import { Bell, BellOff, KeyRound, ListChecks } from "lucide-react"
import { SiGoogle } from "@icons-pack/react-simple-icons"
import type { Fila } from "@/lib/crm/repo"
import { Badge } from "./badge"

const fecha = (v: unknown) =>
    new Date(String(v).replace(" ", "T") + "Z").toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Mexico_City" })

const iniciales = (nombre: string) =>
    nombre
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("")

export function UsuariosGrid({ usuarios }: { usuarios: Fila[] }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuarios.map((u) => {
                const inactivo = !u.activo
                return (
                    <article
                        key={u.id}
                        className={`rounded-xl border border-border p-6 flex flex-col ${inactivo ? "opacity-60" : ""}`}
                    >
                        <div className="flex items-center gap-4">
                            {u.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={String(u.avatar)}
                                    alt=""
                                    width={56}
                                    height={56}
                                    referrerPolicy="no-referrer"
                                    className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
                                />
                            ) : (
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg font-light text-muted-foreground">
                                    {iniciales(String(u.nombre))}
                                </span>
                            )}
                            <div className="min-w-0">
                                <h3 className="truncate text-xl font-light text-foreground">{u.nombre}</h3>
                                <p className="truncate text-sm text-muted-foreground">{u.email}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Badge valor={String(u.rol)} texto={u.rol === "admin" ? "Administrador" : "Usuario"} />
                            {inactivo && <Badge valor="Inactivo" texto="Cuenta inactiva" />}
                        </div>

                        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                {u.enviar_promociones ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                                {u.enviar_promociones ? "Acepta promociones" : "Sin promociones"}
                            </li>
                            <li className="flex items-center gap-2">
                                {u.con_google ? <SiGoogle className="w-4 h-4" /> : <KeyRound className="w-4 h-4" />}
                                {[u.con_google ? "Google" : null, u.con_password ? "Correo y contraseña" : null].filter(Boolean).join(" y ")}
                            </li>
                            {u.rol === "admin" && (
                                <li className="flex items-center gap-2">
                                    <ListChecks className="w-4 h-4" /> {Number(u.n_tareas_abiertas)} tareas abiertas asignadas
                                </li>
                            )}
                        </ul>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                            <span className="text-xs text-muted-foreground">Alta: {fecha(u.created_at)}</span>
                            <Link href={`/admin/usuarios/${u.id}`} className="text-foreground underline underline-offset-4">
                                Editar
                            </Link>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
