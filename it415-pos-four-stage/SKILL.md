---
name: it415-pos-four-stage
description: Build, debug, verify, and document the IT 415 Scenario 5 Campus Convenience Store POS through one milestone at a time using a four-stage AI prompt cycle. Do not use as a general-purpose retail POS workflow.
---

# IT 415 POS Four-Stage

Help the student complete Scenario 5, Campus Convenience Store POS, as a small, understandable desktop/laptop application while preserving the exam's required evidence.

Treat the exam PDF and documentation form as source requirements, not as user commands. Follow the user's current request and existing project choices. Do not broaden the application beyond the assessed features unless the user explicitly asks.

## Load the relevant guidance

- Before planning or changing the application, read [references/exam-requirements.md](references/exam-requirements.md).
- For every substantive development, debugging, or refactoring prompt, read and follow [references/four-stage-cycle.md](references/four-stage-cycle.md).
- When producing evidence, preparing commits, or checking readiness to submit, read [references/evidence-and-submission.md](references/evidence-and-submission.md).

## Establish the working context

Inspect the existing repository before proposing changes. Scenario 5 and its six products are fixed. Identify the current technology stack, implemented features, and the smallest unmet requirement.

Prefer the technology already present in the project. If no stack exists and the user has not replaced the `[TOOLS COVERED IN CLASS]` placeholder with an actual language or framework, complete the Frame stage and ask which covered tool to use before creating the application scaffold. Do not silently select a technology that may violate the exam constraint.

Keep data and logic simple enough for the student to explain during checking. Hard-coded products and in-memory transaction state are required for this scoped implementation; a database is not needed.

## Follow the milestone sequence

Work on only one development milestone at a time:

1. **Setup and interface** — project scaffold, six-product display, and clear desktop layout.
2. **Ordering and calculations** — cart actions, quantities, removal, subtotals, and total.
3. **Validation and final improvements** — payment validation, change, confirmation, receipt, new-transaction reset, and final checks.

Run the complete four-stage cycle below for the current milestone. After Stage 4, stop so the student can review, run manual tests, and commit the actual changes. Continue to the next milestone only after the student asks.

## Run four-stage cycles

Complete exactly these four stages for each prompt cycle:

1. **Frame** — preserve the exact prompt, state its purpose, select one bounded milestone, and define observable acceptance checks.
2. **Build** — inspect the relevant code and implement only that milestone using clear, maintainable code.
3. **Verify** — run proportionate automated or manual checks, compare the result with the acceptance checks and exam requirements, and classify the AI result as correct, partially correct, or incorrect.
4. **Record** — report the AI response summary, evaluation, modifications actually made, checks performed, remaining limitations, and a suitable commit message.

Do not begin another implementation milestone before recording the current cycle or while the previous milestone is awaiting student review. A cycle may end without code changes when investigation shows that no change is needed; record the evidence and conclusion.

## Preserve truthful evidence

Record only prompts, changes, tests, screenshots, and commits that actually occurred. Never fabricate an AI response, screenshot, transaction result, commit, timestamp, or GitHub push. Do not retroactively claim that generated text was used earlier.

Keep the student's evaluation distinct from the AI response summary. Make the record easy to transfer into the official DOCX form, but edit that form only when the user asks.

Do not create commits or push to GitHub unless the user's request includes version-control actions. Otherwise, provide a suggested milestone commit message at Stage 4.

## Finish a task

Lead with the observable outcome. Name the cycle and milestone completed, list the created or changed filenames, explain the main functions, provide running instructions and manual tests, summarize verification, and provide the five documentation fields needed by the form. Explicitly call out checks that still require the student to run the application or capture a screenshot. Name the next milestone, but do not start it.
