
/* ===========================
               DIV PRODUCTOS
        =============================*/


// Seleccionamos todas las tarjetas de productos que existan en la página
const tarjetas = document.querySelectorAll('.articuloTarjeta');

tarjetas.forEach(tarjeta => {
    // Buscamos los elementos INTERNOS de cada tarjeta en particular
    const btnDisminuir = tarjeta.querySelector('.btn-flecha-izq');
    const btnAumentar = tarjeta.querySelector('.btn-flecha-der');
    const inputCantidad = tarjeta.querySelector('.input-cantidad');

    // Evento para disminuir
    btnDisminuir.addEventListener('click', () => {
        let valorActual = parseInt(inputCantidad.value);
        let valorMinimo = parseInt(inputCantidad.getAttribute('min')) || 0;

        if (valorActual > valorMinimo) {
            inputCantidad.value = valorActual - 1;
        }
    });

    // Evento para aumentar
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

// Función para cambiar de imagen usando clases
function mostrarImagen(nuevoIndice) {
    imagenes[indiceActual].classList.remove('activa');

    indiceActual = (nuevoIndice + totalImagenes) % totalImagenes;

    // Agregamos la clase 'activa' a la nueva imagen
    imagenes[indiceActual].classList.add('activa');
}

// Funciones de avance
function siguienteImagen() {
    mostrarImagen(indiceActual + 1);
}

function anteriorImagen() {
    mostrarImagen(indiceActual - 1);
}

// Eventos de los botones
btnDer.addEventListener('click', () => {
    siguienteImagen();
    reiniciarAutoplay();
});

btnIzq.addEventListener('click', () => {
    anteriorImagen();
    reiniciarAutoplay();
});

// Control de Autoplay
function iniciarAutoplay() {
    detenerAutoplay(); //agregado para evitar stackeo de intervalos
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

// Pausar al poner el mouse encima
carrusel.addEventListener('mouseenter', detenerAutoplay);
carrusel.addEventListener('mouseleave', iniciarAutoplay);



// Iniciar al cargar
imagenes[0].classList.add('activa'); //Inicia como activada para evitar una imagen vacia por 4seg al entrar a la pagina
iniciarAutoplay();

/* ===========================
                NEWSLETTER
        =============================*/

const newsletter = document.getElementById("formNL");
const email = document.querySelector(".inputEmail")
const errorEmail = document.getElementById("errorEmail");
const resumen = document.getElementById("resumenNewsletter");

newsletter.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = email.value.trim();

    errorEmail.textContent = "";

    if (correo === "") {
        errorEmail.classList.add("invalido");
        mostrarError("Es necesario colocar un email.")
        resumen.classList.remove("Subscripto");
        return;
    }

    if (correo.length < 5 || correo.length > 254) {
        errorEmail.classList.add("invalido");
        mostrarError("El correo debe contener entre 5 a 254 caracteres.")
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
