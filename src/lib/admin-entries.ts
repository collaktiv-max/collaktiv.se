import { neon } from "@neondatabase/serverless";
import { resolveDatabaseUrl } from "./db-env";
import { getAllRegionInterest } from "./region-interest-db";

// Samlar anmälningar från båda insamlingarna till /admin:
// - "collaktiv": väntelistan/regionvalet här på collaktiv.se (tabellen region_interest)
// - "vantelista": tävlingen på väntelistesajten (repot v-ntelista, tabellen
//   waitlist_entries i samma databas). Den läses bara här – den ändras och
//   rensas i väntelistans egen admin.

import type { AdminEntry } from "./admin-entries-shared";

export * from "./admin-entries-shared";

async function getContestEntries(): Promise<AdminEntry[]> {
  const url = resolveDatabaseUrl();
  if (!url) return [];
  const sql = neon(url);
  // Tabellen finns bara om väntelistesajten har sparat något i databasen.
  const [{ t }] = (await sql`SELECT to_regclass('public.waitlist_entries') AS t`) as Array<{
    t: string | null;
  }>;
  if (!t) return [];
  const rows = (await sql`
    SELECT id, bus_guess, rabatt_answer, local_business_answer, email, created_at
    FROM waitlist_entries
  `) as Array<{
    id: string;
    bus_guess: number;
    rabatt_answer: string;
    local_business_answer: string | null;
    email: string;
    created_at: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    source: "vantelista",
    email: r.email.trim().toLowerCase(),
    region: null,
    createdAt: new Date(r.created_at).toISOString(),
    contest: {
      busGuess: r.bus_guess,
      rabatt: r.rabatt_answer,
      localBusiness: r.local_business_answer,
    },
  }));
}

export async function getAllAdminEntries(): Promise<AdminEntry[]> {
  const [own, contest] = await Promise.all([getAllRegionInterest(), getContestEntries()]);
  const entries: AdminEntry[] = [
    ...own.map((e) => ({
      id: e.id,
      source: "collaktiv" as const,
      email: e.email,
      region: e.region,
      createdAt: e.createdAt,
    })),
    ...contest,
  ];
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
