import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { resolveDatabaseUrl } from "./db-env";
import type { Region } from "./regions";

// Intresseanmälningar från resenärer i regioner där vi ännu inte finns.
// Sparas i Postgres (Neon) när en databas är kopplad i Vercel, annars i
// data/region-interest.json så att sidan går att testa lokalt.

export interface RegionInterest {
  id: string;
  region: Region;
  email: string;
  createdAt: string;
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
        CREATE TABLE IF NOT EXISTS region_interest (
          id TEXT PRIMARY KEY,
          region TEXT NOT NULL,
          email TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          UNIQUE (region, email)
        )
      `;
    })();
  }
  await tableReady;
}

async function addPostgres(entry: RegionInterest) {
  await ensureTable();
  // Samma e-post i samma region sparas bara en gång.
  await sql()`
    INSERT INTO region_interest (id, region, email, created_at)
    VALUES (${entry.id}, ${entry.region}, ${entry.email}, ${entry.createdAt})
    ON CONFLICT (region, email) DO NOTHING
  `;
}

// --- Fallback för lokal utveckling utan databas ---

const DATA_FILE = path.join(process.cwd(), "data", "region-interest.json");

async function addFile(entry: RegionInterest) {
  const entries = await readAllFromFile();
  if (entries.some((e) => e.region === entry.region && e.email === entry.email)) return;
  entries.push(entry);
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function addRegionInterest(region: Region, email: string) {
  const entry: RegionInterest = {
    id: randomUUID(),
    region,
    email,
    createdAt: new Date().toISOString(),
  };
  await (databaseUrl ? addPostgres(entry) : addFile(entry));
}

// --- Läsning och borttagning (för /admin) ---

async function readAllFromFile(): Promise<RegionInterest[]> {
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf-8")) as RegionInterest[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function getAllRegionInterest(): Promise<RegionInterest[]> {
  if (!databaseUrl) {
    const entries = await readAllFromFile();
    return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  await ensureTable();
  const rows = (await sql()`
    SELECT id, region, email, created_at FROM region_interest ORDER BY created_at DESC
  `) as Array<{ id: string; region: Region; email: string; created_at: string }>;
  return rows.map((r) => ({
    id: r.id,
    region: r.region,
    email: r.email,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

export async function deleteRegionInterest(id: string) {
  if (!databaseUrl) {
    const entries = await readAllFromFile();
    await writeFile(DATA_FILE, JSON.stringify(entries.filter((e) => e.id !== id), null, 2), "utf-8");
    return;
  }
  await ensureTable();
  await sql()`DELETE FROM region_interest WHERE id = ${id}`;
}
