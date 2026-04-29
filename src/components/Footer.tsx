import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 text-center text-xs text-gray-500 space-y-2 opacity-80 pb-8">
      <p className="font-semibold text-gray-700">{t('footer_powered')}</p>
      <p>{t('footer_nonpartisan')}</p>
      <p className="text-secondary font-bold mt-2">{t('footer_report')}</p>
      <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary underline block pt-2">
        voters.eci.gov.in
      </a>
    </footer>
  );
}
