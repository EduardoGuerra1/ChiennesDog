<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*   Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ProductoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $existencias = null;
    protected $imagen = null;
    protected $categoria = null;
    protected $marca = null;
    protected $estado = null;
 
    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/productos/';
 
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, nombre_marca,estado_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                INNER JOIN tb_marcas USING(id_marca)
                WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
 
    public function createRow()
    {
        $sql = 'INSERT INTO tb_productos(nombre_producto, descripcion_producto, precio_producto, existencias_producto, imagen_producto, estado_producto, id_categoria, id_marca, id_administrador)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->precio, $this->existencias, $this->imagen, $this->estado, $this->categoria, $this->marca, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }
 
    public function readAll()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, nombre_marca,estado_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                INNER JOIN tb_marcas USING(id_marca)
                ORDER BY nombre_producto';
        return Database::getRows($sql);
    }
 
    public function readOne()
    {
        $sql = 'SELECT id_producto, nombre_marca, nombre_producto, descripcion_producto, precio_producto, existencias_producto, imagen_producto, id_categoria, id_marca, estado_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                INNER JOIN tb_marcas USING(id_marca)
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
 
    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
 
    public function updateRow()
    {
        $sql = 'UPDATE tb_productos
                SET imagen_producto = ?, nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, estado_producto = ?, id_categoria = ?, id_marca = ?
                WHERE id_producto = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this->estado, $this->categoria, $this->marca,  $this->id);
        return Database::executeRow($sql, $params);
    }
 
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
 
    public function readProductosMarca()
    {
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.existencias_producto,c.nombre_categoria
                FROM tb_productos p
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                INNER JOIN tb_categorias c ON p.id_categoria = c.id_categoria
                WHERE p.id_marca = ? AND p.estado_producto = true
                ORDER BY p.nombre_producto;';
        $params = array($this->marca);
        return Database::getRows($sql, $params);
    }
 
    /*
    *   Métodos para generar gráficos.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT c.nombre_categoria, COUNT(p.id_producto) AS cantidad
                FROM tb_productos p
                INNER JOIN tb_categorias c ON p.id_categoria = c.id_categoria
                GROUP BY c.nombre_categoria
                ORDER BY cantidad DESC
                LIMIT 5 ';
        return Database::getRows($sql);
    }

    public function porcentajeCategoria()
    {
        $sql = 'SELECT nombre_categoria, COUNT(*) AS cantidad_categorias
                FROM tb_categorias
                GROUP BY nombre_categoria';
                return Database::getRows($sql);

    }

    public function existenciasProductos()
    {
        $sql = 'SELECT nombre_producto, existencias_producto
                FROM tb_productos
                ORDER BY existencias_producto DESC
                LIMIT 5';
                return Database::getRows($sql);
    } 
    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM producto)), 2) porcentaje
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    public function productosMarcas()
    {
        $sql = 'SELECT m.nombre_marca,
                    p.id_producto,
                    p.nombre_producto,
                    p.descripcion_producto,
                    p.precio_producto,
                    p.imagen_producto,
                    p.estado_producto,
                    p.existencias_producto,
                    p.fecha_registro
                FROM tb_productos p
                JOIN tb_marcas m ON p.id_marca = m.id_marca
                ORDER BY m.nombre_marca, p.nombre_producto';
        return Database::getRows($sql);
    }

    public function ventasProductos()
    {
        $sql = 'SELECT p.nombre_producto, SUM(dp.cantidad_producto * dp.precio_producto) AS total_ventas
                FROM tb_productos p
                JOIN tb_detalles_pedidos dp ON p.id_producto = dp.id_producto
                GROUP BY p.nombre_producto
                ORDER BY total_ventas DESC';
        return Database::getRows($sql);
    }
    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto, existencias_producto
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                WHERE id_categoria = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function productosMarca()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto, existencias_producto
                FROM tb_productos
                INNER JOIN tb_marcas USING(id_marca)
                WHERE id_marca = ?
                ORDER BY nombre_producto';
        $params = array($this->marca);
        return Database::getRows($sql, $params);
    }

    public function productosReport()
    {
        $sql = 'SELECT p.nombre_producto, c.nombre_categoria, m.nombre_marca, p.precio_producto,
                p.estado_producto, p.existencias_producto
                FROM tb_productos p
                JOIN tb_categorias c ON p.id_categoria = c.id_categoria
                JOIN tb_marcas m ON p.id_marca = m.id_marca';
        $params = array();
        return Database::getRows($sql, $params);
    }
}