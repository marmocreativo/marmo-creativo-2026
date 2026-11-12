// Herramientas MCP del CRM: lo que Claude puede hacer en el sitio (clientes, contactos, proyectos y tareas).
// Reutilizan los mismos recursos, validaciones y repositorio que el admin. No hay borrado a propósito.

import { revalidatePath } from "next/cache"
import type { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { getRecurso, type Campo, type Recurso } from "@/lib/crm/recursos"
import { actualizar, clientesConConteos, crear, listar, obtener, type Fila } from "@/lib/crm/repo"
import { reCarpeta, validar } from "@/lib/crm/validar"

export class ErrorHerramienta extends Error {}

const RECURSOS = ["clientes", "contactos", "proyectos", "tareas"] as const
type Slug = (typeof RECURSOS)[number]

// Lo público del portafolio se publica solo desde el admin (requiere portada y revisión).
const SOLO_ADMIN = new Set(["mostrar_en_portafolio", "categoria_portafolio", "descripcion_portafolio"])

// Valores iniciales al crear (los mismos que usa la base de datos).
const INICIALES: Record<Slug, Record<string, string | number>> = {
    clientes: { estado: "Activo", tipo: "Proyectos" },
    contactos: { estado: "Activo" },
    proyectos: { estado_entrega: "Por Iniciar", estado_pago: "Pendiente", importe: 0 },
    tareas: { estado: "Por Iniciar" },
}

const editable = (c: Campo) => c.tipo !== "imagen" && c.tipo !== "password" && !c.virtual && !SOLO_ADMIN.has(c.name)

function recurso(slug: unknown): Recurso & { slug: Slug } {
    const r = typeof slug === "string" && (RECURSOS as readonly string[]).includes(slug) ? getRecurso(slug) : null
    if (!r) throw new ErrorHerramienta(`recurso debe ser uno de: ${RECURSOS.join(", ")}.`)
    return r as Recurso & { slug: Slug }
}

const entero = (v: unknown, nombre: string): number => {
    const n = Number(v)
    if (!Number.isInteger(n) || n <= 0) throw new ErrorHerramienta(`${nombre} debe ser un número de id válido.`)
    return n
}

const quitarAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "")
const aCarpeta = (s: string) =>
    quitarAcentos(s)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 100)

// Fila compacta: id, campos del recurso, nombres de lo relacionado y conteos. Sin datos internos.
function compacta(r: Recurso, f: Fila): Fila {
    const salida: Fila = { id: f.id }
    for (const c of r.campos.filter(editable)) if (c.name in f) salida[c.name] = f[c.name]
    for (const k of Object.keys(f)) if (k.endsWith("__label") || k.startsWith("n_") || k === "cliente_id") salida[k] = f[k]
    return salida
}

async function validarRelaciones(datos: Fila) {
    if (datos.id_cliente != null && !(await obtener(getRecurso("clientes")!, Number(datos.id_cliente)))) {
        throw new ErrorHerramienta(`No existe el cliente con id ${datos.id_cliente}.`)
    }
    if (datos.id_proyecto != null && !(await obtener(getRecurso("proyectos")!, Number(datos.id_proyecto)))) {
        throw new ErrorHerramienta(`No existe el proyecto con id ${datos.id_proyecto}.`)
    }
    if (datos.id_responsable != null) {
        const [rows] = await db.query<RowDataPacket[]>("SELECT id FROM usuarios WHERE id = ? AND rol = 'admin' AND activo = 1", [datos.id_responsable])
        if (!rows.length) throw new ErrorHerramienta(`El responsable con id ${datos.id_responsable} no existe o no es un administrador activo.`)
    }
}

// Convierte lo que manda Claude en datos listos para la BD. En modo "crear" aplica valores iniciales.
async function preparar(r: Recurso & { slug: Slug }, entrada: unknown, modo: "crear" | "editar"): Promise<Fila> {
    if (!entrada || typeof entrada !== "object" || Array.isArray(entrada)) throw new ErrorHerramienta("datos debe ser un objeto con los campos.")
    const crudo = entrada as Record<string, unknown>
    const campos = r.campos.filter(editable)
    const permitidos = new Set(campos.map((c) => c.name))
    const desconocidos = Object.keys(crudo).filter((k) => !permitidos.has(k))
    if (desconocidos.length) {
        throw new ErrorHerramienta(`Campos no permitidos en ${r.plural.toLowerCase()}: ${desconocidos.join(", ")}. Permitidos: ${[...permitidos].join(", ")}.`)
    }

    if (modo === "crear" && r.slug === "clientes" && !crudo.carpeta && typeof crudo.nombre === "string") crudo.carpeta = aCarpeta(crudo.nombre)

    const datos: Fila = {}
    for (const c of campos) {
        let raw = crudo[c.name]
        if (modo === "crear" && (raw === undefined || raw === null || raw === "")) raw = INICIALES[r.slug][c.name] ?? raw
        if (raw === undefined) continue // en "editar", lo que no se manda no cambia
        if (raw === null) raw = "" // null = vaciar el campo
        if (typeof raw === "object") throw new ErrorHerramienta(`${c.label} debe ser texto, número o booleano.`)
        const v = validar(c, raw)
        if ("error" in v) throw new ErrorHerramienta(v.error)
        datos[c.name] = v.valor
    }

    if (r.slug === "clientes") {
        if ("carpeta" in datos && !reCarpeta.test(String(datos.carpeta))) {
            throw new ErrorHerramienta("La carpeta solo admite minúsculas, números y guiones (ej. dental-sonrisa).")
        }
        if (datos.rfc) {
            datos.rfc = String(datos.rfc).toUpperCase()
            if (!/^[A-ZÑ&0-9]{12,13}$/.test(String(datos.rfc))) throw new ErrorHerramienta("El RFC debe tener 12 o 13 caracteres.")
        }
    }

    await validarRelaciones(datos)
    return datos
}

