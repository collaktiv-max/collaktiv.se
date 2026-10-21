import {
  Award,
  CalendarDays,
  MapPin,
  Medal,
  Star,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";

// Innehållet om Collaktiv UF och piloten i Gävle. Används både på
// startsidan och på Om oss-sidan, så det räcker att ändra här.

export const PILOT_TEXT =
  "Våren 2026 lanserade Collaktiv UF en 3 månaders lång pilot av tjänsten i Gävle stad. Uppskattningen och feedbacken var enorm. Nu siktar vi större, fler användare, fler företag, i en regionalt satsad lansering av Collaktiv.";

// Siffrorna kommer från piloten i Gävle våren 2026 (samma som i
// företagsportalen). Byt eller lägg till nyckeltal här.
export const PILOT_STATS = [
  { value: "18", unit: "företag", desc: "i Gävle har redan valt Collaktiv" },
  { value: "800", unit: "resenärer", desc: "Registrerade sig inom några veckor" },
  { value: "40+", unit: "inlösta erbjudanden", desc: "Hos lokala företag i Gävle" },
  {
    value: "200 000+",
    unit: "människor nådda",
    desc: "Via Gefle Dagblad, P4 Gävleborg och sociala medier",
  },
];

export const PILOT_FACTS: { icon: LucideIcon; text: string }[] = [
  { icon: CalendarDays, text: "Våren 2026" },
  { icon: Timer, text: "3 månader" },
  { icon: MapPin, text: "Gävle stad" },
];

export const PILOT_AWARDS: { icon: LucideIcon; place: string; text: string }[] = [
  { icon: Trophy, place: "Vinnare", text: "Årets bästa UF-företag – Gävleborg & Gävle stad" },
  { icon: Medal, place: "Andraplats", text: "Bästa tjänst" },
  { icon: Award, place: "Tredjeplats", text: "Årets innovation" },
  { icon: Star, place: "Kvalificerad", text: "Kvalificering till SM för bästa företag" },
];
