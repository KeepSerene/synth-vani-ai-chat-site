// Library import
import { Link } from "react-router-dom";

// Asset imports
import { logoLight, logoDark } from "../assets/assets";

function Logo({ classStr = "" }) {
  return (
    <Link to="/" className={`min-w-max max-w-max h-[32px] ${classStr}`}>
      <img
        src={logoLight}
        alt="SynthVani logo"
        width={180}
        height={32}
        className="dark:hidden"
      />

      <img
        src={logoDark}
        alt="SynthVani logo"
        width={180}
        height={32}
        className="hidden dark:block"
      />
    </Link>
  );
}

export default Logo;
