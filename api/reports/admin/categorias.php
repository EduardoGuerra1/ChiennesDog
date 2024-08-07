<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/reports.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/productos_data.php');
require_once('../../models/data/categorias_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Productos por Categorias');
// Se instancia el módelo Marca para obtener los datos.
$categoria = new CategoriaData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataCategorias = $categoria->readAll()) {
    // Se establece un color de relleno para los encabezados.
    // Formato RGB
    $pdf->setFillColor(255, 102, 7);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(86, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(50, 10, 'Precio', 1, 0, 'C', 1);
    $pdf->cell(50, 10, 'Estado', 1, 1, 'C', 1);
    //$pdf->cell(40, 10, 'Existencia', 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la marca.
    $pdf->setFillColor(255, 158, 8);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataCategorias as $rowCategoria) {
        // Se imprime una celda con el nombre de la marca.
        $pdf->cell(0, 10, $pdf->encodeString('Categoría: ' . $rowCategoria['nombre_categoria']), 1, 1, 'C', 1);
        // Se instancia el módelo Producto para procesar los datos.
        $producto = new ProductoData;
        // Se establece la marca para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($producto->setCategoria($rowCategoria['id_categoria'])) {
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    ($rowProducto['estado_producto']) ? $estado = 'Activo' : $estado = 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(86, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0);
                    $pdf->cell(50, 10, $rowProducto['precio_producto'], 1, 0);
                    $pdf->cell(50, 10, $estado, 1, 1);
                    //$pdf->cell(40, 10, $rowProducto['existencias_producto'], 1, 1);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la marca'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, $pdf->encodeString('Marca incorrecta o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay marcas para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
?>
