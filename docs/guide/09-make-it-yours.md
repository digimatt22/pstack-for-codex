# Make the workflows yours

Project skills belong under `.agents/skills/`. They remain separate from the installed plugin, so a plugin upgrade does not overwrite them.

## Draft a personal mode

```text
$poteto-mode use the internal automate-me guide to create a project mode from my stated preferences and the supported recent task history for this repository.
```

The internal `automate-me` guide uses supported Codex task APIs when available. If those APIs are unavailable, it asks for a digest or skips history mining and states the gap. It never searches unsupported host storage.

The draft goes to `.agents/skills/<handle>-mode/` or an existing project category. Review the draft before any commit or pull request. The internal guide does not gain push authority from the authoring request.

## Capture a lesson with the internal `reflect` guide

```text
$poteto-mode use the internal reflect guide to review this task for a reusable workflow correction.
```

The internal `reflect` guide collects the current task through supported history or a bounded digest. It presents accepted, rejected, and backlog findings before editing a skill. The user must approve any skill edit because the change affects later tasks.

## Create a focused skill

Use the installed `skill-creator` when available, or ask Codex to follow the repository's skill-authoring requirements. Keep the skill explicit-only unless you have a clear reason for automatic invocation. Add `agents/openai.yaml`, use relative resource paths, and test from an installed cache-like copy.

Ask `$poteto-mode` to use the internal `technical-writing` guide for documentation and `unslop` for the final prose pass. Use the [authoring-a-skill playbook](../../skills/poteto-mode/playbooks/authoring-a-skill.md) when the change needs a full plan and evaluation.

## Keep provenance separate

Do not edit [`upstream.lock.json`](../../upstream.lock.json) to describe a local customization. The lock records the imported source. Put derivative behavior in the compatibility map, tests, and adaptation notes. [UPSTREAM.md](../../UPSTREAM.md) covers refreshes.

Next: [Use the recipes and avoid the pitfalls](./10-recipes-and-pitfalls.md).
