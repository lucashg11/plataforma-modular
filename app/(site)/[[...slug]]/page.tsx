import { copy } from "@/copy/es-AR";

export default function SitePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{copy.site.title}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{copy.site.description}</p>
    </main>
  );
}
