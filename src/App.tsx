import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import GuideView from './views/GuideView';
import EligibilityView from './views/EligibilityView';
import MythBusterView from './views/MythBusterView';
import ChatView from './views/ChatView';
import QuizView from './views/QuizView';
import PledgeWallView from './views/PledgeWallView';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background font-sans text-textMain">
      <Header />
      <main className="w-full">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'guide' && <GuideView />}
        {activeTab === 'ready' && <EligibilityView />}
        {activeTab === 'myth' && <MythBusterView />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'quiz' && <QuizView />}
        {activeTab === 'pledge' && <PledgeWallView />}
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
