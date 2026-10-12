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