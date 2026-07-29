const catalogoProductos = document.getElementById("catalogoProductos");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroDisponibilidad = document.getElementById("filtroDisponibilidad");

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-CO");
}

function textoDisponible(valor) {
  return valor ? "Disponible" : "No disponible";
}

function crearTarjeta(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  const imagen = document.createElement("img");
  imagen.classList.add("tarjeta-img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const cuerpo = document.createElement("div");
  cuerpo.classList.add("tarjeta-cuerpo");

  const nombre = document.createElement("h3");
  nombre.classList.add("tarjeta-nombre");
  nombre.textContent = producto.nombre;

  const categoria = document.createElement("span");
  categoria.classList.add("tarjeta-categoria");
  categoria.textContent = producto.categoria;

  const marca = document.createElement("p");
  marca.classList.add("tarjeta-marca");
  marca.textContent = "Marca: " + producto.marca;

  const detalles = document.createElement("div");
  detalles.classList.add("tarjeta-detalles");

  const precio = document.createElement("span");
  precio.classList.add("tarjeta-precio");
  precio.textContent = formatearPrecio(producto.precio);

  const stock = document.createElement("span");
  stock.classList.add("tarjeta-stock");
  stock.textContent = "Stock: " + producto.stock;

  detalles.appendChild(precio);
  detalles.appendChild(stock);

  const disponible = document.createElement("span");
  disponible.classList.add("tarjeta-disponible");
  disponible.textContent = textoDisponible(producto.disponible);
  disponible.classList.add(producto.disponible ? "disponible-si" : "disponible-no");

  cuerpo.appendChild(nombre);
  cuerpo.appendChild(categoria);
  cuerpo.appendChild(marca);
  cuerpo.appendChild(detalles);
  cuerpo.appendChild(disponible);

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(cuerpo);

  return tarjeta;
}

function mostrarProductos(lista) {
  catalogoProductos.innerHTML = "";

  lista.forEach(function(producto) {
    const tarjeta = crearTarjeta(producto);
    catalogoProductos.appendChild(tarjeta);
  });

  contador.textContent = "Mostrando " + lista.length + " de " + productos.length + " productos";
}

function filtrarProductos() {
  const texto = buscador.value.toLowerCase();
  const categoria = filtroCategoria.value;
  const disponibilidad = filtroDisponibilidad.value;

  let resultado = productos.filter(function(producto) {
    const coincideNombre = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "todas" || producto.categoria === categoria;

    let coincideDisponibilidad = true;
    if (disponibilidad === "disponible") {
      coincideDisponibilidad = producto.disponible === true;
    } else if (disponibilidad === "no_disponible") {
      coincideDisponibilidad = producto.disponible === false;
    }

    return coincideNombre && coincideCategoria && coincideDisponibilidad;
  });

  mostrarProductos(resultado);
}

mostrarProductos(productos);

buscador.addEventListener("input", filtrarProductos);
filtroCategoria.addEventListener("change", filtrarProductos);
filtroDisponibilidad.addEventListener("change", filtrarProductos);
