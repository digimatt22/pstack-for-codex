# pstack for Codex

`pstack-for-codex` is a Codex-native derivative of [pstack](https://github.com/cursor/plugins/tree/main/pstack). It exposes four lightweight entry skills. Narrower workflows and principles load as references only when a core skill routes to them.

Use `$poteto-mode` for a substantial engineering task. It selects a playbook, records the work as verifiable steps, and invokes narrower skills when the steps need them. The parent task keeps authority for integration, external writes, commits, pushes, and the final result.

## Install

This public repository is a Codex marketplace. Install it directly from GitHub:

```bash
codex plugin marketplace add digimatt22/pstack-for-codex
codex plugin add pstack-for-codex@pstack-for-codex-local
```

For a local checkout, replace `digimatt22/pstack-for-codex` with its absolute path. Confirm the installed plugin:

```bash
codex plugin list --json
```

Codex CLI `0.153.4` does not expose an offline runtime skill-index command. The release suite validates the skill catalog from the installed artifact; start a new task to exercise prompt-time skill discovery.

The four entry skills require explicit invocation. Codex stores their identities under the `pstack-for-codex` namespace. In a prompt, invoke a skill with its registered `$name`:

```text
$poteto-mode add a --json flag to this command. Keep text output byte-identical. Verify both modes.
```

Start a new task after installation so Codex reloads the plugin catalog. See [Set up pstack](./docs/guide/01-setup.md) for the complete walkthrough.

## Optional agent profiles

The skills work without custom agent profiles. Ask `$poteto-mode` to use its internal `setup-pstack` guide only when you want to install the two optional profiles:

- `pstack-poteto-agent` for implementation and orchestration.
- `pstack-comment-sicko` for read-only comment review.

Setup writes either project profiles under `.codex/agents/` or user profiles under `~/.codex/agents/`. It records file hashes in a receipt and refuses to overwrite files owned by someone else. An explicit `model` and `reasoning_effort` pair is accepted only when a supported Codex model-list surface proves the pair. Otherwise the profile inherits the parent model and the receipt records that the requested pair is unverified.

Read [Agent setup and model evidence](./docs/codex-adaptation.md#agent-setup-and-model-evidence) before changing profiles.

## Use the skills

`$poteto-mode` is the main entry point:

```text
$poteto-mode this retry path creates duplicate rows. Reproduce it first, fix the root cause, and verify the real behavior.
```

The other registered entry points are:

| Skill | Use it for |
|---|---|
| [`$how`](./skills/how/SKILL.md) | Trace how a subsystem works. |
| [`$create-verification-skill`](./skills/create-verification-skill/SKILL.md) | Add a project-local way to prove real behavior. |
| [`$maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | Audit and refresh an existing verification skill. |

The [internal workflow index](./references/workflows/README.md) preserves the full PStack toolkit without registering every guide globally. Invoke a core skill rather than naming an internal guide as `$skill`. Read the [pstack guide](./docs/guide/README.md) for examples.

## Runtime boundaries

Codex agents may share one filesystem. Read-only work can share a checkout. Parallel writers need exclusive file ownership, separate worktrees, or separate output directories. When safe isolation is unavailable, pstack runs the work serially.

The active user request is the authority boundary. A child cannot add an external write, destination, credential, repository, or lifecycle object. Goals, heartbeats, scheduled tasks, monitors, and separate user-owned tasks are created only when the user requests that lifecycle or gives an equivalent terminal condition such as an overnight run.

Hooks can keep Poteto Mode active across later turns only after Codex trusts the plugin hook source. Without trusted hook evidence, `$poteto-mode` still works for the current turn and reports `current-turn-only`. Say `disable $poteto-mode` to clear the session state.

Optional connectors and control tools are detected at run time. A missing capability triggers the fallback declared by the skill. Work stops when that capability is required for correctness or credential isolation.

## Benny stays paused

[Benny](./automations/benny/README.md) is an optional polling pack for issue triage and reproduction. Installation does not create or activate an automation. The internal `setup-benny` guide copies the pack into a target project only after explicit authority when `$poteto-mode` routes to it.

The two stable automation names are `pstack-benny-triage` and `pstack-benny-reproduce`. Setup creates or updates them only when the user asks, and it leaves both `PAUSED`. Activation needs a separate request after all six canaries pass. Polling is not event delivery, so work can begin up to one schedule interval after a source change.

## Develop and verify

The metadata and resource validator requires Node.js. The legacy orchestrator and watch-PR scripts require [Bun](https://bun.sh/).

```bash
node scripts/validate-plugin.mjs --json
node --test tests/*.test.mjs
cd skills/poteto-mode/scripts
bun install --frozen-lockfile
bun test orch watch-pr
bun run typecheck
```

The validator reports Bun as an optional capability. Skills that depend on the Bun scripts must stop or declare their fallback when Bun is unavailable.

## Update or remove

Refresh the configured Git marketplace, then reinstall from the refreshed snapshot:

```bash
codex plugin marketplace upgrade pstack-for-codex-local
codex plugin remove pstack-for-codex@pstack-for-codex-local
codex plugin add pstack-for-codex@pstack-for-codex-local
```

Remove the plugin and its marketplace registration with:

```bash
codex plugin remove pstack-for-codex@pstack-for-codex-local
codex plugin marketplace remove pstack-for-codex-local
```

Plugin removal does not delete project or user files created through the internal `setup-pstack` or `setup-benny` guides. Use `$poteto-mode` to route to those guides, inspect receipts, and remove only unchanged, owned files. Benny configuration and mutable state survive uninstall unless the user separately authorizes a purge.

## Origin and maintenance

This repository is the maintained `digimatt22` fork of `Aqua-123/pstack-for-codex`. A maintainer checkout should keep `origin` pointed at this fork and `upstream` pointed at the author repository so upstream changes can be reviewed and merged deliberately.

[NOTICE](./NOTICE), [`upstream.lock.json`](./upstream.lock.json), and the [compatibility map](./compatibility/pstack-map.json) separately track the original Cursor PStack source. [UPSTREAM.md](./UPSTREAM.md) explains both update paths.

See [Codex adaptation notes](./docs/codex-adaptation.md) for the behavioral changes and current limits.

## License

MIT. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
