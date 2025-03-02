function MenuItem({
  btnType = "button",
  classStr = "",
  btnText = "",
  ...rest
}) {
  return (
    <button type={btnType} className={`menu-item ${classStr}`} {...rest}>
      <span>{btnText}</span>

      <div className="state-layer" />
    </button>
  );
}

export default MenuItem;
