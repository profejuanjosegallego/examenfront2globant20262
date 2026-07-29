import { UI_TEXT } from "./constants.js";
import { escapeHtml, formatPrice, initialsFromName } from "./helpers.js";
import { getCartCount } from "./cart-utils.js";
import { filterProducts, getCatalogStats, loadProducts } from "./products.js";

const state = {
  allProducts: [],
  filteredProducts: [],
  hoveredProduct: null,
  hoveredCard: null,
  lastPointer: {
    x: null,
    y: null,
  },
  filters: {
    category: "all",
    query: "",
  },
};

const refs = {
  categoryFilter: document.querySelector("#categoryFilter"),
  searchInput: document.querySelector("#searchInput"),
  productsGrid: document.querySelector("#productsGrid"),
  statusMessage: document.querySelector("#statusMessage"),
  catalogStats: document.querySelector("#catalogStats"),
  productsCounter: document.querySelector("#productsCounter"),
  cartCountBadge: document.querySelector("#cartCountBadge"),
  hoverCard: null,
};

const CART_NOTICE_STORAGE_KEY = "techstore_last_cart_notice";

const updateCartBadge = () => {
  if (!refs.cartCountBadge) {
    return;
  }

  refs.cartCountBadge.textContent = String(getCartCount());
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

const setStatus = (message, type = "") => {
  refs.statusMessage.textContent = message;
  refs.statusMessage.className = "status-message";

  if (type) {
    refs.statusMessage.classList.add(type);
  }
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const createStatChip = (label, value) => {
  const chip = document.createElement("span");
  chip.className = "stat-chip";
  chip.textContent = `${label}: `;

  const strong = document.createElement("strong");
  strong.textContent = String(value);
  chip.append(strong);

  return chip;
};

const createSelectOption = (value, label) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
};

const getNoticeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const message = params.get("noticeMessage");
  const type = params.get("noticeType");

  if (!message) {
    return null;
  }

  return {
    message: decodeURIComponent(message),
    type: type || "info",
  };
};

