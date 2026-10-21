-- Prueba de la consola SQL (modo ESCRITURA).
-- Crea una tabla de juguete, la usa y la borra al final: no deja nada en tu base.
-- Resultado esperado: 9 resultados (ver el comentario de cada paso).

USE marmo_creativo;                                   -- #1 OK, 0 filas

DROP TABLE IF EXISTS zz_prueba_consola;               -- #2 OK (pide confirmar por tener DROP)

CREATE TABLE zz_prueba_consola (                      -- #3 OK
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO zz_prueba_consola (nombre)                -- #4 OK, 3 filas afectadas
VALUES ('uno'), ('dos'), ('tres');

UPDATE zz_prueba_consola                              -- #5 OK, 1 fila afectada
SET nombre = UPPER(nombre)
WHERE nombre = 'dos';

SELECT * FROM zz_prueba_consola ORDER BY id;          -- #6 tabla con 3 filas: uno, DOS, tres

SELECT COUNT(*) AS total FROM zz_prueba_consola;      -- #7 tabla con total = 3

DROP TABLE zz_prueba_consola;                         -- #8 OK (limpieza)

-- #9: la tabla ya no existe, así que debe dar 0 filas
SHOW TABLES LIKE 'zz_prueba_consola';
