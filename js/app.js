var container = document.getElementById("contenedor-productos");
var counter = document.getElementById("contador");
var searchInput = document.getElementById("busqueda");
var categorySelection = document.getElementById("filtroCategoria");

var modalDetail = document.getElementById("modal-detalle");
var closeModal = document.getElementById("cerrar-modal");
var modalBody = document.getElementById("modal-body");

var cardTemplate = document.getElementById("plantilla-card");
var modalTemplate = document.getElementById("plantilla-modal-detalle");

function showProducts(productList) {
  container.innerHTML = "";
  counter.textContent = "Se encontraron " + productList.length + " productos";

  productList.forEach((product) => {
    const clone = cardTemplate.content.cloneNode(true);
    const card = clone.querySelector(".card");
    const img = clone.querySelector("img");
    img.src = product.imagen;
    img.alt = product.nombre;

    clone.querySelector("h3").textContent = product.nombre;
    clone.querySelector(".val-categoria").textContent = product.categoria;
    clone.querySelector(".val-marca").textContent = product.marca;
    clone.querySelector(".val-precio").textContent =
      product.precio.toLocaleString();
    clone.querySelector(".val-stock").textContent = product.stock;

    const availableText = product.disponible ? "Disponible" : "Agotado";
    const availableClass = product.disponible ? "disponible" : "agotado";

    const statusText = clone.querySelector(".card-estado");
    statusText.textContent = availableText;
    statusText.classList.add(availableClass);

    card.addEventListener("click", () => {
      openModalDetail(product);
    });

    container.appendChild(clone);
  });
}

function openModalDetail(producto) {
  const textoDisponible = producto.disponible ? "Disponible" : "Agotado";
  const claseDisponible = producto.disponible ? "disponible" : "agotado";

  const clon = modalTemplate.content.cloneNode(true);

  const img = clon.querySelector("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;

  clon.querySelector("h2").textContent = producto.nombre;
  clon.querySelector(".val-id").textContent = producto.id;
  clon.querySelector(".val-categoria").textContent = producto.categoria;
  clon.querySelector(".val-marca").textContent = producto.marca;
  clon.querySelector(".val-precio").textContent =
    producto.precio.toLocaleString();
  clon.querySelector(".val-stock").textContent = producto.stock;
  clon.querySelector(".val-proveedor").textContent = producto.proveedor;
  clon.querySelector(".val-fecha").textContent = producto.fechaIngreso;

  const spanEstado = clon.querySelector(".val-estado");
  spanEstado.textContent = textoDisponible;
  spanEstado.classList.add(claseDisponible);

  modalBody.innerHTML = "";
  modalBody.appendChild(clon);

  modalDetail.classList.remove("oculto");
}

closeModal.addEventListener("click", () => {
  modalDetail.classList.add("oculto");
});

modalDetail.addEventListener("click", (event) => {
  if (event.target === modalDetail) {
    modalDetail.classList.add("oculto");
  }
});

function productFilter() {
  const searchFilter = searchInput.value.toLowerCase();
  const selectedCategory = categorySelection.value;

  let result = products;

  if (searchFilter !== "") {
    result = result.filter((product) => {
      return product.nombre.toLowerCase().includes(searchFilter);
    });
  }

  if (selectedCategory !== "todas") {
    result = result.filter((product) => {
      return product.categoria === selectedCategory;
    });
  }

  showProducts(result);
}

searchInput.addEventListener("input", productFilter);
categorySelection.addEventListener("change", productFilter);

showProducts(products);
