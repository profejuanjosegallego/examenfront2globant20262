const formatPrice = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return "$0";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(numeric);
};

const parseJsonData = (rawText) => {
  const trimmed = rawText.trim();

  if (!trimmed) {
    return [];
  }

  const parsed = JSON.parse(trimmed);

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && Array.isArray(parsed.products)) {
    return parsed.products;
  }

  if (parsed && Array.isArray(parsed.items)) {
    return parsed.items;
  }

  return [];
};

const valueOrDefault = (value, fallback) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
};

const escapeHtml = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const initialsFromName = (name) => {
  const chunks = String(name).trim().split(" ").filter(Boolean);
  if (!chunks.length) {
    return "TS";
  }

  const initials = chunks
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return initials;
};

export {
  escapeHtml,
  formatPrice,
  initialsFromName,
  parseJsonData,
  valueOrDefault,
};
