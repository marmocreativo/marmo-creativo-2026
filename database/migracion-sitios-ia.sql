-- Migración: generación con IA del creador de sitios (Fase 2).
-- Requiere haber ejecutado antes migracion-sitios.sql. Una base nueva ya lo incluye en schema.sql.
-- Ejecutar una sola vez.

USE marmo_creativo;

ALTER TABLE sitios
  ADD COLUMN referencias_analisis JSON NULL COMMENT 'Guía de estilo que la IA sacó de las referencias: {hash, texto}' AFTER referencias_urls;

-- Cada generación (propuestas o sitio completo) es una tarea que corre en segundo plano:
-- la pantalla consulta su estado y progreso. También guarda el consumo para saber cuánto cuesta.
CREATE TABLE IF NOT EXISTS sitio_ia_tareas (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_sitio        INT UNSIGNED NOT NULL,
  tipo            ENUM('propuestas','sitio') NOT NULL,
  estado          ENUM('ejecutando','listo','error') NOT NULL DEFAULT 'ejecutando',
  progreso        VARCHAR(200) NULL,
  error           VARCHAR(500) NULL,
  tokens_entrada  INT UNSIGNED NOT NULL DEFAULT 0,
  tokens_salida   INT UNSIGNED NOT NULL DEFAULT 0,
  costo_usd       DECIMAL(8,4) NULL COMMENT 'Estimado con los precios por modelo de lib/ia/anthropic.ts',
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sitio_ia_tareas (id_sitio, id),
  CONSTRAINT fk_sitio_ia_tareas FOREIGN KEY (id_sitio)
    REFERENCES sitios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
