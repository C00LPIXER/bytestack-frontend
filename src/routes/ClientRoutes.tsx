import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/pages/client/Dashboard";
import LandingPage from "@/pages/client/Landing";
import Login from "@/pages/client/Login";
import Signup from "@/pages/client/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function ClientRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default ClientRoutes;