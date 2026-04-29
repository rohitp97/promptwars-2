import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDF1rYbOTIdEVj2gYmvKidiUUg_NpUV-4g');

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
    const chat = model.startChat({
        history: [{role: "user", parts: [{text: "hi"}]}, {role: "model", parts: [{text: "hello there"}]}]
    })

    const result = await chat.sendMessage("how are you?");
    console.log("SUCCESS:", result.response.text());
  } catch(e) {
    console.error("FAILED:", e.message);
  }
}
run();
