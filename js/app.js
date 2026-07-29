const contenedorProductos = document.getElementById("contenedor-productos");
const contadorProductosEl = document.getElementById("contador-productos");
const contadorDisponiblesEl = document.getElementById("contador-disponibles");
const contadorCategoriasEl = document.getElementById("contador-categorias");
const filtrosContenedor = document.getElementById("filtros-categoria");
const buscadorInput = document.getElementById("buscador");
const resultadoTexto = document.getElementById("resultado-texto");


const formateadorPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});


let categoriaActiva = "Todas";
let textoBusqueda = "";


function obtenerCategoriasUnicas() {
  // Usamos map() para extraer las categorías y un Set para eliminar duplicados
  const todas = productos.map((producto) => producto.categoria);
  return ["Todas", ...new Set(todas)];
}

function renderizarFiltros() {
  const categorias = obtenerCategoriasUnicas();

  categorias.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.classList.add("filtro-btn");
    boton.textContent = categoria;
    boton.dataset.categoria = categoria;

    if (categoria === categoriaActiva) {
      boton.classList.add("activo");
    }

    // Evento del DOM: click para filtrar por categoría
    boton.addEventListener("click", () => {
      categoriaActiva = categoria;
      actualizarBotonesActivos();
      renderizarProductos();
    });

    filtrosContenedor.appendChild(boton);
  });
}

function actualizarBotonesActivos() {
  const botones = filtrosContenedor.querySelectorAll(".filtro-btn");
  botones.forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.categoria === categoriaActiva);
  });
}


function crearTarjetaProducto(producto) {
  const disponibilidadClase = producto.disponible ? "badge--disponible" : "badge--agotado";
  const disponibilidadTexto = producto.disponible ? "Disponible" : "Agotado";

 
  const card = document.createElement("article");
  card.classList.add("card");

 
  const imagenWrap = document.createElement("div");
  imagenWrap.classList.add("card__imagen-wrap");

  const imagen = document.createElement("img");
  imagen.classList.add("card__imagen");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.loading = "lazy";

  imagenWrap.appendChild(imagen);

  // --- Bloque de contenido (body) ---
  const body = document.createElement("div");
  body.classList.add("card__body");

  const categoria = document.createElement("span");
  categoria.classList.add("card__categoria");
  categoria.textContent = producto.categoria;

  const nombre = document.createElement("h3");
  nombre.classList.add("card__nombre");
  nombre.textContent = producto.nombre;

  const marca = document.createElement("p");
  marca.classList.add("card__marca");
  marca.textContent = producto.marca;

  const precio = document.createElement("p");
  precio.classList.add("card__precio");
  precio.textContent = formateadorPrecio.format(producto.precio);

  
  const meta = document.createElement("div");
  meta.classList.add("card__meta");

  const stockTexto = document.createElement("span");
  stockTexto.textContent = `Stock: ${producto.stock}`;

  const badge = document.createElement("span");
  badge.classList.add("badge", disponibilidadClase);
  badge.textContent = disponibilidadTexto;

  meta.appendChild(stockTexto);
  meta.appendChild(badge);

  
  const botonToggle = document.createElement("button");
  botonToggle.type = "button";
  botonToggle.classList.add("card__toggle");
  botonToggle.textContent = "Ver más detalles";


  const detalle = document.createElement("div");
  detalle.classList.add("card__detalle");

  const proveedorP = document.createElement("p");
  const proveedorLabel = document.createElement("strong");
  proveedorLabel.textContent = "Proveedor:";
  proveedorP.appendChild(proveedorLabel);
  proveedorP.append(` ${producto.proveedor}`);

  const fechaP = document.createElement("p");
  const fechaLabel = document.createElement("strong");
  fechaLabel.textContent = "Fecha de ingreso:";
  fechaP.appendChild(fechaLabel);
  fechaP.append(` ${producto.fechaIngreso}`);

  const idP = document.createElement("p");
  const idLabel = document.createElement("strong");
  idLabel.textContent = "ID de producto:";
  idP.appendChild(idLabel);
  idP.append(` ${producto.id}`);

  detalle.appendChild(proveedorP);
  detalle.appendChild(fechaP);
  detalle.appendChild(idP);


  botonToggle.addEventListener("click", () => {
    const visible = detalle.classList.toggle("visible");
    botonToggle.textContent = visible ? "Ocultar detalles" : "Ver más detalles";
  });

 
  body.appendChild(categoria);
  body.appendChild(nombre);
  body.appendChild(marca);
  body.appendChild(precio);
  body.appendChild(meta);
  body.appendChild(botonToggle);
  body.appendChild(detalle);

  // Ensamblar la tarjeta completa
  card.appendChild(imagenWrap);
  card.appendChild(body);

  return card;
}


function filtrarProductos() {
  return productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todas" || producto.categoria === categoriaActiva;

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      producto.marca.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideBusqueda;
  });
}

function renderizarProductos() {
  const productosFiltrados = filtrarProductos();

  // Limpiar el contenedor antes de volver a pintar
  contenedorProductos.innerHTML = "";

  if (productosFiltrados.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("sin-resultados");
    mensaje.textContent = "No se encontraron productos con los filtros aplicados.";
    contenedorProductos.appendChild(mensaje);
  } else {
    
    productosFiltrados.forEach((producto) => {
      const tarjeta = crearTarjetaProducto(producto);
      contenedorProductos.appendChild(tarjeta);
    });
  }

  resultadoTexto.textContent = `Mostrando ${productosFiltrados.length} de ${productos.length} productos`;
}


function renderizarEstadisticas() {
  const totalDisponibles = productos.filter((producto) => producto.disponible).length;
  const totalCategorias = new Set(productos.map((producto) => producto.categoria)).size;

  contadorProductosEl.textContent = productos.length;
  contadorDisponiblesEl.textContent = totalDisponibles;
  contadorCategoriasEl.textContent = totalCategorias;
}


buscadorInput.addEventListener("input", (evento) => {
  textoBusqueda = evento.target.value.trim().toLowerCase();
  renderizarProductos();
});


function iniciarApp() {
  renderizarEstadisticas();
  renderizarFiltros();
  renderizarProductos();
}

document.addEventListener("DOMContentLoaded", iniciarApp);