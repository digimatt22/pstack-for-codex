import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entrypoint = fileURLToPath(import.meta.url);
const TLC_TOOL = "http:tla2tools[url=https://github.com/tlaplus/tlaplus/releases/download/v1.7.4/tla2tools.jar,checksum=sha256:936a262061c914694dfd669a543be24573c45d5aa0ff20a8b96b23d01e050e88]@1.7.4";

export function supportsStatechartTestRuntime(value) {
  const [major, minor] = value.split(".").map(Number);
  return (major === 22 && minor >= 18) || (major >= 23 && (major > 23 || minor >= 6));
}

function resolveTlcEnvironment() {
  if (process.env.TLA2TOOLS && fs.existsSync(process.env.TLA2TOOLS)) return true;
  const mise = spawnSync("mise", ["where", TLC_TOOL], { encoding: "utf8" });
  if (mise.status !== 0) return false;
  const jar = path.join(mise.stdout.trim(), "tla2tools.jar");
  if (!fs.existsSync(jar)) return false;
  process.env.TLA2TOOLS = jar;
  if (!process.env.JAVA) {
    const java = spawnSync("mise", ["which", "java", "--tool", "java@temurin-25"], { encoding: "utf8" });
    if (java.status === 0 && fs.existsSync(java.stdout.trim())) process.env.JAVA = java.stdout.trim();
  }
  return true;
}

async function run(mode = "offline") {
  const version = process.versions.node;
  if (!supportsStatechartTestRuntime(version)) {
    process.stderr.write("Statechart tests require Node 22.18 to 22.x or Node 23.6 or later. This matches the package Node engine range.\n");
    process.exitCode = 127;
    return;
  }
  if (["tlc", "all"].includes(mode) && !resolveTlcEnvironment()) {
    process.stderr.write("TLC-backed Statechart tests require the pinned tla2tools.jar and Java 25. Set TLA2TOOLS and JAVA or install the pinned tools with mise. No tools were installed.\n");
    process.exitCode = 127;
    return;
  }
  if (mode === "offline" && !process.env.TLA2TOOLS) process.stderr.write("TLC-backed cases are skipped. Set TLA2TOOLS and JAVA, then run test:statechart:tlc to require them.\n");
  const testRoot = path.join(root, "references/tools/statechart/test");
  const names = fs.readdirSync(testRoot).filter((name) => name.endsWith(".test.ts")).sort();
  const files = names
    .filter((name) => mode === "all" || (mode === "render" ? name === "render.test.ts" : name !== "render.test.ts"))
    .map((name) => path.join(testRoot, name));
  if (!["all", "offline", "render", "tlc"].includes(mode)) {
    process.stderr.write("Use offline, render, tlc, or all.\n");
    process.exitCode = 2;
    return;
  }
  const result = spawnSync(process.execPath, ["--disable-warning=ExperimentalWarning", "--test", "--test-concurrency=1", ...files], { cwd: root, stdio: "inherit", env: process.env });
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
    process.exitCode = 2;
    return;
  }
  process.exitCode = result.status ?? 2;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === pathToFileURL(entrypoint).href) {
  await run(process.argv[2]);
}
