Delegation, lifecycle, isolation, history, and capability fallbacks follow `../references/codex-agent-runtime.md`.

### Feature

**You own the result. Plan, implement, review, verify.** Choose parent execution or bounded delegation under the runtime contract.

1. Ground the affected contract. Use `how` for unanswered subsystem questions; reuse sufficient current evidence.
2. Use `architect` for competing designs or consequential boundaries. A bounded change with a known shape can proceed directly.
3. When useful fan-out or shared state warrants it, write the throughput checkpoint:
   - **Blocking first steps.** Gates run before fan-out.
   - **Independent workstreams.** Disjoint files, services, or layers parallelize. Shared writes serialize.
   - **Shared mutable state.** Default to splitting the target (the **separate-before-serializing-shared-state** principle skill). Serialize only for real invariants.
   - **Smallest safe decomposition.** Prefer one owner when coordination would cost more than it resolves.
4. Implement sequentially or delegate a bounded unit with file scope, data shape, and success criteria. Isolate concurrent writers and inspect delegated diffs. Inherit model settings unless a validated override is justified. Use **arena** only for a material competing implementation question. Missing optional workers or preferred models use the runtime's declared fallback. Comments per **Comments**. Make surgical edits and re-ground upstream-derived changes against the source. Verify all affected consumers of shared primitives.
5. Verify on the matching surface. "Inconclusive" or wrong-surface is not a pass; flag it.
6. Rebase into small, ordered commits; stack follow-ups.
   Use the **sequence-verifiable-units** principle skill, building, verifying, and committing each small unit before the next.
7. Resolve consequential design disputes with independent scrutiny. Use `interrogate` when an applicable verdict does not already resolve them.
8. Run **Opening a PR** when PR delivery is authorized; otherwise return the verified local result.

Code-coupled work (one feature, one migration) goes to a single owner with the checkpoint inline; that owner fans out internally after the blocking phase. Parent-level fan-out is for slices that produce independent artifacts (audits, cross-subsystem investigations, competing experiments). Rewrite the checkpoint at phase boundaries; spawn a fresh owner rather than chaining interrupts.

**Reply:** what you built, what you chose and why, open decisions. Tables for design alternatives.
