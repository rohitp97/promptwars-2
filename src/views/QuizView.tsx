import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    text: "Under which law is your vote kept secret?",
    options: [
      "Indian Constitution Article 19",
      "Section 128 of the Representation of the People Act, 1951",
      "Indian Penal Code Section 171",
      "RTI Act 2005"
    ],
    correct: 1
  },
  {
    text: "How many hours before polling does the \"Silent Period\" begin?",
    options: [
      "24 hours",
      "12 hours",
      "48 hours",
      "72 hours"
    ],
    correct: 2
  },
  {
    text: "What does NOTA stand for?",
    options: [
      "No Official Tally Available",
      "None Of The Above",
      "National Option To Abstain",
      "Not On The Agenda"
    ],
    correct: 1
  },
  {
    text: "Which document is NOT a valid alternative to Voter ID at the polling booth?",
    options: [
      "Aadhaar Card",
      "Driving License",
      "PAN Card",
      "Library Card"
    ],
    correct: 3
  },
  {
    text: "What is the helpline number to report election violations?",
    options: [
      "100",
      "1800",
      "1950",
      "112"
    ],
    correct: 2
  },
  {
    text: "Under which section of the IPC is offering money for votes a criminal offense?",
    options: [
      "Section 302",
      "Section 171B",
      "Section 420",
      "Section 144"
    ],
    correct: 1
  },
  {
    text: "In what year was NOTA introduced in Indian elections?",
    options: [
      "2009",
      "2011",
      "2013",
      "2015"
    ],
    correct: 2
  },
  {
    text: "Who introduced the Model Code of Conduct in India?",
    options: [
      "Parliament of India",
      "Supreme Court of India",
      "Election Commission of India",
      "President of India"
    ],
    correct: 2
  },
  {
    text: "What is VVPAT used for?",
    options: [
      "Counting votes faster",
      "Verifying voter identity",
      "Allowing voters to verify their vote was recorded correctly",
      "Transmitting results to ECI"
    ],
    correct: 2
  },
  {
    text: "Which form is used to register as a new voter in India?",
    options: [
      "Form 8",
      "Form 6",
      "Form 4",
      "Form 16"
    ],
    correct: 1
  }
];

