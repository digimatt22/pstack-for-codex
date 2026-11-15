# Swarm

> Internal reference. This is not a registered skill. Use it only when `poteto-mode` or `how` routes to it; treat `$swarm` as a workflow label, not an invocation.

Delegation and optional capabilities follow the [central Codex contract](../../../skills/poteto-mode/references/codex-agent-runtime.md).

Fan out N isolated workers. They may cover separate slices, race the same brief, or mix both. The parent waits, aggregates, and returns one report. If optional subagents or parallel write isolation are unavailable, use sequential-parent or partial-result under the runtime contract. Required independence or isolated execution remains a visible dependency.

## Start

Open a todolist with one entry per phase before launching anything.

1. Frame
2. Fan out
3. Aggregate
4. Report

## Phase A: Frame

1. State the done predicate and the artifact or report the swarm must return.
2. Choose the shape. Partition into slices, race N workers on identical briefs, or mix both. For a race or mixed shape, declare `first pass`, `rank all`, or `best-of` before spawning.
3. Set N from the user or derive it from the shape. Cap N at observable runtime capacity. Queue excess lanes; never drop them silently.
4. Inherit model settings or choose justified validated overrides under the runtime contract. For a model race, name each arm's model and reason up front; missing required diversity cannot be replaced by inheritance.
5. Give each concurrent writer exclusive non-overlapping paths, a separate worktree, or an isolated output directory such as `/tmp1-<slug>/worker-<n>/`. A branch alone does not isolate a shared checkout.

## Phase B: Fan out

After proving independent reads or isolated writes, dispatch all ready workers together through supported subagent tools. Use compatible profiles or generic agents with the declared model policy. A worker that needs local devices or live-control capabilities stays on the surface that provides them. For a non-default base, create or select the exact worktree or branch before dispatch and name it in the brief.

Every brief stands alone. Include the goal, scope, exact slice or race arm, how to verify, and what to report. Reports use `PASS`, `ISSUES`, or `BLOCKED` with evidence.

If a worker drops out, reconcile its partial state and make one bounded retry when safe. Otherwise proceed with a labeled partial result or fail closed when that lane is required.

## Phase C: Aggregate

Read the terminal results. For coverage, every required slice needs a result. For a race, apply the selection rule declared up front. Use first pass, rank all, or best-of. Do not paste raw worker dumps.

Keep a compact result table, one-line evidenced issues, and explicit gaps or dropouts.

## Phase D: Report

Return one consolidated in-chat report with the table, issue one-liners, gaps or dropouts, and the race rule when used.
