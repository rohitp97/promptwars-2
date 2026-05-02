import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface Dictionary {
  [key: string]: string;
}

const translations: Record<Language, Dictionary> = {
  en: {
    app_name: "VoteSmartIndia 🗳️",
    tagline: "Samjho. Jaano. Vote Karo.",
    card_guide: "Election Process Guide",
    card_ready: "Am I Ready to Vote?",
    card_myth: "Myth Buster",
    card_chat: "Chat with Kavya",
    nav_home: "Home",
    nav_guide: "Guide",
    nav_myth: "Myth Buster",
    nav_chat: "Chat",
    guide_title: "How Elections Work",
    ready_title: "Am I Ready to Vote?",
    ready_q1: "Are you an Indian citizen?",
    ready_q2: "What is your date of birth?",
    ready_q3: "What is your state (Select for relevant phase info)?",
    ready_q4: "Is your name on the Electoral Roll?",
    ready_q5: "Do you have a valid Voter ID (EPIC) or alternative ID? (Aadhaar/Passport/PAN/DL/etc.)",
    yes: "Yes",
    no: "No",
    not_sure: "Not Sure",
    next: "Next",
    back: "Back",
    submit: "Check Eligibility",
    eligibility_ready: "You're set! Here's what to bring on polling day.",
    eligibility_register: "Here's how to register on voters.eci.gov.in in 3 steps",
    eligibility_not: "You are not yet eligible to vote.",
    myth_title: "Myth vs Facts",
    chat_title: "Chat with Kavya",
    chat_placeholder: "Ask Kavya something...",
    where_am_i: "Where am I in the process?",
    footer_powered: "Powered by ECI guidelines & RPA 1951",
    footer_nonpartisan: "This app is non-partisan and not affiliated with any political party",
    footer_report: "Report election violations: Call 1950 | cVIGIL App",
    rights_title: "Your Polling Booth Rights",
    rights_secret: "Your vote is 100% secret — no one can know how you voted",
    rights_alternative: "You have the right to vote even without EPIC if you have alternative ID",
    rights_entry: "You cannot be denied entry to the booth",
    rights_report: "If offered money/gifts before elections, you can report it: 1950 (cVIGIL hotline) or the cVIGIL app",
    share: "Share this myth",
    card_quiz: "Voter IQ Quiz",
    quiz_subtitle: "Test your election knowledge",
    nav_quiz: "Quiz",
    quiz_start: "Start Quiz",
    quiz_best_score: "Your best score",
    quiz_score: "You scored",
    quiz_share: "Share Result",
    quiz_try_again: "Try Again",
    quiz_badge_naya: "Naya Voter",
    quiz_badge_samajhdar: "Samajhdar Voter",
    quiz_badge_champion: "VoteSmart Champion",
    card_pledge: "Voter Pledge Wall",
    pledge_subtitle: "Join thousands of Indians pledging to vote",
    nav_pledge: "Pledge",
    pledge_take: "Take the Pledge",
    pledge_name: "Your name",
    pledge_hero: "Maine Pratigya Li 🇮🇳",
    pledge_share: "Share My Pledge",
    pledge_see_wall: "See the Pledge Wall",
    pledge_wall_title: "The Pledge Wall",
    pledge_add_another: "Add Another Pledge",
    pledge_hero_sub: "Your vote is your voice. Don't let anyone silence it.",
    pledge_count_text: "Indians have pledged",
    pledge_select_state: "Select State",
    pledge_want_another: "Want to take the pledge for someone else?",
    pledge_wall_sub: "Fellow Indians who have pledged to vote",
    pledge_more: "more Indians have pledged",
    pledge_stat_pledges: "Pledges",
    pledge_stat_states: "States",
    pledge_stat_since: "Since April 2026",
    chat_ask_anything: "💬 Ask Kavya anything about elections:",
    chat_starter_1: "How do I register to vote?",
    chat_starter_2: "What to carry to polling booth?",
    chat_starter_3: "Is the EVM safe?",
    chat_starter_4: "Can my boss stop me from voting?",
    chat_starter_5: "Someone offered me money to vote",
    chat_starter_6: "What is NOTA?",
    chat_fallback_1: "Tell me more",
    chat_fallback_2: "What are my voting rights?",
    chat_fallback_3: "How do I file a complaint?"
  },
  hi: {
    app_name: "वोटस्मार्टइंडिया 🗳️",
    tagline: "समझो। जानो। वोट करो।",
    card_guide: "चुनाव प्रक्रिया गाइड",
    card_ready: "क्या मैं वोट देने के लिए तैयार हूँ?",
    card_myth: "झूठ बनाम सच",
    card_chat: "काव्या से पूछें",
    nav_home: "होम",
    nav_guide: "गाइड",
    nav_myth: "सच/झूठ",
    nav_chat: "चैट",
    guide_title: "चुनाव कैसे काम करते हैं",
    ready_title: "क्या मैं वोट देने के लिए तैयार हूँ?",
    ready_q1: "क्या आप भारतीय नागरिक हैं?",
    ready_q2: "आपकी जन्म तिथि क्या है?",
    ready_q3: "आपका राज्य कौन सा है?",
    ready_q4: "क्या आपका नाम मतदाता सूची में है?",
    ready_q5: "क्या आपके पास वैध वोटर आईडी या वैकल्पिक आईडी है? (आधार/पासपोर्ट/पैन/आदि)",
    yes: "हाँ",
    no: "नहीं",
    not_sure: "पता नहीं",
    next: "अगला",
    back: "पीछे",
    submit: "जांचें",
    eligibility_ready: "आप तैयार हैं! यहाँ बताया गया है कि मतदान के दिन क्या लाना है।",
    eligibility_register: "voters.eci.gov.in पर पंजीकरण कैसे करें",
    eligibility_not: "आप अभी वोट देने के लिए पात्र नहीं हैं।",
    myth_title: "झूठ बनाम सच",
    chat_title: "काव्या से पूछें",
    chat_placeholder: "कुछ पूछें...",
    where_am_i: "मैं प्रक्रिया में कहाँ हूँ?",
    footer_powered: "ECI दिशानिर्देशों और RPA 1951 द्वारा संचालित",
    footer_nonpartisan: "यह ऐप गैर-पक्षपाती है और किसी राजनीतिक दल से संबद्ध नहीं है",
    footer_report: "चुनाव उल्लंघन की रिपोर्ट करें: 1950 पर कॉल करें | cVIGIL ऐप",
    rights_title: "आपके मतदान अधिकार",
    rights_secret: "आपका वोट 100% गुप्त है — कोई नहीं जान सकता कि आपने किसे वोट दिया",
    rights_alternative: "वैकल्पिक आईडी होने पर आप बिना EPIC के भी वोट दे सकते हैं",
    rights_entry: "आपको बूथ में प्रवेश से मना नहीं किया जा सकता",
    rights_report: "पैसे/उपहार मिलने पर रिपोर्ट करें: 1950 (cVIGIL) या cVIGIL ऐप",
    share: "शेयर करें",
    card_quiz: "वोटर IQ क्विज़",
    quiz_subtitle: "अपना चुनाव ज्ञान जाँचो",
    nav_quiz: "क्विज़",
    quiz_start: "क्विज़ शुरू करो",
    quiz_best_score: "आपका सर्वश्रेष्ठ स्कोर",
    quiz_score: "आपका स्कोर",
    quiz_share: "शेयर करो",
    quiz_try_again: "फिर से खेलो",
    quiz_badge_naya: "नया वोटर",
    quiz_badge_samajhdar: "समझदार वोटर",
    quiz_badge_champion: "वोटस्मार्ट चैम्पियन",
    card_pledge: "वोटर प्रतिज्ञा दीवार",
    pledge_subtitle: "लाखों भारतीयों के साथ प्रतिज्ञा लो",
    nav_pledge: "प्रतिज्ञा",
    pledge_take: "प्रतिज्ञा लो",
    pledge_name: "आपका नाम",
    pledge_hero: "मैंने प्रतिज्ञा ली!",
    pledge_share: "प्रतिज्ञा शेयर करो",
    pledge_see_wall: "प्रतिज्ञा दीवार देखो",
    pledge_wall_title: "प्रतिज्ञा दीवार",
    pledge_add_another: "एक और प्रतिज्ञा जोड़ो",
    pledge_hero_sub: "आपका वोट आपकी आवाज़ है। किसी को इसे दबाने न दें।",
    pledge_count_text: "भारतीयों ने प्रतिज्ञा ली है",
    pledge_select_state: "राज्य चुनें",
    pledge_want_another: "क्या आप किसी और के लिए प्रतिज्ञा लेना चाहते हैं?",
    pledge_wall_sub: "साथी भारतीय जिन्होंने वोट देने की प्रतिज्ञा ली है",
    pledge_more: "और भारतीयों ने प्रतिज्ञा ली है",
    pledge_stat_pledges: "प्रतिज्ञाएँ",
    pledge_stat_states: "राज्य",
    pledge_stat_since: "अप्रैल 2026 से",
    chat_ask_anything: "💬 चुनाव के बारे में काव्या से कुछ भी पूछें:",
    chat_starter_1: "वोटर रजिस्ट्रेशन कैसे करें?",
    chat_starter_2: "बूथ पर क्या लेकर जाएं?",
    chat_starter_3: "EVM सुरक्षित है क्या?",
    chat_starter_4: "क्या बॉस वोट रोक सकता है?",
    chat_starter_5: "किसी ने पैसे दिए तो क्या करें?",
    chat_starter_6: "NOTA क्या होता है?",
    chat_fallback_1: "मुझे और बताएं",
    chat_fallback_2: "मेरे मतदान अधिकार क्या हैं?",
    chat_fallback_3: "मैं शिकायत कैसे दर्ज करूँ?"
  }
};

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
