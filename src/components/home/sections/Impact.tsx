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
    text: "Mycket mindre CO₂ per resenär än bilen.",
  },
  {
    icon: Users,
    title: "Mindre trängsel",
    text: "Färre bilar och mer plats i stan.",
  },
  {
    icon: PiggyBank,
    title: "Billigare i vardagen",
    text: "Ingen bensin eller parkering – och rabatter med Collaktiv.",
  },
  {
    icon: Clock,
    title: "Tid för dig själv",
    text: "Läs, lyssna eller vila medan någon annan kör.",
  },
  {
    icon: Store,
    title: "Levande stadskärnor",
    text: "Resenärer handlar lokalt på vägen.",
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
    <section className="bg-[var(--color-brand-primary)] py-14 text-white sm:py-20">
      <Container>
        <Reveal className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14">
          <div>
            <Eyebrow light>Tillsammans</Eyebrow>
            <SectionTitle>
              Tillsammans gör vi <span className="text-[var(--color-brand-accent)]">skillnad!</span>
            </SectionTitle>
            <p className="mt-3 max-w-[58ch] text-[15.5px] font-medium leading-relaxed text-white/85 sm:text-base">
              Se vårt arbete i siffror! Tillsammans belönar vi resor i kollektivtrafiken, stärker
              lokala företag och minskar utsläppen – en resa i taget.
            </p>
          </div>
          <p className="border-l-4 border-[var(--color-brand-accent)] pl-4 text-lg font-extrabold leading-snug tracking-tight text-balance sm:text-xl">
            ”Varje resa i kollektivtrafiken räknas – tillsammans mot ett grönare Gävleborg!”
          </p>
        </Reveal>

        {/* Fördelarna med att åka kollektivt – kompakta rutor på en rad */}
        <Reveal className="mt-10">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
            Därför lönar sig kollektivtrafiken
          </h3>
          {/* Mobil: en rad att svepa i sidled. Större skärmar: rutnät. */}
          <ul className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 lg:gap-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group w-[42%] shrink-0 snap-start rounded-2xl bg-white/[0.07] p-4 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.12] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[var(--color-brand-accent)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="mt-3 block text-[15px] font-extrabold leading-tight">{title}</span>
                <span className="mt-1 block text-[13px] font-medium leading-snug text-white/75">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Collaktiv UF – piloten, siffror och utmärkelser i ett kort */}
        <Reveal className="mt-4 lg:mt-5" delay={100}>
          <div className="grid gap-6 rounded-[1.75rem] bg-[var(--color-brand-ink)] p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-accent)]">
                Collaktiv UF · Piloten i Gävle
              </span>
              <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-white/85">
                Våren 2026 lanserade Collaktiv UF en 3 månaders lång pilot av tjänsten i Gävle stad.
                Uppskattningen och feedbacken var enorm. Nu siktar vi större, fler användare, fler
                företag, i en regionalt satsad lansering av Collaktiv.
              </p>
              <ul className="mt-5 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {awards.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/15 text-[var(--color-brand-accent)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[13px] font-bold leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 content-start gap-2.5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white/[0.06] p-4 transition-colors duration-200 hover:bg-white/10"
                >
                  <dd className="whitespace-nowrap text-[1.55rem] font-extrabold leading-none tracking-tight text-[var(--color-brand-accent)] tabular-nums sm:text-[1.9rem]">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-1.5 text-[12.5px] font-bold text-white/80">{s.label}</dt>
                </div>
              ))}
              <p className="col-span-2 mt-1 text-[11.5px] font-semibold leading-relaxed text-white/55">
                Med grunden från prisbelönta Collaktiv UF skalar vi nu upp som Collaktiv AB mot en
                större regional satsning.
              </p>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
