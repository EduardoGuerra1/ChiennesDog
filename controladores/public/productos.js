// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const PEDIDO_API = 'services/public/pedido.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productos');
const SHOPPING_FORM = document.getElementById('shoppingForm');
 
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');
 
const SAVE_MODAL = new bootstrap.Modal('#detalle'),
    MODAL_TITLE = document.getElementById('exampleModalLabel');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    MARCA_PRODUCTO = document.getElementById('marcaProducto'),
    CATEGORIA_PRODUCTO = document.getElementById('categoriaProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'),
    IMAGEN_PRODUCTO = document.getElementById('imagenProducto');
 
// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('idMarca', PARAMS.get('id'));
    // Petición para solicitar los productos de la categoría seleccionada.
    const DATA = await fetchData(PRODUCTO_API, 'readProductosMarca', FORM);
    console.log( FORM.append('idMarca', PARAMS.get('id')));
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se asigna como título principal la categoría de los productos.
        MAIN_TITLE.textContent = `Marca: ${PARAMS.get('nombre')}`;
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3 py-2">
                    <div class="card seleccionable border-light mb-3">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${row.nombre_producto}</h5>
                        </div>
                        <ul class="list-group list-group-flush text-center">
                            <li class="list-group-item">Categoría: ${row.nombre_categoria}</li>
                            <li class="list-group-item">Precio unitario (US$): ${row.precio_producto}</li>
                            <li class="list-group-item">Existencias: ${row.existencias_producto}</li>
                        </ul>
                        <div class="card-footer text-center">
                            <a onclick="openUpdate(${row.id_producto})" class=
                            "btn color">Ver detalle</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
});
 
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
       
       
        EXISTENCIAS_PRODUCTO.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        IMAGEN_PRODUCTO.src= `${SERVER_URL}images/productos/${ROW.imagen_producto}`
        MARCA_PRODUCTO.textContent = ROW.nombre_marca;
        NOMBRE_PRODUCTO.textContent = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.textContent = ROW.descripcion_producto;
        PRECIO_PRODUCTO.textContent = "Precio: "+ROW.precio_producto;
        CATEGORIA_PRODUCTO.textContent = ROW.categoria_producto;
        EXISTENCIAS_PRODUCTO.textContent ="Existencias: " +ROW.existencias_producto;                                  
       
 
 
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);   
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PEDIDO_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
    } else {
        sweetAlert(3, DATA.error, true, 'login.html');
    }
});