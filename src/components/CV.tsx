// src/components/CV.tsx
import React from 'react';

export const CV = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-white text-gray-900 font-sans leading-relaxed">

    {/* Header */}
    <section className="border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold">Sebastian Nordby</h1>
      <p className="text-sm text-gray-500 mt-1">
        post@norso.no · +47 479 64 635 · norso.no · LinkedIn
      </p>
    </section>

    {/* Summary */}
    <section className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Sammendrag</h2>
      <p className="text-gray-800 leading-relaxed">
        Senior systemutvikler med 8 års erfaring fra forretningskritiske systemer
        i regulerte bransjer, og Tech Lead-rolle hos Apotek 1.
        Spesialisert på modernisering av legacy-arkitektur, domenedrevet design
        og API-utvikling i .NET. Jobber mye med kode, eier teknisk retning og
        sørger for at leveranser er forankret i forretningsmål, sikkerhetsmål og
        referansearkitektur. Systemene er forretningskritiske og krever høy SLA
        for å sikre drift av hele Apotek 1-kjeden.
      </p>
    </section>

    {/* Experience */}
    <section className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Erfaring</h2>

      {/* Senior / Tech Lead */}
      <article className="mb-8 border-l-2 border-gray-200 pl-4">
        <div className="flex justify-between flex-wrap gap-1">
          <h3 className="font-semibold text-base">Senior Systemutvikler (Tech Lead) – Apotek 1</h3>
          <span className="text-sm text-gray-500">januar 2025 – nå</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Lørenskog, Norge</p>

        <p className="text-gray-800 mb-3">
          Leder et tverrfaglig team på 6 utviklere uten dedikerte roller for
          produkteier, løsningsarkitekt eller kodearkitekt. Disse
          ansvarsområdene eier jeg. Systemene er forretningskritiske og drifter
          hele Apotek 1-kjeden, og krever høy oppetid og stabil drift.
        </p>

        <p className="text-gray-800 mb-3">
          Porteføljen spenner over kommersielle domener som kampanjeplanlegging,
          vareforsyning og butikkstøtte, samt operasjonelle systemer innen
          lagerstyring, logistikkflyt og medisinproduksjon. Systemene er
          segmentert i sikkerhetssoner med ulike tilgangsnivåer og
          nettverksisolasjon, med strenge krav til logging, sporbarhet og
          dataflyt regulert av pasientvern og legemiddellovgivning.
        </p>

        <p className="text-gray-800 mb-3">
          Definerer arkitekturretning og forankrer tekniske valg i forretningsmål,
          sikkerhetsmål og referansearkitektur. Avveier ny funksjonalitet mot
          teknisk gjeld og koordinerer med plattformteamet for riktig
          Azure-infrastruktur via Bicep/IaC. Arkitekturvalg og tekniske
          retningslinjer dokumenteres løpende i Confluence.
        </p>

        <p className="text-gray-800 mb-3">
          Tar et strukturert tak på teknisk gjeld i systemkritiske løsninger:
          kartlegger risikofylte avhengigheter, utarbeider migrasjonsstrategier og
          gjennomfører modernisering uten å forstyrre produksjonsdrift.
          Er fortsatt mye i koden selv, særlig på komplekse backend-oppgaver
          som krever dyp domeneforståelse og høye krav til ytelse, resiliens og
          sikkerhet. Fungerer som teknisk sparringspartner og holder teamet på
          rett kurs innen arkitektur, mønstre og kodekvalitet.
        </p>

        <div className="mt-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Nøkkelinitiativ</span>
          <ul className="list-disc ml-5 text-gray-800 space-y-2 mt-2">
            <li>
              Tegnet systemdiagrammer som synliggjør avhengigheter på tvers av domener;
              brukte disse som grunnlag for å kartlegge og prioritere teknisk gjeld
            </li>
            <li>
              Planlagt og gjennomfører strategi for å nøste opp avhengigheter:
              eliminere frontend-til-database-mønstre og migrere Windows-baserte
              desktop-applikasjoner (WPF, UWP, WinUI) til webbaserte løsninger i Blazor
            </li>
            <li>
              Migrerer Windows-avhengige tjenester til Azure og gjør dem cloud native
            </li>
            <li>
              Migrasjon fra WCF til .NET 10, inkludert innføring av integrasjons-
              og enhetstester, bytte av ORM fra ADO.NET til Entity Framework, og
              oppsett av CI-pipelines i Azure DevOps for å sikre at <em>main</em> alltid er produksjonssikkert
            </li>
            <li>
              Nøstet opp i delte databaser på tvers av systemer: kartlagt tjenester med
              databasetilknytning, provisjonert dedikerte brukere per tjeneste, satt opp
              tracing og kjørt spørringer for å kartlegge databruk, identifisert
              foreign key-avhengigheter på tvers av systemer og migrert databaser til
              respektive systemer
            </li>
            <li>
              Oversetter forretningskrav til funksjonell programvare og sikrer at
              tekniske valg er forankret i faktisk forretningsverdi
            </li>
            <li>
              Mentorerer lærlinger og praksiselever tett: delegerer reelle oppgaver,
              følger opp faglig utvikling og sørger for at de blir fullverdige
              bidragsytere i teamet
            </li>
          </ul>
        </div>

        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Teknologier</span>
          <p className="text-sm text-gray-600 mt-1">
            C#, ASP.NET Core, .NET 10, .NET Framework, Blazor, SQL Server, Azure,
            Azure DevOps, Bicep, gRPC, Entity Framework, WinUI, WPF, Jira, Confluence
          </p>
        </div>
      </article>

      {/* .NET Developer */}
      <article className="mb-8 border-l-2 border-gray-200 pl-4">
        <div className="flex justify-between flex-wrap gap-1">
          <h3 className="font-semibold text-base">.NET-utvikler – Apotek 1</h3>
          <span className="text-sm text-gray-500">februar 2024 – januar 2025</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Lørenskog, Norge</p>

        <p className="text-gray-800 mb-3">
          Hentet inn spesifikt for å modernisere systemkritisk legacy-kode.
          Kartla og jobbet ned teknisk gjeld i løsninger basert på .NET Framework,
          WCF og direkte klient-til-database-arkitektur. Systemene hadde
          manglende sikkerhetspraksis, svak resiliens og tett kobling på tvers
          av domener.
        </p>

        <ul className="list-disc ml-5 text-gray-800 space-y-1 mb-3">
          <li>Migrerte WCF-tjenester til ASP.NET Core REST/gRPC-baserte API-er</li>
          <li>Brøt opp tykk-klient-til-database-mønstre til API-basert arkitektur</li>
          <li>Erstattet SOAP-integrasjoner med moderne HTTP-grensesnitt</li>
          <li>Sikret korrekt dataflyt mellom sikkerhetssoner med ulik sensitivitet</li>
          <li>Mentorerte praksiselever og bidro til rekruttering fra videregående</li>
        </ul>

        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Teknologier</span>
          <p className="text-sm text-gray-600 mt-1">
            C#, ASP.NET Core, .NET Framework, React, SQL Server, Azure, Bicep, gRPC, WinUI, WPF
          </p>
        </div>
      </article>

      {/* System Developer */}
      <article className="mb-8 border-l-2 border-gray-200 pl-4">
        <div className="flex justify-between flex-wrap gap-1">
          <h3 className="font-semibold text-base">Systemutvikler – ECIT WLCOM</h3>
          <span className="text-sm text-gray-500">april 2020 – februar 2024</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Oslo, Norge</p>

        <p className="text-gray-800 mb-3">
          Sentral utvikler på et greenfield-system som erstattet to eksisterende
          fagsystemer for transport- og logistikkbransjen. Eneste frontend-utvikler
          gjennom hele prosjektet; alltid involvert på backend. Drev overgangen fra
          et generisk CRUD-API til domenedrevet design med eksplisitte use-cases
          (f.eks. <em>CreditInvoice</em>) for bedre kontroll over forretningslogikken.
          Migrerte JavaScript-frontend til Blazor.
        </p>

        <ul className="list-disc ml-5 text-gray-800 space-y-1 mb-3">
          <li>Backoffice med ~100 skjermbilder, salgsordreflyt og Visma-integrasjon</li>
          <li>Daglig fakturering i millionklassen gjennom systemet</li>
          <li>Tre separate portaler: kunder, sjåfører og leverandører</li>
          <li>Azure AD-basert invitasjonsflyt for eksterne brukere</li>
          <li>
            Pilotert hos konsern med over én milliard i omsetning; i produksjon i ~6 måneder
          </li>
        </ul>

        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Teknologier</span>
          <p className="text-sm text-gray-600 mt-1">
            C#, ASP.NET Core, Blazor, Angular, SQL Server, Azure SQL, Azure DevOps, Azure
          </p>
        </div>
      </article>

      {/* Apprentice */}
      <article className="mb-8 border-l-2 border-gray-200 pl-4">
        <div className="flex justify-between flex-wrap gap-1">
          <h3 className="font-semibold text-base">Lærling – WLCOM / ECIT WLCOM</h3>
          <span className="text-sm text-gray-500">mars 2018 – april 2020</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Oslo, Norge</p>

        <p className="text-gray-800 mb-3">
          Gikk raskt fra lærling til reell bidragsyter. Implementerte migrering
          av to fagsystemer innen næringsmiddelindustri og anlegg til ny
          datamodell og webbasert frontend. Utviklet API-er, klientbiblioteker
          og frontend fra bunnen av, og leverte rundt 150 entiteter ved endt
          læretid.
        </p>

        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Teknologier</span>
          <p className="text-sm text-gray-600 mt-1">
            C#, ASP.NET Core, Angular, SQL Server, Azure
          </p>
        </div>
      </article>

    </section>

    {/* Education */}
    <section className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Utdanning</h2>

      <article className="mb-3 flex justify-between flex-wrap gap-1">
        <div>
          <h3 className="font-semibold text-sm">Bachelor i programmering – Høyskolen Kristiania</h3>
        </div>
        <span className="text-sm text-gray-500">2021 – 2024</span>
      </article>

      <article className="mb-3 flex justify-between flex-wrap gap-1">
        <div>
          <h3 className="font-semibold text-sm">Fagbrev – IT-utvikler, ECIT WLCOM AS</h3>
        </div>
        <span className="text-sm text-gray-500">2020</span>
      </article>
    </section>

    {/* Skills */}
    <section className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Kompetanse</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Kjernekompetanse</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>C# / .NET 8 / ASP.NET Core</li>
            <li>Domenedrevet design (DDD)</li>
            <li>Modernisering av legacy-systemer</li>
            <li>API-design (REST, gRPC)</li>
            <li>Azure / Bicep / IaC</li>
            <li>SQL Server / Entity Framework</li>
            <li>Teknisk gjeldshåndtering</li>
            <li>Sikkerhetssoner og compliance</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Støttende ferdigheter</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>React / TypeScript / Blazor</li>
            <li>WPF / WinUI / UWP</li>
            <li>Azure DevOps / Jira / Confluence</li>
            <li>Arkitekturdokumentasjon</li>
            <li>Mentorering og teamledelse</li>
            <li>Angular</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Certifications – images only, no security cert */}
    <section className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Attester & Fagbrev</h2>

      <article className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Attest – ECIT WLCOM AS</h3>
        <img
          src="/images/attest_ecit_wlcom.jpg"
          className="w-full max-w-md rounded border shadow-sm"
          alt="Attest ECIT WLCOM"
        />
      </article>

      <article className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Fagbrev – ECIT WLCOM AS</h3>
        <img
          src="/images/fagbrev_ecit_wlcom.jpg"
          className="w-full max-w-md rounded border shadow-sm"
          alt="Fagbrev ECIT WLCOM"
        />
      </article>

      <article className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Attest – Zone Security AS</h3>
        <img
          src="/images/attest_zone_security.jpg"
          className="w-full max-w-md rounded border shadow-sm"
          alt="Attest Zone Security AS"
        />
      </article>
    </section>
  </div>
));

