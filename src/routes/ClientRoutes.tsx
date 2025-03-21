// import { Dashboard } from "@/pages/client/Dashboard";
// import LandingPage from "@/pages/client/Landing";
// import Login from "@/pages/client/Login";
// import Signup from "@/pages/client/Signup";
// import { Route, Routes } from "react-router-dom";

// function ClientRoutes() {
//   return (
//     <Routes>
//       <Route path="/signup" element={<Signup />}></Route>
//       <Route path="/login" element={<Login />}></Route>
//       <Route path="/" element={<LandingPage />}></Route>
//       <Route path="/home" element={<Dashboard />}></Route>
//     </Routes>
//   );
// }

// export default ClientRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/pages/client/Dashboard";
import LandingPage from "@/pages/client/Landing";
import Login from "@/pages/client/Login";
import Signup from "@/pages/client/Signup";
// import ForgotPassword from "@/pages/client/ForgotPassword";
import { useAuth } from "@/hooks/useAuth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function ClientRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes: Only accessible to unauthenticated users */}
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Route>

      {/* Private Routes: Only accessible to authenticated users */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Dashboard />} />
      </Route>

      {/* Landing Page: Accessible to all users */}
      <Route path="/" element={<LandingPage />} />

      {/* Redirect based on authentication status */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default ClientRoutes;