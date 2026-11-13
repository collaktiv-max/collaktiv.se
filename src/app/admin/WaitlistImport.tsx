"use client";

import { useActionState, useState } from "react";
import { Upload } from "lucide-react";
import { PILOT_REGION } from "@/lib/config";
import { REGIONS } from "@/lib/regions";
import { parseImport } from "@/lib/relaunch-shared";
import { importToWaitlist } from "./actions";

// Lägger in adresser i väntelistan som om de anmält sig på collaktiv.se.
export function WaitlistImport() {
  const [result, action, pending] = useActionState(importToWaitlist, null);
  const [text, setText] = useState("");
  const count = parseImport(text).length;

  return (
    <details className="group rounded-2xl bg-white p-6 shadow-sm">
      <summary className="cursor-pointer list-none text-lg font-extrabold marker:hidden">
        <span className="mr-2 inline-block transition group-open:rotate-90">›</span>
        Lägg till adresser i väntelistan
      </summary>
      <p className="mt-2 text-sm font-medium text-[var(--color-brand-muted)]">
        Klistra in en lista med adresser eller en CSV-export (Namn, E-post, Samtycke gavs). De läggs
        in som anmälda via collaktiv.se. Finns ett datum på raden används det som anmälningsdatum.
        Dubbletter i samma region hoppas över.
      </p>
      <form
        action={(fd) => {
          action(fd);
          setText("");
        }}
        className="mt-4 space-y-3"
      >
        <label className="block text-sm font-bold">
          Region
          <select
            name="region"
            defaultValue={PILOT_REGION}
            className="mt-1 block w-full rounded-full border border-[var(--color-brand-border)] bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-[var(--color-brand-primary)] sm:w-64"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
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
              {result.error ??
                `${result.added} nya sparade${
                  result.found > result.added ? `, ${result.found - result.added} fanns redan` : ""
                }.`}
            </p>
          )}
        </div>
      </form>
    </details>
  );
}
