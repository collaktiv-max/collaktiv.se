"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, clearSessionCookie, createSessionCookie, isAdmin } from "@/lib/admin-auth";
import { deleteRegionInterest } from "@/lib/region-interest-db";

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
