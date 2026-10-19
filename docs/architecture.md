# Arquitectura citada por el repo

Este archivo no reemplaza la arquitectura. La fuente de verdad técnica es el documento de Drive.

| Fuente | Versión | Drive |
|---|---|---|
| Arquitectura | rev. 17.1 FINAL (rev. 15 + Delta rev. 16 / 16.1 + Delta rev. 17 / 17.1) | https://drive.google.com/file/d/1Y-J8RDC9HSIJw0oD02PG0H_02iVwsZfn/view |
| UX | rev. 5.9.2 FINAL | `WorkOS/02_Work/plataforma-modular/ux-modulos.md` |
| Copy | v7.5.3 | `WorkOS/02_Work/plataforma-modular/copy-modulos.md` |
| Legal | v8.1 | `WorkOS/02_Work/plataforma-modular/legal-modulos.md` |
| Plan de implementación | v3.3 FINAL | https://drive.google.com/file/d/1Tbn2ta_aos6IZ0jEEdGaJIJ13CF9A8GJ/view |
| Issue de Cursor | v3.3 FINAL | https://drive.google.com/file/d/1NCfiBcFpgMUp3L2DyVwZPw1sYmvwFLEl/view |

Si este repo contradice architecture rev. 17.1, manda la arquitectura.

## Decisiones de Lucas del 16/10/2026 que ya condicionan el código

- Planes `starter` / `pro` / `full`. El plan no activa módulos.
- Banner de solo lectura cerrable, reaparece a 15 días y deja de cerrarse a 7 días o menos.
- Aviso por email 15 días antes, activado.
- Sin Agenda no hay botón «Reservar». El CTA principal es WhatsApp. `site.reservar_cta_without_agenda` queda en `false`.
- TOTP en cada sesión de Lucas, sin recordar dispositivo.
- Cualquier usuario del mismo cliente puede bajar una exportación; otro cliente recibe 404.
- Recordatorio tardío o contacto manual mueven la fecha límite con la fórmula única de `getRetentionSchedule` (F5). Techo en el día 120. Provisional en el día 105.
- Backup propio de Storage fuera del plan.
- Gasto de F8a (~USD 45/mes) aprobado. F8b no arranca sin B5, B3-CMS, dominio verificado y contrato del piloto.
- Sin tabla `patients` en F0–F8.

## Estructura

La estructura de carpetas sigue architecture §8. F0 crea el esqueleto. Las rutas de panel, admin y acceso llegan en F1–F5.
