import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SimplePage } from "@/components/home/SimplePage";
import { Faq } from "@/components/home/Faq";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = { title: "Kontakta oss – Collaktiv" };

export default function KontaktPage() {
  return (
    <SimplePage title="Kontakta oss">
      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-extrabold text-[var(--color-brand-ink)] sm:text-2xl">
          Varför kontakta oss?
        </h2>
        <p className="mt-2">
          Din feedback är ovärderlig för oss! Oavsett om du har förslag, frågor eller vill
          rapportera ett problem.
        </p>
        <div className="mt-5">
          <Button
            href={`mailto:${CONTACT_EMAIL}`}
            size="lg"
            icon={<Mail className="h-5 w-5" />}
            iconPosition="left"
          >
            {CONTACT_EMAIL}
          </Button>
        </div>
      </div>

      <div className="pt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-brand-ink)] sm:text-3xl">
          Vanliga frågor
        </h2>
        <p className="mt-2">Hittar du inte svaret här? Mejla oss så hjälper vi dig.</p>
        <div className="mt-6">
          <Faq />
        </div>
      </div>
    </SimplePage>
  );
}
