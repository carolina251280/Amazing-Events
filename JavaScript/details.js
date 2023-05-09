var id = location.search.split("?id=").filter(Number);
//console.log(id)
var selectId = id[0];

const detalleEvento = [];


fetch ('https://amd-amazingevents-api.onrender.com/api/eventos')
.then(response => response.json())
.then (data => {
const eventos = data.events.find(event => event._id == id)

console.log(eventos)

var texto = document.getElementById("idDetalle");

texto.innerHTML = `

<div class="card mb-3" style="max-width: 940px;">
<div class="row g-0 w-100">
  <div class="col-sm-5">
    <img src="${eventos.image}" class="img-fluid rounded-start"
      alt="${eventos.name}">
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

}
  
  )

// for (var i = 0; i < eventos.length; i++){
//   console.log(eventos[i])
//   if (eventos[i].id == selectId) {
//     detalleEvento.push(eventos[i]);
    
//   }


//console.log(detalleEvento)







//enlace a otra pagina

var navLink = document.getElementsByClassName("nav-link");

for (var i = 0; i < navLink.length; i++) {
  const elementos = navLink[i];

  elementos.addEventListener("click", function (e) {
    imprimir(e.target.id);

    document.getElementById("idDetalle").style.display = "none";
    document.getElementById("titulo").style.display = "flex";
  });
}


// function detalles(array){

// var cardDetalles;

// for( var i = 0; i < array.length; i++){
//     cardDetalles = 
//     `
//     <div class="container d-flex justify-content-center  align-item-center" >
//     <div class="card col-md-8 " id="cartaDetalle">
//       <div class="row g-0 ">
//         <div class="col-md-6 imagen">
//           <img src="../Images/${array[i].image}" class=" w-100 h-100 rounded" alt="${array[i].name}">
//         </div>
//         <div class="col-md-6">
//           <div class="card-body">
//             <h5 class="card-title">${array[i].name}</h5>
//             <p class="card-text">${array[i].description}</p>
//             <p class="card-text"><small class="text-muted">$ ${array[i].price}</small></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//     `;
// }
// document.getElementById("idDetalles").innerHTML = cardDetalles;
// }