import { datos } from "../data/product.js";

let root = document.getElementById("root");
let btnMostrarTodos = document.getElementById("btn-mostrar-todos");
let btnSoloDisponibles = document.getElementById("btn-solo-disponibles");
let btnLimpiar = document.getElementById("btn-limpiar");
let btnOrdenarPrecio = document.getElementById("btn-ordenar-precio");
let selectCategoria = document.getElementById("filtro-categoria");
let contadorProductos = document.getElementById("contador-productos");

//Función para mostrar todos los productos:
btnMostrarTodos.addEventListener("click", function () {
    root.innerHTML = "";

    datos.forEach(function (dato) {
        let tr = document.createElement("tr");
        tr.classList.add("table-light");

        let tdId = document.createElement("td");
        tdId.textContent = dato.id;

        let tdNombre = document.createElement("td");
        tdNombre.textContent = dato.nombre;

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = dato.categoria;

        let tdMarca = document.createElement("td");
        tdMarca.textContent = dato.marca;

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${dato.precio.toFixed(0)}`;

        let tdStock = document.createElement("td");
        tdStock.textContent = dato.stock;

        let tdDisponible = document.createElement("td");
        tdDisponible.textContent = dato.disponible ? "Sí" : "No";

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdDisponible);

        root.appendChild(tr);
    });
});

//Filtro de sólo disponibles:
btnSoloDisponibles.addEventListener("click", function () {
    root.innerHTML = "";

    let productosFiltrados = datos.filter(function (producto) {
        return producto.disponible === true;
    });

    productosFiltrados.forEach(function (dato) {
        let tr = document.createElement("tr");
        tr.classList.add("table-light");

        let tdId = document.createElement("td");
        tdId.textContent = dato.id;

        let tdNombre = document.createElement("td");
        tdNombre.textContent = dato.nombre;

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = dato.categoria;

        let tdMarca = document.createElement("td");
        tdMarca.textContent = dato.marca;

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${dato.precio.toFixed(0)}`;

        let tdStock = document.createElement("td");
        tdStock.textContent = dato.stock;

        let tdDisponible = document.createElement("td");
        tdDisponible.textContent = dato.disponible ? "Sí" : "No";

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdDisponible);

        root.appendChild(tr);
    });
});

//Función para limpiar la tabla
btnLimpiar.addEventListener("click", function () {
    root.innerHTML = "";
});


//Función para ordenar por precio:
btnOrdenarPrecio.addEventListener("click", function () {
    root.innerHTML = "";
    datos.sort(function (a, b) {
        return a.precio - b.precio;
    });

    datos.forEach(function (dato) {
        let tr = document.createElement("tr");
        tr.classList.add("table-light");

        let tdId = document.createElement("td");
        tdId.textContent = dato.id;

        let tdNombre = document.createElement("td");
        tdNombre.textContent = dato.nombre;

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = dato.categoria;

        let tdMarca = document.createElement("td");
        tdMarca.textContent = dato.marca;

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${dato.precio.toFixed(0)}`;

        let tdStock = document.createElement("td");
        tdStock.textContent = dato.stock;

        let tdDisponible = document.createElement("td");
        tdDisponible.textContent = dato.disponible ? "Sí" : "No";

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdDisponible);

        root.appendChild(tr);
    });
});

//Función para el contador: 
function renderizarTabla(listaProductos) {
    root.innerHTML = "";
    contadorProductos.textContent = listaProductos.length;

    listaProductos.forEach(function(dato) {
        let tr = document.createElement("tr");
        tr.classList.add("table-light");

          let tdId = document.createElement("td");
        tdId.textContent = dato.id;

        let tdNombre = document.createElement("td");
        tdNombre.textContent = dato.nombre;

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = dato.categoria;

        let tdMarca = document.createElement("td");
        tdMarca.textContent = dato.marca;

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${dato.precio.toFixed(0)}`;

        let tdStock = document.createElement("td");
        tdStock.textContent = dato.stock;

        let tdDisponible = document.createElement("td");
        tdDisponible.textContent = dato.disponible ? "Sí" : "No";

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdDisponible);

        root.appendChild(tr);
    });
}

//Filtro categoria:
selectCategoria.addEventListener("change", function () {
    root.innerHTML = "";

    let categoriaSeleccionada = selectCategoria.value.toLowerCase();
    let datosFiltrados = datos.filter(function (dato) {
        if (categoriaSeleccionada === "todas") {
            return true; 
        }
        return dato.categoria.toLowerCase() === categoriaSeleccionada;
    });

    datosFiltrados.forEach(function (dato) {
        let tr = document.createElement("tr");
        tr.classList.add("table-light");

        let tdId = document.createElement("td");
        tdId.textContent = dato.id;

        let tdNombre = document.createElement("td");
        tdNombre.textContent = dato.nombre;

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = dato.categoria;

        let tdMarca = document.createElement("td");
        tdMarca.textContent = dato.marca;

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${dato.precio.toFixed(0)}`;

        let tdStock = document.createElement("td");
        tdStock.textContent = dato.stock;

        let tdDisponible = document.createElement("td");
        tdDisponible.textContent = dato.disponible ? "Sí" : "No";

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdMarca);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdDisponible);

        root.appendChild(tr);
        renderizarTabla(datosFiltrados);
    });
});

