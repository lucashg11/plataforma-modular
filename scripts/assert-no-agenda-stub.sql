do $$
begin
  if exists (select 1 from public.module_contracts where module = 'agenda') then
    raise exception 'agenda stub must stay unloaded unless ENABLE_TEST_MODULES=true';
  end if;
end
$$;
