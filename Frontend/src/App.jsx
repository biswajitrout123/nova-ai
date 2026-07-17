import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import { AuthProvider } from "./auth/auth..context";

const App = () => {
  <AuthProvider>
    return <RouterProvider router={router} />;
  </AuthProvider>
};

export default App;