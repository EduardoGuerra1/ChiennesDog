// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/productos.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    // Llamada a la funciones que generan los gráficos en la página web.
    graficoBarrasCategorias();
    graficoPastelCategorias();
    graficoBarrasExistencias();
    graficoPastelProductos();
    graficoBarrasVentas();
});

/*
*   Función asíncrona para mostrar un gráfico de barras con la cantidad de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelCategorias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'cantidadProductosCategoria');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let categorias = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            categorias.push(row.nombre_categoria);
            cantidades.push(row.cantidad);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        pieGraph('chart1', categorias, cantidades, 'Cantidad de productos', 'Cantidad de productos por categoría');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}

/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoBarrasCategorias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'porcentajeCategoria');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let categorias = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            categorias.push(row.nombre_categoria);
            cantidades.push(row.cantidad_categorias);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart2', categorias, cantidades, 'Cantidad de productos', 'Cantidad de productos por categoría');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}

const graficoBarrasExistencias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'existenciasProductos');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let productos = [];
        let existencias = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            existencias.push(row.existencias_producto);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart3', productos, existencias, 'Nombre de Productos', 'Existencias de Producto');
    } else {
        document.getElementById('chart3').remove();
        console.log(DATA.error);
    }
}

const graficoPastelProductos = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'productosMarcas');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let categorias = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            nombre_marca.push(row.m.nombre_marca);
            nombre_producto.push(row.p.nombre_producto);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        pieGraph('chart4', nombre_marca, nombre_producto, 'Nombre de la Marca', 'Nombre de el producto');
    } else {
        document.getElementById('chart4').remove();
        console.log(DATA.error);
    }
}

const graficoBarrasVentas = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'ventasProductos');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let nombre_producto = [];
        let ventas = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            nombre_producto.push(row.cantidad_producto);
            ventas.push(row.total_ventas);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart5', cantidad_producto, total_ventas, 'Nombre ', 'Total Ventas');
    } else {
        document.getElementById('chart5').remove();
        console.log(DATA.error);
    }
}
