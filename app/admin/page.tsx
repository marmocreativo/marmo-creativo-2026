import Link from "next/link"
import { contar } from "@/lib/crm/repo"
import { recursos } from "@/lib/crm/recursos"

export default async function Page() {
  const lista = Object.values(recursos)
  const totales = await Promise.all(lista.map((r) => contar(r.tabla)))
  const [porCobrar, abiertos] = await Promise.all([
    contar("proyectos", "WHERE estado_pago IN ('Pendiente','Parcial','Vencido')"),
    contar("tareas", "WHERE estado IN ('Por Iniciar','En Proceso')"),
  ])

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-light text-foreground">Resumen</h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {lista.map((r, i) => (
          <Link key={r.slug} href={`/admin/${r.slug}`} className="rounded-xl border border-border p-6 hover:border-foreground transition-colors">
            <p className="text-5xl font-light">{totales[i]}</p>
            <p className="mt-2 text-sm text-muted-foreground">{r.plural}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-6">
          <p className="text-5xl font-light">{porCobrar}</p>
          <p className="mt-2 text-sm text-muted-foreground">Proyectos con pago pendiente, parcial o vencido</p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-5xl font-light">{abiertos}</p>
          <p className="mt-2 text-sm text-muted-foreground">Tareas por iniciar o en proceso</p>
        </div>
      </div>
    </div>
  )
}
