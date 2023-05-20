const querySearch = document.location.search;

const id = new URLSearchParams(querySearch).get("id");

fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
  .then((response) => response.json())
  .then((data) => {
    const eventos = data.eventos.find((evento) => evento.id == id);

    var texto = document.getElementById("idDetalles");
    var asis_esti = eventos.assistance ? "Assistance" : "Estimate";
    texto.innerHTML = `<div class="card m-3 mb-3 col-9 d-flex justify-content-center">
<div class="row g-0 w-100">
  <div class="col-sm-7 d-flex justify-content-center imagen-detalles">
  <img src="${
    eventos.image
  }" class="imagen-detalle col-12 col-sm-10 h-100 pt-sm-4 pb-sm-4" alt="${
      eventos.name
    }">
  </div>
  <div class="col-sm-5">
    <div class="card-body p-sm-2">
      <h2 class="card-title">${eventos.name}</h2>
      <h4 class="card-text">${eventos.description}</h4>
      <h4 class="card-text">Date: ${eventos.date}</h4>
      <h4 class="card-text"><small class="text-muted">Category: ${
        eventos.category
      }</small></h4>
      <h4 class="card-text">Place: ${eventos.place}</h4>
      <h4 class="card-text">Capacity: ${eventos.capacity}</h4>
      <h4 class="card-text">${asis_esti}:  ${
      eventos.assistance || eventos.estimate
    }</h4>
      <h4 class="card-text">Price: $ ${eventos.price}</h4>
      <div class="content-boton-reserva">
        <a href="#" class="btn boton-reserva">Reservar</a>
      </div>
      
  </div>
</div>
</div>

`;
  });

var navLink = document.getElementsByClassName("nav-link");

for (var i = 0; i < navLink.length; i++) {
  const elementos = navLink[i];

  elementos.addEventListener("click", function (e) {
    setState("paginaANavegar", e.target.id);

    imprimir(e.target.id);
    document.getElementById("idDetalles").style.display = "none";
  });
}
