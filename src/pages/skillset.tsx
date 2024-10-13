import React from 'react'; // Import React
import { useTranslation } from 'react-i18next';

export function SkillsetPage() {
  return (
    <div className="flex flex-col w-full h-auto p-4 gap-4">
      <SkillShowcase />
    </div>
  );
}

function SkillShowcase() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col md:flex-row mx-auto w-full max-w-3xl rounded-lg bg-white shadow-md overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="p-6 flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {t('skills.header')}
        </h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b-2 border-gray-300">
              {t('skills.languagesHeader')}
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.csharp'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.html'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t('skills.skillsList.css') }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.javascript'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t('skills.skillsList.sql') }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t('skills.skillsList.xml') }}
              />
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b-2 border-gray-300">
              {t('skills.frameworksHeader')}
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.blazor'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.react'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.angular'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.dotnet'),
                }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t('skills.skillsList.ef') }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t('skills.skillsList.git') }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t('skills.skillsList.tailwind'),
                }}
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
