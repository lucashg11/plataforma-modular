begin;

create extension if not exists pgtap with schema extensions;

select plan(10);

select has_table('public', 'tenants', 'tenants exists');
select has_table('public', 'module_contracts', 'module_contracts exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.tenants'::regclass),
  'RLS is enabled on tenants'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.module_contracts'::regclass),
  'RLS is enabled on module_contracts'
);

select is(
  (select count(*)::int from public.tenants),
  3,
  'seed loads 3 fictional tenants'
);

select results_eq(
  $$select plan from public.tenants order by plan$$,
  array['full', 'pro', 'starter'],
  'one tenant per plan'
);

set local role anon;

select is_empty(
  'select id from public.tenants',
  'anon reads zero tenants'
);

select throws_ok(
  $$insert into public.tenants (name, slug, plan) values ('Intruso', 'intruso-anon', 'starter')$$,
  '42501',
  NULL,
  'anon cannot insert a tenant'
);

set local role authenticated;

select is_empty(
  'select id from public.tenants',
  'authenticated reads zero tenants'
);

select throws_ok(
  $$insert into public.tenants (name, slug, plan) values ('Intruso', 'intruso-auth', 'starter')$$,
  '42501',
  NULL,
  'authenticated cannot insert a tenant'
);

select * from finish();

rollback;
