import { eliminarImagenGaleria, subirGaleria } from "@/lib/actions/galeria"
import type { ImagenGaleria } from "@/lib/crm/galeria"
import { BotonEliminar } from "./boton-eliminar"
import { SubirGaleria } from "./subir-galeria"

export function GaleriaProyecto({ idProyecto, imagenes }: { idProyecto: number; imagenes: ImagenGaleria[] }) {
    return (
        <section className="mt-14 border-t border-border pt-10">
            <h3 className="text-2xl font-light text-foreground">Galería</h3>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">
                Se guardan en WebP con el lado más largo a 800 px, conservando la proporción. Hasta 10 por subida y 8 MB cada una.
            </p>

            <SubirGaleria accion={subirGaleria.bind(null, idProyecto)} />

            {imagenes.length === 0 ? (
                <p className="mt-6 text-sm text-muted-foreground">Aún no hay imágenes.</p>
            ) : (
                <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagenes.map((img) => (
                        <li key={img.id} className="rounded-xl border border-border p-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.archivo}
                                alt=""
                                width={img.ancho}
                                height={img.alto}
                                loading="lazy"
                                className="aspect-square w-full rounded-lg bg-neutral-100 object-contain"
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <span>{img.ancho} × {img.alto}</span>
                                <BotonEliminar accion={eliminarImagenGaleria.bind(null, img.id, idProyecto)} etiqueta="esta imagen" />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
