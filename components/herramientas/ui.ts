// Clases compartidas por las tres herramientas (design system: botones cuadrados, paneles rounded-xl).
export const panel = "rounded-xl border border-border bg-white p-6 md:p-7"
export const tituloPanel = "mb-6 flex items-center gap-2 text-xl font-light text-foreground"
export const etiqueta = "mb-2 block text-sm text-muted-foreground"
export const campo =
    "w-full border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors"
export const btnPrimario =
    "inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
export const btnSecundario =
    "inline-flex items-center justify-center gap-2 border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:border-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
export const opcion = (activa: boolean) =>
    `flex items-center gap-2 border px-3 py-2.5 text-sm transition-colors ${
        activa ? "border-foreground bg-neutral-100 text-foreground" : "border-border text-muted-foreground hover:border-foreground/60"
    }`
export const bloqueCodigo = "overflow-x-auto bg-black p-4 text-xs leading-relaxed text-green-300"
