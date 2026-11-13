"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { addRelaunchUsers, clearRelaunchUsers, deleteRelaunchUser } from "@/lib/relaunch-db";
import { extractEmails } from "@/lib/relaunch-shared";

export interface ImportResult {
  found: number;
  added: number;
  duplicates: number;
}

export async function importRelaunchUsers(
  _prev: ImportResult | null,
  formData: FormData,
): Promise<ImportResult | null> {
  if (!(await isAdmin())) redirect("/admin/login");
  const text = formData.get("emails");
  if (typeof text !== "string") return null;
  const emails = extractEmails(text);
  const added = await addRelaunchUsers(emails);
  revalidatePath("/admin/nylansering");
  return { found: emails.length, added, duplicates: emails.length - added };
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
