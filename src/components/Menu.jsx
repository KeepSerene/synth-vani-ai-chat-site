function Menu({ classStr = "", children }) {
  return <div className={`menu ${classStr}`}>{children}</div>;
}

export default Menu;
