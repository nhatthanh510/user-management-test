import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users/:username",
    element: <Dashboard />,
  },
]);
