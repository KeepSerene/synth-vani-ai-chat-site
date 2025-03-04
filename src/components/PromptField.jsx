// Library imports
import { useCallback, useRef, useState } from "react";
import { useNavigation, useSubmit } from "react-router-dom";
import { motion } from "framer-motion";

// Component import
import { IconButton } from "./Buttons";

function PromptField() {
  const promptFieldWrapperRef = useRef(null);
  const promptFieldRef = useRef(null);

  const [shouldShowPlaceholder, setShouldShowPlaceholder] = useState(true);
  const [isMultiLinePrompt, setIsMultiLinePrompt] = useState(false);
  const [promptText, setPromptText] = useState("");

  const navigation = useNavigation();
  const submit = useSubmit();

  // Handle general prompts & update states
  const handlePrompt = useCallback(() => {
    if (promptFieldRef.current) {
      if (promptFieldRef.current.innerText === "\n") {
        promptFieldRef.current.innerHTML = "";
      }

      const isEmpty = !promptFieldRef.current.innerText.trim();
      setShouldShowPlaceholder(isEmpty);

      setPromptText(promptFieldRef.current.innerText.trim());
    }

    if (promptFieldWrapperRef.current) {
      setIsMultiLinePrompt(promptFieldWrapperRef.current.clientHeight > 64);
    }
  }, []);

  // Places the cursor at the end of the text inside the editable div after a paste operation
  const placeCursorAtEnd = useCallback(() => {
    if (promptFieldRef.current) {
      const editablePromptEl = promptFieldRef.current;

      // Create a new Range object, which allows us to specify a portion of the document (a start and end point)
      const range = document.createRange();

      // Get the current Selection object, which represents the text currently selected by the user,
      // Or the current position of the caret
      const selection = document.getSelection();

      /*
       * Select all the contents inside the editable div.
       * This sets the start of the range to the very beginning of the content
       * and the end of the range to the very end of the content.
       */
      range.selectNodeContents(editablePromptEl);

      /*
       * Collapse the range to the end of the content.
       * - `false` means collapse to the end (placing the cursor at the end of the text).
       * - If `true` were passed instead, it would collapse to the start.
       */
      range.collapse(false);

      // ============= SAFE WORK ==============
      /*
       * Clear any existing selections in the document.
       * This is important because if the user had manually selected a portion of text inside the
       * editable div before pasting, we want to discard that selection to avoid any unwanted behaviors.
       */
      selection.removeAllRanges();

      /*
       * Add the newly adjusted range (which is collapsed to the end) to the selection object.
       * This ensures that the cursor is explicitly placed at the end of the text content.
       */
      selection.addRange(range);
    }
  }, []);

  const handlePastedPrompt = useCallback(
    (event) => {
      // Prevent the default paste behaviour
      event.preventDefault();

      if (promptFieldRef.current) {
        promptFieldRef.current.innerText +=
          event.clipboardData.getData("text/plain");

        // Update states
        handlePrompt();

        // Ensure cursor position
        placeCursorAtEnd();
      }
    },
    [handlePrompt, placeCursorAtEnd]
  );

  const handleSubmit = useCallback(() => {
    // Prevent submission if the input is empty or a submission is already in progress
    if (!promptText || navigation.state === "submitting") return;

    if (promptFieldRef.current) {
      // Clear the input field after submission
      promptFieldRef.current.innerHTML = "";

      // Update states
      handlePrompt();

      // Manually submit data to the corresponding route action
      submit(
        {
          user_prompt: promptText, // The data being sent
          request_type: "user_prompt", // A custom field to help identify this request in the action function
        },
        {
          method: "POST", // HTTP method
          encType: "application/x-www-form-urlencoded", // Encoding type for a traditional form submission
          action: "/", // Specifies which route action should handle this request
        }
      );
    }
  }, [promptText, navigation.state, handlePrompt, submit]);

  // Framer motion variants setup
  const promptFieldParentVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };
  const promptFieldChildVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      ref={promptFieldWrapperRef}
      variants={promptFieldParentVariant}
      initial="hidden"
      animate="visible"
      className={`prompt-field-wrapper ${
        isMultiLinePrompt ? "rounded-large" : ""
      }`}
    >
      <motion.div
        ref={promptFieldRef}
        onInput={handlePrompt}
        onBlur={handlePrompt}
        onPaste={handlePastedPrompt}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
        role="textbox"
        contentEditable="true"
        aria-multiline="true"
        aria-label="Ask anything"
        data-placeholder="Ask anything..."
        variants={promptFieldChildVariant}
        className={`prompt-field ${
          shouldShowPlaceholder ? "" : "after:hidden"
        }`}
      />

      <IconButton
        onClick={handleSubmit}
        icon="send"
        size="large"
        aria-label="Submit your prompt"
        title="Submit"
        classStr="ml-auto"
        variants={promptFieldChildVariant}
      />

      <div className="state-layer" />
    </motion.div>
  );
}

export default PromptField;
