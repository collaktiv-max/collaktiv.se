// Delas mellan server och klient (ingen databaskod här).

const EMAIL_RE = /[a-z0-9._%+'-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

/** Plockar ut unika e-postadresser (gemener) ur inklistrad text. */
export function extractEmails(text: string): string[] {
  const found = text.match(EMAIL_RE) ?? [];
  return [...new Set(found.map((e) => e.toLowerCase().replace(/\.+$/, "")))];
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
  "icloud.col",
  "icloud.con",
  "icloud.se",
  "ickoud.com",
  "iclod.com",
  "outlook.con",
  "yahoo.con",
]);

const TEST_ADDRESSES = new Set([
  "admin@admin.com",
  "admin@gmail.com",
  "asd@asd.com",
  "t@t.com",
  "test@test.com",
  "kkk@fjj.se",
  "fssdfs@gmail.com",
]);

export type EmailFlag = "typo" | "test";

export function flagEmail(email: string): EmailFlag | null {
  if (TEST_ADDRESSES.has(email)) return "test";
  const domain = email.split("@")[1] ?? "";
  if (TYPO_DOMAINS.has(domain)) return "typo";
  return null;
}

export const FLAG_LABEL: Record<EmailFlag, string> = {
  typo: "Felstavad domän?",
  test: "Testadress?",
};
