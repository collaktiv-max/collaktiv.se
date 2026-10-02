import { Container } from "@/components/ui/Container";
import { TRAFFIC_OPERATOR } from "@/lib/config";
import { Eyebrow, SectionTitle } from "./shared";

const steps = [
  {
    title: "Köp din biljett",
    text: `Precis som vanligt i ${TRAFFIC_OPERATOR}s app.`,
  },
  {
    title: "Registrera din biljett",
    text: "Ange ditt biljettnummer i appen för att få resepoäng.",
  },
  {
    title: "Lös in dina resepoäng",
    text: "Byt resepoäng mot rabatter hos lokala företag.",
  },
];

// Stegen ritas som hållplatser längs en streckad busslinje – vågrät på
// dator, lodrät på mobil.
export function HowItWorks() {
  return (
    <section id="sa-funkar-det" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Så funkar det</Eyebrow>
          <SectionTitle>
            Enkelt, smart och <span className="text-[var(--color-brand-primary)]">hållbart</span>
          </SectionTitle>
          <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--color-brand-muted)] sm:text-lg">
            Att välja kollektivtrafiken ska löna sig. Det är alltid 100&nbsp;% gratis för dig som
            reser.
          </p>
        </div>

        <ol className="relative mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {/* Linjen mellan hållplatserna */}
          <div
            aria-hidden="true"
            className="absolute left-[22px] top-6 bottom-6 w-1 bg-[repeating-linear-gradient(180deg,var(--color-brand-primary)_0_12px,transparent_12px_20px)] opacity-30 md:left-[calc(100%/6)] md:right-[calc(100%/6)] md:top-[22px] md:bottom-auto md:h-1 md:w-auto md:bg-[repeating-linear-gradient(90deg,var(--color-brand-primary)_0_14px,transparent_14px_22px)]"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-[var(--color-brand-primary)] bg-white text-lg font-extrabold text-[var(--color-brand-primary)] tabular-nums">
                {i + 1}
              </span>
              <div className="pt-1 md:pt-0">
                <h3 className="text-xl font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 max-w-[30ch] text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-center text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-brand-muted)]">
          Alltid helt gratis för resenären · Inga dolda avgifter
        </p>
      </Container>
    </section>
  );
}
