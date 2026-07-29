import { formatPrice, escapeHtml } from "./helpers.js";
import {
  clearCart,
  getCart,
  getCartCount,
  getCartSubtotal,
  removeFromCart,
  updateCartItemQuantity,
} from "./cart-utils.js";
import { reduceStockForItems } from "./products.js";

const SHIPPING_BASE = 12000;

const refs = {
  cartStatus: document.querySelector("#cartStatus"),
  cartItems: document.querySelector("#cartItems"),
  cartSummaryPanel: document.querySelector("#cartSummaryPanel"),
  summaryCount: document.querySelector("#summaryCount"),
  summarySubtotal: document.querySelector("#summarySubtotal"),
  summaryShipping: document.querySelector("#summaryShipping"),
  summaryTotal: document.querySelector("#summaryTotal"),
  clearCartButton: document.querySelector("#clearCartButton"),
  checkoutButton: document.querySelector("#checkoutButton"),
};

const renderStatus = (message, type = "info") => {
  refs.cartStatus.className = `alert alert-${type}`;
  refs.cartStatus.textContent = message;
};

const getShippingEstimate = (count) => {
  if (count <= 0) {
    return 0;
  }

  return SHIPPING_BASE;
};

const buildItemElement = (item) => {
  const lineTotal = Number(item.precio) * Number(item.quantity);

  const article = document.createElement("article");
  article.className = "card cart-item p-3";
  article.dataset.itemId = String(item.id);

  const row = document.createElement("div");
  row.className = "d-flex flex-column flex-md-row gap-3 align-items-start";

  const image = document.createElement("img");
  image.src = item.imagen;
  image.alt = item.nombre;

  const body = document.createElement("div");
  body.className = "flex-grow-1";

  const category = document.createElement("p");
  category.className = "text-uppercase small text-secondary fw-bold mb-1";
  category.textContent = item.categoria;

  const title = document.createElement("h3");
  title.className = "h5 mb-1";
  title.textContent = item.nombre;

  const brand = document.createElement("p");
  brand.className = "text-secondary mb-2";
  brand.textContent = item.marca;

  const price = document.createElement("p");
  price.className = "mb-2";
  price.append(
    document.createTextNode("Precio unitario: "),
    Object.assign(document.createElement("strong"), {
      textContent: formatPrice(item.precio),
    }),
  );

  const controls = document.createElement("div");
  controls.className = "d-flex flex-wrap align-items-center gap-2";

  const qtyLabel = document.createElement("label");
  qtyLabel.className = "form-label m-0";
  qtyLabel.htmlFor = `qty-${item.id}`;
  qtyLabel.textContent = "Cantidad";

  const qtyInput = document.createElement("input");
  qtyInput.id = `qty-${item.id}`;
  qtyInput.className = "form-control form-control-sm cart-qty-input";
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.max = String(item.stock);
  qtyInput.value = String(item.quantity);
  qtyInput.dataset.id = String(item.id);
  qtyInput.style.width = "90px";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn-sm btn-outline-danger cart-remove-button";
  removeButton.dataset.id = String(item.id);
  removeButton.textContent = "Eliminar";

  controls.append(qtyLabel, qtyInput, removeButton);
  body.append(category, title, brand, price, controls);

  const summary = document.createElement("div");
  summary.className = "text-md-end";

  const subtotalLabel = document.createElement("p");
  subtotalLabel.className = "mb-0 text-secondary small";
  subtotalLabel.textContent = "Subtotal item";

  const subtotalValue = document.createElement("p");
  subtotalValue.className = "h5 mb-0";
  subtotalValue.textContent = formatPrice(lineTotal);

  summary.append(subtotalLabel, subtotalValue);
  row.append(image, body, summary);
  article.append(row);

  return article;
};

const updateSummary = () => {
  const count = getCartCount();
  const subtotal = getCartSubtotal();
  const shipping = getShippingEstimate(count);
  const total = subtotal + shipping;

  refs.summaryCount.textContent = String(count);
  refs.summarySubtotal.textContent = formatPrice(subtotal);
  refs.summaryShipping.textContent = formatPrice(shipping);
  refs.summaryTotal.textContent = formatPrice(total);
};

const bindCartEvents = () => {
  const removeButtons = refs.cartItems.querySelectorAll(".cart-remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      removeFromCart(id);
      renderCart();
    });
  });

  const qtyInputs = refs.cartItems.querySelectorAll(".cart-qty-input");
  qtyInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const id = Number(input.dataset.id);
      updateCartItemQuantity(id, Number(input.value));
      renderCart();
    });
  });
};

const renderCart = () => {
  const cart = getCart();

  if (!cart.length) {
    refs.cartItems.replaceChildren();
    refs.cartSummaryPanel.classList.add("d-none");
    updateSummary();
    renderStatus(
      "Tu carrito esta vacio. Agrega productos desde el catalogo.",
      "warning",
    );
    return;
  }

  refs.cartSummaryPanel.classList.remove("d-none");
  refs.cartItems.replaceChildren(...cart.map(buildItemElement));
  updateSummary();
  bindCartEvents();
  renderStatus(
    `Tienes ${getCartCount()} producto(s) en el carrito.`,
    "success",
  );
};

const redirectToCatalogWithNotice = (message, type = "success") => {
  const encodedMessage = encodeURIComponent(message);
  window.location.href = `./index.html?noticeMessage=${encodedMessage}&noticeType=${type}`;
};

const attachEvents = () => {
  refs.clearCartButton.addEventListener("click", () => {
    clearCart();
    renderCart();
  });

  if (refs.checkoutButton) {
    refs.checkoutButton.addEventListener("click", () => {
      const cart = getCart();
      if (!cart.length) {
        renderStatus(
          "Tu carrito está vacío. Agrega productos antes de continuar.",
          "warning",
        );
        return;
      }

      reduceStockForItems(cart);
      clearCart();
      redirectToCatalogWithNotice(
        "Compra confirmada desde el carrito. Gracias por tu compra.",
        "success",
      );
    });
  }
};

attachEvents();
renderCart();
