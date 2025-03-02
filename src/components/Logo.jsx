// Library import
import { Link } from "react-router-dom";

// Asset imports
import { logoLight, logoDark } from "../assets/assets";

function Logo({ classStr = "" }) {
  return (
    <Link to="/" className={`min-w-max max-w-max h-[24px] ${classStr}`}>
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
  );
}

export default Logo;
