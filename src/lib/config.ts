// Samlade inställningar för landningssidan. Byt värdena här när länkarna
// till väntelistan och företagsportalen är klara – inget annat behöver ändras.

// Regionen där Collaktiv startar först.
export const PILOT_REGION = "Gävleborg";

// Adressen till väntelistan (repot collaktiv-max/v-ntelista). Så länge den
// är null öppnar resenärsrutan istället intresseanmälan med pilotregionen
// förvald, så att inga anmälningar går förlorade.
export const WAITLIST_URL: string | null = null;

// Adressen till företagsportalen (repot collaktiv-max/Collaktiv). Sätt till
// null för att istället leda företagsknapparna till kontaktsidan.
export const PORTAL_URL: string | null = "https://partner.collaktiv.se";

export const CONTACT_EMAIL = "collaktiv@gmail.com";

// Samma länkar som på väntelistan (collaktiv-max/v-ntelista).
export const INSTAGRAM_URL =
  "https://www.instagram.com/collaktiv?stkn=MTI1cXJ2YnZwd2d0ag==";
export const TIKTOK_URL = "https://www.tiktok.com/@collaktiv?_r=1&_t=ZN-99wMvgPvxME";

// Trafikbolaget i pilotregionen.
export const TRAFFIC_OPERATOR = "X-trafik";
