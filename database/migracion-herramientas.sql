-- Migración: historial de herramientas (QR, botón de WhatsApp, paleta de colores).
-- Solo para una base ya creada. Una base nueva con el schema.sql actual ya lo incluye.
-- Ejecutar una sola vez.

USE marmo_creativo;

CREATE TABLE IF NOT EXISTS herramienta_historial (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_usuario  INT UNSIGNED NOT NULL,
  herramienta ENUM('qr','whatsapp','paleta') NOT NULL,
  titulo      VARCHAR(200) NOT NULL,
  datos       JSON NOT NULL COMMENT 'Configuración con la que se generó (sin contraseñas)',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_historial_usuario (id_usuario, herramienta, id),
  CONSTRAINT fk_historial_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
