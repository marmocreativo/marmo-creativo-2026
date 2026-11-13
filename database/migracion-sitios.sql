-- Migración: creador de sitios web con IA (proyectos web).
-- Una base nueva ya lo incluye en schema.sql. Ejecutar una sola vez en una base existente.

USE marmo_creativo;

-- Un "proyecto web" por fila: briefing, SEO, branding y la hoja de estilos (css) del sitio.
CREATE TABLE IF NOT EXISTS sitios (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_usuario        INT UNSIGNED NOT NULL,
  nombre            VARCHAR(150) NOT NULL,
  estado            ENUM('borrador','propuestas','completo') NOT NULL DEFAULT 'borrador',
  briefing          JSON NULL COMMENT 'Datos de la empresa (paso 1)',
  seo               JSON NULL COMMENT 'Palabra clave, dominio, etc. (paso 2)',
  branding          JSON NULL COMMENT 'Colores y tipografías (paso 2)',
  referencias_urls  JSON NULL COMMENT 'Lista de URLs de sitios de referencia (paso 3)',
  propuesta_elegida TINYINT UNSIGNED NULL COMMENT 'Número (1-3) de la propuesta elegida en el paso 4',
  css               MEDIUMTEXT NULL COMMENT 'styles.css del sitio',
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sitios_usuario (id_usuario),
  CONSTRAINT fk_sitios_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Páginas del sitio (máximo 7, Home y Contacto incluidas). `html` es el documento completo.
CREATE TABLE IF NOT EXISTS sitio_paginas (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_sitio    INT UNSIGNED NOT NULL,
  slug        VARCHAR(80) NOT NULL COMMENT 'Nombre del archivo sin .html (index = Home)',
  titulo      VARCHAR(150) NOT NULL COMMENT 'Nombre para el menú y el editor',
  tipo        ENUM('home','servicio','contacto','otra') NOT NULL DEFAULT 'otra',
  html        MEDIUMTEXT NULL,
  orden       TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sitio_pagina_slug (id_sitio, slug),
  CONSTRAINT fk_sitio_paginas FOREIGN KEY (id_sitio)
    REFERENCES sitios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Archivos del proyecto: galería (imágenes reutilizables), imágenes de referencia, logo y documentos del briefing.
CREATE TABLE IF NOT EXISTS sitio_archivos (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_sitio    INT UNSIGNED NOT NULL,
  tipo        ENUM('galeria','referencia','logo','documento') NOT NULL,
  archivo     VARCHAR(255) NOT NULL COMMENT 'Ruta pública (imágenes WebP) o interna (documentos)',
  nombre      VARCHAR(200) NULL COMMENT 'Nombre original del archivo subido',
  ancho       SMALLINT UNSIGNED NULL,
  alto        SMALLINT UNSIGNED NULL,
  texto       MEDIUMTEXT NULL COMMENT 'Texto extraído de documentos Word',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sitio_archivos (id_sitio, tipo),
  CONSTRAINT fk_sitio_archivos FOREIGN KEY (id_sitio)
    REFERENCES sitios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Propuestas de Home generadas por la IA (paso 4): solo el HTML de la página de inicio.
CREATE TABLE IF NOT EXISTS sitio_propuestas (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_sitio    INT UNSIGNED NOT NULL,
  numero      TINYINT UNSIGNED NOT NULL,
  nombre      VARCHAR(100) NULL,
  html        MEDIUMTEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sitio_propuesta (id_sitio, numero),
  CONSTRAINT fk_sitio_propuestas FOREIGN KEY (id_sitio)
    REFERENCES sitios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
