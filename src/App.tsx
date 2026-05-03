import { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const HomeView = lazy(() => import('./views/HomeView'));
const GuideView = lazy(() => import('./views/GuideView'));
const EligibilityView = lazy(() => import('./views/EligibilityView'));
const MythBusterView = lazy(() => import('./views/MythBusterView'));
const ChatView = lazy(() => import('./views/ChatView'));
const QuizView = lazy(() => import('./views/QuizView'));
const PledgeWallView = lazy(() => import('./views/PledgeWallView'));

const FallbackLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-130px)]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function AppContent() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const titles: Record<string, string> = {
      home: t('app_name'),
      guide: t('nav_guide'),
      ready: t('card_ready'),
      myth: t('nav_myth'),
      chat: t('chat_title'),
      quiz: t('nav_quiz'),
      pledge: t('nav_pledge')
    };
    
    document.title = `${titles[activeTab] || 'VoteSmartIndia'} | VoteSmartIndia`;
    document.documentElement.lang = language;
  }, [activeTab, language, t]);

  return (
    <div className="min-h-screen bg-background font-sans text-textMain">
      <Header />
      <main className="w-full">
        <Suspense fallback={<FallbackLoader />}>
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'guide' && <GuideView />}
          {activeTab === 'ready' && <EligibilityView />}
          {activeTab === 'myth' && <MythBusterView />}
          {activeTab === 'chat' && <ChatView />}
          {activeTab === 'quiz' && <QuizView />}
          {activeTab === 'pledge' && <PledgeWallView />}
        </Suspense>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
