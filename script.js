
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
    indiceActual = nuevoIndice;
    if (indiceActual >= totalImagenes) {
        indiceActual = 0;
    } else if (indiceActual < 0) {
        indiceActual = totalImagenes - 1;
    }

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
    intervalo = setInterval(siguienteImagen, tiempoEspera);
}

function detenerAutoplay() {
    clearInterval(intervalo);
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