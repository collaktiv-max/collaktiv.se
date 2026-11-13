"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, clearSessionCookie, createSessionCookie, isAdmin } from "@/lib/admin-auth";
import { addRegionInterestBulk, deleteRegionInterest } from "@/lib/region-interest-db";
import { isRegion } from "@/lib/regions";
import { parseImport } from "@/lib/relaunch-shared";

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = formData.get("password");
  if (typeof password !== "string" || !(await checkPassword(password))) {
    // Liten fördröjning gör det meningslöst att gissa lösenord i hög takt.
    await new Promise((r) => setTimeout(r, 1000));
    return "Fel lösenord.";
  }
  await createSessionCookie();
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function removeEntry(id: string) {
  if (!(await isAdmin())) redirect("/admin/login");
  await deleteRegionInterest(id);
  revalidatePath("/admin");
}

export interface WaitlistImportResult {
  found: number;
  added: number;
  error?: string;
}

export async function importToWaitlist(
  _prev: WaitlistImportResult | null,
  formData: FormData,
): Promise<WaitlistImportResult | null> {
  if (!(await isAdmin())) redirect("/admin/login");
  const text = formData.get("emails");
  const region = formData.get("region");
  if (typeof text !== "string") return null;
  if (!isRegion(region)) return { found: 0, added: 0, error: "Välj en region." };
  const rows = parseImport(text);
  const added = await addRegionInterestBulk(
    region,
    rows.map((r) => ({ email: r.email, createdAt: r.consentAt })),
  );
  revalidatePath("/admin");
  return { found: rows.length, added };
}
