// Convierte los borradores de docs/blog/*.md en database/seed-blog.sql.
// Uso:  node scripts/blog-a-sql.mjs
// Cada .md lleva un encabezado (---) con titulo, slug, categoria y resumen. Los artículos quedan como BORRADOR:
// se publican desde /admin/articulos. Volver a correr el SQL actualiza el texto pero NO cambia si está publicado.

import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const carpeta = path.resolve("docs/blog")
const archivos = readdirSync(carpeta).filter((f) => /^\d+-.*\.md$/.test(f)).sort()

const esc = (s) => "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "''") + "'"

const filas = archivos.map((f) => {
    const crudo = readFileSync(path.join(carpeta, f), "utf8").replace(/\r\n/g, "\n")
    const m = crudo.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!m) throw new Error(`${f}: falta el encabezado ---`)
    const meta = {}
    for (const linea of m[1].split("\n")) {
        const i = linea.indexOf(":")
        if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim()
    }
    for (const k of ["titulo", "slug", "categoria", "resumen"]) if (!meta[k]) throw new Error(`${f}: falta ${k}`)
    if (meta.resumen.length > 300) console.warn(`Aviso ${f}: el resumen mide ${meta.resumen.length} caracteres (Google corta cerca de 160).`)
    return `(${esc(meta.titulo)}, ${esc(meta.slug)}, ${esc(meta.resumen)}, ${esc(meta.categoria)}, ${esc(m[2].trim())}, 0)`
})

const sql = `-- Borradores del blog (generado por scripts/blog-a-sql.mjs desde docs/blog/*.md). No editar a mano.
-- Quedan sin publicar: revísalos y publícalos desde /admin/articulos.
-- Requiere la tabla articulos (database/migracion-blog.sql).

USE marmo_creativo;
SET NAMES utf8mb4;

INSERT INTO articulos (titulo, slug, resumen, categoria, contenido, publicado) VALUES
${filas.join(",\n")}
ON DUPLICATE KEY UPDATE
  titulo = VALUES(titulo),
  resumen = VALUES(resumen),
  categoria = VALUES(categoria),
  contenido = VALUES(contenido);
`

writeFileSync("database/seed-blog.sql", sql)
console.log(`${filas.length} artículos -> database/seed-blog.sql`)
