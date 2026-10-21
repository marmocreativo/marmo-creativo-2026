import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import type { Fila } from "@/lib/crm/repo"
import { Badge } from "./badge"

const boton =
    "flex-1 rounded-lg border border-border px-3 py-2 text-center hover:border-foreground transition-colors"

export function ClientesGrid({ clientes }: { clientes: Fila[] }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientes.map((c) => (
                <article key={c.id} className="rounded-xl border border-border p-6 flex flex-col">
                    <div className="flex items-start gap-3">
                        {c.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={String(c.logo)} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover" />
                        ) : null}
                        <h3 className="min-w-0 flex-1 text-xl font-light text-foreground">{c.nombre}</h3>
                        <Badge valor={String(c.estado)} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge valor={String(c.tipo)} />
                        <span className="text-xs text-muted-foreground">/{c.carpeta}</span>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-muted-foreground min-h-10">
                        {c.email && (
                            <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" />{c.email}</p>
                        )}
                        {c.direccion && (
                            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" />{c.direccion}</p>
                        )}
                    </div>

                    <div className="mt-5 flex gap-3 text-sm">
                        <Link href={`/admin/contactos?id_cliente=${c.id}`} className={boton}>
                            <span className="block text-3xl font-light text-foreground">{c.n_contactos}</span>
                            Contactos
                        </Link>
                        <Link href={`/admin/proyectos?id_cliente=${c.id}`} className={boton}>
                            <span className="block text-3xl font-light text-foreground">{c.n_proyectos}</span>
                            Proyectos
                        </Link>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <Link href={`/admin/tareas?id_cliente=${c.id}`} className="text-muted-foreground hover:text-foreground">
                            {Number(c.n_tareas_abiertas)} tareas abiertas
                        </Link>
                        <Link href={`/admin/clientes/${c.id}`} className="text-foreground underline underline-offset-4">
                            Editar
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}
