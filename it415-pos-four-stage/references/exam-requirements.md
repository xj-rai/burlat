# IT 415 POS Exam Requirements

This reference summarizes the supplied six-page practical-exam PDF. When a detail is disputed, consult the original PDF.

## Fixed scenario and priorities

- Build Scenario 5, Campus Convenience Store POS, for desktop/laptop use with mouse and keyboard.
- The work is individual and must be explainable by the student.
- Keep the work achievable within the 150-minute examination.
- Favor a simple, functional, readable, testable application over unrequired complexity.
- Use the six specified products and prices in Philippine pesos.
- Hard-code the products and prices and keep transaction data in memory or simple local structures.
- Authentication, inventory management, real payment gateways, QR/card payment, deployment, and other advanced features are not required.
- Use only a language, framework, or development tool covered in class. The text `[TOOLS COVERED IN CLASS]` is an unresolved placeholder, not a technology choice.
- Preserve working features when modifying the code.

## Required product data

Use these exact six sample products and prices:

| Product | Price |
|---|---:|
| Instant Noodles | PHP 18.00 |
| Potato Chips | PHP 25.00 |
| Soft Drink (Can) | PHP 25.00 |
| Bottled Water | PHP 20.00 |
| Ballpen (piece) | PHP 12.00 |
| Notebook (piece) | PHP 35.00 |

## Required transaction flow

1. Browse products.
2. Add one or more products to the cart and adjust quantities.
3. Review an order summary with items, quantities, subtotals, and total.
4. Enter cash in a numeric input field.
5. Validate the amount and compute change.
6. Confirm a successful payment with transaction details.
7. Show a digital receipt and allow a new transaction.

## Required feature checklist

- [ ] Display at least five products with names and prices.
- [ ] Add products through on-screen buttons.
- [ ] Increase and decrease cart quantities.
- [ ] Remove a product from the cart.
- [ ] Recompute item subtotals and the overall total whenever the cart changes.
- [ ] Show a clear order summary.
- [ ] Accept cash through a numeric input.
- [ ] Reject blank, non-numeric, negative, and insufficient payments with clear on-screen messages.
- [ ] Compute `change = amount paid - total amount` for valid sufficient payment.
- [ ] Show a clear successful-payment confirmation.
- [ ] Generate a digital receipt with items, quantities, subtotals, total, amount paid, change, and a transaction reference.
- [ ] Start a new transaction by clearing the cart, payment amount, and receipt.

Suggested validation wording from the exam:

- `Please enter a valid payment amount.` for blank, non-numeric, or negative input.
- `Insufficient payment. Please enter at least 165.00.` with the actual total substituted as needed.

For the Scenario 5 verification example in this skill, the insufficient-payment message should use `96.00` when the example cart total is PHP 96.00.

## Development milestones

### 1. Setup and interface

Create the project structure and a simple, readable desktop layout. Display all six products with names, prices, and on-screen add buttons. Do not implement later milestone behavior unless it is necessary for the scaffold.

### 2. Ordering and calculations

Implement add, increment, decrement, removal, item subtotals, overall total, and a clear order summary. Preserve the Stage 1 interface.

### 3. Validation and final improvements

Implement numeric cash entry, invalid and insufficient-payment feedback, change, payment confirmation, digital receipt, transaction reference, and a complete new-transaction reset. Finish with regression checks of the earlier milestones.

## Interface expectations

Make the product list, cart/order summary, payment entry, and receipt clearly distinguishable as screens, tabs, or sections. Use readable feedback for success and errors. Exact reproduction of the supplied sample UI is not required or separately graded.
