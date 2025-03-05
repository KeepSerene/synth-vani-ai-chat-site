// Custom library imports
import { account, databases } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

/**
 * Loads user and conversation data for a specific conversation.
 *
 * This loader function performs two primary tasks:
 * 1. Authenticates the current user by retrieving their account details
 * 2. Fetches the specific conversation document based on the provided conversation ID
 *
 * @async
 * @function conversationLoader
 * @param {Object} context - The loader context object
 * @param {Object} context.params - Route parameters containing the conversation ID
 * @param {string} context.params.conversationId - Unique identifier for the conversation
 *
 * @returns {Promise<Object>} An object containing:
 * - `user`: Details of the authenticated user
 * - `conversation`: The specific conversation document
 *
 * @throws {Error} Throws an error if:
 * - User authentication fails (redirects to login page)
 * - Conversation document cannot be retrieved
 *
 * @example
 * // Example usage in React Router configuration
 * {
 *   path: "/:conversationId",
 *   element: <Conversation />,
 *   loader: conversationLoader
 * }
 */
export default async function conversationLoader({ params }) {
  const { conversationId } = params;
  const data = {};

  try {
    data.user = await account.get();
  } catch (err) {
    console.error(`Error: Failed to retrieve user details: ${err.message}`);

    return redirect("/login");
  }

  try {
    data.conversation = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID,
      conversationId
    );
  } catch (err) {
    console.error(`Error: Failed to load conversation: ${err.message}`);

    // Rethrow the error so it can be handled by an ErrorBoundary or a suitable component
    throw err;
  }

  return data;
}
