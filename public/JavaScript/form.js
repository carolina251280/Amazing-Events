//Página de contactos

function formulario() {
  var formulary;
  formulary = `
  <form action="" id="formulario" class="col-9 col-sm-6 p-3 p-sm-4">
    <div class="form_input">
        <label for="email"><i class="fa-solid fa-at"></i></label>
        <input class="email form-control" id="email" type="email" name="email" placeholder="email@email.com" required>
    </div>
    <div class="form_input">
    <label for="email"><i class="fa-solid fa-user"></i></label>
    <input class="email form-control" id="nombre" type="text" name="name" placeholder="name" required>
    </div>
    <div class="form_input">
        <label for="type" selector required><i class="fa-solid fa-qrcode"></i></label>
        <select id="type" class="form-control" name="type" >
            <option value="Varios" selected>Opciones</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Felicitaciones">Felicitaciones</option>
        </select>
    </div>
    <div class="form_input">
        <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
        <input type="date" id="date" class="form-control">
    </div>
    <div class="form_input">
        <label for="comentario"><i class="fa-solid fa-comment"></i></label>
        <textarea id="comentario" class="form-control" placeholder=" Dejanos tu comentario"></textarea>
    </div>
    <div class="boton_form">
        <button id="enviar" class="boton" type="submit">Enviar<i class="fa-solid fa-paper-plane"></i></button>
        <button id="resetBtn" type="reset" class="boton">Reset<i class="fa-solid fa-arrow-rotate-right"></i></button>
    </div>

</form>
`;

  document.getElementById("idContacto").innerHTML = formulary;
  const email = document.getElementById("email");
  const nombre = document.getElementById("nombre");
  const type = document.getElementById("type");
  const date = document.getElementById("date");
  const mensaje = document.getElementById("comentario");
  const formularioContain = document.getElementById("formulario");

  const btnEnviar = document.getElementById("enviar");
  const btnReset = document.getElementById("resetBtn");
  const resulEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var diaDate = new Date();
  var mes = diaDate.getMonth() + 1;
  var anio = diaDate.getUTCFullYear() - 0;
  var hdate = diaDate.getDate();
  if (mes < 10) {
    mes = "0" + mes;
  }
  if (hdate < 10) {
    hdate = "0" + hdate;
  }
  var fecha = anio + "-" + mes + "-" + hdate;
  document.getElementById("date").setAttribute("min", fecha);

  escuchadorEventos();

  function escuchadorEventos() {
    document.addEventListener("DOMContentLoaded", iniciarWebApp);

    email.addEventListener("keyup", validarInformacion);
    nombre.addEventListener("keyup", validarInformacion);
    mensaje.addEventListener("keyup", validarInformacion);
    type.addEventListener("click", validarInformacion);
    date.addEventListener("blur", validarInformacion);
    btnReset.addEventListener("click", resetearFormulario);
    formularioContain.addEventListener("submit", enviarFormulario);
  }

  function iniciarWebApp() {
    btnEnviar.disabled = true;
    nombre.classList.remove("correcto");
    email.classList.remove("correcto");
    mensaje.classList.remove("correcto");
    type.classList.remove("correcto");
    date.classList.remove("correcto");
    nombre.classList.remove("error-mostrar");
    email.classList.remove("error-mostrar");
    mensaje.classList.remove("error-mostrar");
    type.classList.remove("error-mostrar");
    date.classList.remove("error-mostrar");

    const errValidacion = document.querySelector("p.error");
    if (errValidacion) {
      errValidacion.remove();
    }
  }

  iniciarWebApp();
  function validarInformacion(elemento) {
    const errValidacion = document.querySelector("p.error");
    if (errValidacion) {
      errValidacion.remove();
    }
    if (elemento.target.value.length > 0) {
      elemento.target.classList.remove("error-mostrar");
      elemento.target.classList.add("correcto");
    } else {
      elemento.target.classList.remove("correcto");
      elemento.target.classList.add("error-mostrar");
      mostrarError("Todos los campos deben ser llenados.");
      btnEnviar.disabled = true;
    }
    if (elemento.target.type === "email") {
      if (resulEmail.test(elemento.target.value)) {
        elemento.target.classList.remove("error-mostrar");
        elemento.target.classList.add("correcto");
      } else {
        elemento.target.classList.remove("correcto");
        elemento.target.classList.add("error-mostrar");
        mostrarError("Email no válido");
      }
    }
    if (
      resulEmail.test(email.value) != "" &&
      nombre.value != "" &&
      mensaje.value != "" &&
      type.value != "Varios" &&
      fecha != ""
    ) {
      btnEnviar.disabled = false;

      if (resulEmail.test === false) {
        mostrarError("Email no válido");
      }
    } else {
      btnEnviar.disabled = true;
    }
  }
  function mostrarError(mensaje) {
    const indicadorError = document.createElement("p");
    indicadorError.textContent = mensaje;
    indicadorError.classList.add(
      "alert",
      "alert-danger",
      "text-center",
      "error",
      "p-1",
      "mt-2",
      "mb-0"
    );
    const numErrores = document.querySelectorAll(".error");

    if (numErrores.length === 0) {
      formularioContain.appendChild(indicadorError);
    }
  }

  function resetearFormulario() {
    formularioContain.reset();
    iniciarWebApp();
  }

  function enviarFormulario(elemento) {
    elemento.preventDefault();
    let usuario = document.getElementById("nombre").value;
    let tipoComentario = document.getElementById("type").value;
    let correo = document.getElementById("email").value;
    let fechaIndicada = document.getElementById("date").value;

    Swal.fire({
      html: `
           <p class="parrafoAlert">${usuario}. Hemos recibido tu ${tipoComentario}, nos pondremos en contacto en la fecha que nos indicaste: ${fechaIndicada}, al email: ${correo} </p>
              
    `,
      title: "Gracias por tu mesaje",
      icon: "success",
      iconColor: "white",
      confirmButtonText: "Close",
      width: "60%",
      grow: "",
      background: "#2ecc71",
      backdrop: true,
      toast: false,
      allowOutsideClick: true,
      allowEnterKey: false,
      allowEscapeKey: false,
      stopKeydownPropagation: true,
      confirmButtonAriaLabel: "Confirmar",
      confirmButtonColor: "white",
      showCloseButton: true,
      closeButtonAriaLabel: "Cerrar alerta",
      customClass: {
        title: "tituloAlert",
        textconfirmButton: "custom-button",
        confirmButton: "btnColor",
        htmlContainer: "custom-container",
      },
    });
    resetearFormulario();
  }
}
