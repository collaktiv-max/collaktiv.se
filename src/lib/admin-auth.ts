import { cookies } from "next/headers";

// Inloggning till /admin. Lösenordet sätts som miljövariabeln
// ADMIN_PASSWORD i Vercel (Settings → Environment Variables) – det finns
// alltså inget konto som någon annan kan hinna skapa först. Byter du
// lösenordet loggas alla automatiskt ut.

export const ADMIN_COOKIE = "collaktiv_admin";
const SESSION_TTL_S = 12 * 60 * 60; // 12 timmar
const MIN_PASSWORD_LENGTH = 12;

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

async function hmac(key: string, data: string) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data))));
}

function timingSafeEqual(a: string, b: string) {
  const x = encoder.encode(a);
  const y = encoder.encode(b);
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

// Null betyder att admin inte är påslaget (lösenord saknas eller är för kort).
export function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length >= MIN_PASSWORD_LENGTH ? pw : null;
}

export { MIN_PASSWORD_LENGTH };

export async function checkPassword(input: string) {
  const pw = getAdminPassword();
  if (!pw) return false;
  // Jämför hashar så att längden på lösenordet inte läcker via tid.
  return timingSafeEqual(await hmac("compare", input), await hmac("compare", pw));
}

async function signingKey() {
  return hmac(getAdminPassword()!, "collaktiv-admin-session");
}

export async function createSessionCookie() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_S;
  const payload = String(exp);
  const token = `${payload}.${await hmac(await signingKey(), payload)}`;
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_S,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin() {
  // Läs cookien först: det gör att sidor som anropar detta alltid renderas
  // per besök och aldrig byggs statiskt.
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token || !getAdminPassword()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!timingSafeEqual(signature, await hmac(await signingKey(), payload))) return false;
  return Number(payload) > Date.now() / 1000;
}
