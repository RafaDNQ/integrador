
/* ===========================
               DIV PRODUCTOS
        =============================*/


/*-----Seleccionamos todas las tarjetas de productos que existan en la página----*/
const tarjetas = document.querySelectorAll('.articuloTarjeta');

tarjetas.forEach(tarjeta => {
    /*----Buscamos los elementos INTERNOS de cada tarjeta en particular----*/
    const btnDisminuir = tarjeta.querySelector('.btn-flecha-izq');
    const btnAumentar = tarjeta.querySelector('.btn-flecha-der');
    const inputCantidad = tarjeta.querySelector('.input-cantidad');

    /*-------Evento para disminuir-------*/
    btnDisminuir.addEventListener('click', () => {
        let valorActual = parseInt(inputCantidad.value);
        let valorMinimo = parseInt(inputCantidad.getAttribute('min')) || 0;

        if (valorActual > valorMinimo) {
            inputCantidad.value = valorActual - 1;
        }
    });

    /*-------Evento para aumentar--------*/
    btnAumentar.addEventListener('click', () => {
        let valorActual = parseInt(inputCantidad.value);
        inputCantidad.value = valorActual + 1;
    });
});

/* ===========================
                CARRUSEL
        =============================*/

const carrusel = document.querySelector('.carruselOfertas');
const imagenes = carrusel.querySelectorAll('.imagenCarrusel');
const btnIzq = carrusel.querySelector('.btnCarruIzq');
const btnDer = carrusel.querySelector('.btnCarruDer');

let indiceActual = 0;
const totalImagenes = imagenes.length;
let intervalo;
const tiempoEspera = 4000; // 4 segundos

/*-----Función para cambiar de imagen usando clases-----*/
function mostrarImagen(nuevoIndice) {
    imagenes[indiceActual].classList.remove('activa');

    indiceActual = (nuevoIndice + totalImagenes) % totalImagenes;

    /*-----Agregamos la clase 'activa' a la nueva imagen-----*/
    imagenes[indiceActual].classList.add('activa');
}


function siguienteImagen() {
    mostrarImagen(indiceActual + 1);
}

function anteriorImagen() {
    mostrarImagen(indiceActual - 1);
}

/*-----Eventos de los botones----*/
btnDer.addEventListener('click', () => {
    siguienteImagen();
    reiniciarAutoplay();
});

btnIzq.addEventListener('click', () => {
    anteriorImagen();
    reiniciarAutoplay();
});

/*-----Control de Autoplay------*/
function iniciarAutoplay() {
    detenerAutoplay();
    intervalo = setInterval(siguienteImagen, tiempoEspera);

}

function detenerAutoplay() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function reiniciarAutoplay() {
    detenerAutoplay();
    iniciarAutoplay();
}

/*--------Pausar al poner el mouse encima---------*/
carrusel.addEventListener('mouseenter', detenerAutoplay);
carrusel.addEventListener('mouseleave', iniciarAutoplay);



/*-------Iniciar al cargar----------*/
//Inicia como activada para evitar una imagen vacia por 4seg al entrar a la pagina
imagenes[0].classList.add('activa');
iniciarAutoplay();

/* ===========================
                NEWSLETTER
        =============================*/

const newsletter = document.getElementById("formNL");
const email = document.getElementById("emailNewsletter");
const errorEmail = document.getElementById("errorEmail");
const resumen = document.getElementById("resumenNewsletter");

newsletter.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = email.value.trim();

    errorEmail.textContent = "";

    if (correo === "") {
        errorEmail.classList.add("invalido");
        mostrarError("Es necesario colocar un email.");
        resumen.classList.remove("Subscripto");
        console.log("Entró en la validación de correo vacío");
        return;
    }

    if (correo.length < 5 || correo.length > 254) {
        errorEmail.classList.add("invalido");
        mostrarError("El correo debe contener entre 5 a 254 caracteres.");
        resumen.classList.remove("Subscripto");
        return;
    }

    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionEmail.test(correo)) {
        errorEmail.classList.add("invalido");
        mostrarError("Ingresá un correo electrónico válido.");
        resumen.classList.remove("Subscripto");
        return;
    }


    const div = document.createElement("div");
    const titulo = document.createElement("h3");
    const texto = document.createElement("p");

    titulo.textContent = "¡Suscripción registrada!";
    texto.textContent = "Correo electrónico: " + correo;

    div.appendChild(titulo);
    div.appendChild(texto);
    resumen.classList.add("Subscripto");
    resumen.prepend(div);

    newsletter.reset();
    email.focus();
    errorEmail.classList.remove("invalido");

    function mostrarError(texto) {
        errorEmail.textContent = texto;
    }


});

