const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("_id")

fetch ('https://amd-amazingevents-api.onrender.com/api/eventos')
.then(response => response.json())
.then (data => {
//console.log(data.eventos); 
const eventos = data.eventos.find(evento => evento._id == id)
//console.log(eventos);

var texto = document.getElementById("idDetalles");
//console.log(texto); // Imprime el elemento en la consola
texto.innerHTML = `<div class="card mb-3" style="max-width: 940px;">
<div class="row g-0 w-100">
  <div class="col-sm-5">
    <img src="${eventos.image}" class="img-fluid rounded-start" alt="${eventos.name}">
  </div>
  <div class="col-sm-7">
    <div class="card-body">
      <h2 class="card-title">${eventos.name}</h2>
      <h4 class="card-text">Date: ${eventos.date}</h4>
      <h4 class="card-text">${eventos.description}</h4>
      <h4 class="card-text"><small class="text-muted">Category: ${eventos.category}</small></h4>
      <h4 class="card-text">Place: ${eventos.place}</h4>
      <h4 class="card-text">Capacity: ${eventos.capacity}</h4>
      <h4 class="card-text">Assistance: ${eventos.assistance}</h4>
      <h4 class="card-text">Price: $ ${eventos.price}</h4>

      <a href="#" class="btn btn-secondary">Reservar</a>
    </div>
  </div>
</div>
</div>

`;

})

var navLink = document.getElementsByClassName("nav-link");

for (var i = 0; i < navLink.length; i++) {
  const elementos = navLink[i];

  elementos.addEventListener("click", function (e) {
    imprimir(e.target.id);

    document.getElementById("idDetalles").style.display = "none";
    //document.getElementById("todosLosEventos").style.display = "flex";
  });
}