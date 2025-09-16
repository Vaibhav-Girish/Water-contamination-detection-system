
import { GoogleGenAI } from "@google/genai";
import { SensorReading, Zone } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateAiInsights = async (zone: Zone, history: SensorReading[]): Promise<string> => {
  if (!API_KEY) {
    return "AI insights are unavailable. Please configure your Gemini API key.";
  }

  const latestReadings = history.slice(-10); // Use last 10 readings for context

  const prompt = `
    You are an AI water quality analyst for a public safety system. Your role is to provide clear, concise, and actionable insights based on sensor data.
    
    **Analysis Request**
    - **Location:** ${zone.name} (${zone.id})
    - **Current Status:** ${zone.status}
    - **Detected Issues:** ${zone.issues.length > 0 ? zone.issues.join(', ') : 'None'}

    **Recent Sensor Data (last 10 readings, most recent first):**
    ${latestReadings.reverse().map(r => 
      `- pH: ${r.ph.toFixed(2)}, Turbidity: ${r.turbidity.toFixed(2)} NTU, Lead: ${r.lead.toFixed(4)} ppm, E. Coli: ${r.eColi} CFU/100mL`
    ).join('\n')}

    **Your Task:**
    Based on the data provided, generate a brief report with the following sections:
    1.  **Summary:** A one-sentence overview of the current water quality in ${zone.name}.
    2.  **Trend Prediction:** Analyze the trend of the problematic readings. Is the situation worsening, improving, or stable? Predict potential developments in the next 6-12 hours.
    3.  **Recommended Action:** Suggest one immediate, high-priority action for the authorities. Be specific (e.g., "Dispatch a team to investigate industrial runoff," "Issue a public 'boil water' advisory," "No immediate action required, continue monitoring.").

    Keep your entire response under 100 words. Format it clearly.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return "An error occurred while communicating with the AI. Please check the console for details.";
  }
};
