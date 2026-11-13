import { isAdmin } from "@/lib/admin-auth";
import { getRelaunchUsers } from "@/lib/relaunch-db";
import { FLAG_LABEL, flagEmail } from "@/lib/relaunch-shared";

// CSV med användarna utan samtycke (endast informationsmail).
export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Inte inloggad.", { status: 401 });
  }
  const users = await getRelaunchUsers();
  const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
  const lines = [
    ["E-post", "Utskick", "Kontrollera"].map(cell).join(";"),
    ...users.map((u) => {
      const flag = flagEmail(u.email);
      return [u.email, "Endast informationsmail", flag ? FLAG_LABEL[flag] : ""].map(cell).join(";");
    }),
  ];
  const csv = "﻿" + lines.join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="collaktiv-utan-samtycke-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
