import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ Auth hydration wait
  if (loading) {
    return null; // or loader
  }

  // 🔐 If already logged in, redirect
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
