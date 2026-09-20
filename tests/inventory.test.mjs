import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { EXPECTED_SKILL_COUNT, listSkillRecords } from "../scripts/validate-plugin.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relative) => JSON.parse(await fs.readFile(path.join(root, relative), "utf8"));

test("fork and upstream identities remain separate", async () => {
  const [manifest, packageJson, lock] = await Promise.all([
    readJson(".codex-plugin/plugin.json"),
    readJson("package.json"),
    readJson("upstream.lock.json"),
  ]);
  assert.equal(manifest.version, "0.3.1");
  assert.equal(packageJson.version, "0.3.1");
  assert.equal(lock.source.version, "0.15.1");
  assert.equal(lock.source.commit, "f8abeddd1862dc73704e3d719dd73df0d51b8c71");
  assert.equal(lock.inventory.fileCount, 158);
});

test("inventory accounts for every upstream file, skill, and playbook", async () => {
  const [lock, compatibility, records] = await Promise.all([
    readJson("upstream.lock.json"),
    readJson("compatibility/pstack-map.json"),
    listSkillRecords(root),
  ]);
  assert.equal(new Set(lock.files.map((entry) => entry.path)).size, 158);
  assert.equal(compatibility.entries.length, 158);
  assert.deepEqual(
    new Set(compatibility.entries.map((entry) => entry.upstreamPath)),
    new Set(lock.files.map((entry) => entry.path)),
  );

  const upstreamSkills = lock.files
    .map((entry) => entry.path.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1])
    .filter(Boolean)
    .sort();
  assert.equal(upstreamSkills.length, 47);
  assert.equal(records.length, EXPECTED_SKILL_COUNT);
  assert.deepEqual(records.map((record) => record.directory).sort(), [
    "create-verification-skill",
    "how",
    "maintain-verification-skill",
    "poteto-mode",
  ]);
  const workflowDirectories = (await fs.readdir(path.join(root, "references", "workflows"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  assert.deepEqual(
    [...records.map((record) => record.directory), ...workflowDirectories.filter((name) => name !== "setup-benny")].sort(),
    upstreamSkills,
  );
  assert.equal(workflowDirectories.filter((name) => name === "setup-benny").length, 1);

  const playbooks = lock.files
    .map((entry) => entry.path.match(/^skills\/poteto-mode\/playbooks\/([^/]+)\.md$/)?.[1])
    .filter(Boolean)
    .sort();
  assert.equal(playbooks.length, 23);
});

test("behavioral coverage maps all 47 upstream skills and all 23 playbooks", async () => {
  const [lock, coverage, representative] = await Promise.all([
    readJson("upstream.lock.json"),
    readJson("evals/cases/coverage.yaml"),
    readJson("evals/cases/representative.yaml"),
  ]);
  const upstreamSkills = lock.files
    .map((entry) => entry.path.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1])
    .filter(Boolean)
    .sort();
  const playbooks = lock.files
    .map((entry) => entry.path.match(/^skills\/poteto-mode\/playbooks\/([^/]+)\.md$/)?.[1])
    .filter(Boolean)
    .sort();
  assert.deepEqual(coverage.upstream_skills.map((entry) => entry.id.slice(6)).sort(), upstreamSkills);
  assert.deepEqual(coverage.playbooks.map((entry) => entry.id.slice(9)).sort(), playbooks);
  const coreSkills = new Set(["create-verification-skill", "how", "maintain-verification-skill", "poteto-mode"]);
  for (const entry of coverage.upstream_skills) {
    assert.equal(entry.verdict, "passed-offline-contract");
    const name = entry.id.slice(6);
    assert.equal(entry.disposition, coreSkills.has(name) ? "explicit-only" : "on-demand-reference");
    assert.ok(entry.positive_outcome.length > 20);
    for (const dimension of ["workflow", "role", "authority", "evidence", "stop_condition"]) {
      assert.equal(entry.grades[dimension], "required");
    }
    for (const boundary of ["authority", "capability", "negative-trigger"]) {
      assert.ok(entry.boundaries.includes(boundary), `${entry.id} lacks ${boundary}`);
    }
  }
  for (const entry of coverage.playbooks) {
    assert.equal(entry.verdict, "passed-offline-contract");
    assert.match(entry.disposition, /explicit-only-through-poteto-mode/);
    assert.ok(entry.positive_outcome.length > 20);
    for (const dimension of ["workflow", "role", "authority", "evidence", "stop_condition"]) {
      assert.equal(entry.grades[dimension], "required");
    }
    for (const boundary of ["authority", "capability", "negative-trigger"]) {
      assert.ok(entry.boundaries.includes(boundary), `${entry.id} lacks ${boundary}`);
    }
  }
  assert.deepEqual(
    new Set(representative.cases.map((entry) => entry.category)),
    new Set(["direct", "indirect", "incomplete-input", "negative-trigger", "unsupported-action", "setup", "hook", "connector-boundary"]),
  );
  for (const entry of representative.cases) {
    assert.deepEqual(Object.keys(entry.expected).sort(), ["authority", "evidence", "role", "stop_condition", "workflow"]);
  }
});

test("repository contains no abandoned host or generated-profile artifacts", async () => {
  const prohibited = [
    ".cursor-plugin",
    ".cursor",
    ".codex/agents",
    ".codex/plugins",
    ".codex/automations",
    "agents",
    "worktrees",
  ];
  for (const relative of prohibited) {
    const stat = await fs.stat(path.join(root, relative)).catch(() => null);
    assert.equal(stat, null, `${relative} must not ship`);
  }
});
