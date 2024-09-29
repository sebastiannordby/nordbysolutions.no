import React from 'react';
import { useTranslation } from 'react-i18next';

const completedApps = [
    {
         id: 1, 
         name: 'apps.stinisse.name', 
         description: 'apps.stinisse.description', 
         link: 'https://stinisse.no', 
         image: '/images/stinisse.jpg'
    }
];

const consultingApps = [
    { 
        id: 2,
        name: 'apps.utleiestyring.name', 
        description: 'apps.utleiestyring.description',
        image: '/images/utleiestyring.png',
        link: 'https://utleiestyring.no' 
    }
];

const apps = [
  ];

export function AppPortfolioPage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col w-full h-auto p-4 gap-4">
            <h1 className="dark:text-white text-3xl font-bold text-center mb-6 whitespace-pre-wrap break-words">
                {t("apps.applications_developed_header")}
            </h1>

            {/* Completed Applications Section */}
            <section>
                <h2 className="dark:text-white text-2xl font-semibold mb-4">{t("apps.completes_applications_header")}</h2>
                <div className="flex flex-col gap-6 items-center mx-auto max-w-3xl">
                    {completedApps.map(app => (
                        <div
                            key={app.id}
                            className="p-6 flex flex-col md:flex-row gap-6 items-center bg-white rounded-lg shadow-md w-full"
                        >
                            <img
                                src={app.image}
                                alt={`${t(app.name)} image`}
                                className="w-full md:w-48 h-auto rounded-md shadow-md"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-2">{t(app.name)}</h2>
                                <p className="text-gray-700 mb-4">{t(app.description)}</p>
                                <a
                                    href={app.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                                    {t('common.explore')}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Consulting/Proposed Applications Section */}
            <section className="mt-12">
                <h2 className="dark:text-white text-2xl font-semibold mb-4">{t("apps.client_proposal_header")}</h2>
                <div className="flex flex-col gap-6 items-center mx-auto max-w-3xl">
                    {consultingApps.map(app => (
                        <div
                            key={app.id}
                            className="p-6 flex flex-col md:flex-row gap-6 items-center bg-white rounded-lg shadow-md w-full"
                        >
                            <img
                                src={app.image}
                                alt={`${t(app.name)} image`}
                                className="w-full md:w-48 h-auto rounded-md shadow-md"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-2">{t(app.name)}</h2>
                                <p className="text-gray-700 mb-4">{t(app.description)}</p>
                                <a
                                    href={app.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                                    {t('common.explore')}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
