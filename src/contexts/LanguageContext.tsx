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
    share: "Share this myth"
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
    share: "शेयर करें"
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
