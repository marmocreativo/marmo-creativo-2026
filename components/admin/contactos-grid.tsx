import Link from "next/link"
import { Building2, Mail, User } from "lucide-react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import type { Fila } from "@/lib/crm/repo"
import { Badge } from "./badge"

// Número para wa.me: con "+" se respeta el código de país; con 10 dígitos se asume México (52).
function enlaceWhatsapp(raw: string) {
    const digitos = raw.replace(/\D/g, "")
    const numero = raw.trim().startsWith("+") ? digitos : digitos.length === 10 ? `52${digitos}` : digitos
    return `https://wa.me/${numero}`
}

export function ContactosGrid({ contactos }: { contactos: Fila[] }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactos.map((c) => (
                <article key={c.id} className={`rounded-xl border border-border p-6 flex flex-col ${c.estado === "Inactivo" ? "opacity-60" : ""}`}>
                    <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
                            <User className="w-6 h-6" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-xl font-light text-foreground">{c.nombre}</h3>
                            <p className="truncate text-sm text-muted-foreground">{c.puesto || "Sin puesto"}</p>
                        </div>
                        <Badge valor={String(c.estado)} />
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                        <li>
                            <Link
                                href={`/admin/contactos?id_cliente=${c.id_cliente}`}
                                className="flex items-center gap-2 hover:text-foreground"
                            >
                                <Building2 className="w-4 h-4 shrink-0" />
                                <span className="truncate">{c.id_cliente__label}</span>
                            </Link>
                        </li>
                        {c.email && (
                            <li>
                                <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-foreground">
                                    <Mail className="w-4 h-4 shrink-0" />
                                    <span className="truncate">{c.email}</span>
                                </a>
                            </li>
                        )}
                        {c.whatsapp && (
                            <li>
                                <a
                                    href={enlaceWhatsapp(String(c.whatsapp))}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-foreground"
                                >
                                    <SiWhatsapp className="w-4 h-4 shrink-0" />
                                    {c.whatsapp}
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className="mt-5 flex justify-end border-t border-border pt-4 text-sm">
                        <Link href={`/admin/contactos/${c.id}`} className="text-foreground underline underline-offset-4">
                            Editar
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}
