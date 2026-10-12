# Four-Stage Prompt Cycle

Use this cycle for each project milestone, distinct bug fix, or refactor. Keep a cycle small enough to implement and verify before moving on. For the initial build, follow these milestones in order:

1. Setup and interface.
2. Ordering and calculations.
3. Validation and final improvements.

Complete all four stages for one milestone, then stop for the student's review, manual testing, and actual commit. Do not continue automatically to the next milestone.

## Stage 1 — Frame

Capture:

- **Prompt used:** Preserve the user's exact substantive prompt verbatim. Do not silently rewrite it for the official record.
- **Purpose:** State what the cycle is intended to accomplish in one or two sentences.
- **Milestone:** Select the current milestone or one bounded repair within it.
- **Acceptance checks:** List observable behavior, including relevant invalid or boundary cases.

Before building, inspect the current project and map the milestone to the exam requirements. If the project has no established technology and the prompt still says `[TOOLS COVERED IN CLASS]`, stop after framing and ask the student which language or framework was covered. Ask other questions only if a missing answer would materially change the implementation.

## Stage 2 — Build

Implement the smallest coherent change that satisfies the milestone:

- Preserve the existing framework and project conventions unless there is a concrete reason to change them.
- Keep product, cart, payment, and receipt responsibilities understandable.
- Avoid optional features until all required features work.
- Keep monetary display consistently in Philippine pesos with two decimal places.
- Avoid dependencies whose setup cost is disproportionate to this exam-sized application.
- Preserve already working features when modifying code.
- Provide complete code in the project files rather than only disconnected snippets.
- Add comments only where they clarify important logic; avoid comments that merely restate the code.

If the request is diagnostic, inspect and explain without modifying code unless the user also asked for a fix.

## Stage 3 — Verify

Run checks that demonstrate behavior rather than merely matching source text. Use this Scenario 5 worked example when applicable:

- 2 Instant Noodles at PHP 18.00, 1 Potato Chips at PHP 25.00, and 1 Notebook at PHP 35.00
- expected total: PHP 96.00
- cash paid: PHP 100.00
- expected change: PHP 4.00

Also test the boundary cases relevant to the milestone. For payment, check blank, non-numeric, negative, insufficient, exact, and greater-than-total values. For cart work, check add, increment, decrement, removal, recomputed totals, and an empty cart.

Classify the result:

- **Correct:** Acceptance checks pass and no material correction was needed.
- **Partially correct:** The approach helped but required fixes or still has a known limitation.
- **Incorrect:** It did not meet the purpose or was discarded.

Never say a UI flow passed if it was not actually run. Clearly label code inspection, automated checks, and manual checks separately.

## Stage 4 — Record

Return a compact record suitable for transferring into the official form:

```markdown
## AI Prompt Record #N

**Prompt Used (exact text):**
> ...

**Purpose of the Prompt:** ...

**AI Response Summary:** ...

**Evaluation:** Correct / Partially correct / Incorrect — ...

**Modifications Made:** ...

**Verification Performed:** ...

**Files Changed and Main Functions:** ...

**Running Instructions:** ...

**Manual Tests for the Student:** ...

**Suggested Commit Message:** ...

**Screenshot Still Needed:** ...
```

The form's required fields are Prompt Used, Purpose, AI Response, Evaluation, and Modifications Made. Files, running instructions, verification, commit message, tests, and screenshot status are working aids; do not mislabel them as fields required by the form.

Use a milestone-oriented commit message, such as `Implement cart totals and quantity controls` or `Add payment validation and receipt reset`. Report a commit hash only if the commit was actually created.

End after the record. Wait for the student to review, test, and commit before beginning another milestone.
