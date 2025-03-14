// Custom library imports
import { account, databases } from "../../lib/appwrite";

// Custom API function imports
import { getConversationTitle, getGeminiResponse } from "../../api/geminiAPI";

// Library imports
import { ID } from "appwrite";
import { redirect } from "react-router-dom";

/**
 * Processes the user prompt by creating a conversation entry, storing both the user's prompt
 * and the AI-generated response in the Appwrite database, and then redirecting to the conversation page.
 *
 * Steps:
 * 1. Retrieves the logged-in user's details.
 * 2. Generates a conversation title based on the user's prompt.
 * 3. Creates a new conversation entry in the Appwrite database.
 * 4. Fetches a response from the Gemini AI model based on the user's prompt.
 * 5. Stores the user prompt and AI response in the database as a chat entry.
 * 6. Redirects the user to the conversation page after successful creation.
 *
 * @async
 * @function userPromptAction
 * @param {FormData} formData - The form data containing the user's input prompt.
 * @returns {Promise<Response|void>} Resolves after storing the conversation and chat data,
 *                                     and redirects the user to the conversation page.
 */
async function userPromptAction(formData) {
  const userPrompt = await formData.get("user_prompt").trim();

  // Retrieve the logged-in user's details
  let user;

  try {
    user = await account.get();
  } catch (err) {
    console.error(`Error: Failed to retrieve user details - ${err.message}`);

    return;
  }

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

    return;
  }

  return redirect(`/${conversation.$id}`);
}

/**
 * Deletes a conversation document from the database based on the provided form data.
 *
 * If successful, the user is redirected to the root route (`/`) with a success message passed
 * via URL search parameters. If an error occurs, the function returns an error message
 * instead of redirecting.
 *
 * @async
 * @function deleteConversationAction
 * @param {FormData} formData - The form data containing the conversation ID and title.
 * @returns {Promise<Object|Response>} Redirects on success, or returns an error object if deletion fails.
 *
 * @throws {Error} If the deletion process encounters an issue, an error message is returned.
 */
async function deleteConversationAction(formData) {
  const conversationId = formData.get("conversation_id");
  const conversationTitle = formData.get("conversation_title");

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID,
      conversationId
    );

    // Redirect to the root route while passing success message as a query parameter
    return redirect(
      `/?success=${encodeURIComponent(
        `The conversation "${conversationTitle}" has been successfully deleted.`
      )}`
    );
  } catch (err) {
    console.error(
      `Error: Unable to delete conversation "${conversationTitle}": ${err.message}`
    );

    return {
      errorMsg: `Failed to delete the conversation "${conversationTitle}": ${err.message}`,
    };
  }
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
    return await userPromptAction(formData);
  }

  if (requestType === "delete_conversation") {
    return await deleteConversationAction(formData);
  }

  return null;
}
