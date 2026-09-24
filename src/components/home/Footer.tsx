import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-brand-border)] py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-[var(--color-brand-muted)]">
          <Link href="/om-oss" className="hover:text-[var(--color-brand-primary)]">
            Om oss
          </Link>
          <Link href="/kontakt" className="hover:text-[var(--color-brand-primary)]">
            Kontakta oss
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--color-brand-primary)]">
            {CONTACT_EMAIL}
          </a>
        </nav>
        <p className="text-xs font-medium text-[var(--color-brand-muted)]">
          © {new Date().getFullYear()} Collaktiv. Gävle, Sverige
        </p>
      </Container>
    </footer>
  );
}
