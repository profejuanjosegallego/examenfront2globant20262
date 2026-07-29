const CART_STORAGE_KEY = "techstore_cart";

const safeParse = (raw) => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getCart = () => safeParse(window.localStorage.getItem(CART_STORAGE_KEY));

const saveCart = (items) => {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const getCartCount = () =>
  getCart().reduce((acc, item) => acc + Number(item.quantity || 0), 0);

const getCartSubtotal = () =>
  getCart().reduce(
    (acc, item) => acc + Number(item.precio || 0) * Number(item.quantity || 0),
    0,
  );

const addToCart = (product, quantity) => {
  const qty = Number(quantity);
  const stock = Number(product.stock || 0);
  const cart = getCart();

  if (!Number.isFinite(qty) || qty <= 0 || stock <= 0) {
    return cart;
  }

  const index = cart.findIndex((item) => item.id === product.id);
  const safeQty = Math.min(qty, stock);

  if (index >= 0) {
    cart[index].quantity = Math.min(cart[index].quantity + safeQty, stock);
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      marca: product.marca,
      categoria: product.categoria,
      precio: Number(product.precio),
      imagen: product.imagen,
      stock,
      quantity: safeQty,
    });
  }

  saveCart(cart);
  return cart;
};

const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  return cart;
};

const updateCartItemQuantity = (productId, quantity) => {
  const qty = Number(quantity);
  const cart = getCart();
  const item = cart.find((row) => row.id === productId);

  if (!item) {
    return cart;
  }

  if (!Number.isFinite(qty) || qty <= 0) {
    return removeFromCart(productId);
  }

  item.quantity = Math.min(qty, Number(item.stock || qty));
  saveCart(cart);
  return cart;
};

const clearCart = () => {
  saveCart([]);
};

export {
  CART_STORAGE_KEY,
  addToCart,
  clearCart,
  getCart,
  getCartCount,
  getCartSubtotal,
  removeFromCart,
  saveCart,
  updateCartItemQuantity,
};
