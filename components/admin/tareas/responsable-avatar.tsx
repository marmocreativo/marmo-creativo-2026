// Foto pequeña del responsable (o sus iniciales si no tiene foto). El nombre sale al pasar el mouse.
export function ResponsableAvatar({ nombre, avatar, tam = 28 }: { nombre: string | null; avatar: string | null; tam?: number }) {
    if (!nombre) return <span className="text-sm text-muted-foreground" title="Sin responsable">—</span>

    const estilo = { width: tam, height: tam }
    return avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt={nombre} title={nombre} width={tam} height={tam} referrerPolicy="no-referrer" style={estilo} className="shrink-0 rounded-full border border-border object-cover" />
    ) : (
        <span
            title={nombre}
            style={estilo}
            className="flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-medium text-neutral-600"
        >
            {nombre
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((p) => p[0]?.toUpperCase())
                .join("")}
        </span>
    )
}