export default function QuizView() {
  const { t } = useLanguage();
  const [state, setState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('votesmart_best_score');
    return saved ? parseInt(saved, 10) : null;
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStart = () => {
    setState('playing');
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = index === QUESTIONS[currentQ].correct;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        finishQuiz(score + (isCorrect ? 10 : 0));
      }
    }, 1200);
  };

  const finishQuiz = (finalScore: number) => {
    if (bestScore === null || finalScore > bestScore) {
      localStorage.setItem('votesmart_best_score', finalScore.toString());
      setBestScore(finalScore);
    }
    setState('result');
    if (finalScore >= 71) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const getBadgeInfo = (s: number) => {
    if (s <= 40) return { 
      badge: '🌱', 
      title: t('quiz_badge_naya'), 
      sub: "Abhi seekhna shuru karo! Every expert was once a beginner.", 
      bg: 'bg-[#FEF3C7]' 
    };
    if (s <= 70) return { 
      badge: '📚', 
      title: t('quiz_badge_samajhdar'), 
      sub: "Accha kiya! You know your rights — now share this with someone who doesn't.", 
      bg: 'bg-[#DCFCE7]' 
    };
    return { 
      badge: '🏆', 
      title: t('quiz_badge_champion'), 
      sub: "Zabardast! You're in the top tier of informed Indian voters.", 
      bg: 'bg-[#EEF2FF]' 
    };
  };

  const handleShare = () => {
    const badge = getBadgeInfo(score).title;
    const text = `I scored ${score}/100 on the VoteSmart India Voter IQ Quiz and earned the '${badge}' badge! 🗳️ Are you election-ready? Test yourself: ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({ title: 'VoteSmartIndia Quiz', text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  if (state === 'intro') {
    return (
      <div className="pb-24 px-5 pt-8 max-w-md mx-auto min-h-[calc(100vh-130px)] flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
          🏆
        </div>
        <h2 className="text-3xl font-bold mb-2 text-primary">{t('card_quiz')} 🗳️</h2>
        <p className="text-gray-600 text-lg mb-8">{t('quiz_subtitle')}. 10 questions.</p>

        <div className="w-full bg-white rounded-[20px] border border-gray-200 p-5 mb-8 shadow-sm text-left">
          <p className="font-semibold text-gray-700 mb-3 text-center">Score Badges</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-bold text-[15px]">{t('quiz_badge_naya')}</p>
                <p className="text-xs text-gray-500">0-40 points</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-bold text-[15px]">{t('quiz_badge_samajhdar')}</p>
                <p className="text-xs text-gray-500">41-70 points</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-bold text-[15px]">{t('quiz_badge_champion')}</p>
                <p className="text-xs text-gray-500">71-100 points</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg active:scale-95 transition-transform shadow-md"
        >
          {t('quiz_start')}
        </button>
        {bestScore !== null && (
          <p className="mt-4 text-sm font-semibold text-gray-500">
            {t('quiz_best_score')}: <span className="text-primary">{bestScore}/100</span> — {getBadgeInfo(bestScore).title}
          </p>
        )}
      </div>
    );
  }

  if (state === 'playing') {
    const q = QUESTIONS[currentQ];
    return (
      <div className="pb-24 px-5 pt-6 max-w-md mx-auto min-h-[calc(100vh-130px)] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-500">Question {currentQ + 1}/10</span>
          <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">
            Score: {score}
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${((currentQ) / 10) * 100}%` }}
          />
        </div>

        <div key={currentQ} className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-[22px] font-bold leading-snug mb-8 text-gray-800">
            {q.text}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let btnClass = "bg-white border-gray-200 text-gray-800 hover:border-gray-300";
              let icon = null;

              if (isAnswered) {
                if (i === q.correct) {
                  btnClass = "bg-[#1A6B3C] border-[#1A6B3C] text-white font-semibold";
                  icon = <CheckCircle size={20} className="text-white" />;
                } else if (i === selectedOption) {
                  btnClass = "bg-[#DC2626] border-[#DC2626] text-white font-semibold";
                  icon = <XCircle size={20} className="text-white" />;
                } else {
                  btnClass = "bg-white border-gray-200 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(i)}
                  className={`w-full min-h-[56px] py-4 px-4 rounded-[16px] border text-left text-[16px] transition-all duration-300 flex justify-between items-center ${btnClass}`}
                >
                  <span className="flex-1 pr-2 leading-tight">{opt}</span>
                  {icon && <span className="flex-shrink-0 ml-2 animate-in zoom-in duration-200">{icon}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const result = getBadgeInfo(score);

  return (
    <div className={`pb-24 px-5 pt-12 max-w-md mx-auto min-h-[calc(100vh-130px)] flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 ${result.bg} -mx-4`}>
      <div className="text-[80px] mb-2 leading-none">{result.badge}</div>
      <h2 className="text-[28px] font-bold text-primary mb-6 text-center leading-tight">
        {result.title}
      </h2>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-black/5 w-full text-center mb-6">
        <p className="text-gray-500 font-semibold mb-1">{t('quiz_score')}</p>
        <p className="text-5xl font-black text-gray-800 mb-2">{score}<span className="text-2xl text-gray-400">/100</span></p>
        <p className="text-sm font-semibold text-green-600 bg-green-100 inline-block px-3 py-1 rounded-full mb-4">
          {score / 10} out of 10 correct
        </p>
        <hr className="border-gray-200 my-4" />
        <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
          {result.sub}
        </p>
      </div>

      <div className="w-full flex gap-3 mt-auto mb-4">
        <button 
          onClick={handleShare}
          className="flex-1 py-4 border-2 border-primary text-primary bg-white rounded-xl font-bold text-[15px] active:scale-95 transition-transform shadow-sm"
        >
          {t('quiz_share')}
        </button>
        <button 
          onClick={handleStart}
          className="flex-1 py-4 bg-primary text-white rounded-xl font-bold text-[15px] active:scale-95 transition-transform shadow-sm"
        >
          {t('quiz_try_again')}
        </button>
      </div>
    </div>
  );
}
