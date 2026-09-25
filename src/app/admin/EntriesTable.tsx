"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Trash2 } from "lucide-react";
import type { RegionInterest } from "@/lib/region-interest-db";
import { removeEntry } from "./actions";

const dateFormat = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Stockholm",
});

export function EntriesTable({ entries }: { entries: RegionInterest[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [pending, startTransition] = useTransition();

  const regions = useMemo(() => [...new Set(entries.map((e) => e.region))].sort(), [entries]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => (!region || e.region === region) && (!q || e.email.includes(q)));
  }, [entries, query, region]);

  function handleDelete(entry: RegionInterest) {
    if (!confirm(`Ta bort ${entry.email} (${entry.region})? Det går inte att ångra.`)) return;
    startTransition(() => removeEntry(entry.id));
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            className="w-full rounded-full border border-[var(--color-brand-border)] py-2 pl-9 pr-4 text-sm font-semibold outline-none focus:border-[var(--color-brand-primary)] sm:w-52"
          />
        </label>
        <label>
          <span className="sr-only">Filtrera på region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-full border border-[var(--color-brand-border)] bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-[var(--color-brand-primary)] sm:w-auto"
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
              <th className="py-2.5 pr-4 font-bold">Region</th>
              <th className="py-2.5 pr-4 font-bold">Anmäld</th>
              <th className="py-2.5">
                <span className="sr-only">Åtgärder</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-[var(--color-brand-border)] last:border-0">
                <td className="py-3 pr-4 font-semibold break-all">{e.email}</td>
                <td className="py-3 pr-4 font-medium whitespace-nowrap">{e.region}</td>
                <td className="py-3 pr-4 font-medium whitespace-nowrap tabular-nums text-[var(--color-brand-muted)]">
                  {dateFormat.format(new Date(e.createdAt))}
                </td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(e)}
                    disabled={pending}
                    aria-label={`Ta bort ${e.email}`}
                    className="rounded-full p-2 text-[var(--color-brand-muted)] transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
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
