# Steer with principle names

Poteto Mode reads an index of 23 engineering principles. Name one when the work drifts.

## Use a principle as a correction

```text
Fix root causes. Reproduce the stale value and trace the first bad write.
```

```text
Subtract before you add. Remove the dead compatibility path before adding another branch.
```

```text
Separate before serializing shared state. Give each writer its own worktree.
```

The principle narrows the method. It does not add permission or a new deliverable.

## Find the full rule

The principles are grouped by purpose:

- Scope and design: [Laziness Protocol](../../references/workflows/principle-laziness-protocol/guide.md), [Foundational Thinking](../../references/workflows/principle-foundational-thinking/guide.md), [Redesign from First Principles](../../references/workflows/principle-redesign-from-first-principles/guide.md), [Attack the Premise](../../references/workflows/principle-attack-the-premise/guide.md), [Subtract Before You Add](../../references/workflows/principle-subtract-before-you-add/guide.md), [Minimize Reader Load](../../references/workflows/principle-minimize-reader-load/guide.md), [Outcome-Oriented Execution](../../references/workflows/principle-outcome-oriented-execution/guide.md), [Experience First](../../references/workflows/principle-experience-first/guide.md), [Exhaust the Design Space](../../references/workflows/principle-exhaust-the-design-space/guide.md), and [Build the Lever](../../references/workflows/principle-build-the-lever/guide.md).
- Architecture: [Model the Domain](../../references/workflows/principle-model-the-domain/guide.md), [Boundary Discipline](../../references/workflows/principle-boundary-discipline/guide.md), [Type System Discipline](../../references/workflows/principle-type-system-discipline/guide.md), [Make Operations Idempotent](../../references/workflows/principle-make-operations-idempotent/guide.md), [Migrate Callers Then Delete Legacy APIs](../../references/workflows/principle-migrate-callers-then-delete-legacy-apis/guide.md), and [Separate Before Serializing Shared State](../../references/workflows/principle-separate-before-serializing-shared-state/guide.md).
- Verification and delegation: [Prove It Works](../../references/workflows/principle-prove-it-works/guide.md), [Fix Root Causes](../../references/workflows/principle-fix-root-causes/guide.md), [Sequence Verifiable Units](../../references/workflows/principle-sequence-verifiable-units/guide.md), [Test Behavior, Not Implementation](../../references/workflows/principle-test-behavior-not-implementation/guide.md), [Guard the Context Window](../../references/workflows/principle-guard-the-context-window/guide.md), [Never Block on the Human](../../references/workflows/principle-never-block-on-the-human/guide.md), and [Encode Lessons in Structure](../../references/workflows/principle-encode-lessons-in-structure/guide.md).

Principles are internal references. Invoke `$poteto-mode`; it opens only the principle guides that match the task.

Next: [Make the workflows yours](./09-make-it-yours.md).
