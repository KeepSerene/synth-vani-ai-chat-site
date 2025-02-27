import "./index.css";

// React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Library imports
import { RouterProvider } from "react-router-dom";

// Router
import router from "./router/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
