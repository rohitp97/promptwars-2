# VoteSmartIndia 🗳️
### Samjho. Jaano. Vote Karo.
*Built for PromptWars Virtual — Challenge 2: Election Process Education*
*Built using Google Antigravity | Hack2Skill x Google*

---

## 🎯 Chosen Vertical

**Civic Technology — Voter Education for India**

India has 970 million registered voters, yet election literacy remains 
critically low. This app addresses the information asymmetry that allows 
politicians to manipulate voters through cash gifts, false narratives 
about vote secrecy, and misinformation about EVM integrity. 

VoteSmartIndia is a mobile-first Progressive Web App (PWA) that educates 
Indian citizens about the election process, their voting rights, and how 
to participate in democracy without fear or manipulation — in both English 
and Hindi.

---

## 🧠 Approach & Logic

The core insight driving this product:

> "Information asymmetry is the oldest political tool in the book. 
> The fix isn't complicated — it's just access."

Most existing voter education resources in India are either:
- Buried in ECI PDFs written in bureaucratic language
- Unavailable in regional languages
- Not interactive or engaging enough for first-time voters

VoteSmartIndia solves this through three design principles:

**1. Journey-based learning over static FAQs**
Instead of dumping information, the app walks users through the 
election process as a personal journey — from checking voter 
registration to knowing their rights inside the polling booth.

**2. Myth-busting as the primary trust lever**
The most dangerous voter misinformation (vote traceability, EVM 
hacking, bribery obligations) is addressed directly and proactively, 
not buried in an FAQ.

**3. Conversational AI over forms and documents**
Kavya, the AI election guide powered by Gemini, allows users to ask 
questions in plain Hindi or English and get accurate, non-partisan 
answers instantly — with contextual follow-up suggestions so even 
first-time users know what to ask.

---

## ⚙️ How the Solution Works

VoteSmartIndia is a single-page React PWA with 6 core modules:

### 1. 📋 Election Process Guide
An 8-step interactive vertical timeline walking users through the 
complete Indian election cycle:
- Election Announcement & Model Code of Conduct
- Voter Roll Verification (with ECI deeplink)
- Nomination Filing
- Campaigning Period rules
- Silent Period (48 hours before polling)
- Polling Day — what to carry, EVM & VVPAT explained
- Counting & Results
- Post-election complaint mechanisms

Each step is expandable with detailed information and color-coded 
by phase (pre-poll, polling day, post-poll).

### 2. ✅ Am I Ready to Vote? (Eligibility Wizard)
A 5-question interactive flow that determines voter readiness and 
provides personalized next steps — including direct links to 
register on voters.eci.gov.in and a summary of alternative valid 
ID documents accepted at the booth.

### 3. 🃏 Myth Buster
12 swipeable flashcards addressing the most dangerous voter 
misconceptions in India:
- Vote secrecy (Section 128, RPA 1951)
- Cash-for-votes obligation myth (Section 171B IPC)
- EVM hacking myths
- NOTA legitimacy
- Paid leave entitlement on polling day (Section 135B, RPA 1951)
Each card is shareable via WhatsApp.

### 4. 🏆 Voter IQ Quiz
A 10-question gamified quiz testing election knowledge. 
Scoring system with three badge tiers:
- 🌱 Naya Voter (0–40)
- 📚 Samajhdar Voter (41–70)
- 🏆 VoteSmart Champion (71–100)
Shareable result card with score and badge for WhatsApp/LinkedIn.
Best score persisted in localStorage.

### 5. 🤝 Voter Pledge Wall
A community commitment board where users take a personal pledge 
to vote without being influenced by cash, gifts, caste, or religion.
Features:
- Live pledge counter (persisted in localStorage)
- Real-time name preview in the pledge statement
- Shareable pledge card
- Community wall showing recent pledges from across India
- Pre-seeded with 12 diverse pledges for social proof

### 6. 💬 Chat with Kavya (AI Election Guide)
A conversational AI assistant powered by the Gemini API 
(gemini-1.5-flash model) with:
- Non-partisan, factual responses about Indian election law
- Hinglish responses when user writes in Hindi
- Contextual follow-up suggestion chips after every response
- Starter question chips for first-time users
- Animated typing indicator
- Deep knowledge of RPA 1951, MCC, ECI procedures, cVIGIL, VVPAT

---

## 🌐 PWA Features

- Installable on Android home screen (no app store required)
- Offline caching of static assets via service worker
- Mobile-first responsive design (optimized for 375px viewport)
- Works on low-end Android browsers with no performance degradation

---

## 🌍 Hindi Support

All static UI text is available in Hindi via a toggle in the header.
Kavya auto-detects Hindi/Hinglish input and responds accordingly.
Election terminology remains in English as it is standardized.

---

## 📌 Assumptions Made

1. **Target device**: Low-to-mid range Android smartphone with Chrome 
   browser. All design decisions (system fonts, minimal animations, 
   PWA over native app) are optimized for this user.

2. **No backend**: All user data (pledges, quiz scores, language 
   preference, state selection) is persisted in localStorage. 
   This is intentional for a hackathon demo — a production version 
   would use a backend database for the Pledge Wall.

3. **Pledge counter**: The pledge counter starts at 4,271 to simulate 
   social proof on first load. In production this would be a real 
   database count.

4. **Election data**: The app does not pull live election schedule data 
   from the ECI API (which is not publicly available). State-specific 
   election timelines are approximated. A production version would 
   integrate official ECI data feeds.

5. **Gemini API key**: The Gemini API key is stored in a .env file 
   (VITE_GEMINI_API_KEY). For the live demo, a restricted browser 
   key is used. The .env file is excluded from the public repository.

6. **Language scope**: Full Hindi translation is provided for all 
   static UI. Quiz questions remain in English as election law 
   terminology is standardized in English across India.

7. **Kavya's knowledge**: Kavya is grounded by a detailed system prompt 
   covering RPA 1951, ECI procedures, MCC rules, and anti-bribery law. 
   She does not have access to real-time election news or live ECI data.

---

## 🚀 Setup & Running Locally

1. Clone the repository
2. Install dependencies:
   npm install

3. Create a .env file in the project root:
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   Get your free Gemini API key at: https://aistudio.google.com

4. Start the development server:
   npm run dev

5. Open http://localhost:5173 in your browser

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API (gemini-1.5-flash)
- **Markdown**: react-markdown
- **Confetti**: canvas-confetti
- **Storage**: localStorage (client-side persistence)
- **Deployment**: PWA-ready (manifest.json + service worker)

---

## 📣 Built For

PromptWars Virtual — Challenge 2: Election Process Education
Organized by Hack2Skill x Google
Built entirely using Google Antigravity (intent-driven development)

---

## ⚖️ Disclaimer

VoteSmartIndia is a non-partisan civic education tool. It is not 
affiliated with any political party, candidate, or the Election 
Commission of India. All information is based on publicly available 
ECI guidelines and the Representation of the People Act, 1951.

Report election violations: Call 1950 | Download the cVIGIL app

---

*Made with 🇮🇳 for Indian voters*
