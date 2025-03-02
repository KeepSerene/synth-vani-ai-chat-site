import { account } from "../lib/appwrite";

/**
 * Attempts to log out the current user by deleting their active session.
 *
 * @param {Function} navigate - React Router's navigate function for redirection
 * @param {Function} showSnackbar - Function to display notifications to the user
 * @returns {Promise<boolean>} Promise that resolves to true on success, false on failure
 */
export default async function logout(navigate, showSnackbar) {
  try {
    await account.deleteSession("current");
    navigate("/login");

    // Indicate success
    return true;
  } catch (err) {
    console.error(`Failed to log out: ${err.message}`);

    // Function references are truthy (if non-null and not undefined) values in JS!!
    if (showSnackbar) {
      showSnackbar({
        type: "error",
        message: `Failed to log out: ${err.message}`,
        timeOut: 6000,
      });
    }

    // Indicate failure
    return false;
  }
}
