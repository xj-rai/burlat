const products = Object.freeze([
  { id: 1, name: "Instant Noodles", price: 18, icon: "IN" },
  { id: 2, name: "Potato Chips", price: 25, icon: "PC" },
  { id: 3, name: "Soft Drink (Can)", price: 25, icon: "SD" },
  { id: 4, name: "Bottled Water", price: 20, icon: "BW" },
  { id: 5, name: "Ballpen (piece)", price: 12, icon: "BP" },
  { id: 6, name: "Notebook (piece)", price: 35, icon: "NB" },
]);

const cart = new Map();
let completedTransaction = null;

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
      ${completedTransaction ? "disabled" : ""}
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
  if (completedTransaction || !getProduct(productId)) return;

  cart.set(productId, (cart.get(productId) ?? 0) + 1);
  clearPaymentFeedback();
  renderCart();
}

function increaseQuantity(productId) {
  addToCart(productId);
}

function decreaseQuantity(productId) {
  const currentQuantity = cart.get(productId);
  if (completedTransaction || !currentQuantity || currentQuantity === 1) return;

  cart.set(productId, currentQuantity - 1);
  clearPaymentFeedback();
  renderCart();
}

function removeFromCart(productId) {
  if (completedTransaction || !cart.delete(productId)) return;
  clearPaymentFeedback();
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
          ${item.quantity === 1 || completedTransaction ? "disabled" : ""}
        >−</button>
        <span aria-label="Quantity ${item.quantity}">${item.quantity}</span>
        <button
          type="button"
          data-cart-action="increase"
          data-product-id="${item.id}"
          aria-label="Increase ${item.name} quantity"
          ${completedTransaction ? "disabled" : ""}
        >+</button>
      </div>
      <button
        class="remove-button"
        type="button"
        data-cart-action="remove"
        data-product-id="${item.id}"
        aria-label="Remove ${item.name} from order"
        ${completedTransaction ? "disabled" : ""}
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
  const paymentInput = document.querySelector("#cash-payment");
  const paymentButton = document.querySelector("#confirm-payment");
  const items = getCartItems();
  const itemCount = getItemCount();
  const paymentIsAvailable = items.length > 0 && !completedTransaction;

  itemCountElement.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  orderTotalElement.textContent = formatCurrency(getCartTotal());
  paymentInput.disabled = !paymentIsAvailable;
  paymentButton.disabled = !paymentIsAvailable;

  if (items.length === 0) {
    paymentInput.value = "";
  }

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

function validatePayment(rawValue, total) {
  const normalizedValue = String(rawValue).trim();
  const amount = Number(normalizedValue);

  if (normalizedValue === "" || !Number.isFinite(amount) || amount < 0) {
    return {
      valid: false,
      type: "invalid",
      message: "Please enter a valid payment amount.",
    };
  }

  if (total <= 0) {
    return {
      valid: false,
      type: "empty",
      message: "Add at least one item before confirming payment.",
    };
  }

  if (amount < total) {
    return {
      valid: false,
      type: "insufficient",
      message: `Insufficient payment. Please enter at least ${formatCurrency(total)}.`,
    };
  }

  return {
    valid: true,
    amount,
    change: Math.round((amount - total) * 100) / 100,
  };
}

function generateTransactionReference(date = new Date()) {
  const pad = (value, length = 2) => String(value).padStart(length, "0");
  const datePart = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const timePart = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `TXN-${datePart}-${timePart}-${pad(date.getMilliseconds(), 3)}`;
}

function showPaymentFeedback(message, type = "") {
  if (typeof document === "undefined") return;

  const messageElement = document.querySelector("#payment-message");
  const inputElement = document.querySelector("#cash-payment");
  messageElement.textContent = message;
  messageElement.className = `payment-message ${type}`.trim();
  inputElement.setAttribute("aria-invalid", type === "error" ? "true" : "false");
}

function clearPaymentFeedback() {
  if (typeof document === "undefined") return;

  const message = cart.size === 0
    ? "Add an item to begin payment."
    : "Enter the cash received, then confirm payment.";
  showPaymentFeedback(message);
}

function renderReceipt() {
  if (typeof document === "undefined") return;

  const receiptContent = document.querySelector("#receipt-content");
  const newTransactionButton = document.querySelector("#new-transaction");

  if (!completedTransaction) {
    receiptContent.innerHTML = `
      <p class="receipt-placeholder">
        A receipt will appear here after a successful payment.
      </p>
    `;
    newTransactionButton.classList.add("hidden");
    return;
  }

  const receiptLines = completedTransaction.items
    .map((item) => `
      <div class="receipt-line">
        <span>${item.quantity} × ${item.name}</span>
        <strong>${formatCurrency(item.subtotal)}</strong>
      </div>
    `)
    .join("");

  receiptContent.innerHTML = `
    <div class="receipt-meta">
      <span>Reference</span>
      <strong>${completedTransaction.reference}</strong>
    </div>
    <div class="receipt-lines">${receiptLines}</div>
    <dl class="receipt-totals">
      <div><dt>Total</dt><dd>${formatCurrency(completedTransaction.total)}</dd></div>
      <div><dt>Amount paid</dt><dd>${formatCurrency(completedTransaction.amountPaid)}</dd></div>
      <div class="change-row"><dt>Change</dt><dd>${formatCurrency(completedTransaction.change)}</dd></div>
    </dl>
  `;
  newTransactionButton.classList.remove("hidden");
}

function handlePaymentSubmit(event) {
  event.preventDefault();
  if (completedTransaction) return;

  const paymentInput = document.querySelector("#cash-payment");
  const result = validatePayment(paymentInput.value, getCartTotal());

  if (!result.valid) {
    showPaymentFeedback(result.message, "error");
    paymentInput.focus();
    return;
  }

  completedTransaction = {
    reference: generateTransactionReference(),
    items: getCartItems().map((item) => ({ ...item })),
    total: getCartTotal(),
    amountPaid: result.amount,
    change: result.change,
  };

  showPaymentFeedback(
    `Payment successful. Change: ${formatCurrency(result.change)}.`,
    "success",
  );
  document.querySelector("#transaction-status").textContent = "Payment complete";
  renderProducts();
  renderCart();
  renderReceipt();
}

function startNewTransaction() {
  cart.clear();
  completedTransaction = null;

  document.querySelector("#payment-form").reset();
  document.querySelector("#transaction-status").textContent = "New transaction";
  renderProducts();
  renderCart();
  renderReceipt();
  clearPaymentFeedback();
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
  renderReceipt();
  document.querySelector("#product-grid").addEventListener("click", handleProductClick);
  document.querySelector("#cart-items").addEventListener("click", handleCartClick);
  document.querySelector("#payment-form").addEventListener("submit", handlePaymentSubmit);
  document.querySelector("#new-transaction").addEventListener("click", startNewTransaction);
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
    validatePayment,
    generateTransactionReference,
  };
}
