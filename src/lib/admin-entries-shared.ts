// Typer och etiketter för /admin som även klientkomponenter får importera
// (ingen databaskod här).

export type EntrySource = "collaktiv" | "vantelista";

export interface AdminEntry {
  id: string;
  source: EntrySource;
  email: string;
  region: string | null;
  createdAt: string;
  /** Svar från väntelistans tävling (finns bara när source är "vantelista"). */
  contest?: { busGuess: number; rabatt: string; localBusiness: string | null };
}

export const SOURCE_LABEL: Record<EntrySource, string> = {
  collaktiv: "collaktiv.se",
  vantelista: "Väntelistan (tävlingen)",
};

export function contestSummary(e: AdminEntry): string {
  if (!e.contest) return "";
  const parts = [`Gissning: ${e.contest.busGuess}`, `Rabatt: ${e.contest.rabatt}`];
  if (e.contest.localBusiness) parts.push(`Lokalt: ${e.contest.localBusiness}`);
  return parts.join(" · ");
}
