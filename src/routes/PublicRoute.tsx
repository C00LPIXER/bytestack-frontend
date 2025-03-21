import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("PublicRoute:", { isAuthenticated, isLoading });

  if (isLoading && !isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
