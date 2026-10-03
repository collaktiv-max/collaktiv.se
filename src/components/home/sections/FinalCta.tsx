import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
import { WaitlistButton } from "../WaitlistButton";
import { SectionTitle, buttonArrow, primaryButton } from "./shared";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="text-center">
        <Reveal>
          <SectionTitle flush className="mx-auto max-w-2xl">
            Redo att börja samla <span className="text-[var(--color-brand-primary)]">poäng?</span>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--color-brand-muted)] sm:text-lg">
            Ladda ner appen, skapa konto gratis på under en minut och gör din nästa resa i Gävleborg
            lite mer värdefull.
          </p>
          <div className="mt-8">
            <WaitlistButton className={primaryButton}>
              Kom igång gratis
              {buttonArrow}
            </WaitlistButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
