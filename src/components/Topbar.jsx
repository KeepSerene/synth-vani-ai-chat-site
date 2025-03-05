// Component imports
import { IconButton } from "./Buttons";
import Avatar from "./Avatar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { LinearLoader } from "./Loaders";

// Library imports
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Custom hook import
import { useToggle } from "../hooks/useToggle";

// Context import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// Utility import
import logout from "../utils/logout";
import Logo from "./Logo";

function Topbar({ toggleSidebar }) {
  const navigation = useNavigation();

  // Check if the page is loaded for the first time or being reloaded without submitting a form
  const isNormalPageLoad =
    !navigation.formData && navigation.state === "loading";

  const { user } = useLoaderData();

  const [isMenuOpen, toggleMenu] = useToggle();

  const navigate = useNavigate();

  const { showSnackbar } = useSnackbarContext();

  return (
    <header className="h-16 px-4 flex justify-between items-center relative">
      <div className="flex items-center gap-1">
        <IconButton
          icon="menu"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          title="Open sidebar"
          classStr="lg:hidden"
        />

        <Logo classStr="lg:hidden" />
      </div>

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
