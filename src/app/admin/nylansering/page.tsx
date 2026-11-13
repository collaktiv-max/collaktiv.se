import { redirect } from "next/navigation";
import { Download, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { isAdmin } from "@/lib/admin-auth";
import { getRelaunchUsers } from "@/lib/relaunch-db";
import { AdminHeader } from "../AdminHeader";
import { ImportForm } from "./ImportForm";
import { RelaunchList } from "./RelaunchList";

export const metadata = { title: "Nylansering – Admin" };

const proposal = [
  {
    title: "Informationsmail till alla användare (listan nedan)",
    text: "Mailet ska bara informera om tjänsten: att Collaktiv lanseras på nytt, vad som ändras och vad som händer med kontot och poängen. Det får inte innehålla erbjudanden eller säljande text.",
  },
  {
    title: "Fråga om samtycke i samma mail",
    text: "Lägg till en knapp, till exempel ”Ja, jag vill få nyheter och erbjudanden”. Den som klickar läggs till bland dem som har godkänt utskick.",
  },
  {
    title: "Marknadsföring",
    text: "Marknadsföring skickas bara till de som har godkänt utskick (80 st, finns inte med här) och till väntelistan.",
  },
  {
    title: "Avregistrering",
    text: "Varje mail ska ha en tydlig länk för att avregistrera sig.",
  },
  {
    title: "Framåt",
    text: "Gör samtycket till mailutskick till en egen frivillig kryssruta vid registrering, separat från GDPR-rutan.",
  },
];

export default async function RelaunchPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const users = await getRelaunchUsers();

  return (
    <>
      <AdminHeader active="/admin/nylansering" />
      <main className="py-10">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Nylansering</h1>
              <p className="mt-1 text-[15px] font-medium text-[var(--color-brand-muted)]">
                Collaktiv – förslag för mailutskick vid nylansering
              </p>
            </div>
            {users.length > 0 && (
              <a
                href="/admin/nylansering/export"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[var(--color-brand-primary-hover)]"
              >
                <Download className="h-4 w-4" />
                Ladda ner CSV
              </a>
            )}
          </div>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold">Förslag</h2>
            <ol className="mt-4 space-y-4">
              {proposal.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-sm font-extrabold text-[var(--color-brand-primary)]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold">{p.title}</h3>
                    <p className="mt-0.5 text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-[var(--color-brand-secondary)] p-3 text-sm font-semibold text-[var(--color-brand-muted)]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              Det här är allmän vägledning, ingen juridisk rådgivning.
            </p>
          </section>

          <RelaunchList users={users} />

          <ImportForm hasUsers={users.length > 0} />
        </Container>
      </main>
    </>
  );
}
