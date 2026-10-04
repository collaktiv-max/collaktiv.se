"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Trash2 } from "lucide-react";
import { SOURCE_LABEL, type AdminEntry, type EntrySource } from "@/lib/admin-entries-shared";
import { removeEntry } from "./actions";

const dateFormat = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Stockholm",
});

const badge: Record<EntrySource, string> = {
  collaktiv: "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]",
  vantelista: "bg-amber-100 text-amber-800",
};

const selectClass =
  "w-full rounded-full border border-[var(--color-brand-border)] bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-[var(--color-brand-primary)] sm:w-auto";

export function EntriesTable({ entries }: { entries: AdminEntry[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [source, setSource] = useState<"" | EntrySource>("");
  const [pending, startTransition] = useTransition();

  const regions = useMemo(
    () => [...new Set(entries.map((e) => e.region).filter((r): r is string => !!r))].sort(),
    [entries],
  );

  // E-postadresser som finns i båda insamlingarna.
  const inBoth = useMemo(() => {
    const bySource = new Map<string, Set<EntrySource>>();
    for (const e of entries) {
      if (!bySource.has(e.email)) bySource.set(e.email, new Set());
      bySource.get(e.email)!.add(e.source);
    }
    return new Set([...bySource].filter(([, s]) => s.size > 1).map(([email]) => email));
  }, [entries]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(
      (e) =>
        (!source || e.source === source) &&
        (!region || e.region === region) &&
        (!q || e.email.includes(q)),
    );
  }, [entries, query, region, source]);

  function handleDelete(entry: AdminEntry) {
    if (!confirm(`Ta bort ${entry.email} (${entry.region})? Det går inte att ångra.`)) return;
    startTransition(() => removeEntry(entry.id));
  }

  return (
    <section className="min-w-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <h2 className="text-lg font-extrabold sm:mr-auto">
          Anmälningar{" "}
          <span className="text-[var(--color-brand-muted)] tabular-nums">({rows.length})</span>
        </h2>
        <label className="relative">
          <span className="sr-only">Sök e-post</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-brand-muted)]" />
          <input
            type="search"
            placeholder="Sök e-post"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--color-brand-border)] py-2 pl-9 pr-4 text-sm font-semibold outline-none focus:border-[var(--color-brand-primary)] sm:w-48"
          />
        </label>
        <label>
          <span className="sr-only">Filtrera på källa</span>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as "" | EntrySource)}
            className={selectClass}
          >
            <option value="">Alla källor</option>
            <option value="collaktiv">{SOURCE_LABEL.collaktiv}</option>
            <option value="vantelista">{SOURCE_LABEL.vantelista}</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Filtrera på region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={selectClass}
          >
            <option value="">Alla regioner</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`mt-4 overflow-x-auto ${pending ? "opacity-60" : ""}`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-brand-border)] text-[var(--color-brand-muted)]">
              <th className="py-2.5 pr-4 font-bold">E-post</th>
              <th className="py-2.5 pr-4 font-bold">Källa</th>
              <th className="py-2.5 pr-4 font-bold">Region / svar</th>
              <th className="py-2.5 pr-4 font-bold">Anmäld</th>
              <th className="py-2.5">
                <span className="sr-only">Åtgärder</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr
                key={`${e.source}-${e.id}`}
                className="border-b border-[var(--color-brand-border)] align-top last:border-0"
              >
                <td className="py-3 pr-4 font-semibold [overflow-wrap:anywhere]">
                  {e.email}
                  {inBoth.has(e.email) && (
                    <span className="ml-2 inline-block rounded-full bg-[var(--color-brand-secondary)] px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-[var(--color-brand-muted)]">
                      finns i båda
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-extrabold whitespace-nowrap ${badge[e.source]}`}
                  >
                    {SOURCE_LABEL[e.source]}
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium">
                  {e.region ? (
                    <span className="whitespace-nowrap">{e.region}</span>
                  ) : e.contest ? (
                    <span className="block min-w-[14rem] text-[13px] leading-snug text-[var(--color-brand-muted)]">
                      Gissning:{" "}
                      <b className="text-[var(--color-brand-ink)]">{e.contest.busGuess}</b>
                      {" · "}Rabatt: {e.contest.rabatt}
                      {e.contest.localBusiness && <> · Lokalt: {e.contest.localBusiness}</>}
                    </span>
                  ) : null}
                </td>
                <td className="py-3 pr-4 font-medium whitespace-nowrap tabular-nums text-[var(--color-brand-muted)]">
                  {dateFormat.format(new Date(e.createdAt))}
                </td>
                <td className="py-3 text-right">
                  {e.source === "collaktiv" ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(e)}
                      disabled={pending}
                      aria-label={`Ta bort ${e.email}`}
                      className="rounded-full p-2 text-[var(--color-brand-muted)] transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span
                      className="block w-8"
                      title="Tävlingens anmälningar hanteras i väntelistans egen admin"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-8 text-center text-[15px] font-medium text-[var(--color-brand-muted)]">
            {entries.length === 0 ? "Inga anmälningar än." : "Inga träffar."}
          </p>
        )}
      </div>
    </section>
  );
}
