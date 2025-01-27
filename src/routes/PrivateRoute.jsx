import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading spinner if still fetching user data
  if (loading) return <div>Loading...</div>;

  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children (which in this case will be the dashboard)
  return children;
};

export default PrivateRoute;
