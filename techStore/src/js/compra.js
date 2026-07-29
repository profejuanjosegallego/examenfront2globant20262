import { formatPrice, escapeHtml } from "./helpers.js";
import { loadProducts, reduceStock } from "./products.js";
import { addToCart, getCartCount } from "./cart-utils.js";

const STORAGE_DRAFT_KEY = "techstore_purchase_draft";
const STORAGE_ORDERS_KEY = "techstore_purchase_orders";
const STORAGE_CART_NOTICE_KEY = "techstore_last_cart_notice";

const SHIPPING_COST = {
  estandar: 12000,
  express: 25000,
  retiro: 0,
};

const refs = {
  purchaseStatus: document.querySelector("#purchaseStatus"),
  purchaseProductCard: document.querySelector("#purchaseProductCard"),
  purchaseForm: document.querySelector("#purchaseForm"),
  buyerName: document.querySelector("#buyerName"),
  buyerEmail: document.querySelector("#buyerEmail"),
  buyerPhone: document.querySelector("#buyerPhone"),
  buyerAddress: document.querySelector("#buyerAddress"),
  buyerCity: document.querySelector("#buyerCity"),
  quantity: document.querySelector("#quantity"),
  paymentMethod: document.querySelector("#paymentMethod"),
  shippingMethod: document.querySelector("#shippingMethod"),
  stockHelp: document.querySelector("#stockHelp"),
  purchaseSubtotal: document.querySelector("#purchaseSubtotal"),
  purchaseShipping: document.querySelector("#purchaseShipping"),
  purchaseTotal: document.querySelector("#purchaseTotal"),
  saveDraftButton: document.querySelector("#saveDraftButton"),
  addToCartButton: document.querySelector("#addToCartButton"),
  cartCountBadge: document.querySelector("#cartCountBadge"),
};

const EXTRA_LABELS = {
  procesador: "Procesador",
  ramGB: "RAM (GB)",
  pantalla: "Pantalla",
  bateriaMah: "Bateria (mAh)",
  conexion: "Conexion",
  usoRecomendado: "Uso recomendado",
  compatibilidad: "Compatibilidad",
  material: "Material",
  socket: "Socket",
  consumoW: "Consumo (W)",
  tipoUnidad: "Tipo de unidad",
  velocidadLecturaMBs: "Velocidad lectura (MB/s)",
  capacidadLitros: "Capacidad (L)",
  eficienciaEnergetica: "Eficiencia energetica",
  tipoHorno: "Tipo de horno",
  autonomiaMin: "Autonomia (min)",
  mapeoInteligente: "Mapeo inteligente",
  tipoAspiradora: "Tipo de aspiradora",
  filtroHEPA: "Filtro HEPA",
  cargaKg: "Carga (Kg)",
  tipoCarga: "Tipo de carga",
  potenciaW: "Potencia (W)",
  voltaje: "Voltaje (V)",
};

let selectedProduct = null;

const updateCartBadge = () => {
  if (!refs.cartCountBadge) {
    return;
  }

  refs.cartCountBadge.textContent = String(getCartCount());
};

const getProductIdFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const rawId = params.get("id");
  const id = Number(rawId);

  if (!rawId || Number.isNaN(id) || !Number.isFinite(id) || id <= 0) {
    return null;
  }

  return id;
};

const renderStatus = (message, type = "info") => {
  refs.purchaseStatus.className = `alert alert-${type}`;
  refs.purchaseStatus.textContent = message;
};

const formatExtraLabel = (key) => EXTRA_LABELS[key] || key;

const createMetaItem = (label, value) => {
  const item = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = `${label}:`;
  item.append(span, document.createTextNode(` ${value}`));
  return item;
};

