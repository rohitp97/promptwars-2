import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, Share, MapPin, Inbox as BoxIcon } from 'lucide-react';
import Footer from '../components/Footer';

interface Pledge {
  id?: number;
  name: string;
  state: string;
  timestamp: number;
}

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Jammu and Kashmir", "Lakshadweep", "Puducherry", "Ladakh"
];

const seedData: Pledge[] = [
  { id: 1, name: "Ananya Sharma", state: "Delhi", timestamp: Date.now() - 180000 },
  { id: 2, name: "Rahul Verma", state: "Uttar Pradesh", timestamp: Date.now() - 420000 },
  { id: 3, name: "Priya Patel", state: "Gujarat", timestamp: Date.now() - 900000 },
  { id: 4, name: "Kiran Rao", state: "Karnataka", timestamp: Date.now() - 1800000 },
  { id: 5, name: "Suresh Kumar", state: "Tamil Nadu", timestamp: Date.now() - 3600000 },
  { id: 6, name: "Meena Joshi", state: "Maharashtra", timestamp: Date.now() - 7200000 },
  { id: 7, name: "Arjun Singh", state: "Rajasthan", timestamp: Date.now() - 10800000 },
  { id: 8, name: "Divya Nair", state: "Kerala", timestamp: Date.now() - 14400000 },
  { id: 9, name: "Vikram Bose", state: "West Bengal", timestamp: Date.now() - 21600000 },
  { id: 10, name: "Sneha Reddy", state: "Telangana", timestamp: Date.now() - 28800000 },
  { id: 11, name: "Amit Tiwari", state: "Madhya Pradesh", timestamp: Date.now() - 43200000 },
  { id: 12, name: "Fatima Sheikh", state: "Bihar", timestamp: Date.now() - 86400000 }
];

