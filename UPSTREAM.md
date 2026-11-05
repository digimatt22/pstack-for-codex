# Upstream maintenance

This repository has two update relationships:

- GitHub fork maintenance tracks `https://github.com/Aqua-123/pstack-for-codex`.
- Source provenance tracks `pstack` in `https://github.com/cursor/plugins`. The locked source is version `0.15.1` at commit `f8abeddd1862dc73704e3d719dd73df0d51b8c71`.

Keep the normal fork remotes in a maintainer checkout:

```bash
git remote add upstream https://github.com/Aqua-123/pstack-for-codex.git
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

When local fork changes prevent a fast-forward, merge or rebase on a review branch and run the full release gate before updating `main`. Do not push a raw `cursor/plugins` branch or snapshot commit into this repository. Use a temporary source checkout for provenance refreshes.

## Selective formal-tool provenance

The Codex-native statechart runner and its supporting guides are pinned separately in [`compatibility/formal-tools.lock.json`](./compatibility/formal-tools.lock.json). It records the selected upstream source paths and SHA-256 hashes at commit `bb68f2365eceafa0cb2d253112f675acf5f144cc`. This scoped pin does not change the repository-wide `0.15.1` snapshot or its 158-file lock.

When updating these tools, review the selected source delta and Codex adaptations, then update only this selective pin and its derived-path mappings. Keep the original `upstream.lock.json` unchanged unless a separate full snapshot refresh is intended.

Run `npm run test:statechart:offline` for parser-only CLI checks; it names TLC cases it skips. The release gate runs `test:statechart:tlc`, which requires the pinned jar and Java (from explicit `TLA2TOOLS` and `JAVA` paths or tools already installed with mise). `npm run test:statechart:render` installs Pele and Mermaid from npm and needs network access. These tests require Node versions allowed by the package engine range, `^22.18.0 || >=23.6.0`.

## Provenance files

- [`NOTICE`](./NOTICE) records attribution and the source commit.
- [`upstream.lock.json`](./upstream.lock.json) records the 158 source paths, sizes, and SHA-256 hashes.
- [`compatibility/pstack-map.json`](./compatibility/pstack-map.json) assigns each source path a Codex path, classification, invariant, and validation. Its `refresh.fromFiles` inventory and `refreshDecisions` ledger prove the completed refresh delta.
- [`compatibility/report.md`](./compatibility/report.md) is the generated human-readable report.

## Check the locked source

Use a temporary local source checkout. The import helper removes its own temporary clone when you pass a repository URL, and it never writes into the derived tree.

```bash
node scripts/import-upstream.mjs \
  --source https://github.com/cursor/plugins \
  --subdirectory pstack \
  --commit f8abeddd1862dc73704e3d719dd73df0d51b8c71 \
  --verify-lock \
  --dry-run
```

The command must report `Verified 158 files`.

## Review a newer source commit

1. Clone the source repository into a temporary directory and check out the exact candidate commit.
2. Point `scripts/generate-compatibility-report.mjs --upstream-dir` at the candidate `pstack` directory.
3. Review every added, changed, deleted, or renamed path. Record a `refreshDisposition` in `compatibility/pstack-map.json` before adapting code. The completed refresh also records the prior inventory in `refresh.fromFiles` and one matching `refreshDecisions` row per source delta.
4. Port behavior into the Codex tree. Do not copy host-specific installation or runtime claims.
5. Update the source metadata and hashes in `upstream.lock.json` only after review.
6. Regenerate `compatibility/report.md` and run the full release checks.
7. Delete the temporary source checkout. Confirm that the delivered repository has no raw `cursor/plugins` source branch. The Git remote named `upstream` may remain pointed at `Aqua-123/pstack-for-codex`.

To inspect a candidate without changing the committed report, run:

```bash
node scripts/generate-compatibility-report.mjs \
  --check \
  --upstream-dir /absolute/path/to/temporary/plugins/pstack
```

The command exits with blocking findings until every source delta has an explicit disposition. The import helper refuses to overwrite an existing output directory, and the inventory rejects symlinks.

## Regenerate the report

After the lock and compatibility map agree, run:

```bash
node scripts/generate-compatibility-report.mjs
node scripts/generate-compatibility-report.mjs --check
node --test tests/upstream-provenance.test.mjs tests/compatibility-map.test.mjs
```

Review the generated diff. A complete report accounts for every locked path and has no unresolved source delta.