const renderProductCard = (product) => {
  const createExtraItem = (extra) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${formatExtraLabel(extra.key)}:`;
    item.append(label, document.createTextNode(` ${String(extra.value)}`));
    return item;
  };

  const card = document.createElement("div");
  card.className = "card-body";

  const img = document.createElement("img");
  img.src = product.imagen;
  img.alt = product.nombre;
  img.className = "card-img-top";

  const category = document.createElement("p");
  category.className = "text-uppercase small fw-bold text-secondary mb-1";
  category.textContent = product.categoria;

  const title = document.createElement("h2");
  title.className = "h4 mb-1";
  title.textContent = product.nombre;

  const brand = document.createElement("p");
  brand.className = "text-secondary mb-3";
  brand.textContent = product.marca;

  const metaList = document.createElement("ul");
  metaList.className = "product-meta";
  metaList.append(
    createMetaItem("Precio unitario", formatPrice(product.precio)),
    createMetaItem("Stock disponible", product.stock),
    createMetaItem("Proveedor", product.proveedor),
    createMetaItem("Ingreso", product.fechaIngreso),
    createMetaItem("Disponible", product.disponible ? "Si" : "No"),
  );

  const extrasList = document.createElement("ul");
  extrasList.className = "product-extras";

  if (product.extras.length) {
    product.extras.forEach((extra) => {
      extrasList.append(createExtraItem(extra));
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "Sin atributos extra.";
    extrasList.append(item);
  }

  refs.purchaseProductCard.replaceChildren(img, card);
  card.append(category, title, brand, metaList, extrasList);
};

const getSafeQuantity = () => {
  if (!selectedProduct) {
    return 1;
  }

  let qty = Number(refs.quantity.value);
  if (!Number.isFinite(qty) || qty < 1) {
    qty = 1;
  }

  if (selectedProduct.stock <= 0) {
    return 0;
  }

  if (qty > selectedProduct.stock) {
    qty = selectedProduct.stock;
    refs.quantity.value = String(qty);
  }

  return qty;
};

const getCurrentTotals = () => {
  if (!selectedProduct) {
    return { subtotal: 0, shipping: 0, total: 0 };
  }

  const qty = getSafeQuantity();
  const subtotal = selectedProduct.precio * qty;
  const shipping =
    SHIPPING_COST[refs.shippingMethod.value] ?? SHIPPING_COST.estandar;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};

const updateTotal = () => {
  const totals = getCurrentTotals();
  refs.purchaseSubtotal.textContent = formatPrice(totals.subtotal);
  refs.purchaseShipping.textContent = formatPrice(totals.shipping);
  refs.purchaseTotal.textContent = formatPrice(totals.total);
};

const updateActionButtons = () => {
  const hasStock = selectedProduct && selectedProduct.stock > 0;

  refs.addToCartButton.disabled = !hasStock;
  refs.saveDraftButton.disabled = !selectedProduct;
  refs.paymentMethod.disabled = !hasStock;
  refs.shippingMethod.disabled = !hasStock;
  refs.quantity.disabled = !hasStock;
};

const setQuantityBoundaries = (stock) => {
  refs.quantity.max = String(stock);
  refs.quantity.min = "1";
  refs.stockHelp.textContent = `Puedes comprar entre 1 y ${stock} unidad(es).`;

  if (Number(refs.quantity.value) > stock) {
    refs.quantity.value = String(stock);
  }

  updateActionButtons();
};

const readDraft = () => {
  const raw = window.localStorage.getItem(STORAGE_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const createDraftPayload = () => ({
  productId: selectedProduct?.id ?? null,
  buyerName: refs.buyerName.value.trim(),
  buyerEmail: refs.buyerEmail.value.trim(),
  buyerPhone: refs.buyerPhone.value.trim(),
  buyerAddress: refs.buyerAddress.value.trim(),
  buyerCity: refs.buyerCity.value.trim(),
  quantity: Number(refs.quantity.value) || 1,
  paymentMethod: refs.paymentMethod.value,
  shippingMethod: refs.shippingMethod.value,
});

const persistDraft = (silent = true) => {
  if (!selectedProduct) {
    return;
  }

  const payload = createDraftPayload();
  window.localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(payload));

  if (!silent) {
    renderStatus("Borrador de compra guardado.", "secondary");
  }
};

const restoreDraft = () => {
  const draft = readDraft();

  if (!draft || draft.productId !== selectedProduct?.id) {
    return;
  }

  refs.buyerName.value = draft.buyerName ?? "";
  refs.buyerEmail.value = draft.buyerEmail ?? "";
  refs.buyerPhone.value = draft.buyerPhone ?? "";
  refs.buyerAddress.value = draft.buyerAddress ?? "";
  refs.buyerCity.value = draft.buyerCity ?? "";
  refs.quantity.value = String(draft.quantity ?? 1);
  refs.paymentMethod.value = draft.paymentMethod ?? "";
  refs.shippingMethod.value = draft.shippingMethod ?? "estandar";

  renderStatus(`Borrador restaurado para ${selectedProduct.nombre}.`, "info");
};

const clearDraft = () => {
  window.localStorage.removeItem(STORAGE_DRAFT_KEY);
};

const isPurchaseFormValid = () => {
  const form = refs.purchaseForm;

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
};

const saveOrderHistory = () => {
  const totals = getCurrentTotals();
  const payload = createDraftPayload();
  const order = {
    ...payload,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    createdAt: new Date().toISOString(),
  };

  const current = window.localStorage.getItem(STORAGE_ORDERS_KEY);
  const parsed = current ? JSON.parse(current) : [];
  parsed.push(order);
  window.localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(parsed));
};

const redirectToCatalogWithNotice = (message, type = "success") => {
  const encodedMessage = encodeURIComponent(message);
  window.location.href = `./index.html?noticeMessage=${encodedMessage}&noticeType=${type}`;
};

const onSubmitPurchase = (event) => {
  event.preventDefault();

  if (!selectedProduct) {
    renderStatus("No hay producto seleccionado para comprar.", "danger");
    return;
  }

  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const qty = Number(refs.quantity.value);
  if (qty < 1 || qty > selectedProduct.stock) {
    renderStatus(
      `Cantidad invalida. Debe estar entre 1 y ${selectedProduct.stock}.`,
      "warning",
    );
    return;
  }

  saveOrderHistory();
  reduceStock(selectedProduct.id, qty);
  clearDraft();
  updateCartBadge();
  redirectToCatalogWithNotice(
    `Compra confirmada: ${qty} unidad(es) de ${selectedProduct.nombre}.`,
    "success",
  );
};

const storeCartNotice = (message, type = "success") => {
  window.localStorage.setItem(
    STORAGE_CART_NOTICE_KEY,
    JSON.stringify({
      message,
      type,
      createdAt: new Date().toISOString(),
    }),
  );
};

const onAddToCart = () => {
  if (!selectedProduct) {
    renderStatus("No hay producto para agregar al carrito.", "warning");
    return;
  }

  if (selectedProduct.stock <= 0) {
    renderStatus("Este producto ya no tiene stock disponible.", "warning");
    return;
  }

  if (!isPurchaseFormValid()) {
    renderStatus(
      "Debes completar el formulario antes de agregar al carrito.",
      "warning",
    );
    return;
  }

  const qty = getSafeQuantity();
  if (qty <= 0) {
    renderStatus(
      "Cantidad invalida. Ajusta la cantidad antes de agregar al carrito.",
      "warning",
    );
    return;
  }

  addToCart(selectedProduct, qty);
  updateCartBadge();

  const noticeMessage = `Se agregaron ${qty} unidad(es) de ${selectedProduct.nombre} al carrito.`;
  storeCartNotice(noticeMessage, "success");
  const encodedMessage = encodeURIComponent(noticeMessage);
  window.location.href = `./index.html?noticeMessage=${encodedMessage}&noticeType=success`;
};

const attachEvents = () => {
  refs.quantity.addEventListener("input", () => {
    updateTotal();
    persistDraft();
  });

  refs.shippingMethod.addEventListener("change", () => {
    updateTotal();
    persistDraft();
  });

  refs.purchaseForm.addEventListener("input", () => {
    persistDraft();
  });

  refs.saveDraftButton.addEventListener("click", () => {
    persistDraft(false);
  });

  refs.addToCartButton.addEventListener("click", onAddToCart);

  refs.purchaseForm.addEventListener("submit", onSubmitPurchase);
};

const initPurchaseView = async () => {
  try {
    const id = getProductIdFromQuery();
    const { products } = await loadProducts();

    if (!id) {
      renderStatus(
        "No se recibió un producto válido. Volviendo al catálogo...",
        "warning",
      );
      refs.purchaseForm.classList.add("d-none");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1500);
      return;
    }

    selectedProduct = products.find((item) => item.id === id) || null;

    if (!selectedProduct) {
      renderStatus(
        "El producto seleccionado no existe o no esta disponible en el catalogo.",
        "danger",
      );
      refs.purchaseForm.classList.add("d-none");
      return;
    }

    renderProductCard(selectedProduct);
    setQuantityBoundaries(selectedProduct.stock);
    restoreDraft();
    updateTotal();
    updateActionButtons();
    updateCartBadge();
    renderStatus(
      `Producto listo para compra: ${selectedProduct.nombre}.`,
      "success",
    );
  } catch (error) {
    renderStatus("No fue posible cargar la vista de compra.", "danger");
    console.error(error);
  }
};

attachEvents();
initPurchaseView();
