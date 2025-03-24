import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import { Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
