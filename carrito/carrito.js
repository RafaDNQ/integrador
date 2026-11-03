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
            guardarCarrito() //guardamos carrito para persistencia
        }
    }

    if (eliminar) {
        const contenedorArt = eliminar.closest('.carritoArt');
        if (contenedorArt) {
            contenedorArt.remove();
        }

        actualizarTotalCompra();

        guardarCarrito() //guardamos carrito para persistencia
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
    guardarCarrito()
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


function guardarCarrito() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');

    if (!contenidoCarrito) return;

    const listaArticulos = contenidoCarrito.querySelectorAll('.carritoArt');
    const carritoParaGuardar = [];

    listaArticulos.forEach(articulo => {
        const precioElemento = articulo.querySelector('.precio');
        const tituloElemento = articulo.querySelector('.pTitulo');
        const cantidadInput = articulo.querySelector('.input-cantidad');

        const titulo = tituloElemento ? tituloElemento.textContent.trim() : '';
        const precioTexto = precioElemento ? precioElemento.textContent.trim() : '0';
        const precioNumerico = parseFloat(precioTexto.replace(/[^0-9.-]+/g, '')) || 0;
        const cantidad = cantidadInput ? parseInt(cantidadInput.value) || 1 : 1;

        const articuloInfo = {
            tituloArt: titulo,
            precioArt: precioNumerico,
            cantidadArt: cantidad
        };

        carritoParaGuardar.push(articuloInfo);
    });

    sessionStorage.setItem("carritoActual", JSON.stringify(carritoParaGuardar));
    console.log("Carrito guardado exitosamente:", carritoParaGuardar);
}

function construirCarrito() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    if (!contenidoCarrito) return;

    const carritoJSON = sessionStorage.getItem("carritoActual");
    const carritoActual = carritoJSON ? JSON.parse(carritoJSON) : [];

    contenidoCarrito.innerHTML = "";

    carritoActual.forEach(articulo => {
        const titulo = articulo.tituloArt;
        const precio = articulo.precioArt;
        const cantidad = articulo.cantidadArt;

        const divCarritoArt = document.createElement("div");
        divCarritoArt.className = "carritoArt";

        const divArtTitulo = document.createElement("div");
        divArtTitulo.className = "artTitulo";

        const pTitulo = document.createElement("p");
        pTitulo.className = "pTitulo";
        pTitulo.textContent = titulo;

        const divArtCant = document.createElement("div");
        divArtCant.className = "artCant";

        const contButtons = document.createElement("div");
        contButtons.className = "contAcumular";

        const btnCarritoIzq = document.createElement("button");
        btnCarritoIzq.className = "btn-flecha-izq";
        btnCarritoIzq.textContent = "◄";

        const inputCantCarrito = document.createElement("input");
        inputCantCarrito.type = 'number';
        inputCantCarrito.value = cantidad;
        inputCantCarrito.min = '1';
        inputCantCarrito.className = "input-cantidad";
        inputCantCarrito.readOnly = true;

        const btnCarritoDer = document.createElement("button");
        btnCarritoDer.className = "btn-flecha-der";
        btnCarritoDer.textContent = "►";

        const divArtTotal = document.createElement("div");
        divArtTotal.className = "artTotal";

        const pArtTotal = document.createElement("p");
        pArtTotal.className = "precio";
        pArtTotal.textContent = `$${(precio * cantidad).toFixed(2)}`;

        const pArtPrecioSingle = document.createElement("p");
        pArtPrecioSingle.className = "precioSingle";
        pArtPrecioSingle.textContent = `$${(precio / cantidad).toFixed(2)}`;
        pArtPrecioSingle.style.display = "none";

        const eliminar = document.createElement("div");
        eliminar.className = "eliminarDiv";
        const eliminarImg = document.createElement("img");
        eliminarImg.className = "eliminarImg";
        eliminarImg.src = "../img/nav/trash-can.png";
        eliminarImg.alt = "Icono Eliminar";

        // Armado de la estructura DOM
        divArtTitulo.appendChild(pTitulo);
        divArtTitulo.appendChild(eliminar);
        eliminar.appendChild(eliminarImg);

        contButtons.appendChild(btnCarritoIzq);
        contButtons.appendChild(inputCantCarrito);
        contButtons.appendChild(btnCarritoDer);
        divArtCant.appendChild(contButtons);

        divArtTotal.appendChild(pArtTotal);
        divArtTotal.appendChild(pArtPrecioSingle);

        divCarritoArt.appendChild(divArtTitulo);
        divCarritoArt.appendChild(divArtCant);
        divCarritoArt.appendChild(divArtTotal);

        contenidoCarrito.prepend(divCarritoArt);
    });

    if (typeof actualizarTotalCompra === "function") {
        actualizarTotalCompra();
    }
}






