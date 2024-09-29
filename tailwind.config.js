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
        utleiestyring_secondary: '#F0C7A4',
        utleiestyring_accent: '#FF6F61',
        utleiestyring_dark: '#333333',
        utleiestyring_light: '#F9F9F9',
      },
    },
  },
  plugins: [],
};
