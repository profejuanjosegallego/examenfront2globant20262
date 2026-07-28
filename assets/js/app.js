// ==========================================
// 1. ESTADO Y DATOS
// ==========================================
let productos = [];
let mostrarSoloDisponibles = false;
let textoBusqueda = "";

async function cargarProductos() {
  try {
    const response = await fetch("./assets/data/productos.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar el JSON: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      productos = data;
    }
  } catch (error) {
    console.error("Error cargando productos:", error);
    productos = [];
  } finally {
    renderProducts();
  }
}

const container = typeof document !== "undefined" ? document.getElementById("products-container") : null;
const countSpan = typeof document !== "undefined" ? document.getElementById("product-count") : null;

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
};

function filtrarProductos(productosOriginal, filtros) {
  const { mostrarSoloDisponibles, textoBusqueda } = filtros;
  const texto = textoBusqueda.trim().toLowerCase();

  return productosOriginal.filter((prod) => {
    const coincideDisponibilidad = !mostrarSoloDisponibles || prod.disponible;
    const coincideBusqueda = !texto ||
      prod.nombre.toLowerCase().includes(texto) ||
      prod.categoria.toLowerCase().includes(texto);

    return coincideDisponibilidad && coincideBusqueda;
  });
}

function getProductosVisibles() {
  return filtrarProductos(productos, {
    mostrarSoloDisponibles,
    textoBusqueda
  });
}

// Renderizar las tarjetas
function renderProducts() {
  if (!container) return;

  container.innerHTML = "";

  const productosVisibles = getProductosVisibles();

  productosVisibles.forEach((prod) => {
    const card = document.createElement("article");
    card.classList.add("product-card");
    card.dataset.id = prod.id;

    card.innerHTML = `
      <div class="card-image">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <span class="badge ${prod.disponible ? 'in-stock' : 'out-stock'}">
          ${prod.disponible ? 'Disponible' : 'Agotado'}
        </span>
      </div>
      <div class="card-content">
        <span class="category">${prod.categoria.toUpperCase()} • ${prod.marca}</span>
        <h3>${prod.nombre}</h3>
        <p class="price">${formatPrice(prod.precio)}</p>
        <p class="stock">Stock: <strong>${prod.stock}</strong> uds.</p>
        <p class="meta">Proveedor: ${prod.proveedor}</p>
        
        <div class="card-actions">
          <button class="btn-edit" data-id="${prod.id}">Editar</button>
          <button class="btn-delete" data-id="${prod.id}">Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  if (countSpan) {
    countSpan.textContent = productosVisibles.length;
  }
}

function deleteProduct(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    productos = productos.filter((p) => p.id !== id);
    renderProducts();
  }
}

function saveProduct(productData, isEditing = false) {
  if (isEditing) {
    productos = productos.map((p) => (p.id === productData.id ? productData : p));
  } else {
    productos.push(productData);
  }
  renderProducts();
}

function openModal(productId = null) {
  const isEditing = productId !== null;
  const product = isEditing 
    ? productos.find((p) => p.id === productId) 
    : { nombre: "", categoria: "", marca: "", precio: "", stock: "", proveedor: "", disponible: true, imagen: "" };

  // Inyectar HTML del Modal dinámicamente si no existe
  let modal = document.getElementById("product-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "product-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      <form id="product-form">
        <input type="text" id="nombre" placeholder="Nombre del producto" value="${product.nombre}" required />
        <input type="text" id="categoria" placeholder="Categoría" value="${product.categoria}" required />
        <input type="text" id="marca" placeholder="Marca" value="${product.marca}" required />
        <input type="number" id="precio" placeholder="Precio" value="${product.precio}" required />
        <input type="number" id="stock" placeholder="Stock" value="${product.stock}" required />
        <input type="text" id="proveedor" placeholder="Proveedor" value="${product.proveedor}" required />
        <input type="url" id="imagen" placeholder="URL de la imagen" value="${product.imagen || 'https://via.placeholder.com/400x400.png'}" required />
        
        <label class="checkbox-label">
          <input type="checkbox" id="disponible" ${product.disponible ? 'checked' : ''} />
          ¿Está disponible?
        </label>

        <div class="modal-buttons">
          <button type="submit" class="btn-save">Guardar</button>
          <button type="button" id="btn-cancel" class="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  `;

  modal.style.display = "flex";

  // Evento Submit del Formulario
  document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: isEditing ? productId : Date.now(), // ID único
      nombre: document.getElementById("nombre").value,
      categoria: document.getElementById("categoria").value,
      marca: document.getElementById("marca").value,
      precio: Number(document.getElementById("precio").value),
      stock: Number(document.getElementById("stock").value),
      proveedor: document.getElementById("proveedor").value,
      fechaIngreso: isEditing ? product.fechaIngreso : new Date().toISOString().split("T")[0],
      disponible: document.getElementById("disponible").checked,
      imagen: document.getElementById("imagen").value
    };

    saveProduct(updatedProduct, isEditing);
    modal.style.display = "none";
  });

  // Cerrar Modal
  document.getElementById("btn-cancel").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// ==========================================
// 5. EVENT LISTENERS GLOBAL Y BOTÓN AGREGAR
// ==========================================

function setupFilters() {
  const onlyAvailableCheckbox = document.getElementById("only-available");
  const searchInput = document.getElementById("search-products");

  if (onlyAvailableCheckbox) {
    onlyAvailableCheckbox.addEventListener("change", (e) => {
      mostrarSoloDisponibles = e.target.checked;
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      textoBusqueda = e.target.value;
      renderProducts();
    });
  }
}

// Delegación de eventos para los botones de las tarjetas
if (container) {
  container.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("btn-delete")) {
      deleteProduct(id);
    }

    if (e.target.classList.contains("btn-edit")) {
      openModal(id);
    }
  });
}

// Insertar botón de "Agregar Producto" en la sección del catálogo
function setupAddButton() {
  const catalogHeader = document.querySelector(".catalog-header");
  if (!catalogHeader) return;

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Agregar Producto";
  addBtn.className = "btn-add";
  addBtn.addEventListener("click", () => openModal());
  catalogHeader.appendChild(addBtn);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    setupFilters();
    setupAddButton();
    cargarProductos();
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { filtrarProductos };
}