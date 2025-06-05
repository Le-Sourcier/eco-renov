import React from "react";
import { Navigate } from "react-router-dom";
// import LoadingSpinner from "../ui/components/LoadingSpinner";
import { useChat } from "../useChat";
import LoadingSpinner from "../ui/loadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading, userData: user } = useChat();
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/access" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
