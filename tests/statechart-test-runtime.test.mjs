import assert from "node:assert/strict";
import test from "node:test";
import { supportsStatechartTestRuntime } from "../scripts/run-statechart-tests.mjs";

test("statechart test runtime selector matches the executable's Node support", () => {
  for (const version of ["22.18.0", "22.99.0", "23.6.0", "24.0.0", "26.5.0"])
    assert.equal(supportsStatechartTestRuntime(version), true, version);
  for (const version of ["20.20.0", "22.17.0", "23.0.0", "23.5.0"])
    assert.equal(supportsStatechartTestRuntime(version), false, version);
});
