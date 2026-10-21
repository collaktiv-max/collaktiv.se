import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Car,
  Leaf,
  Trophy,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Reveal } from "@/components/home/Reveal";
import { InstagramIcon, TikTokIcon } from "@/components/home/SocialIcons";
import { Eyebrow, SectionTitle } from "@/components/home/sections/shared";
import { Container } from "@/components/ui/Container";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/config";
import { PILOT_AWARDS, PILOT_STATS, PILOT_TEXT } from "@/lib/pilot";

export const metadata: Metadata = { title: "Om oss – Collaktiv" };

const facts: { icon: LucideIcon; value: string; unit: string; text: string }[] = [
  {
    icon: Leaf,
    value: "75 %",
    unit: "lägre utsläpp",
    text: "Kollektivtrafik minskar utsläppen med upp till 75 % jämfört med bil.",
  },
  {
    icon: Bus,
    value: "40",
    unit: "bilar färre",
    text: "Mindre trafikstockning eftersom en buss kan ersätta upp till 40 bilar på vägarna.",
  },
  {
    icon: Leaf,
    value: "2 ton",
    unit: "CO₂ per år",
    text: "Varje bussresenär sparar klimatet från 2 ton CO₂ per år.",
  },
  {
    icon: Wallet,
    value: "Billigare",
    unit: "än bil",
    text: "Att åka buss är betydligt billigare än att äga och underhålla en egen bil.",
  },
];

// Utsläpp per km enligt uppgifter från ett stålindustriföretag i regionen.
const emissions = [
  { icon: Car, label: "Personbil", grams: 130 },
  { icon: Bus, label: "Buss", grams: 80 },
];
const maxGrams = Math.max(...emissions.map((e) => e.grams));

const socialButton =
  "inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-[var(--color-brand-primary)] transition hover:bg-[var(--color-brand-mint)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand-accent)]";

