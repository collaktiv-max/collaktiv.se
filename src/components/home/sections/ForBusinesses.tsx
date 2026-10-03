import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
import { PORTAL_URL } from "@/lib/config";
import { Eyebrow, SectionTitle, buttonArrow, whiteButton } from "./shared";

const benefits = [
  "Nya, lokala kunder direkt in i butiken.",
  "Bestäm själva ert erbjudande utifrån vad som passar er.",
  "Var med och forma en mer hållbar region.",
];

export function ForBusinesses() {
  return (
    <section id="for-foretag">
      <Container>
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] bg-[var(--color-brand-primary)] p-7 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
            <div>
              <Eyebrow light>För lokala företag</Eyebrow>
              <SectionTitle>Driver du ett lokalt företag i Gävleborg?</SectionTitle>
              <p className="mt-4 max-w-[58ch] text-base font-medium leading-relaxed text-white/85">
                Få mätbar kundtrafik direkt till din kassa och syns för tusentals aktiva resenärer.
                Med vår självservice registrerar du ditt företag och lägger upp erbjudanden på under
                5 minuter – helt utan krångliga tekniska integrationer.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)] text-[var(--color-brand-ink)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                    </span>
                    <span className="text-[15.5px] font-bold">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {PORTAL_URL ? (
                  <a href={PORTAL_URL} className={whiteButton}>
                    Läs mer för företag
                    {buttonArrow}
                  </a>
                ) : (
                  <Link href="/kontakt" className={whiteButton}>
                    Läs mer för företag
                    {buttonArrow}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
