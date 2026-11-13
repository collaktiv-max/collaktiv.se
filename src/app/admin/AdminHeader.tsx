import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { logout } from "./actions";

const tabs = [
  { href: "/admin", label: "Väntelista" },
  { href: "/admin/nylansering", label: "Nylansering" },
] as const;

export function AdminHeader({ active }: { active: (typeof tabs)[number]["href"] }) {
  return (
    <header className="border-b border-[var(--color-brand-border)] bg-white">
      <Container className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <span className="hidden rounded-full bg-[var(--color-brand-primary)]/10 px-2.5 py-1 text-xs font-extrabold text-[var(--color-brand-primary)] sm:inline">
            Admin
          </span>
        </div>
        <nav
          aria-label="Admin"
          className="order-last flex w-full gap-1 sm:order-none sm:ml-auto sm:w-auto"
        >
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              aria-current={t.href === active ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                t.href === active
                  ? "bg-[var(--color-brand-secondary)] text-[var(--color-brand-ink)]"
                  : "text-[var(--color-brand-muted)] hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-brand-ink)]"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <button
            type="submit"
            aria-label="Logga ut"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[var(--color-brand-muted)] transition hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-brand-ink)]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logga ut</span>
          </button>
        </form>
      </Container>
    </header>
  );
}
