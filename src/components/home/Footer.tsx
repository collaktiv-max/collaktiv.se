import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/config";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

const chip =
  "inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--color-brand-ink)] transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-brand-border)] py-8">
      <Container className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Sidfot" className="flex flex-wrap gap-2.5">
          <Link href="/om-oss" className={chip}>
            Om oss
          </Link>
          <Link href="/kontakt" className={chip}>
            Kontakta oss
          </Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={chip}>
            <InstagramIcon />
            Instagram
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className={chip}>
            <TikTokIcon />
            TikTok
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={chip}>
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
        </nav>
        <p className="text-xs font-semibold text-[var(--color-brand-muted)]">
          © {new Date().getFullYear()} Collaktiv · Gävle
        </p>
      </Container>
    </footer>
  );
}
