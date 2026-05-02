import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

const SYSTEM_PROMPT = `
You are Kavya, a friendly, knowledgeable, and non-partisan Indian election 
literacy guide. Your only goal is to educate Indian citizens about the 
election process, voter rights, ECI rules, Model Code of Conduct, and how 
to participate in democracy. You speak in simple, warm, conversational 
Hindi-English (Hinglish) when detected, or clean English otherwise.

You NEVER express political opinions, endorse any party or candidate, or 
comment on electoral outcomes. You NEVER help with political campaigning.

You are deeply knowledgeable about:
- The Representation of the People Act, 1951
- Election Commission of India (ECI) procedures
- Model Code of Conduct rules
- Electronic Voting Machines (EVMs) and VVPAT
- Voter registration (Form 6, 6A, 8, 8A)
- NOTA, proxy voting, postal ballots
- Anti-voter bribery laws (Section 171B IPC)
- cVIGIL app and 1950 helpline for complaints
- Polling booth rights and procedures
- Alternative valid ID documents for voting

When users describe manipulation attempts (cash offers, threats, 
caste/religion pressure), always: (1) validate their concern, (2) explain 
the legal protection they have, (3) share the cVIGIL complaint mechanism.

Keep responses under 120 words unless the question requires more detail. 
Always end with a follow-up prompt suggestion like: "Aur kuch poochna 
hai? (Want to ask something else?)" or "Should I explain what happens 
inside the polling booth?"

After every response, on a completely new line, add exactly this 
format and nothing else after it:

SUGGESTIONS: [suggestion 1] | [suggestion 2] | [suggestion 3]

Each suggestion must be a short question (under 8 words) that 
naturally follows from your answer. Write suggestions in the same 
language as your response (Hindi/Hinglish if user asked in Hindi, 
English if user asked in English). Never number the suggestions. 
Never skip this line. Always provide exactly 3 suggestions.
`;

interface Message {
  role: 'user' | 'model';
  content: string;
  suggestions?: string[];
}

export default function ChatView() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem('kavya_chat_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
      { role: 'model', content: "Namaste! I am Kavya, your election literacy guide. How can I help you understand your voting rights today?" }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem('kavya_chat_v2', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const getStarterChips = () => [
    t('chat_starter_1'),
    t('chat_starter_2'),
    t('chat_starter_3'),
    t('chat_starter_4'),
    t('chat_starter_5'),
    t('chat_starter_6')
  ];

  const getFallbackSuggestions = () => [
    t('chat_fallback_1'),
    t('chat_fallback_2'),
    t('chat_fallback_3')
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash', 
        systemInstruction: SYSTEM_PROMPT + `\n\nCRITICAL: The user has currently selected the language '${language}'. You MUST reply in this language.` 
      });
      
      const history = newMessages.slice(1, -1).map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const chat = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 800, temperature: 0.4 }
      });

      const result = await chat.sendMessage(text);
      const rawResponse = result.response.text();
      
      const parts = rawResponse.split('SUGGESTIONS:');
      const messageText = parts[0].trim();
      const suggestionsRaw = parts[1]?.trim() || '';
      
      let suggestions = suggestionsRaw
        .split('|')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .slice(0, 3);
        
      if (suggestions.length === 0) {
          suggestions = getFallbackSuggestions();
      }

      setMessages([...newMessages, { role: 'model', content: messageText, suggestions }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', content: "I'm having trouble connecting to my knowledge base right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto h-[calc(100vh-130px)] max-h-screen pt-4 relative pb-4">
      <div className="px-5 mb-2">
         <h2 className="text-2xl font-bold text-primary">{t('chat_title')}</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-24">
        {messages.map((m, i) => (
          <div key={i} className={clsx("flex flex-col max-w-[90%]", m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
            <div className={clsx("flex items-start", m.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={clsx(
                  "w-8 h-8 rounded-full flex justify-center items-center shrink-0 mt-1 shadow-sm ring-2 ring-white",
                  m.role === 'user' ? "bg-accent text-white ml-3" : "bg-primary text-white mr-3"
              )}>
                {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={clsx(
                "p-3.5 rounded-2xl text-[15px] shadow-sm leading-relaxed max-w-[85%]",
                m.role === 'user' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
              )}>
                {m.role === 'model' ? (
                  <ReactMarkdown
                    components={{
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                      ol: ({children}) => <ol className="list-decimal ml-4 space-y-1 my-1">{children}</ol>,
                      ul: ({children}) => <ul className="list-disc ml-4 space-y-1 my-1">{children}</ul>,
                      li: ({children}) => <li className="leading-relaxed">{children}</li>,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
            
            {m.role === 'model' && m.suggestions && m.suggestions.length > 0 && i === messages.length - 1 && !isLoading && (
              <div className="ml-11 mt-2 flex flex-wrap gap-2 animate-in fade-in duration-300">
                {m.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="bg-white border-[1.5px] border-[#FF6B35] rounded-full px-3.5 py-2 text-[13px] text-[#FF6B35] font-medium max-w-[220px] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:scale-[1.03] active:scale-95 shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {messages.length === 1 && !isLoading && (
          <div className="ml-11 mt-4 animate-in fade-in duration-500">
            <p className="text-[13px] text-gray-500 mb-2 font-medium">{t('chat_ask_anything')}</p>
            <div className="flex flex-wrap gap-2">
              {getStarterChips().map((chip, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(chip)}
                  className="bg-white border-[1.5px] border-[#FF6B35] rounded-full px-3.5 py-2 text-[13px] text-[#FF6B35] font-medium max-w-[220px] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer transition-all duration-200 hover:bg-[#FF6B35] hover:text-white hover:scale-[1.03] active:scale-95 shadow-sm text-left"
                >
                    {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-start max-w-[85%] animate-in fade-in zoom-in duration-200">
            <div className="w-8 h-8 rounded-full flex justify-center items-center shrink-0 mt-1 shadow-sm ring-2 ring-white bg-primary text-white mr-3">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-1.5 h-11">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 bg-surface border-t border-gray-200 px-4 py-3 flex items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-40 max-w-md mx-auto">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend(input)}
          placeholder={t('chat_placeholder')}
          className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/40 mr-2"
        />
        <button 
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isLoading}
          className="bg-primary text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md active:scale-90 disabled:opacity-50 transition-transform flex-shrink-0"
        >
          <Send size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
