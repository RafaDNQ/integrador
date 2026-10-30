
{
    const regForm = document.querySelector('.registroContenedor')


    //inputs
    const registroEmail = document.getElementById('registroEmail');
    const registroContraseña = document.getElementById('registroContraseña');
    const registroCumpleaños = document.getElementById('registroCumpleaños');
    const registrarse = document.getElementById('registroBtn');
    const registroTelefono = document.getElementById('telefonoReg');

    //errores
    const errorEmail = document.getElementById('emailError');
    const errorContra = document.getElementById('contraseñaError');
    const errorCumple = document.getElementById('cumpleError');
    const errorTel = document.getElementById('telefonoError');
    //todos los mensajes de error
    const errores = document.querySelectorAll('.error');

    //div para el resumen
    const regResumen = document.querySelector('.registroResumen');

    document.addEventListener('DOMContentLoaded', () => regForm.reset());


    //Se evita que se pongan letras en el input telefono
    registroTelefono.addEventListener("input", (e) => {
        let valor = e.target.value;
        e.target.value = valor.replace(/[^0-9+\s-.]/g, "");
    });

    regForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailVal = registroEmail.value.trim();
    const contraVal = registroContraseña.value.trim();
    const cumpleVal = registroCumpleaños.value.trim();
    const telefonoVal = registroTelefono.value.trim();

    let todoOk = true;

    //Validar Email
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal === '') {
        errorEmail.textContent = 'El email es obligatorio';
        errorEmail.classList.add('invalidoReg');
        registroEmail.classList.add('errorInput');
        todoOk = false;
    } else if (!expresionEmail.test(emailVal)) {
        errorEmail.textContent = 'Ingresá un correo válido.';
        errorEmail.classList.add('invalidoReg');
        registroEmail.classList.add('errorInput');
        todoOk = false;
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('invalidoReg');
        registroEmail.classList.remove('errorInput');
    }

    //Validar Contraseña
    const expresionPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
    if (contraVal === '') {
        errorContra.textContent = 'La contraseña es obligatoria';
        errorContra.classList.add('invalidoReg');
        registroContraseña.classList.add('errorInput');
        todoOk = false;
    } else if (!expresionPassword.test(contraVal)) {
        errorContra.textContent = 'Ingrese una contraseña válida.';
        errorContra.classList.add('invalidoReg');
        registroContraseña.classList.add('errorInput');
        todoOk = false;
    } else {
        errorContra.textContent = '';
        errorContra.classList.remove('invalidoReg');
        registroContraseña.classList.remove('errorInput');
    }

    // Validar Teléfono
    const expresionTel = /^(?:(?:\+?54\s?9?)?|0)?(?:\d{2,4})[\s-.]?(?:15)?[\s-.]?\d{6,8}$/;
    if (telefonoVal === '') {
        errorTel.textContent = 'El teléfono es obligatorio';
        errorTel.classList.add('invalidoReg');
        registroTelefono.classList.add('errorInput');
        todoOk = false;
    } else if (!expresionTel.test(telefonoVal)) {
        errorTel.textContent = 'Ingrese un teléfono válido.';
        errorTel.classList.add('invalidoReg');
        registroTelefono.classList.add('errorInput');
        todoOk = false;
    } else {
        errorTel.textContent = '';
        errorTel.classList.remove('invalidoReg');
        registroTelefono.classList.remove('errorInput');
    }

    //Validar Cumpleaños
    const fechaLimite = new Date();
    fechaLimite.setFullYear(fechaLimite.getFullYear() - 16);
    const fechaNacimiento = new Date(cumpleVal + 'T00:00:00');

    if (cumpleVal === '') {
        errorCumple.textContent = 'El cumpleaños es obligatorio';
        errorCumple.classList.add('invalidoReg');
        registroCumpleaños.classList.add('errorInput');
        todoOk = false;
    } else if (fechaNacimiento > fechaLimite) {
        errorCumple.textContent = 'Debes tener al menos 16 años';
        errorCumple.classList.add('invalidoReg');
        registroCumpleaños.classList.add('errorInput');
        todoOk = false;
    } else {
        errorCumple.textContent = '';
        errorCumple.classList.remove('invalidoReg');
        registroCumpleaños.classList.remove('errorInput');
    }

        if (todoOk === false) {
            console.log("No esta todo ok. Se cancela el registro")
            return;
        } else {

            regResumen.innerHTML = "";

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

            const resTel = document.createElement('p');
            resTel.className = "resTel";
            resTel.textContent = `Teléfono: ${telefonoVal}`;

            resumenRegistro.appendChild(resEmail);
            resumenRegistro.appendChild(resContra);
            resumenRegistro.appendChild(resCumple);
            resumenRegistro.appendChild(resTel);

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

}

