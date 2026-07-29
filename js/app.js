const catalogo = document.getElementById("catalogo");
const contador = document.getElementById("contador");

const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");
const botonDisponibles = document.getElementById("mostrarDisponibles");
const botonVolverInicio = document.getElementById("btnVolverInicio");

let mostrandoDisponibles = false;

function habilitarScrollSuave(){
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function(enlace){
        enlace.addEventListener("click", function(evento){
            evento.preventDefault();

            const destino = this.getAttribute("href");
            const elementoDestino = document.querySelector(destino);

            if(elementoDestino){
                elementoDestino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

function habilitarBotonVolverInicio(){
    window.addEventListener("scroll", function(){
        if(window.scrollY > 350){
            botonVolverInicio.classList.add("mostrar");
        } else {
            botonVolverInicio.classList.remove("mostrar");
        }
    });

    botonVolverInicio.addEventListener("click", function(){
        const encabezado = document.getElementById("inicio");

        if(encabezado){
            encabezado.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

habilitarScrollSuave();
habilitarBotonVolverInicio();

function crearTarjeta(producto){

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("tarjeta");


        const tarjetaInner = document.createElement("div");
    tarjetaInner.classList.add("tarjeta-inner");

    const tarjetaFront = document.createElement("div");
    tarjetaFront.classList.add("tarjeta-front");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.textContent = producto.categoria;

    tarjetaFront.appendChild(imagen);
    tarjetaFront.appendChild(nombre);
    tarjetaFront.appendChild(categoria);

    const tarjetaBack = document.createElement("div");
    tarjetaBack.classList.add("tarjeta-back");

    const nombreBack = document.createElement("h3");
    nombreBack.textContent = producto.nombre;

    const marca = document.createElement("p");
    const strongMarca = document.createElement("strong");
    strongMarca.textContent = "Marca: ";
    marca.appendChild(strongMarca);
    marca.append(" " + producto.marca);

    const categoriaBack = document.createElement("p");
    const strongCategoria = document.createElement("strong");
    strongCategoria.textContent = "Categor�a: ";
    categoriaBack.appendChild(strongCategoria);
    categoriaBack.append(" " + producto.categoria);

    const precio = document.createElement("p");
    const strongPrecio = document.createElement("strong");
    strongPrecio.textContent = "Precio: ";
    precio.appendChild(strongPrecio);
    precio.append(" $" + producto.precio);

    const stock = document.createElement("p");
    const strongStock = document.createElement("strong");
    strongStock.textContent = "Stock: ";
    stock.appendChild(strongStock);
    stock.append(" " + producto.stock);

    const estado = document.createElement("p");
    const strongEstado = document.createElement("strong");
    strongEstado.textContent = "Estado: ";
    estado.appendChild(strongEstado);
    estado.append(" " + (producto.disponible ? "Disponible" : "Agotado"));

    tarjetaBack.appendChild(nombreBack);
    tarjetaBack.appendChild(marca);
    tarjetaBack.appendChild(categoriaBack);
    tarjetaBack.appendChild(precio);
    tarjetaBack.appendChild(stock);
    tarjetaBack.appendChild(estado);

    tarjetaInner.appendChild(tarjetaFront);
    tarjetaInner.appendChild(tarjetaBack);
    tarjeta.appendChild(tarjetaInner);


    return tarjeta;

}




function mostrarProductos(listaProductos){
    while (catalogo.firstChild) {
        catalogo.removeChild(catalogo.firstChild);
    }

    listaProductos.forEach(function(producto){
        const tarjeta = crearTarjeta(producto);
        catalogo.appendChild(tarjeta);
    });
}




contador.textContent = productos.length;




buscador.addEventListener("input", function(){

    const texto = buscador.value.toLowerCase();


    const resultados = productos.filter(function(producto){


        return producto.nombre
        .toLowerCase()
        .includes(texto);


    });


    mostrarProductos(resultados);

});





filtroCategoria.addEventListener("change", function(){


    const categoriaSeleccionada = filtroCategoria.value;


    if(categoriaSeleccionada === "todas"){

        mostrarProductos(productos);


    }else{


        const productosFiltrados = productos.filter(function(producto){


            return producto.categoria === categoriaSeleccionada;


        });


        mostrarProductos(productosFiltrados);

    }


});





botonDisponibles.addEventListener("click", function(){


    if(mostrandoDisponibles === false){


        const disponibles = productos.filter(function(producto){

            return producto.disponible;

        });


        mostrarProductos(disponibles);


        botonDisponibles.textContent = "Mostrar todos";


        mostrandoDisponibles = true;



    }else{


        mostrarProductos(productos);


        botonDisponibles.textContent = "Mostrar disponibles";


        mostrandoDisponibles = false;


    }


});





mostrarProductos(productos);
