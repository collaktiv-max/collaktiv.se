import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "@/components/ui/Container";

// Enkel mall för undersidor (Om oss, Kontakt) tills de byggs ut.
export function SimplePage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-[var(--color-brand-secondary)] to-white">
        <Container className="max-w-3xl py-14 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-muted)] hover:text-[var(--color-brand-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Till startsidan
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-6 space-y-4 text-[16px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
