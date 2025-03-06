// Library imports
import { createBrowserRouter } from "react-router-dom";

// App
import App from "../App";

// Page imports
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Conversation from "../pages/Conversation";
import Conversation404 from "../pages/Conversation404";
import Error404 from "../pages/Error404";

// Loader imports
import appLoader from "./loaders/appLoader";
import registrationLoader from "./loaders/registrationLoader";
import loginLoader from "./loaders/loginLoader";
import forgotPasswordLoader from "./loaders/forgotPasswordLoader";
import resetPasswordLoader from "./loaders/resetPasswordLoader";
import conversationLoader from "./loaders/conversationLoader";

// Action imports
import registrationAction from "./actions/registrationAction";
import loginAction from "./actions/loginAction";
import forgotPasswordAction from "./actions/forgotPasswordAction";
import resetPasswordAction from "./actions/resetPasswordAction";
import appAction from "./actions/appAction";
import conversationAction from "./actions/conversationAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    action: appAction,
    children: [
      {
        path: "/:conversationId",
        element: <Conversation />,
        loader: conversationLoader,
        action: conversationAction,
        errorElement: <Conversation404 />,
      },
    ],
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
  {
    path: "*",
    /* 
      "errorElement" inside a path only applies to loader/action errors for the route, 
      so it doesn't work for unknown paths.
    */
    element: <Error404 />,
  },
]);

export default router;
