-- Fictional tenants, one per plan. No real client data.
-- CMS is active on each tenant. The agenda stub is not in this file:
-- apply supabase/tests/fixtures/agenda-stub.sql only when ENABLE_TEST_MODULES=true.

insert into public.tenants (id, name, slug, plan, status)
values
  ('11111111-1111-4111-8111-111111111111', 'Taller Norte', 'taller-norte', 'starter', 'active'),
  ('22222222-2222-4222-8222-222222222222', 'Estudio Sur', 'estudio-sur', 'pro', 'active'),
  ('33333333-3333-4333-8333-333333333333', 'Casa Centro', 'casa-centro', 'full', 'active');

insert into public.module_contracts (id, tenant_id, module, state, activated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'cms', 'active', timestamptz '2026-10-19 12:00:00+00'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2', '22222222-2222-4222-8222-222222222222', 'cms', 'active', timestamptz '2026-10-19 12:00:00+00'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3', '33333333-3333-4333-8333-333333333333', 'cms', 'active', timestamptz '2026-10-19 12:00:00+00');
