-- Creacion de la base de datos para ED01
-- Creacion de la base de datos 
CREATE DATABASE ED1_SWOS;
USE ED1_SWOS;
-- Tabla de patrocinadores del donaciones
CREATE TABLE patrocinador(
	id_patrocinador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_patrocinador VARCHAR(50) NOT NULL
);

-- Tabla dpara registro en formulario.
CREATE TABLE registro(
id_registro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nombre VARCHAR(50) NOT NULL,
correo VARCHAR(50) NOT NULL
);

-- Insercion de datos de ejemplo 
INSERT INTO patrocinador(nombre_patrocinador) VALUES 
("Oscar Loyola"),
("Sebastian Hernandez"),
("Alfredo Mena"),
("Juilio Cesar");

INSERT INTO registro(nombre, correo) VALUES 
("Oscar Loyola","oscar@gmail.com"),
("Sebastian Hernandez","sebas@gmail.com"),
("Alfredo Mena","mena@gmail.com"),
("Juilio Cesar","roma@gmail.com");

select * from patrocinador;

select * from registro;


