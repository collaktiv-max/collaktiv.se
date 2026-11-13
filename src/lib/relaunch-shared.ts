// Delas mellan server och klient (ingen databaskod här).

export interface RelaunchUser {
  email: string;
  name: string | null;
  /** Har godkänt nyheter och erbjudanden. */
  consent: boolean;
  consentAt: string | null;
  addedAt: string;
}

export interface ImportRow {
  email: string;
  name: string | null;
  consentAt: string | null;
}

const EMAIL_RE = /[a-z0-9._%+'-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?/;

// Tecken som Windows-1252 visar för byte 0x80–0x9F.
const CP1252 = "€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008DŽ\u008F\u0090‘’“”•–—˜™š›œ\u009DžŸ";

/** Rättar text som är UTF-8 men lästs som Windows-1252, t.ex. "OhlÃ¥ker" → "Ohlåker". */
export function fixMojibake(s: string): string {
  if (!/[ÃÂ]/.test(s)) return s;
  const bytes: number[] = [];
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    const i = CP1252.indexOf(ch);
    if (code < 0x80 || (code >= 0xa0 && code <= 0xff)) bytes.push(code);
    else if (i >= 0) bytes.push(0x80 + i);
    else return s;
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    return s;
  }
}

/**
 * Läser inklistrad text. Klarar både en ren lista med adresser och en
 * CSV-export med rader som `Namn,"e-post","2026-05-05T19:50:32+00:00"`.
 * Adresser görs om till gemener och dubbletter tas bort.
 */
export function parseImport(text: string): ImportRow[] {
  const rows = new Map<string, ImportRow>();
  for (const line of text.split(/\r?\n/)) {
    const emails = [...new Set((line.match(EMAIL_RE) ?? []).map(normalize))];
    if (emails.length === 1) {
      const email = emails[0];
      const before = line.slice(0, line.toLowerCase().indexOf(email)).replace(/[",;\s]+$/, "");
      const name = fixMojibake(before.replace(/^["\s]+/, "").trim()) || null;
      const date = line.match(DATE_RE)?.[0];
      const consentAt =
        date && !Number.isNaN(Date.parse(date)) ? new Date(date).toISOString() : null;
      rows.set(email, { email, name, consentAt });
    } else {
      for (const email of emails) {
        if (!rows.has(email)) rows.set(email, { email, name: null, consentAt: null });
      }
    }
  }
  return [...rows.values()];
}

function normalize(email: string) {
  return email.toLowerCase().replace(/\.+$/, "");
}

// Vanliga felstavningar av domäner – mailen studsar troligen.
const TYPO_DOMAINS = new Set([
  "gmsil.com",
  "gnail.com",
  "gamil.com",
  "gmali.com",
  "gmai.com",
  "gmial.com",
  "gmail.con",
  "gmail.co",
  "gmail.se",
  "gmwil.vpm",
  "hotmailm.com",
  "hotmal.com",
  "hotmail.con",
  "hotmail.cim",
  "icloud.col",
  "icloud.con",
  "icloud.se",
  "ickoud.com",
  "iclod.com",
  "ucloud.com",
  "outlook.con",
  "yahoo.con",
]);

// Domäner som ser påhittade ut.
const FAKE_DOMAINS = new Set(["mdoe.com", "kdoe.se"]);

const TEST_ADDRESSES = new Set([
  "admin@admin.com",
  "admin@gmail.com",
  "asd@asd.com",
  "t@t.com",
  "test@test.com",
  "kkk@fjj.se",
  "fssdfs@gmail.com",
]);

const TEST_NAMES = new Set(["admin", "test"]);

export type EmailFlag = "typo" | "test";

export function flagEmail(email: string, name?: string | null): EmailFlag | null {
  const domain = email.split("@")[1] ?? "";
  if (TEST_ADDRESSES.has(email) || FAKE_DOMAINS.has(domain)) return "test";
  if (name && TEST_NAMES.has(name.trim().toLowerCase())) return "test";
  if (TYPO_DOMAINS.has(domain)) return "typo";
  return null;
}

export const FLAG_LABEL: Record<EmailFlag, string> = {
  typo: "Felstavad domän?",
  test: "Testadress?",
};
