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
