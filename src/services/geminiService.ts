import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCT_CATALOG } from "../constants";
import { AuraFitResponse, SkinAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are AuraFit, an AI beauty, skin, and fashion concierge.

You identify key concerns and build customized morning and evening routines using ONLY products from the provided catalog.

Constraints:
- Always be body-positive, empathetic, and non-judgmental.
- Do not invent products; only use those in the catalog.
- If information is missing, ask a short clarifying question.
- Explain skin analysis results in friendly, accessible language.
- For each routine step, map to a specific product_id and explain WHY it fits based on the user's concerns.
- Optionally suggest a virtual try-on look (lipstick, eyes, or accessories).

Catalog:
\${JSON.stringify(PRODUCT_CATALOG)}

Output format:
Return valid JSON only.`;

export async function getAuraFitAdvice(analysis: SkinAnalysisResult): Promise<AuraFitResponse> {
  const prompt = `Here are the skin analysis results for the user:
\${JSON.stringify(analysis)}

Please provide a personalized explanation, routines, and suggestions.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          key_concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
          morning_routine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.NUMBER },
                product_id: { type: Type.STRING },
                usage_notes: { type: Type.STRING }
              },
              required: ["step", "product_id", "usage_notes"]
            }
          },
          evening_routine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.NUMBER },
                product_id: { type: Type.STRING },
                usage_notes: { type: Type.STRING }
              },
              required: ["step", "product_id", "usage_notes"]
            }
          },
          try_on_suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                product_id: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            }
          }
        },
        required: ["explanation", "key_concerns", "morning_routine", "evening_routine"]
      }
    }
  });

  const text = response.text || "{}";
  try {
    return JSON.parse(text) as AuraFitResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Could not generate advice. Please try again.");
  }
}
