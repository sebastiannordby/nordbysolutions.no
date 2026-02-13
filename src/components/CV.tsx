// src/components/CV.tsx
import React from 'react';

export const CV = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-white text-gray-900 font-sans leading-relaxed">
    {/* Header */}
    <section className="border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold">Sebastian Nordby</h1>
      <p className="text-sm text-gray-600">
        post@norso.no • +47 479 64 635 • norso.no •{' '}
        <a
          className="underline"
          href="https://www.linkedin.com/in/sebastian-nordby-b45087152/"
        >
          LinkedIn
        </a>
      </p>
    </section>

    {/* Summary */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">Sammendrag</h2>
      <p>
        Senior .NET-utvikler og Tech Lead med erfaring innen modernisering av
        legacy‑systemer, domenedrevet utvikling, API‑design, skyarkitektur og
        teknisk gjeld. Jeg trives i skjæringspunktet mellom dyp teknisk
        implementasjon og strukturert teamledelse, og har lang erfaring med å
        bygge robuste systemer, mentorere utviklere og sikre stabile leveranser.
      </p>
    </section>

    {/* Experience */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Erfaring</h2>

      {/* Tech Lead */}
      <article className="mb-8">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium text-lg">Tech Lead – Apotek 1</h3>
          <span className="text-gray-600">januar 2025 – nå</span>
        </div>
        <p className="text-gray-700">Lørenskog, Norge</p>

        <p className="mt-2">
          Ansvar for et team bestående av 3 seniorutviklere, 1 mid‑level, 1
          lærling og 1 praksiselev. Rollen kombinerer tung teknisk
          implementasjon med ledelse, arkitektur og koordinering. Teamet har
          ingen dedikerte roller som produkteier, løsningsarkitekt eller
          kodearkitekt – disse funksjonene ligger hos meg.
        </p>

        <p className="mt-2">
          Jeg jobber med systemer på tvers av flere domener i organisasjonen.
          Noen av løsningene er kommersielle systemer som håndterer
          kampanjeplanlegging, vareforsyning og butikkstøtte, mens andre er mer
          tekniske og operasjonelle systemer som omhandler lagerstyring,
          logistikkflyt og produksjon av medisiner. Dette krever bred
          domeneforståelse og evne til å se helheten i verdikjeden.
        </p>

        <p className="mt-2">
          Arbeidet foregår i et miljø med strenge krav til sikkerhet, compliance
          og håndtering av sensitive data. Systemene er delt inn i ulike
          sikkerhetssoner med forskjellige tilgangsnivåer og restriksjoner – fra
          soner som er tilgjengelige for interne brukere med lavere
          sensitivitet, til soner med høyere sikkerhetskrav, begrenset
          nettverkstilgang og særskilte krav til logging, sporbarhet og
          kontrollert dataflyt. All utvikling må ta hensyn til disse sonene og
          sikre korrekt og trygg kommunikasjon mellom dem.
        </p>

        <p className="mt-2">
          Jeg driver kontinuerlig planlegging i Jira, estimering, oppfølging av
          sprintmål og kvalitetssikring av leveranser. Jeg dokumenterer
          arkitektur, beslutninger og tekniske retningslinjer i Confluence for å
          sikre felles forståelse og langsiktig vedlikeholdbarhet.
        </p>

        <p className="mt-2">
          Jeg koder fortsatt en betydelig del selv, både i backend og frontend,
          og tar ansvar for komplekse oppgaver som krever dyp domeneforståelse,
          refaktorering, modernisering og forbedring av teknisk gjeld. Jeg
          fungerer som sparringspartner for utviklerne og sikrer at teamet
          følger gode mønstre, prinsipper og arkitekturvalg.
        </p>

        <p className="mt-2">
          Jeg holder statusmøter med teamet og andre interessenter, og sørger
          for riktig prioritering mellom nye features og teknisk gjeld. Jeg
          koordinerer tett med plattformteamet for å sikre riktige
          Azure‑ressurser. Utviklere kan ikke sette opp landing zones selv, så
          jeg sørger for at vi følger standardiserte formater og konfigurerer
          resten via Bicep/IaC.
        </p>

        <p className="mt-2">
          Overordnet sørger jeg for at teamet leverer godt, har tydelige mål, og
          ikke møter unødvendige hindringer i utviklingsløpet.
        </p>

        <h4 className="font-medium mt-3">Teknologier:</h4>
        <p>
          C#, ASP.NET Core, .NET Framework, React, SQL Server, Azure DevOps,
          Azure, Bicep, WinUI, WPF, UWP, databaseprofilering, diagramtegning,
          gRPC, Jira, Confluence
        </p>

        <h4 className="font-medium mt-3">Rollefordeling:</h4>
        <ul className="list-disc ml-5">
          <li>60 % koding</li>
          <li>30 % mentorering/oppfølging</li>
          <li>10 % planlegging, møter og koordinering</li>
        </ul>
      </article>

      {/* .NET Developer */}
      {/* .NET Developer */}
      <article className="mb-8">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium text-lg">.NET‑utvikler – Apotek 1</h3>
          <span className="text-gray-600">februar 2024 – januar 2025</span>
        </div>
        <p className="text-gray-700">Lørenskog, Norge</p>

        <p className="mt-2">
          Jeg ble ansatt på grunn av erfaring med modernisering av
          legacy‑systemer. Apotek 1 har flere systemkritiske løsninger basert på
          utdaterte teknologier, manglende sikkerhetspraksis, svak resiliens,
          tight coupling, .NET Framework, WCF og klient‑til‑database‑arkitektur.
          Jeg hadde også ansvar for mentorering av praksiselever og for å
          rekruttere/evaluere elever fra videregående skole.
        </p>

        <p className="mt-2">
          Arbeidet foregikk i et miljø med strenge krav til compliance,
          sikkerhet og håndtering av pasientvern og personvern. Systemene er
          delt inn i ulike sikkerhetssoner med forskjellige tilgangsnivåer og
          restriksjoner, der noen soner er tilgjengelige for interne brukere med
          lavere sensitivitet, mens andre soner krever høyere sikkerhetsnivå,
          strengere kontroll, begrenset nettverkstilgang og særskilte krav til
          logging, sporbarhet og databehandling. All utvikling måtte ta hensyn
          til disse sonene og sikre korrekt dataflyt mellom dem.
        </p>

        <h4 className="font-medium mt-3">Mine oppgaver:</h4>
        <ul className="list-disc ml-5">
          <li>Migrere WCF‑tjenester til moderne ASP.NET Core‑baserte API‑er</li>
          <li>
            Konvertere klient‑til‑database‑løsninger til API‑basert arkitektur
            (tykkklient → API)
          </li>
          <li>
            Drift, feilretting og stabilisering av systemkritiske løsninger
          </li>
          <li>Fornye og erstatte integrasjoner (f.eks. SOAP → HTTP)</li>
          <li>
            Sikre at løsninger oppfylte krav til sikkerhet, personvern og
            soneskiller mellom ulike nivåer av sensitivitet
          </li>
          <li>
            Dokumentasjon av tekniske beslutninger, arkitektur og prosesser i
            Confluence
          </li>
          <li>
            Planlegging, estimering og oppfølging av arbeid i Jira sammen med
            teamet
          </li>
        </ul>

        <p className="mt-2">
          Arbeidet var i hovedsak knyttet til teknisk gjeld og modernisering.
          Sluttmålet er sky/Azure, men første steg var å få koden oppdatert,
          isolert og abstrahert slik at systemene kunne bevege seg i retning av
          en mer robust, sikker og fremtidsrettet arkitektur.
        </p>

        <h4 className="font-medium mt-3">Teknologier:</h4>
        <p>
          C#, ASP.NET Core, .NET Framework, React, SQL Server, Azure DevOps,
          Azure, Bicep, WinUI, WPF, UWP, diagramtegning, gRPC, Jira, Confluence
        </p>
      </article>

      {/* System Developer */}
      <article className="mb-8">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium text-lg">Systemutvikler – ECIT WLCOM</h3>
          <span className="text-gray-600">april 2020 – august 2024</span>
        </div>
        <p className="text-gray-700">Oslo, Norge</p>

        <p className="mt-2">
          Jeg hadde ansvar for mentorering av praksiselever og lærlinger. Det
          ble besluttet at et rent CRUD‑API ga for mye frihet og for lite
          kontroll over domenelogikken. Jeg deltok delvis i denne beslutningen.
          Siden resten av teamet jobbet utelukkende i C#/.NET, ble det også
          valgt å gå over til Blazor, som på dette tidspunktet ble sterkt
          promotert av Microsoft.
        </p>

        <p className="mt-2">
          Jeg jobbet mye med å kapsle inn «Use Cases» nærmere domenespråket, som
          for eksempel
          <em> CreditInvoice</em>. Jeg skrev om den JavaScript‑baserte
          frontenden til Blazor mot det nye API-et for å støtte de nye
          arbeidsflytene.
        </p>

        <p className="mt-2">
          Systemet skulle erstatte to legacy‑systemer. Jeg var eneste utvikler
          på frontend, og backend bestod av 1 til 3 utviklere avhengig av
          periode, der jeg var alltid involvert.
        </p>

        <h4 className="font-medium mt-3">Backoffice‑systemet omfattet:</h4>
        <ul className="list-disc ml-5">
          <li>~100 skjermbilder for registrering av grunndata</li>
          <li>
            Flyter for opprettelse av salgsordre med fakturering via Visma
          </li>
          <li>Flyter for transportordre/bulkordre → salgsordre → Visma</li>
          <li>Invitering av eksterne brukere via Azure AD</li>
          <li>Fakturering opp til millionbeløp daglig via systemet → Visma</li>
        </ul>

        <h4 className="font-medium mt-3">Tre typer portaler:</h4>
        <ul className="list-disc ml-5">
          <li>Kundeportal: Oppdrag, rapporter, faktura, omsetning</li>
          <li>
            Sjåførportal: Oppdrag for både kundens og leverandørens sjåfører
          </li>
          <li>Leverandørportal: Oppdrag, rapporter, faktura, omsetning</li>
        </ul>

        <p className="mt-2">
          Systemet ble deployet til Azure via Azure DevOps. Jeg deltok i
          utrulling og pilotering hos et konsern med over én milliard i
          omsetning. Systemet var i produksjon i rundt seks måneder før jeg
          sluttet.
        </p>

        <h4 className="font-medium mt-3">Teknologier:</h4>
        <p>
          C#, ASP.NET Core, Angular, JavaScript, CSS, HTML, SQL Server, Azure
          SQL, Azure DevOps, grunnleggende Azure, Syncfusion
        </p>
      </article>

      {/* Apprentice */}
      <article className="mb-8">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium text-lg">Lærling – WLCOM / ECIT WLCOM</h3>
          <span className="text-gray-600">mars 2018 – april 2020</span>
        </div>
        <p className="text-gray-700">Oslo, Norge</p>

        <p className="mt-2">
          Jeg kom raskt i gang med reelle utviklingsoppgaver ettersom jeg
          allerede hadde et solid grunnlag innen programmering. Min aller første
          oppgave var å transformere XML‑fakturaer mottatt via EDI til PDF ved
          hjelp av XSLT.
        </p>

        <p className="mt-2">
          Kort tid etter startet et større migreringsarbeid. Selskapet hadde to
          tunge fagsystemer: ett for næringsmiddelindustrien og ett for
          asfalt/pukk/vei. Min rolle var å skrive systemet på nytt med en ny
          datamodell og en webbasert frontend (Angular). Beslutningen om
          omskriving og datamodellering var ikke min, men jeg stod for
          implementasjonen.
        </p>

        <p className="mt-2">
          Jeg utviklet CRUD‑baserte HTTP‑API-er, klientbiblioteker for
          konsumering av API-ene, samt en webfrontend. Arbeidet var i stor grad
          R&D/proof‑of‑concept, men ved endt læretid var rundt 150 entiteter
          implementert med tilhørende CRUD‑API-er.
        </p>

        <h4 className="font-medium mt-3">Teknologier:</h4>
        <p>
          C#, ASP.NET Core, Angular, JavaScript, CSS, HTML, SQL Server,
          grunnleggende Azure, DevExpress
        </p>
      </article>

      {/* Security */}
      <article className="mb-8">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium text-lg">
            Vekter og trafikkleder – Zone Security AS
          </h3>
          <span className="text-gray-600">mar. 2018 – nov. 2019</span>
        </div>
        <p className="text-gray-700">Oslo, Norge</p>

        <ul className="list-disc ml-5 mt-2">
          <li>Eventvekter og trafikkleder ved Telenor Arena</li>
          <li>Ansvar for koordinering av ~30 ansatte</li>
          <li>Samarbeid med politi og arrangør</li>
        </ul>
      </article>
    </section>

    {/* Education */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Utdanning</h2>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Høyskolen Kristiania</h3>
          <span className="text-gray-600">aug. 2021 – jun. 2024</span>
        </div>
        <p>Bachelor i programmering.</p>
      </article>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Rælingen Videregående Skole</h3>
          <span className="text-gray-600">aug. 2020 – jun. 2021</span>
        </div>
        <p>Påbygg til generell studiekompetanse.</p>
      </article>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Sikkerhetsakademiet</h3>
          <span className="text-gray-600">2017 – 2018</span>
        </div>
        <p>Tre kurs for å bli sertifisert vekter.</p>
      </article>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Jessheim Videregående Skole</h3>
          <span className="text-gray-600">2016 – 2017</span>
        </div>
        <p>IKT – Servicefag.</p>
      </article>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Sørumsand Videregående Skole</h3>
          <span className="text-gray-600">2015 – 2016</span>
        </div>
        <p>Medier og kommunikasjon.</p>
      </article>

      <article className="mb-4">
        <div className="flex justify-between flex-wrap">
          <h3 className="font-medium">Sørumsand Videregående Skole</h3>
          <span className="text-gray-600">2014 – 2015</span>
        </div>
        <p>Teknikk og industriell produksjon.</p>
      </article>
    </section>

    {/* Certifications */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Sertifiseringer</h2>

      <article className="mb-6">
        <h3 className="font-medium">Attest – ECIT WLCOM AS</h3>
        <img
          src="/images/attest_ecit_wlcom.jpg"
          className="mt-2 w-full max-w-md rounded border shadow-sm"
        />
      </article>

      <article className="mb-6">
        <h3 className="font-medium">Fagbrev – ECIT WLCOM AS</h3>
        <img
          src="/images/fagbrev_ecit_wlcom.jpg"
          className="mt-2 w-full max-w-md rounded border shadow-sm"
        />
      </article>

      <article className="mb-6">
        <h3 className="font-medium">Attest – Zone Security AS</h3>
        <img
          src="/images/attest_zone_security.jpg"
          className="mt-2 w-full max-w-md rounded border shadow-sm"
        />
      </article>
    </section>
  </div>
));
