"use client";

import { useActionState, useState, useTransition } from "react";
import { Upload } from "lucide-react";
import { parseImport } from "@/lib/relaunch-shared";
import { clearAllRelaunchUsers, importRelaunchUsers } from "./actions";

const lists = [
  {
    value: "info",
    label: "Utan samtycke",
    hint: "Får bara informationsmail.",
  },
  {
    value: "consent",
    label: "Har godkänt utskick",
    hint: "Får nyheter och erbjudanden. Finns adressen redan utan samtycke flyttas den hit.",
  },
] as const;

export function ImportForm({ hasUsers }: { hasUsers: boolean }) {
  const [result, action, pending] = useActionState(importRelaunchUsers, null);
  const [text, setText] = useState("");
  const [list, setList] = useState<(typeof lists)[number]["value"]>("info");
  const [clearing, startClear] = useTransition();
  const count = parseImport(text).length;

  function handleClear() {
    if (!confirm("Ta bort alla adresser i båda listorna? Det går inte att ångra.")) return;
    startClear(() => clearAllRelaunchUsers());
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">Lägg till adresser</h2>
      <p className="mt-1 text-sm font-medium text-[var(--color-brand-muted)]">
        Klistra in en lista med adresser eller en CSV-export (Namn, E-post, Samtycke gavs).
        Dubbletter hoppas över. Adresserna sparas i databasen, inte i koden.
      </p>
      <form
        action={(fd) => {
          action(fd);
          setText("");
        }}
        className="mt-4 space-y-3"
      >
        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="sr-only">Vilken lista?</legend>
          {lists.map((l) => (
            <label
              key={l.value}
              className={`flex cursor-pointer gap-3 rounded-2xl border p-3 transition ${
                list === l.value
                  ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5"
                  : "border-[var(--color-brand-border)]"
              }`}
            >
              <input
                type="radio"
                name="list"
                value={l.value}
                checked={list === l.value}
                onChange={() => setList(l.value)}
                className="mt-1 h-4 w-4 accent-[var(--color-brand-primary)]"
              />
              <span>
                <span className="block text-sm font-extrabold">{l.label}</span>
                <span className="block text-xs font-semibold text-[var(--color-brand-muted)]">
                  {l.hint}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
        <label className="block">
          <span className="sr-only">E-postadresser</span>
          <textarea
            name="emails"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="namn@exempel.se"
            className="w-full rounded-2xl border border-[var(--color-brand-border)] p-4 font-mono text-sm outline-none focus:border-[var(--color-brand-primary)]"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending || count === 0}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-[var(--color-brand-primary-hover)] disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {pending ? "Sparar…" : count > 0 ? `Lägg till ${count} adresser` : "Lägg till"}
          </button>
          {result && (
            <p role="status" className="text-sm font-bold">
              {result.added} nya sparade
              {result.upgraded > 0 && `, ${result.upgraded} flyttade till samtycke`}
              {result.unchanged > 0 && `, ${result.unchanged} fanns redan`}.
            </p>
          )}
          {hasUsers && (
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing}
              className="ml-auto rounded-full px-3 py-2 text-sm font-bold text-[var(--color-brand-muted)] transition hover:bg-red-50 hover:text-red-700"
            >
              Töm listorna
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
