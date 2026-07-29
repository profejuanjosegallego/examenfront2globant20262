const imagenesPorCategoria = {
  "Computadores": "https://picsum.photos/seed/computadores/300/200",
  "Perifericos": "https://picsum.photos/seed/perifericos/300/200",
  "Celulares": "https://picsum.photos/seed/celulares/300/200",
  "Accesorios": "https://picsum.photos/seed/accesorios/300/200",
  "Almacenamiento": "https://picsum.photos/seed/almacenamiento/300/200",
  "Componentes": "https://picsum.photos/seed/componentes/300/200"
};

function renderizarProductos(listaProductos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  const tarjetasHTML = listaProductos.map(producto => {
    return `
      <div class="col-md-4 col-sm-6">
        <div class="card">
          <img src="${imagenesPorCategoria[producto.categoria]}" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Categoría: ${producto.categoria}</p>
            <p class="card-text">Marca: ${producto.marca}</p>
            <p class="card-text">Precio: $${producto.precio.toLocaleString("es-CO")}</p>
            <p class="card-text">Stock: ${producto.stock}</p>
            <p class="card-text">${producto.disponible ? "Disponible" : "Agotado"}</p>
          </div>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = tarjetasHTML.join("");
}

function actualizarContador(cantidad) {
  const contador = document.getElementById("contador-productos");
  contador.textContent = `Mostrando ${cantidad} productos`;
}


renderizarProductos(productos);
actualizarContador(productos.length);

const inputBuscador = document.getElementById("buscador");

inputBuscador.addEventListener("input", function () {
  const texto = inputBuscador.value.toLowerCase();
  const resultados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto)
  );
  renderizarProductos(resultados);
  actualizarContador(resultados.length);
});

const selectCategoria = document.getElementById("filtroCategoria");

selectCategoria.addEventListener("change", function () {
  const categoriaSeleccionada = selectCategoria.value;
  const resultados = categoriaSeleccionada === "todas"
    ? productos
    : productos.filter(producto => producto.categoria === categoriaSeleccionada);
  renderizarProductos(resultados);
  actualizarContador(resultados.length);
});