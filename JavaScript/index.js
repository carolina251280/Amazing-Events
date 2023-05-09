let fechaBase;

let eventos;

let modalComentario = document.getElementById("modalComentario")

var inputSearch = document.getElementById("inputSearch");

let checkCheckedBoxes = [];
let search = "";



async function getData(){
  let datosApi
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
  .then(response => response.json())
  .then(json => datosApi = json)

  eventos =  datosApi.eventos
  fechaBase = datosApi.fechaActual

  imprimir()
}

getData()



//filtros de eventos pasados, presentes y futuros. Primero le colocamos la misma clase a los botones del navbar "navlink" y un id distindo "home","upcoming" y "past"


var textoBoton = [];
var buttonNav = document.getElementsByClassName("nav-link"); //busca los elementos con clase "navlink" y los guarda en la variable "buttonNav"

// 3° paso: recorrimos el array de los botoenes, guardamos el array, el dato del boton dentro de la constante element, despues a cada boton guardado se le agregó un escuchador de eventos de tipo "click" y luego se llama a la función donde se la pasa el evento "e"

for (var i = 0; i < buttonNav.length; i++) {
const element = buttonNav[i];
  textoBoton.push(buttonNav[i].innerText);
  //console.log(textoBoton)

  element.addEventListener("click", (e) => {
    setState("paginaANavegar", e.target.id)
  
    for (let i = 0; i < buttonNav.length; i++){
      const elementos = buttonNav[i];
    
      if(elementos.id !== e.target.id){
        elementos.style.backgroundColor = "transparent"
        elementos.style.color = "black"
        elementos.style.fontWeight = "normal"
      }
      else{
        element.style.backgroundColor = "#D90368"
        element.style.color = "white"
         element.style.fontWeight = "bold"
      }

    }

    document.getElementById("tituloPrincipal").innerHTML = e.target.innerText;
    imprimir(e.target.id); //llamada de la función
  });
  
}


//una vez que obtenemos el datos llamamos a la función imprimir pasandole el "id" que obtuvimos
function imprimir() {


  switch (initialState.paginaANavegar) {
    case "upcoming":
      let eventosFuturos = eventos.filter(evento => evento.date > fechaBase)
      arrayAFiltrar = eventosFuturos;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventosFuturos);
      eventosCategories(eventosFuturos);
      document.getElementById("tiempo").innerHTML = "Upcoming Events";
      break;

    case "past":
      let eventosPasados = eventos.filter(evento => evento.date < fechaBase)
      arrayAFiltrar = eventosPasados;
      searchContainer.style.display = "flex"
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none"
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventosPasados);
      eventosCategories(eventosPasados);
      document.getElementById("tiempo").innerHTML = "Past Events";
      //document.getElementById("tituloPrincipal").innerHTML = "Past Events";
      break;
    case "contact":
      searchContainer.style.display = "none"
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none"
      formulario();
      let form = document.querySelector("form");
      form.addEventListener("submit", function (event) {
        actionForm(event);
      });

      document.getElementById("tiempo").innerHTML = "Contact";
      break;

    case "stats":
      searchContainer.style.display = "none"
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex"
      initStats();
      estadistica();
      document.getElementById("tiempo").innerHTML = "Stats";

      break;

    default:
      setState("paginaANavegar", "Home")
      document.getElementById("tituloPrincipal").innerHTML = "Home";
      document.getElementById("tiempo").innerHTML = "Home";
      arrayAFiltrar = eventos;
      searchContainer.style.display = "flex"
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none"
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventos);
      eventosCategories(eventos);
      
    
  }
}

function display(array) {
  //esta función recibe un array,

  var url;
  if (location.pathname == "./pages/details.html") {
    url = "./details.html";
    imageUrl = "../Images/";
  } else {
    url = "./pages/details.html";
    //imageUrl = "./Images/";
  }

  var html = ""; //primero se le declara una variable "html" vacía

    //recorre el array que recibe del switch, a medida que va  reccorriendo los eventos, genera un template string con código html y js, en el que de manera dinamica recorre el array, trae los datos. El += hace que se agreguen los demás textos  ( en este cado las todosLosEventos)
    
    array.map(evento =>
    html += `  
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 ">
    <div class="card text-center">
      <img src="${evento.image}"  class="card-img-top" alt=${evento.name}>
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text"> ${evento.description}</p>
        <div class="row justify-content-around item">
          <p class="col-6">Price: $ ${evento.price}</p>
          <a href="${url}?id=${evento.id}" class="col-4 btn">Ver mas</a> 
        </div>
      </div>
    </div>
  </div>
  `
 
    )
 
    
  //En detalle se esta enviando un parametro a la url

  document.getElementById("todosLosEventos").innerHTML = html; //una vez que el array esta recorrido y todo está guardado en el array html, se llama a este método para que
}

//imprimir("home"); //se llama a esta funcion para que cargue por primera vez la página sin hacerle click

//Página de contactos

