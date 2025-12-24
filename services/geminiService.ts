
import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

export const translateWithGemini = async (text: string): Promise<TranslationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `Translate the following Portuguese Christmas term or phrase to Simplified Chinese: "${text}".
  Provide the translation, the pinyin, and a brief cultural context or fun fact about how this concept is viewed in China or its linguistic structure.
  Be festive and helpful.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          translatedText: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          culturalContext: { type: Type.STRING },
        },
        required: ["translatedText", "pinyin", "culturalContext"],
      },
    },
  });

  return JSON.parse(response.text);
};
