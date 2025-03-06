// React imports
import { useEffect, useState } from "react";

// Library import
import { useNavigation } from "react-router-dom";

/**
 * Custom hook to preload user input while a form is being submitted.
 *
 * This hook listens to the navigation state and extracts the `user_prompt`
 * field from form data **only if it exists** and **only when the request is related to a user prompt**.
 * This ensures that the hook does not mistakenly process unrelated requests, such as a delete operation.
 *
 * This helps provide a better user experience by displaying the text input
 * before the new chat response is received.
 *
 * @returns {Object} An object containing:
 * - `preloadText` {string}: The preloaded text from the form submission, or an empty string if not applicable.
 */
function usePromptPreloader() {
  const [preloadText, setPreloadText] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.formData) {
      const userPrompt = navigation.formData.get("user_prompt");

      // Ensure we only set the preloaded text if `user_prompt` exists.
      // This prevents errors when handling unrelated requests (e.g., deleting a conversation).
      setPreloadText(userPrompt ? userPrompt.trim() : "");
    } else {
      setPreloadText("");
    }
  }, [navigation.formData]);

  return { preloadText };
}

export { usePromptPreloader };
