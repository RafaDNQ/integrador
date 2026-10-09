// Variable de estado global
let contador = 0;

// Elementos del DOM
const elementoNumero = document.getElementById('valor-numero');
const botonesCambio = document.getElementById('btn-flecha-izq');
const btnReset = document.getElementById('btn-reset');

// Función principal para actualizar la pantalla
function actualizarNumero(nuevoValor) {
  contador = nuevoValor;
  elementoNumero.textContent = contador;
}

// Escuchamos el clic en todos los botones de incremento/decremento
botonesCambio.forEach(boton => {
  boton.addEventListener('click', () => {
    // Convertimos el valor del atributo data-valor a número
    const cambio = Number(boton.getAttribute('data-valor'));
    
    // Sumamos o restamos dinámicamente al valor actual
    actualizarNumero(contador + cambio);
  });
});

// Botón para reiniciarlo a cero directamente
btnReset.addEventListener('click', () => {
  actualizarNumero(0);
});