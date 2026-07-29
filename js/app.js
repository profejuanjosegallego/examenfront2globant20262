let container = document.getElementById('productsContainer')
let counterEl = document.getElementById('productCount')
let searchInput = document.getElementById('searchInput')
let searchBtn = document.getElementById('searchBtn')
let menuBtn = document.getElementById('menuBtn')
let navMenu = document.querySelector('.header__nav')

function formatPrice(precio) {
  let precioStr = precio.toString()
  let resultado = ""
  let contador = 0

  for (let i = precioStr.length - 1; i >= 0; i--) {
    contador++
    resultado = precioStr[i] + resultado
    if (contador % 3 == 0 && i != 0) {
      resultado = "." + resultado
    }
  }

  return resultado
}


function getStatusText(disponible) {
  if (disponible == true) {
    return "Disponible"
  }
  else {
    return "No disponible"
  }
}


function createProductCard(producto) {


  let card = document.createElement('div')
  card.classList.add('product-card')


  let imageDiv = document.createElement('div')
  imageDiv.classList.add('product-card__image')

  let img = document.createElement('img')
  img.src = producto.imagen
  img.alt = producto.nombre
  img.loading = "lazy"

  imageDiv.appendChild(img)
  card.appendChild(imageDiv)

  
  let contentDiv = document.createElement('div')
  contentDiv.classList.add('product-card__content')

  let catSpan = document.createElement('span')
  catSpan.classList.add('product-card__category')
  catSpan.textContent = producto.categoria
  contentDiv.appendChild(catSpan)


  let nombreH3 = document.createElement('h3')
  nombreH3.classList.add('product-card__name')
  nombreH3.textContent = producto.nombre
  contentDiv.appendChild(nombreH3)

  let marcaP = document.createElement('p')
  marcaP.classList.add('product-card__brand')
  marcaP.textContent = "Marca: " + producto.marca
  contentDiv.appendChild(marcaP)

  let detailsDiv = document.createElement('div')
  detailsDiv.classList.add('product-card__details')

  let precioDiv = document.createElement('div')
  precioDiv.classList.add('product-card__detail')

  let precioLabel = document.createElement('span')
  precioLabel.classList.add('product-card__detail-label')
  precioLabel.textContent = "Precio"

  let precioValue = document.createElement('span')
  precioValue.classList.add('product-card__detail-value')
  precioValue.textContent = "$" + formatPrice(producto.precio)

  precioDiv.appendChild(precioLabel)
  precioDiv.appendChild(precioValue)
  detailsDiv.appendChild(precioDiv)

  let provDiv = document.createElement('div')
  provDiv.classList.add('product-card__detail')

  let provLabel = document.createElement('span')
  provLabel.classList.add('product-card__detail-label')
  provLabel.textContent = "Proveedor"

  let provValue = document.createElement('span')
  provValue.classList.add('product-card__detail-value')
  provValue.textContent = producto.proveedor

  provDiv.appendChild(provLabel)
  provDiv.appendChild(provValue)
  detailsDiv.appendChild(provDiv)

  let fechaDiv = document.createElement('div')
  fechaDiv.classList.add('product-card__detail')

  let fechaLabel = document.createElement('span')
  fechaLabel.classList.add('product-card__detail-label')
  fechaLabel.textContent = "Fecha ingreso"

  let fechaValue = document.createElement('span')
  fechaValue.classList.add('product-card__detail-value')
  fechaValue.textContent = producto.fechaIngreso

  fechaDiv.appendChild(fechaLabel)
  fechaDiv.appendChild(fechaValue)
  detailsDiv.appendChild(fechaDiv)

  contentDiv.appendChild(detailsDiv)

  let footerDiv = document.createElement('div')
  footerDiv.classList.add('product-card__footer')

  let stockP = document.createElement('p')
  stockP.classList.add('product-card__stock')

  let stockStrong = document.createElement('strong')
  stockStrong.textContent = producto.stock + " unidades"

  stockP.appendChild(stockStrong)
  footerDiv.appendChild(stockP)

  let statusSpan = document.createElement('span')
  statusSpan.classList.add('product-card__status')

  if (producto.disponible == true) {
    statusSpan.classList.add('product-card__status--available')
  }
  else {
    statusSpan.classList.add('product-card__status--unavailable')
  }

  let dot = document.createElement('span')
  dot.classList.add('product-card__status-dot')
  statusSpan.appendChild(dot)

  let txt = document.createTextNode(getStatusText(producto.disponible))
  statusSpan.appendChild(txt)

  footerDiv.appendChild(statusSpan)
  contentDiv.appendChild(footerDiv)
  card.appendChild(contentDiv)

  return card
}
function showProducts(listaProductos) {

  container.innerHTML = ""

  if (listaProductos.length == 0) {
    let emptyDiv = document.createElement('div')
    emptyDiv.classList.add('empty-state')

    let emptyTitle = document.createElement('h3')
    emptyTitle.classList.add('empty-state__title')
    emptyTitle.textContent = "No se encontraron productos"
    emptyDiv.appendChild(emptyTitle)

    let emptyText = document.createElement('p')
    emptyText.classList.add('empty-state__text')
    emptyText.textContent = "Intenta con otro termino de busqueda"
    emptyDiv.appendChild(emptyText)

    container.appendChild(emptyDiv)
    return
  }
  listaProductos.forEach(function(prod) {
    let tarjeta = createProductCard(prod)
    container.appendChild(tarjeta)
  })

}
function searchProducts() {
  let textoBusqueda = searchInput.value.toLowerCase().trim()

  // filtrar con filter
  let resultados = productos.filter(function(e) {
    return e.nombre.toLowerCase().indexOf(textoBusqueda) > -1
  })

  showProducts(resultados)
  counterEl.textContent = resultados.length
}



function loadInitialProducts() {
  showProducts(productos)
  counterEl.textContent = productos.length
}


searchBtn.addEventListener('click', function() {
  searchProducts()
})

searchInput.addEventListener('keyup', function(e) {
  if (e.key == 'Enter') {
    searchProducts()
  }
})


let timeoutId
searchInput.addEventListener('input', function() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(function() {
    searchProducts()
  }, 350)
})


menuBtn.addEventListener('click', function() {
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active')
  }
  else {
    navMenu.classList.add('active')
  }
})


window.addEventListener('load', function() {
  loadInitialProducts()
})