import React from "react";
import { Navigate } from "react-router-dom";
import {isAuthenticated} from "../helper/index"

// Default route can be access by user that are not logged in
const DefaultRoute = ({ children }) => {

  if (isAuthenticated()) {
    return <Navigate to="/user" />;
  } else {
    return children;
  }
};

export default DefaultRoute;
