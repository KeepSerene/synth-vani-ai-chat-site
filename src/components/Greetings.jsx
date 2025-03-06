// Custom hook import
import { usePromptPreloader } from "../hooks/usePromptPreloader";

// Component import
import PromptPreloader from "./PromptPreLoader";

// Library imports
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

function Greetings() {
  const { preloadText } = usePromptPreloader();
  const { user } = useLoaderData();

  return (
    <>
      {preloadText ? (
        <PromptPreloader prompt={preloadText} />
      ) : (
        <section className="h-full flex justify-center items-center">
          <h2 className="text-headlineLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant font-semibold text-center tracking-tight">
            <motion.span
              initial={{ backgroundPositionX: "100%" }}
              animate={{ backgroundPositionX: "0%" }}
              transition={{ duration: 4, ease: [0.05, 0.7, 0.1, 1] }}
              className="bg-gradient-to-r from-teal-400 from-0% via-cyan-600 via-56% to-transparent to-75% bg-[length:350%_100%] bg-[100%_0] bg-clip-text text-transparent"
            >
              Svāgataṁ, {user.name.split(" ").at(-1)}
            </motion.span>

            <br />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="dark:font-medium"
            >
              What can I help with?
            </motion.span>
          </h2>
        </section>
      )}
    </>
  );
}

export default Greetings;
