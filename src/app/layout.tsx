import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Collaktiv – kollektivtrafik som lönar sig",
  description:
    "Collaktiv belönar dig som åker kollektivt med rabatter hos lokala företag – och hjälper företag att nå stadens resenärer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-brand-ink)]">
        {children}
      </body>
    </html>
  );
}
