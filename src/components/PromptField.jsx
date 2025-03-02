// Library imports
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

// Component import
import { IconButton } from "./Buttons";

function PromptField() {
  const promptFieldWrapperRef = useRef(null);
  const promptFieldRef = useRef(null);

  const [shouldShowPlaceholder, setShouldShowPlaceholder] = useState(true);
  const [isMultiLinePrompt, setIsMultiLinePrompt] = useState(false);
  const [promptText, setPromptText] = useState("");

  // Handle general prompts
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

  // Place cursor at the end of the pasted text content in the editable div
  const placeCursorAtEnd = useCallback(() => {
    if (promptFieldRef.current) {
      const editablePromptEl = promptFieldRef.current;
      const range = document.createRange();
      const selection = document.getSelection();

      range.selectNodeContents(editablePromptEl);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  // Handle pasted text prompts
  const handlePastedPrompt = useCallback(
    (event) => {
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
