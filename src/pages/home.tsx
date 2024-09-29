import { useTranslation } from 'react-i18next';

const consultingApps = [
  {
    id: 2,
    name: 'apps.utleiestyring.name',
    description: 'apps.utleiestyring.description',
    image: '/images/utleiestyring.png',
    link: '/proposals/utleiestyring',
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="hero-bg min-h-[500px] flex items-center justify-center dark:bg-black">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Fra Enkle Nettsider til Skreddersydde Løsninger
          </h1>
          <p className="text-lg mb-6 text-gray-700 dark:text-white">
            Jeg leverer alt fra profesjonelle nettsider til tilpassede
            skybaserte systemer. Din visjon, realisert.
          </p>
          <a
            href="mailto:sebastian@nordbysolutions.no?Subject=Ønsker%20Relasjon"
            className="bg-gray-900 shadow-xl text-white py-3 px-6 rounded-full hover:bg-gray-700 transition"
          >
            Kontakt meg i dag
          </a>
        </div>
      </div>

      <section className="mt-12 mb-6">
        <h2 className="dark:text-white text-2xl text-center font-semibold mb-4">
          {t('apps.client_proposal_header')}
        </h2>
        <div className="flex flex-col gap-6 items-center mx-auto max-w-3xl">
          {consultingApps.map((app) => (
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
                  className="inline-block border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
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
