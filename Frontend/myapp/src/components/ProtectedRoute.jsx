import React from "react";

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        Please login to view this page...
      </p>
    );
  }
  return children;
};

export default ProtectedRoute;
