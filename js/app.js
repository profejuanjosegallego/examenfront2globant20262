let seccionDeProductos = document.getElementById("seccionPrincipalProductos");
let contadorDeProductos = document.getElementById("contadorUnico");
let buscadorDeProductos = document.getElementById("buscadorDeProductos");

contadorDeProductos.textContent = productos.length;

function mostrarProductos(listaDeProductos) {

    seccionDeProductos.replaceChildren();

    contadorDeProductos.textContent = listaDeProductos.length;

    listaDeProductos.forEach(producto => {

        let tarjetaDeProducto = document.createElement("div");
        tarjetaDeProducto.classList.add("producto");

        let imagenDeProducto = document.createElement("img");
        imagenDeProducto.src = producto.imagen;
        imagenDeProducto.alt = producto.nombre;

        let nombreDeProducto = document.createElement("h3");
        nombreDeProducto.textContent = producto.nombre;

        let categoriaDeProducto = document.createElement("p");
        categoriaDeProducto.textContent = producto.categoria;

        let marcaDeProducto = document.createElement("p");
        marcaDeProducto.textContent = producto.marca;

        let precioDeProducto = document.createElement("p");
        precioDeProducto.textContent = producto.precio;

        let stockDeTienda = document.createElement("p");
        stockDeTienda.textContent = producto.stock;

        let disponibilidadTienda = document.createElement("p");

        if (producto.disponible) {
            disponibilidadTienda.textContent = "Disponible";
        } else {
            disponibilidadTienda.textContent = "F, ya no hay";
        }

        tarjetaDeProducto.append(
            imagenDeProducto,
            nombreDeProducto,
            categoriaDeProducto,
            marcaDeProducto,
            precioDeProducto,
            stockDeTienda,
            disponibilidadTienda
        );

        seccionDeProductos.appendChild(tarjetaDeProducto);

    });

}

mostrarProductos(productos);

buscadorDeProductos.addEventListener("input", function () {

    let textoBuscado = buscadorDeProductos.value.toLowerCase();

    let productosFiltrados = productos.filter(function (producto) {

        return producto.nombre.toLowerCase().includes(textoBuscado);

    });

    mostrarProductos(productosFiltrados);

});