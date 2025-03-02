function MobileMenu({ classStr = "", children }) {
  return <div className={`mobile-menu ${classStr}`}>{children}</div>;
}

export default MobileMenu;
