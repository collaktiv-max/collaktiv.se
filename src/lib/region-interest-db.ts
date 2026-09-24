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
  let entries: RegionInterest[] = [];
  try {
    entries = JSON.parse(await readFile(DATA_FILE, "utf-8")) as RegionInterest[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
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
