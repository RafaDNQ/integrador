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

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('botonComprar')) {
        console.log("Click");
        const boton = e.target;
        const tarjeta = e.target.closest('.contenedoritem');

        if (!tarjeta) return;

        boton.addEventListener('click', () => {
            // Definimos la clase según el estado actual
            const claseAnimacion = !estadoLogin ? 'errorCompra' : 'saltarCompra';

            boton.classList.add(claseAnimacion);

            setTimeout(() => {
                boton.classList.remove(claseAnimacion);
            }, 400);
        });

        const tituloElemento = tarjeta.querySelector('.titulo');
        const precioElemento = tarjeta.querySelector('.precio');
        const cantidadElemento = tarjeta.querySelector('.input-cantidad');

        const titulo = tituloElemento ? tituloElemento.textContent.trim() : '';
        const precioTexto = precioElemento ? precioElemento.textContent.trim() : '0';

        // limpiamos el texto para obtener sólo números
        const precioNumerico = parseFloat(precioTexto.replace(/[^0-9.-]+/g, '')) || 0;
        const cantidad = cantidadElemento ? (parseInt(cantidadElemento.value) || 1) : 1;

        const contenidoCarrito = document.getElementById("contenidoCarrito");

        if (!contenidoCarrito) {
            console.error("No se encontró el contenedor #contenidoCarrito en el DOM.");
            return;
        }

        //elementos para el carrito
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
        pArtTotal.textContent = `$${(precioNumerico * cantidad).toFixed(2)}`;

        const pArtPrecioSingle = document.createElement("p");
        pArtPrecioSingle.className = "precioSingle";
        pArtPrecioSingle.textContent = `$${precioNumerico.toFixed(2)}`;
        pArtPrecioSingle.style.display = "none";

        const eliminar = document.createElement("div");
        eliminar.className = "eliminarDiv";
        const eliminarImg = document.createElement("img");
        eliminarImg.className = "eliminarImg";
        eliminarImg.src = "./img/nav/trash-can.png";
        eliminarImg.alt = "Icono Eliminar";

        // armado de la estructura DOM
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


        actualizarTotalCompra();

    }
});