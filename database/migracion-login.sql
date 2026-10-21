-- Migración: protección contra fuerza bruta del login y del registro.
-- Solo para una base ya creada. Una base nueva con el schema.sql actual ya la incluye.
-- Idempotente: se puede ejecutar más de una vez (Admin > Configuración > Consulta SQL).

USE marmo_creativo;

CREATE TABLE IF NOT EXISTS intentos_login (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  tipo        ENUM('email','ip','registro') NOT NULL,
  clave       VARCHAR(190) NOT NULL COMMENT 'Correo (minúsculas) o IP, según el tipo',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_intentos_clave (tipo, clave, created_at),
  KEY idx_intentos_fecha (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
