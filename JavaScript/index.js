let fechaBase;
let eventos;
let modalComentario = document.getElementById("modalComentario");
var inputSearch = document.getElementById("inputSearch");
let checkCheckedBoxes = [];
let search = "";

async function getData() {
  let datosApi;
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then((response) => response.json())
    .then((json) => (datosApi = json));

  eventos = datosApi.eventos;
  fechaBase = datosApi.fechaActual;

  imprimir();
}

getData();

var textoBoton = [];
var buttonNav = document.getElementsByClassName("nav-link");
for (var i = 0; i < buttonNav.length; i++) {
  const element = buttonNav[i];
  textoBoton.push(buttonNav[i].innerText);
  element.addEventListener("click", (e) => {
    setState("paginaANavegar", e.target.id);

    for (let i = 0; i < buttonNav.length; i++) {
      const elementos = buttonNav[i];
      if (elementos.id !== e.target.id) {
        buttonNav[i].classList.remove("active");
      } else {
        buttonNav[i].classList.add("active");
      }
    }

    document.getElementById("tituloPrincipal").innerHTML = e.target.innerText;
    imprimir(e.target.id); //llamada de la función
  });
}

function imprimir() {
  switch (initialState.paginaANavegar) {
    case "upcoming":
      let eventosFuturos = eventos.filter((evento) => evento.date > fechaBase);
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
      let eventosPasados = eventos.filter((evento) => evento.date < fechaBase);
      arrayAFiltrar = eventosPasados;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventosPasados);
      eventosCategories(eventosPasados);
      document.getElementById("tiempo").innerHTML = "Past Events";
      break;
    case "contact":
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none";
      formulario();
      document.getElementById("tiempo").innerHTML = "Contact";
      break;

    case "stats":
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex";
      initStats();
      estadistica();
      document.getElementById("tiempo").innerHTML = "Stats";
      break;

    default:
      document.getElementById("tiempo").innerHTML = "Home";
      arrayAFiltrar = eventos;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventos);
      eventosCategories(eventos);
  }
}

function display(array) {
  var url;
  if (location.pathname == "./pages/details.html") {
    url = "./details.html";
  } else {
    url = "./pages/details.html";
  }

  var html = "";
  array.map(
    (evento) =>
      (html += `  
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
    <div class="card text-center">
      <img src="${evento.image}"  class="card-img-top" alt=${evento.name}>
      <div class="card-body p-md-2 p-1">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text"> ${evento.category}</p>
        <div class="row justify-content-around item pt-2">
          <p class="col-6 texto-price">Price: $ ${evento.price}</p>
          <a href="${url}?id=${evento.id}" class="col-4 btn">Ver mas</a> 
        </div>
      </div>
    </div>
  </div>
  `)
  );
  document.getElementById("todosLosEventos").innerHTML = html;
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
</table>
   `;
  document.getElementById("idEstadistica").innerHTML = estadistica;
}

var time = location.search.split("?time=");
switch (time[1]) {
  case "upcoming":
    setState("paginaANavegar", "upcoming");
    document.getElementById("tituloPrincipal").innerHTML = "Upcoming Events";

    break;

  case "past":
    setState("paginaANavegar", "past");
    document.getElementById("tituloPrincipal").innerHTML = "Past Events";
    break;

  case "contact":
    setState("paginaANavegar", "contact");
    document.getElementById("tituloPrincipal").innerHTML = "Contact";
    break;

  case "stats":
    setState("paginaANavegar", "stats");
    document.getElementById("tituloPrincipal").innerHTML = "Stats";
    break;

  default:
    document.getElementById("tituloPrincipal").innerHTML = "Home";
}

//función que dinamisa botón left y right

var buttonLeft = document.getElementById("left");

buttonLeft.addEventListener("click", function (e) {
  var leftTitle = document.getElementById("tituloPrincipal").innerText;
  if (textoBoton.indexOf(leftTitle) > 0) {
    changePage(textoBoton.indexOf(leftTitle) - 1);
  } else {
    changePage(4);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var rightTitle = document.getElementById("tituloPrincipal").innerText;
  if (textoBoton.indexOf(rightTitle) < 4) {
    changePage(textoBoton.indexOf(rightTitle) + 1);
  } else {
    changePage(0);
  }
});

async function changePage(i) {
  switch (i) {
    case 0:
      await setState("paginaANavegar", "home");
      imprimir();
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.add("active");
      buttonNav[1].classList.remove("active");
      buttonNav[2].classList.remove("active");
      buttonNav[3].classList.remove("active");
      buttonNav[4].classList.remove("active");
      break;

    case 1:
      await setState("paginaANavegar", "upcoming");
      imprimir();
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("active");
      buttonNav[1].classList.add("active");
      buttonNav[2].classList.remove("active");
      buttonNav[3].classList.remove("active");
      buttonNav[4].classList.remove("active");
      break;

    case 2:
      await setState("paginaANavegar", "past");
      imprimir();
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("active");
      buttonNav[1].classList.remove("active");
      buttonNav[2].classList.add("active");
      buttonNav[3].classList.remove("active");
      buttonNav[4].classList.remove("active");
      break;

    case 3:
      formulario();
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none";
      searchContainer.style.display = "none";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("active");
      buttonNav[1].classList.remove("active");
      buttonNav[2].classList.remove("active");
      buttonNav[3].classList.add("active");
      buttonNav[4].classList.remove("active");
      break;

    case 4:
      initStats();
      estadistica();
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex";
      document.getElementById("tituloPrincipal").innerHTML = textoBoton[i];
      buttonNav[0].classList.remove("active");
      buttonNav[1].classList.remove("active");
      buttonNav[2].classList.remove("active");
      buttonNav[3].classList.remove("active");
      buttonNav[4].classList.add("active");
      break;
  }
}

//Input Search

inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value;
  search = datoInput.trim().toLowerCase();
  filtroCombinado();
});

//Checkbox

//CREACIÓN DINÁMICA DE CHECKBOX POR CATEGORÍA

function eventosCategories(array) {
  let categories = array.map((evento) => evento.category);
  let unica = new Set(categories);
  let lastCategories = [...unica];
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
  var checkboxs = document.querySelectorAll("input[type=checkbox");
  for (var i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function () {
      checkCheckedBoxes = [];

      for (var i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
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
  } else {
    filtrado = arrayAFiltrar;
  }
  filtrado.length > 0
    ? display(filtrado)
    : (todosLosEventos.innerHTML = `<h1 class="ceroResult">No se encontraron resultados para tu búsqueda </h1>`);
}
