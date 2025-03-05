// Custom library imports
import { account, databases } from "../../lib/appwrite";

// Library imports
import { redirect } from "react-router-dom";
import { Query } from "appwrite";

/**
 * Loads user data and their conversations from the Appwrite database.
 *
 * This function performs the following tasks:
 * 1. Retrieves the currently logged-in user's details.
 * 2. Fetches the user's conversations from the Appwrite database, including only the conversation ID and title.
 * 3. Redirects the user to the login page if authentication fails.
 *
 * @async
 * @function appLoader
 * @returns {Promise<Object>|Response} Returns a Promise resolving to an object containing:
 *   - `{Object} user` - The logged-in user's details.
 *   - `{Array<Object>} conversations` - A list of conversation objects with `$id` and `title`.
 *   If the user is not authenticated, it redirects to the `/login` page.
 */
export default async function appLoader() {
  const data = {};

  try {
    data.user = await account.get();
  } catch (err) {
    console.error(`Error: Failed to retrieve user details - ${err.message}`);

    return redirect("/login");
  }

  try {
    data.conversations = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID,
      [
        Query.select(["$id", "title"]),
        Query.orderDesc("$createdAt"),
        Query.equal("user_id", data.user.$id),
      ]
    );
  } catch (err) {
    console.error(
      `Failed to retrieve the current user's conversations: ${err.message}`
    );

    return;
  }

  return data;
}
