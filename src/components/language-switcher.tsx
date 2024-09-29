import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        i18n.changeLanguage(savedLang);
    }
}, []);


  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };
    

  return (
    <select
      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-md"
      onChange={(e) => changeLanguage(e.target.value)}
      defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="no">Norwegian</option>
    </select>
  );
};