function formulario() {
  var formulary;
  formulary = `
  <form action="" id="formulario">
    <div class="form_input">
        <label for="email"><i class="fa-solid fa-user"></i></label>
        <input class="email" type="email" name="email" placeholder="email@email.com" required>
    </div>
    <div class="form_input">
        <label for="type"><i class="fa-solid fa-qrcode"></i></label>
        <select id="type" name="type" >
            <option value="Varios" selected>Varios</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Felicitaciones">Felicitaciones</option>
        </select>
    </div>
    <div class="form_input">
        <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
        <input type="date"id="date">
    </div>
    <div class="form_input">
        <label for="comentario"><i class="fa-solid fa-comment"></i></label>
        <textarea id="comentario" placeholder="Dejanos tu comentario"></textarea>
    </div>

    <div class="boton_form">
        <input  class="boton_submit"  type="submit" value="Enviar!!!" data-bs-toggle="modal" data-bs-target="#exampleModal">
    </div>
</form>
`;

  document.getElementById("idContacto").innerHTML = formulary;


  //console.log("Ocultar las Cards o Estadisticas y va a mostrar el formulario de contactos")
}

//Funcion que crea la tabla de estadística.

function estadistica() {
  var estadistica;
  estadistica = `
<table id="general">
  <tr class="color">
  <th colspan="3">Estadísticas de Eventos</th>
</tr>
<tr class="titulo-tabla">
  <th>Evento con Mayor Porcentaje de Asistencia</th>
  <th>Evento con Menor Porcentaje de Asistencia</th>
  <th>Evento de Mayor Capacidad</th>
</tr>
<tr id="mayoresymenores">
  <!-- <td>Metallica en Concierto</td>
  <td>Fiesta de Disfraces</td>
  <td>Metallica en Concierto</td> -->
</tr>
</table>  
<table id="statsFuturos">
<tr class="color">
  <th colspan="3">Estadisticas de Eventos Futuros por Categoría</th>
</tr>
<tr class="titulo-tabla">
  <th>Categorías</th>
  <th>Estimacion de Ingresos</th>
  <th>Asistencia Estimada</th>
</tr>
<!-- <tr >
  <td>Metallica en Concierto</td>
  <td>Concierto de Música</td>
  <td>138.000</td>
</tr>
<tr>
  <td>Noche de Halloween</td>
  <td>Fiesta de Disfraces</td>
  <td>9.000</td>
</tr>
<tr>
  <td>Avengers</td>
  <td>Vamos al Cine</td>
  <td>9.000</td>
</tr> -->
</table>  
<table id="statsPasados">
<tr class="color">
    <th colspan="3">Estadisticas de Eventos Pasados por Categoría</th>
</tr>
<tr class="titulo-tabla">
  <th>Categorías</th>
  <th>Ingresos</th>
  <th>Asistencia</th>
</tr>
<!-- <tr>
  <td>10K por la vida</td>
  <td>Carrera</td>
  <td>25.698</td>
</tr>
<tr>
  <td>Feria del libro Escolar</td>
  <td>Intercambio de Libros</td>
  <td>123.286</td>
</tr>
<tr>
  <td>Parque Jurásico</td>
  <td>Salida al Museo</td>
  <td>65.892</td>
</tr>
<tr>
  <td>Fiesta de las Colectividades</td>
  <td>Feria de Comida</td>
  <td>42.756</td>
</tr> -->
</table>
   `;

  document.getElementById("idEstadistica").innerHTML = estadistica;
}

var time = location.search.split("?time=");
//console.log(time[1]);

switch (time[1]) {
  case "upcoming":
    document.getElementById("tituloPrincipal").innerHTML = "Upcoming Events";
    imprimir("upcoming");
    break;

  case "past":
    document.getElementById("tituloPrincipal").innerHTML = "Past Events";
    imprimir("past");
    break;

  case "contact":
    document.getElementById("tituloPrincipal").innerHTML = "Contact";
    imprimir("contact");
    break;

  case "stats":
    document.getElementById("tituloPrincipal").innerHTML = "Stats";
    imprimir("stats");
    break;

  default:
    // if(document.getElementById("name") !== null){}
    document.getElementById("tituloPrincipal").innerHTML = "Home";
    imprimir("home");
}




//carrusel

//función que dinamisa botón left y right

var buttonLeft = document.getElementById("left");

