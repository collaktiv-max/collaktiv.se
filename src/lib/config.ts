// Samlade inställningar för landningssidan. Byt värdena här när länkarna
// till väntelistan och företagsportalen är klara – inget annat behöver ändras.

// Regionen där Collaktiv startar först.
export const PILOT_REGION = "Gävleborg";

// Adressen till väntelistan (repot collaktiv-max/v-ntelista). Så länge den
// är null öppnar resenärsrutan istället intresseanmälan med pilotregionen
// förvald, så att inga anmälningar går förlorade.
export const WAITLIST_URL: string | null = null;

// Adressen till företagsportalen (repot collaktiv-max/Collaktiv). Så länge
// den är null leder företagsrutan till kontaktsidan.
export const PORTAL_URL: string | null = null;

export const CONTACT_EMAIL = "collaktiv@gmail.com";
