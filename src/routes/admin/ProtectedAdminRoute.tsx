import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { JSX } from "react";

const ProtectedAdminRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state._auth
  );
  return isAuthenticated ? children : <Navigate to="/notfound" />;
};

export default ProtectedAdminRoute;
