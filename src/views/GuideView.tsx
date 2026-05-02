import { useState, memo, useMemo, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, CalendarDays, Users, FileText, Megaphone, EyeOff, UserCheck, BarChart, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GuideView = memo(() => {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  const guideData = useMemo(() => ({
    en: [
      { id: 1, title: '1. Election Announcement', summary: 'Model Code of Conduct (MCC) kicks in.', detail: 'The Election Commission announces dates. The MCC strictly prohibits candidates from announcing new schemes or misusing government machinery.' },
      { id: 2, title: '2. Voter Roll Verification', summary: 'Check if your name is on the list.', detail: 'You must verify your name on voters.eci.gov.in. Without your name on the roll, you cannot vote even with an ID.' },
      { id: 3, title: '3. Nomination Filing', summary: 'Candidates submit their forms.', detail: 'Candidates must publicly declare their assets, criminal records, and educational qualifications via affidavits.' },
      { id: 4, title: '4. Campaigning Period', summary: 'What candidates can and CANNOT do.', detail: 'Candidates can rally but cannot offer bribes, use hate speech, or appeal to caste/religion under Section 123 of RPA.' },
      { id: 5, title: '5. Silent Period', summary: '48 hours before polling begins.', detail: 'All physical campaigning stops. This gives voters a calm period to decide without influence.' },
      { id: 6, title: '6. Polling Day', summary: 'Go vote with your ID!', detail: 'Bring your EPIC or alternative ID. Verify your vote via the VVPAT paper slip that prints for 7 seconds.' },
      { id: 7, title: '7. Counting & Results', summary: 'EVMs are cracked open.', detail: 'EVMs are kept in strong rooms under heavy armed guard and CCTV until counting day.' },
      { id: 8, title: '8. Post-Election', summary: 'What if you have a complaint?', detail: 'You can report election malpractices like bribing or threatening through the cVIGIL app or the 1950 hotline.' },
    ],
    hi: [
      { id: 1, title: '1. चुनाव की घोषणा', summary: 'आदर्श आचार संहिता (MCC) लागू होती है।', detail: 'चुनाव आयोग तारीखों की घोषणा करता है। MCC उम्मीदवारों को नई योजनाओं की घोषणा करने या सरकारी तंत्र का दुरुपयोग करने से सख्ती से रोकता है।' },
      { id: 2, title: '2. मतदाता सूची सत्यापन', summary: 'जांचें कि आपका नाम सूची में है या नहीं।', detail: 'आपको voters.eci.gov.in पर अपना नाम सत्यापित करना होगा। सूची में नाम के बिना आप आईडी के साथ भी वोट नहीं दे सकते।' },
      { id: 3, title: '3. नामांकन दाखिल करना', summary: 'उम्मीदवार अपने फॉर्म जमा करते हैं।', detail: 'उम्मीदवारों को हलफनामे के माध्यम से अपनी संपत्ति, आपराधिक रिकॉर्ड और शैक्षिक योग्यता सार्वजनिक रूप से घोषित करनी होती है।' },
      { id: 4, title: '4. प्रचार अवधि', summary: 'उम्मीदवार क्या कर सकते हैं और क्या नहीं।', detail: 'उम्मीदवार रैली कर सकते हैं लेकिन RPA की धारा 123 के तहत रिश्वत नहीं दे सकते, अभद्र भाषा का इस्तेमाल नहीं कर सकते, या जाति/धर्म की अपील नहीं कर सकते।' },
      { id: 5, title: '5. मौन अवधि', summary: 'मतदान शुरू होने से 48 घंटे पहले।', detail: 'सभी भौतिक प्रचार बंद हो जाते हैं। यह मतदाताओं को बिना प्रभाव के निर्णय लेने के लिए एक शांत अवधि देता है।' },
      { id: 6, title: '6. मतदान का दिन', summary: 'अपनी आईडी के साथ वोट करें!', detail: 'अपना EPIC या वैकल्पिक आईडी लाएँ। 7 सेकंड के लिए छपने वाली VVPAT पेपर स्लिप के माध्यम से अपने वोट को सत्यापित करें।' },
      { id: 7, title: '7. मतगणना और परिणाम', summary: 'EVM खोले जाते हैं।', detail: 'EVM को मतगणना के दिन तक भारी सशस्त्र गार्ड और CCTV के तहत स्ट्रॉन्ग रूम में रखा जाता है।' },
      { id: 8, title: '8. चुनाव के बाद', summary: 'अगर आपको कोई शिकायत है तो क्या करें?', detail: 'आप cVIGIL ऐप या 1950 हेल्पलाइन के माध्यम से रिश्वत देने या धमकाने जैसी चुनाव कुरीतियों की रिपोर्ट कर सकते हैं।' },
    ]
  }), []);

  const stepStyles = useMemo(() => [
    { icon: CalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: Users, color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: FileText, color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: Megaphone, color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: EyeOff, color: 'text-gray-500', bg: 'bg-gray-200' },
    { icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: BarChart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Scale, color: 'text-blue-600', bg: 'bg-blue-100' }
  ], []);

  const steps = useMemo(() => guideData[language].map((data, index) => ({
      ...data,
      ...stepStyles[index]
  })), [language, guideData, stepStyles]);

  const toggleExpand = useCallback((id: number) => {
    setExpanded(prev => prev === id ? null : id);
  }, []);

  const userState = useMemo(() => localStorage.getItem('user_state'), []);

  return (
    <div className="pb-24 pt-6 max-w-md mx-auto min-h-screen">
      <div className="px-5">
        <h2 className="text-2xl font-bold mb-6 text-primary">{t('guide_title')}</h2>
      </div>

      {userState && (
        <div className="bg-secondary/10 border-y border-secondary/20 px-5 py-3 mb-6 sticky top-16 z-40 backdrop-blur-md">
          <p className="text-sm font-semibold text-secondary flex items-center">
             <span className="w-2 h-2 rounded-full bg-secondary mr-2 inline-block animate-pulse"></span>
             {t('where_am_i')} ({userState})
          </p>
        </div>
      )}

      <div className="px-5 space-y-4 relative">
        <div className="absolute left-9 top-4 bottom-0 w-0.5 bg-gray-200 -z-10"></div>
        {steps.map((step) => (
          <div key={step.id} className="relative">
             <button 
                onClick={() => toggleExpand(step.id)}
                aria-expanded={expanded === step.id}
                aria-label={`${step.title}: ${step.summary}`}
                className="w-full text-left bg-surface border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start active:scale-[0.99] transition-transform"
             >
                <div className={`mt-0.5 w-10 h-10 ${step.bg} ${step.color} rounded-full flex items-center justify-center shrink-0 mr-4 shadow-inner ring-4 ring-background`}>
                    <step.icon size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 pr-2">
                    <h3 className="font-bold text-gray-800">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{step.summary}</p>
                </div>
                <ChevronDown 
                    size={20} 
                    className={`text-gray-400 mt-2 transition-transform duration-300 ${expanded === step.id ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                />
             </button>

             <AnimatePresence>
                {expanded === step.id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-gray-50 text-gray-700 text-sm mt-1 mb-2 ml-[60px] mr-2 rounded-xl border border-gray-100 shadow-inner">
                            {step.detail}
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
});

export default GuideView;
