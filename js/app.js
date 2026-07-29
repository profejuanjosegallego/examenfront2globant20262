function renderizarProductos(listaProductos) {
  const contenedor = document.getElementById("contenedor-productos");
  
  // Limpiamos el contenedor antes de volver a pintar
  contenedor.innerHTML = "";

  // .map() transforma cada producto en un bloque de HTML (string)
  const tarjetasHTML = listaProductos.map(producto => {
    return `
      <div class="col-md-4 col-sm-6">
        <div class="card">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Marca: ${producto.marca}</p>
            <p class="card-text">Precio: $${producto.precio.toLocaleString("es-CO")}</p>
            <p class="card-text">Stock: ${producto.stock}</p>
          </div>
        </div>
      </div>
    `;
  });

  // .join("") une todos los strings del array en uno solo
  contenedor.innerHTML = tarjetasHTML.join("");
}

function actualizarContador(cantidad) {
  const contador = document.getElementById("contador-productos");
  contador.textContent = `Mostrando ${cantidad} productos`;
}

// Al cargar la página: mostramos todos los productos
renderizarProductos(productos);
actualizarContador(productos.length);

const inputBuscador = document.getElementById("buscador");

inputBuscador.addEventListener("input", function () {
  const texto = inputBuscador.value.toLowerCase();

  // .filter() devuelve solo los productos cuyo nombre incluye el texto buscado
  const resultados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto)
  );

  renderizarProductos(resultados);
  actualizarContador(resultados.length);
});