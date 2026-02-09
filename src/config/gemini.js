import { GoogleGenAI } from "@google/genai";

const apiKey = YOUR_API_KEY;

const genAI = new GoogleGenAI({ apiKey });

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
};
// gemini-1.5-pro-latest
async function run(prompt) {
  try {
    const result = await genAI.models.generateContent({
      model: "models/gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    if (
      result &&
      result.candidates &&
      result.candidates[0] &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts[0]
    ) {
      const text = result.candidates[0].content.parts[0].text;
      return text;
    } else {
      console.error(
        "Unexpected response structure:",
        JSON.stringify(result, null, 2)
      );
      throw new Error("Could not find generated text in the API response.");
    }
  } catch (error) {
    console.error("Error during content generation:", error);
    return "Unable to generate content. Please check the console for details.";
  }
}

export default run;
