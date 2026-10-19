# Evidencia F0

Fecha: 19/10/2026. Máquina local sin Docker: `supabase db reset` no se pudo correr acá. La misma migración, el seed y las aserciones SQL corrieron en PGlite (Postgres embebido) con `pnpm test`. La CI (`.github/workflows/ci.yml`) corre `supabase db reset` cuando hay un PR; ese job todavía no se ejecutó porque el repo no tiene remoto.

## Comandos locales

`pnpm lint` — sin hallazgos.

`pnpm typecheck` (`next typegen && tsc --noEmit`) — sin errores.

`pnpm test` — 4 archivos, 11 tests, todos verdes. Incluye:

- un tenant por plan (`starter`, `pro`, `full`)
- plan inválido rechazado
- `anon` y `authenticated` leen 0 filas y no pueden insertar (RLS sin políticas)
- el seed no trae el stub de Agenda
- el fixture deja `pro` en `read_only` y `full` en `deleted`, y `starter` sigue solo con CMS

`pnpm secrets` (secretlint) — sin hallazgos.

`pnpm build` — Next.js 16.4.2, compiló y generó `/[[...slug]]`.

La home en `http://localhost:3000/` muestra «Plataforma modular» y «Entorno local. Sin datos de clientes.», `lang="es"`.

## Árbol

```
app/(site)/[[...slug]]
app/(panel)/panel
app/(admin)/admin
app/(auth)/entrar/codigo
app/(auth)/entrar/vencido
app/api/cron/module-lifecycle
app/api/export
components/{ui,nav,editor,admin,site}
modules/{registry.ts,cms,agenda}
lib/{plans.ts,startup.ts,tenant,supabase,publish,export,audit,events}
config/{retention.ts,flags.ts}
copy/es-AR.ts
styles/tokens.css
supabase/migrations/20261019120000_tenants.sql
supabase/seed.sql
supabase/tests/seed_plans.test.sql
supabase/tests/fixtures/agenda-stub.sql
tests/unit
tests/e2e
docs/architecture.md
.github/workflows/ci.yml
```

## Seed

| Tenant | Plan | CMS | Agenda |
|---|---|---|---|
| Taller Norte | starter | active | no |
| Estudio Sur | pro | active | stub `read_only` solo con `ENABLE_TEST_MODULES=true` |
| Casa Centro | full | active | stub `deleted` solo con `ENABLE_TEST_MODULES=true` |
