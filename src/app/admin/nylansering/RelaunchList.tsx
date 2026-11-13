"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Copy, Search, Trash2 } from "lucide-react";
import type { RelaunchUser } from "@/lib/relaunch-db";
import { FLAG_LABEL, flagEmail } from "@/lib/relaunch-shared";
import { removeRelaunchUser } from "./actions";

export function RelaunchList({ users }: { users: RelaunchUser[] }) {
  const [query, setQuery] = useState("");
  const [onlyFlagged, setOnlyFlagged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const flagged = useMemo(
    () => new Map(users.map((u) => [u.email, flagEmail(u.email)] as const).filter(([, f]) => f)),
    [users],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) => (!q || u.email.includes(q)) && (!onlyFlagged || flagged.has(u.email)),
    );
  }, [users, query, onlyFlagged, flagged]);

  async function copyAll() {
    await navigator.clipboard.writeText(users.map((u) => u.email).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDelete(email: string) {
    if (!confirm(`Ta bort ${email} från listan?`)) return;
    startTransition(() => removeRelaunchUser(email));
  }

  return (
    <section className="min-w-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="sm:mr-auto">
          <h2 className="text-lg font-extrabold">Användare utan samtycke till utskick</h2>
          <p className="mt-0.5 text-sm font-bold text-amber-800">Endast informationsmail</p>
        </div>
        {users.length > 0 && (
          <>
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
            <button
              type="button"
              onClick={copyAll}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-brand-border)] px-4 py-2 text-sm font-bold transition hover:bg-[var(--color-brand-secondary)]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Kopierat" : "Kopiera alla"}
            </button>
          </>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[var(--color-brand-secondary)] p-4">
          <dt className="text-sm font-bold text-[var(--color-brand-muted)]">Antal</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums">{users.length}</dd>
        </div>
        <div className="rounded-2xl bg-[var(--color-brand-secondary)] p-4">
          <dt className="text-sm font-bold text-[var(--color-brand-muted)]">Att kontrollera</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums">{flagged.size}</dd>
        </div>
      </dl>

      {users.length === 0 ? (
        <p className="mt-4 text-[15px] font-medium text-[var(--color-brand-muted)]">
          Listan är tom. Klistra in adresserna nedan.
        </p>
      ) : (
        <>
          {flagged.size > 0 && (
            <label className="mt-4 flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={onlyFlagged}
                onChange={(e) => setOnlyFlagged(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-brand-primary)]"
              />
              Visa bara adresser att kontrollera (felstavade eller testadresser)
            </label>
          )}
          <p className="mt-3 text-xs font-semibold text-[var(--color-brand-muted)] tabular-nums">
            Visar {rows.length} av {users.length}
          </p>
          <ul
            className={`mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3 ${pending ? "opacity-60" : ""}`}
          >
            {rows.map((u) => {
              const flag = flagged.get(u.email);
              return (
                <li
                  key={u.email}
                  className="flex min-w-0 items-center justify-between gap-2 border-b border-[var(--color-brand-border)] py-2"
                >
                  <span className="min-w-0 text-sm font-semibold [overflow-wrap:anywhere]">
                    {u.email}
                    {flag && (
                      <span className="ml-2 inline-block rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-red-700">
                        {FLAG_LABEL[flag]}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(u.email)}
                    disabled={pending}
                    aria-label={`Ta bort ${u.email}`}
                    className="shrink-0 rounded-full p-1.5 text-[var(--color-brand-muted)] transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
