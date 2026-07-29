//hacerlo en tabla 
//se puede desplegar, dejar tal vez

import { datos } from "../data/productos.js";

let contenedor = document.getElementById("contenedor-productos");
let contador = document.getElementById("contador");
let inputBuscar = document.getElementById("buscador");

function textoDisponible(valor) {
if (valor == true) {
    return "disponible";
} else {
        return "agotado";
    }
}

function mostrarProductos(lista) {

contenedor.textContent = "";

    lista.forEach(function(producto) {

    let tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    let img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    let nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;
    let categoria = document.createElement("p");
    categoria.textContent = "categoria: " + producto.categoria;
    let marca = document.createElement("p");
    marca.textContent = "marca: " + producto.marca;
    let precio = document.createElement("p");
        precio.classList.add("precio");
    precio.textContent = "$ " + producto.precio.toLocaleString("es-co");
        let stock = document.createElement("p");
    stock.textContent = "stock: " + producto.stock;
    let disponible = document.createElement("span");
    disponible.classList.add("badge");
    disponible.textContent = textoDisponible(producto.disponible);

    if (producto.disponible == true) {
        disponible.classList.add("badge-si");
            } else {
        disponible.classList.add("badge-no")
    }

    tarjeta.appendChild(img);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(marca);
    tarjeta.appendChild(precio);
        tarjeta.appendChild(stock);
    tarjeta.appendChild(disponible);

    contenedor.appendChild(tarjeta);

});

contador.textContent = "productos cargados: " + lista.length;
}

inputBuscar.addEventListener("input", function() {
let texto = inputBuscar.value.toLowerCase();

    let filtrados = datos.filter(function(producto) {
return producto.nombre.toLowerCase().includes(texto);
    });

mostrarProductos(filtrados)
});

mostrarProductos(datos);
console.log(datos.length);

