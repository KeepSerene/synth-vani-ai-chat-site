// Common button
function Button({
  classStr = "",
  color = "primary",
  variant = "filled",
  children,
  ...rest
}) {
  return (
    <button className={`btn ${variant} ${color} ${classStr}`} {...rest}>
      {children}

      <div className="state-layer"></div>
    </button>
  );
}

export { Button };
