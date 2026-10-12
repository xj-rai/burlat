# AI-Assisted Development Records

These records summarize the actual AI-assisted development cycles used for the IT 415 Scenario 5 Campus Convenience Store POS. Transfer the required fields into the official DOCX form only after completing the manual browser tests and confirming that each evaluation accurately reflects your own assessment.

## AI Prompt Record 1

**Prompt Used (exact text):**

> Just use HTML, JS, and CSS. Without database just for POS system.

**Purpose of the Prompt:** Establish the project with class-approved browser technologies and create the Stage 1 product catalog and desktop POS interface without a database.

**AI Response Summary:** Created `index.html`, `styles.css`, and `script.js` with the six required products, Philippine-peso prices, product cards, and separate order, payment, and receipt areas. Added running instructions to `README.md`.

**Evaluation:** Draft evaluation — the product data, JavaScript syntax, HTML landmarks, CSS structure, and local HTTP responses passed automated checks. Confirm the visual layout in your browser before marking this response correct.

**Modifications You Made:** Student confirmation required. Record any changes you personally made after reviewing the Stage 1 output. If you made none, state that only after completing your own review.

**Verification Performed:** Confirmed all six products and prices, required interface sections, JavaScript syntax, balanced CSS structure, and successful local serving of the HTML, CSS, and JavaScript files.

**Files Changed and Main Functions:** `index.html`, `styles.css`, `script.js`, and `README.md`; `formatCurrency`, `createProductCard`, and `renderProducts`.

**Running Instructions:** Open `index.html` in a modern browser. No installation, build command, server, or database is required.

**Actual Commit:** `5004cf5 Updated Stage 1 POS interface withno database`

**Screenshot Still Needed:** Product list/order screen showing the six product names and prices.

## AI Prompt Record 2

**Prompt Used (exact text):**

> Now, continue stage 2.

**Purpose of the Prompt:** Add the in-memory cart, quantity management, removal, item subtotals, item count, and overall total while preserving the Stage 1 interface.

**AI Response Summary:** Enabled Add to Order buttons and implemented cart state with a JavaScript `Map`. Added increment, decrement, and remove controls together with automatic subtotal and total updates and an empty-cart state.

**Evaluation:** Draft evaluation — automated tests confirmed add, increment, decrement, removal, empty-cart behavior, invalid product handling, and the required PHP 96.00 example total. Confirm the controls manually before marking this response correct.

**Modifications You Made:** Student confirmation required. Record any corrections or interface adjustments you personally made after testing the cart behavior.

**Verification Performed:** Tested 2 Instant Noodles, 1 Potato Chips, and 1 Notebook for an expected total of PHP 96.00. Also tested decrement limits, removal, recomputed totals, and returning to an empty cart.

**Files Changed and Main Functions:** `index.html`, `styles.css`, `script.js`, and `README.md`; `addToCart`, `increaseQuantity`, `decreaseQuantity`, `removeFromCart`, `getCartItems`, `getCartTotal`, `getItemCount`, and `renderCart`.

**Running Instructions:** Open `index.html`, add products, and use the quantity and removal controls in the order summary.

**Actual Commit:** `2709efd Stage 2 Ordering and Calculations`

**Screenshot Still Needed:** Cart/order summary showing items, quantities, subtotals, and a PHP 96.00 total.

## AI Prompt Record 3

**Prompt Used (exact text):**

> continue stage 3

**Purpose of the Prompt:** Complete payment validation, change computation, payment confirmation, digital receipt generation, transaction reference creation, and new-transaction reset.

**AI Response Summary:** Activated cash payment when the cart contains items. Added required invalid and insufficient-payment messages, successful-payment confirmation, change calculation, completed-order locking, a detailed digital receipt, and a full New Transaction reset.

**Evaluation:** Draft evaluation — automated tests passed for blank, non-numeric, negative, insufficient, exact, and greater-than-total payments. Receipt and reset behavior must still be confirmed in the running browser before marking the response correct.

**Modifications You Made:** Student confirmation required. Record any corrections you personally made after testing payment, receipt, and reset behavior.

**Verification Performed:** Confirmed that blank, non-numeric, and negative values are invalid; PHP 95.00 is insufficient for a PHP 96.00 order; PHP 96.00 produces PHP 0.00 change; and PHP 100.00 produces PHP 4.00 change. Transaction-reference formatting and earlier cart behavior also passed automated checks.

**Files Changed and Main Functions:** `index.html`, `styles.css`, `script.js`, and `README.md`; `validatePayment`, `handlePaymentSubmit`, `generateTransactionReference`, `renderReceipt`, and `startNewTransaction`.

**Running Instructions:** Build the PHP 96.00 example cart, enter a cash amount, confirm payment, inspect the receipt, and select Start New Transaction.

**Actual Commit:** `25ce9fc Stage 3 Required transaction flow`

**Screenshot Still Needed:** Successful payment with PHP 4.00 change, the complete receipt and transaction reference, and optionally a rejected payment.

## Final Manual Test

1. Open `index.html` in a modern browser.
2. Confirm that all six Scenario 5 products and prices are visible.
3. Add 2 Instant Noodles, 1 Potato Chips, and 1 Notebook.
4. Confirm subtotals of PHP 36.00, PHP 25.00, and PHP 35.00 and a total of PHP 96.00.
5. Test increment, decrement, and removal, then reconstruct the PHP 96.00 cart.
6. Submit blank, non-numeric, negative, and PHP 95.00 payments and confirm clear rejection messages.
7. Submit PHP 100.00 and confirm PHP 4.00 change, payment confirmation, and a receipt containing every required field.
8. Select Start New Transaction and confirm the cart, payment, receipt, total, item count, and transaction status are reset.

## Submission Readiness

- [x] Six Scenario 5 products and prices are present in source code.
- [x] Cart, quantity, removal, subtotal, and total logic passed automated tests.
- [x] Payment boundary and change calculations passed automated tests.
- [x] Digital receipt and reset implementations are present in source code.
- [x] Three real AI prompt records are documented above.
- [x] Milestone commits exist for Stages 1, 2, and 3.
- [x] Local Git currently reports `main` aligned with `origin/main` at `25ce9fc`.
- [x] `README.md` contains project, running, and manual-test instructions.
- [ ] Complete the final browser test above.
- [ ] Replace each Student confirmation required note with your truthful modifications.
- [ ] Finalize your own evaluation for every AI response.
- [ ] Capture product, cart, payment, receipt, and GitHub-history screenshots.
- [ ] Transfer the required records and screenshots into the official DOCX form.
- [ ] Review and personally complete the declaration and personal-information fields.

This Markdown file supports record keeping and does not replace the official submission form.
