import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { platformFlags } from "@/config/flags";
import { retentionConfig, retentionSchema } from "@/config/retention";

const ENV_NAMES = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "CRON_SECRET",
  "RESEND_API_KEY",
  "MAIL_FROM",
  "AUTH_HASH_SECRET",
  "ENABLE_TEST_MODULES",
] as const;

describe("platform config", () => {
  it("ships the retention values decided on 16/10/2026", () => {
    expect(retentionConfig).toMatchObject({
      tz: "America/Argentina/Buenos_Aires",
      retentionDays: 90,
      reminderDaysBefore: 15,
      urgentDaysBefore: 7,
      extensionDays: 15,
      provisionalDeadlineDay: 105,
      lateReminderCapDay: 120,
      absoluteCeilingDay: 120,
      postConfirmationDays: 15,
      jobHourLocal: "03:00",
    });
  });

  it("refuses a retention config that contradicts itself", () => {
    expect(() =>
      retentionSchema.parse({
        ...retentionConfig,
        reminderDaysBefore: 90,
      }),
    ).toThrow(/reminderDaysBefore/);
  });

  it("keeps the reservar flag off", () => {
    expect(platformFlags["site.reservar_cta_without_agenda"]).toBe(false);
  });

  it("lists env names with empty values and no retention settings", () => {
    const raw = readFileSync(path.join(process.cwd(), ".env.example"), "utf8");
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"));

    expect(lines).toEqual(ENV_NAMES.map((name) => `${name}=`));
    expect(raw).not.toMatch(/retention|RESERV/i);
  });
});
