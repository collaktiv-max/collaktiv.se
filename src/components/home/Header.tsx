import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakta oss" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--color-brand-border)] bg-white">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label="Collaktiv – startsida">
          <Logo />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-[var(--color-brand-ink)]/80 transition hover:text-[var(--color-brand-primary)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
