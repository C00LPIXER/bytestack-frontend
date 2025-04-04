import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Dashboard } from "@/pages/client/Dashboard";
import LandingPage from "@/pages/client/Landing";
import Login from "@/pages/client/Login";
import Signup from "@/pages/client/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { NotFount } from "@/pages/client/NotFound";
import ForgotPassword from "@/pages/client/ForgotPassword";
import ResetPassword from "@/pages/client/ResetPassword";
import AuthCallback from "@/pages/client/AuthCallback";
import { Profile } from "@/pages/client/Profile";
import Settings from "@/pages/client/Settings";

function ClientRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/u/:slug" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFount />} />
      </Routes>
    </AuthProvider>
  );
}

export default ClientRoutes;
