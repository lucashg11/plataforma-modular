# Plataforma modular

MVP de sitio público y CMS, multi-tenant por hostname. Un solo deploy. Esta base es F0: todavía no hay acceso, editor ni ciclo de vida.

Fuentes congeladas: [docs/architecture.md](docs/architecture.md).

## Requisitos

- Node.js 24
- pnpm 12
- Docker, solo para `supabase db reset` (el CLI local no arranca Postgres sin Docker)

## Comandos

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm secrets
pnpm build
```

Con Docker:

```bash
pnpm exec supabase db start
pnpm db:reset
pnpm db:assert-seed
pnpm exec supabase test db supabase/tests/seed_plans.test.sql
ENABLE_TEST_MODULES=true pnpm db:fixtures
```

`pnpm db:reset` carga tres tenants ficticios, uno por plan (`starter`, `pro`, `full`), con CMS activo. El stub de Agenda no entra en ese seed. Solo se aplica con `ENABLE_TEST_MODULES=true`.

Los plazos de retención viven en `config/retention.ts`. El flag `site.reservar_cta_without_agenda` vive en `config/flags.ts` y está apagado. Ninguno de los dos es una variable de entorno.

## Alcance de esta fase

F0 deja el repo, la CI, el esquema inicial y el seed. F1 a F8 no están implementadas. F8b sigue bloqueada hasta B5, B3-CMS, dominio verificado y contrato del piloto.

## Evidencia F0

`supabase db reset --local` corrió en el job `database` del run [39334552519](https://github.com/lucashg11/plataforma-modular/actions/runs/39334552519) (19/10/2026, rama `fix/f0-qa`). Esta máquina no tiene Docker.

```
Resetting local database...
Recreating database...
Initialising schema...
Seeding globals from roles.sql...
Applying migration 20261019120000_tenants.sql...
Seeding data from supabase/seed.sql...
Restarting containers...
Finished supabase db reset on branch fix/f0-qa.
```

El mismo job siguió así:

```
supabase db query --local -f scripts/assert-seed.sql
DO

supabase db query --local -f scripts/assert-no-agenda-stub.sql
DO

supabase test db supabase/tests/seed_plans.test.sql
supabase/tests/seed_plans.test.sql .. ok
All tests successful.
Files=1, Tests=10,  1 wallclock secs ( 0.01 usr + 0.00 sys = 0.01 CPU)
Result: PASS

ENABLE_TEST_MODULES=true pnpm db:fixtures
$ node scripts/apply-test-fixtures.mjs
INSERT 0 2

supabase db query --local -f scripts/assert-agenda-stub.sql
DO
```

`verify` y `database` terminaron en verde en ese run. El stub de Agenda entra solo con `ENABLE_TEST_MODULES=true` (`INSERT 0 2`: `pro` en `read_only`, `full` en `deleted`).
