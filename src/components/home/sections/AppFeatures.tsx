"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Flame,
  Leaf,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "../Reveal";
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
    <div className="relative aspect-[9/19] w-[118px] shrink-0 rounded-[1.4rem] border-[5px] border-[var(--color-brand-ink)] bg-white shadow-xl min-[400px]:w-[132px] sm:w-[190px] sm:rounded-[2rem] sm:border-[7px] lg:w-[210px]">
      {image ? (
        <Image
          src={image}
          alt={`Skärmbild från appen: ${title}`}
          fill
          sizes="210px"
          className="rounded-[1rem] object-cover sm:rounded-[1.5rem]"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[1rem] border-2 border-dashed border-[var(--color-brand-primary)]/25 p-3 text-center sm:rounded-[1.5rem]">
          <Smartphone className="h-6 w-6 text-[var(--color-brand-primary)]/40 sm:h-7 sm:w-7" />
          <span className="text-[10.5px] font-bold text-[var(--color-brand-muted)] sm:text-[11px]">
            Bild från appen kommer
          </span>
        </div>
      )}
    </div>
  );
}

const navButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-brand-border)] bg-white text-[var(--color-brand-primary)] transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand-accent)]";

// Ett kort i taget som man sveper i sidled (vanlig skrollning med
// "snap", så det känns som i en app). Pilar och prickar för den som
// använder mus eller tangentbord.
export function AppFeatures() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = [...el.children] as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(slides.indexOf(e.target as HTMLElement));
        }
      },
      { root: el, threshold: 0.6 },
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Mer än bara rabatter</Eyebrow>
          <SectionTitle>
            Gör det hållbara resandet till en{" "}
            <span className="text-[var(--color-brand-primary)]">vana</span>
          </SectionTitle>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl sm:mt-12">
          <div
            ref={track}
            role="region"
            aria-roledescription="karusell"
            aria-label="Appens funktioner"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 sm:mx-0 sm:gap-4 sm:px-0"
          >
            {features.map(({ icon: Icon, title, text, image }, i) => (
              <article
                key={title}
                aria-roledescription="bild"
                aria-label={`${i + 1} av ${features.length}: ${title}`}
                className="grid w-[calc(100%-1.5rem)] shrink-0 snap-center grid-cols-[auto_1fr] items-center gap-4 rounded-[1.75rem] bg-[var(--color-brand-secondary)] p-4 sm:w-full sm:gap-10 sm:p-10"
              >
                <PhoneShot image={image} title={title} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white sm:h-11 sm:w-11">
                      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-primary)] tabular-nums sm:text-xs">
                      {i + 1} / {features.length}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.15rem] font-extrabold leading-tight tracking-tight text-balance sm:mt-5 sm:text-[2rem]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-[var(--color-brand-muted)] sm:mt-3 sm:text-[17px]">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6 sm:justify-between">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Föregående"
              className={`${navButton} hidden sm:flex`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Visa ${f.title}`}
                  aria-current={i === active}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-7 bg-[var(--color-brand-primary)]"
                      : "w-2.5 bg-[var(--color-brand-primary)]/25 hover:bg-[var(--color-brand-primary)]/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === features.length - 1}
              aria-label="Nästa"
              className={`${navButton} hidden sm:flex`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
