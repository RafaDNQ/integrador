// Seleccionamos los elementos específicos dentro del contenedor
const btnDisminuir = document.querySelector('.btn-flecha-izq');
const btnAumentar = document.querySelector('.btn-flecha-der');
const inputCantidad = document.querySelector('.input-cantidad');

// Evento para disminuir (flecha izquierda)
btnDisminuir.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value) || 0;
    let valorMinimo = parseInt(inputCantidad.getAttribute('min')) || 0;

    if (valorActual > valorMinimo) {
        inputCantidad.value = valorActual - 1;
    }
});

// Evento para aumentar (flecha derecha)
btnAumentar.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value) || 0;
    inputCantidad.value = valorActual + 1;
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.imagsugeridos');
    const imagenes = track.querySelectorAll('img');
    
    let indiceActual = 0;
    const totalImagenes = imagenes.length;
    const imagenesVisibles = 4; // Límite máximo de imágenes visibles a la vez
    const tiempoIntervalo = 3000; // 3 segundos

    function moverCarrusel() {
        // Incrementamos el índice
        indiceActual++;

        // Si llegamos al final y ya no quedan grupos completos de 4 para mostrar, volvemos al inicio (0)
        if (indiceActual > totalImagenes - imagenesVisibles) {
            indiceActual = 0;
        }

        // Calculamos cuánto debe desplazarse el contenedor en porcentaje
        // Como cada imagen ocupa un 25% aprox, multiplicamos por el índice actual
        const desplazamiento = indiceActual * (100 / imagenesVisibles);
        track.style.transform = `translateX(-${desplazamiento}%)`;
    }

    // Solo activamos el intervalo automático si hay más de 4 imágenes
    if (totalImagenes > imagenesVisibles) {
        setInterval(moverCarrusel, tiempoIntervalo);
    }
});