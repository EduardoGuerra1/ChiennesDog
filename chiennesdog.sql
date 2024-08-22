DROP DATABASE IF EXISTS db_chiennes_dog;
CREATE DATABASE db_chiennes_dog;
USE db_chiennes_dog;

DROP USER IF EXISTS 'admin_chiennes'@'localhost';
CREATE USER 'admin_chiennes'@'localhost' IDENTIFIED BY 'password1$';
GRANT ALL PRIVILEGES ON db_chiennes_dog.* TO 'admin_chiennes'@'localhost';
FLUSH PRIVILEGES;

#CREACION DE LA TABLA PARA LOS CARGOS
CREATE TABLE tb_cargos(
	id_cargo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_cargo VARCHAR(50) NOT NULL
);

#CREACION DE LA TABLA PARA LOS ADMINISTRADORES DEL SITIO
CREATE TABLE tb_administradores(
	id_administrador INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_administrador VARCHAR(50) NOT NULL,
	apellido_administrador VARCHAR(50) NOT NULL,
	id_cargo INT NOT NULL,
	correo_administrador VARCHAR(100) NOT NULL UNIQUE,
	clave_administrador VARCHAR(100) NOT NULL,
	fecha_registro DATE NOT NULL DEFAULT NOW()
);

#CREACION DE LA TABLA PARA LOS CLIENTES
CREATE TABLE tb_clientes(
	id_cliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_cliente VARCHAR(50) NOT NULL,
	apellido_cliente VARCHAR(50) NOT NULL,
	dui_cliente VARCHAR(10) NOT NULL UNIQUE,
	correo_cliente VARCHAR(100) NOT NULL UNIQUE,
	telefono_cliente VARCHAR(9) NOT NULL UNIQUE,
	nacimiento_cliente DATE NOT NULL,
	direccion_cliente VARCHAR(250) NOT NULL,
	clave_cliente VARCHAR(100) NOT NULL,
	fecha_registro DATE NOT NULL DEFAULT NOW(),
	estado_cliente TINYINT(1) NOT NULL DEFAULT 1
);

#CREACION DE LA TABLA PARA LAS MARCAS DE LOS PRODUCTOS
CREATE TABLE tb_marcas(
	id_marca INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_marca VARCHAR(50) NOT NULL,
	imagen_marca VARCHAR(255) NOT NULL
);

#CREACION DE LA TABLA PARA LAS CATEGORIAS
CREATE TABLE tb_categorias(
	id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_categoria VARCHAR(50) NOT NULL
);

#CREACION DE LA TABLA PARA LOS PRODUCTOS
CREATE TABLE tb_productos(
	id_producto INT AUTO_INCREMENT PRIMARY KEY,
	id_categoria INT NOT NULL,
	nombre_producto VARCHAR(50) NOT NULL,
	id_marca INT NOT NULL,
	descripcion_producto VARCHAR(250),
	precio_producto NUMERIC(5,2) NOT NULL,
	imagen_producto VARCHAR(255) NOT NULL,
	estado_producto BOOLEAN NOT NULL,
	existencias_producto INT NOT NULL,
	fecha_registro DATE NOT NULL DEFAULT NOW(),
	id_administrador INT NOT NULL
);

#CREACION DE LA TABLA PARA LOS PEDIDOS
CREATE TABLE tb_pedidos(
	id_pedido INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_cliente INT NOT NULL,   
	estado_pedido ENUM('Entregado','Pendiente') NOT NULL,
	fecha_registro DATE NOT NULL DEFAULT NOW(),
	direccion_pedido VARCHAR(250) NOT NULL
);

#CREACION DE LA TABLA PARA LOS DETALLES DEL PEDIDO
CREATE TABLE tb_detalles_pedidos(
	id_detalle INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_pedido INT NOT NULL,
	id_producto INT NOT NULL,
	cantidad_producto INT NOT NULL CHECK(cantidad_producto >=1),
	precio_producto NUMERIC(5,2) NOT NULL
);