export default function PledgeWallView() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [pledgeCount, setPledgeCount] = useState(4271);
  const [hasPledged, setHasPledged] = useState(false);
  const [myPledge, setMyPledge] = useState<Pledge | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize data
    if (!localStorage.getItem('votesmart_pledges_seeded')) {
      localStorage.setItem('votesmart_pledges', JSON.stringify(seedData));
      localStorage.setItem('votesmart_pledge_count', '4271');
      localStorage.setItem('votesmart_pledges_seeded', 'true');
    }

    const storedPledges = JSON.parse(localStorage.getItem('votesmart_pledges') || '[]');
    const storedCount = parseInt(localStorage.getItem('votesmart_pledge_count') || '4271', 10);
    
    setPledges(storedPledges.sort((a: Pledge, b: Pledge) => b.timestamp - a.timestamp));
    setPledgeCount(storedCount);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPledgeCount(prev => {
        const next = prev + 1;
        localStorage.setItem('votesmart_pledge_count', next.toString());
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || !selectedState) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newPledge: Pledge = {
        id: Date.now(),
        name: name.trim(),
        state: selectedState,
        timestamp: Date.now()
      };
      
      const newPledges = [newPledge, ...pledges];
      setPledges(newPledges);
      
      const newCount = pledgeCount + 1;
      setPledgeCount(newCount);
      
      localStorage.setItem('votesmart_pledges', JSON.stringify(newPledges));
      localStorage.setItem('votesmart_pledge_count', newCount.toString());
      
      setMyPledge(newPledge);
      setHasPledged(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleShare = async () => {
    const shareText = `I, ${myPledge?.name} from ${myPledge?.state}, pledge to vote in the upcoming elections and not be influenced by cash or gifts. 🗳️🇮🇳 \nTake the pledge: ${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I took the Voter Pledge on VoteSmartIndia",
          text: shareText,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const scrollToWall = () => {
    wallRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return "Today";
  };

  const uniqueStatesCount = new Set(pledges.map(p => p.state)).size;
  const displayPledges = pledges.slice(0, 20);
  const remainingCount = Math.max(0, pledgeCount - 20);

  return (
    <div className="pb-24 flex flex-col min-h-[calc(100vh-130px)] bg-[#FAFAF8]">
      {/* SECTION 1 - EMOTIONAL HERO BANNER */}
      <div className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF3B3B] px-5 py-10 text-center text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">{t('pledge_hero')}</h1>
        <p className="text-[15px] opacity-90 mb-6 max-w-sm mx-auto">
          {t('pledge_hero_sub')}
        </p>
        <div className="text-3xl font-bold bg-white/20 inline-block px-4 py-2 rounded-xl backdrop-blur-sm">
          🗳️ {pledgeCount.toLocaleString()} <span className="text-xl font-semibold">{t('pledge_count_text')}</span>
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto w-full -mt-6 relative z-10 space-y-6">
        {/* SECTION 2 & 3 - FORM OR PLEDGE CARD */}
        {!hasPledged ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-[18px] font-bold text-[#FF6B35] mb-4">{t('pledge_take')}</h2>
            
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder={t('pledge_name') + " e.g. Priya Sharma"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-white text-gray-700"
                >
                  <option value="">{t('pledge_select_state')}</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="bg-[#FFF7ED] p-4 rounded-xl text-sm italic text-gray-700 border border-orange-100 leading-relaxed">
                "I, <span className="font-bold border-b border-gray-400">{name || '[NAME]'}</span>, as a proud citizen of India, pledge to cast my vote in the upcoming elections. I will not be influenced by cash, gifts, caste, or religion. My vote is my right and my responsibility. Jai Hind. 🇮🇳"
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!name.trim() || !selectedState || isSubmitting}
                className="w-full h-14 mt-2 bg-[#FF6B35] text-white rounded-xl font-bold text-lg disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <CheckCircle className="animate-pulse" />
                ) : (
                  <>{t('pledge_take')} 🤝</>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center relative">
              <div className="h-1.5 w-full bg-[#FF6B35]"></div>
              <div className="p-6">
                <div className="text-4xl mb-3">🇮🇳</div>
                <h2 className="text-2xl font-bold text-[#FF6B35] mb-4">{t('pledge_hero')}</h2>
                
                <h3 className="text-xl font-bold text-[#1A1A1A]">{myPledge?.name}</h3>
                <p className="text-gray-600 flex items-center justify-center gap-1 mt-1 font-medium">
                  <MapPin size={16} /> {myPledge?.state}
                </p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Pledge #{pledgeCount.toLocaleString()}</p>
                
                <hr className="my-4 border-gray-100" />
                
                <p className="text-sm text-gray-700 italic leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  "I, <strong>{myPledge?.name}</strong>, as a proud citizen of India, pledge to cast my vote in the upcoming elections. I will not be influenced by cash, gifts, caste, or religion. My vote is my right and my responsibility. Jai Hind. 🇮🇳"
                </p>
                
                <p className="text-xs text-gray-400 mt-4 font-medium">29 April 2026</p>
                <p className="text-xs text-gray-500 mt-2 font-bold">VoteSmartIndia 🗳️ | Samjho. Jaano. Vote Karo.</p>
              </div>
            </div>

            <button 
              onClick={handleShare}
              className="w-full h-14 bg-[#FF6B35] text-white rounded-xl font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm relative"
            >
              <Share size={20} /> {t('pledge_share')}
              {showToast && (
                <div className="absolute -top-12 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg animate-in fade-in zoom-in duration-200">
                  Copied to clipboard!
                </div>
              )}
            </button>

            <button 
              onClick={scrollToWall}
              className="w-full h-14 border-2 border-[#FF6B35] text-[#FF6B35] bg-white rounded-xl font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <BoxIcon size={20} /> {t('pledge_see_wall')}
            </button>

            <div className="text-center pt-2 pb-2">
              <p className="text-sm text-gray-500 mb-1">{t('pledge_want_another')}</p>
              <button 
                onClick={() => { setHasPledged(false); setName(''); setSelectedState(''); }}
                className="text-[#FF6B35] font-semibold text-sm underline underline-offset-2"
              >
                {t('pledge_add_another')}
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4 - THE PLEDGE WALL */}
        <div ref={wallRef} className="pt-4 pb-4">
          <h3 className="text-[20px] font-bold text-textMain">{t('pledge_wall_title')} 🏛️</h3>
          <p className="text-sm text-gray-500 mb-4">{t('pledge_wall_sub')}</p>
          
          <div className="space-y-3">
            {displayPledges.map((pledge, idx) => (
              <div key={pledge.id || idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 text-lg">
                  🗳️
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[16px] text-textMain truncate pr-2">{pledge.name}</h4>
                    <span className="text-[12px] text-gray-400 whitespace-nowrap">{formatTimeAgo(pledge.timestamp)}</span>
                  </div>
                  <p className="text-[14px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {pledge.state}
                  </p>
                  <p className="text-[13px] text-gray-600 italic mt-2">
                    "Maine pratigya li 🇮🇳"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="text-center py-6 text-gray-500 font-medium">
              + {remainingCount.toLocaleString()} {t('pledge_more')} 🇮🇳
            </div>
          )}
        </div>

        {/* SECTION 5 - BOTTOM IMPACT STATS */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex justify-between items-center text-center">
          <div className="flex flex-col items-center flex-1">
            <span className="text-lg mb-1">🗳️</span>
            <span className="text-xs font-bold text-orange-800">{pledgeCount.toLocaleString()} {t('pledge_stat_pledges')}</span>
          </div>
          <div className="w-px h-8 bg-orange-200"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-lg mb-1">🗺️</span>
            <span className="text-xs font-bold text-orange-800">{uniqueStatesCount} {t('pledge_stat_states')}</span>
          </div>
          <div className="w-px h-8 bg-orange-200"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-lg mb-1">📅</span>
            <span className="text-xs font-bold text-orange-800">{t('pledge_stat_since')}</span>
          </div>
        </div>

        <div className="pt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
