import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@mui/material';
import { t } from 'i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
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
    setOpen(false); // Close dialog after selecting
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
      <button className="bg-none rounded-md" onClick={() => setOpen(true)}>
        <img
          src={getFlag(selectedLang)}
          alt={selectedLang === 'en' ? 'English' : 'Norwegian'}
          className="w-[30px] h-[30px]"
        />
      </button>

      {/* Dialog with flags for language selection */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="p-4 flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">
            {t('common.selectlanguage')}
          </h2>
          <div className="flex space-x-4">
            <button onClick={() => changeLanguage('en')}>
              <img
                src="/images/uk-flag.svg"
                alt="English"
                className="w-12 h-12"
              />
            </button>
            <button onClick={() => changeLanguage('no')}>
              <img
                src="/images/no-flag.svg"
                alt="Norwegian"
                className="w-12 h-12"
              />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
