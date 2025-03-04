import model from "../lib/googleGenAI";

/**
 * Generates a concise and relevant conversation title based on the provided user prompt.
 *
 * This function leverages Google Generative AI to create a short, descriptive title
 * that accurately reflects the topic and intent of the given user prompt.
 * The AI model analyzes the prompt and generates a single-line response as plain text.
 *
 * @async
 * @function getConversationTitle
 * @param {string} userPrompt - The user's input message that serves as the basis for title generation.
 * @returns {Promise<string>} A promise that resolves to a generated conversation title in plain text.
 *                            If an error occurs, it returns the default title: "New conversation".
 */
async function getConversationTitle(userPrompt) {
  try {
    const result = await model.generateContent(
      `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
            
      Prompt: ${userPrompt}`
    );

    return result.response.text();
  } catch (err) {
    console.error(`Failed to retrieve the conversation title: ${err.message}`);

    return "New conversation";
  }
}

/**
 * Generates a response from the Gemini 2.0 Flash model based on the user prompt and chat history.
 *
 * This function initiates a chat session with the Gemini model, providing the conversation history
 * for context. It then sends the user’s prompt and retrieves a generated response.
 *
 * @async
 * @function getGeminiResponse
 * @param {string} userPrompt - The user input prompt.
 * @param {Array<{user_prompt: string, ai_response: string}>} [chatHistory=[]] - An array of previous user prompts and AI responses, used to maintain context in the conversation.
 * @returns {Promise<string>} A promise that resolves to the AI-generated response or a fallback error message if the request fails.
 */
async function getGeminiResponse(userPrompt, chatHistory = []) {
  try {
    model.generationConfig = { temperature: 1.5 };
    const chatSession = model.startChat({ history: chatHistory });
    const result = await chatSession.sendMessage(userPrompt);

    return result.response.text();
  } catch (err) {
    console.error(`Failed to retrieve Gemini response: ${err.message}`);

    return "Sorry, I couldn't process your request at the moment! Please try again later.";
  }
}

export { getConversationTitle, getGeminiResponse };
