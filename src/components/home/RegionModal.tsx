"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REGIONS } from "@/lib/regions";

type Status = "idle" | "sending" | "done" | "error";

export function RegionModal({
  open,
  onClose,
  initialRegion = "",
  title,
  intro,
}: {
  open: boolean;
  onClose: () => void;
  initialRegion?: string;
  title: string;
  intro: string;
}) {
  const [region, setRegion] = useState(initialRegion);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setRegion(initialRegion);
      setStatus("idle");
      setError("");
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialRegion]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/regionintresse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region, email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Något gick fel. Försök igen.");
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel. Försök igen.");
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Klick på bakgrunden (utanför rutan) stänger.
        if (e.target === dialogRef.current) onClose();
      }}
      aria-labelledby="region-modal-title"
      className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-3xl bg-white p-0 text-[var(--color-brand-ink)] shadow-2xl backdrop:bg-[var(--color-brand-ink)]/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-brand-muted)] transition hover:bg-[var(--color-brand-secondary)]"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "done" ? (
          <div className="py-4 text-center animate-fade-in">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]">
              <Check className="h-6 w-6" strokeWidth={3} />
            </span>
            <h2 className="mt-4 text-xl font-extrabold">Tack, du är anmäld!</h2>
            <p className="mt-2 text-[15px] font-medium text-[var(--color-brand-muted)]">
              Vi hör av oss när Collaktiv startar i {region}.
            </p>
            <Button onClick={onClose} className="mt-6 w-full">
              Stäng
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id="region-modal-title" className="pr-8 text-xl font-extrabold leading-tight">
              {title}
            </h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
              {intro}
            </p>

            <label className="mt-6 block text-sm font-bold" htmlFor="region">
              Din region
            </label>
            <select
              id="region"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-brand-border)] bg-white px-4 py-3 text-[15px] font-semibold outline-none focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20"
            >
              <option value="" disabled>
                Välj region
              </option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-sm font-bold" htmlFor="email">
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="namn@exempel.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-brand-border)] px-4 py-3 text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-[var(--color-brand-muted)]/70 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20"
            />

            {error && (
              <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "sending"}>
              {status === "sending" ? "Skickar…" : "Meddela mig"}
            </Button>
            <p className="mt-3 text-center text-xs font-medium text-[var(--color-brand-muted)]">
              Vi använder bara din e-post för att meddela dig när vi startar.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
