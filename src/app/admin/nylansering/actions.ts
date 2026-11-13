"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import {
  clearRelaunchUsers,
  deleteRelaunchUser,
  importRelaunchUsers as importUsers,
  type ImportCounts,
} from "@/lib/relaunch-db";
import { parseImport } from "@/lib/relaunch-shared";

export interface ImportResult extends ImportCounts {
  found: number;
  consent: boolean;
}

export async function importRelaunchUsers(
  _prev: ImportResult | null,
  formData: FormData,
): Promise<ImportResult | null> {
  if (!(await isAdmin())) redirect("/admin/login");
  const text = formData.get("emails");
  if (typeof text !== "string") return null;
  const consent = formData.get("list") === "consent";
  const rows = parseImport(text);
  const counts = await importUsers(rows, consent);
  revalidatePath("/admin/nylansering");
  return { found: rows.length, consent, ...counts };
}

export async function removeRelaunchUser(email: string) {
  if (!(await isAdmin())) redirect("/admin/login");
  await deleteRelaunchUser(email);
  revalidatePath("/admin/nylansering");
}

export async function clearAllRelaunchUsers() {
  if (!(await isAdmin())) redirect("/admin/login");
  await clearRelaunchUsers();
  revalidatePath("/admin/nylansering");
}
