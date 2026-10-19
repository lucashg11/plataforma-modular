do $$
begin
  if (
    select count(*)
    from public.module_contracts
    where module = 'agenda'
      and state = 'read_only'
      and tenant_id = '22222222-2222-4222-8222-222222222222'
  ) <> 1 then
    raise exception 'expected the pro tenant agenda stub in read_only';
  end if;

  if (
    select count(*)
    from public.module_contracts
    where module = 'agenda'
      and state = 'deleted'
      and tenant_id = '33333333-3333-4333-8333-333333333333'
  ) <> 1 then
    raise exception 'expected the full tenant agenda stub in deleted';
  end if;

  if exists (
    select 1
    from public.module_contracts
    where module = 'agenda'
      and tenant_id = '11111111-1111-4111-8111-111111111111'
  ) then
    raise exception 'starter tenant must stay CMS-only';
  end if;
end
$$;
