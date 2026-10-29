const iconoCarrito = document.getElementById('carrito');
const dialogCarrito = document.getElementById('carritoModal');
const cerrarCarrito = document.getElementById('divCerrar');

document.addEventListener('DOMContentLoaded', actualizarEstadoCarrito());

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

const comprarCarritoButton = document.getElementById('comprarCarritoButton');

comprarCarritoButton.addEventListener('click', (e) => {
    const contenedorArticulos = e.target.closest('.mainCarrito');
    const total = contenedorArticulos.querySelector("#totalCarrito");
    const totalTexto = total.textContent.trim();

    if (!contenedorArticulos) {
        console.error('No se encontró el contenedor .contenidoCarrito');
        return;
    }

    if (!contenedorArticulos.querySelector('.carritoArt')) {
        comprarCarritoButton.addEventListener('click', () => {
            comprarCarritoButton.classList.add('errorCompra');

            setTimeout(() => {
                comprarCarritoButton.classList.remove('errorCompra');
            }, 400);
        });
        return;
    }

    const articulos = contenedorArticulos.querySelectorAll('.carritoArt');
    const divResumen = document.getElementById('resumenCompra');


    divResumen.innerHTML = '';

    articulos.forEach((articulo) => {
        const titulo = articulo.querySelector('.pTitulo')?.textContent.trim();
        const cantidad = articulo.querySelector('.input-cantidad')?.value;
        const precio = articulo.querySelector('.precio')?.textContent.trim();

        const resumenCompra = document.createElement('div');
        resumenCompra.className = "resumenCompra";
        const tituloSpan = document.createElement('span');
        tituloSpan.className = "tituloSpan";
        tituloSpan.textContent = titulo;
        const cantidadSpan = document.createElement('span');
        cantidadSpan.className = "cantidadSpan";
        cantidadSpan.textContent = `Cant: ${cantidad}`;
        const precioSpan = document.createElement('span');
        precioSpan.className = "precioSpan";
        precioSpan.textContent = precio;

        resumenCompra.appendChild(tituloSpan);
        resumenCompra.appendChild(cantidadSpan);
        resumenCompra.appendChild(precioSpan);
        divResumen.prepend(resumenCompra);
    })

    //verificamos que la compra no este vacia


    const totalDiv = document.createElement('div');
    totalDiv.className = "totalDiv";

    const totalCompra = document.createElement('span');
    totalCompra.className = "totalSpan";
    totalCompra.textContent = `Total: ${totalTexto}`;

    const mensajeCompra = document.querySelector('.compraDiv');
    mensajeCompra.style.display = "flex";
    divResumen.style.display = "flex"

    totalDiv.appendChild(totalCompra);
    divResumen.appendChild(totalDiv);
    borrarArticulos()
    total.textContent = "";
    dialogCarrito.close();



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

function borrarArticulos() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    const listaArticulos = contenidoCarrito.querySelectorAll('.carritoArt');

    listaArticulos.forEach(articulo => {
        articulo.remove();
    });
}

function actualizarEstadoCarrito() {
  if (estadoLogin) {
    iconoCarrito.classList.remove('inhabilitado');
  } else {
    iconoCarrito.classList.add('inhabilitado');
  }
}







