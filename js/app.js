const contenedor = document.getElementById('productos');
const buscador = document.getElementById('buscador');
const contador = document.getElementById('contador-productos');

function mostrarProductos(lista) {
  contenedor.innerHTML = '';
  contador.textContent = lista.length;

  lista.forEach(function (producto) {
    const card = document.createElement('article');
    card.classList.add('producto-card');

    const imagen = document.createElement('img');
    imagen.classList.add('producto-card__image')
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const cuerpo = document.createElement('div');
    cuerpo.classList.add('producto-card__body')

    const titulo = document.createElement('h3');
    titulo.classList.add('producto-card__title');
    titulo.textContent = producto.nombre;

    const categoria = document.createElement('p');
    categoria.classList.add('producto-card__meta');
    categoria.textContent = 'Categoría: ' + producto.categoria;

    const marca = document.createElement('p');
    marca.classList.add('producto-card__meta');
    marca.textContent = 'Marca: ' + producto.marca;

    const precio = document.createElement('p');
    precio.classList.add('producto-card__meta');
    precio.textContent = 'Precio: $' + producto.precio.toLocaleString('es-CO');

    const stock = document.createElement('p');
    stock.classList.add('producto-card__meta');
    stock.textContent = 'Stock: ' + producto.stock;

    const estado = document.createElement('span')
    estado.classList.add('badge')

    if (producto.disponible) {
      estado.classList.add('badge--disponible');
      estado.textContent = 'Disponible';
    } else {
      estado.textContent = 'No disponible';
    }

    cuerpo.append(titulo, categoria, marca, precio, stock, estado);
    card.append(imagen, cuerpo);
    contenedor.appendChild(card);
  });
}

function buscarProductos() {
  const texto = buscador.value.toLowerCase().trim();
  const resultado = productos.filter(producto=> {
    return (
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto) ||
      producto.marca.toLowerCase().includes(texto)
    );
  });

  mostrarProductos(resultado);
}

buscador.addEventListener('input', buscarProductos)
mostrarProductos(productos)
