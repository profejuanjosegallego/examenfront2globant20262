import { data } from "../../assets/data.js";

const root = document.getElementById("root");
const totalCount = document.getElementById("total-count");
const btnShowAll = document.getElementById("btn-show-all");
const btnShowAvailable = document.getElementById("btn-show-available");

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

const renderTable = (productList = []) => {
  if (!root) return;

  if (totalCount) {
    totalCount.textContent = productList.length;
  }

  root.innerHTML = "";

  const fragment = document.createDocumentFragment();

  productList.forEach((product) => {
    const row = document.createElement("tr");

    const cellId = document.createElement("th");
    cellId.scope = "row";
    cellId.classList.add("text-center", "fw-bold");
    cellId.textContent = product.id;

    const cellName = document.createElement("td");
    cellName.classList.add("fw-semibold");
    cellName.textContent = product.productName;


    const cellCategory = document.createElement("td");
    cellCategory.textContent = product.category;
 
    const cellLabel = document.createElement("td");
    cellLabel.textContent = product.label;

    const cellPrice = document.createElement("td");
    cellPrice.classList.add("text-end", "fw-bold", "text-success");
    cellPrice.textContent = formatPrice(product.price);

    const cellStock = document.createElement("td");
    cellStock.classList.add("text-center");
    cellStock.textContent = product.stock;

    const cellAvailability = document.createElement("td");
    cellAvailability.classList.add("text-center");

    const badge = document.createElement("span");
    badge.classList.add("badge", product.available ? "bg-success" : "bg-danger");
    badge.textContent = getAvailabilityText(product.available);

    cellAvailability.appendChild(badge);

    row.appendChild(cellId);
    row.appendChild(cellName);
    row.appendChild(cellCategory);
    row.appendChild(cellLabel);
    row.appendChild(cellPrice);
    row.appendChild(cellStock);
    row.appendChild(cellAvailability);

    fragment.appendChild(row);
  });

  root.appendChild(fragment);
};

if (btnShowAvailable && btnShowAll) {
  
  btnShowAvailable.addEventListener("click", () => {
    const availableProducts = data.filter((product) => product.available === true);
    renderTable(availableProducts);

    btnShowAvailable.classList.add("active");
    btnShowAll.classList.remove("active");
  });

  btnShowAll.addEventListener("click", () => {
    renderTable(data);

    btnShowAll.classList.add("active");
    btnShowAvailable.classList.remove("active");
  });
}
renderTable(data);