import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) throw new Error("API Key missing");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash', 
});

async function run() {
  try {
    const chat = model.startChat({
      history: [],
      generationConfig: { maxOutputTokens: 300, temperature: 0.4 }
    });

    const result = await chat.sendMessage("What is Form 6A?");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

run();
