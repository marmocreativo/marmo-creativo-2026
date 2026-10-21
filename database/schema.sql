-- Marmo Creativo · Esquema de base de datos (MySQL 8 / MariaDB 10.4+)
-- Local (Laragon): importar este archivo desde HeidiSQL / phpMyAdmin.
-- Producción (Docker): docker-compose.yml lo ejecuta solo la primera vez que se crea el volumen.

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS marmo_creativo
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marmo_creativo;

-- ---------------------------------------------------------------------------
-- Usuarios (login con correo/contraseña o Google)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre              VARCHAR(150) NOT NULL,
  email               VARCHAR(190) NOT NULL,
  password_hash       VARCHAR(255) NULL COMMENT 'NULL si solo entra con Google',
  google_id           VARCHAR(64)  NULL,
  avatar              VARCHAR(500) NULL,
  rol                 ENUM('admin','usuario') NOT NULL DEFAULT 'usuario',
  enviar_promociones  TINYINT(1) NOT NULL DEFAULT 0,
  activo              TINYINT(1) NOT NULL DEFAULT 1,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email),
  UNIQUE KEY uq_usuarios_google (google_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- CRM
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre         VARCHAR(150) NOT NULL,
  carpeta        VARCHAR(100) NOT NULL COMMENT 'Slug para URLs, ej. dental-sonrisa',
  direccion      VARCHAR(300) NULL,
  email          VARCHAR(190) NULL,
  estado         ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  nombre_fiscal  VARCHAR(200) NULL,
  rfc            VARCHAR(13)  NULL,
  tipo           ENUM('Proyectos','Iguala') NOT NULL DEFAULT 'Proyectos',
  logo           VARCHAR(255) NULL COMMENT 'Ruta pública, WebP 300x300',
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_clientes_carpeta (carpeta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contactos (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_cliente  INT UNSIGNED NOT NULL,
  nombre      VARCHAR(150) NOT NULL,
  email       VARCHAR(190) NULL,
  puesto      VARCHAR(120) NULL,
  whatsapp    VARCHAR(30)  NULL,
  estado      ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contactos_cliente (id_cliente),
  CONSTRAINT fk_contactos_cliente FOREIGN KEY (id_cliente)
    REFERENCES clientes (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS proyectos (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_cliente      INT UNSIGNED NOT NULL,
  titulo          VARCHAR(200) NOT NULL,
  inicio          DATE NULL,
  estimado        DATE NULL,
  entregado       DATE NULL COMMENT 'Fecha real de entrega, para medir tiempos',
  estado_entrega  ENUM('Por Iniciar','En Proceso','Entregado','Cancelado','Congelado') NOT NULL DEFAULT 'Por Iniciar',
  importe         DECIMAL(12,2) NOT NULL DEFAULT 0,
  estado_pago     ENUM('Pendiente','Parcial','Pagado','Vencido') NOT NULL DEFAULT 'Pendiente',
  portada         VARCHAR(255) NULL COMMENT 'Ruta pública, WebP con lado mayor de 800 px',
  mostrar_en_portafolio  TINYINT(1) NOT NULL DEFAULT 0,
  categoria_portafolio   VARCHAR(40) NULL COMMENT 'Slug del servicio (ver lib/portafolio-categorias.ts)',
  descripcion_portafolio TEXT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_proyectos_cliente (id_cliente),
  KEY idx_proyectos_portafolio (mostrar_en_portafolio, categoria_portafolio),
  CONSTRAINT fk_proyectos_cliente FOREIGN KEY (id_cliente)
    REFERENCES clientes (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE IF NOT EXISTS tareas (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_proyecto      INT UNSIGNED NOT NULL,
  titulo           VARCHAR(200) NOT NULL,
  descripcion      TEXT NULL,
  estado           ENUM('Por Iniciar','En Proceso','Entregado','Cancelado','Congelado') NOT NULL DEFAULT 'Por Iniciar',
  inicio           DATE NULL,
  estimado         DATE NULL,
  entregado        DATE NULL COMMENT 'Fecha real de entrega, para medir tiempos',
  id_responsable   INT UNSIGNED NULL COMMENT 'Usuario (administrador) responsable',
  url_entregable   VARCHAR(500) NULL,
  notas            TEXT NULL,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tareas_proyecto (id_proyecto),
  KEY idx_tareas_responsable (id_responsable),
  CONSTRAINT fk_tareas_proyecto FOREIGN KEY (id_proyecto)
    REFERENCES proyectos (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_tareas_responsable FOREIGN KEY (id_responsable)
    REFERENCES usuarios (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Historial de herramientas (QR, botón de WhatsApp, paleta de colores)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Bitácora de la consulta SQL del admin (lo que se ejecuta en modo escritura)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Intentos de login/registro (protección contra fuerza bruta)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intentos_login (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  tipo        ENUM('email','ip','registro') NOT NULL,
  clave       VARCHAR(190) NOT NULL COMMENT 'Correo (minúsculas) o IP, según el tipo',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_intentos_clave (tipo, clave, created_at),
  KEY idx_intentos_fecha (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Administrador inicial
-- Contraseña por defecto: Marmo2026!   (CÁMBIALA después del primer acceso)
-- ---------------------------------------------------------------------------
INSERT INTO usuarios (nombre, email, password_hash, rol, enviar_promociones)
VALUES ('Manuel Marmolejo', 'marmocreativo@gmail.com',
        '$2b$10$DGRhBWyeVeObjHkdWd6YNO/wR9h5zLNckVxd8GmcATz7c8KvYZAua', 'admin', 0)
ON DUPLICATE KEY UPDATE rol = 'admin';
