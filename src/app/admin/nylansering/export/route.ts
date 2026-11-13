import { isAdmin } from "@/lib/admin-auth";
import { getRelaunchUsers } from "@/lib/relaunch-db";
import { FLAG_LABEL, flagEmail } from "@/lib/relaunch-shared";

// CSV med alla befintliga användare och om de har godkänt utskick.
export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Inte inloggad.", { status: 401 });
  }
  const users = await getRelaunchUsers();
  const toLocal = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Stockholm",
  });
  const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
  const lines = [
    ["E-post", "Namn", "Utskick", "Samtycke gavs", "Kontrollera"].map(cell).join(";"),
    ...users.map((u) => {
      const flag = flagEmail(u.email, u.name);
      return [
        u.email,
        u.name ?? "",
        u.consent ? "Har godkänt utskick" : "Endast informationsmail",
        u.consentAt ? toLocal.format(new Date(u.consentAt)) : "",
        flag ? FLAG_LABEL[flag] : "",
      ]
        .map(cell)
        .join(";");
    }),
  ];
  const csv = "﻿" + lines.join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="collaktiv-nylansering-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
