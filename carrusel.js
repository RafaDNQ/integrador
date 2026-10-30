/* ===========================
                CARRUSEL
        =============================*/

const imagenes = [
    './img/Carrusel/PurinaBanner.jpg',
    './img/Carrusel/beepaw juguetes banner.jpg',
    './img/Carrusel/carru bonelo.jpg',
    './img/Carrusel/carru sieger.jpg',
    './img/Carrusel/eukanuba banner.jpg',
    './img/Carrusel/oferta eukanauba.jpg',
    './img/Carrusel/oldPrinceNewProdBanner.jpg'
];

let indiceActual = 0;
let intervalo;
let tiempoEspera = 4000;

const carrusel = document.querySelector('.carrusel');
const imgElemento = document.querySelector('.imagen-carrusel');

const contIzqCarru = document.querySelector('.contIzqCarru');
const contDerCarru = document.querySelector('.contDerCarru');

const btnIzq = contIzqCarru ? contIzqCarru.querySelector('.btnCarruIzq') : null;
const btnDer = contDerCarru ? contDerCarru.querySelector('.btnCarruDer') : null;

function actualizarImagen() {
    if (imgElemento) {
        imgElemento.src = imagenes[indiceActual];
    }
}

function siguienteImagen() {
    indiceActual++;
    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }
    actualizarImagen();
}

function anteriorImagen() {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }
    actualizarImagen();
}

if (btnDer) {
    btnDer.addEventListener('click', siguienteImagen);
}

if (btnIzq) {
    btnIzq.addEventListener('click', anteriorImagen);
}

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

if (carrusel) {
    carrusel.addEventListener('mouseenter', detenerAutoplay);
    carrusel.addEventListener('mouseleave', iniciarAutoplay);
}

actualizarImagen();
iniciarAutoplay();