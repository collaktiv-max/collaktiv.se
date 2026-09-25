import { isAdmin } from "@/lib/admin-auth";
import { getAllRegionInterest } from "@/lib/region-interest-db";

// Laddar ner alla anmälningar som CSV (öppnas direkt i Excel/Numbers).
export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Inte inloggad.", { status: 401 });
  }

  const entries = await getAllRegionInterest();
  const toLocal = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Stockholm",
  });
  // Värden som börjar med = + - @ skulle Excel tolka som formler.
  const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
  const lines = [
    ["E-post", "Region", "Anmäld"].map(cell).join(";"),
    ...entries.map((e) =>
      [e.email, e.region, toLocal.format(new Date(e.createdAt))].map(cell).join(";")
    ),
  ];
  // BOM så att Excel läser å, ä och ö rätt.
  const csv = "﻿" + lines.join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="collaktiv-vantelista-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
