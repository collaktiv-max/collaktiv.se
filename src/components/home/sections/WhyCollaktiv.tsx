import { Leaf, PiggyBank, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
import { WaitlistButton } from "../WaitlistButton";
import { SectionTitle, buttonArrow, primaryButton } from "./shared";

const wins = [
  { icon: PiggyBank, label: "För dig", text: "Du sparar pengar i vardagen." },
  { icon: Store, label: "För lokala företag", text: "Du stöttar det lokala näringslivet." },
  { icon: Leaf, label: "För miljön", text: "Du bidrar till ett mer hållbart samhälle." },
];

export function WhyCollaktiv() {
  return (
    <section className="bg-[var(--color-brand-secondary)] py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <SectionTitle flush>
            Varför <span className="text-[var(--color-brand-primary)]">Collaktiv?</span>
          </SectionTitle>
          <div className="mt-5 max-w-[60ch] space-y-4 text-base font-medium leading-relaxed text-[var(--color-brand-ink)]/80 sm:text-[17px]">
            <p>
              Collaktiv gör dina resor i kollektivtrafiken mer värdefulla – helt gratis. Varje gång
              du reser kollektivt samlar du resepoäng och byter dem mot rabatter hos lokala företag.
            </p>
            <p>
              Du sparar pengar i vardagen, stöttar det lokala näringslivet och bidrar till ett mer
              hållbart samhälle. Med Collaktiv blir varje resa en vinst – för dig, för miljön och
              för hela Gävleborg!
            </p>
          </div>
          <div className="mt-8">
            <WaitlistButton className={primaryButton}>
              Kom igång gratis
              {buttonArrow}
            </WaitlistButton>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-3">
            {wins.map(({ icon: Icon, label, text }) => (
              <li
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-[var(--color-brand-border)] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-primary)]/40 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[15.5px] font-bold">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
