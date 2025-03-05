// Component imports
import Logo from "./Logo";
import { ExtendedFAB, IconButton } from "./Buttons";

// Library imports
import { NavLink, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

// Helper import
import { getCurrentYear } from "../utils/helpers";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const {
    conversations: { documents: chatSessions },
  } = useLoaderData() || [];

  return (
    <>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-content">
          <div className="h-16 px-4 flex justify-center items-center">
            <Logo />
          </div>

          <ExtendedFAB href="/" text="New chat" onClick={toggleSidebar} />

          {/* Conversations */}
          <div className="-pr-1 -mr-2 overflow-y-auto">
            <p className="h-9 text-titleSmall px-4 flex items-center">Recent</p>

            <nav>
              <ol className="grid grid-cols-1 gap-1">
                {chatSessions.map((chatSession) => (
                  <li key={chatSession.$id} className="relative group">
                    <NavLink
                      to={chatSession.$id}
                      onClick={toggleSidebar}
                      title={chatSession.title}
                      className="nav-link"
                    >
                      <i className="material-symbols-rounded icon-small">
                        chat_bubble
                      </i>

                      <span className="capitalize truncate">
                        {chatSession.title}
                      </span>

                      <div className="state-layer" />
                    </NavLink>

                    <IconButton
                      icon="delete"
                      size="small"
                      aria-label="Click to delete chat"
                      title="Delete"
                      classStr="hidden lg:block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 absolute top-1/2 -translate-y-1/2 right-1.5 z-10"
                    />
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Copyright */}
          <p className="h-14 text-labelLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant capitalize border-t border-light-surfaceContainerHigh dark:border-dark-surfaceContainerHigh px-4 flex items-center">
            {/* The outer span is necessary for cohesive paragraph wrapping. if necessary. Note the p-tag is a flex parent */}
            <span>
              &copy;&nbsp;
              <a
                href="https://github.com/KeepSerene"
                target="_blank"
                className="link text-light-onSurface dark:text-dark-onSurface"
              >
                KeepSerene
              </a>
              ,&nbsp;<span>{getCurrentYear()}</span>. All rights reserved.
            </span>
          </p>
        </div>
      </motion.aside>

      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : ""}
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
      />
    </>
  );
}

export default Sidebar;
