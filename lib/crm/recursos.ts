// Definición ("modelo") de cada recurso del admin: tabla, campos y relaciones.
// El repositorio, las acciones y las vistas del admin se generan a partir de aquí.

import { ETIQUETAS_CATEGORIA, SLUGS_CATEGORIA } from "@/lib/portafolio-categorias"

export type TipoCampo =
    | "text"
    | "email"
    | "url"
    | "textarea"
    | "date"
    | "number"
    | "select"
    | "checkbox"
    | "password"
    | "imagen"

export type Relacion = "clientes" | "proyectos" | "usuarios"

export type Campo = {
    name: string
    label: string
    tipo: TipoCampo
    requerido?: boolean
    opciones?: readonly string[] // para select con ENUM
    etiquetas?: Record<string, string> // texto a mostrar por opción, si difiere del valor
    relacion?: Relacion // para select con llave foránea
    virtual?: boolean // no es columna (ej. password -> password_hash)
    imagen?: { carpeta: "clientes" | "usuarios" | "proyectos"; lado: number; modo?: "cuadrada" | "maximo" } // cuadrada (por defecto): recorte lado x lado; maximo: conserva proporción, lado mayor = lado. Siempre WebP
    ayuda?: string
}

export type Recurso = {
    slug: string
    tabla: string
    singular: string
    plural: string
    campos: Campo[]
    columnas: string[] // campos que se muestran en la lista
    orden: string
}

// Texto que se muestra al elegir un registro relacionado.
export const etiquetaRelacion: Record<Relacion, { tabla: string; columna: string }> = {
    clientes: { tabla: "clientes", columna: "nombre" },
    proyectos: { tabla: "proyectos", columna: "titulo" },
    usuarios: { tabla: "usuarios", columna: "nombre" },
}

const ESTADO = ["Activo", "Inactivo"] as const
const ESTADO_TRABAJO = ["Por Iniciar", "En Proceso", "Entregado", "Cancelado", "Congelado"] as const