export default function OmOssPage() {
  return (
    <>
      <Header />
      <main>
        {/* Vår berättelse */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-secondary)] to-white">
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl" />
          <Container className="relative py-12 sm:py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-muted)] hover:text-[var(--color-brand-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Till startsidan
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
              {/* På dator fyller berättelsen + visionsrutan samma höjd som UF-rutan */}
              <Reveal className="lg:flex lg:flex-col lg:items-start">
                <Eyebrow>Om oss</Eyebrow>
                <SectionTitle>
                  Vår <span className="text-[var(--color-brand-primary)]">berättelse</span>
                </SectionTitle>
                <p className="mt-5 max-w-[60ch] text-base font-medium leading-relaxed text-[var(--color-brand-ink)]/80 sm:text-lg">
                  Collaktiv drivs av engagerade entreprenörer som brinner för innovation, hållbarhet
                  och smartare lösningar för framtidens resande. Tillsammans vill vi göra
                  kollektivtrafiken mer attraktiv genom att belöna hållbara val. På så sätt ökar vi
                  motivationen att resa kollektivt och bidrar till ett grönare samhälle med mindre
                  utsläpp och mer gemenskap.
                </p>

                {/* Vår vision – som ruta på dator (på mobil ligger den som eget fält nedanför) */}
                <div className="mt-8 hidden rounded-3xl bg-[var(--color-brand-primary)] p-7 text-white lg:mt-auto lg:block lg:self-stretch">
                  <Eyebrow light>Vår vision</Eyebrow>
                  <p className="mt-4 text-[1.65rem] font-extrabold leading-[1.18] tracking-tight text-balance">
                    Kollektivtrafiken ska bli det{" "}
                    <span className="text-[var(--color-brand-accent)]">självklara valet</span> för
                    alla människor!
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-3xl bg-[var(--color-brand-ink)] p-6 text-white sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)] text-[var(--color-brand-ink)]">
                      <Trophy className="h-5 w-5" />
                    </span>
                    <h2 className="text-lg font-extrabold leading-snug">
                      Ett tidigare UF-företag i Gävle
                    </h2>
                  </div>
                  <p className="mt-4 text-[14.5px] font-medium leading-relaxed text-white/80">
                    {PILOT_TEXT}
                  </p>

                  <ul className="mt-5 grid grid-cols-2 gap-2">
                    {PILOT_STATS.map((s) => (
                      <li key={s.unit} className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
                        <span className="block whitespace-nowrap text-[1.35rem] font-extrabold leading-none tracking-tight text-[var(--color-brand-accent)] tabular-nums">
                          {s.value}
                        </span>
                        <span className="mt-1 block text-[12.5px] font-bold text-white/80">
                          {s.unit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-2.5">
                    {PILOT_AWARDS.map(({ icon: Icon, place, text }) => (
                      <li
                        key={text}
                        className="flex items-start gap-2.5 text-[13.5px] font-bold leading-snug"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]" />
                        <span>
                          {place === "Vinnare" || place === "Kvalificerad"
                            ? text
                            : `${place} – ${text}`}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#collaktiv-uf"
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-accent)] hover:underline"
                  >
                    Läs mer om piloten
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Vår vision */}
        <section className="bg-[var(--color-brand-primary)] py-14 text-white sm:py-20 lg:hidden">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow light>Vår vision</Eyebrow>
              <p className="mt-5 text-[1.85rem] font-extrabold leading-[1.15] tracking-tight text-balance sm:text-[2.75rem]">
                Kollektivtrafiken ska bli det{" "}
                <span className="text-[var(--color-brand-accent)]">självklara valet</span> för alla
                människor!
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Varför kollektivtrafiken? */}
        <section className="py-16 sm:py-24">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>Fakta</Eyebrow>
              <SectionTitle>
                Varför <span className="text-[var(--color-brand-primary)]">kollektivtrafiken?</span>
              </SectionTitle>
            </Reveal>

            <Reveal className="mt-10">
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {facts.map(({ icon: Icon, value, unit, text }) => (
                  <li
                    key={unit}
                    className="group rounded-3xl border border-[var(--color-brand-border)] bg-white p-4 transition duration-200 hover:-translate-y-1 sm:p-6 hover:border-[var(--color-brand-primary)]/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-[clamp(1.4rem,6.5vw,2.2rem)] font-extrabold leading-none tracking-tight text-[var(--color-brand-primary)] sm:mt-5">
                      {value}
                    </p>
                    <p className="mt-1.5 text-[14px] font-extrabold sm:text-[15px]">{unit}</p>
                    <p className="mt-2 text-[12.5px] font-medium leading-snug text-[var(--color-brand-muted)] sm:text-[14px]">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Jämförelse bil och buss */}
            <Reveal className="mt-4 sm:mt-5">
              <div className="rounded-3xl bg-[var(--color-brand-secondary)] p-6 sm:p-8">
                <h3 className="text-lg font-extrabold sm:text-xl">Utsläpp per kilometer</h3>
                <ul className="mt-5 space-y-4">
                  {emissions.map(({ icon: Icon, label, grams }) => (
                    <li
                      key={label}
                      className="grid grid-cols-[6.5rem_1fr] items-center gap-3 sm:grid-cols-[8rem_1fr]"
                    >
                      <span className="flex items-center gap-2 text-[15px] font-bold">
                        <Icon className="h-5 w-5 text-[var(--color-brand-primary)]" />
                        {label}
                      </span>
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-4 rounded-full ${
                            label === "Buss"
                              ? "bg-[var(--color-brand-primary)]"
                              : "bg-[var(--color-brand-muted)]/45"
                          }`}
                          style={{ width: `${(grams / maxGrams) * 80}%` }}
                        />
                        <span className="whitespace-nowrap text-[15px] font-extrabold tabular-nums">
                          {grams} g CO₂
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
                  Med uppgifter från ett stålindustriföretag i regionen släpper en personbil ut ca
                  130 g CO₂ per km, medan en buss släpper ut bara 80 g CO₂ per km.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <p className="mx-auto mt-14 max-w-3xl text-center text-xl font-extrabold leading-snug tracking-tight text-balance sm:text-2xl">
                Varje resa med kollektivtrafiken är ett steg mot en hållbar framtid. Tillsammans kan
                vi skapa förändring –{" "}
                <span className="text-[var(--color-brand-primary)]">en bussresa i taget!</span>
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Sociala medier */}
        <section className="pb-16 sm:pb-24">
          <Container>
            <Reveal>
              <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-[var(--color-brand-ink)] px-6 py-10 text-center text-white sm:py-12">
                <p className="max-w-xl text-xl font-extrabold leading-snug text-balance sm:text-2xl">
                  Följ oss på sociala medier för att inte missa nyheter!
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButton}
                  >
                    <InstagramIcon className="h-5 w-5" />
                    Instagram
                  </a>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButton}
                  >
                    <TikTokIcon className="h-5 w-5" />
                    TikTok
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
