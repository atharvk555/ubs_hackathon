const { GoogleGenAI }=require("@google/genai");
require('dotenv').config();
const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}

module.exports={main};