//Restaura el resumen de la subscripcion y evita que se stackee
const formBoton = document.getElementById("submit");
formBoton.addEventListener('click', () => {
    if (resumen.hasChildNodes) {
        while (resumen.hasChildNodes()) {
            resumen.removeChild(resumen.firstChild);
        }
    }
});


/* ===========================
                Modal de login
        =============================*/

const dialog = document.getElementById('loginModal');
const openLogin = document.getElementById('btnLogin');
const closeLogin = document.getElementById('closeLogin');
const submitLogin = document.getElementById('ingresar');

const usuarioEmail = document.getElementById('LoginEmail');
const usuarioContra = document.getElementById('LoginPassword');

const errorEmailLogin = document.getElementById('errorEmailLogin');
const errorPassword = document.getElementById('errorPasswordLogin');

const loginForm = document.getElementById('LoginForm');
const resumenLogin = document.getElementById('resumenLogin');

let estadoInvalido = false;



//Abrir modal
openLogin.addEventListener('click', () => {
    dialog.showModal();
});



// Cerrar modal
closeLogin.addEventListener('click', () => {
    errorEmailLogin.textContent = "";
    errorPassword.textContent = "";

    loginForm.reset();

    usuarioEmail.classList.remove("invalidoLogin");
    usuarioContra.classList.remove("invalidoLogin");

    errorEmailLogin.style.display = "none";
    errorPassword.style.display = "none";


    dialog.close();
});

//Validacion de login
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = usuarioEmail.value.trim();
    const contra = usuarioContra.value;
    errorEmailLogin.textContent = "";

    //=========Validacion email===========

    if (email === "") {
        usuarioEmail.classList.add("invalidoLogin");
        errorEmailLogin.textContent = "Debes ingresar un correo electronico.";
        estadoInvalido = true;
        errorEmailLogin.style.display = "flex";
    } else {
        errorEmailLogin.textContent = "";
        usuarioEmail.classList.remove("invalidoLogin");
        errorEmailLogin.style.display = "none";
    }

    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionEmail.test(email)) {
        usuarioEmail.classList.add("invalidoLogin");
        errorEmailLogin.textContent = "Ingresá un correo válido.";
        estadoInvalido = true;
        errorEmailLogin.style.display = "flex";
    } else {
        errorEmailLogin.textContent = "";
        usuarioEmail.classList.remove("invalidoLogin");
        errorEmailLogin.style.display = "none";
    }

    //=========Validacion contraseña===========

    if (contra.value === "") {
        usuarioContra.classList.add("invalidoLogin");
        errorPassword.textContent = "Debes ingresar una contraseña";
        estadoInvalido = true;
        errorPassword.style.display = "flex";
    } else {
        errorPassword.textContent = "";
        usuarioContra.classList.remove("invalidoLogin");
        errorPassword.style.display = "none";
    }

    const expresionPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

    if (!expresionPassword.test(contra)) {
        usuarioContra.classList.add("invalidoLogin");
        errorPassword.textContent = "La contraseña debe tener entre 10 a 30 caracteres, una mayúscula, una minúscula, caracter especial y un número.";
        estadoInvalido = true;
        errorPassword.style.display = "flex";
    } else {
        errorPassword.textContent = "";
        usuarioContra.classList.remove("invalidoLogin");
        errorPassword.style.display = "none";
    }

    if (estadoInvalido === true) {
        return;
    }

    const divLog = document.createElement("div");
    const tituloLog = document.createElement("h3");
    const emailLog = document.createElement("p");
    const passLog = document.createElement("p");

    tituloLog.textContent = "Ingreso exitoso";
    emailLog.textContent = "Correo: " + email;
    passLog.textContent = "Contraseña: " + contra;

    divLog.appendChild(tituloLog);
    divLog.appendChild(emailLog);
    divLog.appendChild(passLog);
    resumenLogin.classList.add("ingresoValido");
    resumenLogin.prepend(divLog);


    dialog.close();
    document.getElementById('btnLogin').style.display = "none";
    resumenLogin.style.display = "flex";

});


