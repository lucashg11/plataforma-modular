import { z } from "zod";

export const PLAN_IDS = ["starter", "pro", "full"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

const planSchema = z.enum(PLAN_IDS);

export function isPlanId(value: string): value is PlanId {
  return planSchema.safeParse(value).success;
}
