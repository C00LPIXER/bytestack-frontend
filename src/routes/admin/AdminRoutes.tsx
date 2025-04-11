import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import Users from "@/pages/admin/Users";
import { NotFount } from "@/pages/client/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function AdminRoutes() {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state._auth
  );
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />}
      />
      <Route
        path="/"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedAdminRoute>
            <Users />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<NotFount showLayout={false} />} />
    </Routes>
  );
}

export default AdminRoutes;