#CREACION DE LA TABLA PARA LAS VALORACIONES
CREATE TABLE tb_valoraciones(
	id_valoracion INT PRIMARY KEY AUTO_INCREMENT,
	calificacion_producto INT NOT NULL,
	comentario VARCHAR(250),
	fecha_valoracion DATE NOT NULL DEFAULT NOW()
);

#CREACION DE LA TABLA PARA LAS VALORACIONES DE LOS PRODUCTOS
CREATE TABLE tb_valoracion_productos(
	id_vp INT AUTO_INCREMENT PRIMARY KEY,
	id_detalle INT NOT NULL,	
	id_valoracion INT NOT NULL
);

#CREACION DE RELACIONES
ALTER TABLE tb_administradores
ADD CONSTRAINT fk_admin_cargo
FOREIGN KEY (id_cargo) REFERENCES tb_cargos(id_cargo);

ALTER TABLE tb_pedidos
ADD CONSTRAINT fk_pedido_cliente
FOREIGN KEY (id_cliente) REFERENCES tb_clientes(id_cliente);

ALTER TABLE tb_productos
ADD CONSTRAINT fk_producto_categoria
FOREIGN KEY (id_categoria) REFERENCES tb_categorias(id_categoria),
ADD CONSTRAINT fk_producto_marca
FOREIGN KEY (id_marca) REFERENCES tb_marcas(id_marca),
ADD CONSTRAINT fk_producto_admin
FOREIGN KEY (id_administrador) REFERENCES tb_administradores(id_administrador);

ALTER TABLE tb_valoracion_productos
ADD CONSTRAINT fk_valo_valoracion
FOREIGN KEY (id_valoracion) REFERENCES tb_valoraciones(id_valoracion),
ADD CONSTRAINT fk_valo_detalle
FOREIGN KEY (id_detalle) REFERENCES tb_detalles_pedidos(id_detalle);

ALTER TABLE tb_detalles_pedidos
ADD CONSTRAINT fk_detalle_pedido
FOREIGN KEY (id_pedido) REFERENCES tb_pedidos(id_pedido),
ADD CONSTRAINT fk_detalle_producto
FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto);


INSERT INTO tb_cargos (nombre_cargo)values ('jefe');

INSERT INTO tb_administradores(nombre_administrador, apellido_administrador, id_cargo, correo_administrador, clave_administrador) 
VALUES ('Eduts', 'Guerra', 1, 'eduts@gmail.com','$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e' );

SELECT * FROM tb_administradores;
SELECT * FROM tb_productos;
SELECT * FROM tb_clientes;
SELECT * FROM tb_pedidos;
SELECT c.apellido_cliente, c.nombre_cliente, c.correo_cliente, c.telefono_cliente, COUNT(p.id_pedido) AS total_pedidos
FROM tb_clientes c
LEFT JOIN tb_pedidos p ON c.id_cliente = p.id_cliente
GROUP BY c.apellido_cliente;

SELECT 
    c.nombre_cliente,
    p.estado_pedido,
    p.fecha_registro,
    p.direccion_pedido,
    prod.nombre_producto,
    dp.cantidad_producto,
    dp.precio_producto
FROM 
    tb_pedidos p
JOIN 
    tb_detalles_pedidos dp ON p.id_pedido = dp.id_pedido
JOIN 
    tb_clientes c ON p.id_cliente = c.id_cliente
JOIN 
    tb_productos prod ON dp.id_producto = prod.id_producto
WHERE 
    p.estado_pedido = 'Pendiente';

SELECT 
    p.nombre_producto,
    c.nombre_categoria,
    m.nombre_marca,
    p.precio_producto,
    p.estado_producto,
    p.existencias_producto
FROM 
    tb_productos p
JOIN 
    tb_categorias c ON p.id_categoria = c.id_categoria
JOIN 
    tb_marcas m ON p.id_marca = m.id_marca;

                
