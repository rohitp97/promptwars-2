import { useLanguage } from '../contexts/LanguageContext';
import { ShieldAlert, CheckCircle, Info, Lock } from 'lucide-react';

export default function RightsCard() {
  const { t } = useLanguage();

  const rights = [
    { icon: Lock, text: t('rights_secret') },
    { icon: Info, text: t('rights_alternative') },
    { icon: CheckCircle, text: t('rights_entry') },
    { icon: ShieldAlert, text: t('rights_report') }
  ];

  return (
    <div className="bg-surface border border-accent/20 rounded-2xl p-5 shadow-sm mt-6">
      <h3 className="font-bold text-accent text-lg mb-4 flex items-center">
        <ShieldAlert className="mr-2" size={20} />
        {t('rights_title')}
      </h3>
      <ul className="space-y-4">
        {rights.map((r, i) => (
          <li key={i} className="flex text-sm items-start">
            <r.icon className="text-secondary shrink-0 mt-0.5 mr-3" size={18} />
            <span className="text-gray-700 leading-snug">{r.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
