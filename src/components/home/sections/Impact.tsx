import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "./shared";

// Siffrorna kommer från piloten i Gävle våren 2026 (samma som i
// företagsportalen). Byt eller lägg till nyckeltal här.
const stats = [
  { value: "800", label: "resenärer", text: "registrerade sig inom några veckor" },
  { value: "18", label: "lokala företag", text: "i Gävle anslöt under piloten" },
  { value: "40+", label: "inlösta erbjudanden", text: "hos lokala företag i Gävle" },
  { value: "200 000+", label: "människor nådda", text: "via Gefle Dagblad, P4 Gävleborg och sociala medier" },
];

export function Impact() {
  return (
    <section className="bg-[var(--color-brand-primary)] py-16 text-white sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow light>Piloten i Gävle</Eyebrow>
          <SectionTitle>
            Tillsammans gör vi <span className="text-[var(--color-brand-accent)]">skillnad!</span>
          </SectionTitle>
          <p className="mt-4 text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            Se vårt arbete i siffror! Tillsammans belönar vi resor i kollektivtrafiken, stärker
            lokala företag och minskar utsläppen – en resa i taget.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[var(--color-brand-primary)] p-5 sm:p-7">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block whitespace-nowrap text-[1.65rem] font-extrabold leading-none tracking-tight min-[400px]:text-[2rem] text-[var(--color-brand-accent)] tabular-nums sm:text-[2.6rem]">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm font-extrabold">{s.label}</span>
                <span className="mt-0.5 block text-[13px] font-medium leading-snug text-white/70">
                  {s.text}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-12 max-w-3xl text-center text-xl font-extrabold leading-snug tracking-tight text-balance sm:text-2xl">
          ”Varje resa i kollektivtrafiken räknas – tillsammans mot ett grönare Gävleborg!”
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-semibold leading-relaxed text-white/60">
          Med grunden från prisbelönta Collaktiv UF skalar vi nu upp som Collaktiv AB mot en större
          regional satsning.
        </p>
      </Container>
    </section>
  );
}
