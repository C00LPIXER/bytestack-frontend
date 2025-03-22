import { Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/client/Dashboard";
import LandingPage from "@/pages/client/Landing";
import Login from "@/pages/client/Login";
import Signup from "@/pages/client/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { NotFount } from "@/pages/client/NotFound";
import { Loader } from "@/components/shared/Loader";
import ForgotPassword from "@/pages/client/ForgotPassword";
import ResetPassword from "@/pages/client/ResetPassword";

function ClientRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="/lod" element={<Loader />} />
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default ClientRoutes;
