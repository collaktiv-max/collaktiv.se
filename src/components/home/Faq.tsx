import { ChevronDown } from "lucide-react";
import { FAQ, type FaqBlock } from "@/lib/faq";

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

// Frågor som fälls ut med <details>, så de fungerar utan JavaScript och
// går att söka i med webbläsarens sökfunktion.
export function Faq() {
  return (
    <div className="space-y-10">
      {FAQ.map(({ category, items }) => (
        <section key={category} aria-labelledby={`faq-${category}`}>
          <h3
            id={`faq-${category}`}
            className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-primary)]"
          >
            {category}
          </h3>
          <div className="mt-3 divide-y divide-[var(--color-brand-border)] overflow-hidden rounded-2xl border border-[var(--color-brand-border)] bg-white">
            {items.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15.5px] font-bold text-[var(--color-brand-ink)] transition-colors hover:bg-[var(--color-brand-secondary)] focus-visible:bg-[var(--color-brand-secondary)] focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-brand-primary)] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="space-y-3 px-5 pb-5 text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
                  {a.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
