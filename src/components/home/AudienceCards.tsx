"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bus, MapPin, Store } from "lucide-react";
import { RegionModal } from "./RegionModal";
import { PILOT_REGION, PORTAL_URL, WAITLIST_URL } from "@/lib/config";

// Hela rutan är klickbar: huvudknappen sträcks ut över rutan med ett
// osynligt ::after-lager, och eventuella andra knappar ligger ovanpå (z-10).
const stretched = "after:absolute after:inset-0 after:rounded-3xl after:content-['']";

const cardBase =
  "group relative flex flex-col rounded-3xl border p-7 text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-9 focus-within:ring-4 focus-within:ring-[var(--color-brand-primary)]/25";

const ctaBase =
  "mt-8 inline-flex items-center gap-2 self-start rounded-full px-6 py-3.5 text-[15px] font-bold transition outline-none";

export function AudienceCards() {
  const [modal, setModal] = useState<null | "pilot" | "other">(null);

  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {/* Resenärer */}
      <article
        className={`${cardBase} border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-lg shadow-[var(--color-brand-primary)]/20`}
      >
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide">
          <Bus className="h-4 w-4" />
          För resenärer
        </span>
        <h2 className="mt-5 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2rem]">
          Åk kollektivt.{" "}
          <span className="text-[var(--color-brand-accent)]">Bli belönad.</span>
        </h2>
        <p className="mt-4 text-[15.5px] font-medium leading-relaxed text-white/85">
          Varje resa med bussen eller tåget ger dig rabatter hos lokala
          favoriter. Skriv upp dig på väntelistan och var först in när vi
          startar i {PILOT_REGION}.
        </p>

        {WAITLIST_URL ? (
          <a
            href={WAITLIST_URL}
            className={`${ctaBase} ${stretched} bg-white text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-mint)]`}
          >
            Gå med i väntelistan
            <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setModal("pilot")}
            className={`${ctaBase} ${stretched} bg-white text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-mint)]`}
          >
            Gå med i väntelistan
            <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setModal("other")}
          className="relative z-10 mt-4 inline-flex items-center gap-2 self-start rounded-full px-1 py-1 text-left text-sm font-bold text-white/90 underline decoration-white/40 underline-offset-4 transition hover:text-white hover:decoration-white"
        >
          <MapPin className="h-4 w-4" />
          Bor du i en annan region? Välj region
        </button>
      </article>

      {/* Företag */}
      <article
        className={`${cardBase} border-[var(--color-brand-border)] bg-[var(--color-brand-secondary)]`}
      >
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--color-brand-primary)]/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[var(--color-brand-primary)]">
          <Store className="h-4 w-4" />
          För företag
        </span>
        <h2 className="mt-5 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2rem]">
          Gör stadens resenärer till{" "}
          <span className="text-[var(--color-brand-primary)]">era stamkunder.</span>
        </h2>
        <p className="mt-4 text-[15.5px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
          Synas för tusentals resenärer som redan rör sig nära er – utan
          annonsbudget. Lägg upp erbjudanden på några minuter och se exakt
          vad de ger.
        </p>

        {PORTAL_URL ? (
          <a
            href={PORTAL_URL}
            className={`${ctaBase} ${stretched} bg-[var(--color-brand-primary)] text-white group-hover:bg-[var(--color-brand-primary-hover)]`}
          >
            Till företagsportalen
            <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
          </a>
        ) : (
          <Link
            href="/kontakt"
            className={`${ctaBase} ${stretched} bg-[var(--color-brand-primary)] text-white group-hover:bg-[var(--color-brand-primary-hover)]`}
          >
            Bli partner – kontakta oss
            <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
          </Link>
        )}
      </article>

      <RegionModal
        open={modal !== null}
        onClose={() => setModal(null)}
        initialRegion={modal === "pilot" ? PILOT_REGION : ""}
        title={
          modal === "pilot"
            ? "Skriv upp dig på väntelistan"
            : "Vi kommer till fler regioner"
        }
        intro={
          modal === "pilot"
            ? `Lämna din e-post så hör vi av oss när Collaktiv startar i ${PILOT_REGION}.`
            : `Vi startar i ${PILOT_REGION}. Välj din region så meddelar vi dig när Collaktiv kommer dit – ju fler som anmäler sig, desto snabbare kommer vi.`
        }
      />
    </div>
  );
}
