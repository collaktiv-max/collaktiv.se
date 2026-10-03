import {
  Award,
  Clock,
  Leaf,
  Medal,
  PiggyBank,
  Star,
  Store,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "../CountUp";
import { Reveal } from "../Reveal";
import { Eyebrow, SectionTitle } from "./shared";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Leaf,
    title: "Lägre utsläpp",
    text: "Buss och tåg släpper ut betydligt mindre koldioxid per resenär än bilen.",
  },
  {
    icon: Users,
    title: "Mindre trängsel",
    text: "Fler i samma fordon ger färre bilar i stan och mer plats för människor.",
  },
  {
    icon: PiggyBank,
    title: "Billigare i vardagen",
    text: "Inga kostnader för bränsle, parkering eller service – och med Collaktiv får du rabatter på köpet.",
  },
  {
    icon: Clock,
    title: "Tid för dig själv",
    text: "Läs, lyssna eller vila medan någon annan kör.",
  },
  {
    icon: Store,
    title: "Levande stadskärnor",
    text: "Resenärer rör sig till fots i stan och handlar hos lokala företag.",
  },
];

// Siffrorna kommer från piloten i Gävle våren 2026 (samma som i
// företagsportalen). Byt eller lägg till nyckeltal här.
const stats = [
  { value: "800", label: "resenärer" },
  { value: "18", label: "lokala företag" },
  { value: "40+", label: "inlösta erbjudanden" },
  { value: "200 000+", label: "människor nådda" },
];

const awards: { icon: LucideIcon; text: string }[] = [
  { icon: Trophy, text: "Årets bästa UF-företag – Gävleborg & Gävle stad" },
  { icon: Medal, text: "Andraplats – Bästa tjänst" },
  { icon: Award, text: "Tredjeplats – Årets innovation" },
  { icon: Star, text: "Kvalificering till SM för bästa företag" },
];

export function Impact() {
  return (
    <section className="bg-[var(--color-brand-primary)] py-16 text-white sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow light>Tillsammans</Eyebrow>
          <SectionTitle>
            Tillsammans gör vi <span className="text-[var(--color-brand-accent)]">skillnad!</span>
          </SectionTitle>
          <p className="mt-4 text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            Se vårt arbete i siffror! Tillsammans belönar vi resor i kollektivtrafiken, stärker
            lokala företag och minskar utsläppen – en resa i taget.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Fördelarna med att åka kollektivt */}
          <Reveal>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
              Därför lönar sig kollektivtrafiken
            </h3>
            <ul className="mt-5 grid gap-2">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="group flex gap-4 rounded-2xl p-3 transition-colors duration-200 hover:bg-white/[0.07] sm:p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--color-brand-accent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] motion-reduce:transition-none">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-extrabold">{title}</span>
                    <span className="mt-0.5 block text-[14.5px] font-medium leading-relaxed text-white/75">
                      {text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Collaktiv UF */}
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-[var(--color-brand-ink)] p-6 sm:p-9">
              <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
                Collaktiv UF · Piloten i Gävle
              </span>
              <p className="mt-3 text-[15.5px] font-medium leading-relaxed text-white/85">
                Våren 2026 lanserade Collaktiv UF en 3 månaders lång pilot av tjänsten i Gävle stad.
                Uppskattningen och feedbacken var enorm. Nu siktar vi större, fler användare, fler
                företag, i en regionalt satsad lansering av Collaktiv.
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white/[0.06] p-4 transition-colors duration-200 hover:bg-white/10"
                  >
                    <dd className="whitespace-nowrap text-[1.6rem] font-extrabold leading-none tracking-tight text-[var(--color-brand-accent)] tabular-nums sm:text-[2rem]">
                      <CountUp value={s.value} />
                    </dd>
                    <dt className="mt-1.5 text-[13px] font-bold text-white/80">{s.label}</dt>
                  </div>
                ))}
              </dl>

              <h3 className="mt-8 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
                Utmärkelser
              </h3>
              <ul className="mt-4 grid gap-3">
                {awards.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/15 text-[var(--color-brand-accent)]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[14.5px] font-bold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mx-auto mt-14 max-w-3xl text-center text-xl font-extrabold leading-snug tracking-tight text-balance sm:text-2xl">
            ”Varje resa i kollektivtrafiken räknas – tillsammans mot ett grönare Gävleborg!”
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-semibold leading-relaxed text-white/60">
            Med grunden från prisbelönta Collaktiv UF skalar vi nu upp som Collaktiv AB mot en
            större regional satsning.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
