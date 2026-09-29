// Liten buss i sidovy, i Collaktivs färger. Fronten pekar åt höger.
export function Bus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} aria-hidden="true">
      {/* Kaross */}
      <rect x="1" y="2" width="60" height="23" rx="6" fill="var(--color-brand-primary)" />
      {/* Taklist */}
      <rect x="6" y="0" width="44" height="4" rx="2" fill="var(--color-brand-primary-hover)" />
      {/* Fönster */}
      <rect x="6" y="7" width="10" height="8" rx="2" fill="var(--color-brand-mint)" />
      <rect x="19" y="7" width="10" height="8" rx="2" fill="var(--color-brand-mint)" />
      <rect x="32" y="7" width="10" height="8" rx="2" fill="var(--color-brand-mint)" />
      {/* Framruta och dörr */}
      <path d="M49 7h6.5a3 3 0 0 1 3 3v5H49z" fill="var(--color-brand-mint)" />
      <rect x="45" y="7" width="2" height="15" rx="1" fill="var(--color-brand-primary-hover)" />
      {/* Grön accentrand */}
      <rect x="1" y="18" width="60" height="2.5" fill="var(--color-brand-accent)" />
      {/* Strålkastare */}
      <rect x="58" y="20" width="3" height="3" rx="1" fill="#fff6c9" />
      {/* Hjul */}
      <circle cx="15" cy="25" r="5" fill="var(--color-brand-ink)" />
      <circle cx="15" cy="25" r="2" fill="#ffffff" />
      <circle cx="47" cy="25" r="5" fill="var(--color-brand-ink)" />
      <circle cx="47" cy="25" r="2" fill="#ffffff" />
    </svg>
  );
}
