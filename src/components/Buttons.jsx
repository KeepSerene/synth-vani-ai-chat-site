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
    <button type={btnType} className={`icon-btn ${size} ${classStr}`} {...rest}>
      {children ? (
        children
      ) : (
        <i className="material-symbols-rounded icon">{icon}</i>
      )}

      <div className="state-layer" />
    </button>
  );
}

export { Button, IconButton };
