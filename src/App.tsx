import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { ContactPage } from './pages/contact';
import { EducationPage } from './pages/education';
import { HomePage } from './pages/home';
import { WorkInfoPage, WorkPage } from './pages/work';
import { PrivacyPage } from './pages/privacy';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import { DarkModeToggle } from './components/dark-mode-toggle'; // Custom dark mode toggle component
import { AppPortfolioPage } from './pages/applications';
import {
  HOME_URL,
  EDUCATION_URL,
  WORK_URL,
  WORK_INFO_URL,
  CONTACT_URL,
  GITHUB_LINK,
  LINKED_IN_LINK,
  PRIVACY_URL,
  APP_PORTFOLIO_URL,
} from './pages/constants';
import React from 'react'; // Import React
import UtleiestyringPage from './pages/proposals/utleiestyring';
import { LanguageSwitcher } from './components/language-switcher';

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [menuOpen, setMenuOpen] = useState(false); // State for responsive menu

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col w-full h-screen ${darkMode ? 'dark' : ''}`}
      >
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md">
          <nav className="p-4 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to={'/'}>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
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
                  to={APP_PORTFOLIO_URL}
                >
                  Applications
                </Link>
                <Link
                  className="hover:underline text-gray-800 dark:text-gray-300"
                  to={PRIVACY_URL}
                >
                  Privacy
                </Link>
                <a
                  className="hover:underline text-gray-800 dark:text-gray-300"
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <a
                  className="hover:underline text-gray-800 dark:text-gray-300"
                  href={LINKED_IN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />{' '}
                {/* Dark mode toggle button */}
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Routes>
            <Route path="/linkedin" element={<LinkedInCallback />} />
            <Route path={HOME_URL} element={<HomePage />} />
            <Route path={EDUCATION_URL} element={<EducationPage />} />
            <Route path={WORK_URL} element={<WorkPage />} />
            <Route path={WORK_INFO_URL} element={<WorkInfoPage />} />
            <Route path={CONTACT_URL} element={<ContactPage />} />
            <Route path={PRIVACY_URL} element={<PrivacyPage />} />
            <Route
              path={APP_PORTFOLIO_URL}
              element={<AppPortfolioPage />}
            ></Route>
            <Route
              path="/proposals/utleiestyring"
              element={<UtleiestyringPage />}
            ></Route>
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 shadow-inner">
          © Nordby Solutions - 2024
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
