// React import
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

// Component import
import Snackbar from "../components/Snackbar";

const initialContext = {
  type: "info",
  isOpen: false,
  message: "",
  showSnackbar: ({ type = "info", message = "", timeOut = 5000 }) => {},
  hideSnackbar: () => {},
};

const SnackbarContext = createContext(initialContext);

export default function SnackbarContextProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    type: "info",
    isOpen: false,
    message: "",
  });

  const timeOutRef = useRef(null);

  // Memoize the callback function to maintain stable reference identity
  // Empty dependency array means this function is created only once on initial render
  const showSnackbar = useCallback(
    ({ type = "info", message = "", timeOut = 5000 }) => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);

      setSnackbar({
        type,
        isOpen: true,
        message,
      });

      timeOutRef.current = setTimeout(() => {
        setSnackbar((prevState) => ({
          ...prevState,
          isOpen: false,
        }));
      }, timeOut);
    },
    []
  );

  // Memoization is done for the same purpose as "showSnackbar"
  const hideSnackbar = useCallback(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    setSnackbar({ type: "info", isOpen: false, message: "" });
  }, []);

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, hideSnackbar, ...snackbar }}
    >
      {children}

      <Snackbar snackbar={snackbar} />
    </SnackbarContext.Provider>
  );
}

export const useSnackbarContext = () => useContext(SnackbarContext);
