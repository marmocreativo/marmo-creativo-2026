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

-- Blog (artículos en Markdown, se administran desde /admin/articulos)
CREATE TABLE IF NOT EXISTS articulos (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo            VARCHAR(200) NOT NULL,
  slug              VARCHAR(120) NOT NULL COMMENT 'URL: /blog/<slug>. Minúsculas, números y guiones',
  resumen           VARCHAR(500) NOT NULL COMMENT 'Extracto de las tarjetas y del encabezado',
  meta_titulo       VARCHAR(80) NULL COMMENT 'Título SEO (si está vacío se usa el título)',
  meta_descripcion  VARCHAR(220) NULL COMMENT 'Meta descripción (si está vacía se usa el resumen)',
  palabra_clave     VARCHAR(120) NULL COMMENT 'Consulta principal a la que apunta el artículo',
  noindex           TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 = no indexar en buscadores',
  categoria         VARCHAR(40) NOT NULL COMMENT 'Slug de categoría (ver lib/blog-categorias.ts)',
  portada           VARCHAR(255) NULL COMMENT 'Ruta pública, WebP con lado mayor de 1200 px',
  portada_alt       VARCHAR(200) NULL COMMENT 'Texto alternativo de la portada',
  contenido         MEDIUMTEXT NOT NULL COMMENT 'HTML del editor visual (o Markdown en los borradores iniciales)',
  contenido_formato VARCHAR(10) NOT NULL DEFAULT 'html' COMMENT 'markdown o html',
  publicado         TINYINT(1) NOT NULL DEFAULT 0,
  fecha_publicacion DATE NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_articulos_slug (slug),
  KEY idx_articulos_publicados (publicado, fecha_publicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS articulo_imagenes (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_articulo  INT UNSIGNED NOT NULL,
  archivo      VARCHAR(255) NOT NULL COMMENT 'Ruta pública, WebP con lado mayor de 1200 px',
  ancho        SMALLINT UNSIGNED NOT NULL,
  alto         SMALLINT UNSIGNED NOT NULL,
  descripcion  VARCHAR(200) NULL COMMENT 'Texto alternativo / pie de foto',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_articulo_imagenes (id_articulo),
  CONSTRAINT fk_articulo_imagenes FOREIGN KEY (id_articulo)
    REFERENCES articulos (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  referencias_analisis JSON NULL COMMENT 'Guía de estilo que la IA sacó de las referencias: {hash, texto}',
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

-- Cada generación (propuestas o sitio completo) es una tarea que corre en segundo plano:
-- la pantalla consulta su estado y progreso. También guarda el consumo para saber cuánto cuesta.
CREATE TABLE IF NOT EXISTS sitio_ia_tareas (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_sitio        INT UNSIGNED NOT NULL,
  tipo            ENUM('propuestas','sitio','edicion') NOT NULL,
  estado          ENUM('ejecutando','listo','error') NOT NULL DEFAULT 'ejecutando',
  progreso        VARCHAR(200) NULL,
  error           VARCHAR(500) NULL,
  resultado       MEDIUMTEXT NULL COMMENT 'Resultado de una edición (JSON); se borra al recogerlo',
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

-- ---------------------------------------------------------------------------
-- Administrador inicial
-- Contraseña por defecto: Marmo2026!   (CÁMBIALA después del primer acceso)
-- ---------------------------------------------------------------------------
INSERT INTO usuarios (nombre, email, password_hash, rol, enviar_promociones)
VALUES ('Manuel Marmolejo', 'marmocreativo@gmail.com',
        '$2b$10$DGRhBWyeVeObjHkdWd6YNO/wR9h5zLNckVxd8GmcATz7c8KvYZAua', 'admin', 0)
ON DUPLICATE KEY UPDATE rol = 'admin';
