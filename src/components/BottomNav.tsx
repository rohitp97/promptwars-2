import { useLanguage } from '../contexts/LanguageContext';
import { Home, List, ShieldAlert, MessageSquare, Award, Heart } from 'lucide-react';
import clsx from 'clsx';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: Home, label: t('nav_home') },
    { id: 'guide', icon: List, label: t('nav_guide') },
    { id: 'myth', icon: ShieldAlert, label: t('nav_myth') },
    { id: 'chat', icon: MessageSquare, label: t('nav_chat') },
    { id: 'quiz', icon: Award, label: t('nav_quiz') },
    { id: 'pledge', icon: Heart, label: t('nav_pledge') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-between items-center px-2 py-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={clsx(
              "flex flex-1 flex-col items-center py-2 h-16 active:scale-95 transition-transform",
              activeTab === item.id ? "text-primary" : "text-gray-400"
            )}
          >
            <item.icon size={22} className={clsx("mb-1", activeTab === item.id && "fill-primary/20")} />
            <span className="text-[11px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
