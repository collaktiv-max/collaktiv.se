import Link from "next/link";
import { ArrowRight, Mail, Users } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AudienceCards } from "@/components/home/AudienceCards";
import { Container } from "@/components/ui/Container";

const infoLinks = [
  {
    href: "/om-oss",
    icon: Users,
    title: "Om oss",
    text: "Vilka vi är och varför vi vill göra kollektivtrafiken mer lönsam – för alla.",
  },
  {
    href: "/kontakt",
    icon: Mail,
    title: "Kontakta oss",
    text: "Frågor, samarbeten eller press? Vi svarar gärna.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-secondary)] via-white to-white">
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl" />
          <Container className="relative pt-12 pb-14 sm:pt-16 sm:pb-20">
            <div className="mx-auto max-w-3xl text-center animate-slide-up">
              <h1 className="text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                Kollektivtrafik som{" "}
                <span className="text-[var(--color-brand-primary)]">lönar&nbsp;sig</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-[var(--color-brand-muted)] sm:text-lg">
                Collaktiv kopplar ihop dig som åker kollektivt med lokala
                företag som vill belöna dig. Välj din väg in.
              </p>
            </div>

            <div className="mt-10 sm:mt-12">
              <AudienceCards />
            </div>
          </Container>
        </section>

        <section className="pb-16 sm:pb-20">
          <Container className="grid gap-4 sm:grid-cols-2">
            {infoLinks.map(({ href, icon: Icon, title, text }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-2xl border border-[var(--color-brand-border)] p-6 transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="flex items-center gap-2 text-lg font-extrabold">
                    {title}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-[15px] font-medium text-[var(--color-brand-muted)]">
                    {text}
                  </span>
                </span>
              </Link>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
