const products = Object.freeze([
  { id: 1, name: "Instant Noodles", price: 18, icon: "IN" },
  { id: 2, name: "Potato Chips", price: 25, icon: "PC" },
  { id: 3, name: "Soft Drink (Can)", price: 25, icon: "SD" },
  { id: 4, name: "Bottled Water", price: 20, icon: "BW" },
  { id: 5, name: "Ballpen (piece)", price: 12, icon: "BP" },
  { id: 6, name: "Notebook (piece)", price: 35, icon: "NB" },
]);

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

function formatCurrency(amount) {
  return pesoFormatter.format(amount).replace("PHP", "₱").trim();
}

function createProductCard(product, index) {
  const article = document.createElement("article");
  article.className = "product-card";

  article.innerHTML = `
    <div class="product-visual" aria-hidden="true">
      <span class="product-icon">${product.icon}</span>
      <span class="product-number">ITEM ${String(index + 1).padStart(2, "0")}</span>
    </div>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">${formatCurrency(product.price)}</p>
    <button
      class="add-button"
      type="button"
      data-product-id="${product.id}"
      title="Ordering will be enabled in Milestone 2"
      disabled
    >
      Add to order
    </button>
  `;

  return article;
}

function renderProducts() {
  const productGrid = document.querySelector("#product-grid");
  const fragment = document.createDocumentFragment();

  products.forEach((product, index) => {
    fragment.appendChild(createProductCard(product, index));
  });

  productGrid.replaceChildren(fragment);
}

document.addEventListener("DOMContentLoaded", renderProducts);
