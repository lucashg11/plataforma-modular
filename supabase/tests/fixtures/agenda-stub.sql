-- Agenda lifecycle stub. Local and CI only, when ENABLE_TEST_MODULES=true.
-- Neutral columns are not created here: this row only marks contract state.
-- Pro tenant: read_only. Full tenant: deleted. Starter stays CMS-only.

insert into public.module_contracts (id, tenant_id, module, state, activated_at, deactivated_at, deleted_at)
values
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
    '22222222-2222-4222-8222-222222222222',
    'agenda',
    'read_only',
    timestamptz '2026-01-01 12:00:00+00',
    timestamptz '2026-06-01 12:00:00+00',
    null
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
    '33333333-3333-4333-8333-333333333333',
    'agenda',
    'deleted',
    timestamptz '2025-01-01 12:00:00+00',
    timestamptz '2025-06-01 12:00:00+00',
    timestamptz '2025-09-01 06:00:00+00'
  )
on conflict (tenant_id, module) do nothing;
