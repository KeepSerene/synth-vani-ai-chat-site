// Component imports
import PageTitle from "./components/PageTitle";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Greetings from "./components/Greetings";
import PromptField from "./components/PromptField";

// Custom hook imports
import { usePromptPreloader } from "./hooks/usePromptPreloader";
import { useToggle } from "./hooks/useToggle";

// Context import
import { useSnackbarContext } from "./contexts/SnackbarContextProvider";

// React imports
import { useEffect, useRef } from "react";

// Library imports
import {
  Outlet,
  useActionData,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  const params = useParams();
  const navigation = useNavigation();

  /*
    Checks if the app is in a normal loading state (i.e., fetching data via a loader)  
    without an ongoing form submission. This helps distinguish between page navigation/ 
    initial visit/simple page reload (loader running), and form submissions (action running).  
  */
  const isNormalPageLoad =
    navigation.state === "loading" && !navigation.formData;

  const [isSidebarOpen, toggleSidebar] = useToggle();

  // Handle a conversation deletion
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const successMsg = searchParams.get("success"); // See "deletionConversationAction" in appAction
  const { showSnackbar } = useSnackbarContext();

  useEffect(() => {
    if (successMsg) {
      showSnackbar({ message: successMsg });
    } else if (data?.errorMsg) {
      showSnackbar({ type: "error", message: data.error });
    }
  }, [successMsg, data?.errorMsg, showSnackbar]);

  // Handle scroll when a new message is sent
  const chatContainerRef = useRef(null);
  const { preloadText } = usePromptPreloader();

  /**
   * Automatically scrolls the chat container to the bottom when new input is provided.
   * This ensures that the latest message is always visible without requiring manual scrolling.
   */
  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainerEl = chatContainerRef.current;

      if (preloadText) {
        chatContainerEl.scroll({
          top: chatContainerEl.scrollHeight - chatContainerEl.clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [preloadText]);

  return (
    <>
      <PageTitle title="SynthVani - Your Ideas, Divinely Amplified" />

      <div className="lg:grid lg:grid-cols-[20rem,1fr]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]">
          <Topbar toggleSidebar={toggleSidebar} />

          {/* Main content */}
          <main
            ref={chatContainerRef}
            className="px-5 pb-4 overflow-y-auto flex flex-col"
          >
            <div className="grow w-full max-w-[52.5rem] mx-auto">
              {isNormalPageLoad ? null : params.conversationId ? (
                <Outlet />
              ) : (
                <Greetings />
              )}
            </div>
          </main>

          {/* Prompt field */}
          <div className="bg-light-background dark:bg-dark-background">
            <div className="w-full max-w-[54.375rem] px-5 mx-auto">
              <PromptField />

              <motion.p
                initial={{ opacity: 0, translateY: "-4px" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: 0.8, ease: "easeOut" }}
                className="text-bodySmall text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center p-3"
              >
                <span>
                  SynthVani can make mistakes! Please double-check responses.
                </span>{" "}
                <a
                  href="https://support.google.com/gemini?p=privacy_notice"
                  target="_blank"
                  className="link underline"
                >
                  Learn more about privacy in Gemini.
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