INSERT INTO tb_marcas (nombre_marca, imagen_marca) 
VALUES 
('Purina', 'purina.png'),
('Pedigree', 'pedigree.png'),
('Royal Canin', 'royalcanin.png'),
('Hill\'s', 'hills.png'),
('Blue Buffalo', 'bluebuffalo.png');

INSERT INTO tb_categorias (nombre_categoria) 
VALUES 
('Alimento para perros'),
('Juguetes'),
('Accesorios'),
('Ropa para perros'),
('Camas para perros');

INSERT INTO tb_productos (id_categoria, nombre_producto, id_marca, descripcion_producto, precio_producto, imagen_producto, estado_producto, existencias_producto, id_administrador) 
VALUES 
(1, 'Purina Dog Chow', 1, 'Alimento seco para perros adultos', 29.99, 'dogchow.png', TRUE, 100, 1),
(2, 'Pelota de goma', 2, 'Pelota resistente para perros de todos los tamaños', 5.99, 'pelota_goma.png', TRUE, 200, 1),
(3, 'Collar reflectante', 3, 'Collar ajustable con banda reflectante para mayor seguridad', 12.99, 'collar_reflectante.png', TRUE, 150, 1),
(4, 'Chaleco acolchado', 4, 'Chaleco acolchado para perros pequeños y medianos', 19.99, 'chaleco_acolchado.png', TRUE, 50, 1),
(5, 'Cama ortopédica', 5, 'Cama ortopédica con espuma de memoria para perros mayores', 59.99, 'cama_ortopedica.png', TRUE, 30, 1);

INSERT INTO tb_clientes (nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente) 
VALUES 
('Juan', 'Pérez', '12345678-9', 'juan.perez@example.com', '701234567', '1985-06-15', '123 Calle Principal, Ciudad', '$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e'),
('María', 'González', '23456789-0', 'maria.gonzalez@example.com', '701234568', '1990-07-22', '456 Avenida Secundaria, Ciudad', '$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e'),
('Carlos', 'López', '34567890-1', 'carlos.lopez@example.com', '701234569', '1982-08-30', '789 Calle Tercera, Ciudad', '$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e'),
('Ana', 'Martínez', '45678901-2', 'ana.martinez@example.com', '701234570', '1995-09-10', '1011 Calle Cuarta, Ciudad', '$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e'),
('Luis', 'Hernández', '56789012-3', 'luis.hernandez@example.com', '701234571', '1988-10-05', '1213 Calle Quinta, Ciudad', '$2y$10$mgITCka8G.nd7u84zBEKZ.fpqpRiJDotyePB8WoxZA3..7DgBji7e');

INSERT INTO tb_pedidos (id_cliente, estado_pedido, direccion_pedido) 
VALUES 
(1, 'Entregado', '123 Calle Principal, Ciudad'),
(2, 'Pendiente', '456 Avenida Secundaria, Ciudad'),
(3, 'Entregado', '789 Calle Tercera, Ciudad'),
(4, 'Pendiente', '1011 Calle Cuarta, Ciudad'),
(5, 'Entregado', '1213 Calle Quinta, Ciudad');

INSERT INTO tb_detalles_pedidos (id_pedido, id_producto, cantidad_producto, precio_producto) 
VALUES 
(1, 1, 2, 29.99),  -- Pedido 1, Producto 1, 2 unidades a 29.99 cada una
(1, 2, 1, 5.99),   -- Pedido 1, Producto 2, 1 unidad a 5.99 cada una
(2, 3, 3, 12.99),  -- Pedido 2, Producto 3, 3 unidades a 12.99 cada una
(3, 4, 1, 19.99),  -- Pedido 3, Producto 4, 1 unidad a 19.99 cada una
(4, 5, 2, 59.99),  -- Pedido 4, Producto 5, 2 unidades a 59.99 cada una
(5, 1, 1, 29.99);  -- Pedido 5, Producto 1, 1 unidad a 29.99 cada una
