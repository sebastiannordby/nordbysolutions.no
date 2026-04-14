import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import { DarkModeToggle } from './components/dark-mode-toggle';
import {
  HOME_URL,
  LINKED_IN_LINK,
  SKILLSET_URL,
  GITHUB_LINK,
} from './pages/constants';
import { LanguageSwitcher } from './components/language-switcher';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/home';
import CVPage from './pages/CVPage';

const navLinkClass =
  'text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors';

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold text-sm text-gray-900 dark:text-white tracking-tight"
        >
          Sebastian Nordby
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/#projects" className={navLinkClass}>
            {t('nav.projects')}
          </a>
          <Link to={SKILLSET_URL} className={navLinkClass}>
            {t('nav.cv')}
          </Link>
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            GitHub
          </a>
          <a
            href={LINKED_IN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            LinkedIn
          </a>
          <DarkModeToggle
            darkMode={darkMode}
            setDarkMode={() => setDarkMode(!darkMode)}
          />
          <LanguageSwitcher />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle
            darkMode={darkMode}
            setDarkMode={() => setDarkMode(!darkMode)}
          />
          <button
            className="text-gray-800 dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 flex flex-col gap-4">
          <a
            href="/#projects"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.projects')}
          </a>
          <Link
            to={SKILLSET_URL}
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.cv')}
          </Link>
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            GitHub
          </a>
          <a
            href={LINKED_IN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            LinkedIn
          </a>
          <LanguageSwitcher />
        </div>
      )}
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
        <main className="flex-1 overflow-auto bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/linkedin" element={<LinkedInCallback />} />
            <Route path={HOME_URL} element={<HomePage />} />
            <Route path={SKILLSET_URL} element={<CVPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-3 text-center text-xs text-gray-400 dark:text-gray-600 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <span>© {new Date().getFullYear()} Sebastian Nordby</span>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
