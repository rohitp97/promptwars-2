import { useLanguage } from '../contexts/LanguageContext';
import { List, CheckCircle, ShieldAlert, MessageSquare } from 'lucide-react';
import Footer from '../components/Footer';

export default function HomeView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { t } = useLanguage();

  const cards = [
    { id: 'guide', title: t('card_guide'), bg: 'bg-primary/10', color: 'text-primary', icon: List, border: 'border-primary/20' },
    { id: 'ready', title: t('card_ready'), bg: 'bg-secondary/10', color: 'text-secondary', icon: CheckCircle, border: 'border-secondary/20' },
    { id: 'myth', title: t('card_myth'), bg: 'bg-accent/10', color: 'text-accent', icon: ShieldAlert, border: 'border-accent/20' },
    { id: 'chat', title: t('card_chat'), bg: 'bg-orange-100', color: 'text-orange-600', icon: MessageSquare, border: 'border-orange-200' },
  ];

  return (
    <div className="space-y-6 pb-24 px-4 pt-6 max-w-md mx-auto min-h-[calc(100vh-130px)] flex flex-col justify-between">
      <div className="grid grid-cols-1 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => setActiveTab(card.id)}
            className={`${card.bg} border ${card.border} rounded-[20px] p-6 flex flex-col justify-center items-center shadow-sm min-h-[130px] active:scale-[0.98] transition-transform`}
          >
            <card.icon size={44} className={`mb-3 ${card.color}`} />
            <h2 className={`font-bold text-lg text-center text-textMain`}>{card.title}</h2>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
