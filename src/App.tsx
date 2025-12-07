import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import { DarkModeToggle } from './components/dark-mode-toggle'; // Custom dark mode toggle component
import { AppPortfolioPage } from './pages/applications';
import {
  HOME_URL,
  LINKED_IN_LINK,
  APP_PORTFOLIO_URL,
  SKILLSET_URL,
} from './pages/constants';
import { LanguageSwitcher } from './components/language-switcher';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/home';
import CVPage from './pages/CVPage';

const Header = ({
  setDarkMode,
  darkMode,
}: {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navBg, setNavBg] = useState('bg-transparent');
  const visibleNavClass = 'bg-white dark:bg-gray-900 shadow-md';

  const isHomePage = location?.pathname === '/';

  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location]);

  // Handle scroll event to change navbar background on home page
  useEffect(() => {
    if (!isHomePage) return;

    const mainElement = document.querySelector('main') as HTMLDivElement;
    if (!mainElement) return;

    const handleScroll = () => {
      if (mainElement.scrollTop > 200) {
        setNavBg('bg-white dark:bg-gray-900 shadow-md');
      } else {
        setNavBg('bg-transparent');
      }
    };

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const headerClassName = isHomePage
    ? `fixed w-full transition-colors duration-300 z-50 ${menuOpen ? visibleNavClass : navBg}`
    : 'bg-white dark:bg-gray-900 shadow-md';

  return (
    <header className={headerClassName}>
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
              to={HOME_URL}
            >
              {t('common.frontpage')}
            </Link>
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
            <DarkModeToggle
              darkMode={darkMode}
              setDarkMode={() => setDarkMode(!darkMode)}
            />
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const setDarkModeAndSave = (val: boolean) => {
    setDarkMode(val);
    localStorage.setItem('darkMode', val.toString());
  };

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col w-full h-screen ${darkMode ? 'dark' : ''}`}
      >
        {/* Header */}
        <Header
          setDarkMode={(val) => setDarkModeAndSave(val)}
          darkMode={darkMode}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Routes>
            <Route path="/linkedin" element={<LinkedInCallback />} />
            <Route path={HOME_URL} element={<HomePage />} />
            <Route path={SKILLSET_URL} element={<CVPage />} />
            <Route
              path={APP_PORTFOLIO_URL}
              element={<AppPortfolioPage />}
            ></Route>
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-1 text-center flex gap-2 justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
          <span>© Nordby Solutions - 2026</span>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
