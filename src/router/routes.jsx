// Library imports
import { createBrowserRouter } from "react-router-dom";

// App
import App from "../App";

// Page imports
import Register from "../pages/Register";
import Login from "../pages/Login";

// Loader import
import registrationLoader from "./loaders/registrationLoader";

// Action imports
import registrationAction from "./actions/registrationAction";
import loginAction from "./actions/loginAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: registrationLoader,
    action: registrationAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
]);

export default router;
