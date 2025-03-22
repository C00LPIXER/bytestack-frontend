import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";

const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("PublicRoute:", { isAuthenticated, isLoading });

  if (isLoading && !isAuthenticated) {
    return  <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
