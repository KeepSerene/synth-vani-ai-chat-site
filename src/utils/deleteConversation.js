/**
 * Deletes a conversation after user confirmation.
 *
 * @param {Object} options - The options for deleting a conversation.
 * @param {string} options.id - The unique ID of the conversation to be deleted.
 * @param {string} [options.title="Untitled"] - The title of the conversation (default is "Untitled").
 * @param {Function} options.submit - The `submit` function from `useSubmit` to trigger the form submission.
 *
 * @returns {void} Does not return anything. Exits early if the user cancels the confirmation.
 */
export default function deleteConversation({ id, title = "Untitled", submit }) {
  const shouldDelete = window.confirm(
    "Are you sure you want to delete this chat session?\n\nThis action is irreversible. Once deleted, all associated data, including individual chat messages, user prompts, and corresponding responses, will no longer be accessible."
  );

  if (!shouldDelete) return;

  /* 
     Triggers a form submission using `useSubmit`. This sends a DELETE request
     with the conversation ID and title to the root action ("/"),
     which handles the deletion on the backend.
  */
  submit(
    {
      request_type: "delete_conversation",
      conversation_id: id,
      conversation_title: title,
    },
    {
      method: "DELETE",
      encType: "application/x-www-form-urlencoded",
      action: "/",
    }
  );
}