buttonLeft.addEventListener("click", function (e) {
  var leftTitle = document.getElementById("tituloPrincipal").innerText;
  console.log(textoBoton);
  console.log(textoBoton.indexOf(leftTitle))

  if (textoBoton.indexOf(leftTitle) > 0) {
    changePage(textoBoton.indexOf(leftTitle) - 1);
    console.log(textoBoton.indexOf(leftTitle));
  } else {
    changePage(4);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var rightTitle = document.getElementById("tituloPrincipal").innerText;
  console.log(textoBoton);
  console.log(rightTitle);
  if (textoBoton.indexOf(rightTitle) < 4) {
    changePage(textoBoton.indexOf(rightTitle) + 1);
    console.log(textoBoton.indexOf(rightTitle));
  } else {
    changePage(0);
  }
});

function changePage(i) {
  
  switch (i) {
    case 0:
      display(eventos);
      eventosCategories(eventos);
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.add("activo");
      buttonNav[1].classList.remove("activo");
      buttonNav[2].classList.remove("activo");
      buttonNav[3].classList.remove("activo");
      buttonNav[4].classList.remove("activo");
      


      break;

    case 1:
      display(eventosFuturos);
      eventosCategories(eventosFuturos);
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("activo");
      buttonNav[1].classList.add("activo");
      buttonNav[2].classList.remove("activo");
      buttonNav[3].classList.remove("activo");
      buttonNav[4].classList.remove("activo");
      break;

    case 2:
      display(eventosPasados);
      eventosCategories(eventosPasados);
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("activo");
      buttonNav[1].classList.remove("activo");
      buttonNav[2].classList.add("activo");
      buttonNav[3].classList.remove("activo");
      buttonNav[4].classList.remove("activo");
      //searchContainer[0].classList.remove("searchContainer");
      break;

    case 3:
      formulario();
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none";
      searchContainer.style.display = "none";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("activo");
      buttonNav[1].classList.remove("activo");
      buttonNav[2].classList.remove("activo");
      buttonNav[3].classList.add("activo");
      buttonNav[4].classList.remove("activo");
      //searchContainer[0].classList.remove("searchContainer");
      break;

    case 4:
      initStats();
      estadistica()
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("activo");
      buttonNav[1].classList.remove("activo");
      buttonNav[2].classList.remove("activo");
      buttonNav[3].classList.remove("activo");
      buttonNav[4].classList.add("activo");
      //searchContainer[0].classList.remove("searchContainer");
      break;
  }
}

//Input Search

inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value;

  //A los capturado le quito espacios en blanco anteriores y posteriores con trim()
  //Además a lo ingresado lo paso a minusculsa con toLowerCase()

  search = datoInput.trim().toLowerCase();
  console.log(search)
  console.log(datoInput)

  filtroCombinado();
});

//Checkbox

//CREACIÓN DINÁMICA DE CHECKBOX POR CATEGORÍA

function eventosCategories(array) {
  let categories = array.map((evento) => evento.category);

  //el método SET devuelve del array un objeto con los datos unicos, no los repite
  let unica = new Set(categories);

  //trasformo en un array el contenido del abjeto unica
  let lastCategories = [...unica];
  //console.log(lastCategories);

  let categoriasEventos = "";

  lastCategories.map(
    (category) =>
      (categoriasEventos += `
<div class="form-check">
<input
  class="form-check-input checkCuadro"
  type="checkbox"
  value="${category}"
  id="flexCheckDefault"
/>
<label
  class="form-check-label checkCategoria"
  for="flexCheckDefault"
>
  ${category}
</label>
</div>
`)
  );

  document.getElementById("checkcategories").innerHTML = categoriasEventos;

  checkboxListener();
}

function checkboxListener() {
  //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
  //por un selectorAll capturo las etiquetas input de tipo checkbox
  var checkboxs = document.querySelectorAll("input[type=checkbox");

  //recorro cada uno de los input checkbox y le apilico un escuachador de eventos change
  for (var i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function () {
      //limpio el array donde voyaa guardar los inut con checked true ya que utilizo un método push
      //caso contrario se van a agregar más eventos
      checkCheckedBoxes = [];

      //recorro el array de checkbox para extraer aquellos cuyo atributo checked sea true
      for (var i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          //si se cumple la condición de checked true los empujo al array que defini para almacenar
          //los checkbox chequeados
          checkCheckedBoxes.push(checkboxs[i].value);
        }
      }

      filtroCombinado();
    });
  }
}

function filtroCombinado() {
  var filtrado = [];
  if (search !== "" && checkCheckedBoxes.length > 0) {
    checkCheckedBoxes.map((category) =>
      filtrado.push(
        ...arrayAFiltrar.filter(
          (eventos) =>
            eventos.name.toLowerCase().includes(search) &&
            eventos.category === category
        )
      )
    );
  } else if (search !== "" && checkCheckedBoxes.length == 0) {
    filtrado = arrayAFiltrar.filter((eventos) =>
      eventos.name.toLowerCase().includes(search)
    );
  } else if (search === "" && checkCheckedBoxes.length > 0) {
    checkCheckedBoxes.map((category) =>
      filtrado.push(
        ...arrayAFiltrar.filter((eventos) => eventos.category === category)
      )
    );

    console.log(filtrado);
  } else {
    filtrado = arrayAFiltrar;
  }
  filtrado.length > 0
    ? display(filtrado)
    : (todosLosEventos.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`);
}
// setTimeout(function(){
//   alert("!Eventos Increibles!");
// }, <PacmanLoader color="#36d7b7" />2000);
