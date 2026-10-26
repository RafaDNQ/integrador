const iconoCarrito = document.getElementById('carrito');
const dialogCarrito = document.getElementById('carritoModal');
const cerrarCarrito = document.getElementById('divCerrar');



//abrir carrito
iconoCarrito.addEventListener('click', () => {
    dialogCarrito.showModal();
});

//cerrar carrito
cerrarCarrito.addEventListener('click', () => {
    dialogCarrito.close();
});



contenidoCarrito.addEventListener('click', (e) => {
    const btnDisminuir = e.target.closest('.btn-flecha-izq');
    const btnAumentar = e.target.closest('.btn-flecha-der');

    const eliminar = e.target.closest('.eliminarDiv');

    if (btnDisminuir || btnAumentar) {
        const contArticulo = (btnDisminuir || btnAumentar).closest('.carritoArt');
        const inputCantidad = contArticulo.querySelector('.input-cantidad');
        const precioVariable = contArticulo.querySelector('.precio');
        const precioSingleElemento = contArticulo.querySelector('.precioSingle');

        //obtenemos el precio unitario
        const textoPrecioSingle = precioSingleElemento ? precioSingleElemento.textContent.trim() : "0";
        const precioUnitario = parseFloat(textoPrecioSingle.replace(/[^0-9.-]+/g, '')) || 0;

        //valor del input dism y aum
        let valorActual = parseInt(inputCantidad.value) || 1;
        const valorMinimo = parseInt(inputCantidad.getAttribute('min')) || 1;

        //modificamos segun lo precionado
        if (btnDisminuir && valorActual > valorMinimo) {
            valorActual--;
        } else if (btnAumentar) {
            valorActual++;
        }

        //actualizar el input y recalcular el total
        inputCantidad.value = valorActual;

        if (precioVariable) {
            const nuevoTotal = precioUnitario * valorActual;
            precioVariable.textContent = `$${nuevoTotal.toFixed(2)}`;
            actualizarTotalCompra();
        }
    }

    if (eliminar) {
        const contenedorArt = eliminar.closest('.carritoArt');
        if (contenedorArt) {
            contenedorArt.remove();
        }
        actualizarTotalCompra();
    }


});



function actualizarTotalCompra() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    const precioEnCarrito = contenidoCarrito.querySelectorAll('.precio');
    let precioGeneral = 0;

    precioEnCarrito.forEach((elementoPrecio) => {
        const texto = elementoPrecio.textContent.trim(); //obtenemos el texto
        const valorNumerico = parseFloat(texto.replace(/[^0-9.-]+/g, '')) || 0; //lo transformamos a numero
        precioGeneral += valorNumerico; //actualizamos el total
    });

    const elementoTotalGeneral = document.getElementById('totalCarrito');
    elementoTotalGeneral.textContent = `$${precioGeneral.toFixed(2)}`;
}

function eliminar() {

}






