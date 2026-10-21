// Vanliga frågor på kontaktsidan. Lägg till, ändra eller ta bort frågor här.
// Ett svar består av stycken (text), små mellanrubriker (heading) och
// punktlistor (list).

export type FaqBlock = string | { heading: string } | { list: string[] };

export interface FaqItem {
  q: string;
  a: FaqBlock[];
}

export const FAQ: { category: string; items: FaqItem[] }[] = [
  {
    category: "Allmänt",
    items: [
      {
        q: "Vad är Collaktiv?",
        a: [
          "Collaktiv är ett lojalitetsprogram som belönar dig för att resa med kollektivtrafik. Genom att registrera dina biljetter samlar du resepoäng som kan användas för att lösa in erbjudanden hos våra lokala partners.",
        ],
      },
      {
        q: "Kostar det något att använda Collaktiv?",
        a: [
          "Nej, Collaktiv är helt gratis att använda. Du registrerar dina biljetter och får poäng utan någon kostnad.",
        ],
      },
    ],
  },
  {
    category: "Poäng",
    items: [
      {
        q: "Hur får jag resepoäng?",
        a: [
          "Du får resepoäng genom att registrera dina kollektivtrafikbiljetter i appen. Poängen baseras på biljettpriset.",
        ],
      },
      {
        q: "Hur räknas poängen ut?",
        a: [
          "Du får resepoäng baserat på biljettpriset. För varje krona du spenderar på en biljett får du tillbaka i rabatter hos lokala företag.",
        ],
      },
      {
        q: "Hur hittar jag mitt biljett-ID?",
        a: [
          { heading: "När biljetten har gått ut" },
          "I X-trafik-appen, gå till ”Mer…” → ”Förbrukade biljetter/kvitton”. Klicka på informationsikonen (i) till höger om din biljett för att se ditt biljett-ID.",
          { heading: "Aktiv biljett" },
          "Om biljetten är aktiv, klicka på biljettmenyn längst ner i mitten. Klicka fram mer biljettinfo och se ditt biljett-ID och pris.",
          "Du kan också ladda upp en skärmdump av din biljett så läser vår AI av informationen automatiskt.",
        ],
      },
      {
        q: "Vilka biljetter kan jag registrera?",
        a: [
          "Vi accepterar biljetter köpta i X-trafik-appen. Både enkelbiljetter och periodbiljetter kan registreras. Vi tar även emot biljetter avsedda för tågtrafik.",
          { heading: "Vi tar INTE emot" },
          {
            list: [
              "Busskort (resekort)",
              "Fysiska biljetter",
              "Biljetter köpta på bussen",
              "Biljetter köpta via andra appar",
            ],
          },
        ],
      },
      {
        q: "Vad händer efter att jag registrerat en biljett?",
        a: [
          "Din biljett registreras och valideras varje natt. Vid godkännande tilldelas du resepoäng. Tills biljetten är validerad får den status ”Väntar” – kom tillbaka nästa dag för att se din status.",
        ],
      },
      {
        q: "Hur lång tid tar valideringen?",
        a: [
          "Biljetter valideras varje natt. Du kan se din biljettstatus under ”Se biljettstatus” på registreringssidan.",
        ],
      },
      {
        q: "Hur länge gäller mina poäng?",
        a: [
          "Dina resepoäng har ingen utgångstid. De finns kvar på ditt konto tills du väljer att använda dem för att lösa in erbjudanden.",
        ],
      },
      {
        q: "Kan jag överföra poäng till någon annan?",
        a: [
          "Nej, för tillfället är det inte möjligt att överföra poäng mellan konton. Dina poäng är kopplade till ditt personliga konto.",
        ],
      },
    ],
  },
  {
    category: "Erbjudanden",
    items: [
      {
        q: "Hur löser jag in ett erbjudande?",
        a: [
          "Gå till ”Erbjudanden” i appen, välj det erbjudande du vill ha och klicka på ”Lös in”. När du löser in startar en 10-minuters timer – visa skärmen för kassapersonalen innan tiden går ut för att få din rabatt.",
          "Vissa erbjudanden visar också en rabattkod och slussar dig vidare till nätbutiken där du kan ange den.",
        ],
      },
    ],
  },
  {
    category: "Miljö",
    items: [
      {
        q: "Hur bidrar jag till miljön genom Collaktiv?",
        a: [
          "Genom att resa med kollektivtrafik minskar du dina CO₂-utsläpp jämfört med att köra bil. I appen kan du se hur mycket CO₂ du sparat baserat på dina registrerade resor.",
        ],
      },
      {
        q: "Hur beräknas mina CO₂-besparingar?",
        a: [
          "Vi jämför utsläppen från en genomsnittlig bilresa med utsläppen från motsvarande bussresa.",
        ],
      },
    ],
  },
];