const getCartNotice = () => {
  const urlNotice = getNoticeFromUrl();
  if (urlNotice) {
    return urlNotice;
  }

  const raw = window.localStorage.getItem(CART_NOTICE_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const clearCartNotice = () => {
  window.localStorage.removeItem(CART_NOTICE_STORAGE_KEY);

  const params = new URLSearchParams(window.location.search);
  params.delete("noticeMessage");
  params.delete("noticeType");

  const newSearch = params.toString();
  history.replaceState(
    null,
    "",
    `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}`,
  );
};

const getNoticeClass = (type) => {
  if (type === "success") {
    return "is-success";
  }

  if (type === "warning") {
    return "is-warning";
  }

  return "is-info";
};

const showCartNoticeIfPresent = () => {
  const notice = getCartNotice();
  if (!notice || !notice.message) {
    return;
  }

  setStatus(notice.message, getNoticeClass(notice.type));
  clearCartNotice();
};

const renderStats = (products) => {
  const stats = getCatalogStats(products);
  clearElement(refs.catalogStats);
  refs.catalogStats.append(
    createStatChip("Productos", stats.totalProducts),
    createStatChip("Categorias", stats.totalCategories),
    createStatChip("Disponibles", stats.availableCount),
  );
};

const renderCategoryOptions = (products) => {
  const categories = [...new Set(products.map((item) => item.categoria))].sort(
    (a, b) => a.localeCompare(b),
  );

  clearElement(refs.categoryFilter);
  refs.categoryFilter.append(createSelectOption("all", "Todas las categorias"));

  categories.forEach((category) => {
    refs.categoryFilter.append(
      createSelectOption(category, category),
    );
  });
};

const formatExtraLabel = (key) => EXTRA_LABELS[key] || key;

const boolToText = (value) => (value ? "Si" : "No");

const ensureHoverCard = () => {
  if (refs.hoverCard) {
    return;
  }

  const card = document.createElement("aside");
  card.className = "product-detail-flyout hidden";
  card.setAttribute("aria-hidden", "true");
  document.body.append(card);
  refs.hoverCard = card;
};

const buildHoverCardContent = (product) => {
  const fragment = document.createDocumentFragment();

  const title = document.createElement("h4");
  title.textContent = "Detalles";
  fragment.append(title);

  const productTitle = document.createElement("p");
  productTitle.className = "detail-title";
  productTitle.textContent = product.nombre;
  fragment.append(productTitle);

  const detailList = document.createElement("ul");
  detailList.className = "detail-list";

  const addDetailItem = (label, value) => {
    const item = document.createElement("li");
    const labelNode = document.createElement("span");
    labelNode.textContent = `${label}:`;
    item.append(labelNode, document.createTextNode(` ${value}`));
    return item;
  };

  detailList.append(
    addDetailItem("Marca", product.marca),
    addDetailItem("Disponibilidad", product.disponible ? "Disponible" : "No disponible"),
    addDetailItem("Stock", product.stock),
    addDetailItem("Precio", formatPrice(product.precio)),
    addDetailItem("Proveedor", product.proveedor),
    addDetailItem("Fecha ingreso", product.fechaIngreso),
    addDetailItem("Categoria", product.categoria),
  );

  const extrasList = document.createElement("ul");
  extrasList.className = "detail-list detail-list--extras";

  if (product.extras.length) {
    product.extras.forEach((extra) => {
      const value = typeof extra.value === "boolean" ? boolToText(extra.value) : String(extra.value);
      const item = document.createElement("li");
      const labelNode = document.createElement("span");
      labelNode.textContent = `${formatExtraLabel(extra.key)}:`;
      item.append(labelNode, document.createTextNode(` ${value}`));
      extrasList.append(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "Sin atributos extra.";
    extrasList.append(item);
  }

  fragment.append(detailList, extrasList);
  return fragment;
};

const positionHoverCard = (targetCard) => {
  const margin = 14;
  const rect = targetCard.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = rect.width;
  const cardHeight = rect.height;

  const spaceRight = viewportWidth - rect.right;
  const spaceLeft = rect.left;

  let left;
  let side;
  if (spaceRight >= cardWidth + margin) {
    left = rect.right + margin;
    side = "right";
  } else if (spaceLeft >= cardWidth + margin) {
    left = rect.left - cardWidth - margin;
    side = "left";
  } else {
    const useRight = spaceRight >= spaceLeft;
    left = useRight ? viewportWidth - cardWidth - margin : margin;
    side = useRight ? "right" : "left";
  }

  const top = Math.max(
    margin,
    Math.min(rect.top, viewportHeight - cardHeight - margin),
  );

  refs.hoverCard.style.width = `${Math.round(cardWidth)}px`;
  refs.hoverCard.style.height = `${Math.round(cardHeight)}px`;
  refs.hoverCard.style.minWidth = `${Math.round(cardWidth)}px`;
  refs.hoverCard.style.maxWidth = `${Math.round(cardWidth)}px`;
  refs.hoverCard.style.minHeight = `${Math.round(cardHeight)}px`;
  refs.hoverCard.style.maxHeight = `${Math.round(cardHeight)}px`;
  refs.hoverCard.style.left = `${Math.round(left)}px`;
  refs.hoverCard.style.top = `${Math.round(top)}px`;

  return side;
};
const showHoverCard = (targetCard, product) => {
  if (!product) {
    return;
  }

  ensureHoverCard();
  state.hoveredProduct = product;
  state.hoveredCard = targetCard;
  clearElement(refs.hoverCard);
  refs.hoverCard.append(buildHoverCardContent(product));
  const side = positionHoverCard(targetCard);
  refs.hoverCard.classList.remove("side-left", "side-right", "is-active");
  refs.hoverCard.classList.add(side === "left" ? "side-left" : "side-right");
  refs.hoverCard.classList.remove("hidden");
  refs.hoverCard.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(() => {
    refs.hoverCard.classList.add("is-active");
  });
};

const refreshHoverCardPosition = () => {
  if (!refs.hoverCard || !state.hoveredCard || !state.hoveredProduct) {
    return;
  }

  const side = positionHoverCard(state.hoveredCard);
  refs.hoverCard.classList.remove("side-left", "side-right");
  refs.hoverCard.classList.add(side === "left" ? "side-left" : "side-right");
};

const hideHoverCard = () => {
  if (!refs.hoverCard) {
    return;
  }

  refs.hoverCard.classList.add("hidden");
  refs.hoverCard.classList.remove("is-active", "side-left", "side-right");
  refs.hoverCard.setAttribute("aria-hidden", "true");
  state.hoveredProduct = null;
  state.hoveredCard = null;
};

const getHoverTargetFromPoint = (x, y) => {
  const element = document.elementFromPoint(x, y);
  if (!element) {
    return null;
  }

  return element.closest(".product-card");
};

const syncHoverCardToPointer = () => {
  const { x, y } = state.lastPointer;
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return;
  }

  const hoveredElement = document.elementFromPoint(x, y);
  if (hoveredElement?.closest(".main-nav")) {
    hideHoverCard();
    return;
  }

  const targetCard = getHoverTargetFromPoint(x, y);
  if (!targetCard) {
    hideHoverCard();
    return;
  }

  const id = Number(targetCard.dataset.productId);
  const product = state.filteredProducts.find((item) => item.id === id);
  if (!product) {
    hideHoverCard();
    return;
  }

  if (
    state.hoveredCard === targetCard &&
    state.hoveredProduct?.id === product.id
  ) {
    refreshHoverCardPosition();
    return;
  }

  showHoverCard(targetCard, product);
};

const goToPurchaseView = (productId) => {
  window.location.href = `./compra.html?id=${encodeURIComponent(productId)}`;
};

const bindHoverEvents = () => {
  const cards = refs.productsGrid.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const id = Number(card.dataset.productId);
    const product = state.filteredProducts.find((item) => item.id === id);

    card.addEventListener("focusin", () => {
      showHoverCard(card, product);
    });

    card.addEventListener("focusout", () => {
      hideHoverCard();
    });

    card.addEventListener("click", () => {
      goToPurchaseView(id);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToPurchaseView(id);
      }
    });
  });
};

const buildCardElement = (product) => {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.productId = String(product.id);
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `Comprar ${product.nombre}`);

  const media = document.createElement("div");
  media.className = "product-card__media";
  media.setAttribute("role", "img");
  media.setAttribute("aria-label", `Imagen de ${product.nombre}`);

  if (product.imagen) {
    const img = document.createElement("img");
    img.className = "product-card__image";
    img.src = product.imagen;
    img.alt = product.nombre;
    media.append(img);
  } else {
    media.textContent = initialsFromName(product.nombre);
  }

  const body = document.createElement("div");
  body.className = "product-card__body";

  const category = document.createElement("span");
  category.className = "product-card__category";
  category.textContent = product.categoria;

  const title = document.createElement("h3");
  title.textContent = product.nombre;

  const brand = document.createElement("p");
  brand.className = "product-card__brand";
  brand.textContent = product.marca;

  const availability = document.createElement("p");
  availability.className = "product-card__availability";
  availability.textContent = product.disponible ? "Disponible" : "No disponible";

  const footer = document.createElement("div");
  footer.className = "product-card__footer";

  const price = document.createElement("strong");
  price.className = "product-card__price";
  price.textContent = formatPrice(product.precio);

  const stockBadge = document.createElement("span");
  stockBadge.className = product.stock <= 5 ? "stock-badge is-low" : "stock-badge";
  stockBadge.textContent = product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock";

  footer.append(price, stockBadge);
  body.append(category, title, brand, availability, footer);
  article.append(media, body);

  return article;
};

