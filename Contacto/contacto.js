const selectMotivo = document.getElementById('motivo_consulta');
const detalleConsulta = document.getElementById('detalle-consulta');

selectMotivo.addEventListener('change', () => {
    // Verificamos que option no este vacio
    if (selectMotivo.value !== "") {
        detalleConsulta.classList.remove('inactivo');
        detalleConsulta.style.display = "flex";
    }
});

const textarea = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const maxCaracteres = 200;

textarea.addEventListener('input', () => {
    // Si se pasa del maximo de caracteres se realiza un slice. Devolviendo el valor del textarea desde el caracter 0 al 200
    if (textarea.value.length > maxCaracteres) {
        textarea.value = textarea.value.slice(0, maxCaracteres);
    }

    // Contador de caracteres
    const caracteresActuales = textarea.value.length;
    contador.textContent = `${caracteresActuales} / ${maxCaracteres} caracteres`;

    if (caracteresActuales === maxCaracteres) {
        contador.style.color = 'red';
    } else {
        contador.style.color = 'inherit';
    }
});

botonConsulta.addEventListener('click', (event) => {
    event.preventDefault();

    // Referencias a los elementos
    const selectMotivo = document.getElementById('motivo_consulta');
    const registroEmail = document.getElementById('emailMotivo');
    const textarea = document.getElementById('mensaje');
    const motivoError = document.getElementById('motivoError');
    const textareaVacio = document.getElementById('textareaVacio');
    const resultado = document.getElementById('resultadoConsulta');

    // Valores
    const emailVal = registroEmail.value.trim();
    const mensajeVal = textarea.value.trim();
    let todoOk = true;

    // Validación Email con expresión regular y campo no vacío
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailVal === "" || !expresionEmail.test(emailVal)) {
        motivoError.classList.add("invalidoReg");
        motivoError.textContent = "Ingresá un correo válido.";
        registroEmail.classList.add("errorInput");
        todoOk = false;
    } else {
        motivoError.textContent = "";
        motivoError.classList.remove("invalidoReg");
        registroEmail.classList.remove("errorInput");
    }

    // Validación Textarea no vacío
    if (mensajeVal === "") {
        textarea.classList.add("errorInput");
        textareaVacio.classList.add("invalidoReg");
        textareaVacio.textContent = "El area de texto no puede estar vacio.";
        todoOk = false;
    } else {
        textarea.classList.remove("errorInput");
    }

    // Validación Select (motivo seleccionado)
    if (selectMotivo.value === "") {
        selectMotivo.classList.add("errorInput");
        todoOk = false;
    } else {
        selectMotivo.classList.remove("errorInput");
    }

    // Si todo está correcto, imprimimos en el DOM
    if (todoOk) {
        const motivoTexto = selectMotivo.options[selectMotivo.selectedIndex].text;

        resultado.innerHTML = `
            <h3>Consulta enviada con éxito</h3>
            <p><strong>Motivo:</strong> ${motivoTexto}</p>
            <p><strong>Email:</strong> ${emailVal}</p>
            <p><strong>Consulta:</strong> ${mensajeVal}</p>
        `;

        console.log("Motivo:", selectMotivo.value);
        console.log("Email:", emailVal);
        console.log("Mensaje:", mensajeVal);
    }
});

