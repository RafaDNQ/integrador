/* ===========================
                NEWSLETTER
        =============================*/

const newsletter = document.getElementById("formNL");
const email = document.getElementById("emailNewsletter");
const errorEmail = document.getElementById("errorEmail");
const resumen = document.getElementById("resumenNewsletter");

newsletter.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = email.value.trim();

    errorEmail.textContent = "";

    if (correo === "") {
        errorEmail.classList.add("invalido");
        mostrarError("Es necesario colocar un email.");
        resumen.classList.remove("Subscripto");
        console.log("Entró en la validación de correo vacío");
        return;
    }

    if (correo.length < 5 || correo.length > 254) {
        errorEmail.classList.add("invalido");
        mostrarError("El correo debe contener entre 5 a 254 caracteres.");
        resumen.classList.remove("Subscripto");
        return;
    }

    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionEmail.test(correo)) {
        errorEmail.classList.add("invalido");
        mostrarError("Ingresá un correo electrónico válido.");
        resumen.classList.remove("Subscripto");
        return;
    }


    const div = document.createElement("div");
    const titulo = document.createElement("h3");
    const texto = document.createElement("p");

    titulo.textContent = "¡Suscripción registrada!";
    texto.textContent = "Correo electrónico: " + correo;

    div.appendChild(titulo);
    div.appendChild(texto);
    resumen.classList.add("Subscripto");
    resumen.prepend(div);

    newsletter.reset();
    email.focus();
    errorEmail.classList.remove("invalido");

    function mostrarError(texto) {
        errorEmail.textContent = texto;
    }


});

//Restaura el resumen de la subscripcion y evita que se stackee
const formBoton = document.getElementById("submit");
formBoton.addEventListener('click', () => {
    if (resumen.hasChildNodes) {
        while (resumen.hasChildNodes()) {
            resumen.removeChild(resumen.firstChild);
        }
    }
});