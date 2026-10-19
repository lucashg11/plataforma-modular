export async function register() {
  const { loadPlatformConfig } = await import("./lib/startup");
  loadPlatformConfig();
}
