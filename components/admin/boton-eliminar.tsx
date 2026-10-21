"use client"

export function BotonEliminar({ accion, etiqueta, texto = "Eliminar" }: { accion: () => Promise<void>; etiqueta: string; texto?: string }) {
    return (
        <form
            action={accion}
            onSubmit={(e) => {
                if (!confirm(`¿Eliminar ${etiqueta}? Esta acción no se puede deshacer.`)) e.preventDefault()
            }}
        >
            <button type="submit" className="text-sm text-destructive underline underline-offset-4">
                {texto}
            </button>
        </form>
    )
}
