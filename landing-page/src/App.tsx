import { useEffect, useState } from 'react';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-gray-100 dark:bg-[#21262d] text-gray-600 dark:text-[#8b949e] border border-gray-200 dark:border-[#30363d] mr-1 mb-1">
    {children}
  </span>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-[#30363d] pb-2 mb-5 mt-10 text-gray-900 dark:text-[#e6edf3]">
    {children}
  </h2>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === 'true');
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next.toString());
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-800 dark:text-[#c9d1d9] transition-colors text-sm leading-relaxed">

        {/* Toolbar */}
        <div className="fixed top-3 right-4 z-50 flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="px-3 py-1.5 text-xs border border-gray-200 dark:border-[#30363d] rounded-md bg-white dark:bg-[#161b22] hover:bg-gray-50 dark:hover:bg-[#21262d] text-gray-600 dark:text-[#c9d1d9] transition-colors"
          >
            {darkMode ? 'Lys' : 'Mørk'}
          </button>
          <a
            href="https://app.norso.no"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#238636] text-white hover:bg-[#2ea043] transition-colors"
          >
            Open app
          </a>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* README title block */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-[#e6edf3]">
              Sebastian Nordby
            </h1>
            <p className="font-mono text-xs text-gray-500 dark:text-[#8b949e] mb-5">
              post@norso.no &nbsp;·&nbsp; +47 479 64 635 &nbsp;·&nbsp;
              <a href="https://norso.no" className="hover:underline">norso.no</a>
              &nbsp;·&nbsp;
              <a
                href="https://www.linkedin.com/in/sebastian-nordby/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-[#c9d1d9] max-w-2xl">
              Senior systemutvikler med snart et tiårs erfaring fra forretningskritiske systemer i regulerte
              bransjer, og Tech Lead-rolle hos Apotek 1. Spesialisert på modernisering av
              legacy-arkitektur og API-utvikling i .NET.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 mb-2">
            <a
              href="mailto:post@norso.no"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 dark:border-[#30363d] rounded-md bg-white dark:bg-[#161b22] hover:bg-gray-50 dark:hover:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] transition-colors"
            >
              ✉ post@norso.no
            </a>
            <a
              href="tel:+4747964635"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 dark:border-[#30363d] rounded-md bg-white dark:bg-[#161b22] hover:bg-gray-50 dark:hover:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] transition-colors"
            >
              ☎ +47 479 64 635
            </a>
            <a
              href="https://www.linkedin.com/in/sebastian-nordby/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 dark:border-[#30363d] rounded-md bg-white dark:bg-[#161b22] hover:bg-gray-50 dark:hover:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] transition-colors"
            >
              ↗ LinkedIn
            </a>
          </div>

          {/* Experience */}
          <H2>Experience</H2>

          {/* Tech Lead */}
          <div className="mb-8">
            <div className="flex justify-between flex-wrap gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                Senior Systemutvikler (Tech Lead) — Apotek 1
              </h3>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">jan 2025 – nå</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#8b949e] mb-3 font-mono">Lørenskog, Norge</p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Leder et tverrfaglig team på 6 utviklere. Eier produkteier-, løsningsarkitekt- og
              kodearkitektansvaret. Systemene er forretningskritiske og drifter hele Apotek
              1-kjeden med høy SLA.
            </p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Porteføljen spenner over kommersielle domener (kampanjeplanlegging, vareforsyning,
              butikkstøtte) og operasjonelle systemer (lagerstyring, logistikk,
              medisinproduksjon). Systemene er segmentert i sikkerhetssoner med strenge krav til
              logging, sporbarhet og dataflyt regulert av av diverse lovgivning.
            </p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Definerer arkitekturretning, avveier ny funksjonalitet mot teknisk gjeld og
              koordinerer med plattformteamet for Azure-infrastruktur via Bicep/IaC. Fortsatt
              mye i koden selv på komplekse backend-oppgaver.
            </p>
            <details className="mb-3">
              <summary className="cursor-pointer text-xs text-gray-500 dark:text-[#8b949e] hover:text-gray-800 dark:hover:text-[#e6edf3] mb-2 select-none">
                Key initiatives ▸
              </summary>
              <ul className="list-disc ml-5 space-y-1 mt-2 text-gray-700 dark:text-[#c9d1d9]">
                <li>Tegnet systemdiagrammer for å kartlegge og prioritere teknisk gjeld på tvers av domener</li>
                <li>Strategi for å eliminere frontend-til-database-mønstre og migrere WPF/UWP/WinUI til Blazor</li>
                <li>Migrerer Windows-tjenester til Azure og gjør dem cloud native</li>
                <li>Migrasjon fra WCF til .NET 10 med integrasjonstester, EF og CI-pipelines i Azure DevOps</li>
                <li>Nøstet opp delte databaser: kartlagt avhengigheter, provisjonert dedikerte brukere og migrert</li>
                <li>Oversetter forretningskrav til funksjonell programvare forankret i faktisk forretningsverdi</li>
                <li>Mentorerer lærlinger tett med reelle oppgaver og faglig oppfølging</li>
              </ul>
            </details>
            <div className="flex flex-wrap mt-2">
              {['C#', 'ASP.NET Core', '.NET 10', '.NET Framework', 'Blazor', 'SQL Server', 'Azure', 'Azure DevOps', 'Bicep', 'gRPC', 'Entity Framework', 'WinUI', 'WPF'].map(t => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {/* .NET Developer */}
          <div className="mb-8">
            <div className="flex justify-between flex-wrap gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                .NET-utvikler — Apotek 1
              </h3>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">feb 2024 – jan 2025</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#8b949e] mb-3 font-mono">Lørenskog, Norge</p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Hentet inn spesifikt for å modernisere systemkritisk legacy-kode. Kartla og jobbet ned
              teknisk gjeld i løsninger basert på .NET Framework, WCF og direkte
              klient-til-database-arkitektur.
            </p>
            <ul className="list-disc ml-5 space-y-1 mb-3 text-gray-700 dark:text-[#c9d1d9]">
              <li>Migrerte WCF-tjenester til ASP.NET Core REST/gRPC-baserte API-er</li>
              <li>Brøt opp tykk-klient-til-database-mønstre til API-basert arkitektur</li>
              <li>Erstattet SOAP-integrasjoner med moderne HTTP-grensesnitt</li>
              <li>Sikret korrekt dataflyt mellom sikkerhetssoner</li>
              <li>Mentorerte praksiselever og bidro til rekruttering fra videregående</li>
            </ul>
            <div className="flex flex-wrap mt-2">
              {['C#', 'ASP.NET Core', '.NET Framework', 'React', 'SQL Server', 'Azure', 'Bicep', 'gRPC', 'WinUI', 'WPF'].map(t => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {/* ECIT WLCOM */}
          <div className="mb-8">
            <div className="flex justify-between flex-wrap gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                Systemutvikler — ECIT WLCOM
              </h3>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">apr 2020 – feb 2024</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#8b949e] mb-3 font-mono">Oslo, Norge</p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Sentral utvikler på et greenfield-system som erstattet to fagsystemer for
              transport- og logistikkbransjen. Eneste frontend-utvikler gjennom hele
              prosjektet. Drev overgangen til domenedrevet design og migrerte
              JavaScript-frontend til Blazor.
            </p>
            <ul className="list-disc ml-5 space-y-1 mb-3 text-gray-700 dark:text-[#c9d1d9]">
              <li>Backoffice med ~100 skjermbilder, ordreflyter og Visma-integrasjon</li>
              <li>Tre separate portaler: kunder, sjåfører og leverandører</li>
              <li>Azure AD-basert invitasjonsflyt for eksterne brukere</li>
              <li>Pilotert hos konsern; i produksjon i ~8 måneder under mitt opphold</li>
            </ul>
            <div className="flex flex-wrap mt-2">
              {['C#', 'ASP.NET Core', 'Blazor', 'Angular', 'SQL Server', 'Azure SQL', 'Azure DevOps', 'Azure'].map(t => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {/* Apprentice */}
          <div className="mb-8">
            <div className="flex justify-between flex-wrap gap-1 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                Lærling — WLCOM / ECIT WLCOM
              </h3>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">mar 2018 – apr 2020</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#8b949e] mb-3 font-mono">Oslo, Norge</p>
            <p className="mb-3 text-gray-700 dark:text-[#c9d1d9]">
              Gikk raskt fra lærling til reell bidragsyter. Implementerte migrering av to
              fagsystemer (næringsmiddel og anlegg) til ny datamodell og webbasert frontend.
              Utviklet API-er, klientbiblioteker og frontend fra bunnen av — rundt 150 entiteter
              ved endt læretid.
            </p>
            <div className="flex flex-wrap mt-2">
              {['C#', 'ASP.NET Core', 'Angular', 'SQL Server', 'Azure'].map(t => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {/* Education */}
          <H2>Education</H2>

          <div className="space-y-3 mb-2">
            <div className="flex justify-between flex-wrap gap-1">
              <span className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                Bachelor i programmering — Høyskolen Kristiania
              </span>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">2021 – 2024</span>
            </div>
            <div className="flex justify-between flex-wrap gap-1">
              <span className="font-semibold text-gray-900 dark:text-[#e6edf3]">
                Fagbrev IT-utvikler — ECIT WLCOM AS
              </span>
              <span className="font-mono text-xs text-gray-500 dark:text-[#8b949e]">2020</span>
            </div>
          </div>

          {/* Skills */}
          <H2>Skills</H2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-[#8b949e] mb-2">Core</p>
              <div className="flex flex-wrap">
                {['C# / .NET', 'ASP.NET Core', 'Domain-Driven Design', 'Legacy modernization', 'REST / gRPC', 'Azure / Bicep / IaC', 'SQL Server / EF', 'Security zones & compliance'].map(s => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-[#8b949e] mb-2">Supporting</p>
              <div className="flex flex-wrap">
                {['React / TypeScript', 'Blazor', 'WPF / WinUI / UWP', 'Azure DevOps', 'Jira / Confluence', 'Angular', 'Tech leadership', 'Mentoring'].map(s => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <H2>Certificates &amp; References</H2>

          <div className="space-y-6 mb-2">
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-[#c9d1d9] mb-2">Attest — ECIT WLCOM AS</p>
              <img
                src="/images/attest_ecit_wlcom.jpg"
                className="max-w-sm rounded border border-gray-200 dark:border-[#30363d] shadow-sm"
                alt="Attest ECIT WLCOM"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-[#c9d1d9] mb-2">Fagbrev — ECIT WLCOM AS</p>
              <img
                src="/images/fagbrev_ecit_wlcom.jpg"
                className="max-w-sm rounded border border-gray-200 dark:border-[#30363d] shadow-sm"
                alt="Fagbrev ECIT WLCOM"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-[#c9d1d9] mb-2">Attest — Zone Security AS</p>
              <img
                src="/images/attest_zone_security.jpg"
                className="max-w-sm rounded border border-gray-200 dark:border-[#30363d] shadow-sm"
                alt="Attest Zone Security AS"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-14 pt-6 border-t border-gray-200 dark:border-[#30363d] flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-gray-400 dark:text-[#8b949e]">
              © {new Date().getFullYear()} Sebastian Nordby
            </p>
            <a
              href="mailto:post@norso.no"
              className="px-4 py-2 text-xs font-semibold rounded-md bg-[#238636] text-white hover:bg-[#2ea043] transition-colors"
            >
              Ta kontakt →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
