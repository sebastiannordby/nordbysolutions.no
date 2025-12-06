import { useTranslation } from 'react-i18next';

const consultingApps = [
  {
    id: 2,
    name: 'apps.utleiestyring.name',
    description: 'apps.utleiestyring.description',
    image: '/images/utleiestyring.png',
    link: 'https://green-smoke-0d948181e.5.azurestaticapps.net',
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <div className="hero-bg flex-1 dark:bg-black">
          <div className="flex flex-col items-center justify-center px-3 mt-32">
            <div className="text-center max-w-xl">
              <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                {t('home.motto')}
              </h1>
              <p className="text-lg mb-6 text-gray-700 dark:text-white">
                {t('home.what.i.deliver')}
              </p>
              <a
                href="mailto:post@norso.no?Subject=Ønsker%20Relasjon"
                className="bg-gray-900 shadow-xl text-white py-3 px-6 rounded-full hover:bg-gray-700 transition dark:bg-c_lime dark:text-black"
              >
                {t('home.contact.me.today')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
