"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { RegionModal } from "./RegionModal";
import { Bus } from "./Bus";
import { PILOT_REGION, PORTAL_URL, WAITLIST_URL } from "@/lib/config";

// Hela biljetten är klickbar: huvudknappen sträcks ut över rutan med ett
// osynligt ::after-lager, och regionknappen ligger ovanpå (z-10).
const stretched = "after:absolute after:inset-0 after:content-['']";

const ticketBase =
  "ticket group relative flex min-w-0 flex-col rounded-3xl px-6 pt-8 transition duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-8 sm:pt-10";

const ctaBase =
  "mt-7 inline-flex items-center gap-2.5 self-start rounded-full px-6 py-3.5 text-[15px] font-bold transition outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand-accent)]";

const arrow = <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />;

// Hållplatsstolpe med en skylt där en grön pil pekar rakt ned mot
// biljetten. Ligger absolut ovanpå skylten, så den påverkar inte layouten.
function BusStopPole({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 28 54"
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-full mb-[-2px] h-[54px] w-7 ${
        side === "left" ? "left-2.5" : "right-2.5"
      }`}
    >
      {/* Stolpe */}
      <rect x="12.75" y="24" width="2.5" height="30" rx="1.25" fill="var(--color-brand-muted)" />
      {/* Skylt */}
      <rect
        x="1.25"
        y="1.25"
        width="25.5"
        height="25.5"
        rx="5.5"
        fill="white"
        stroke="var(--color-brand-primary)"
        strokeWidth="2.5"
      />
      {/* Pil rakt ned */}
      <g
        fill="none"
        stroke="#1b9444"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 7.5v12.5" />
        <path d="M8.5 14.5L14 20l5.5-5.5" />
      </g>
    </svg>
  );
}

// Hållplatsskylt: talar om vem biljetten är till.
function Stop({ children, pole }: { children: ReactNode; pole?: "left" | "right" }) {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-brand-primary)] bg-white py-1 pl-1.5 pr-3.5 text-[13px] font-extrabold md:text-xs uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
      <span className="h-4 w-4 rounded-full bg-[var(--color-brand-primary)] shadow-[inset_0_0_0_4px_white]" />
      {children}
      {pole && <BusStopPole side={pole} />}
    </span>
  );
}

function Stub({ label, value, dark }: { label: string; value: string; dark?: boolean }) {
  return (
    <div
      className={`-mx-6 mt-8 flex h-[76px] items-center justify-between border-t-2 border-dashed px-6 text-xs font-bold uppercase tracking-[0.08em] sm:-mx-8 sm:px-8 ${
        dark
          ? "border-white/30 text-white/75"
          : "border-[var(--color-brand-primary)]/30 text-[var(--color-brand-muted)]"
      }`}
    >
      <span>{label}</span>
      <b
        className={`font-extrabold ${dark ? "text-[var(--color-brand-accent)]" : "text-[var(--color-brand-primary)]"}`}
      >
        {value}
      </b>
    </div>
  );
}

export function AudienceCards() {
  const [modal, setModal] = useState<null | "pilot" | "other">(null);

  const riderCta = `${ctaBase} ${stretched} bg-white text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-mint)]`;
  const bizCta = `${ctaBase} ${stretched} bg-[var(--color-brand-primary)] text-white group-hover:bg-[var(--color-brand-primary-hover)]`;

  return (
    <>
      {/* Busslinjen mellan hållplatserna (dator). Linjen och bussen går
          mellan hållplatsernas mittpunkter, dvs. mitten av varje kolumn. */}
      <div className="relative hidden h-16 grid-cols-2 gap-6 md:grid" aria-hidden="true">
        <div className="absolute inset-x-[25%] bottom-[15px] h-1 bg-[repeating-linear-gradient(90deg,var(--color-brand-primary)_0_14px,transparent_14px_22px)] opacity-35" />
        {/* Bussen håller sig mellan skyltarna så att den aldrig kör över dem. */}
        <div className="absolute inset-x-[calc(25%+128px)] bottom-[17px] h-8">
          <div className="bus-ride absolute bottom-0 left-0 -translate-x-1/2">
            <div className="bus-face">
              <div className="bus-tilt">
                <div className="bus-bob">
                  <Bus className="h-8 w-16 drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-center">
          <Stop pole="left">För resenärer</Stop>
        </div>
        <div className="flex items-end justify-center">
          <Stop pole="right">För företag</Stop>
        </div>
      </div>

      <div className="grid gap-9 md:mt-4 md:grid-cols-2 md:gap-6">
        {/* Resenärer */}
        <div className="flex min-w-0 flex-col gap-3 md:gap-0">
          <div className="md:hidden">
            <Stop>För resenärer</Stop>
          </div>
          <article className={`${ticketBase} flex-1 bg-[var(--color-brand-primary)] text-white`}>
            <h2 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-[2.1rem]">
              Åk kollektivt, <span className="text-[var(--color-brand-accent)]">bli belönad!</span>
            </h2>
            <p className="mt-3 max-w-[34ch] text-[15.5px] font-semibold text-white/85">
              Få resepoäng när du åker kollektivt och växla dina resepoäng mot
              erbjudanden hos lokala företag.
            </p>

            {WAITLIST_URL ? (
              <a href={WAITLIST_URL} className={riderCta}>
                Gå med i väntelistan
                {arrow}
              </a>
            ) : (
              <button type="button" onClick={() => setModal("pilot")} className={riderCta}>
                Gå med i väntelistan
                {arrow}
              </button>
            )}

            <button
              type="button"
              onClick={() => setModal("other")}
              className="relative z-10 mt-3.5 inline-flex items-center gap-1.5 self-start py-1 text-left text-[13.5px] font-bold text-white/90 underline decoration-white/40 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              <MapPin className="h-4 w-4" />
              Bor du i en annan region?
            </button>

            <div className="mt-auto">
              <Stub label="Start" value={PILOT_REGION} dark />
            </div>
          </article>
        </div>

        {/* Företag */}
        <div className="flex min-w-0 flex-col gap-3 md:gap-0">
          <div className="md:hidden">
            <Stop>För företag</Stop>
          </div>
          <article className={`${ticketBase} isolate flex-1 bg-[var(--color-brand-primary)]`}>
            {/* Ljus insida – den gröna biljetten bakom syns som en kant. */}
            <div
              aria-hidden="true"
              className="ticket-inner absolute inset-[2px] -z-10 rounded-[22px] bg-[var(--color-brand-secondary)]"
            />
            <h2 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-[2.1rem]">
              Gör resenärer till era{" "}
              <span className="text-[var(--color-brand-primary)]">nya stamkunder</span>
            </h2>
            <p className="mt-3 max-w-[34ch] text-[15.5px] font-semibold text-[var(--color-brand-muted)]">
              Nå tusentals lokala resenärer! Lägg upp ett erbjudande, få nya
              kunder in i butiken, med ständig synlighet och tydlig statistik.
            </p>

            {PORTAL_URL ? (
              <a href={PORTAL_URL} className={bizCta}>
                Läs mer
                {arrow}
              </a>
            ) : (
              <Link href="/kontakt" className={bizCta}>
                Läs mer
                {arrow}
              </Link>
            )}

            <div className="mt-auto">
              <Stub label="Kom igång" value="Gratis" />
            </div>
          </article>
        </div>
      </div>

      <RegionModal
        open={modal !== null}
        onClose={() => setModal(null)}
        initialRegion={modal === "pilot" ? PILOT_REGION : ""}
        title={modal === "pilot" ? "Gå med i väntelistan" : "Vi kommer till fler regioner"}
        intro={
          modal === "pilot"
            ? `Vi mejlar dig när Collaktiv startar i ${PILOT_REGION}.`
            : "Välj din region så mejlar vi när vi kommer dit."
        }
      />
    </>
  );
}
