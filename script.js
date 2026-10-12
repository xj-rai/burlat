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

function getProductSvg(productId) {
  switch (productId) {
    case 1:
      // Instant Noodles: Noodle bowl with steam wisps and chopstick
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 11h16a1 1 0 0 1 1 1c0 5-3.5 8-9 8s-9-3-9-8a1 1 0 0 1 1-1Z" />
        <path d="M8 8c0-2 1.5-2.5 1.5-4" />
        <path d="M12 8c0-2 1.5-2.5 1.5-4" />
        <path d="M16 8c0-2 1.5-2.5 1.5-4" />
        <line x1="3" y1="5" x2="21" y2="8" />
      </svg>`;
    case 2:
      // Potato Chips: Crisp snack bag
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 3h12l-1.5 17a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 3Z" />
        <path d="M6 6h12" />
        <circle cx="12" cy="13" r="3.2" />
        <path d="M10.5 13a1.5 1.5 0 0 0 3 0" />
      </svg>`;
    case 3:
      // Soft Drink: Soda can with pull-ring tab
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="7" y="4" width="10" height="16" rx="3" />
        <ellipse cx="12" cy="4" rx="5" ry="1.5" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="10" y1="2.5" x2="14" y2="2.5" />
        <path d="M10 13a3.5 3.5 0 0 0 4 2" />
      </svg>`;
    case 4:
      // Bottled Water: Water bottle with ridges
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M10 2h4v2h-4z" />
        <path d="M10 4v2.5l-2.5 2.5V19a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9l-2.5-2.5V4" />
        <line x1="7.5" y1="12" x2="16.5" y2="12" />
        <line x1="7.5" y1="15" x2="16.5" y2="15" />
      </svg>`;
    case 5:
      // Ballpen: Streamlined pen
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m18 2 4 4-12 12-5 1 1-5L18 2Z" />
        <path d="m15 5 4 4" />
        <line x1="6" y1="19" x2="8" y2="17" />
      </svg>`;
    case 6:
      // Notebook: Spiral notebook with pages
      return `<svg class="product-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="5" y="3" width="15" height="18" rx="2" />
        <line x1="9" y1="7" x2="16" y2="7" />
        <line x1="9" y1="11" x2="16" y2="11" />
        <line x1="9" y1="15" x2="14" y2="15" />
        <line x1="5" y1="6" x2="7" y2="6" />
        <line x1="5" y1="10" x2="7" y2="10" />
        <line x1="5" y1="14" x2="7" y2="14" />
        <line x1="5" y1="18" x2="7" y2="18" />
      </svg>`;
    default:
      return "";
  }
}

function updateTransactionStatus() {
  if (typeof document === "undefined") return;

  const statusLabel = document.querySelector("#transaction-status");
  const statusDot = document.querySelector(".status-dot");
  if (!statusLabel) return;

  if (completedTransaction) {
    statusLabel.textContent = "Payment completed";
    statusLabel.className = "transaction-label status-completed";
    if (statusDot) {
      statusDot.className = "status-dot dot-completed";
    }
  } else if (cart.size > 0) {
    statusLabel.textContent = "Order in progress";
    statusLabel.className = "transaction-label status-progress";
    if (statusDot) {
      statusDot.className = "status-dot dot-progress";
    }
  } else {
    statusLabel.textContent = "New transaction";
    statusLabel.className = "transaction-label status-new";
    if (statusDot) {
      statusDot.className = "status-dot dot-new";
    }
  }
}

function createProductCard(product, index) {
  const article = document.createElement("article");
  article.className = "product-card";

  article.innerHTML = `
    <div class="product-visual" aria-hidden="true">
      <span class="product-icon" title="${product.name}">
        ${getProductSvg(product.id)}
        <span class="product-code-pill">${product.icon}</span>
      </span>
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
  const paymentDueElement = document.querySelector("#payment-due-value");
  const paymentInput = document.querySelector("#cash-payment");
  const paymentButton = document.querySelector("#confirm-payment");
  const items = getCartItems();
  const itemCount = getItemCount();
  const paymentIsAvailable = items.length > 0 && !completedTransaction;
  const currentTotal = getCartTotal();

  itemCountElement.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  orderTotalElement.textContent = formatCurrency(currentTotal);
  if (paymentDueElement) {
    paymentDueElement.textContent = formatCurrency(currentTotal);
  }
  paymentInput.disabled = !paymentIsAvailable;
  paymentButton.disabled = !paymentIsAvailable;

  updateTransactionStatus();

  if (items.length === 0) {
    paymentInput.value = "";
  }

  if (items.length === 0) {
    cartItemsElement.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </span>
        <h3>Your cart is empty</h3>
        <p>Select items from the catalog to begin an order.</p>
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
  renderProducts();
  renderCart();
  renderReceipt();
}

function startNewTransaction() {
  cart.clear();
  completedTransaction = null;

  document.querySelector("#payment-form").reset();
  renderProducts();
  renderCart();
  renderReceipt();
  clearPaymentFeedback();
}

function handleProductClick(event) {
  const addButton = event.target.closest("[data-product-id]");
  if (!addButton) return;
  const productId = Number(addButton.dataset.productId);
  addToCart(productId);

  // Tactile feedback on the clicked button
  addButton.classList.add("added-feedback");
  const originalText = addButton.textContent.trim();
  addButton.textContent = "Added! ✓";
  setTimeout(() => {
    addButton.classList.remove("added-feedback");
    if (!completedTransaction) {
      addButton.textContent = originalText;
    }
  }, 600);
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
