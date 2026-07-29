import { productos } from "../data/productos.js";
console.log(productos);

const totalProductos = productos.length;
let cantidadProductos = document.getElementById("cantidadProductos");
cantidadProductos.textContent = `Cantidad de productos unicos: ${totalProductos}`;

let contenedorProductos = document.getElementById("contenedorProductos");
mostrarProductos(productos);

let buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {
    let texto = buscador.value.toLowerCase();
    let productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto));
    mostrarProductos(productosFiltrados);
});

function mostrarProductos(Productos) {
    contenedorProductos.innerHTML = "";

    Productos.forEach(producto => {
        let columna = document.createElement("div");
        columna.classList.add("col-3");

        columna.appendChild(crearTarjetaProducto(producto));

        contenedorProductos.appendChild(columna);
    });
}

function crearTarjetaProducto(producto) {
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjetaProductoEstilo");

    let productoImagen = document.createElement("img");
    productoImagen.src = producto.imagen;
    productoImagen.classList.add("imagenProductoEstilo");

    let productoTitulo = document.createElement("h5");
    productoTitulo.textContent = producto.nombre;
    productoTitulo.classList.add("tituloProductoEstilo");

    let productoCategoria = document.createElement("p");
    productoCategoria.textContent = `Categoria: ${producto.categoria}`;

    let productoMarca = document.createElement("p");
    productoMarca.textContent = `Marca: ${producto.marca}`;

    let productoPrecio = document.createElement("p");
    productoPrecio.textContent = `Precio: ${producto.precio}`;
    productoPrecio.classList.add("precioProductoEstilo");

    let productoStock = document.createElement("p");
    productoStock.textContent = `Stock: ${producto.stock}`;

    let productoDisponibilidad = document.createElement("p");
    productoDisponibilidad.textContent = `Disponible: ${producto.disponible}`;

    if (producto.disponible) {
        productoDisponibilidad.textContent = "Disponible";
        productoDisponibilidad.classList.add("disponible");
    } else {
        productoDisponibilidad.textContent = "No Disponible";
        productoDisponibilidad.classList.add("no-disponible");
    }

    tarjeta.appendChild(productoImagen);
    tarjeta.appendChild(productoTitulo);
    tarjeta.appendChild(productoCategoria);
    tarjeta.appendChild(productoMarca);
    tarjeta.appendChild(productoPrecio);
    tarjeta.appendChild(productoStock);
    tarjeta.appendChild(productoDisponibilidad);

    return tarjeta;
}