"use client";

import { useState, type ReactNode } from "react";
import { RegionModal } from "./RegionModal";
import { PILOT_REGION, WAITLIST_URL } from "@/lib/config";

// Knapp till väntelistan. Länkar till väntelistan när WAITLIST_URL är satt,
// annars öppnas anmälan direkt på sidan med pilotregionen förvald – samma
// beteende som resenärsbiljetten i heron.
export function WaitlistButton({ className, children }: { className: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  if (WAITLIST_URL) {
    return (
      <a href={WAITLIST_URL} className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <RegionModal
        open={open}
        onClose={() => setOpen(false)}
        initialRegion={PILOT_REGION}
        title="Gå med i väntelistan"
        intro={`Vi mejlar dig när Collaktiv startar i ${PILOT_REGION}.`}
      />
    </>
  );
}
