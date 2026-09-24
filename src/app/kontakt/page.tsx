import type { Metadata } from "next";
import { SimplePage } from "@/components/home/SimplePage";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = { title: "Kontakta oss – Collaktiv" };

export default function KontaktPage() {
  return (
    <SimplePage title="Kontakta oss">
      <p>
        Vill ditt företag bli partner, har du frågor om Collaktiv eller vill du
        samarbeta? Skicka ett mejl så återkommer vi så snart vi kan.
      </p>
      <div className="pt-2">
        <Button href={`mailto:${CONTACT_EMAIL}`} size="lg">
          {CONTACT_EMAIL}
        </Button>
      </div>
    </SimplePage>
  );
}
