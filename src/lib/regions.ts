// Sveriges 21 regioner, i bokstavsordning.
export const REGIONS = [
  "Blekinge",
  "Dalarna",
  "Gotland",
  "Gävleborg",
  "Halland",
  "Jämtland Härjedalen",
  "Jönköpings län",
  "Kalmar län",
  "Kronoberg",
  "Norrbotten",
  "Skåne",
  "Stockholm",
  "Sörmland",
  "Uppsala",
  "Värmland",
  "Västerbotten",
  "Västernorrland",
  "Västmanland",
  "Västra Götaland",
  "Örebro län",
  "Östergötland",
] as const;

export type Region = (typeof REGIONS)[number];

export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}
