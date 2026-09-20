# Design before implementation

Use design work when a change crosses boundaries or has several credible shapes. Skip it for a mechanical edit whose structure is already fixed.

![Several robots draft separate bridge designs while a reviewer compares them.](./images/design.jpg)

## Settle boundaries with the internal `architect` guide

```text
$poteto-mode use the internal architect guide to design the cancellation state and API before changing callers.
```

The internal `architect` guide grounds the request in current callers and types. It can compare isolated sketches, agree on one shape, and implement against the chosen design. A bad foundational shape is discarded instead of patched around.

## Compare attempts with the internal `arena` guide

```text
$poteto-mode use the internal arena guide to produce three parser designs from this brief. Keep each candidate isolated and judge them against migration cost and failure handling.
```

The candidates need independent output directories or worktrees. The parent reads them, selects a base, integrates useful parts, and verifies the result. If independent agents are unavailable, the internal `arena` guide declares a sequential fallback or returns partial coverage.

## Cover separate slices with the internal `swarm` guide

```text
$poteto-mode use the internal swarm guide to check every package for direct calls to the legacy client. One read-only slice per package.
```

Use the internal `swarm` guide when the work divides by package, file set, test group, or another independent boundary. Do not use it to make several writers share one checkout.

## Review the design with the internal `interrogate` guide

```text
$poteto-mode use the internal interrogate guide to review this design for correctness, migration risk, operability, and unnecessary complexity.
```

The internal `interrogate` guide returns findings grouped by action and explains dismissals. Distinct model families are useful when observable, but installed model labels do not prove which model served a request. Reports mark unverified identity instead of claiming diversity.

Next: [Build and clean the change](./05-build-and-clean.md).
