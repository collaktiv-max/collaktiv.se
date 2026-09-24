import { NextResponse } from "next/server";
import { addRegionInterest } from "@/lib/region-interest-db";
import { isRegion } from "@/lib/regions";
import { getStorageProblem } from "@/lib/db-env";

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const GENERIC_STORAGE_ERROR =
  "Kunde inte spara din anmälan just nu. Försök igen om en liten stund.";

export async function POST(request: Request) {
  const storageProblem = getStorageProblem();
  if (storageProblem) {
    console.error("[regionintresse] lagringsproblem:", storageProblem);
    return NextResponse.json({ error: GENERIC_STORAGE_ERROR }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const { region, email } = (body ?? {}) as Record<string, unknown>;

  if (!isRegion(region)) {
    return NextResponse.json({ error: "Välj en region." }, { status: 400 });
  }
  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Ange en giltig e-postadress." }, { status: 400 });
  }

  try {
    await addRegionInterest(region, email.trim().toLowerCase());
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[regionintresse] kunde inte spara anmälan:", err);
    return NextResponse.json({ error: GENERIC_STORAGE_ERROR }, { status: 500 });
  }
}
