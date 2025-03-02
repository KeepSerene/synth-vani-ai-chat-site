// Custom library import
import { account } from "../../lib/appwrite";

// AppWrite import
import { ID } from "appwrite";

// Library import
import { redirect } from "react-router-dom";

/**
 * Handles registration form submission.
 * @param {Object} params - Parameters provided by React Router DOM.
 * @param {Request} params.request - The HTTP request object containing form data.
 * @returns {Promise<Object|Response>} Returns a redirect response on success or an error object.
 */
async function registrationAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email").trim();
  const password = formData.get("password");
  const fullName = formData.get("fullName").trim();

  if (!email) {
    return {
      message: "Email is required!",
    };
  }

  if (!fullName) {
    return {
      message: "Name is required!",
    };
  }

  if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters long!",
    };
  }

  // Handle registration
  try {
    await account.create(ID.unique(), email, password, fullName);
  } catch (err) {
    // Handle AppWrite erros
    console.error("Account creation failed:", err);

    if (err.code === 400) {
      return {
        message: "Invalid request! Please check your input.",
      };
    } else if (err.code === 409) {
      return {
        message: "An account with this email or password already exists!",
      };
    } else if (err.code === 429) {
      return {
        message: "Too many attempts! Please try again later.",
      };
    }

    return {
      message: err.message || "Registration failed! Please try again later.",
    };
  }

  // After successful registration, handle login
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (err) {
    console.error(
      `An error occurred while creating an email and password session: ${err.message}`
    );

    return redirect("/login");
  }

  // Redirect the user to the home page after successful registration and login
  return redirect("/");
}

export default registrationAction;
