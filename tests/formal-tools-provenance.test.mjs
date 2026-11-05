import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("formal tools retain a selective upstream pin without changing the repository-wide lock", async () => {
  const lock = JSON.parse(await fs.readFile(path.join(root, "compatibility/formal-tools.lock.json"), "utf8"));
  assert.equal(lock.source.repository, "https://github.com/cursor/plugins");
  assert.equal(lock.source.subdirectory, "pstack");
  assert.match(lock.source.commit, /^[0-9a-f]{40}$/);
  assert.match(lock.scope, /does not upgrade the repository-wide 0\.15\.1 lock/);
  assert.ok(lock.files.length > 400);
  const seen = new Set();
  for (const entry of lock.files) {
    assert.match(entry.sha256, /^[0-9a-f]{64}$/);
    assert.ok(entry.path.startsWith("skills/statechart/") || entry.path.startsWith("skills/create-formal-verification-skill/") || entry.path.startsWith("skills/maintain-formal-verification-skill/"));
    assert.ok(!seen.has(entry.path), `duplicate upstream path ${entry.path}`);
    seen.add(entry.path);
    await fs.access(path.join(root, entry.derivedPath));
  }
});
