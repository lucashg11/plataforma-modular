import { z } from "zod";

/**
 * Flags de plataforma. No son variables de entorno (P-14).
 * `site.reservar_cta_without_agenda` queda en false hasta una decisión nueva de Lucas.
 */
export const flagsSchema = z
  .object({
    "site.reservar_cta_without_agenda": z.boolean(),
  })
  .strict();

export type PlatformFlags = z.infer<typeof flagsSchema>;

export const platformFlags: PlatformFlags = flagsSchema.parse({
  "site.reservar_cta_without_agenda": false,
});
