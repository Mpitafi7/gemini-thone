/**
 * Gemini API Service
 * Handles all interactions with Google Gemini AI
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";

/**
 * Get selected model from localStorage or use default
 */
export function getGeminiModel(): string {
  const savedModel = localStorage.getItem("gemini_model");
  return savedModel || "gemini-pro"; // Default model
}

/**
 * Available Gemini models
 */
export const AVAILABLE_MODELS = [
  {
    value: "gemini-pro",
    label: "Gemini Pro",
    description: "Standard model for general tasks",
  },
  {
    value: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    description: "Fast and efficient model",
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    description: "Advanced reasoning model (if available)",
  },
];

export interface GeminiMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

/**
 * Get API key from environment or localStorage
 */
function getApiKey(): string | null {
  // First check environment variable
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey) return envKey;
  
  // Then check localStorage (from Settings page)
  const storedKey = localStorage.getItem("gemini_api_key");
  if (storedKey) return storedKey;
  
  return null;
}

/**
 * Analyze YouTube video using Gemini
 */
export async function analyzeYouTubeVideo(videoId: string): Promise<{
  transcript?: string;
  summary?: string;
  concepts?: Array<{ time: number; concept: string }>;
  error?: string;
}> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: "API key not found. Please add your Gemini API key in Settings." };
  }

  try {
    // Get video transcript using YouTube transcript API (via proxy or direct)
    // For now, we'll use Gemini to analyze the video URL
    const prompt = `Analyze this YouTube video (ID: ${videoId}). Provide:
1. A detailed summary of the video content
2. Key concepts discussed with approximate timestamps
3. Main topics covered

Video URL: https://www.youtube.com/watch?v=${videoId}

Format your response as JSON with: summary, concepts (array of {time: number, concept: string}).`;

    const model = getGeminiModel();
    const response = await fetch(
      `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { error: `API Error: ${error}` };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Try to parse JSON from response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // If not JSON, return as summary
      return { summary: text };
    }

    return { summary: text };
  } catch (error: any) {
    return { error: error.message || "Failed to analyze video" };
  }
}

/**
 * Get chat response from Gemini about video content
 */
export async function getChatResponse(
  message: string,
  videoContext?: {
    videoId?: string;
    videoType?: string;
    transcript?: string;
    summary?: string;
  }
): Promise<{
  response?: string;
  error?: string;
}> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: "API key not found. Please add your Gemini API key in Settings." };
  }

  try {
    // Build context-aware prompt
    let systemPrompt = "You are AuraMind, an AI tutor that helps students learn from educational videos. ";
    
    if (videoContext?.videoId) {
      systemPrompt += `The user is asking about a ${videoContext.videoType || "video"} (ID: ${videoContext.videoId}). `;
    }
    
    if (videoContext?.summary) {
      systemPrompt += `Video summary: ${videoContext.summary}\n\n`;
    }
    
    systemPrompt += `Answer the user's question based on the video content. Be helpful, clear, and provide specific details when possible.`;

    const model = getGeminiModel();
    const response = await fetch(
      `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }],
            },
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { error: `API Error: ${error}` };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    return { response: text };
  } catch (error: any) {
    return { error: error.message || "Failed to get response" };
  }
}

/**
 * Generate a visual diagram description for a concept
 */
export async function generateDiagram(
  concept: string,
  videoContext?: string
): Promise<{
  description?: string;
  diagramPrompt?: string;
  error?: string;
}> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: "API key not found. Please add your Gemini API key in Settings." };
  }

  try {
    const prompt = `Generate a detailed visual diagram description for this concept: "${concept}"

${videoContext ? `Context from video: ${videoContext}` : ""}

Provide:
1. A detailed description of what the diagram should show
2. Key elements to include
3. Relationships between elements
4. A prompt that could be used to generate the visual diagram

Format as JSON with: description, elements (array), relationships (array), visualPrompt`;

    const model = getGeminiModel();
    const response = await fetch(
      `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { error: `API Error: ${error}` };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Try to parse JSON
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          description: parsed.description,
          diagramPrompt: parsed.visualPrompt,
        };
      }
    } catch {
      // Return as description if not JSON
      return { description: text, diagramPrompt: text };
    }

    return { description: text };
  } catch (error: any) {
    return { error: error.message || "Failed to generate diagram" };
  }
}
