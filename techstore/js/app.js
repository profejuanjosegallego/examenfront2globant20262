let raiz = document.getElementById("raiz-productos");
let textoContador = document.getElementById("texto-contador");
let botonFiltro = document.getElementById("boton-filtro");


let filtrado = false;


function mostrarEnPantalla(listaDatos) {
    
    raiz.innerHTML = "";
    
   
    textoContador.textContent = "Total: " + listaDatos.length + " Productos";

   
    listaDatos.forEach(function(dato) {
        
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card-neo");

        let cajaImg = document.createElement("div");
        cajaImg.classList.add("caja-imagen");
        let imagen = document.createElement("img");
        imagen.src = dato.imagen;
        cajaImg.appendChild(imagen);

        let titulo = document.createElement("h4");
        titulo.textContent = dato.nombre;

        let precio = document.createElement("p");
        precio.textContent = "$" + dato.precio;

      
        let cajaBotones = document.createElement("div");
        cajaBotones.classList.add("caja-botones");

        let stockText = document.createElement("span");
        stockText.classList.add("btn-mini");
        stockText.textContent = "Stock: " + dato.stock;

        let estadoText = document.createElement("span");
        estadoText.classList.add("btn-mini");
        
        if(dato.disponible == true) {
            estadoText.textContent = "En Stock";
        } else {
            estadoText.textContent = "Agotado";
            estadoText.style.color = "red";
        }

        
        cajaBotones.appendChild(stockText);
        cajaBotones.appendChild(estadoText);
        
        tarjeta.appendChild(cajaImg);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(cajaBotones);

        
        raiz.appendChild(tarjeta);
    });
}


botonFiltro.addEventListener("click", function() {
    if(filtrado == false) {
       
        let productosDisponibles = productos.filter(function(prod) {
            return prod.disponible == true;
        });
        mostrarEnPantalla(productosDisponibles);
        botonFiltro.textContent = "Mostrar todos los productos";
        filtrado = true;
    } else {
     
        mostrarEnPantalla(productos);
        botonFiltro.textContent = "Mostrar solo disponibles";
        filtrado = false;
    }
});


mostrarEnPantalla(productos);