// Library imports
import { useLoaderData, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Component import
import PageTitle from "../components/PageTitle";

// Component imports
import UserPrompt from "../components/UserPrompt";
import GeminiResponse from "../components/GeminiResponse";
import PromptPreloader from "../components/PromptPreLoader";

// Custom hook import
import { usePromptPreloader } from "../hooks/usePromptPreloader";

function Conversation() {
  const location = useLocation();
  const {
    conversation: { title, chats },
  } = useLoaderData();
  const { preloadText } = usePromptPreloader();

  return (
    <>
      <PageTitle
        title={title ? `${title} | SynthVani` : "Untitled | SynthVani"}
      />

      <motion.div
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
        className="max-w-[43.75rem] mx-auto !will-change-auto"
      >
        {chats.map((chat) => (
          <div key={chat.$id}>
            <UserPrompt prompt={chat.user_prompt} />

            <GeminiResponse response={chat.gemini_response} />
          </div>
        ))}
      </motion.div>

      {preloadText && <PromptPreloader prompt={preloadText} />}
    </>
  );
}

export default Conversation;
