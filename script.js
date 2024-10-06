//DOM static selector
const DOM = {
  miFormulario: document.getElementById("mi-formulario"),
  idioma: document.getElementById("idioma"),
  miTexto: document.getElementById("mi-texto"),
  miNumero: document.getElementById("mi-numero"),
  miColeccion: document.getElementById("mi-coleccion"),
  tabla: document.getElementById("tabla-coleccion"),
  miHora: document.getElementsByTagName('p').item(0),
  miId: document.getElementById('id')
};
const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
};
const COLLECTION_KEY = "paises";
const Paises = []; 

function formateaFecha(){
  let fecha = new Date(Date.now());
    if (idioma.value == '') {
      fecha = fecha.toLocaleDateString('es', DATE_OPTIONS);
    } else {
      fecha = fecha.toLocaleDateString(idioma.value, DATE_OPTIONS);
    }
    return fecha
};

function actualizaFecha(){
  DOM.miHora.innerText = formateaFecha();
}

(function(){
  // AQUI - Recupera la colección del localStorage y muestralo en la tabla
  if ( localStorage.getItem(COLLECTION_KEY) !== null) {
      let misPaises = JSON.parse(localStorage.getItem(COLLECTION_KEY))

      misPaises.forEach(pais => {
        Paises.push(pais);
      });
  } 
  Paises.forEach(pais => mostrarObjetoEnTabla(pais.nombre, pais.id));
  DOM.miFormulario.addEventListener("submit", guardarObjeto);
  DOM.idioma.addEventListener("change", actualizaFecha);
})()

function guardarObjeto(e){
  // AQUI - Llamar a la función constructora del objeto
  let paisNuevo = {
    nombre : DOM.miTexto.value,
    id: DOM.miNumero.value,
    moneda : []
  }

  for (let i = 0; i < DOM.miColeccion.selectedOptions.length; i++) {
    paisNuevo.moneda.push(DOM.miColeccion.selectedOptions[i].value);
  }

  // AQUI - Hacer push en la colección
  Paises.push(paisNuevo);
  // AQUI - Actualizar la colección en el localStorage
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(Paises));

  mostrarObjetoEnTabla(DOM.miTexto.value, DOM.miNumero.value);
  e.preventDefault(); // Para evitar el envío del formulario
}
function borrarObjeto(id){
  //AQUI - Borrar el objeto de la colección
  let position = Paises.findIndex(pais => pais.id == DOM.miId.value);
  if (position > -1) {
    Paises.splice(position, 1);
  } else {
    throw Error("No se encuentra un elemento con ese índice");
  }
  //AQUI - Actualizar la colección en el localStorage
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(Paises));
  location.reload();
  //AQUI - Redibujar la tabla HTML
  Paises.forEach( pais => {
      mostrarObjetoEnTabla(pais.nombre, pais.id);
    }
  );
}
function mostrarObjetoEnTabla(miTexto, miNumero){
  let tr;
  let td;

  tr = document.createElement("tr");
  //
  td = document.createElement("td");
  td.textContent=miTexto;
  tr.appendChild(td);
  //
  td = document.createElement("td");
  td.textContent=miNumero;
  tr.appendChild(td);
  //
  DOM.tabla.appendChild(tr);

  
}

// function coleccionPorCodigo() {
//   const NUM_PAISES = 10;
//   let paises = [];
//   let i;
//   let paisesMuestra = coleccionHardcodeada();
 
//   for (i = 0; i < NUM_PAISES; i++) {
//       paises.push({});
//   }

//  for (let i = 0; i < 5; i++) {
//      paises[i].id = i+1;
//      paises[i].nombre = paisesMuestra[i].nombre;
//      paises[i].continente = paisesMuestra[i].continente;
//      paises[i].poblacion = paisesMuestra[i].poblacion;
//      paises[i].pib = paisesMuestra[i].pib;
//      paises[i].miColeccion = [];
//      paises[i].personalidades = [];
//      for (let k = 0; k < paisesMuestra[i].personalidades.length; k++) {
//          paises[i].personalidades.push(paisesMuestra[i].personalidades[k]);
//      }
//  }

//   for (let i = 5; i < NUM_PAISES; i++) {
//       paises[i]["id"] = i+1;
//      paises[i]["nombre"] = paisesMuestra[i]["nombre"];
//      paises[i]["continente"] = paisesMuestra[i]["continente"];
//      paises[i]["poblacion"] = paisesMuestra[i]["poblacion"];
//      paises[i]["pib"] = paisesMuestra[i]["pib"];
//       paises[i].miColeccion = [];
//      paises[i]["personalidades"] = [];
//      for (let k = 0; k < paisesMuestra[i]["personalidades"].length; k++) {
//          paises[i]["personalidades"].push(paisesMuestra[i]["personalidades"][k]);
//      }
//  }

//   paises.forEach( (pais) => {
//       pais.mostrar = function() {
//           console.log(`nombre: ${this.nombre} continente: ${this.continente}`)
//           }
//       });
 
//   return paises;
// }