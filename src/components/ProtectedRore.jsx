import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRore({ user, children }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRore;
