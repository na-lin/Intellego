import React from "react";

// React Router
import { Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { selectAuthState } from "../store/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(selectAuthState);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
