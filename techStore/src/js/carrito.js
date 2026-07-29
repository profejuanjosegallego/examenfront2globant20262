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

const buildItemMarkup = (item) => {
  const lineTotal = Number(item.precio) * Number(item.quantity);

  return `
        <article class="card cart-item p-3" data-item-id="${item.id}">
            <div class="d-flex flex-column flex-md-row gap-3 align-items-start">
                <img src="${escapeHtml(item.imagen)}" alt="${escapeHtml(item.nombre)}">
                <div class="flex-grow-1">
                    <p class="text-uppercase small text-secondary fw-bold mb-1">${escapeHtml(item.categoria)}</p>
                    <h3 class="h5 mb-1">${escapeHtml(item.nombre)}</h3>
                    <p class="text-secondary mb-2">${escapeHtml(item.marca)}</p>
                    <p class="mb-2">Precio unitario: <strong>${formatPrice(item.precio)}</strong></p>
                    <div class="d-flex flex-wrap align-items-center gap-2">
                        <label class="form-label m-0" for="qty-${item.id}">Cantidad</label>
                        <input id="qty-${item.id}" class="form-control form-control-sm cart-qty-input" type="number" min="1" max="${item.stock}" value="${item.quantity}" data-id="${item.id}" style="width: 90px;">
                        <button type="button" class="btn btn-sm btn-outline-danger cart-remove-button" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
                <div class="text-md-end">
                    <p class="mb-0 text-secondary small">Subtotal item</p>
                    <p class="h5 mb-0">${formatPrice(lineTotal)}</p>
                </div>
            </div>
        </article>
    `;
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
