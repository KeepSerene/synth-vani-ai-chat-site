// Custom library import
import { databases } from "../../lib/appwrite";

// Custom API function import
import { getGeminiResponse } from "../../api/geminiAPI";

// Library import
import { ID } from "appwrite";

/**
 * Processes a user prompt within an existing conversation.
 *
 * This function:
 * 1. Retrieves the current chat history for the given conversation.
 * 2. Calls the Gemini AI API to generate a response based on the chat history.
 * 3. Stores both the user prompt and the AI-generated response in the database.
 *
 * @async
 * @function conversationAction
 * @param {Object} context - Context object containing the request and route parameters.
 * @param {Request} context.request - The HTTP request object containing form data.
 * @param {Object} context.params - Route parameters from the request.
 * @param {string} context.params.conversationId - Unique identifier for the conversation.
 *
 * @returns {null | Response} Returns null if successful, or an error response in case of failure.
 */
export default async function conversationAction({ request, params }) {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get("user_prompt").trim();
  let chatHistory = [];
  let geminiResponse = "";

  // Fetch existing chat messages from the conversation document
  try {
    const { chats } = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID,
      conversationId
    );

    // Extract user prompts and AI responses to maintain chat context
    chatHistory = chats.map(({ user_prompt, gemini_response }) => {
      return { user_prompt, gemini_response };
    });
  } catch (err) {
    console.error(`Error: Could not retrieve chat history: ${err.message}`);

    return { errorMsg: "Failed to load chat history!" };
  }

  // Generate an AI response based on the latest user input and conversation context
  try {
    geminiResponse = await getGeminiResponse(userPrompt, chatHistory);
  } catch (err) {
    console.error(
      `Error: Gemini AI response generation failed: ${err.message}`
    );

    return { errorMsg: "AI service error!" };
  }

  // Save the new chat message (user input and AI response) to the database
  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
      ID.unique(),
      {
        // Each chat document structure in the database:
        user_prompt: userPrompt,
        gemini_response: geminiResponse,
        conversation: conversationId,
      }
    );
  } catch (err) {
    console.error(`Error: Could not store chat message: ${err.message}`);

    return { errorMsg: "Failed to save chat message!" };
  }

  return null;
}
