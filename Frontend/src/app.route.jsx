import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
// 1. Make sure to import your Protected component
import Protected from "./auth/components/Protected"; 

export const router = createBrowserRouter([
  {
    path: "/",
    // 2. Use a single "/" route and wrap the element here
    element: (
      <Protected>
        <h1>Welcome to the Home Page!</h1>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);