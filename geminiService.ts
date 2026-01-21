
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GeneratedMessage, ChatMessage } from "../types";

export const generateAbderhamanMessage = async (): Promise<GeneratedMessage> => {
  // We return the exact string requested by the user
  const text = "ABDDDOOOOOOOOOOOO SELYAAAAAANiiiiiiiiiiiiiiiii , AFAAAAAAAAAAAAAAAAAA BOOM 💥 BOOM 💥 BOOM 💥 BOOM 💥 , Entaaaa Ay Entaaaaa OG3ed Saaaaket Saaaaket 🤫🤫🤐🤐 , Gotlik Saaaaaaaket . EL Youma 3idmiladou howa Selyani hetha ta3 wethni, raho bech enchedou walah , rani bech notherbou na3tih etraha hetha 🤕🤕🤕👊👊. Raho Raho AFAA KBIRA BARCHA RAHO . Walahi ye7rezlik elyoum 3idmiledik wala walahi rak Ensaane MAYET ☠️💀⚰️🪦🏴‍☠️.";

  return { 
    id: Math.random().toString(36).substring(7),
    text, 
    sources: [],
    timestamp: new Date()
  };
};

export const chatWithGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
  // Always use direct process.env.API_KEY reference for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are a funny Tunisian assistant helping a friend roast "Abderhaman Selyani" for his birthday. 
        CRITICAL RULES:
        1. Speak ONLY in Tunisian dialect using LATIN CHARACTERS (e.g., "3aslema", "behi", "chfama").
        2. DO NOT use Arabic script/letters (e.g., لا تستخدم العربية).
        3. DO NOT use French (e.g., no "Bonjour", "Merci").
        4. Be funny, use emojis, and keep the energy high like the roast message about "Afaa" and "Boom Boom".
        5. If asked about Abderhaman, mention he loves coffee, sleeping, and coding, but he's a "Mayet" (dead) person today because of the roast.`,
        temperature: 0.9,
      },
    });

    // Directly access .text property from GenerateContentResponse
    return response.text || "Mochkla fel communication, 3awed jarreb sa7bi!";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Système tplanta! Abderhaman dharbetou l'birra mte3 el code.";
  }
};
