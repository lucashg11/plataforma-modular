import { describe, expect, it } from "vitest";
import { isPlanId, PLAN_IDS } from "@/lib/plans";

describe("plans", () => {
  it("accepts the three plan ids", () => {
    expect(PLAN_IDS).toEqual(["starter", "pro", "full"]);
    for (const plan of PLAN_IDS) {
      expect(isPlanId(plan)).toBe(true);
    }
  });

  it("rejects retired plan ids", () => {
    expect(isPlanId("basico")).toBe(false);
    expect(isPlanId("pack_starter")).toBe(false);
    expect(isPlanId("pack_pro")).toBe(false);
  });
});