// ============= Mostrar iconos password =============

const iconoMostrar = document.getElementById('mostrarIcono');
const iconoOcultar = document.getElementById('ocultarIcono');
const iconoDiv = document.getElementById('iconosDiv');
//const usuarioContra


iconoDiv.addEventListener('click', function () {

    if (getComputedStyle(iconoMostrar).display === "block") {

        usuarioContra.type = "text";

        iconoMostrar.style.display = "none";

        iconoOcultar.style.display = "block";

    } else {

        usuarioContra.type = "password";

        iconoMostrar.style.display = "block";

        iconoOcultar.style.display = "none";

    }



});




/* ===========================
                Modal de login [END]
        =============================*/


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('botonComprar')) {
        const tarjeta = e.target.closest('.articuloTarjeta');

        if (!tarjeta) return;

        const tituloElemento = tarjeta.querySelector('.titulo');
        const precioElemento = tarjeta.querySelector('.precio');
        const cantidadElemento = tarjeta.querySelector('.input-cantidad');

        const titulo = tituloElemento ? tituloElemento.textContent.trim() : '';
        const precioTexto = precioElemento ? precioElemento.textContent.trim() : '0';

        // limpiamos el texto para obtener sólo números
        const precioNumerico = parseFloat(precioTexto.replace(/[^0-9.-]+/g, '')) || 0;
        const cantidad = cantidadElemento ? (parseInt(cantidadElemento.value) || 1) : 1;

        const contenidoCarrito = document.getElementById("contenidoCarrito");

        if (!contenidoCarrito) {
            console.error("No se encontró el contenedor #contenidoCarrito en el DOM.");
            return;
        }

        //elementos para el carrito
        const divCarritoArt = document.createElement("div");
        divCarritoArt.className = "carritoArt";

        const divArtTitulo = document.createElement("div");
        divArtTitulo.className = "artTitulo";

        const pTitulo = document.createElement("p");
        pTitulo.className = "pTitulo";
        pTitulo.textContent = titulo;


        const divArtCant = document.createElement("div");
        divArtCant.className = "artCant";

        const contButtons = document.createElement("div");
        contButtons.className = "contAcumular";

        const btnCarritoIzq = document.createElement("button");
        btnCarritoIzq.className = "btn-flecha-izq";
        btnCarritoIzq.textContent = "◄";

        const inputCantCarrito = document.createElement("input");
        inputCantCarrito.type = 'number';
        inputCantCarrito.value = cantidad;
        inputCantCarrito.min = '1';
        inputCantCarrito.className = "input-cantidad";
        inputCantCarrito.readOnly = true;

        const btnCarritoDer = document.createElement("button");
        btnCarritoDer.className = "btn-flecha-der";
        btnCarritoDer.textContent = "►";

        const divArtTotal = document.createElement("div");
        divArtTotal.className = "artTotal";

        const pArtTotal = document.createElement("p");
        pArtTotal.className = "precio";
        pArtTotal.textContent = `$${(precioNumerico * cantidad).toFixed(2)}`;

        const pArtPrecioSingle = document.createElement("p");
        pArtPrecioSingle.className = "precioSingle";
        pArtPrecioSingle.textContent = `$${precioNumerico.toFixed(2)}`;
        pArtPrecioSingle.style.display = "none";

        const eliminar = document.createElement("div");
        eliminar.className = "eliminarDiv";
        const eliminarImg = document.createElement("img");
        eliminarImg.className = "eliminarImg";
        eliminarImg.src = "./img/nav/trash-can.png";
        eliminarImg.alt = "Icono Eliminar";

        // armado de la estructura DOM
        divArtTitulo.appendChild(pTitulo);
        divArtTitulo.appendChild(eliminar);
        eliminar.appendChild(eliminarImg);

        contButtons.appendChild(btnCarritoIzq);
        contButtons.appendChild(inputCantCarrito);
        contButtons.appendChild(btnCarritoDer);
        divArtCant.appendChild(contButtons);

        divArtTotal.appendChild(pArtTotal);
        divArtTotal.appendChild(pArtPrecioSingle);

        divCarritoArt.appendChild(divArtTitulo);
        divCarritoArt.appendChild(divArtCant);
        divCarritoArt.appendChild(divArtTotal);

        contenidoCarrito.prepend(divCarritoArt);


        actualizarTotalCompra();

    }
});