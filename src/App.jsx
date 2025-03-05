// Component imports
import PageTitle from "./components/PageTitle";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Greetings from "./components/Greetings";
import PromptField from "./components/PromptField";

// Custom hook import
import { useToggle } from "./hooks/useToggle";

// Library imports
import { Outlet, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  const params = useParams();

  const [isSidebarOpen, toggleSidebar] = useToggle();

  return (
    <>
      <PageTitle title="SynthVani - Your Ideas, Divinely Amplified" />

      <div className="lg:grid lg:grid-cols-[20rem,1fr]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]">
          <Topbar toggleSidebar={toggleSidebar} />

          {/* Main content */}
          <main className="px-5 pb-4 overflow-y-auto flex flex-col">
            <div className="grow w-full max-w-[52.5rem] mx-auto">
              {params.conversationId ? <Outlet /> : <Greetings />}
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
