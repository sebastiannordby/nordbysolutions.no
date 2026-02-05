// src/components/CV.tsx
import React from 'react';

type ExperienceData = {
  timeInCompany: string;
  companyName: string;
  title: string;
  location: string;
  descriptionOfWork: string;
  mainTechnologies?: string;
};

type EducationData = {
  timeline: string;
  institution: string;
  description: string;
};

type CertificationData = {
  title: string;
  imageUrl?: string; // small image to render and click
};

const CERTIFICATIONS: CertificationData[] = [
  {
    title: 'Letter of recommendation - ECIT WLCOM AS',
    imageUrl: '/images/attest_ecit_wlcom.jpg',
  },
  {
    title: 'Degree certificate - ECIT WLCOM AS',
    imageUrl: '/images/fagbrev_ecit_wlcom.jpg',
  },
  {
    title: 'Letter of recommendation - Zone Security AS',
    imageUrl: '/images/attest_zone_security.jpg',
  },
];

const EDUCATION: EducationData[] = [
  {
    timeline: 'aug. 2021 - jun. 2024',
    institution: 'Høyskolen Kristiania',
    description:
      "Bachelor's degree in programming combined with a full-time job as a full-stack developer.",
  },
  {
    timeline: 'aug. 2020 - jun. 2021',
    institution: 'Rælingen Videregående Skole',
    description:
      'Supplementary Studies for Higher Education Entrance Qualification.',
  },
  {
    timeline: '2017 - 2018',
    institution: 'Sikkerhetsakademiet',
    description: '3 courses to become a certified security guard.',
  },
  {
    timeline: '2016 - 2017',
    institution: 'Jessheim Videregående Skole',
    description: 'IKT - Servicefag.',
  },
  {
    timeline: '2015 - 2016',
    institution: 'Sørumsand Videregående Skole',
    description: 'Medier og kommunikasjon.',
  },
  {
    timeline: '2014 - 2015',
    institution: 'Sørumsand Videregående Skole',
    description: 'Teknikk og industriell produksjon.',
  },
];

const EXPERIENCE: ExperienceData[] = [
  {
    timeInCompany: 'jan. 2025 – Nå',
    companyName: 'Apotek 1 – Lørenskog',
    title: 'Tech Lead/Senior .NET Developer',
    location: 'Lørenskog, Norway',
    descriptionOfWork:
      'Continuation of work from previous role. Mentoring junior developers and apprentices, and leading technical decisions.',
    mainTechnologies: 'Mentoring, CI/CD, Azure, Azure Devops',
  },
  {
    timeInCompany: 'feb. 2024 – jan. 2025',
    companyName: 'Apotek 1 – Lørenskog',
    title: '.NET Developer',
    location: 'Lørenskog, Norway',
    descriptionOfWork:
      'Migrating legacy systems to modern .NET 8/10 APIs and Blazor frontends.',
    mainTechnologies:
      '.NET/C#, Blazor, http, gRPC, SQL performance tuning, SQL Profiling/Tracing.',
  },
  {
    timeInCompany: 'aug. 2020 - feb. 2024',
    companyName: 'ECIT WLCOM AS',
    title: 'Fullstack .NET Developer',
    location: 'Oslo, Norway',
    descriptionOfWork:
      'Worked on various client projects involving .NET development and system integration. Mainly migration of' +
      ' legacy systems to modern web applications. ERP/CRM/WMS systems with customer facing portals.',
    mainTechnologies: '.NET, C#, SQL, Azure, Angular, Blazor',
  },
  {
    timeInCompany: 'apr. 2020 - aug. 2024',
    companyName: 'ECIT WLCOM AS',
    title: 'System developer',
    location: 'Oslo, Norway',
    descriptionOfWork:
      'Worked on various client projects involving .NET development and system integration. Mainly migration of' +
      ' legacy systems to modern web applications. ERP/CRM/WMS systems with customer facing portals.',
    mainTechnologies: '.NET, C#, SQL, Azure, Angular, Blazor',
  },
  {
    timeInCompany: 'mar. 2018 - apr. 2020',
    companyName: 'ECIT WLCOM AS',
    title: 'Apprentice Developer',
    location: 'Oslo, Norway',
    descriptionOfWork:
      'Worked on various client projects involving .NET development and system integration. Mainly migration of' +
      ' legacy systems to modern web applications. ERP/CRM/WMS systems with customer facing portals.',
    mainTechnologies: '.NET, C#, SQL, Azure, Angular, Blazor',
  },
  {
    timeInCompany: 'mar. 2018 - nov. 2019',
    companyName: 'Zone Security AS',
    title: 'Security guard and leader of traffic',
    location: 'Oslo, Norway',
    descriptionOfWork:
      'Event Security Guard and Traffic Coordinator at Telenor Arena. Responsible for delegating work to approximately 30 employees. Coordination with the police and event management.',
  },
];

export const CV = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="bg-white text-gray-900 font-sans">
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
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <p className="leading-relaxed">
        Senior developer focusing on C#/.NET, technical leadership and building
        reliable software solutions. Experienced with processing of technical
        debt. Strong communicator who enjoys mentoring junior developers and
        apprentices or collaborating with cross-functional teams to deliver
        high-quality software.
      </p>
    </section>

    {/* Skills */}
    <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Tech</h2>
        <ul className="list-disc ml-5">
          <li>C# .NET: Api's, Blazor & Desktop apps</li>
          <li>React, Tailwind CSS</li>
          <li>TSQL/MSSQL</li>
          <li>Docker, Azure Devops, GitHub</li>
        </ul>
      </div>
    </section>

    {/* Experience */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Experience</h2>

      {EXPERIENCE.map((exp, index) => (
        <article key={index} className="mb-4 break-inside-avoid">
          <div className="flex justify-between flex-wrap">
            <h3 className="font-medium">{exp.title}</h3>
            <span className="text-gray-600">{exp.timeInCompany}</span>
          </div>

          <p className="text-gray-700">{exp.companyName}</p>

          <ul className="list-disc ml-5 text-gray-800">
            <li>{exp.descriptionOfWork}</li>
            {exp.mainTechnologies && <li>{exp.mainTechnologies}</li>}
          </ul>
        </article>
      ))}
    </section>

    {/* Education */}
    <section aria-labelledby="education-heading" className="mt-6">
      <h2 id="education-heading" className="text-xl font-semibold mb-2">
        Education
      </h2>

      {EDUCATION.length === 0 ? (
        <p className="text-gray-600">No education entries added yet.</p>
      ) : (
        <div className="space-y-4">
          {EDUCATION.map((edu, idx) => (
            <article key={idx} className="mb-4 break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between flex-wrap">
                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                <span className="text-gray-600 mt-1 sm:mt-0">
                  {edu.timeline}
                </span>
              </div>

              <p className="text-gray-800 mt-1">{edu.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>

    {/* Certifications */}
    <section aria-labelledby="certifications-heading" className="mt-6">
      <h2 id="certifications-heading" className="text-xl font-semibold mb-2">
        Certifications
      </h2>

      <div className="space-y-4">
        {CERTIFICATIONS.map((cert, idx) => (
          <article key={idx} className="break-inside-avoid">
            <h3 className="font-medium text-gray-900">{cert.title}</h3>

            {/* Full-width image */}
            <img
              src={cert.imageUrl}
              alt={`Certification: ${cert.title}`}
              className="mt-2 w-full max-w-md rounded border border-gray-200 shadow-sm print:shadow-none"
            />
          </article>
        ))}
      </div>
    </section>
  </div>
));
