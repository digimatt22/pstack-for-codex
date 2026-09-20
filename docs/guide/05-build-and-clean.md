# Build and clean the change

Poteto Mode has playbooks for bug fixes, features, refactors, performance work, prototypes, runtime forensics, traces, visual parity, and metric improvement.

## Preserve the user contract

Name the behavior that must change and the behavior that must remain:

```text
$poteto-mode add JSON output to the status command. Keep existing text output byte-identical. Test both.
```

The parent task owns the integrated diff. A child owns only the files and operations named in its brief.

## Reproduce bugs with the internal `tdd` guide

```text
$poteto-mode use the internal tdd guide to reproduce the duplicate retry row, then implement the smallest root-cause fix.
```

The internal `tdd` guide writes the cheapest meaningful failing test first. When a test needs a broad mock harness or cannot exercise the symptom, it uses the closest executable check and says why.

## Apply language guidance where it fits

The internal `typescript-best-practices` guide checks TypeScript-specific design and type rules. It does not replace the repository compiler, formatter, or test suite.

## Clean prose with the internal `unslop` guide

```text
$poteto-mode use the internal unslop guide to tighten the changed README and error messages without changing meaning.
```

The skill removes filler, vague claims, and repeated jargon. It keeps real symbols and measured facts.

## Review comments with the internal `no-comments` guide

```text
$poteto-mode use the internal no-comments guide to inspect comments added by this diff and remove the ones the code can express.
```

The `pstack-comment-sicko` custom profile is optional. Without it, the skill uses a generic read-only reviewer loaded with the portable Comment Sicko prompt. The parent accepts or rejects each finding and applies edits.

Next: [Verify and ship](./06-verify-and-ship.md).
