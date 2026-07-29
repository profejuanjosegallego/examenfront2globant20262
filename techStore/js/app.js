let botonCargar = document.getElementById("btn-cargar");
let cuerpoTabla = document.getElementById("cuerpo-tabla");
let contadorPantalla = document.getElementById("span-contador");

botonCargar.addEventListener("click", mostrarProductos);
function mostrarProductos() {
    
    cuerpoTabla.innerHTML = "";
    
   
    contadorPantalla.textContent = productos.length;

    
    productos.forEach(function(producto) {
        
        let fila = document.createElement("tr");

        let celdaId = document.createElement("td");
        celdaId.textContent = producto.id;
        fila.appendChild(celdaId);

        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = producto.nombre;
        fila.appendChild(celdaNombre);

        let celdaCategoria = document.createElement("td");
        celdaCategoria.textContent = producto.categoria;
        fila.appendChild(celdaCategoria);

        let celdaMarca = document.createElement("td");
        celdaMarca.textContent = producto.marca;
        fila.appendChild(celdaMarca);

        let celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = producto.precio;
        fila.appendChild(celdaPrecio);

        let celdaStock = document.createElement("td");
        celdaStock.textContent = producto.stock;
        fila.appendChild(celdaStock);

        
        let celdaEstado = document.createElement("td");
        if (producto.disponible === true) {
            celdaEstado.textContent = "En inventario";
        } else {
            celdaEstado.textContent = "Agotado";
        }
        fila.appendChild(celdaEstado);

        
        cuerpoTabla.appendChild(fila);
    });
}