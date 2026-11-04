-- Migración: blog con editor visual, metadatos SEO y galería.
-- Para una base que ya tiene la tabla articulos (migracion-blog.sql). Una base nueva con el schema.sql actual ya lo incluye.
-- Ejecutar una sola vez (la consola SQL de Configuración sirve).

USE marmo_creativo;

ALTER TABLE articulos
  ADD COLUMN contenido_formato VARCHAR(10) NOT NULL DEFAULT 'markdown' COMMENT 'markdown (borradores iniciales) o html (editor visual)' AFTER contenido,
  ADD COLUMN portada_alt       VARCHAR(200) NULL COMMENT 'Texto alternativo de la portada' AFTER portada,
  ADD COLUMN meta_titulo       VARCHAR(80) NULL COMMENT 'Título SEO (si está vacío se usa el título)' AFTER resumen,
  ADD COLUMN meta_descripcion  VARCHAR(220) NULL COMMENT 'Meta descripción (si está vacía se usa el resumen)' AFTER meta_titulo,
  ADD COLUMN palabra_clave     VARCHAR(120) NULL COMMENT 'Consulta principal a la que apunta el artículo' AFTER meta_descripcion,
  ADD COLUMN noindex           TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 = no indexar en buscadores' AFTER palabra_clave;

CREATE TABLE IF NOT EXISTS articulo_imagenes (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_articulo  INT UNSIGNED NOT NULL,
  archivo      VARCHAR(255) NOT NULL COMMENT 'Ruta pública, WebP con lado mayor de 1200 px',
  ancho        SMALLINT UNSIGNED NOT NULL,
  alto         SMALLINT UNSIGNED NOT NULL,
  descripcion  VARCHAR(200) NULL COMMENT 'Texto alternativo / pie de foto',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_articulo_imagenes (id_articulo),
  CONSTRAINT fk_articulo_imagenes FOREIGN KEY (id_articulo)
    REFERENCES articulos (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
