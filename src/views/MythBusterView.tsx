import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { RefreshCw, Share2 } from 'lucide-react';

export default function MythBusterView() {
  const { language, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const mythsData = {
    en: [
      { myth: "My vote can be traced — the government knows who I voted for.", fact: "EVMs record no voter identity. Your vote is constitutionally secret under Section 128 of RPA 1951." },
      { myth: "If I took ₹500 from a candidate, I have to vote for them.", fact: "Taking the money is legally grey for you, but giving it is a criminal offense (Section 171B IPC). Your vote is still yours." },
      { myth: "Casting a NOTA vote is wasting my vote.", fact: "NOTA was introduced in 2013 by the Supreme Court. It signals dissatisfaction and is a legitimate democratic choice." },
      { myth: "The EVM can be hacked / is rigged.", fact: "EVMs are standalone machines — not connected to any network. VVPAT paper slips allow physical verification." },
      { myth: "I can't vote if I've moved cities and haven't updated my address.", fact: "You can vote only at the constituency where you are enrolled. Update via Form 8A on the ECI portal." },
      { myth: "Election day is a public holiday — I must get paid leave.", fact: "Under Section 135B of the RPA 1951, every registered voter is entitled to paid leave on polling day." },
      { myth: "Police can enter the polling booth anytime.", fact: "Police can strictly only enter the polling booth with the Presiding Officer's permission." },
      { myth: "Candidates can promise anything during campaigns.", fact: "Freebies are under judicial scrutiny. The MCC prohibits false statements and appeals on religious lines." },
      { myth: "I strictly need to show my Voter ID card to vote.", fact: "12 alternative documents are accepted including Aadhaar, Passport, PAN, Driving License, MNREGA card, etc." },
      { myth: "I won't be allowed to vote if my name is slightly misspelled.", fact: "Minor discrepancies in name/address do not disqualify you if other details match your identity." },
      { myth: "Women voters are not allowed to bring their children inside.", fact: "Children under a certain age can accompany mothers inside the booth (rules vary by state)." },
      { myth: "I can take a photo of my ballot as proof of who I voted for.", fact: "Photography inside the polling booth is strictly prohibited and is a criminal offense." }
    ],
    hi: [
      { myth: "मेरा वोट ट्रैक किया जा सकता है — सरकार जानती है कि मैंने किसे वोट दिया।", fact: "EVM कोई मतदाता पहचान रिकॉर्ड नहीं करते। RPA 1951 की धारा 128 के तहत आपका वोट संवैधानिक रूप से गुप्त है।" },
      { myth: "अगर मैंने किसी उम्मीदवार से ₹500 लिए हैं, तो मुझे उन्हें ही वोट देना होगा।", fact: "पैसे लेना आपके लिए कानूनी रूप से ग्रे है, लेकिन देना एक आपराधिक अपराध है (धारा 171B IPC)। आपका वोट अभी भी आपका है।" },
      { myth: "NOTA वोट डालना अपना वोट बर्बाद करना है।", fact: "NOTA 2013 में सुप्रीम कोर्ट द्वारा पेश किया गया था। यह असंतोष का संकेत देता है और एक वैध लोकतांत्रिक विकल्प है।" },
      { myth: "EVM को हैक किया जा सकता है / धांधली की जा सकती है।", fact: "EVM स्टैंडअलोन मशीनें हैं - किसी नेटवर्क से जुड़ी नहीं हैं। VVPAT पेपर स्लिप भौतिक सत्यापन की अनुमति देते हैं।" },
      { myth: "अगर मैं दूसरे शहर में चला गया हूँ और पता अपडेट नहीं किया है तो मैं वोट नहीं दे सकता।", fact: "आप केवल उसी निर्वाचन क्षेत्र में वोट दे सकते हैं जहां आप नामांकित हैं। ECI पोर्टल पर फॉर्म 8A के माध्यम से अपडेट करें।" },
      { myth: "चुनाव का दिन सार्वजनिक अवकाश होता है — मुझे सवैतनिक अवकाश मिलना चाहिए।", fact: "RPA 1951 की धारा 135B के तहत, प्रत्येक पंजीकृत मतदाता मतदान के दिन सवैतनिक अवकाश का हकदार है।" },
      { myth: "पुलिस कभी भी मतदान केंद्र में प्रवेश कर सकती है।", fact: "पुलिस केवल पीठासीन अधिकारी की अनुमति से ही मतदान केंद्र में प्रवेश कर सकती है।" },
      { myth: "उम्मीदवार प्रचार के दौरान कुछ भी वादा कर सकते हैं।", fact: "मुफ़्त उपहार न्यायिक जांच के दायरे में हैं। MCC झूठे बयानों और धार्मिक आधार पर अपील पर रोक लगाती है।" },
      { myth: "मुझे वोट देने के लिए सख्ती से अपना वोटर आईडी कार्ड दिखाना होगा।", fact: "आधार, पासपोर्ट, पैन, ड्राइविंग लाइसेंस, मनरेगा कार्ड आदि सहित 12 वैकल्पिक दस्तावेज स्वीकार किए जाते हैं।" },
      { myth: "अगर मेरे नाम की स्पेलिंग थोड़ी गलत है तो मुझे वोट देने की अनुमति नहीं दी जाएगी।", fact: "नाम/पते में मामूली विसंगतियां आपको अयोग्य नहीं ठहरातीं यदि अन्य विवरण आपकी पहचान से मेल खाते हैं।" },
      { myth: "महिला मतदाताओं को अपने बच्चों को अंदर लाने की अनुमति नहीं है।", fact: "एक निश्चित उम्र से कम के बच्चे माताओं के साथ बूथ के अंदर जा सकते हैं (नियम राज्य के अनुसार भिन्न होते हैं)।" },
      { myth: "मैं किसे वोट दिया इसके प्रमाण के रूप में अपने बैलेट का फोटो ले सकता हूँ।", fact: "मतदान केंद्र के अंदर फोटोग्राफी सख्त वर्जित है और यह एक आपराधिक अपराध है।" }
    ]
  };

  const myths = mythsData[language];

  const handleNext = () => {
    if (flipped) {
      setFlipped(false);
      setTimeout(() => setIndex((index + 1) % myths.length), 300);
    } else {
      setIndex((index + 1) % myths.length);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Did you know?\nMyth: ${myths[index].myth}\nFact: ${myths[index].fact}\n\nVia VoteSmartIndia 🗳️`;
    if (navigator.share) {
      navigator.share({ title: 'VoteSmartIndia Myth Buster', text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      // alert ignored in clean UI, maybe short visual feedback is better, but keeping it simple for now
    }
  };

  return (
    <div className="pb-24 px-5 pt-6 max-w-md mx-auto min-h-[calc(100vh-130px)] flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-primary">{t('myth_title')}</h2>

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-full aspect-[3/4] perspective-1000 max-h-[60vh]">
          <motion.div
            className="w-full h-full cursor-pointer relative preserve-3d"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front Card (Myth) */}
            <div className="absolute inset-0 backface-hidden w-full h-full bg-surface border-2 border-accent/20 rounded-[32px] shadow-lg p-8 flex flex-col justify-center items-center text-center space-y-6">
              <span className="bg-red-100 text-red-600 font-bold px-4 py-1 rounded-full uppercase tracking-wider text-sm shadow-sm ring-4 ring-red-50">
                {language === 'en' ? 'Myth' : 'झूठ'}
              </span>
              <p className="text-2xl font-bold text-gray-800 leading-snug">"{myths[index].myth}"</p>
              <div className="absolute bottom-8 text-gray-400 text-sm font-medium animate-pulse">
                {language === 'en' ? 'Tap to reveal fact' : 'सच देखने के लिए टैप करें'}
              </div>
            </div>

            {/* Back Card (Fact) */}
            <div className="absolute inset-0 backface-hidden w-full h-full bg-secondary border-2 border-secondary rounded-[32px] shadow-lg p-8 flex flex-col justify-center items-center text-center space-y-6 rotate-y-180 text-white">
              <span className="bg-white/20 text-white font-bold px-4 py-1 rounded-full uppercase tracking-wider text-sm shadow-sm ring-4 ring-white/10">
                 {language === 'en' ? 'Fact' : 'सच'}
              </span>
              <p className="text-2xl font-bold leading-snug">{myths[index].fact}</p>
              
              <button 
                onClick={handleShare}
                className="absolute bottom-8 bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full font-semibold flex items-center shadow-sm backdrop-blur-sm"
              >
                <Share2 size={16} className="mr-2" /> {t('share')}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center space-x-6">
          <p className="text-gray-400 font-semibold">{index + 1} / {myths.length}</p>
          <button 
            onClick={handleNext}
            className="bg-primary text-white w-14 h-14 flex justify-center items-center rounded-full shadow-lg active:scale-90 transition-transform ring-4 ring-primary/20"
          >
            <RefreshCw size={24} className={flipped ? "" : "-scale-x-100"} />
          </button>
        </div>
      </div>
    </div>
  );
}
