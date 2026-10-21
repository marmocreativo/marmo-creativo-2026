-- Migración: portafolio público (proyectos).
-- Solo para una base ya creada. Una base nueva con el schema.sql actual ya lo incluye.
-- Ejecutar una sola vez.

USE marmo_creativo;

ALTER TABLE proyectos
  ADD COLUMN mostrar_en_portafolio  TINYINT(1) NOT NULL DEFAULT 0 AFTER portada,
  ADD COLUMN categoria_portafolio   VARCHAR(40) NULL COMMENT 'Slug del servicio (ver lib/portafolio-categorias.ts)' AFTER mostrar_en_portafolio,
  ADD COLUMN descripcion_portafolio TEXT NULL AFTER categoria_portafolio,
  ADD KEY idx_proyectos_portafolio (mostrar_en_portafolio, categoria_portafolio);
