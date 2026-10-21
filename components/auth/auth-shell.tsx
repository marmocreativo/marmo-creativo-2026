export function AuthShell({ titulo, subtitulo, children }: { titulo: string; subtitulo: string; children: React.ReactNode }) {
    return (
        <section className="relative -mt-20 min-h-screen flex items-center text-white overflow-hidden">
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/landing_bg.jpg')" }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/50" />

            <div className="max-w-md mx-auto w-full px-6 pt-32 pb-16">
                <div className="bg-white text-foreground p-6 sm:p-8 shadow-2xl space-y-4">
                    <div className="mb-2">
                        <h1 className="text-2xl font-light">{titulo}</h1>
                        <p className="text-sm text-muted-foreground">{subtitulo}</p>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}

export const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors"

export const botonClass =
    "w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
