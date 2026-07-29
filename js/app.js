import { productos } from '../data/productos.js';

var tablaDOM = document.getElementById("cuerpoTabla");
var buscar = document.getElementById("name");

function pintarCatalogo(arreglo) {
    tablaDOM.innerHTML = ""; 
    document.getElementById("contador").innerHTML = arreglo.length;
    for (var i = 0; i < arreglo.length; i++) {
        var p = arreglo[i];
        var etiquetaDisponible = "";
        if(p.disponible == true) {
            etiquetaDisponible = "<span class='badge bg-success'>En Stock</span>"
        } else {
            etiquetaDisponible = "<span class='badge bg-danger'>Agotado</span>"
        };

        tablaDOM.innerHTML = tablaDOM.innerHTML + 
            "<tr>" +
                "<td class='d-none d-sm-table-cell'><img src='" + p.imagen + "' alt='" + p.nombre + "' class='rounded' style='width: 60px; height: 60px; object-fit: cover;'></td>" +
                "<td class='fw-bold'>" + p.nombre + "</td>" +
                "<td class='d-none d-md-table-cell'><span class='badge bg-secondary'>" + p.categoria + "</span></td>" +
                "<td>" + p.marca + "</td>" +
                "<td class='text-success fw-bold'>" + p.precio + "</td>" +
                "<td class='d-none d-sm-table-cell'>" + p.stock + "</td>" +
                "<td>" + etiquetaDisponible + "</td>" +
            "</tr>";
    };
};

pintarCatalogo(productos);
buscar.addEventListener("keyup", function(evento) {
    var texto = evento.target.value.toLowerCase();
    var resultados = [];
    for(var k = 0; k < productos.length; k++) {
        var nombreProducto = productos[k].nombre.toLowerCase();
        if(nombreProducto.indexOf(texto) !== -1) {
            resultados.push(productos[k]);
        }
    }
    pintarCatalogo(resultados);
});