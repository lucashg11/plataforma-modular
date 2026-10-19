do $$
declare
  tenant_count int;
  starter_count int;
  pro_count int;
  full_count int;
  cms_count int;
begin
  select count(*) into tenant_count from public.tenants;
  select count(*) into starter_count from public.tenants where plan = 'starter';
  select count(*) into pro_count from public.tenants where plan = 'pro';
  select count(*) into full_count from public.tenants where plan = 'full';
  select count(*) into cms_count
  from public.module_contracts
  where module = 'cms' and state = 'active';

  if tenant_count <> 3 or starter_count <> 1 or pro_count <> 1 or full_count <> 1 then
    raise exception
      'expected 1 tenant per plan, got tenants=% starter=% pro=% full=%',
      tenant_count, starter_count, pro_count, full_count;
  end if;

  if exists (select 1 from public.tenants where plan not in ('starter', 'pro', 'full')) then
    raise exception 'invalid plan in tenants';
  end if;

  if cms_count <> 3 then
    raise exception 'expected cms active on each fictional tenant, got %', cms_count;
  end if;
end
$$;
