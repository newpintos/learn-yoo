
import { GoogleGenAI } from '@google/genai';

// IMPORTANT: This key is exposed on the client-side for demonstration purposes only.
// In a real application, API calls should be made from a secure backend server
// where the API key can be stored safely.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateLessonDescription = async (lessonTitle: string): Promise<string> => {
  if (!API_KEY) {
    return "AI description generation is disabled. Please configure the API Key.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a concise, engaging, one-paragraph lesson description for a lesson titled "${lessonTitle}" in a UI/UX design course.`,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating lesson description:', error);
    return 'Failed to generate AI description.';
  }
};
