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
  Paises.forEach(pais => mostrarObjetoEnTabla(pais.id, pais.nombre, pais.moneda));
  DOM.miFormulario.addEventListener("submit", guardarObjeto);
  DOM.idioma.addEventListener("change", actualizaFecha);
})()

function guardarObjeto(e){
  // AQUI - Llamar a la función constructora del objeto
  if (IsValidCountry(DOM.miTexto.value) && IsValidID(DOM.miNumero.value)) {
    let paisNuevo = new Pais(parseInt(DOM.miNumero.value), DOM.miTexto.value);
    for (let i = 0; i < DOM.miColeccion.selectedOptions.length; i++) {
      paisNuevo.moneda.push(DOM.miColeccion.selectedOptions[i].innerText);
    }
    // AQUI - Hacer push en la colección
    Paises.push(paisNuevo);
    // AQUI - Actualizar la colección en el localStorage
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(Paises));
    location.reload();
    Paises.forEach(pais => mostrarObjetoEnTabla(pais.id, pais.nombre, pais.moneda))
    // mostrarObjetoEnTabla(DOM.miNumero.value, DOM.miTexto.value, DOM.miColeccion);
  }
  e.preventDefault(); // Para evitar el envío del formulario
}
function borrarObjeto(){
  //AQUI - Borrar el objeto de la colección
  let position = Paises.findIndex(pais => pais.id == DOM.miId.value);
  if (position > -1) {
    Paises.splice(position, 1);
  } else {
    throw "No se encuentra un elemento con ese índice";
  }
  //AQUI - Actualizar la colección en el localStorage
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(Paises));
  location.reload();
  //AQUI - Redibujar la tabla HTML
  Paises.forEach( pais => {
      mostrarObjetoEnTabla(pais.id, pais.nombre, pais.moneda);
    }
  );
}
function mostrarObjetoEnTabla(id, nombre, moneda){
  let tr;
  let td;

  tr = document.createElement("tr");
  //
  td = document.createElement("td");
  td.textContent=id;
  tr.appendChild(td);
  //
  td = document.createElement("td");
  td.textContent=nombre;
  tr.appendChild(td);
  //
  td = document.createElement("td");
  td.textContent=moneda.join(", ");
  tr.appendChild(td);
  DOM.tabla.appendChild(tr);
}

function Pais(id, nombre) {
  this.id = id;
  this.nombre = nombre;
  this.moneda = [];
}

function IsValidCountry(nombre) {
  let result = Paises.findIndex(pais => pais.nombre == nombre);
  if (result !== -1)
    throw "País no válido";
  return result === -1
}

function IsValidID(id) {
  let result = Paises.findIndex(pais => pais.id == parseInt(id))
   if (result !== -1)
    throw "Id no válido";
  return result === -1
}