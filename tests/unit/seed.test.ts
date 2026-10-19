import { readFileSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { describe, expect, it } from "vitest";

function readSql(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

async function bootDatabase() {
  const db = new PGlite();
  await db.exec(readSql("supabase/migrations/20261019120000_tenants.sql"));
  await db.exec(readSql("supabase/seed.sql"));
  return db;
}

describe("seed", () => {
  it("loads one fictional tenant per plan and keeps the agenda stub out", async () => {
    const db = await bootDatabase();
    await db.exec(readSql("scripts/assert-seed.sql"));
    await db.exec(readSql("scripts/assert-no-agenda-stub.sql"));

    const plans = await db.query<{ plan: string }>(
      "select plan from public.tenants order by plan",
    );
    expect(plans.rows.map((row) => row.plan)).toEqual(["full", "pro", "starter"]);

    await expect(
      db.exec(
        "insert into public.tenants (name, slug, plan) values ('Malo', 'malo', 'basico')",
      ),
    ).rejects.toThrow(/check constraint/i);

    await db.close();
  });

  it("denies anon and authenticated while the tables have no policies", async () => {
    const db = await bootDatabase();

    for (const role of ["anon", "authenticated"]) {
      await db.exec("begin");
      await db.exec(`set local role ${role}`);
      const visible = await db.query<{ id: string }>("select id from public.tenants");
      expect(visible.rows).toEqual([]);
      await expect(
        db.exec(
          `insert into public.tenants (name, slug, plan) values ('Intruso', 'intruso-${role}', 'starter')`,
        ),
      ).rejects.toThrow(/row-level security/i);
      await db.exec("rollback");
    }

    await db.close();
  });

  it("applies the agenda stub only from the fixture", async () => {
    const db = await bootDatabase();
    await db.exec(readSql("supabase/tests/fixtures/agenda-stub.sql"));
    await db.exec(readSql("scripts/assert-agenda-stub.sql"));
    await db.close();
  });
});
