"use client";

import { useActionState, useState, useTransition } from "react";
import { Upload } from "lucide-react";
import { extractEmails } from "@/lib/relaunch-shared";
import { clearAllRelaunchUsers, importRelaunchUsers } from "./actions";

export function ImportForm({ hasUsers }: { hasUsers: boolean }) {
  const [result, action, pending] = useActionState(importRelaunchUsers, null);
  const [text, setText] = useState("");
  const [clearing, startClear] = useTransition();
  const count = extractEmails(text).length;

  function handleClear() {
    if (!confirm("Ta bort hela listan? Det går inte att ångra.")) return;
    startClear(() => clearAllRelaunchUsers());
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">Lägg till adresser</h2>
      <p className="mt-1 text-sm font-medium text-[var(--color-brand-muted)]">
        Klistra in listan – en adress per rad, eller hur den än är formaterad. Dubbletter hoppas
        över. Adresserna sparas i databasen, inte i koden.
      </p>
      <form
        action={(fd) => {
          action(fd);
          setText("");
        }}
        className="mt-4 space-y-3"
      >
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
              {result.duplicates > 0 && `, ${result.duplicates} fanns redan`}.
            </p>
          )}
          {hasUsers && (
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing}
              className="ml-auto rounded-full px-3 py-2 text-sm font-bold text-[var(--color-brand-muted)] transition hover:bg-red-50 hover:text-red-700"
            >
              Töm listan
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
