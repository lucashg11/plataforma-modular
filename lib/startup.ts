import { platformFlags } from "@/config/flags";
import { retentionConfig } from "@/config/retention";

/** Evaluates config at import time. Invalid values throw and the server does not start. */
export function loadPlatformConfig() {
  return {
    tz: retentionConfig.tz,
    reservarCtaWithoutAgenda: platformFlags["site.reservar_cta_without_agenda"],
  };
}
