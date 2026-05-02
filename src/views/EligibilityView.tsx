import { useState, memo, useMemo, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import RightsCard from '../components/RightsCard';
import { CheckCircle, Info, ShieldAlert } from 'lucide-react';

const EligibilityView = memo(() => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [dob, setDob] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [now] = useState(() => Date.now());

  const isAdult = useCallback((dateStr: string) => {
    if (!dateStr) return false;
    const diff = now - new Date(dateStr).getTime();
    const ageDate = new Date(diff); 
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  }, [now]);

  const states = useMemo(() => [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Jammu and Kashmir", "Lakshadweep", "Puducherry", "Ladakh"
  ], []);

  const handleNext = useCallback(() => setStep(prev => prev + 1), []);

  const handleRestart = useCallback(() => {
    setStep(1);
    setAnswers({});
    setDob('');
  }, []);

  const isEligible = useMemo(() => 
    answers.q1 === 'Yes' && 
    isAdult(dob) && 
    answers.q4 === 'Yes' && 
    answers.q5 === 'Yes',
  [answers, dob, isAdult]);

  const needsRegistration = useMemo(() => 
    answers.q1 === 'Yes' && 
    isAdult(dob) && 
    (answers.q4 === 'No' || answers.q4 === 'Not Sure'),
  [answers, dob, isAdult]);

  return (
    <div className="pb-24 px-5 pt-8 max-w-md mx-auto min-h-[calc(100vh-130px)]">
      <h2 className="text-2xl font-bold mb-6 text-primary">{t('ready_title')}</h2>
      
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">{t('ready_q1')}</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {['Yes', 'No'].map(o => (
              <button 
                key={o} 
                onClick={() => { setAnswers(prev => ({...prev, q1: o})); handleNext(); }}
                aria-label={t(o.toLowerCase())}
                className="py-4 px-4 border border-gray-300 rounded-xl text-center active:scale-95 bg-surface font-semibold text-lg hover:border-primary/50 transition-colors"
              >
                {t(o.toLowerCase())}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">{t('ready_q2')}</p>
          <input 
            type="date" 
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            aria-label="Date of Birth"
            className="w-full py-4 px-4 border border-gray-300 rounded-xl mt-4 bg-surface text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button 
            disabled={!dob}
            onClick={handleNext}
            aria-label="Next step"
            className="w-full py-4 mt-6 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 active:scale-95 transition-transform"
          >
            {t('next')}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">{t('ready_q3')}</p>
          <select 
            onChange={(e) => { 
                setAnswers(prev => ({...prev, state: e.target.value})); 
                localStorage.setItem('user_state', e.target.value); 
                handleNext(); 
            }}
            aria-label="Select your state"
            className="w-full py-4 px-4 border border-gray-300 rounded-xl mt-4 bg-surface text-gray-700 text-lg hover:border-primary/50 focus:outline-none"
          >
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">{t('ready_q4')}</p>
          <div className="flex flex-col gap-3 mt-6">
            {['Yes', 'No', 'Not Sure'].map(o => (
              <button 
                key={o} 
                onClick={() => { setAnswers(prev => ({...prev, q4: o})); handleNext(); }}
                aria-label={t(o.toLowerCase().replace(' ', '_'))}
                className="py-4 px-5 border border-gray-300 rounded-xl text-left active:scale-[0.98] bg-surface font-semibold text-lg hover:border-primary/50 transition-colors"
               >
                {t(o.toLowerCase().replace(' ', '_'))}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg leading-snug">{t('ready_q5')}</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {['Yes', 'No'].map(o => (
              <button 
                key={o} 
                onClick={() => { setAnswers(prev => ({...prev, q5: o})); handleNext(); }}
                aria-label={t(o.toLowerCase())}
                className="py-4 px-4 border border-gray-300 rounded-xl text-center active:scale-95 bg-surface font-semibold text-lg hover:border-primary/50"
              >
                {t(o.toLowerCase())}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div 
            className="p-6 rounded-2xl bg-surface border border-gray-200 text-center shadow-lg shadow-black/5 mt-2"
            role="status"
            aria-live="polite"
          >
            {isEligible ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 ring-8 ring-green-50">
                  <CheckCircle size={32} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-green-700">{t('eligibility_ready')}</h3>
              </>
            ) : needsRegistration ? (
              <>
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 ring-8 blue-50">
                  <Info size={32} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-blue-700">{t('eligibility_register')}</h3>
                <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-bold">Go to Portal</a>
              </>
            ) : (
               <>
                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 ring-8 ring-red-50">
                  <ShieldAlert size={32} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-red-600">{t('eligibility_not')}</h3>
              </>
            )}
          </div>
          <RightsCard />
          <button 
            onClick={handleRestart}
            aria-label="Start eligibility check over"
            className="w-full py-4 border-2 border-gray-200 text-gray-500 rounded-xl font-bold mt-2 hover:bg-gray-50 active:scale-95"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
});

export default EligibilityView;
