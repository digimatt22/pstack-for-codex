# Setup pstack for Codex

> Internal reference. This is not a registered skill. Use it only when `poteto-mode` or `how` routes to it; treat `$setup-pstack` as a workflow label, not an invocation.

Install optional custom-agent profiles without making them part of the plugin manifest. Codex loads project profiles from `.codex/agents/*.toml` and user profiles from `~/.codex/agents/*.toml`.

Read `references/model-profile.md` before changing configuration. The portable prompts in the owning skills remain authoritative and work without installed profiles.

## Safety contract

- Require explicit user intent for install, upgrade, or uninstall.
- Ask for `project` or `user` scope when it is not clear. Project scope is the safer default only when the user says to configure the current repository.
- Scan both project and user agent directories before a write. Stop on duplicate TOML `name` fields regardless of filename or layer.
- Never overwrite another owner. Update or remove only files whose current SHA-256 matches this setup's receipt.
- A modified, missing, or relocated receipted file requires review; leave profiles and receipt untouched.
- Configuration is not runtime proof. Never claim the served model, effort, effective permissions, connector set, or skill availability unless a supported live surface reports it.

## Model policy

For repository work, request GPT-6 Luna with medium reasoning for every dispatched agent, including read-only lanes. Setup profile configuration is separate from dispatch: use another validated model only for independent model diversity or a specialized role, and record the reason. A profile that pins a conflicting model must not override the dispatch request; use a generic delegate or a compatible profile.

If a supported Codex model-list surface is observable, convert it to JSON records shaped like:

```json
[{"slug":"gpt-5.6-sol","reasoning_efforts":["low","medium","high","xhigh","max","ultra"]}]
```

Validate both values before writing them. If no supported model list is observable, do not guess or accept pasted entitlement claims as proof: omit both TOML fields, inherit the parent, and record `unverified-inheritance` with the requested pair in the receipt. A missing model or unsupported effort is a hard stop; do not silently select a substitute. Repository work remains queued until an appropriate worker can be dispatched.

Profiles are a JSON object keyed by namespaced agent name:

```json
{
  "pstack-poteto-agent": {"model":"gpt-6-luna","reasoning_effort":"medium"},
  "pstack-comment-sicko": {"model":"gpt-5.6-terra","reasoning_effort":"medium"}
}
```

## Execute

The helper is `scripts/manage-agents.mjs` relative to this skill.

```text
node scripts/manage-agents.mjs scan --project-root <repo> --user-home <home>
node scripts/manage-agents.mjs install --scope project --project-root <repo> --user-home <home>
node scripts/manage-agents.mjs install --scope user --project-root <repo> --user-home <home>
node scripts/manage-agents.mjs uninstall --scope project --project-root <repo> --user-home <home>
```

Add `--profile <json-file>` for requested pairs and `--models <json-file>` only when the list came from an observable supported surface. Do not create temporary files containing secrets; these files contain model identifiers only.

On success, report the scope, written paths, receipt path, and each role's configuration status. Say that new profiles apply to newly spawned agents. When a panel inherits or loses distinct profiles, report reduced model diversity instead of claiming which model served it.

On `review-required` or any collision, stop. Show the exact paths and do not suggest force deletion.
