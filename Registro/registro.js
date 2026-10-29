const regForm = document.querySelector('.registroContenedor')

//inputs
const registroEmail = document.getElementById('registroEmail');
const registroContraseña = document.getElementById('registroContraseña');
const registroCumpleaños = document.getElementById('registroCumpleaños');
const registrarse = document.getElementById('registroBtn');

//errores
const errorEmail = document.getElementById('emailError');
const errorContra = document.getElementById('contraseñaError');
const errorCumple = document.getElementById('cumpleError');
//todos los mensajes de error
const errores = document.querySelectorAll('.error');

//div para el resumen
const regResumen = document.querySelector('.registroResumen');

document.addEventListener('DOMContentLoaded', regForm.reset());

regForm.addEventListener('submit', function (event) {
    event.preventDefault();

    

    const emailVal = registroEmail.value.trim();
    const contraVal = registroContraseña.value.trim();
    const cumpleVal = registroCumpleaños.value.trim();

    const estaVacioEmail = emailVal === '';
    const estaVacioContra = contraVal === '';
    const estaVacioCumple = cumpleVal === '';

    let todoOk = true;

    //Chequeamos si esta vacio algun input y paramos el evento si es true
    if (emailVal === '' || contraVal === '' || cumpleVal === '') {
        //si uno esta vacio se coloca class invalido
        errorEmail.classList.toggle('invalidoReg', emailVal === '');
        errorContra.classList.toggle('invalidoReg', contraVal === '');
        errorCumple.classList.toggle('invalidoReg', cumpleVal === '');

        errorEmail.textContent = estaVacioEmail ? 'El email es obligatorio' : '';
        errorContra.textContent = estaVacioContra ? 'La contraseña es obligatorio' : '';
        errorCumple.textContent = estaVacioCumple ? 'El cumpleaños es obligatorio' : '';

        //si emailVal === '' es verdadero aplica la clase errorInput
        registroEmail.classList.toggle('errorInput', emailVal === '');
        registroContraseña.classList.toggle('errorInput', contraVal === '');
        registroCumpleaños.classList.toggle('errorInput', cumpleVal === '');
        setTimeout(() => {
            registrarse.classList.remove('errorCompra');
        }, 400);
        return;
    }


    //validacion Email expresion regular
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionEmail.test(emailVal)) {
        errorEmail.classList.add("invalidoReg");
        errorEmail.textContent = "Ingresá un correo válido.";
        registroEmail.classList.add("errorInput");
        todoOk = false;
    } else {
        errorEmail.textContent = "";
        errorEmail.classList.remove("invalidoReg");
    }

    //validacion contraseña expresion regular

    const expresionPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

    if (!expresionPassword.test(contraVal)) {
        errorContra.classList.add("invalidoReg");
        errorContra.textContent = "Ingrese una contraseña valida.";
        registroContraseña.classList.add("errorInput");
        todoOk = false;
    } else {
        errorContra.textContent = "";
        errorContra.classList.remove("invalidoReg");
    }

    //validacion fecha mayores de 16 años
    const fechaLimite = new Date();
    fechaLimite.setFullYear(fechaLimite.getFullYear() - 16);
    const fechaNacimiento = new Date(cumpleVal + 'T00:00:00');



    if (fechaNacimiento > fechaLimite) {
        errorCumple.classList.add("invalidoReg");
        errorCumple.textContent = "Debes tener almenos 16 años";
        registroCumpleaños.classList.add("errorInput");
        todoOk = false;
    } else {
        errorCumple.textContent = "";
        errorCumple.classList.remove("invalidoReg")
    }

    if (todoOk === false) {
        console.log("No esta todo ok. Se cancela el registro")
        return;
    } else {
        console.log("Registro exitoso");

        const resumenRegistro = document.createElement('div');
        resumenRegistro.className = 'resumenRegistro';

        const resEmail = document.createElement('p');
        resEmail.className = "resEmail";
        resEmail.textContent = `Email: ${emailVal}`;

        const resContra = document.createElement('p');
        resContra.className = "resContra";
        resContra.textContent = `Contraseña: ${contraVal}`;

        const resCumple = document.createElement('p');
        resCumple.className = "resCumple";
        resCumple.textContent = `Cumpleaños: ${cumpleVal}`;

        resumenRegistro.appendChild(resEmail);
        resumenRegistro.appendChild(resContra);
        resumenRegistro.appendChild(resCumple);
        regResumen.prepend(resumenRegistro);

        regForm.reset();
    }


});


// ============= Mostrar iconos password =============

const iconoMostrar = document.getElementById('mostrarIcono');
const iconoOcultar = document.getElementById('ocultarIcono');
const iconoDiv = document.getElementById('iconosDiv');
//const usuarioContra


iconoDiv.addEventListener('click', function () {

    if (getComputedStyle(iconoMostrar).display === "block") {

        registroContraseña.type = "text";

        iconoMostrar.style.display = "none";

        iconoOcultar.style.display = "block";

    } else {

        registroContraseña.type = "password";

        iconoMostrar.style.display = "block";

        iconoOcultar.style.display = "none";

    }



});

//Restaura el resumen y evita que se stackee
registrarse.addEventListener('click', () => {
    if (regResumen.hasChildNodes) {
        while (regResumen.hasChildNodes()) {
            regResumen.removeChild(regResumen.firstChild);
        }
    }
});

