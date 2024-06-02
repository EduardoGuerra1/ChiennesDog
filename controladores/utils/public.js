//Constantes para el encabezado y el pie de pagina
const HEADER = document.querySelector("header");
const FOOTER = document.querySelector("footer");



/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/


HEADER.innerHTML = `
                
<nav class="fixed-top navbar navbar-expand-lg nav-bg">
        <div class="container-fluid ms-5">
            <a class="navbar-brand" href="#">
                <img src="../../recursos/img/logoChiennes.svg" alt="Logo" width="60vm"
                    class="d-inline-block align-text-top me-5 white-text">Chiennes Dog

            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end me-5" id="navbarNav">
                <ul class="navbar-nav me-5">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="../../recursos/img/user.svg" alt="Logo" width="30vm">
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Iniciar sesión</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Registrarse</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <img src="../../recursos/img/carrito.svg" alt="Logo" width="30vm">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
                
            `;





// Se agrega el pie de la página web después del contenido principal.
FOOTER.innerHTML = `
            <footer class="text-dark pt-5 pb-4 sticky-bottom" style="background-color: #a78768;">
            <div class="container text-center text-md-start">
              <div class="row text-center text-md-start">
        
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto nt-5">
                  <img src="../../recursos/img/logo1.svg"
                    class="img-fluid" alt="...">
        
                </div>
        
                
        
                <div class="col-md-3 col-lg-3 col-xl-3 mx-auto nt-3 text-center">
                  <h5 class="text-uppercase mb-2 font-weight-bold text-light">Redes Sociales</h5>
                  <hr style="color:#ffffff" ; class="mb-4">
        
                  <div>
                    <a href="https://www.instagram.com/chiennesdog/" target="_blank">
                      <img src="https://www.svgrepo.com/show/364604/instagram-logo-fill.svg" width="50px" height="50px"
                        class="rounded" alt="">
                    </a>
                    <a href="https://www.facebook.com/PedigreeCentroamerica/?locale=es_LA" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/256/59/59439.png" width="50px" height="50px" class="rounded"
                        alt="">
        
                    </a>
                    <a href="https://twitter.com/PedigreeLatam" target="_blank">
                      <img src="https://cdn.icon-icons.com/icons2/3261/PNG/512/twitter_logo_icon_206654.png" width="50px"
                        height="50px" class="rounded" alt="">
        
                    </a>
                  </div>
                  </div>
                </div>  
              </div>
            </div>
          </footer>
            `;
