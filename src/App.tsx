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
import { useState } from 'react';
import { ContactPage } from './pages/contact';
import { SkillsetPage } from './pages/skillset';
import { WorkInfoPage, WorkPage } from './pages/work';
import { PrivacyPage } from './pages/privacy';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import { DarkModeToggle } from './components/dark-mode-toggle'; // Custom dark mode toggle component
import { AppPortfolioPage } from './pages/applications';
import {
  HOME_URL,
  WORK_URL,
  WORK_INFO_URL,
  CONTACT_URL,
  GITHUB_LINK,
  LINKED_IN_LINK,
  PRIVACY_URL,
  APP_PORTFOLIO_URL,
  SKILLSET_URL,
} from './pages/constants';
import React from 'react'; // Import React
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
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu

  if (location?.pathname === '/') {
    return <></>;
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="p-4 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to={'/'}>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Nordby Solutions
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
              className="hover:underline text-gray-800 dark:text-gray-300"
              to={HOME_URL}
            >
              {t('common.frontpage')}
            </Link>
            <Link
              className="hover:underline text-gray-800 dark:text-gray-300"
              to={SKILLSET_URL}
            >
              {t('common.skillset')}
            </Link>
            <a
              className="hover:underline text-gray-800 dark:text-gray-300"
              href={LINKED_IN_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <DarkModeToggle
              darkMode={darkMode}
              setDarkMode={() => setDarkMode(!darkMode)}
            />{' '}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col w-full h-screen ${darkMode ? 'dark' : ''}`}
      >
        {/* Header */}
        <Header setDarkMode={(val) => setDarkMode(val)} darkMode={darkMode} />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Routes>
            <Route path="/linkedin" element={<LinkedInCallback />} />
            <Route path={HOME_URL} element={<HomePage />} />
            <Route path={SKILLSET_URL} element={<CVPage />} />
            <Route path={WORK_URL} element={<WorkPage />} />
            <Route path={WORK_INFO_URL} element={<WorkInfoPage />} />
            <Route path={CONTACT_URL} element={<ContactPage />} />
            <Route path={PRIVACY_URL} element={<PrivacyPage />} />
            <Route
              path={APP_PORTFOLIO_URL}
              element={<AppPortfolioPage />}
            ></Route>
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-2.5 text-center flex gap-2 justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 shadow-inner">
          <span>© Nordby Solutions - 2024</span>
          <div className="relative group">
            <span className="cursor-pointer">Credits</span>

            <a
              href="https://www.flaticon.com/free-icons/code"
              title="code icons"
              target="_blank"
              className="absolute left-0 top-[-50px] w-72 mt-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md shadow-md hidden group-hover:inline"
            >
              Code icons created by Freepik - Flaticon
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
