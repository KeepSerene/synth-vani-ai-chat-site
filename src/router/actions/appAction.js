// Custom library imports
import { account, databases } from "../../lib/appwrite";

// Custom API function imports
import { getConversationTitle, getGeminiResponse } from "../../api/geminiAPI";

// Library import
import { ID } from "appwrite";

/**
 * Processes the user prompt by creating a conversation entry and storing both the user’s prompt
 * and the AI-generated response in the Appwrite database.
 *
 * @async
 * @function userPromptAction
 * @param {FormData} formData - The form data containing the user's input prompt.
 * @returns {Promise<void>} - Resolves after storing the conversation and chat data.
 */
async function userPromptAction(formData) {
  // Extract and sanitize user input
  const userPrompt = await formData.get("user_prompt").trim();

  // Retrieve the logged-in user's details
  const user = await account.get();

  // Generate a conversation title using AI
  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation;

  // ====== Step 1: Create a new conversation entry in the database ======
  try {
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID,
      ID.unique(),
      {
        title: conversationTitle,
        user_id: user.$id,
      }
    );
  } catch (err) {
    console.error(`Error: Failed to create conversation - ${err.message}`);

    return;
  }

  // Generate a response from the Gemini AI model
  const geminiResponse = await getGeminiResponse(userPrompt);

  // ====== Step 2: Store the user prompt and AI response as a chat entry ======
  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
      ID.unique(),
      {
        user_prompt: userPrompt,
        gemini_response: geminiResponse,
        conversation: conversation.$id, // Link chat to its conversation
      }
    );
  } catch (err) {
    console.error(`Error: Failed to store chat message - ${err.message}`);
  }

  return null;
}

/**
 * Handles incoming requests and delegates actions based on the `request_type` parameter.
 *
 * @async
 * @function appAction
 * @param {Object} request - The incoming request object containing form data.
 * @returns {Promise<null>} - Resolves after executing the appropriate action.
 */
export default async function appAction({ request }) {
  const formData = await request.formData();
  const requestType = formData.get("request_type");

  if (requestType === "user_prompt") {
    return userPromptAction(formData);
  }

  return null;
}