const renderProducts = (products) => {
  refs.productsCounter.textContent = `Productos cargados: ${state.allProducts.length}`;

  if (!products.length) {
    refs.productsGrid.replaceChildren();
    setStatus(UI_TEXT.noResults, "is-warning");
    return;
  }

  refs.productsGrid.replaceChildren(...products.map(buildCardElement));
  bindHoverEvents();
  setStatus(`Mostrando ${products.length} producto(s).`);
};

const applyFiltersAndRender = () => {
  state.filteredProducts = filterProducts(state.allProducts, state.filters);
  renderProducts(state.filteredProducts);
};

const attachEvents = () => {
  refs.categoryFilter.addEventListener("change", (event) => {
    state.filters.category = event.target.value;
    applyFiltersAndRender();
  });

  refs.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value;
    applyFiltersAndRender();
  });

  document.addEventListener("pointermove", (event) => {
    state.lastPointer.x = event.clientX;
    state.lastPointer.y = event.clientY;
    syncHoverCardToPointer();
  });

  window.addEventListener("scroll", () => {
    syncHoverCardToPointer();
  });

  window.addEventListener("resize", () => {
    syncHoverCardToPointer();
  });
};

const init = async () => {
  setStatus(UI_TEXT.loading);

  try {
    const { products, errors } = await loadProducts();

    state.allProducts = products;

    if (!products.length) {
      refs.productsGrid.replaceChildren();
      renderStats(products);
      renderCategoryOptions(products);
      setStatus(UI_TEXT.emptyData, "is-warning");
      if (errors.length) {
        console.warn("Archivos con error al cargar:", errors);
      }
      return;
    }

    renderStats(products);
    renderCategoryOptions(products);
    attachEvents();
    updateCartBadge();
    applyFiltersAndRender();
    showCartNoticeIfPresent();

    if (errors.length) {
      console.warn("Archivos con error al cargar:", errors);
    }
  } catch (error) {
    refs.productsGrid.replaceChildren();
    setStatus(UI_TEXT.error, "is-warning");
    console.error(error);
  }
};

init();
