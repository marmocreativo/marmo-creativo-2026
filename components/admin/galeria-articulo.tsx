import { eliminarImagenArticulo, subirGaleriaArticulo } from "@/lib/actions/galeria-articulos"
import type { ImagenArticulo } from "@/lib/crm/galeria-articulos"
import { BotonEliminar } from "./boton-eliminar"
import { DescripcionImagen } from "./descripcion-imagen"
import { SubirGaleria } from "./subir-galeria"

// Galería del artículo: se muestra al final del texto en la página pública y sus imágenes se pueden insertar desde el editor.
export function GaleriaArticulo({ idArticulo, imagenes }: { idArticulo: number; imagenes: ImagenArticulo[] }) {
    return (
        <section className="mt-8 rounded-xl border border-border bg-white p-5">
            <h3 className="text-base font-medium text-foreground">Galería del artículo</h3>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">
                Se muestra al final del artículo (con ampliación al hacer clic). Se guardan en WebP con el lado más largo a 1200 px. Hasta 10 por subida, 8 MB cada una.
                El texto de cada imagen sirve de descripción para Google y lectores de pantalla.
            </p>

            <SubirGaleria accion={subirGaleriaArticulo.bind(null, idArticulo)} />

            {imagenes.length === 0 ? (
                <p className="mt-6 text-sm text-muted-foreground">Aún no hay imágenes en la galería.</p>
            ) : (
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {imagenes.map((img) => (
                        <li key={img.id} className="rounded-xl border border-border p-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.archivo}
                                alt={img.descripcion ?? ""}
                                width={img.ancho}
                                height={img.alto}
                                loading="lazy"
                                className="aspect-square w-full rounded-lg bg-neutral-100 object-contain"
                            />
                            <DescripcionImagen idImagen={img.id} idArticulo={idArticulo} inicial={img.descripcion ?? ""} />
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                    {img.ancho} × {img.alto}
                                </span>
                                <BotonEliminar accion={eliminarImagenArticulo.bind(null, img.id, idArticulo)} etiqueta="esta imagen" />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
