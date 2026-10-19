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