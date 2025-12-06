import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('no');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setSelectedLang(savedLang); // Set initial flag based on saved language
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setSelectedLang(lang); // Update the selected flag
  };

  const toggleLanguage = () => {
    const newLang = selectedLang === 'en' ? 'no' : 'en';
    changeLanguage(newLang);
  };

  const getFlag = (lang: string) => {
    switch (lang) {
      case 'en':
        return '/images/uk-flag.svg';
      case 'no':
        return '/images/no-flag.svg';
      default:
        return '/images/no-flag.svg';
    }
  };

  return (
    <div>
      {/* Display the currently selected language's flag as the button */}
      <button className="bg-none rounded-md" onClick={toggleLanguage}>
        <img
          src={getFlag(selectedLang)}
          alt={selectedLang === 'en' ? 'English' : 'Norwegian'}
          className="w-[30px] h-[30px]"
        />
      </button>
    </div>
  );
};
