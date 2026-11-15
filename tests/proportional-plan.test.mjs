import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rule = "Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.";

function check(t, lanes, { scope = "One changed interaction and its failure case.", liveRule = rule } = {}) {
  const directory = mkdtempSync(path.join(tmpdir(), "pstack-plan-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const plan = path.join(directory, "plan.md");
  writeFileSync(plan, `# Verify a planned interaction

## How to read this
One box is one unit of work and names the evidence. Check a box only when its evidence exists.
Use playbooks/feature.md.
${rule}

## Program checklist
### Arm the program
create a goal only on explicit go. Read git show origin/main:plan.md. Use the authorized 30-minute queue table checkpoint.
### Spawn owners
### PR mechanics
### Verdict and merge
### Boot recipe

## Verify the interaction (PR 1)
**Depends on.** None.
**Files.**
- [ ] Change view.mjs.
**Build.**
- [ ] Add the interaction.
**You see.**
- [ ] The selected value persists.
**Verify, unit.** ${rule}
- [ ] Run the state test.
**Verify, live.** ${liveRule} ${scope === null ? "" : `Verification scope. ${scope}`}
${lanes.join("\n")}
**Verify, perf.** ${rule}
- [ ] Metric. Input latency.
- [ ] Probe. Replay the input at trunk and head.
- [ ] Baseline. Record trunk first.
- [ ] Rule. Fail above the agreed latency budget.
**Review gate.** None. This fixture exercises verification planning.
**Merge.**
- [ ] Wait for authorized release.

## Close the program
Return the evidence.
## Appendix A Prototype evidence
Recorded source and output.
`);
  return spawnSync(process.execPath, [path.join(root, "skills/poteto-mode/scripts/check-plan.mjs"), plan], { encoding: "utf8" });
}

const lane = (number) => `- [ ] Lane ${number}. Exercise scenario ${number}. Save \`scenario-${number}.png\`. Pass when the expected value persists.`;

for (const count of [1, 3, 10]) {
  test(`a scoped plan accepts ${count} meaningful live scenario(s) without a fixed worker count`, (t) => {
    const result = check(t, Array.from({ length: count }, (_, index) => lane(index + 1)));
    assert.equal(result.status, 0, result.stderr);
  });
}

test("reducing lane count preserves scenario evidence and mandatory proof requirements", (t) => {
  for (const [lanes, options, diagnostic] of [
    [[], {}, /expected consecutive lanes/],
    [[lane(1), lane(1)], {}, /expected consecutive lanes/],
    [[lane(2)], {}, /expected consecutive lanes/],
    [["- [ ] Lane 1. Exercise the interaction. Pass when it persists."], {}, /names no screenshot/],
    [["- [ ] Lane 1. Exercise the interaction. Save `result.png`."], {}, /has no pass predicate/],
    [[lane(1)], { scope: "" }, /Verification scope/],
    [[lane(1)], { scope: null }, /Verification scope/],
    [[lane(1)], { liveRule: "" }, /does not open with the rule/],
  ]) {
    const result = check(t, lanes, options);
    assert.equal(result.status, 1);
    assert.match(result.stderr, diagnostic);
  }
});
