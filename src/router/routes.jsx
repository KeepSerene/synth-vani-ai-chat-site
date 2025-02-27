// Library imports
import { createBrowserRouter } from "react-router-dom";

// App
import App from "../App";

// Page imports
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
