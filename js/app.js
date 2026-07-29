var contenedor = document.getElementById("Contenerdo-productos");
var contador = document.getElementById("Contador-productos");
var cajaBusqueda = document.getElementById("input-busqueda");

function crearTarjeta(p) {
  var tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  var img = document.createElement("img");
  img.src = p.imagen;

  var titulo = document.createElement("h3");
  titulo.textContent = p.nombre;

  var precio = document.createElement("p");
  precio.textContent = "Precio: $" + p.precio;

  var stock = document.createElement("p");
  stock.textContent = "Stock: " + p.stock;

  var proveedor = document.createElement("p");
  proveedor.textContent = "proveedor: " + p.proveedor;

  var estado = document.createElement("p");
  if (p.disponible == true) {
    estado.textContent = "Disponible";
  } else {
    estado.textContent = "Agotado";
  }

  tarjeta.appendChild(img);
  tarjeta.appendChild(titulo);
  tarjeta.appendChild(precio);
  tarjeta.appendChild(stock);
  tarjeta.appendChild(estado);
  tarjeta.appendChild(proveedor)

  return tarjeta;
}

function mostrarTodo() {
  contenedor.textContent = "";
  contador.textContent = productos.length;

  for (var i = 0; i < productos.length; i++) {
    var tarjetaNueva = crearTarjeta(productos[i]);
    contenedor.appendChild(tarjetaNueva);
  }
}

function buscar() {
  var texto = cajaBusqueda.value.toLowerCase();
  contenedor.textContent = "";
  var encontrados = 0;

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    var nombreEnMinuscula = p.nombre.toLowerCase();

    if (nombreEnMinuscula.includes(texto)) {
      var tarjetaNueva = crearTarjeta(p);
      contenedor.appendChild(tarjetaNueva);
      encontrados = encontrados + 1;
    }
  }

  contador.textContent = encontrados;
}

cajaBusqueda.addEventListener("input", buscar);

mostrarTodo();