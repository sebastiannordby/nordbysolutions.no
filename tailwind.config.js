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
        c_lime: '#daf97c',
        c_purple: '#b892ff',
      },
    },
  },
  plugins: [],
};
