import { spawnSync } from "node:child_process";

if (process.env.ENABLE_TEST_MODULES !== "true") {
  console.log("ENABLE_TEST_MODULES is not true; agenda stub not applied.");
  process.exit(0);
}

const result = spawnSync(
  "pnpm",
  [
    "exec",
    "supabase",
    "db",
    "query",
    "--local",
    "-f",
    "supabase/tests/fixtures/agenda-stub.sql",
  ],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);