export const recursos: Record<string, Recurso> = {
    clientes: {
        slug: "clientes",
        tabla: "clientes",
        singular: "Cliente",
        plural: "Clientes",
        orden: "t.nombre ASC",
        columnas: ["nombre", "carpeta", "email", "tipo", "estado"],
        campos: [
            { name: "nombre", label: "Nombre", tipo: "text", requerido: true },
            { name: "carpeta", label: "Carpeta de cliente", tipo: "text", requerido: true, ayuda: "Para URLs: minúsculas, números y guiones. Ej. dental-sonrisa" },
            { name: "direccion", label: "Dirección", tipo: "text" },
            { name: "email", label: "Email", tipo: "email" },
            { name: "estado", label: "Estado", tipo: "select", opciones: ESTADO, requerido: true },
            { name: "nombre_fiscal", label: "Nombre fiscal", tipo: "text" },
            { name: "rfc", label: "RFC", tipo: "text" },
            { name: "tipo", label: "Tipo de cliente", tipo: "select", opciones: ["Proyectos", "Iguala"], requerido: true },
            { name: "logo", label: "Logo", tipo: "imagen", imagen: { carpeta: "clientes", lado: 300 }, ayuda: "Se recorta a 300 × 300 px y se convierte a WebP" },
        ],
    },
    contactos: {
        slug: "contactos",
        tabla: "contactos",
        singular: "Contacto",
        plural: "Contactos",
        orden: "t.nombre ASC",
        columnas: ["nombre", "id_cliente", "puesto", "whatsapp", "email", "estado"],
        campos: [
            { name: "nombre", label: "Nombre", tipo: "text", requerido: true },
            { name: "id_cliente", label: "Cliente", tipo: "select", relacion: "clientes", requerido: true },
            { name: "puesto", label: "Puesto", tipo: "text" },
            { name: "email", label: "Email", tipo: "email" },
            { name: "whatsapp", label: "WhatsApp", tipo: "text" },
            { name: "estado", label: "Estado", tipo: "select", opciones: ESTADO, requerido: true },
        ],
    },
    proyectos: {
        slug: "proyectos",
        tabla: "proyectos",
        singular: "Proyecto",
        plural: "Proyectos",
        orden: "t.id DESC",
        columnas: ["titulo", "id_cliente", "estimado", "estado_entrega", "importe", "estado_pago"],
        campos: [
            { name: "titulo", label: "Título", tipo: "text", requerido: true },
            { name: "id_cliente", label: "Cliente", tipo: "select", relacion: "clientes", requerido: true },
            { name: "inicio", label: "Inicio", tipo: "date" },
            { name: "estimado", label: "Estimado", tipo: "date" },
            { name: "entregado", label: "Entregado", tipo: "date", ayuda: "Fecha real de entrega" },
            { name: "estado_entrega", label: "Estado de entrega", tipo: "select", opciones: ESTADO_TRABAJO, requerido: true },
            { name: "importe", label: "Importe (MXN)", tipo: "number", requerido: true },
            { name: "estado_pago", label: "Estado de pago", tipo: "select", opciones: ["Pendiente", "Parcial", "Pagado", "Vencido"], requerido: true },
            { name: "portada", label: "Portada", tipo: "imagen", imagen: { carpeta: "proyectos", lado: 800, modo: "maximo" }, ayuda: "Conserva la proporción original; el lado más largo se reduce a 800 px máximo (WebP)" },
            { name: "mostrar_en_portafolio", label: "Mostrar en el portafolio público", tipo: "checkbox", ayuda: "Requiere categoría y portada" },
            { name: "categoria_portafolio", label: "Categoría del portafolio", tipo: "select", opciones: SLUGS_CATEGORIA, etiquetas: ETIQUETAS_CATEGORIA, ayuda: "Es el servicio donde aparece en el carrusel" },
            { name: "descripcion_portafolio", label: "Descripción para el portafolio", tipo: "textarea", ayuda: "De qué trata el proyecto, escrito para publicarse. Los saltos de línea se respetan" },
        ],
    },
    tareas: {
        slug: "tareas",
        tabla: "tareas",
        singular: "Tarea",
        plural: "Tareas",
        orden: "t.id DESC",
        columnas: ["titulo", "id_proyecto", "estado", "estimado", "id_responsable"],
        campos: [
            { name: "titulo", label: "Título", tipo: "text", requerido: true },
            { name: "id_proyecto", label: "Proyecto", tipo: "select", relacion: "proyectos", requerido: true },
            { name: "descripcion", label: "Descripción", tipo: "textarea" },
            { name: "estado", label: "Estado", tipo: "select", opciones: ESTADO_TRABAJO, requerido: true },
            { name: "inicio", label: "Inicio", tipo: "date" },
            { name: "estimado", label: "Estimado", tipo: "date" },
            { name: "entregado", label: "Entregado", tipo: "date", ayuda: "Fecha real de entrega" },
            { name: "id_responsable", label: "Responsable", tipo: "select", relacion: "usuarios" },
            { name: "url_entregable", label: "URL entregable", tipo: "url" },
            { name: "notas", label: "Notas", tipo: "textarea" },
        ],
    },
    usuarios: {
        slug: "usuarios",
        tabla: "usuarios",
        singular: "Usuario",
        plural: "Usuarios",
        orden: "t.id ASC",
        columnas: ["nombre", "email", "rol", "enviar_promociones", "activo"],
        campos: [
            { name: "nombre", label: "Nombre", tipo: "text", requerido: true },
            { name: "email", label: "Email", tipo: "email", requerido: true },
            { name: "rol", label: "Rol", tipo: "select", opciones: ["usuario", "admin"], requerido: true },
            { name: "enviar_promociones", label: "Enviar promociones", tipo: "checkbox" },
            { name: "activo", label: "Cuenta activa", tipo: "checkbox" },
            { name: "avatar", label: "Foto de perfil", tipo: "imagen", imagen: { carpeta: "usuarios", lado: 500 }, ayuda: "Se recorta a 500 × 500 px y se convierte a WebP" },
            { name: "password", label: "Nueva contraseña", tipo: "password", virtual: true, ayuda: "Déjala vacía para no cambiarla (mínimo 8 caracteres)" },
        ],
    },
}

export function getRecurso(slug: string): Recurso | null {
    return Object.prototype.hasOwnProperty.call(recursos, slug) ? recursos[slug] : null
}

export const columnasDe = (r: Recurso) => r.campos.filter((c) => !c.virtual)
export const campoDe = (r: Recurso, name: string) => r.campos.find((c) => c.name === name)!
