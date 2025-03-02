// Component imports
import { IconButton } from "./Buttons";
import Avatar from "./Avatar";
import MobileMenu from "./MobileMenu";
import MenuItem from "./MenuItem";
import { LinearLoader } from "./Loaders";

// Library imports
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Custom hook import
import { useToggle } from "../hooks/useToggle";

// Context import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// Asset imports
import { logoLight, logoDark } from "../assets/assets";

// Utility import
import logout from "../utils/logout";

function Topbar() {
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
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          classStr="lg:hidden"
        />

        <Link to="/" className="min-w-max max-w-max h-[24px] lg:hidden">
          <img
            src={logoLight}
            alt="SynthVani logo"
            width={133}
            height={24}
            className="dark:hidden"
          />

          <img
            src={logoDark}
            alt="SynthVani logo"
            width={133}
            height={24}
            className="hidden dark:block"
          />
        </Link>
      </div>

      <div className="mobile-menu-wrapper">
        <IconButton
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          title={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <Avatar name={user.name} />
        </IconButton>

        <MobileMenu classStr={isMenuOpen ? "open" : ""}>
          <MenuItem
            onClick={() => logout(navigate, showSnackbar)}
            btnText="Log out"
          />
        </MobileMenu>
      </div>

      <AnimatePresence>
        {isNormalPageLoad && (
          <LinearLoader classStr="absolute left-0 top-0 right-0" />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Topbar;
