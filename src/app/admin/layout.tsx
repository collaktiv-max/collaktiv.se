import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – Collaktiv",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-[var(--color-brand-secondary)]">{children}</div>;
}
