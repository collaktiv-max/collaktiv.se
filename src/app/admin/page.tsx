import { redirect } from "next/navigation";
import { Download, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { isAdmin } from "@/lib/admin-auth";
import { getAllRegionInterest, type RegionInterest } from "@/lib/region-interest-db";
import { PILOT_REGION } from "@/lib/config";
import { logout } from "./actions";
import { EntriesTable } from "./EntriesTable";

function summarize(entries: RegionInterest[]) {
  const perRegion = new Map<string, number>();
  for (const e of entries) perRegion.set(e.region, (perRegion.get(e.region) ?? 0) + 1);
  const regionCounts = [...perRegion.entries()].sort((a, b) => b[1] - a[1]);
  const max = regionCounts[0]?.[1] ?? 0;

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const lastWeek = entries.filter((e) => Date.parse(e.createdAt) > weekAgo).length;
  const pilot = perRegion.get(PILOT_REGION) ?? 0;

  const stats = [
    { label: "Anmälda totalt", value: entries.length },
    { label: "Senaste 7 dagarna", value: lastWeek },
    { label: PILOT_REGION, value: pilot },
    { label: "Andra regioner", value: entries.length - pilot },
  ];

  return { stats, regionCounts, max };
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const entries = await getAllRegionInterest();

  const { stats, regionCounts, max } = summarize(entries);

  return (
    <>
      <header className="border-b border-[var(--color-brand-border)] bg-white">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full bg-[var(--color-brand-primary)]/10 px-2.5 py-1 text-xs font-extrabold text-[var(--color-brand-primary)]">
              Admin
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[var(--color-brand-muted)] transition hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-brand-ink)]"
            >
              <LogOut className="h-4 w-4" />
              Logga ut
            </button>
          </form>
        </Container>
      </header>

      <main className="py-10">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Väntelista</h1>
              <p className="mt-1 text-[15px] font-medium text-[var(--color-brand-muted)]">
                Resenärer som anmält sig via collaktiv.se.
              </p>
            </div>
            <a
              href="/admin/export"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[var(--color-brand-primary-hover)]"
            >
              <Download className="h-4 w-4" />
              Ladda ner CSV
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm">
                <dt className="text-sm font-bold text-[var(--color-brand-muted)]">{s.label}</dt>
                <dd className="mt-1 text-3xl font-extrabold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold">Per region</h2>
              {regionCounts.length === 0 ? (
                <p className="mt-3 text-[15px] font-medium text-[var(--color-brand-muted)]">
                  Inga anmälningar än.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {regionCounts.map(([region, count]) => (
                    <li key={region}>
                      <div className="flex justify-between text-sm font-bold">
                        <span>{region}</span>
                        <span className="tabular-nums">{count}</span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-[var(--color-brand-secondary)]">
                        <div
                          className="h-2 rounded-full bg-[var(--color-brand-primary)]"
                          style={{ width: `${(count / max) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <EntriesTable entries={entries} />
          </div>
        </Container>
      </main>
    </>
  );
}
