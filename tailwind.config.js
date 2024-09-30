/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Adjust if you have other file types
  ],
  theme: {
    extend: {
      colors: {
        utleiestyring_primary: '#52897f',
      },
    },
  },
  plugins: [],
};
