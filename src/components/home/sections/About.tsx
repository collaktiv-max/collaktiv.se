import Image from "next/image";
import { ArrowRight, Building2, Store, UserRound, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
import { Eyebrow, SectionTitle } from "./shared";

// Lägg en bild på Colle i public/ och sätt sökvägen här, t.ex. "/colle.png".
const COLLE_IMAGE: string | null = null;

const parts: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserRound,
    title: "Resenären",
    text: "Får konkreta belöningar, sparar pengar och får uppskattning för sitt klimatsmarta val.",
  },
  {
    icon: Store,
    title: "Lokala företag",
    text: "Får fler fysiska kunder till butiken eller restaurangen istället för att handeln försvinner online.",
  },
  {
    icon: Building2,
    title: "Samhället",
    text: "Fler väljer bussen och tåget, vilket minskar utsläppen och stärker den lokala ekonomin.",
  },
];

export function About() {
  return (
    <section id="om-oss" className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Om oss</Eyebrow>
          <SectionTitle>
            En resa. <span className="text-[var(--color-brand-primary)]">Tre viktiga värden.</span>
          </SectionTitle>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-brand-muted)] sm:text-lg">
            Collaktiv startades i Gävle ur en enkel idé: det ska vara lönsamt och roligt att resa
            hållbart. Vi kopplar ihop resenären, kollektivtrafiken och det lokala näringslivet.
          </p>
        </Reveal>

        {/* Den cirkulära modellen: tre delar längs en sluten streckad slinga. */}
        <Reveal className="mt-12">
          <div className="relative rounded-[2rem] border-2 border-dashed border-[var(--color-brand-primary)]/30 p-4 pt-8 sm:p-6 sm:pt-10">
            <span className="absolute -top-3.5 left-6 rounded-full bg-white px-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
              Den cirkulära modellen ↻
            </span>
            <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-2">
              {parts.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="contents">
                  <div className="rounded-2xl bg-[var(--color-brand-secondary)] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight">{title}</h3>
                    <p className="mt-1.5 text-[14.5px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
                      {text}
                    </p>
                  </div>
                  {i < parts.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex items-center justify-center text-[var(--color-brand-primary)]/50"
                    >
                      <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Möt Colle */}
        <Reveal className="mt-8">
          <div className="grid items-center gap-6 rounded-[2rem] bg-[var(--color-brand-ink)] p-6 text-white sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
            <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full bg-white/10 sm:h-36 sm:w-36">
              {COLLE_IMAGE ? (
                <Image
                  src={COLLE_IMAGE}
                  alt="Colle, Collaktivs maskot"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full items-center justify-center rounded-full border-2 border-dashed border-white/30 p-4 text-center text-[11px] font-bold text-white/60">
                  Bild på Colle kommer
                </span>
              )}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-accent)]">
                Möt Colle
              </span>
              <p className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-balance sm:text-2xl">
                Vår maskot grodan Colle – resenärens gröna kompis.
              </p>
              <p className="mt-2 max-w-[60ch] text-[15px] font-medium leading-relaxed text-white/75">
                Colle peppar i appen, påminner om streaks och visar vägen till de bästa rabatterna.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
