import { z } from "zod";

/**
 * Plazos de retención. No son variables de entorno (N-01).
 * Valores decididos el 16/10/2026, architecture rev. 17.1.
 * Las fórmulas de F5 leen solo este objeto: no repiten 105 ni 120.
 */
export const retentionSchema = z
  .object({
    tz: z.string().min(1),
    retentionDays: z.number().int().positive(),
    reminderDaysBefore: z.number().int().positive(),
    urgentDaysBefore: z.number().int().positive(),
    extensionDays: z.number().int().positive(),
    provisionalDeadlineDay: z.number().int().positive(),
    lateReminderCapDay: z.number().int().positive(),
    absoluteCeilingDay: z.number().int().positive(),
    postConfirmationDays: z.number().int().positive(),
    jobHourLocal: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.reminderDaysBefore >= cfg.retentionDays) {
      ctx.addIssue("reminderDaysBefore must be less than retentionDays");
    }
    if (cfg.urgentDaysBefore >= cfg.reminderDaysBefore) {
      ctx.addIssue("urgentDaysBefore must be less than reminderDaysBefore");
    }
    if (cfg.provisionalDeadlineDay > cfg.absoluteCeilingDay) {
      ctx.addIssue("provisionalDeadlineDay must be <= absoluteCeilingDay");
    }
    if (cfg.lateReminderCapDay !== cfg.absoluteCeilingDay) {
      ctx.addIssue("lateReminderCapDay must equal absoluteCeilingDay");
    }
  });

export type RetentionConfig = z.infer<typeof retentionSchema>;

export const retentionConfig: RetentionConfig = retentionSchema.parse({
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
