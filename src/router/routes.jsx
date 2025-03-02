// Library imports
import { createBrowserRouter } from "react-router-dom";

// App
import App from "../App";

// Page imports
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Loader import
import appLoader from "./loaders/appLoader";
import registrationLoader from "./loaders/registrationLoader";
import loginLoader from "./loaders/loginLoader";
import forgotPasswordLoader from "./loaders/forgotPasswordLoader";
import resetPasswordLoader from "./loaders/resetPasswordLoader";

// Action imports
import registrationAction from "./actions/registrationAction";
import loginAction from "./actions/loginAction";
import forgotPasswordAction from "./actions/forgotPasswordAction";
import resetPasswordAction from "./actions/resetPasswordAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
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
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    loader: forgotPasswordLoader,
    action: forgotPasswordAction,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    loader: resetPasswordLoader,
    action: resetPasswordAction,
  },
]);

export default router;
