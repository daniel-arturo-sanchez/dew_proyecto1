//DOM static selector
const DOM = {
  miFormulario: document.getElementById("mi-formulario"),
  idioma: document.getElementById("idioma"),
  miTexto: document.getElementById("mi-texto"),
  miNumero: document.getElementById("mi-numero"),
  miColeccion: document.getElementById("mi-coleccion"),
  tabla: document.getElementById("tabla-coleccion")
};
(function(){
  // AQUI - Recupera la colección del localStorage y muestralo en la tabla
  DOM.miFormulario.addEventListener("submit", guardarObjeto);
})()

function guardarObjeto(e){
  // AQUI - Llamar a la función constructora del objeto
  // AQUI - Hacer push en la colección
  // AQUI - Actualizar la colección en el localStorage
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



