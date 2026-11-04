// Tipos compartidos entre el servidor (rutas de la IA) y el panel "Crear nota con IA" del admin.

export type FuenteIA = { url: string; titulo: string }

export type NotaIA = {
    html: string // cuerpo de la nota + sección "Fuentes consultadas"
    fuentes: FuenteIA[] // solo fuentes cuya página respondió (verificadas)
    consultas: string[] // búsquedas que hizo Gemini en Google
}

export type MetaIA = {
    titulo: string
    slug: string
    resumen: string
    meta_titulo: string
    meta_descripcion: string
    palabra_clave: string
    categoria: string
    portada_alt: string
    imagenes: { prompt: string; alt: string }[]
}

export type ImagenIA = { url: string; ancho: number; alto: number; alt: string }

export type ResultadoIA = { nota: NotaIA; meta: MetaIA; imagenes: ImagenIA[]; avisos: string[] }
