import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { resolveDatabaseUrl } from "./db-env";
import type { ImportRow, RelaunchUser } from "./relaunch-shared";

// Befintliga användare inför nylanseringen. consent = har godkänt nyheter
// och erbjudanden; övriga får bara informationsmail. Adresserna klistras in
// i /admin/nylansering och sparas i databasen – aldrig i koden, eftersom
// repot är publikt.

export type { RelaunchUser };

const databaseUrl = resolveDatabaseUrl();
let tableReady: Promise<void> | null = null;

function sql() {
  return neon(databaseUrl!);
}

async function ensureTable() {
  if (!tableReady) {
    tableReady = (async () => {
      await sql()`
        CREATE TABLE IF NOT EXISTS relaunch_users (
          email TEXT PRIMARY KEY,
          added_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql()`ALTER TABLE relaunch_users ADD COLUMN IF NOT EXISTS name TEXT`;
      await sql()`
        ALTER TABLE relaunch_users ADD COLUMN IF NOT EXISTS consent BOOLEAN NOT NULL DEFAULT false
      `;
      await sql()`ALTER TABLE relaunch_users ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ`;
    })().catch((err) => {
      tableReady = null;
      throw err;
    });
  }
  await tableReady;
}

const DATA_FILE = path.join(process.cwd(), "data", "relaunch-users.json");

async function readFileUsers(): Promise<RelaunchUser[]> {
  try {
    const raw = JSON.parse(await readFile(DATA_FILE, "utf-8")) as Partial<RelaunchUser>[];
    return raw.map((u) => ({
      email: u.email!,
      name: u.name ?? null,
      consent: u.consent ?? false,
      consentAt: u.consentAt ?? null,
      addedAt: u.addedAt!,
    }));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeFileUsers(users: RelaunchUser[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function getRelaunchUsers(): Promise<RelaunchUser[]> {
  if (!databaseUrl) {
    return (await readFileUsers()).sort((a, b) => a.email.localeCompare(b.email));
  }
  await ensureTable();
  const rows = (await sql()`
    SELECT email, name, consent, consent_at, added_at FROM relaunch_users ORDER BY email
  `) as Array<{
    email: string;
    name: string | null;
    consent: boolean;
    consent_at: string | null;
    added_at: string;
  }>;
  return rows.map((r) => ({
    email: r.email,
    name: r.name,
    consent: r.consent,
    consentAt: r.consent_at ? new Date(r.consent_at).toISOString() : null,
    addedAt: new Date(r.added_at).toISOString(),
  }));
}

export interface ImportCounts {
  added: number;
  /** Fanns redan och markerades nu som samtyckta (bara vid samtyckeslistan). */
  upgraded: number;
  unchanged: number;
}

/**
 * Lägger till adresser. Med consent = true markeras de som har godkänt
 * utskick, även om de redan fanns utan samtycke. Utan consent rörs
 * befintliga adresser inte – ett samtycke tas aldrig bort av en import.
 */
export async function importRelaunchUsers(
  rows: ImportRow[],
  consent: boolean,
): Promise<ImportCounts> {
  if (rows.length === 0) return { added: 0, upgraded: 0, unchanged: 0 };
  const now = new Date().toISOString();

  if (!databaseUrl) {
    const users = await readFileUsers();
    const byEmail = new Map(users.map((u) => [u.email, u]));
    let added = 0;
    let upgraded = 0;
    for (const r of rows) {
      const existing = byEmail.get(r.email);
      if (!existing) {
        byEmail.set(r.email, {
          email: r.email,
          name: r.name,
          consent,
          consentAt: consent ? r.consentAt : null,
          addedAt: now,
        });
        added++;
      } else if (consent) {
        if (!existing.consent) upgraded++;
        existing.consent = true;
        existing.name = r.name ?? existing.name;
        existing.consentAt = r.consentAt ?? existing.consentAt;
      }
    }
    await writeFileUsers([...byEmail.values()]);
    return { added, upgraded, unchanged: rows.length - added - upgraded };
  }

  await ensureTable();
  const emails = rows.map((r) => r.email);
  const names = rows.map((r) => r.name ?? "");
  const dates = rows.map((r) => (consent && r.consentAt) || "");

  if (!consent) {
    const inserted = (await sql()`
      INSERT INTO relaunch_users (email, name, added_at)
      SELECT e, NULLIF(n, ''), ${now}
      FROM unnest(${emails}::text[], ${names}::text[]) AS t(e, n)
      ON CONFLICT (email) DO NOTHING
      RETURNING email
    `) as unknown[];
    return { added: inserted.length, upgraded: 0, unchanged: rows.length - inserted.length };
  }

  const before = (await sql()`
    SELECT email FROM relaunch_users WHERE consent AND email = ANY(${emails}::text[])
  `) as unknown[];
  const result = (await sql()`
    INSERT INTO relaunch_users (email, name, consent, consent_at, added_at)
    SELECT e, NULLIF(n, ''), true, NULLIF(c, '')::timestamptz, ${now}
    FROM unnest(${emails}::text[], ${names}::text[], ${dates}::text[]) AS t(e, n, c)
    ON CONFLICT (email) DO UPDATE SET
      consent = true,
      name = COALESCE(EXCLUDED.name, relaunch_users.name),
      consent_at = COALESCE(EXCLUDED.consent_at, relaunch_users.consent_at)
    RETURNING (xmax = 0) AS inserted
  `) as Array<{ inserted: boolean }>;
  const added = result.filter((r) => r.inserted).length;
  const unchanged = before.length;
  return { added, upgraded: rows.length - added - unchanged, unchanged };
}

export async function deleteRelaunchUser(email: string) {
  if (!databaseUrl) {
    await writeFileUsers((await readFileUsers()).filter((u) => u.email !== email));
    return;
  }
  await ensureTable();
  await sql()`DELETE FROM relaunch_users WHERE email = ${email}`;
}

export async function clearRelaunchUsers() {
  if (!databaseUrl) {
    await writeFileUsers([]);
    return;
  }
  await ensureTable();
  await sql()`DELETE FROM relaunch_users`;
}
