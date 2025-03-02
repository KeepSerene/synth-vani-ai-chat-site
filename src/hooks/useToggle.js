import { useCallback, useState } from "react";

/**
 * A custom React hook that manages a boolean toggle state.
 *
 * @returns {Array} A tuple containing:
 *   - {boolean} isOpen - The current toggle state
 *   - {Function} toggle - Function to flip the toggle state
 */
function useToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return [isOpen, toggle];
}

export { useToggle };
