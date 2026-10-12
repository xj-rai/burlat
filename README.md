# Campus Convenience Store POS

A browser-based point-of-sale application for Scenario 5 of the IT 415 practical examination. It uses plain HTML, CSS, and JavaScript with hard-coded product data and no database.

## Completed milestones

### 1. Setup and interface

- Six required convenience-store products and prices
- Product catalog with add buttons
- Order-summary, payment, and receipt areas
- Responsive layout for desktop and smaller screens

### 2. Ordering and calculations

- Add products to the in-memory cart
- Increase and decrease quantities
- Remove cart items
- Automatically update item subtotals, item count, and overall total

### 3. Validation and final improvements

- Validate blank, non-numeric, negative, and insufficient payments
- Calculate change for exact and greater-than-total cash payments
- Confirm payment and lock the completed order
- Generate a digital receipt with item details and a transaction reference
- Start a new transaction by clearing the cart, payment, and receipt

## Run the application

Open `index.html` in a modern browser. No installation, build command, server, or database is required.

## Files

- `index.html` contains the application structure.
- `styles.css` defines the interface and responsive layout.
- `script.js` stores product and transaction data in memory, handles cart and payment actions, calculates totals and change, and renders the receipt.

## Manual test example

1. Add 2 Instant Noodles, 1 Potato Chips, and 1 Notebook.
2. Confirm that the total is `₱96.00`.
3. Enter `100.00` as the cash received.
4. Confirm that the receipt shows `₱4.00` change and a transaction reference.
5. Select **Start new transaction** and confirm that the cart, payment, and receipt are cleared.
