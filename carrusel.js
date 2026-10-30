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




