"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { FAQ, type FaqBlock, type FaqItem } from "@/lib/faq";

function Block({ block }: { block: FaqBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("heading" in block) {
    return (
      <p className="pt-1 text-[13px] font-extrabold uppercase tracking-[0.06em] text-[var(--color-brand-ink)]">
        {block.heading}
      </p>
    );
  }
  return (
    <ul className="list-disc space-y-1 pl-5 marker:text-[var(--color-brand-primary)]">
      {block.list.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ul>
  );
}

const blockText = (b: FaqBlock) =>
  typeof b === "string" ? b : "heading" in b ? b.heading : b.list.join(" ");

// NFKC gör t.ex. "CO₂" till "CO2" så att man hittar det när man söker "co2".
const normalize = (s: string) => s.normalize("NFKC").toLowerCase();

// Vanliga frågor med flikar per kategori och sökruta, så att man bara ser
// det man letar efter. Bara en fråga är öppen åt gången.
export function Faq() {
  const [category, setCategory] = useState(FAQ[0].category);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const q = normalize(query.trim());

  const shown = useMemo<(FaqItem & { category: string })[]>(() => {
    if (!q) {
      const group = FAQ.find((g) => g.category === category) ?? FAQ[0];
      return group.items.map((it) => ({ ...it, category: group.category }));
    }
    return FAQ.flatMap((g) =>
      g.items
        .filter((it) => normalize(it.q + " " + it.a.map(blockText).join(" ")).includes(q))
        .map((it) => ({ ...it, category: g.category })),
    );
  }, [q, category]);

  return (
    <div>
      {/* Sök */}
      <label className="relative block">
        <span className="sr-only">Sök bland frågorna</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-brand-muted)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök, t.ex. biljett-ID eller poäng"
          className="w-full rounded-full border border-[var(--color-brand-border)] bg-white py-3.5 pl-12 pr-12 text-[15px] font-semibold text-[var(--color-brand-ink)] outline-none placeholder:font-medium placeholder:text-[var(--color-brand-muted)]/70 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Rensa sökningen"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-brand-muted)] hover:bg-[var(--color-brand-secondary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>

      {/* Kategorier */}
      {!q && (
        <div
          role="tablist"
          aria-label="Kategorier"
          className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FAQ.map((g) => {
            const active = g.category === category;
            return (
              <button
                key={g.category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(g.category);
                  setOpen(null);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-[var(--color-brand-primary)] text-white"
                    : "border border-[var(--color-brand-border)] bg-white text-[var(--color-brand-ink)] hover:border-[var(--color-brand-primary)]"
                }`}
              >
                {g.category}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${
                    active ? "bg-white/20" : "bg-[var(--color-brand-secondary)]"
                  }`}
                >
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {q && (
        <p className="mt-4 text-sm font-semibold" aria-live="polite">
          {shown.length === 0
            ? "Inga frågor matchar din sökning."
            : `${shown.length} ${shown.length === 1 ? "fråga" : "frågor"} matchar din sökning.`}
        </p>
      )}

      {/* Frågor – bara en öppen åt gången */}
      {shown.length > 0 && (
        <div
          role="tabpanel"
          className="mt-4 divide-y divide-[var(--color-brand-border)] overflow-hidden rounded-2xl border border-[var(--color-brand-border)] bg-white"
        >
          {shown.map(({ q: question, a, category: cat }) => {
            const isOpen = open === question;
            const id = `faq-${question.replace(/[^a-z0-9]+/gi, "-")}`;
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : question)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15.5px] font-bold text-[var(--color-brand-ink)] transition-colors hover:bg-[var(--color-brand-secondary)] focus-visible:bg-[var(--color-brand-secondary)] focus-visible:outline-none"
                  >
                    <span>
                      {q && (
                        <span className="mb-0.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
                          {cat}
                        </span>
                      )}
                      {question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[var(--color-brand-primary)] transition-transform duration-200 motion-reduce:transition-none ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={id}
                    className="space-y-3 px-5 pb-5 text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)] animate-fade-in"
                  >
                    {a.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
