import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { resolveDatabaseUrl } from "./db-env";

// Befintliga användare inför nylanseringen som INTE har godkänt
// marknadsföring. De får bara informationsmail. Adresserna klistras in i
// /admin/nylansering och sparas i databasen – aldrig i koden, eftersom
// repot är publikt.

export interface RelaunchUser {
  email: string;
  addedAt: string;
}

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
    })();
  }
  await tableReady;
}

const DATA_FILE = path.join(process.cwd(), "data", "relaunch-users.json");

async function readFileUsers(): Promise<RelaunchUser[]> {
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf-8")) as RelaunchUser[];
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
    SELECT email, added_at FROM relaunch_users ORDER BY email
  `) as Array<{ email: string; added_at: string }>;
  return rows.map((r) => ({
    email: r.email,
    addedAt: new Date(r.added_at).toISOString(),
  }));
}

/** Lägger till adresser som inte redan finns. Returnerar antal nya. */
export async function addRelaunchUsers(emails: string[]): Promise<number> {
  if (emails.length === 0) return 0;
  const now = new Date().toISOString();
  if (!databaseUrl) {
    const users = await readFileUsers();
    const existing = new Set(users.map((u) => u.email));
    const fresh = emails.filter((e) => !existing.has(e));
    await writeFileUsers([...users, ...fresh.map((email) => ({ email, addedAt: now }))]);
    return fresh.length;
  }
  await ensureTable();
  const rows = (await sql()`
    INSERT INTO relaunch_users (email, added_at)
    SELECT unnest(${emails}::text[]), ${now}
    ON CONFLICT (email) DO NOTHING
    RETURNING email
  `) as Array<{ email: string }>;
  return rows.length;
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
