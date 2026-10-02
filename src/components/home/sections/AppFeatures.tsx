import Image from "next/image";
import { Camera, Flame, Leaf, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "./shared";

// Lägg bilder från appen i public/app/ och sätt image till t.ex.
// "/app/streaks.png" – då visas bilden i telefonramen istället för
// platshållaren.
const features: { icon: LucideIcon; title: string; text: string; image?: string }[] = [
  {
    icon: Flame,
    title: "Streaks & uppdrag",
    text: "Håll igång din streak, lös dagliga uppdrag och klättra i nivåer.",
  },
  {
    icon: Camera,
    title: "Registrera på sekunder",
    text: "Fota biljetten eller knappa in biljettnumret direkt i appen – snabbt och smidigt.",
  },
  {
    icon: ShoppingBag,
    title: "Belöningsbutiken",
    text: "Exklusiva rabatter och förmåner hos lokala favoriter i Gävleborg – restauranger, kaféer, butiker och gym.",
  },
  {
    icon: Leaf,
    title: "Se din klimatnytta",
    text: "Se svart på vitt hur mycket CO₂ du sparar jämfört med bil och tävla mot vänner på topplistorna.",
  },
];

function PhoneShot({ image, title }: { image?: string; title: string }) {
  return (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[150px] rounded-[1.6rem] border-[5px] sm:max-w-[200px] sm:rounded-[2rem] sm:border-[6px] border-[var(--color-brand-ink)] bg-[var(--color-brand-secondary)] shadow-lg">
      {image ? (
        <Image
          src={image}
          alt={`Skärmbild från appen: ${title}`}
          fill
          sizes="200px"
          className="rounded-[1.2rem] object-cover sm:rounded-[1.6rem]"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[1.2rem] border-2 border-dashed sm:rounded-[1.6rem] border-[var(--color-brand-primary)]/25 p-4 text-center">
          <Smartphone className="h-7 w-7 text-[var(--color-brand-primary)]/40" />
          <span className="text-[11px] font-bold text-[var(--color-brand-muted)]">
            Bild från appen kommer
          </span>
        </div>
      )}
    </div>
  );
}

export function AppFeatures() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Mer än bara rabatter</Eyebrow>
          <SectionTitle>
            Gör det hållbara resandet till en{" "}
            <span className="text-[var(--color-brand-primary)]">vana</span>
          </SectionTitle>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-12 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text, image }) => (
            <li key={title} className="flex flex-col">
              <PhoneShot image={image} title={title} />
              <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-start sm:gap-3">
                <span className="flex h-9 w-9 shrink-0 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold leading-tight tracking-tight sm:text-lg">{title}</h3>
                  <p className="mt-1 text-[13px] font-medium sm:text-[14.5px] leading-relaxed text-[var(--color-brand-muted)]">
                    {text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
