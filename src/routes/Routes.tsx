import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Dashboard } from "@/pages/Dashboard";
import LandingPage from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { NotFount } from "@/pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AuthCallback from "@/pages/AuthCallback";
import { Profile } from "@/pages/Profile";
import Settings from "@/pages/Settings";
import { FeedsPage } from "@/pages/Feeds";
import NewBlog from "@/pages/NewBlog";
import BlogPost from "@/pages/BlogPost";

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/u/:slug" element={<Profile />} />
          <Route path="/feeds" element={<FeedsPage />} />
          <Route path="/new-write" element={<NewBlog />} />
        </Route>

        <Route path="*" element={<NotFount />} />
        <Route path="/blog" element={<BlogPost />} />
      </Routes>
    </AuthProvider>
  );
}

export default ClientRoutes;
