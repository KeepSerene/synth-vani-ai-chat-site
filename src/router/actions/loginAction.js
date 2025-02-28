// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

/**
 * Handles login form submission.
 * @param {Object} params - Parameters provided by React Router DOM.
 * @param {Request} params.request - The HTTP request object containing form data.
 * @returns {Promise<Object|Response>} Returns a redirect response on success or an error object.
 */
async function loginAction({ request }) {
  const formData = await request.formData();

  try {
    await account.createEmailPasswordSession(
      formData.get("email"),
      formData.get("password")
    );

    return redirect("/");
  } catch (err) {
    // Handle AppWrite erros
    return {
      message: err.message || "Login failed! Please try again later.",
    };
  }
}

export default loginAction;
