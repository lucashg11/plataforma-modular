-- F0 tenancy base.
-- RLS is deny-by-default: no policies yet. F1 adds helpers and policies.
-- No patients table (S-05). The agenda stub is not created here.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end
$$;

grant usage on schema public to anon, authenticated;

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'full')),
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now()
);

create table public.module_contracts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id),
  module text not null check (module in ('cms', 'agenda', 'crm')),
  state text not null check (state in ('active', 'read_only', 'pending_deletion', 'deleted')),
  activated_at timestamptz,
  deactivated_at timestamptz,
  retention_until timestamptz,
  deleted_at timestamptz,
  updated_by uuid,
  updated_at timestamptz not null default now(),
  unique (tenant_id, module)
);

alter table public.tenants enable row level security;
alter table public.module_contracts enable row level security;

grant select, insert, update, delete on public.tenants to anon, authenticated;
grant select, insert, update, delete on public.module_contracts to anon, authenticated;
