-- Migración: edición con IA por prompts del creador de sitios (Fase 3).
-- Requiere migracion-sitios-ia.sql. Una base nueva ya lo incluye en schema.sql. Ejecutar una sola vez.

USE marmo_creativo;

-- Las ediciones por prompt son tareas en segundo plano como las generaciones: su resultado (los archivos
-- modificados, en JSON) se guarda aquí solo hasta que la pantalla lo recoge.
ALTER TABLE sitio_ia_tareas
  MODIFY COLUMN tipo ENUM('propuestas','sitio','edicion') NOT NULL,
  ADD COLUMN resultado MEDIUMTEXT NULL COMMENT 'Resultado de una edición (JSON); se borra al recogerlo' AFTER error;
