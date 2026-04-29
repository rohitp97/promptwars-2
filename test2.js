import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDF1rYbOTIdEVj2gYmvKidiUUg_NpUV-4g');

async function run() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDF1rYbOTIdEVj2gYmvKidiUUg_NpUV-4g`);
    const data = await response.json();
    console.log("Models:", data.models.map(m => m.name));
  } catch(e) {
    console.error("FAILED:", e.message);
  }
}
run();
