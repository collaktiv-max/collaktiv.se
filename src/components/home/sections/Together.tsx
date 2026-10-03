import { Clock, Leaf, PiggyBank, Store, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
import { Eyebrow, SectionTitle } from "./shared";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Leaf, title: "Lägre utsläpp", text: "Mycket mindre CO₂ per resenär än bilen." },
  { icon: Users, title: "Mindre trängsel", text: "Färre bilar och mer plats i stan." },
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
  { icon: Store, title: "Levande stadskärnor", text: "Resenärer handlar lokalt på vägen." },
];

// Fördelarna med att åka kollektivt, under rubriken "Tillsammans gör vi skillnad!".
export function Together() {
  return (
    <section className="bg-[var(--color-brand-primary)] py-14 text-white sm:py-20">
      <Container>
        <Reveal className="grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-14">
          <div>
            <Eyebrow light>Därför lönar sig kollektivtrafiken</Eyebrow>
            <SectionTitle>
              Tillsammans gör vi <span className="text-[var(--color-brand-accent)]">skillnad!</span>
            </SectionTitle>
            <p className="mt-3 max-w-[58ch] text-[15.5px] font-medium leading-relaxed text-white/85 sm:text-base">
              Tillsammans belönar vi resor i kollektivtrafiken, stärker lokala företag och minskar
              utsläppen – en resa i taget.
            </p>
          </div>
          <p className="border-l-4 border-[var(--color-brand-accent)] pl-4 text-lg font-extrabold leading-snug tracking-tight text-balance sm:text-xl">
            ”Varje resa i kollektivtrafiken räknas – tillsammans mot ett grönare Gävleborg!”
          </p>
        </Reveal>

        <Reveal className="mt-10">
          {/* Mobil: en rad att svepa i sidled. Större skärmar: rutnät. */}
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 lg:gap-3">
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
      </Container>
    </section>
  );
}
