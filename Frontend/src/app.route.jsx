import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to the Home Page!</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <h1>Home Page</h1>
  }
]);