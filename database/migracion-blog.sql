-- Migración: blog (artículos).
-- Solo para una base ya creada. Una base nueva con el schema.sql actual ya lo incluye.
-- Ejecutar una sola vez (la consola SQL de Configuración sirve).

USE marmo_creativo;

CREATE TABLE IF NOT EXISTS articulos (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo            VARCHAR(200) NOT NULL,
  slug              VARCHAR(120) NOT NULL COMMENT 'URL: /blog/<slug>. Minúsculas, números y guiones',
  resumen           VARCHAR(500) NOT NULL COMMENT 'Meta descripción y texto de las tarjetas',
  categoria         VARCHAR(40) NOT NULL COMMENT 'Slug de categoría (ver lib/blog-categorias.ts)',
  portada           VARCHAR(255) NULL COMMENT 'Ruta pública, WebP con lado mayor de 1200 px',
  contenido         MEDIUMTEXT NOT NULL COMMENT 'Markdown',
  publicado         TINYINT(1) NOT NULL DEFAULT 0,
  fecha_publicacion DATE NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_articulos_slug (slug),
  KEY idx_articulos_publicados (publicado, fecha_publicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
