// Library imports
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Common button
function Button({
  btnType = "button",
  classStr = "",
  color = "primary",
  variant = "filled",
  children,
  ...rest
}) {
  return (
    <button
      type={btnType}
      className={`btn ${variant} ${color} ${classStr}`}
      {...rest}
    >
      {children}

      <div className="state-layer" />
    </button>
  );
}

// Icon button
function IconButton({
  btnType = "button",
  classStr = "",
  icon = "",
  size = "",
  children,
  ...rest
}) {
  return (
    <motion.button
      type={btnType}
      className={`icon-btn ${size} ${classStr}`}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <i className="material-symbols-rounded icon">{icon}</i>
      )}

      <div className="state-layer" />
    </motion.button>
  );
}

// Extended floating action button ( Extended FAB)
function ExtendedFAB({ href = "", text = "", classStr = "", ...rest }) {
  return (
    <Link to={href} className={`extended-fab ${classStr}`} {...rest}>
      <i className="material-symbols-rounded">add</i>

      <span className="truncate">{text}</span>

      <div className="state-layer" />
    </Link>
  );
}

export { Button, IconButton, ExtendedFAB };
