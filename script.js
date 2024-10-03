//DOM static selector
const DOM = {
  miFormulario: document.getElementById("mi-formulario"),
  idioma: document.getElementById("idioma"),
  miTexto: document.getElementById("mi-texto"),
  miNumero: document.getElementById("mi-numero"),
  miColeccion: document.getElementById("mi-coleccion"),
  tabla: document.getElementById("tabla-coleccion")
};

const COLLECTION_KEY = "paises";
const Paises = []; 

(function(){
  // AQUI - Recupera la colección del localStorage y muestralo en la tabla
  if ( localStorage.getItem(COLLECTION_KEY) !== null) {
      let misPaises = JSON.parse(localStorage.getItem(COLLECTION_KEY))

      misPaises.forEach(pais => {
        Paises.push(pais);
      });
  } 
  Paises.forEach(pais => mostrarObjetoEnTabla(pais.nombre, pais.poblacion));
  DOM.miFormulario.addEventListener("submit", guardarObjeto);
})()

function guardarObjeto(e){
  // AQUI - Llamar a la función constructora del objeto
  let paisNuevo = {
    nombre : DOM.miTexto.value,
    poblacion : parseInt(DOM.miNumero.value)
    
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
  //AQUI - Actualizar la colección en el localStorage
  //AQUI - Redibujar la tabla HTML
  alert("Programa esta función para borrar el objeto con id " + id)
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