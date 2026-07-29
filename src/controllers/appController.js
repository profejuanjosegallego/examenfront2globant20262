import { data } from "../../assets/data.js";

const carouselContainer = document.getElementById("carousel-inner-container");

const formatPrice = (amount) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(amount);
};

const getAvailabilityText = (isAvailable) => {
  return isAvailable ? "Available" : "Out of Stock";
};

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const renderCarousel = (products = []) => {
  if (!carouselContainer) return;

  carouselContainer.innerHTML = "";

  const productGroups = chunkArray(products, 3);
  const fragment = document.createDocumentFragment();

  productGroups.forEach((group, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-item");
    if (index === 0) {
      slide.classList.add("active"); 
    }

    const row = document.createElement("div");
    row.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4", "px-5");

    group.forEach((product) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("article");
      card.classList.add("card", "h-100", "shadow-sm", "border-0", "product-carousel-card");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.productName;
      img.classList.add("card-img-top", "product-card-img");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "d-flex", "flex-column");

      const categoryBadge = document.createElement("span");
      categoryBadge.classList.add("badge", "bg-secondary", "w-fit", "mb-2");
      categoryBadge.textContent = product.category;

      const title = document.createElement("h5");
      title.classList.add("card-title", "fw-bold", "fs-6");
      title.textContent = product.productName;

      const brand = document.createElement("p");
      brand.classList.add("card-text", "text-muted", "small", "mb-1");
      brand.textContent = `Brand: ${product.label}`;

      const stock = document.createElement("p");
      stock.classList.add("card-text", "small", "mb-2");
      stock.textContent = `Stock: ${product.stock} units`;

      const availabilityBadge = document.createElement("span");
      availabilityBadge.classList.add(
        "badge",
        product.available ? "bg-success" : "bg-danger",
        "mb-3",
        "align-self-start"
      );
      availabilityBadge.textContent = getAvailabilityText(product.available);

      const price = document.createElement("div");
      price.classList.add("mt-auto", "pt-2", "border-top");
      const priceText = document.createElement("h6");
      priceText.classList.add("fw-bold", "text-primary", "mb-0", "fs-5");
      priceText.textContent = formatPrice(product.price);
      price.appendChild(priceText);

      cardBody.appendChild(categoryBadge);
      cardBody.appendChild(title);
      cardBody.appendChild(brand);
      cardBody.appendChild(stock);
      cardBody.appendChild(availabilityBadge);
      cardBody.appendChild(price);

      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });

    slide.appendChild(row);
    fragment.appendChild(slide);
  });

  carouselContainer.appendChild(fragment);
};

renderCarousel(data);