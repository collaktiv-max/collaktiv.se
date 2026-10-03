import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AudienceCards } from "@/components/home/AudienceCards";
import { Container } from "@/components/ui/Container";
import { HowItWorks } from "@/components/home/sections/HowItWorks";
import { WhyCollaktiv } from "@/components/home/sections/WhyCollaktiv";
import { AppFeatures } from "@/components/home/sections/AppFeatures";
import { Impact } from "@/components/home/sections/Impact";
import { About } from "@/components/home/sections/About";
import { ForBusinesses } from "@/components/home/sections/ForBusinesses";
import { FinalCta } from "@/components/home/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-brand-secondary)] via-white to-white">
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl" />
          <Container className="relative pt-7 pb-10 sm:pt-14 sm:pb-20">
            <div className="text-center animate-slide-up">
              <h1 className="mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.06] sm:leading-[1.03] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.75rem]">
                Bli belönad för ditt{" "}
                <span className="text-[var(--color-brand-primary)]">hållbara&nbsp;val</span>
              </h1>
              <p className="mt-4 hidden text-[17px] font-semibold md:block text-[var(--color-brand-muted)]">
                Välj din väg in.
              </p>
            </div>

            <div className="mt-6 sm:mt-10">
              <AudienceCards />
            </div>
          </Container>
        </section>

        <HowItWorks />
        <WhyCollaktiv />
        <AppFeatures />
        <Impact />
        <About />
        <ForBusinesses />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
