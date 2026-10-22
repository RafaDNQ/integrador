const iconoCarrito = document.getElementById('carrito');
const dialogCarrito = document.getElementById('carritoModal');
const cerrarCarrito = document.getElementById('cerrarCarrito');



//abrir carrito
iconoCarrito.addEventListener('click', () => {
    dialogCarrito.showModal();
});

//cerrar carrito
cerrarCarrito.addEventListener('click',() => {
    dialogCarrito.close();
});
