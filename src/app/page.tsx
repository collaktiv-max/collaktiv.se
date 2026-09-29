import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AudienceCards } from "@/components/home/AudienceCards";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-secondary)] via-white to-white">
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl" />
          <Container className="relative pt-10 pb-16 sm:pt-14 sm:pb-20">
            <div className="text-center animate-slide-up">
              <h1 className="mx-auto max-w-4xl text-[2.35rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.75rem]">
                Bli belönad för ditt{" "}
                <span className="text-[var(--color-brand-primary)]">hållbara&nbsp;val</span>
              </h1>
              <p className="mt-4 text-[17px] font-semibold text-[var(--color-brand-muted)]">
                Välj din väg in.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <AudienceCards />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
