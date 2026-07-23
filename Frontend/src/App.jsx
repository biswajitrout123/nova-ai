import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import { AuthProvider } from "./auth/auth..context";
import { InterviewProvider } from "./interview/interview.context";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />;
      </InterviewProvider>
    </AuthProvider>
  );

};

export default App;