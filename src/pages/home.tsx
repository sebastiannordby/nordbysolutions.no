import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  APP_PORTFOLIO_URL,
  SKILLSET_URL,
  GITHUB_LINK,
  LINKED_IN_LINK,
} from './constants';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '../components/language-switcher';

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
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu
  const [navBg, setNavBg] = useState('bg-transparent'); // State for nav background
  const visibleNavClass = 'bg-white dark:bg-gray-900 shadow-md';

  // Handle scroll event to change navbar background
  useEffect(() => {
    const mainElement = document.querySelector('main') as HTMLDivElement;
    const handleScroll = () => {
      if (mainElement.scrollTop > 200) {
        setNavBg('bg-white dark:bg-gray-900 shadow-md'); // Change to white after scroll
      } else {
        setNavBg('bg-transparent'); // Keep transparent at the top
      }
    };

    mainElement!.addEventListener('scroll', handleScroll);

    // Cleanup scroll event listener
    return () => {
      mainElement!.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <header
          className={`fixed w-full transition-colors duration-300 ${menuOpen ? visibleNavClass : navBg}`}
        >
          <nav className="p-4 pr-6 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to={'/'}>
                <h1 className="flex flex-col leading-tight">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-c_lime">
                    Norso
                  </span>

                  <span className="mt-1 inline-flex items-center gap-2 text-sm sm:text-base text-gray-500 dark:text-white">
                    Nordby Solutions
                  </span>
                </h1>
              </Link>
              <button
                className="md:hidden text-gray-800 dark:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0">
                <Link
                  className="hover:underline text-gray-800 dark:text-white"
                  to={SKILLSET_URL}
                >
                  {t('common.skillset')}
                </Link>
                <a
                  className="hover:underline text-gray-800 dark:text-white"
                  href={LINKED_IN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:underline text-gray-800 dark:text-white"
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </header>
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
