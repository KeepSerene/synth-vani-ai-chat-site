// Library imports
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

// Component import
import PageTitle from "../components/PageTitle";

// Component imports
import UserPrompt from "../components/UserPrompt";
import GeminiResponse from "../components/GeminiResponse";

function Conversation() {
  const {
    conversation: { title, chats },
  } = useLoaderData();

  return (
    <>
      <PageTitle
        title={title ? `${title} | SynthVani` : "Untitled | SynthVani"}
      />

      <motion.div>
        {chats.map((chat) => (
          <div key={chat.$id}>
            <UserPrompt prompt={chat.user_prompt} />

            <GeminiResponse response={chat.gemini_response} />
          </div>
        ))}
      </motion.div>
    </>
  );
}

export default Conversation;
