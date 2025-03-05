import { useCallback, useState } from "react";

/**
 * A custom React hook that manages a boolean toggle state.
 *
 * @returns {Array} A tuple containing:
 *   - {boolean} booleanState - The current toggle state
 *   - {Function} toggle - Function to flip the toggle state
 */
function useToggle() {
  const [booleanState, setBooleanState] = useState(false);

  const toggle = useCallback(() => {
    setBooleanState((prevState) => !prevState);
  }, []);

  return [booleanState, toggle];
}

export { useToggle };
