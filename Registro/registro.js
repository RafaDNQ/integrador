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
        errorContra.classList.toggle('invalidoReg', emailVal === '');
        errorCumple.classList.toggle('invalidoReg', emailVal === '');

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
    }else{
        errorCumple.textContent = "";
        errorCumple.classList.remove("invalidoReg")
    }

    if (todoOk === false) {
        console.log("No esta todo ok. Se cancela el registro")
        return;
    }






});

