// ./components/DarkModeToggle.js
import React from 'react';

export const DarkModeToggle = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}) => {
  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '🌞' : '🌜'}
    </button>
  );
};
