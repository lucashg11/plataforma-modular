export type ModuleId = "cms" | "agenda" | "crm";

export type ModuleDefinition = {
  id: ModuleId;
  routes: readonly string[];
  tables: readonly string[];
};

/**
 * Agenda is not registered. The lifecycle stub lives only in
 * supabase/tests/fixtures/agenda-stub.sql and is applied when
 * ENABLE_TEST_MODULES=true. The production build does not import it.
 */
export const moduleRegistry: readonly ModuleDefinition[] = [
  { id: "cms", routes: [], tables: [] },
];
