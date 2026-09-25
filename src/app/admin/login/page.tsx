import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Logo } from "@/components/ui/Logo";
import { getAdminPassword, isAdmin, MIN_PASSWORD_LENGTH } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  await connection();
  if (await isAdmin()) redirect("/admin");
  const enabled = getAdminPassword() !== null;

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl shadow-[var(--color-brand-primary)]/5">
        <Logo />
        <h1 className="mt-6 text-2xl font-extrabold">Admin</h1>
        {enabled ? (
          <>
            <p className="mt-2 mb-6 text-[15px] font-medium text-[var(--color-brand-muted)]">
              Logga in för att se anmälningarna.
            </p>
            <LoginForm />
          </>
        ) : (
          <div className="mt-3 space-y-3 text-[15px] font-medium leading-relaxed text-[var(--color-brand-muted)]">
            <p>Adminsidan är inte påslagen än.</p>
            <p>
              Lägg till miljövariabeln <code className="font-bold text-[var(--color-brand-ink)]">ADMIN_PASSWORD</code>{" "}
              (minst {MIN_PASSWORD_LENGTH} tecken) i Vercel under Settings → Environment
              Variables och gör sedan en Redeploy.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
