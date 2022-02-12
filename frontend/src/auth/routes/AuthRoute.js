import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helper";

//Authenticate Route for loggedin user only

const AuthRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
