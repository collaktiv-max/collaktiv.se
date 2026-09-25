"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { login } from "../actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action}>
      <label htmlFor="password" className="block text-sm font-bold">
        Lösenord
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-xl border border-[var(--color-brand-border)] px-4 py-3 text-[15px] font-semibold outline-none focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={pending}>
        {pending ? "Loggar in…" : "Logga in"}
      </Button>
    </form>
  );
}
