// Seleccionamos los elementos específicos dentro del contenedor
const btnDisminuir = document.querySelector('.btn-flecha-izq');
const btnAumentar = document.querySelector('.btn-flecha-der');
const inputCantidad = document.querySelector('.input-cantidad');

// Evento para disminuir (flecha izquierda)
btnDisminuir.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value) || 1;
    let valorMinimo = parseInt(inputCantidad.getAttribute('min')) || 1;

    if (valorActual > valorMinimo) {
        inputCantidad.value = valorActual - 1;
    }
});

// Evento para aumentar (flecha derecha)
btnAumentar.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value) || 1;
    inputCantidad.value = valorActual + 1;
});
/*--------------------------
     Casrrusel
     -------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.articuloperrosugeridos');
    const imagenes = track.querySelectorAll('img');

    let indiceActual = 0;
    const totalImagenes = imagenes.length;
    const imagenesVisibles = 4; // Límite máximo de imágenes visibles a la vez
    const tiempoIntervalo = 3000; // 3 segundos
    let intervalo; // Variable para almacenar el temporizador

    function moverCarrusel() {
        indiceActual++;
        if (indiceActual > totalImagenes - imagenesVisibles) {
            indiceActual = 0;
        }

        // MEDIDA EXACTA: Obtenemos el ancho real de una imagen en píxeles
        const anchoImagen = imagenes[0].getBoundingClientRect().width;
        // El espacio (gap) en píxeles que definiste en tu CSS
        const gap = 10; 
        // Calculamos el desplazamiento exacto en píxeles
        const desplazamiento = indiceActual * (anchoImagen + gap);
        // Aplicamos la transformación en píxeles (px)
        track.style.transform = `translateX(-${desplazamiento}px)`;
    }
    if (totalImagenes > imagenesVisibles) {
        function iniciarIntervalo() {
            intervalo = setInterval(moverCarrusel, tiempoIntervalo);
        }
        function detenerIntervalo() {
            clearInterval(intervalo);
        }
        iniciarIntervalo();
        track.addEventListener('mouseenter', detenerIntervalo);
        track.addEventListener('mouseleave', iniciarIntervalo);
    }
});