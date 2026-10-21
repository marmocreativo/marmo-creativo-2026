-- Migración: bitácora de la consulta SQL del admin.
-- Solo para una base ya creada. Una base nueva con el schema.sql actual ya la incluye.
-- Ejecutar una sola vez (puedes hacerlo desde Admin > Configuración > Consulta SQL).

USE marmo_creativo;

CREATE TABLE IF NOT EXISTS consulta_sql_log (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario     VARCHAR(190) NOT NULL COMMENT 'Correo de quien la ejecutó',
  sql_texto   MEDIUMTEXT NOT NULL,
  ok          TINYINT(1) NOT NULL,
  detalle     VARCHAR(500) NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sqllog_fecha (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
