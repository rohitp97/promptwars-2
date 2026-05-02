import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-primary text-background shadow-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t('app_name')}</h1>
          <p className="text-sm opacity-90">{t('tagline')}</p>
        </div>
        <button 
          onClick={toggleLanguage}
          aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
          className="bg-background text-primary px-3 py-1 rounded-full text-sm font-semibold shadow-sm active:scale-95 transition-transform"
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>
    </header>
  );
}
