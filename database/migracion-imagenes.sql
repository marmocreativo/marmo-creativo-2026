-- Migración: imágenes (logo de cliente, portada de proyecto, galería de proyecto).
-- Solo para una base que ya tenías creada con el schema.sql anterior. Una base nueva ya lo incluye.
-- (usuarios.avatar ya existía y se reutiliza para la foto de perfil.)
-- Ejecutar una sola vez.

USE marmo_creativo;

ALTER TABLE clientes  ADD COLUMN logo    VARCHAR(255) NULL COMMENT 'Ruta pública, WebP 300x300' AFTER tipo;
ALTER TABLE proyectos ADD COLUMN portada VARCHAR(255) NULL COMMENT 'Ruta pública, WebP 800x800' AFTER estado_pago;

CREATE TABLE IF NOT EXISTS proyecto_imagenes (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_proyecto  INT UNSIGNED NOT NULL,
  archivo      VARCHAR(255) NOT NULL COMMENT 'Ruta pública, WebP con lado mayor de 800 px',
  ancho        SMALLINT UNSIGNED NOT NULL,
  alto         SMALLINT UNSIGNED NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_imagenes_proyecto (id_proyecto),
  CONSTRAINT fk_imagenes_proyecto FOREIGN KEY (id_proyecto)
    REFERENCES proyectos (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
