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

    function moverCarrusel() {
        // Incrementamos el índice
        indiceActual++;

        // Si llegamos al final, volvemos al inicio (0)
        if (indiceActual > totalImagenes - imagenesVisibles) {
            indiceActual = 0;
        }

        // MEDIDA EXACTA: Obtenemos el ancho real de una imagen en píxeles
        const anchoImagen = imagenes[0].getBoundingClientRect().width;
        
        // El espacio (gap) en píxeles que definiste en tu CSS
        const gap = 10; 

        // Calculamos el desplazamiento exacto en píxeles (ancho de la foto + su espacio) por el índice
        const desplazamiento = indiceActual * (anchoImagen + gap);
        
        // Aplicamos la transformación en píxeles (px) en lugar de porcentajes (%)
        track.style.transform = `translateX(-${desplazamiento}px)`;
    }

    // Solo activamos el intervalo automático si hay más de 4 imágenes
    if (totalImagenes > imagenesVisibles) {
        setInterval(moverCarrusel, tiempoIntervalo);
    }
});