function refrescar(slug: Slug) {
    revalidatePath(`/admin/${slug}`)
    // Un proyecto nuevo cambia los conteos de su cliente, una tarea los de su proyecto, etc.
    for (const ruta of ["/admin/clientes", "/admin/proyectos", "/admin/tareas", "/admin"]) revalidatePath(ruta)
}

async function guardar(r: Recurso & { slug: Slug }, id: number | null, datos: Fila): Promise<number> {
    try {
        if (id) {
            await actualizar(r, id, datos)
            return id
        }
        return await crear(r, datos)
    } catch (e) {
        if ((e as { code?: string }).code === "ER_DUP_ENTRY") throw new ErrorHerramienta("Ya existe un registro con ese valor único (por ejemplo, la carpeta de un cliente).")
        throw e
    }
}

// ---- Herramientas ---------------------------------------------------------------------------------

type Herramienta = {
    name: string
    description: string
    inputSchema: Record<string, unknown>
    annotations: Record<string, boolean>
    ejecutar: (args: Record<string, unknown>) => Promise<unknown>
}

const recursoProp = { type: "string", enum: RECURSOS, description: "clientes, contactos, proyectos o tareas" }

export const herramientas: Herramienta[] = [
    {
        name: "crm_esquema",
        description:
            "Describe el CRM de Marmo Creativo: recursos, campos (con tipo, si son obligatorios y sus opciones) y cómo se relacionan. Úsala primero para saber qué valores acepta cada campo.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        async ejecutar() {
            return {
                jerarquia: "cliente → contactos y proyectos; proyecto → tareas. Las tareas pertenecen a un proyecto (id_proyecto) y su cliente es el del proyecto.",
                notas: [
                    "Fechas en formato AAAA-MM-DD. Importes en MXN.",
                    "Al crear un cliente, si no mandas 'carpeta' se genera desde el nombre.",
                    "Para vaciar un campo opcional al editar manda null.",
                    "Para mover una tarea a otro proyecto edita su id_proyecto; para mover un proyecto o contacto, su id_cliente.",
                    "No se puede borrar desde este conector, ni publicar proyectos en el portafolio (eso se hace en el admin).",
                ],
                recursos: RECURSOS.map((slug) => {
                    const r = getRecurso(slug)!
                    return {
                        recurso: slug,
                        singular: r.singular,
                        iniciales: INICIALES[slug],
                        campos: r.campos.filter(editable).map((c) => ({
                            name: c.name,
                            tipo: c.relacion ? `id de ${c.relacion}` : c.tipo,
                            obligatorio: !!c.requerido && !(c.name in INICIALES[slug]),
                            ...(c.opciones ? { opciones: c.opciones } : {}),
                            ...(c.ayuda ? { ayuda: c.ayuda } : {}),
                        })),
                    }
                }),
            }
        },
    },
    {
        name: "crm_buscar",
        description:
            "Lista o busca registros del CRM. 'q' busca por texto (nombre, email, título…). Filtros: id_cliente (contactos, proyectos y tareas), id_proyecto y estados (solo tareas). Devuelve hasta 'limite' registros (50 por defecto, máximo 200).",
        inputSchema: {
            type: "object",
            properties: {
                recurso: recursoProp,
                q: { type: "string", description: "Texto a buscar" },
                id_cliente: { type: "integer" },
                id_proyecto: { type: "integer", description: "Solo para tareas" },
                estados: { type: "array", items: { type: "string" }, description: "Solo para tareas: Por Iniciar, En Proceso, Entregado, Cancelado, Congelado" },
                limite: { type: "integer", minimum: 1, maximum: 200 },
            },
            required: ["recurso"],
        },
        annotations: { readOnlyHint: true },
        async ejecutar(a) {
            const r = recurso(a.recurso)
            const limite = Math.min(Math.max(Number(a.limite) || 50, 1), 200)
            const q = typeof a.q === "string" ? a.q : undefined
            const estados = Array.isArray(a.estados) ? a.estados.filter((e): e is string => typeof e === "string") : undefined
            const filas =
                r.slug === "clientes"
                    ? await clientesConConteos(q)
                    : await listar(r, {
                          q,
                          id_cliente: a.id_cliente ? entero(a.id_cliente, "id_cliente") : undefined,
                          id_proyecto: a.id_proyecto ? entero(a.id_proyecto, "id_proyecto") : undefined,
                          estados,
                      })
            return { total: filas.length, mostrados: Math.min(filas.length, limite), registros: filas.slice(0, limite).map((f) => compacta(r, f)) }
        },
    },
    {
        name: "crm_obtener",
        description: "Trae un registro por id. En un cliente incluye sus contactos y proyectos; en un proyecto, sus tareas.",
        inputSchema: { type: "object", properties: { recurso: recursoProp, id: { type: "integer" } }, required: ["recurso", "id"] },
        annotations: { readOnlyHint: true },
        async ejecutar(a) {
            const r = recurso(a.recurso)
            const id = entero(a.id, "id")
            const f = await obtener(r, id)
            if (!f) throw new ErrorHerramienta(`No existe ${r.singular.toLowerCase()} con id ${id}.`)
            const salida: Record<string, unknown> = { ...compacta(r, f) }
            if (r.slug === "clientes") {
                salida.contactos = (await listar(getRecurso("contactos")!, { id_cliente: id })).map((x) => compacta(getRecurso("contactos")!, x))
                salida.proyectos = (await listar(getRecurso("proyectos")!, { id_cliente: id })).map((x) => compacta(getRecurso("proyectos")!, x))
            }
            if (r.slug === "proyectos") {
                salida.tareas = (await listar(getRecurso("tareas")!, { id_proyecto: id })).map((x) => compacta(getRecurso("tareas")!, x))
            }
            return salida
        },
    },
    {
        name: "crm_crear",
        description:
            "Crea un registro. Obligatorios: cliente → nombre; contacto → nombre, id_cliente; proyecto → titulo, id_cliente; tarea → titulo, id_proyecto. Usa crm_esquema para ver el resto de campos y sus opciones.",
        inputSchema: {
            type: "object",
            properties: { recurso: recursoProp, datos: { type: "object", description: "Campos del registro, por nombre" } },
            required: ["recurso", "datos"],
        },
        annotations: { readOnlyHint: false, destructiveHint: false },
        async ejecutar(a) {
            const r = recurso(a.recurso)
            const id = await guardar(r, null, await preparar(r, a.datos, "crear"))
            refrescar(r.slug)
            return { ok: "Registro creado.", registro: compacta(r, (await obtener(r, id))!) }
        },
    },
    {
        name: "crm_crear_varios",
        description:
            "Crea varios registros del mismo recurso de una vez (máximo 50), por ejemplo varias tareas de un proyecto. Cada uno se valida por separado: los que fallen se reportan y los demás se crean.",
        inputSchema: {
            type: "object",
            properties: { recurso: recursoProp, registros: { type: "array", items: { type: "object" }, maxItems: 50 } },
            required: ["recurso", "registros"],
        },
        annotations: { readOnlyHint: false, destructiveHint: false },
        async ejecutar(a) {
            const r = recurso(a.recurso)
            if (!Array.isArray(a.registros) || !a.registros.length) throw new ErrorHerramienta("registros debe ser una lista con al menos un elemento.")
            if (a.registros.length > 50) throw new ErrorHerramienta("Máximo 50 registros por llamada.")
            const resultados: Record<string, unknown>[] = []
            for (const [i, entrada] of a.registros.entries()) {
                try {
                    const id = await guardar(r, null, await preparar(r, entrada, "crear"))
                    resultados.push({ posicion: i + 1, ok: true, registro: compacta(r, (await obtener(r, id))!) })
                } catch (e) {
                    if (!(e instanceof ErrorHerramienta)) throw e
                    resultados.push({ posicion: i + 1, ok: false, error: e.message })
                }
            }
            refrescar(r.slug)
            const creados = resultados.filter((x) => x.ok).length
            return { creados, fallidos: resultados.length - creados, resultados }
        },
    },
    {
        name: "crm_actualizar",
        description:
            "Edita un registro: solo cambian los campos que mandes (null vacía un campo opcional). Sirve también para organizar: cambiar el estado, fechas o responsable de una tarea, mover una tarea a otro proyecto (id_proyecto) o un proyecto/contacto a otro cliente (id_cliente).",
        inputSchema: {
            type: "object",
            properties: { recurso: recursoProp, id: { type: "integer" }, datos: { type: "object", description: "Solo los campos a cambiar" } },
            required: ["recurso", "id", "datos"],
        },
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
        async ejecutar(a) {
            const r = recurso(a.recurso)
            const id = entero(a.id, "id")
            if (!(await obtener(r, id))) throw new ErrorHerramienta(`No existe ${r.singular.toLowerCase()} con id ${id}.`)
            const datos = await preparar(r, a.datos, "editar")
            if (!Object.keys(datos).length) throw new ErrorHerramienta("No mandaste ningún campo para cambiar.")
            await guardar(r, id, datos)
            refrescar(r.slug)
            return { ok: "Registro actualizado.", registro: compacta(r, (await obtener(r, id))!) }
        },
    },
]
