const contenedor = document.getElementById("contenedorProductos");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

function crearTarjeta(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  const categoria = document.createElement("p");
  categoria.textContent = "Categoria: " + producto.categoria;

  const marca = document.createElement("p");
  marca.textContent = "Marca: " + producto.marca;

  const precio = document.createElement("p");
  precio.textContent = "Precio: " + formatearPrecio(producto.precio);

  const stock = document.createElement("p");
  stock.textContent = "Stock: " + producto.stock;

  const proveedor = document.createElement("p");
  proveedor.textContent = "Proveedor: " + producto.proveedor;

  const fecha = document.createElement("p");
  fecha.textContent = "Ingreso: " + producto.fechaIngreso;

  const disponibilidad = document.createElement("p");
  disponibilidad.textContent = producto.disponible ? "Disponible" : "No disponible";
  disponibilidad.classList.add(producto.disponible ? "disponible" : "no-disponible");

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(titulo);
  tarjeta.appendChild(categoria);
  tarjeta.appendChild(marca);
  tarjeta.appendChild(precio);
  tarjeta.appendChild(stock);
  tarjeta.appendChild(proveedor);
  tarjeta.appendChild(fecha);
  tarjeta.appendChild(disponibilidad);

  return tarjeta;
}

function renderizarProductos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(function (producto) {
    const tarjeta = crearTarjeta(producto);
    contenedor.appendChild(tarjeta);
  });

  contador.textContent = lista.length;
}

function aplicarFiltros() {
  const texto = buscador.value.toLowerCase();
  const categoriaSeleccionada = filtroCategoria.value;

  const filtrados = productos.filter(function (producto) {
    const coincideNombre = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria =
      categoriaSeleccionada === "todas" || producto.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  renderizarProductos(filtrados);
}

buscador.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);

renderizarProductos(productos);