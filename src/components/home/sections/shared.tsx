import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

// Gemensamma byggstenar för sektionerna under heron.

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] ${
        light
          ? "bg-white/10 text-[var(--color-brand-accent)]"
          : "bg-[var(--color-brand-mint)] text-[var(--color-brand-primary-hover)]"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className = "",
  flush,
}: {
  children: ReactNode;
  className?: string;
  /** Utan marginal ovanför (när rubriken inte har en etikett över sig). */
  flush?: boolean;
}) {
  return (
    <h2
      className={`${flush ? "" : "mt-3"} text-[1.9rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[2.6rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export const primaryButton =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand-primary)] px-7 py-4 text-base font-bold text-white shadow-sm shadow-[var(--color-brand-primary)]/20 transition hover:bg-[var(--color-brand-primary-hover)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand-accent)]";

export const whiteButton =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-base font-bold text-[var(--color-brand-primary)] transition hover:bg-[var(--color-brand-mint)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand-accent)]";

export const buttonArrow = (
  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transition-none" />
);
