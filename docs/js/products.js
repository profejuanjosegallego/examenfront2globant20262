import { valueOrDefault } from "./helpers.js";

const STOCK_ADJUSTMENTS_STORAGE_KEY = "techstore_stock_adjustments";

const BASE_KEYS = new Set([
  "id",
  "nombre",
  "categoria",
  "marca",
  "precio",
  "stock",
  "proveedor",
  "fechaIngreso",
  "disponible",
  "imagen",
  "name",
  "category",
  "brand",
  "price",
  "image",
]);

const buildExtras = (product) =>
  Object.entries(product)
    .filter(([key]) => !BASE_KEYS.has(key))
    .map(([key, value]) => ({ key, value }));

const normalizeProduct = (product, sourceCategory, index) => {
  const stock = Number(valueOrDefault(product.stock || product.cantidad, 0));
  const disponible =
    typeof product.disponible === "boolean" ? product.disponible : stock > 0;

  return {
    id: Number(valueOrDefault(product.id, index + 1)),
    nombre: valueOrDefault(
      product.nombre || product.name || product.title,
      `Producto ${index + 1}`,
    ),
    categoria: valueOrDefault(
      product.categoria || product.category,
      sourceCategory,
    ),
    marca: valueOrDefault(product.marca || product.brand, "Marca no definida"),
    precio: Number(valueOrDefault(product.precio || product.price, 0)),
    stock,
    proveedor: valueOrDefault(product.proveedor, "Proveedor no definido"),
    fechaIngreso: valueOrDefault(product.fechaIngreso, "Sin fecha"),
    disponible,
    imagen: valueOrDefault(product.imagen || product.image, ""),
    extras: buildExtras(product),
  };
};

const loadStockAdjustments = () => {
  const raw = window.localStorage.getItem(STOCK_ADJUSTMENTS_STORAGE_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const saveStockAdjustments = (adjustments) => {
  window.localStorage.setItem(
    STOCK_ADJUSTMENTS_STORAGE_KEY,
    JSON.stringify(adjustments),
  );
};



const applyStockAdjustments = (products) => {
  const adjustments = loadStockAdjustments();

  return products.map((product) => {
    const used = Number(adjustments[String(product.id)] || 0);
    const adjustedStock = Math.max(0, Number(product.stock) - used);

    return {
      ...product,
      stock: adjustedStock,
      disponible: adjustedStock > 0,
    };
  });
};



const reduceStock = (productId, quantity) => {
  const adjustments = loadStockAdjustments();
  const current = Number(adjustments[String(productId)] || 0);
  adjustments[String(productId)] = current + Number(quantity);
  saveStockAdjustments(adjustments);
};

const reduceStockForItems = (items) => {
  items.forEach((item) => {
    reduceStock(item.id, item.quantity);
  });
};

const DATA_SOURCES = [
  {
    path: new URL(
      "../../assets/data/electronics/accesories.json",
      import.meta.url,
    ),
    category: "Accesorios",
  },
  {
    path: new URL(
      "../../assets/data/electronics/components.json",
      import.meta.url,
    ),
    category: "Componentes",
  },
  {
    path: new URL(
      "../../assets/data/electronics/computers.json",
      import.meta.url,
    ),
    category: "Computadores",
  },
  {
    path: new URL(
      "../../assets/data/electronics/mobilePhones.json",
      import.meta.url,
    ),
    category: "Celulares",
  },
  {
    path: new URL(
      "../../assets/data/electronics/peripherals.json",
      import.meta.url,
    ),
    category: "Periféricos",
  },
  {
    path: new URL(
      "../../assets/data/electronics/storage.json",
      import.meta.url,
    ),
    category: "Almacenamiento",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/fridges.json",
      import.meta.url,
    ),
    category: "Neveras",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/misc.json",
      import.meta.url,
    ),
    category: "Otros Electrodomésticos",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/ovens.json",
      import.meta.url,
    ),
    category: "Hornos",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/roombas.json",
      import.meta.url,
    ),
    category: "Robots de Limpieza",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/vaccumCleaners.json",
      import.meta.url,
    ),
    category: "Aspiradoras",
  },
  {
    path: new URL(
      "../../assets/data/electrodomestics/washerMachines.json",
      import.meta.url,
    ),
    category: "Lavadoras",
  },
];

const readProductsFromSource = async (source) => {
  const url = source.path instanceof URL ? source.path.href : source.path;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo leer ${url}`);
  }

  const body = await response.text();
  const parsedProducts = JSON.parse(body);

  return Array.isArray(parsedProducts)
    ? parsedProducts.map((item, index) =>
        normalizeProduct(item, source.category, index + 1),
      )
    : [];
};

const loadProducts = async () => {
  const products = [];
  const errors = [];

  for (const source of DATA_SOURCES) {
    try {
      const items = await readProductsFromSource(source);
      products.push(...items);
    } catch (error) {
      errors.push({ source: source.path, reason: error.message });
    }
  }

  return { products: applyStockAdjustments(products), errors };
};

const filterProducts = (products, filters) => {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      filters.category === "all" || product.categoria === filters.category;
    const matchesSearch =
      !query ||
      product.nombre.toLowerCase().includes(query) ||
      product.marca.toLowerCase().includes(query) ||
      product.categoria.toLowerCase().includes(query) ||
      product.proveedor.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
};

const getCatalogStats = (products) => {
  const categories = new Set(products.map((product) => product.categoria));
  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;
  const availableCount = products.filter(
    (product) => product.disponible,
  ).length;

  return {
    totalProducts: products.length,
    totalCategories: categories.size,
    lowStockCount,
    availableCount,
  };
};

export {
  filterProducts,
  getCatalogStats,
  loadProducts,
  reduceStock,
  reduceStockForItems,
};
