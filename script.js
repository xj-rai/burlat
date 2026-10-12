const products = Object.freeze([
  { id: 1, name: "Instant Noodles", price: 18, icon: "IN" },
  { id: 2, name: "Potato Chips", price: 25, icon: "PC" },
  { id: 3, name: "Soft Drink (Can)", price: 25, icon: "SD" },
  { id: 4, name: "Bottled Water", price: 20, icon: "BW" },
  { id: 5, name: "Ballpen (piece)", price: 12, icon: "BP" },
  { id: 6, name: "Notebook (piece)", price: 35, icon: "NB" },
]);

const cart = new Map();

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
      aria-label="Add ${product.name} to order"
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

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartItems() {
  return Array.from(cart, ([productId, quantity]) => {
    const product = getProduct(productId);
    return {
      ...product,
      quantity,
      subtotal: product.price * quantity,
    };
  });
}

function getCartTotal() {
  return getCartItems().reduce((total, item) => total + item.subtotal, 0);
}

function getItemCount() {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
}

function addToCart(productId) {
  if (!getProduct(productId)) return;

  cart.set(productId, (cart.get(productId) ?? 0) + 1);
  renderCart();
}

function increaseQuantity(productId) {
  addToCart(productId);
}

function decreaseQuantity(productId) {
  const currentQuantity = cart.get(productId);
  if (!currentQuantity || currentQuantity === 1) return;

  cart.set(productId, currentQuantity - 1);
  renderCart();
}

function removeFromCart(productId) {
  if (!cart.delete(productId)) return;
  renderCart();
}

function createCartItem(item) {
  const article = document.createElement("article");
  article.className = "cart-item";

  article.innerHTML = `
    <div class="cart-item-details">
      <div>
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)} each</p>
      </div>
      <strong>${formatCurrency(item.subtotal)}</strong>
    </div>
    <div class="cart-item-actions">
      <div class="quantity-control" aria-label="Quantity for ${item.name}">
        <button
          type="button"
          data-cart-action="decrease"
          data-product-id="${item.id}"
          aria-label="Decrease ${item.name} quantity"
          ${item.quantity === 1 ? "disabled" : ""}
        >−</button>
        <span aria-label="Quantity ${item.quantity}">${item.quantity}</span>
        <button
          type="button"
          data-cart-action="increase"
          data-product-id="${item.id}"
          aria-label="Increase ${item.name} quantity"
        >+</button>
      </div>
      <button
        class="remove-button"
        type="button"
        data-cart-action="remove"
        data-product-id="${item.id}"
        aria-label="Remove ${item.name} from order"
      >Remove</button>
    </div>
  `;

  return article;
}

function renderCart() {
  if (typeof document === "undefined") return;

  const cartItemsElement = document.querySelector("#cart-items");
  const itemCountElement = document.querySelector("#item-count");
  const orderTotalElement = document.querySelector("#order-total-value");
  const items = getCartItems();
  const itemCount = getItemCount();

  itemCountElement.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  orderTotalElement.textContent = formatCurrency(getCartTotal());

  if (items.length === 0) {
    cartItemsElement.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">+</span>
        <h3>Your cart is empty</h3>
        <p>Add a product to begin a new order.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(createCartItem(item)));
  cartItemsElement.replaceChildren(fragment);
}

function handleProductClick(event) {
  const addButton = event.target.closest("[data-product-id]");
  if (!addButton) return;
  addToCart(Number(addButton.dataset.productId));
}

function handleCartClick(event) {
  const actionButton = event.target.closest("[data-cart-action]");
  if (!actionButton) return;

  const productId = Number(actionButton.dataset.productId);
  const actions = {
    increase: increaseQuantity,
    decrease: decreaseQuantity,
    remove: removeFromCart,
  };

  actions[actionButton.dataset.cartAction]?.(productId);
}

function initializeApp() {
  renderProducts();
  renderCart();
  document.querySelector("#product-grid").addEventListener("click", handleProductClick);
  document.querySelector("#cart-items").addEventListener("click", handleCartClick);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initializeApp);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    products,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartItems,
    getCartTotal,
    getItemCount,
  };
}
