import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ element: Component, ...restOfProps }) {

  const isAuthenticated = localStorage.getItem("loggedIn") || 1;
  console.log("this", isAuthenticated);
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "1" ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  );
}

export default ProtectedRoute;