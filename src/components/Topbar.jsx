// Component imports
import { IconButton } from "./Buttons";
import Avatar from "./Avatar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { LinearLoader } from "./Loaders";

// Library imports
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Custom hook import
import { useToggle } from "../hooks/useToggle";

// Context import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// Utility imports
import deleteConversation from "../utils/deleteConversation";
import logout from "../utils/logout";

// Component import
import Logo from "./Logo";

function Topbar({ toggleSidebar }) {
  const navigation = useNavigation();
  /*
    Checks if the app is in a normal loading state (i.e., fetching data via a loader)  
    without an ongoing form submission. This helps distinguish between page navigation/ 
    initial visit/simple page reload (loader running), and form submissions (action running).  
  */
  const isNormalPageLoad =
    !navigation.formData && navigation.state === "loading";

  const params = useParams();
  const submit = useSubmit();
  const { user, conversations } = useLoaderData();
  const [isMenuOpen, toggleMenu] = useToggle();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarContext();

  return (
    <header className="h-16 px-4 flex justify-between items-center relative">
      <div className="flex items-center gap-1">
        {/* Hamburger button */}
        <IconButton
          icon="menu"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          title="Open sidebar"
          classStr="lg:hidden"
        />

        <Logo classStr="lg:hidden" />
      </div>

      {params.conversationId && (
        <IconButton
          icon="delete"
          onClick={() => {
            const { title } = conversations.documents.find(
              (doc) => doc.$id === params.conversationId
            );
            deleteConversation({ id: params.conversationId, title, submit });
          }}
          aria-label="Delete conversation"
          title="Delete conversation"
          classStr="lg:hidden ml-auto mr-1"
        />
      )}

      {/* Logout menu */}
      <div className="menu-wrapper">
        <IconButton
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          title={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <Avatar name={user.name} />
        </IconButton>

        <Menu classStr={isMenuOpen ? "open" : ""}>
          <MenuItem
            onClick={() => logout(navigate, showSnackbar)}
            btnText="Log out"
          />
        </Menu>
      </div>

      <AnimatePresence>
        {isNormalPageLoad && (
          <LinearLoader classStr="absolute left-0 top-full right-0" />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Topbar;
