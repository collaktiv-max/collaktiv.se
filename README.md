# Collaktiv – collaktiv.se

Landningssidan på collaktiv.se fram till lansering. Den skickar besökarna till
rätt ställe:

- **Resenärer** går till väntelistan ([collaktiv-max/v-ntelista](https://github.com/collaktiv-max/v-ntelista)).
  Den som bor i en annan region kan välja sin region och lämna sin e-post. Vi
  sparar det inför kommande regioner.
- **Företag** går till företagsportalen ([collaktiv-max/Collaktiv](https://github.com/collaktiv-max/Collaktiv)).
- Undersidorna **Om oss** (`/om-oss`) och **Kontakta oss** (`/kontakt`) finns
  som enkla sidor och byggs ut senare.

Byggt med Next.js (App Router), TypeScript och Tailwind CSS v4, i samma
grafiska profil som portalen och väntelistan.

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Länkar till väntelistan och portalen

Alla länkar finns i `src/lib/config.ts`:

- `WAITLIST_URL` är adressen till väntelistan. Så länge den är `null` öppnar
  resenärsrutan en anmälan med pilotregionen förvald.
- `PORTAL_URL` är adressen till företagsportalen. Så länge den är `null` leder
  företagsrutan till kontaktsidan.

## Var regionanmälningarna sparas

Anmälningarna skickas till `POST /api/regionintresse` och sparas via
`src/lib/region-interest-db.ts`:

- **Lokalt**, utan databas: i `data/region-interest.json`. Filen committas aldrig.
- **På Vercel**: i Postgres (Neon) via `DATABASE_URL`, i tabellen
  `region_interest` med kolumnerna region, e-post och datum. Samma e-post i
  samma region sparas bara en gång.

## Adminsidan (/admin)

På `/admin` ser du alla anmälningar: antal totalt, antal per region, en
lista där du kan söka och filtrera, och en knapp som laddar ner allt som
CSV (öppnas i Excel eller Numbers). Du kan också ta bort en anmälan, till
exempel om någon ber att bli borttagen.

Du slår på sidan genom att sätta ett lösenord:

1. I Vercel: **Settings → Environment Variables**, lägg till
   `ADMIN_PASSWORD` med ett långt lösenord (minst 12 tecken).
2. Gör en ny driftsättning med **Deployments → ⋯ → Redeploy**.
3. Gå till `collaktiv.se/admin` och logga in.

Om du byter lösenordet (och gör en Redeploy) loggas alla som är inloggade
ut. Lokalt kör du `ADMIN_PASSWORD=ettlangtlosenord npm run dev`.

## Driftsättning på Vercel

1. På [vercel.com](https://vercel.com): **Add New → Project**, välj
   `collaktiv-max/collaktiv.se` och klicka **Import**. Du behöver inte ändra
   några inställningar.
2. Koppla en databas: gå till projektet, välj **Storage → Create Database →
   Neon (Postgres)** och koppla den till projektet. `DATABASE_URL` sätts då
   automatiskt.
3. Gör en ny driftsättning med **Deployments → ⋯ → Redeploy**, så att
   databasen läses in.
4. Koppla domänen under **Settings → Domains** och lägg till `collaktiv.se`.

Allt som pushas till `main` publiceras live. Andra brancher får en egen
förhandsvisningslänk.
