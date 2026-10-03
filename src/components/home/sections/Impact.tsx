import { Award, Medal, Star, Trophy, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "../CountUp";
import { Reveal } from "../Reveal";
import { Eyebrow, SectionTitle } from "./shared";

// Siffrorna kommer från piloten i Gävle våren 2026 (samma som i
// företagsportalen). Byt eller lägg till nyckeltal här. Tre små rutor
// ligger på en rad och "wide" tar hela bredden under dem.
const stats: { value: string; unit: string; desc: string; wide?: boolean; mobileWide?: boolean }[] =
  [
    { value: "18", unit: "företag", desc: "i Gävle har redan valt Collaktiv" },
    { value: "800", unit: "resenärer", desc: "Registrerade sig inom några veckor" },
    {
      value: "40+",
      unit: "inlösta erbjudanden",
      desc: "Hos lokala företag i Gävle",
      mobileWide: true,
    },
    {
      value: "200 000+",
      unit: "människor nådda",
      desc: "Via Gefle Dagblad, P4 Gävleborg och sociala medier",
      wide: true,
    },
  ];

const awards: { icon: LucideIcon; text: string }[] = [
  { icon: Trophy, text: "Årets bästa UF-företag – Gävleborg & Gävle stad" },
  { icon: Medal, text: "Andraplats – Bästa tjänst" },
  { icon: Award, text: "Tredjeplats – Årets innovation" },
  { icon: Star, text: "Kvalificering till SM för bästa företag" },
];

// Collaktiv UF och piloten i Gävle: text, siffror och utmärkelser.
export function Impact() {
  return (
    <section id="collaktiv-uf" className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Collaktiv UF</Eyebrow>
          <SectionTitle>
            Piloten i <span className="text-[var(--color-brand-primary)]">Gävle</span>
          </SectionTitle>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-brand-muted)] sm:text-[17px]">
            Våren 2026 lanserade Collaktiv UF en 3 månaders lång pilot av tjänsten i Gävle stad.
            Uppskattningen och feedbacken var enorm. Nu siktar vi större, fler användare, fler
            företag, i en regionalt satsad lansering av Collaktiv.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-5">
          <Reveal>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((s) => (
                <li
                  key={s.unit}
                  className={`rounded-3xl border border-[var(--color-brand-border)] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-primary)]/40 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6 ${
                    s.wide
                      ? "col-span-2 sm:col-span-3"
                      : s.mobileWide
                        ? "col-span-2 sm:col-span-1"
                        : ""
                  }`}
                >
                  <p className="whitespace-nowrap text-[2rem] font-extrabold leading-none tracking-tight text-[var(--color-brand-primary)] tabular-nums sm:text-[2.3rem]">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2.5 text-[15px] font-extrabold sm:text-[17px]">{s.unit}</p>
                  <p className="mt-1 text-[13.5px] font-medium leading-snug text-[var(--color-brand-muted)] sm:text-[15px]">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-3xl bg-[var(--color-brand-ink)] p-6 text-white sm:p-8">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
                Utmärkelser
              </h3>
              <ul className="mt-5 grid flex-1 content-around gap-4">
                {awards.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/15 text-[var(--color-brand-accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] font-bold leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
